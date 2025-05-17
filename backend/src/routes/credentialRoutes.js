import express from 'express';
import multer from 'multer';
import { validate, schemas } from '../middleware/validation.js';
import { issueCredential, verifyCredential } from '../controllers/credentialController.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post(
  '/issue',
  upload.single('credential'),
  validate(schemas.issueCredential),
  issueCredential
);

router.post(
  '/verify',
  validate(schemas.verifyCredential),
  verifyCredential
);

export default router; 