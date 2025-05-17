import { verifyCredential } from '../services/verificationService.js';
import logger from '../utils/logger.js';

export const verifyCredentialHash = async (req, res, next) => {
  try {
    const { hash } = req.body;
    const verified = await verifyCredential(hash);
    res.json({ verified });
  } catch (error) {
    logger.error('Error verifying credential hash:', error);
    next(error);
  }
}; 