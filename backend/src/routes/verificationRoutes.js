import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  verifyCredential,
  verifySignature
} from '../services/verificationService.js';
import { verifyCredentialHash } from '../controllers/verificationController.js';
import { validate } from '../middleware/validation.js';
import { verificationSchema } from '../schemas/verificationSchema.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '../../data/verification'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/json') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and JSON files are allowed'));
    }
  }
});

// Routes
router.post('/credential', upload.single('credential'), verifyCredential);
router.post('/signature', verifySignature);

/**
 * @swagger
 * /api/verify:
 *   post:
 *     summary: Verify a credential hash
 *     tags: [Verification]
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
 *                 description: The hash of the credential to verify
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
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.post('/', apiLimiter, validate(verificationSchema), verifyCredentialHash);

export default router; 