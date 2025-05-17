import Web3 from 'web3';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { addCredentialHash, getMerkleRoot, getMerkleProof } from './merkleService.js';
import { BlockchainError } from '../utils/errors.js';
import { getCachedData, setCachedData, invalidateCache } from '../utils/cache.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Web3 (use mock in development)
const web3 = process.env.NODE_ENV === 'production' 
  ? new Web3(process.env.ETHEREUM_NODE_URL)
  : new Web3();

// Initialize SQLite database
const initDatabase = async () => {
  try {
  const db = await open({
    filename: join(__dirname, '../../data/blockchain.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      merkleRoot TEXT NOT NULL,
      previousHash TEXT,
      timestamp INTEGER NOT NULL,
      transactionId TEXT
    );

    CREATE TABLE IF NOT EXISTS credentials (
      hash TEXT PRIMARY KEY,
      merkleProof TEXT NOT NULL,
      blockId INTEGER,
      FOREIGN KEY (blockId) REFERENCES blocks(id)
    );
  `);

  return db;
  } catch (error) {
    throw new BlockchainError('Failed to initialize database');
  }
};

const db = await initDatabase();

export const addToBlockchain = async (hash) => {
  try {
    // Add hash to Merkle tree and get proof
    const { root, proof } = await addCredentialHash(hash);

    if (process.env.NODE_ENV === 'production') {
      // Add to real Ethereum blockchain
      const accounts = await web3.eth.getAccounts();
      const transaction = await web3.eth.sendTransaction({
        from: accounts[0],
        to: process.env.CONTRACT_ADDRESS,
        data: web3.utils.asciiToHex(root)
      });

      // Store in local database
      const result = await db.run(
        'INSERT INTO blocks (merkleRoot, previousHash, timestamp, transactionId) VALUES (?, ?, ?, ?)',
        [root, null, Date.now(), transaction.transactionHash]
      );

      // Store credential hash and its Merkle proof
      await db.run(
        'INSERT INTO credentials (hash, merkleProof, blockId) VALUES (?, ?, ?)',
        [hash, JSON.stringify(proof), result.lastID]
      );

      // Invalidate relevant caches
      await invalidateCache('blockchain/snapshot');
      await invalidateCache(`blockchain/verify/${hash}`);

      return { 
        transactionId: transaction.transactionHash,
        merkleProof: proof
      };
    } else {
      // Mock blockchain in development
      const mockTxId = web3.utils.randomHex(32);
      const result = await db.run(
        'INSERT INTO blocks (merkleRoot, previousHash, timestamp, transactionId) VALUES (?, ?, ?, ?)',
        [root, null, Date.now(), mockTxId]
      );

      // Store credential hash and its Merkle proof
      await db.run(
        'INSERT INTO credentials (hash, merkleProof, blockId) VALUES (?, ?, ?)',
        [hash, JSON.stringify(proof), result.lastID]
      );

      // Invalidate relevant caches
      await invalidateCache('blockchain/snapshot');
      await invalidateCache(`blockchain/verify/${hash}`);

      return { 
        transactionId: mockTxId,
        merkleProof: proof
      };
    }
  } catch (error) {
    throw new BlockchainError('Failed to add to blockchain: ' + error.message);
  }
};

export const getBlockchainSnapshot = async () => {
  try {
    // Try to get from cache first
    const cachedSnapshot = await getCachedData('blockchain/snapshot');
    if (cachedSnapshot) {
      logger.debug('Returning cached blockchain snapshot');
      return cachedSnapshot;
    }

    const blocks = await db.all('SELECT * FROM blocks ORDER BY timestamp ASC');
    const credentials = await db.all('SELECT * FROM credentials');
    
    const snapshot = {
      blocks,
      credentials,
      currentMerkleRoot: getMerkleRoot()
    };

    // Cache the snapshot for 5 minutes
    await setCachedData('blockchain/snapshot', snapshot, 300);
    
    return snapshot;
  } catch (error) {
    throw new BlockchainError('Failed to get blockchain snapshot: ' + error.message);
  }
};

export const verifyBlockchainHash = async (hash) => {
  try {
    // Try to get from cache first
    const cachedVerification = await getCachedData(`blockchain/verify/${hash}`);
    if (cachedVerification !== null) {
      logger.debug(`Returning cached verification for hash: ${hash}`);
      return cachedVerification;
    }

    const credential = await db.get('SELECT * FROM credentials WHERE hash = ?', [hash]);
    if (!credential) {
      await setCachedData(`blockchain/verify/${hash}`, false, 300);
      return false;
    }

    const block = await db.get('SELECT * FROM blocks WHERE id = ?', [credential.blockId]);
    if (!block) {
      await setCachedData(`blockchain/verify/${hash}`, false, 300);
      return false;
    }

    const proof = JSON.parse(credential.merkleProof);
    const isValid = getMerkleProof(hash, proof, block.merkleRoot);
    
    // Cache the verification result for 5 minutes
    await setCachedData(`blockchain/verify/${hash}`, isValid, 300);
    
    return isValid;
  } catch (error) {
    throw new BlockchainError('Failed to verify blockchain hash: ' + error.message);
  }
}; 