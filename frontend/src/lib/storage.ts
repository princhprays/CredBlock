
import { Snapshot, BlockchainRecord } from "./types";

// Local storage wrapper for blockchain data
export const localBlockchainStorage = {
  // Save blockchain snapshot
  saveSnapshot: (snapshot: Snapshot): void => {
    localStorage.setItem('blockchain-snapshot', JSON.stringify(snapshot));
  },
  
  // Get stored blockchain snapshot
  getSnapshot: (): Snapshot | null => {
    const data = localStorage.getItem('blockchain-snapshot');
    if (!data) return null;
    
    try {
      return JSON.parse(data) as Snapshot;
    } catch (e) {
      console.error('Failed to parse snapshot data', e);
      return null;
    }
  },
  
  // Check if we have a snapshot stored
  hasSnapshot: (): boolean => {
    return localStorage.getItem('blockchain-snapshot') !== null;
  },
  
  // Get snapshot age in milliseconds
  getSnapshotAge: (): number | null => {
    const snapshot = localBlockchainStorage.getSnapshot();
    if (!snapshot) return null;
    
    return Date.now() - snapshot.lastUpdated;
  }
};

// Download snapshot as JSON file
export function downloadSnapshotAsFile(records: BlockchainRecord[]): void {
  const snapshot: Snapshot = {
    records,
    lastUpdated: Date.now()
  };
  
  const dataStr = JSON.stringify(snapshot, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  // Create download link and trigger download
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(dataBlob);
  downloadLink.download = `blockchain-snapshot-${new Date().toISOString().slice(0, 10)}.json`;
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
