// src/middleware/config.ts
import { createRateLimiter } from '../utils/ratelimiter';

export const jobMatchRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // 2 requests per minute
  keyGenerator: (req) => {
    // You might want to use user ID if authenticated
    const userId = req.headers['x-user-id'] || 
                  req.headers['x-forwarded-for'] || 
                  req.socket.remoteAddress;
    return `job-match:${userId}`;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded. Please wait before trying again.',
      retryAfter: 60, // seconds
      upgradeUrl: '/upgrade' // Link to upgrade plan
    });
  }
});