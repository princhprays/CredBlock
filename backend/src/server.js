import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import credentialRoutes from './routes/credentialRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the data directory
app.use('/data', express.static(join(__dirname, '../data')));

// Routes
app.use('/api/credentials', credentialRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/verify', verificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 