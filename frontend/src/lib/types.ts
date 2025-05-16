
export interface Certificate {
  id: string;
  studentName: string;
  universityName: string;
  degree: string;
  graduationDate: string;
  issuedDate: string;
  signature: string;
}

export interface BlockchainRecord {
  id: string;
  hash: string;
  timestamp: number;
  issuer: string;
  signature: string;
}

export interface VerificationResult {
  isValid: boolean;
  certificateId?: string;
  studentName?: string;
  universityName?: string;
  degree?: string;
  message: string;
}

export interface UniversityProfile {
  name: string;
  publicKey: string;
  privateKey: string;
}

export interface Snapshot {
  records: BlockchainRecord[];
  lastUpdated: number;
}
