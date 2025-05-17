import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'data/blockchain.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'data/blockchain.db')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    }
  }
}; 