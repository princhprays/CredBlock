import express from 'express';
import { addHashToBlockchain, getBlockchain, verifyHash } from '../controllers/blockchainController.js';
import { validateRequest } from '../middleware/validation.js';
import { blockchainSchema } from '../schemas/blockchainSchema.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @swagger
 * /api/blockchain:
 *   post:
 *     summary: Add a new credential hash to the blockchain
 *     tags: [Blockchain]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hash
 *             properties:
 *               hash:
 *                 type: string
 *                 description: The hash of the credential to be added
 *     responses:
 *       200:
 *         description: Hash successfully added to blockchain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionId:
 *                   type: string
 *                 merkleProof:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.post('/', apiLimiter, validateRequest(blockchainSchema), addHashToBlockchain);

/**
 * @swagger
 * /api/blockchain/snapshot:
 *   get:
 *     summary: Get the current state of the blockchain
 *     tags: [Blockchain]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current blockchain state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blocks:
 *                   type: array
 *                   items:
 *                     type: object
 *                 credentials:
 *                   type: array
 *                   items:
 *                     type: object
 *                 currentMerkleRoot:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.get('/snapshot', apiLimiter, getBlockchain);

/**
 * @swagger
 * /api/blockchain/verify/{hash}:
 *   get:
 *     summary: Verify if a hash exists in the blockchain
 *     tags: [Blockchain]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hash
 *         required: true
 *         schema:
 *           type: string
 *         description: The hash to verify
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verified:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.get('/verify/:hash', apiLimiter, verifyHash);

export default router; 