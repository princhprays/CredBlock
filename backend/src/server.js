import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import helmet from 'helmet';
import { errorHandler } from './utils/errors.js';
import logger, { stream } from './utils/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import { initializeDatabase } from './services/databaseService.js';

// Import routes
import credentialRoutes from './routes/credentialRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import snapshotRoutes from './routes/snapshotRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream }));

// Apply rate limiting to all routes
app.use(apiLimiter);

// Serve static files from the data directory
app.use('/data', express.static(join(__dirname, '../data')));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/credentials', credentialRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/verify', verificationRoutes);
app.use('/api/snapshots', snapshotRoutes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Start server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Don't exit the process for Redis connection errors
  if (!error.message.includes('ECONNREFUSED')) {
    process.exit(1);
  }
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  // Don't exit the process for Redis connection errors
  if (!error.message.includes('ECONNREFUSED')) {
    process.exit(1);
  }
});

startServer(); 