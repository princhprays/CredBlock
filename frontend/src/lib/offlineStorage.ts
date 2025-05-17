import { BlockchainRecord, Certificate } from './types';
import { generateHash, verifySignature } from './crypto';

const SNAPSHOT_KEY = 'credblock_snapshot';
const LAST_SYNC_KEY = 'credblock_last_sync';

export interface BlockchainSnapshot {
  version: string;
  timestamp: number;
  latestBlock: {
    id: string;
    merkleRoot: string;
    timestamp: number;
    transactionId: string;
  };
  credentials: Array<{
    id: string;
    hash: string;
    merkleProof: string[];
    blockId: string;
    metadata: any;
  }>;
}

export const saveSnapshot = async (snapshot: BlockchainSnapshot): Promise<void> => {
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
    localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error saving snapshot to localStorage:', error);
    throw new Error('Failed to save snapshot');
  }
};

export const getSnapshot = (): BlockchainSnapshot | null => {
  try {
    const snapshot = localStorage.getItem(SNAPSHOT_KEY);
    return snapshot ? JSON.parse(snapshot) : null;
  } catch (error) {
    console.error('Error reading snapshot from localStorage:', error);
    return null;
  }
};

export const getLastSyncTime = (): number => {
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  return lastSync ? parseInt(lastSync, 10) : 0;
};

export const isSnapshotAvailable = (): boolean => {
  return !!getSnapshot();
};

export const clearSnapshot = (): void => {
  localStorage.removeItem(SNAPSHOT_KEY);
  localStorage.removeItem(LAST_SYNC_KEY);
};

export const verifyOffline = async (
  certificate: Certificate,
  snapshot: BlockchainSnapshot
): Promise<{ isValid: boolean; message: string }> => {
  try {
    // Find the credential in the snapshot
    const credential = snapshot.credentials.find(c => c.id === certificate.id);
    
    if (!credential) {
      return {
        isValid: false,
        message: '❌ Invalid Credential: Certificate not found in offline database'
      };
    }

    // Verify the hash matches
    const certificateData = JSON.stringify({
      id: certificate.id,
      studentName: certificate.studentName,
      universityName: certificate.universityName,
      degree: certificate.degree,
      graduationDate: certificate.graduationDate,
      issuedDate: certificate.issuedDate,
    });

    const hash = await generateHash(certificateData);
    
    if (hash !== credential.hash) {
      return {
        isValid: false,
        message: '❌ Invalid Credential: Certificate data has been altered'
      };
    }

    // Verify the signature
    const signatureValid = await verifySignature(
      certificateData,
      certificate.signature,
      credential.metadata.issuer
    );

    if (!signatureValid) {
      return {
        isValid: false,
        message: '❌ Invalid Credential: Invalid signature'
      };
    }

    return {
      isValid: true,
      message: '✅ Valid Credential: Certificate verified successfully'
    };
  } catch (error) {
    console.error('Error during offline verification:', error);
    return {
      isValid: false,
      message: '❌ Invalid Credential: Verification process failed'
    };
  }
}; 