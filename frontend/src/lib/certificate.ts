
import { Certificate } from "./types";
import { signData } from "./crypto";

// Generate a new certificate with university signature
export async function createCertificate(
  studentName: string,
  universityName: string,
  degree: string,
  graduationDate: string,
  universityPrivateKey: string
): Promise<Certificate> {
  // Generate a unique certificate ID
  const id = `cert-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const issuedDate = new Date().toISOString().split('T')[0];
  
  // Create certificate data to sign
  const certificateData = JSON.stringify({
    id,
    studentName,
    universityName,
    degree,
    graduationDate,
    issuedDate
  });
  
  // Sign the certificate data with university's private key
  const signature = await signData(certificateData, universityPrivateKey);
  
  // Create and return the complete certificate
  return {
    id,
    studentName,
    universityName,
    degree,
    graduationDate,
    issuedDate,
    signature
  };
}

// Format certificate as downloadable JSON
export function formatCertificateForDownload(certificate: Certificate): string {
  return JSON.stringify(certificate, null, 2);
}

// Download certificate as JSON file
export function downloadCertificate(certificate: Certificate): void {
  const dataStr = formatCertificateForDownload(certificate);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  // Create download link and trigger download
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(dataBlob);
  downloadLink.download = `certificate-${certificate.id}.json`;
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Parse certificate from JSON file
export function parseCertificateFromJSON(jsonString: string): Certificate {
  try {
    return JSON.parse(jsonString) as Certificate;
  } catch (error) {
    throw new Error("Invalid certificate format");
  }
}

// Sample certificates for demo purposes
export const sampleCertificates: Certificate[] = [
  {
    id: "cert-001",
    studentName: "Jane Smith",
    universityName: "Massachusetts Institute of Technology",
    degree: "Bachelor of Science in Computer Science",
    graduationDate: "2023-05-15",
    issuedDate: "2023-05-30",
    signature: "a1b2c3d4e5f6g7h8i9j0"
  },
  {
    id: "cert-002",
    studentName: "John Doe",
    universityName: "Harvard University",
    degree: "Master of Business Administration",
    graduationDate: "2023-06-10",
    issuedDate: "2023-06-20",
    signature: "k1l2m3n4o5p6q7r8s9t0"
  }
];
