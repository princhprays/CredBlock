import { useToast } from "@/hooks/use-toast";
import { BlockchainStatus } from "@/components/BlockchainStatus";
import { VerificationStatus } from "@/components/VerificationStatus";
import { CertificateUploader } from "@/components/VerificationPage/CertificateUploader";
import { CertificateDetail } from "@/components/VerificationPage/CertificateDetail";
import { SnapshotManager } from "@/components/VerificationPage/SnapshotManager";
import { useVerification } from "@/components/VerificationPage/useVerification";
import { blockchain } from "@/lib/blockchain";
import { Certificate } from "@/lib/types";

export default function VerifyCredentialPage() {
  const { toast } = useToast();
  
  const {
    certificate,
    setCertificate,
    verificationResult,
    isVerifying,
    hasLocalSnapshot,
    snapshotAge,
    updateSnapshotStatus,
    verifyCurrentCertificate
  } = useVerification();
  
  const handleFileLoaded = (loadedCertificate: Certificate, isSample?: boolean) => {
    console.log("Certificate loaded:", loadedCertificate);
    setCertificate(loadedCertificate);
    
    if (isSample) {
      toast({
        title: "Sample Certificate Loaded",
        description: "This is a sample certificate for demonstration purposes only. It cannot be verified as it doesn't exist in the blockchain.",
        variant: "default"
      });
    } else {
      toast({
        title: "Certificate Loaded",
        description: `Certificate for ${loadedCertificate.studentName} loaded successfully`
      });
    }
  };
  
  const handleVerify = async () => {
    if (!certificate) {
      toast({
        title: "No Certificate",
        description: "Please upload a certificate to verify",
        variant: "destructive"
      });
      return;
    }

    // Check if it's a sample certificate
    if (certificate.id.startsWith('cert-00')) {
      toast({
        title: "Sample Certificate",
        description: "This is a sample certificate for demonstration purposes only. It cannot be verified as it doesn't exist in the blockchain.",
        variant: "default"
      });
      return;
    }
    
    const result = await verifyCurrentCertificate();
    
    if (result) {
      toast({
        title: result.isValid ? "Verification Successful" : "Verification Failed",
        description: result.message,
        variant: result.isValid ? "default" : "destructive"
      });
    } else {
      toast({
        title: "Verification Error",
        description: "Failed to verify certificate. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Verify Academic Credential</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Upload and verify the authenticity of academic certificates
            </p>
          </div>
          
          <BlockchainStatus
            records={blockchain.getAllRecords()}
            hasLocalSnapshot={hasLocalSnapshot}
            snapshotAge={snapshotAge}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
            <div className="space-y-4 sm:space-y-6">
              <CertificateUploader 
                onFileLoaded={handleFileLoaded}
                certificate={certificate}
              />
              
              <SnapshotManager
                hasLocalSnapshot={hasLocalSnapshot}
                onSnapshotUpdated={updateSnapshotStatus}
              />
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <CertificateDetail
                certificate={certificate}
                onVerify={handleVerify}
                isVerifying={isVerifying}
                verificationResult={verificationResult}
              />
              
              <VerificationStatus 
                result={verificationResult} 
                isVerifying={isVerifying} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
