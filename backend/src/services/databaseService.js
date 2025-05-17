import knex from 'knex';
import config from '../../knexfile.js';
import logger from '../utils/logger.js';

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

// Initialize database
export const initializeDatabase = async () => {
  try {
    await db.migrate.latest();
    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error('Database migration failed:', error);
    throw error;
  }
};

// Block operations
export const createBlock = async (blockData) => {
  try {
    const [block] = await db('blocks').insert(blockData).returning('*');
    return block;
  } catch (error) {
    logger.error('Error creating block:', error);
    throw error;
  }
};

export const getBlockById = async (id) => {
  try {
    return await db('blocks').where({ id }).first();
  } catch (error) {
    logger.error('Error getting block:', error);
    throw error;
  }
};

export const getLatestBlock = async () => {
  try {
    return await db('blocks').orderBy('timestamp', 'desc').first();
  } catch (error) {
    logger.error('Error getting latest block:', error);
    throw error;
  }
};

// Credential operations
export const createCredential = async (credentialData) => {
  try {
    const [credential] = await db('credentials').insert(credentialData).returning('*');
    return credential;
  } catch (error) {
    logger.error('Error creating credential:', error);
    throw error;
  }
};

export const getCredentialByHash = async (hash) => {
  try {
    return await db('credentials').where({ hash }).first();
  } catch (error) {
    logger.error('Error getting credential:', error);
    throw error;
  }
};

export const getCredentialsByBlockId = async (blockId) => {
  try {
    return await db('credentials').where({ blockId });
  } catch (error) {
    logger.error('Error getting credentials by block:', error);
    throw error;
  }
};

// Cleanup
export const closeDatabase = async () => {
  try {
    await db.destroy();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error);
    throw error;
  }
}; 