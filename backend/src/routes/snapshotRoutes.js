import express from 'express';
import { createSnapshot, downloadSnapshot, getSnapshotInfo } from '../controllers/snapshotController.js';
import { credentialIssuanceLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Create a new blockchain snapshot
router.post('/generate', credentialIssuanceLimiter, createSnapshot);

// Download the latest snapshot
router.get('/download', downloadSnapshot);

// Get information about the latest snapshot
router.get('/info', getSnapshotInfo);

export default router; 