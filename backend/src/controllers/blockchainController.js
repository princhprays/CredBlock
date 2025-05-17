import { addToBlockchain, getBlockchainSnapshot, verifyBlockchainHash } from '../services/blockchainService.js';
import logger from '../utils/logger.js';

export const addHashToBlockchain = async (req, res, next) => {
  try {
    const { hash } = req.body;
    const result = await addToBlockchain(hash);
    res.json(result);
  } catch (error) {
    logger.error('Error adding hash to blockchain:', error);
    next(error);
  }
};

export const getBlockchain = async (req, res, next) => {
  try {
    const snapshot = await getBlockchainSnapshot();
    res.json(snapshot);
  } catch (error) {
    logger.error('Error getting blockchain snapshot:', error);
    next(error);
  }
};

export const verifyHash = async (req, res, next) => {
  try {
    const { hash } = req.params;
    const verified = await verifyBlockchainHash(hash);
    res.json({ verified });
  } catch (error) {
    logger.error('Error verifying hash:', error);
    next(error);
  }
}; 