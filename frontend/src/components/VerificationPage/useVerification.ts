
import { useState, useEffect } from "react";
import { Certificate, VerificationResult } from "@/lib/types";
import { blockchain } from "@/lib/blockchain";
import { localBlockchainStorage } from "@/lib/storage";
import { verifyCredential } from "@/lib/verification";

export function useVerification() {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasLocalSnapshot, setHasLocalSnapshot] = useState(localBlockchainStorage.hasSnapshot());
  const [snapshotAge, setSnapshotAge] = useState<number | null>(localBlockchainStorage.getSnapshotAge());
  
  // Reset verification result when certificate changes
  useEffect(() => {
    if (certificate) {
      setVerificationResult(null);
    }
  }, [certificate]);
  
  const updateSnapshotStatus = () => {
    setHasLocalSnapshot(localBlockchainStorage.hasSnapshot());
    setSnapshotAge(localBlockchainStorage.getSnapshotAge());
  };
  
  const verifyCurrentCertificate = async () => {
    if (!certificate) return null;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      console.log("Verifying certificate:", certificate.id);
      
      // Use local snapshot if available, otherwise use blockchain data
      const records = localBlockchainStorage.hasSnapshot()
        ? localBlockchainStorage.getSnapshot()?.records || []
        : blockchain.getAllRecords();
      
      console.log("Using blockchain records:", records);
      
      // Verify the certificate
      const result = await verifyCredential(certificate, records);
      console.log("Verification result:", result);
      
      setVerificationResult(result);
      return result;
    } catch (error) {
      console.error("Verification error:", error);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };
  
  return {
    certificate,
    setCertificate,
    verificationResult,
    isVerifying,
    hasLocalSnapshot,
    snapshotAge,
    updateSnapshotStatus,
    verifyCurrentCertificate
  };
}
