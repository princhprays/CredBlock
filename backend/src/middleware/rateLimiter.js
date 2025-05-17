import rateLimit from 'express-rate-limit';
import logger from '../utils/logger.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      status: 'error',
      message: options.message
    });
  }
});

// Stricter limiter for credential issuance
export const credentialIssuanceLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 credential issuances per hour
  message: 'Too many credential issuances from this IP, please try again later',
  handler: (req, res, next, options) => {
    logger.warn(`Credential issuance rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      status: 'error',
      message: options.message
    });
  }
});

// Stricter limiter for verification endpoints
export const verificationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // Limit each IP to 50 verifications per 5 minutes
  message: 'Too many verification attempts from this IP, please try again later',
  handler: (req, res, next, options) => {
    logger.warn(`Verification rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      status: 'error',
      message: options.message
    });
  }
}); 