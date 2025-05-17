import fs from 'fs/promises';
import path from 'path';
import { getLatestBlock, getAllCredentials } from './databaseService.js';
import logger from '../utils/logger.js';

const SNAPSHOT_DIR = path.join(process.cwd(), 'data', 'snapshots');

// Ensure snapshot directory exists
await fs.mkdir(SNAPSHOT_DIR, { recursive: true });

export const generateSnapshot = async () => {
  try {
    // Get latest block and all credentials
    const latestBlock = await getLatestBlock();
    const credentials = await getAllCredentials();

    // Create snapshot data
    const snapshot = {
      version: '1.0',
      timestamp: Date.now(),
      latestBlock: {
        id: latestBlock.id,
        merkleRoot: latestBlock.merkleRoot,
        timestamp: latestBlock.timestamp,
        transactionId: latestBlock.transactionId
      },
      credentials: credentials.map(cred => ({
        id: cred.id,
        hash: cred.hash,
        merkleProof: JSON.parse(cred.merkleProof),
        blockId: cred.blockId,
        metadata: JSON.parse(cred.metadata)
      }))
    };

    // Generate filename with timestamp
    const filename = `snapshot-${Date.now()}.json`;
    const filepath = path.join(SNAPSHOT_DIR, filename);

    // Save snapshot to file
    await fs.writeFile(filepath, JSON.stringify(snapshot, null, 2));

    logger.info(`Generated new blockchain snapshot: ${filename}`);
    return { filename, filepath };
  } catch (error) {
    logger.error('Error generating blockchain snapshot:', error);
    throw new Error('Failed to generate blockchain snapshot');
  }
};

export const getLatestSnapshot = async () => {
  try {
    const files = await fs.readdir(SNAPSHOT_DIR);
    const snapshots = files
      .filter(file => file.startsWith('snapshot-'))
      .sort()
      .reverse();

    if (snapshots.length === 0) {
      return null;
    }

    const latestSnapshot = snapshots[0];
    const filepath = path.join(SNAPSHOT_DIR, latestSnapshot);
    const data = await fs.readFile(filepath, 'utf-8');
    
    return {
      filename: latestSnapshot,
      filepath,
      data: JSON.parse(data)
    };
  } catch (error) {
    logger.error('Error getting latest snapshot:', error);
    throw new Error('Failed to get latest snapshot');
  }
};

export const cleanupOldSnapshots = async (keepLast = 5) => {
  try {
    const files = await fs.readdir(SNAPSHOT_DIR);
    const snapshots = files
      .filter(file => file.startsWith('snapshot-'))
      .sort()
      .reverse();

    // Keep only the most recent snapshots
    const toDelete = snapshots.slice(keepLast);
    
    for (const file of toDelete) {
      await fs.unlink(path.join(SNAPSHOT_DIR, file));
      logger.info(`Deleted old snapshot: ${file}`);
    }
  } catch (error) {
    logger.error('Error cleaning up old snapshots:', error);
    throw new Error('Failed to clean up old snapshots');
  }
}; 