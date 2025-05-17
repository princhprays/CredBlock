import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Certificate } from '@/lib/types';
import { verifyCredential } from '@/lib/verification';
import { verifyOffline, getSnapshot } from '@/lib/offlineStorage';
import { OfflineSnapshotManager } from '@/components/OfflineSnapshotManager';
import { CertificateCard } from '@/components/CertificateCard';
import { blockchain } from '@/lib/blockchain';

export default function VerifyCredentialPage() {
  const { toast } = useToast();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const certificate = JSON.parse(e.target?.result as string);
        setCertificate(certificate);
      } catch (error) {
        toast({
          title: 'Invalid File',
          description: 'Please upload a valid certificate file.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleVerify = async () => {
    if (!certificate) {
      toast({
        title: 'No Certificate',
        description: 'Please upload a certificate to verify',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);

    try {
      let result;

      if (isOffline) {
        const snapshot = getSnapshot();
        if (!snapshot) {
          toast({
            title: 'No Offline Data',
            description: 'Please download a blockchain snapshot first.',
            variant: 'destructive',
          });
          return;
        }
        result = await verifyOffline(certificate, snapshot);
      } else {
        result = await verifyCredential(certificate, blockchain.getAllRecords());
      }

      toast({
        title: result.isValid ? 'Verification Successful' : 'Verification Failed',
        description: result.message,
        variant: result.isValid ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Verification Error',
        description: 'Failed to verify certificate. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Verify Credential</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Certificate</CardTitle>
              <CardDescription>
                Upload a certificate file to verify its authenticity
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JSON certificate file</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".json"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {certificate && (
                <div className="mt-4">
                  <CertificateCard certificate={certificate} />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsOffline(!isOffline)}
              >
                {isOffline ? 'Switch to Online' : 'Switch to Offline'}
              </Button>
              
              <Button
                onClick={handleVerify}
                disabled={!certificate || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify Certificate'}
              </Button>
            </CardFooter>
          </Card>

          <OfflineSnapshotManager />
        </div>
      </div>
    </div>
  );
}
