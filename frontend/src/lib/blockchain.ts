import { BlockchainRecord, Certificate } from "./types";
import { generateHash } from "./crypto";

const STORAGE_KEY = 'blockchain_records';

// Mock blockchain implementation
class Blockchain {
  private records: BlockchainRecord[] = [];
  
  constructor() {
    this.loadFromStorage();
  }
  
  private loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.records = JSON.parse(stored);
    } else {
      this.initializeWithSampleData();
    }
  }
  
  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
  }
  
  // Add a new record to our mock blockchain
  async addRecord(certificate: Certificate, issuerPublicKey: string): Promise<BlockchainRecord> {
    // Create hash from certificate data
    const certificateData = JSON.stringify({
      id: certificate.id,
      studentName: certificate.studentName,
      universityName: certificate.universityName,
      degree: certificate.degree,
      graduationDate: certificate.graduationDate,
      issuedDate: certificate.issuedDate,
    });
    
    const hash = await generateHash(certificateData);
    
    const record: BlockchainRecord = {
      id: certificate.id,
      hash,
      timestamp: Date.now(),
      issuer: issuerPublicKey,
      signature: certificate.signature,
    };
    
    this.records.push(record);
    this.saveToStorage(); // Save to localStorage after adding record
    return record;
  }
  
  // Get a record by certificate id
  getRecordById(id: string): BlockchainRecord | undefined {
    return this.records.find(record => record.id === id);
  }
  
  // Get all records for snapshot
  getAllRecords(): BlockchainRecord[] {
    return [...this.records];
  }
  
  // Get snapshot
  getSnapshot() {
    return {
      records: this.getAllRecords(),
      lastUpdated: Date.now()
    };
  }
  
  // For demo purposes, initialize with sample data only if no records exist
  initializeWithSampleData() {
    if (this.records.length > 0) return; // Don't initialize if records exist
    
    const sampleRecords: BlockchainRecord[] = [
      {
        id: "cert-001",
        hash: "8a5edab282632443219e051e4ade2d1d5bbc671c781051bf1437897cbdfea0f1",
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
        issuer: "MIT-PUBLIC-KEY",
        signature: "a1b2c3d4e5f6g7h8i9j0"
      },
      {
        id: "cert-002",
        hash: "3fd54cbc28d997783183d6e9f3c8c89568c0c0cdc1b967ee9b0fad7eccba4a26",
        timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
        issuer: "HARVARD-PUBLIC-KEY",
        signature: "k1l2m3n4o5p6q7r8s9t0"
      }
    ];
    
    this.records = sampleRecords;
    this.saveToStorage(); // Save sample data to localStorage
  }

  // Clear all records (useful for testing)
  clearRecords() {
    this.records = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Create and export singleton instance
export const blockchain = new Blockchain();
