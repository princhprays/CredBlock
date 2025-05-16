import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize SQLite database
const initDatabase = async () => {
  const db = await open({
    filename: join(__dirname, '../../data/credentials.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS credentials (
      id TEXT PRIMARY KEY,
      filePath TEXT NOT NULL,
      metadata TEXT,
      hash TEXT NOT NULL,
      signature TEXT NOT NULL,
      blockchainTxId TEXT,
      createdAt INTEGER NOT NULL
    )
  `);

  return db;
};

const db = await initDatabase();

export const saveCredential = async (credential) => {
  try {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    // Save file to permanent storage
    const permanentPath = join(__dirname, '../../data/credentials', `${id}.${credential.file.originalname.split('.').pop()}`);
    await fs.copyFile(credential.file.path, permanentPath);

    // Save to database
    await db.run(
      `INSERT INTO credentials (id, filePath, metadata, hash, signature, blockchainTxId, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        permanentPath,
        JSON.stringify(credential.metadata),
        credential.hash,
        credential.signature,
        credential.blockchainTxId,
        timestamp
      ]
    );

    // Clean up temporary file
    await fs.unlink(credential.file.path);

    return {
      id,
      filePath: permanentPath,
      metadata: credential.metadata,
      hash: credential.hash,
      signature: credential.signature,
      blockchainTxId: credential.blockchainTxId,
      createdAt: timestamp
    };
  } catch (error) {
    console.error('Error saving credential:', error);
    throw new Error('Failed to save credential');
  }
};

export const getCredentialById = async (id) => {
  try {
    const credential = await db.get('SELECT * FROM credentials WHERE id = ?', [id]);
    
    if (!credential) {
      return null;
    }

    // Read file content
    const fileContent = await fs.readFile(credential.filePath);

    return {
      ...credential,
      metadata: JSON.parse(credential.metadata),
      file: {
        content: fileContent,
        path: credential.filePath
      }
    };
  } catch (error) {
    console.error('Error retrieving credential:', error);
    throw new Error('Failed to retrieve credential');
  }
}; 