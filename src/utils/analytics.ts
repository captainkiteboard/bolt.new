// src/utils/analytics.ts
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Implement your analytics tracking here
    // Example with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }
  };