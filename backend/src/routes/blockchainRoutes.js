import express from 'express';
import { 
  addToBlockchain, 
  getBlockchainSnapshot, 
  verifyBlockchainHash 
} from '../controllers/blockchainController.js';

const router = express.Router();

// Routes
router.post('/add', addToBlockchain);
router.get('/snapshot', getBlockchainSnapshot);
router.post('/verify', verifyBlockchainHash);

export default router; 