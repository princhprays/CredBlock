import knex from 'knex';
import config from '../../knexfile.js';
import logger from '../utils/logger.js';

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

async function resetDatabase() {
  try {
    // Drop all tables
    await db.schema.dropTableIfExists('credentials');
    await db.schema.dropTableIfExists('blocks');
    
    // Run migrations
    await db.migrate.latest();
    
    logger.info('Database reset successful');
    process.exit(0);
  } catch (error) {
    logger.error('Database reset failed:', error);
    process.exit(1);
  }
}

resetDatabase(); 