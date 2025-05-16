import { Certificate } from "@/lib/types";
import { FileUploader } from "@/components/FileUploader";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface CertificateUploaderProps {
  onFileLoaded: (certificate: Certificate, isSample?: boolean) => void;
  certificate: Certificate | null;
}

export function CertificateUploader({ onFileLoaded, certificate }: CertificateUploaderProps) {
  const { toast } = useToast();
  
  const handleSampleCertificate = (index: number, sampleCertificates: Certificate[]) => {
    if (index < 0 || index >= sampleCertificates.length) return;
    
    const sampleCert = sampleCertificates[index];
    onFileLoaded(sampleCert, true);
    
    toast({
      title: "Sample Certificate Loaded",
      description: "This is a sample certificate for demonstration purposes only. It cannot be verified as it doesn't exist in the blockchain.",
      variant: "warning"
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Upload Certificate</h2>
          <FileUploader
            onFileLoaded={(cert) => onFileLoaded(cert, false)}
            onError={(message) => {
              toast({
                title: "Error",
                description: message,
                variant: "destructive"
              });
            }}
          />
        </div>
      </div>
      
      {!certificate && (
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h3 className="font-medium mb-3">Try With Sample Certificate</h3>
          <p className="text-sm text-gray-500 mb-3">
            These are sample certificates for demonstration purposes only. They cannot be verified as they don't exist in the blockchain.
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                import("@/lib/certificate").then(({ sampleCertificates }) => {
                  handleSampleCertificate(0, sampleCertificates);
                });
              }}
            >
              Jane Smith - MIT Certificate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                import("@/lib/certificate").then(({ sampleCertificates }) => {
                  handleSampleCertificate(1, sampleCertificates);
                });
              }}
            >
              John Doe - Harvard Certificate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
