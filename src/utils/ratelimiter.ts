// src/utils/rateLimiter.ts
import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

// Initialize Redis client if you want to use Redis for rate limiting
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Max number of requests per window
  keyGenerator?: (req: NextApiRequest) => string; // Custom key generator
  handler?: (req: NextApiRequest, res: NextApiResponse) => void; // Custom error handler
}

export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000, // 15 minutes
  max = 100, // 100 requests per windowMs
  keyGenerator = (req: NextApiRequest) => {
    // Default key generator uses IP address
    return req.headers['x-forwarded-for'] as string || 
           req.socket.remoteAddress || 
           'unknown';
  },
  handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      retryAfter: windowMs / 1000
    });
  }
}: RateLimitConfig) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return async function rateLimitMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
  ) {
    const key = keyGenerator(req);
    const now = Date.now();

    // Try to get existing rate limit data from Redis
    const rateLimitData = await redis.get(`ratelimit:${key}`);
    let currentLimit = rateLimitData ? JSON.parse(rateLimitData) : null;

    if (!currentLimit || now > currentLimit.resetTime) {
      // Initialize new rate limit
      currentLimit = {
        count: 1,
        resetTime: now + windowMs
      };
    } else {
      // Increment existing rate limit
      currentLimit.count += 1;
    }

    // Store updated rate limit data in Redis
    await redis.set(
      `ratelimit:${key}`,
      JSON.stringify(currentLimit),
      'PX',
      windowMs
    );

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - currentLimit.count));
    res.setHeader('X-RateLimit-Reset', currentLimit.resetTime);

    if (currentLimit.count > max) {
      return handler(req, res);
    }

    next();
  };
};