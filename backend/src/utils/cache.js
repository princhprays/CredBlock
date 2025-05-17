import { createClient } from 'redis';
import logger from './logger.js';

// Create Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
redisClient.connect().catch((err) => {
  logger.error('Redis connection error:', err);
});

// Cache middleware
export const cache = (duration) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedResponse = await redisClient.get(key);
      
      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }

      // Store original res.json
      const originalJson = res.json;

      // Override res.json method
      res.json = function (body) {
        // Store in cache
        redisClient.setEx(key, duration, JSON.stringify(body))
          .catch(err => logger.error('Cache storage error:', err));

        // Call original method
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

// Cache invalidation
export const invalidateCache = async (pattern) => {
  try {
    const keys = await redisClient.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.info(`Invalidated cache for pattern: ${pattern}`);
    }
  } catch (error) {
    logger.error('Cache invalidation error:', error);
  }
};

// Cache helper functions
export const getCachedData = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error('Cache retrieval error:', error);
    return null;
  }
};

export const setCachedData = async (key, data, duration = 3600) => {
  try {
    await redisClient.setEx(key, duration, JSON.stringify(data));
  } catch (error) {
    logger.error('Cache storage error:', error);
  }
}; 