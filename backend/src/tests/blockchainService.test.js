import { 
  addToBlockchain,
  getBlockchainSnapshot,
  verifyBlockchainHash
} from '../services/blockchainService.js';
import { initializeDatabase, closeDatabase } from '../services/databaseService.js';

describe('Blockchain Service', () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('Blockchain Operations', () => {
    let testHash;
    let testResult;

    it('should add hash to blockchain', async () => {
      testHash = 'test-hash-' + Date.now();
      testResult = await addToBlockchain(testHash);

      expect(testResult).toHaveProperty('transactionId');
      expect(testResult).toHaveProperty('merkleProof');
      expect(Array.isArray(testResult.merkleProof)).toBe(true);
    });

    it('should get blockchain snapshot', async () => {
      const snapshot = await getBlockchainSnapshot();

      expect(snapshot).toHaveProperty('blocks');
      expect(snapshot).toHaveProperty('credentials');
      expect(snapshot).toHaveProperty('currentMerkleRoot');
      expect(Array.isArray(snapshot.blocks)).toBe(true);
      expect(Array.isArray(snapshot.credentials)).toBe(true);
    });

    it('should verify blockchain hash', async () => {
      const isValid = await verifyBlockchainHash(testHash);
      expect(isValid).toBe(true);
    });

    it('should reject invalid hash', async () => {
      const isValid = await verifyBlockchainHash('invalid-hash');
      expect(isValid).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid hash format', async () => {
      await expect(addToBlockchain(null)).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      // Simulate database error by passing invalid data
      await expect(addToBlockchain({ invalid: 'data' })).rejects.toThrow();
    });
  });
}); 