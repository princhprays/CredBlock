
import { BlockchainRecord, Certificate, VerificationResult } from "./types";
import { generateHash, verifySignature } from "./crypto";

export async function verifyCredential(
  certificate: Certificate,
  blockchainRecords: BlockchainRecord[]
): Promise<VerificationResult> {
  try {
    // Step 1: Find the blockchain record for this certificate
    const record = blockchainRecords.find(r => r.id === certificate.id);
    
    if (!record) {
      return {
        isValid: false,
        message: "❌ Invalid Credential: Certificate not found on blockchain"
      };
    }
    
    // Step 2: Regenerate hash from certificate data
    const certificateData = JSON.stringify({
      id: certificate.id,
      studentName: certificate.studentName,
      universityName: certificate.universityName,
      degree: certificate.degree,
      graduationDate: certificate.graduationDate,
      issuedDate: certificate.issuedDate,
    });
    
    const calculatedHash = await generateHash(certificateData);
    
    // Step 3: Compare the hash with blockchain record
    if (calculatedHash !== record.hash) {
      return {
        isValid: false,
        message: "❌ Invalid Credential: Certificate data has been altered"
      };
    }
    
    // Step 4: Verify the digital signature
    const signatureValid = await verifySignature(
      certificateData,
      certificate.signature,
      record.issuer
    );
    
    if (!signatureValid) {
      return {
        isValid: false,
        message: "❌ Invalid Credential: Invalid signature"
      };
    }
    
    // All checks passed, credential is valid
    return {
      isValid: true,
      certificateId: certificate.id,
      studentName: certificate.studentName,
      universityName: certificate.universityName,
      degree: certificate.degree,
      message: "✅ Valid Credential: Certificate verified successfully"
    };
    
  } catch (error) {
    console.error("Verification error:", error);
    return {
      isValid: false,
      message: "❌ Invalid Credential: Verification process failed"
    };
  }
}
