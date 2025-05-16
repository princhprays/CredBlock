
import { Certificate, VerificationResult } from "@/lib/types";
import { CertificateCard } from "@/components/CertificateCard";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle } from "lucide-react";

interface CertificateDetailProps {
  certificate: Certificate | null;
  onVerify: () => void;
  isVerifying: boolean;
  verificationResult?: VerificationResult | null;
}

export function CertificateDetail({ 
  certificate, 
  onVerify, 
  isVerifying,
  verificationResult 
}: CertificateDetailProps) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Certificate Details</h2>
      
      {certificate ? (
        <div className="space-y-6">
          <CertificateCard certificate={certificate} showActions={false} />
          
          <Button
            className="w-full"
            onClick={onVerify}
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Certificate"}
          </Button>
          
          {verificationResult && !verificationResult.isValid && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{verificationResult.message}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <Shield className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-gray-500">
              Upload a certificate to see details
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Valid certificates will be verified against the blockchain
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
