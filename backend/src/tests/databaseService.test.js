import { 
  initializeDatabase,
  createBlock,
  getBlockById,
  getLatestBlock,
  createCredential,
  getCredentialByHash,
  getCredentialsByBlockId,
  closeDatabase
} from '../services/databaseService.js';

describe('Database Service', () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('Block Operations', () => {
    let testBlock;

    it('should create a new block', async () => {
      const blockData = {
        merkleRoot: 'test-root',
        timestamp: Date.now(),
        transactionId: 'test-tx'
      };

      testBlock = await createBlock(blockData);
      expect(testBlock).toHaveProperty('id');
      expect(testBlock.merkleRoot).toBe(blockData.merkleRoot);
    });

    it('should get block by id', async () => {
      const block = await getBlockById(testBlock.id);
      expect(block).toBeDefined();
      expect(block.id).toBe(testBlock.id);
    });

    it('should get latest block', async () => {
      const latestBlock = await getLatestBlock();
      expect(latestBlock).toBeDefined();
      expect(latestBlock.id).toBe(testBlock.id);
    });
  });

  describe('Credential Operations', () => {
    let testBlock;
    let testCredential;

    beforeAll(async () => {
      testBlock = await createBlock({
        merkleRoot: 'test-root-2',
        timestamp: Date.now(),
        transactionId: 'test-tx-2'
      });
    });

    it('should create a new credential', async () => {
      const credentialData = {
        hash: 'test-hash',
        merkleProof: JSON.stringify(['proof1', 'proof2']),
        blockId: testBlock.id
      };

      testCredential = await createCredential(credentialData);
      expect(testCredential).toHaveProperty('hash');
      expect(testCredential.hash).toBe(credentialData.hash);
    });

    it('should get credential by hash', async () => {
      const credential = await getCredentialByHash(testCredential.hash);
      expect(credential).toBeDefined();
      expect(credential.hash).toBe(testCredential.hash);
    });

    it('should get credentials by block id', async () => {
      const credentials = await getCredentialsByBlockId(testBlock.id);
      expect(Array.isArray(credentials)).toBe(true);
      expect(credentials.length).toBeGreaterThan(0);
      expect(credentials[0].hash).toBe(testCredential.hash);
    });
  });
}); 