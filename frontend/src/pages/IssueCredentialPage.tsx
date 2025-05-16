import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Certificate } from "@/lib/types";
import { createCertificate, downloadCertificate } from "@/lib/certificate";
import { blockchain } from "@/lib/blockchain";
import { generateKeyPair } from "@/lib/crypto";
import { CertificateCard } from "@/components/CertificateCard";

export default function IssueCredentialPage() {
  const { toast } = useToast();
  
  const [studentName, setStudentName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [degree, setDegree] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName || !universityName || !degree || !graduationDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, the university would have a persistent key pair
      // For demo purposes, we generate a new one each time
      const { publicKey, privateKey } = generateKeyPair();
      
      // Create certificate with digital signature
      const newCertificate = await createCertificate(
        studentName,
        universityName,
        degree,
        graduationDate,
        privateKey
      );
      
      // Add to blockchain
      await blockchain.addRecord(newCertificate, publicKey);
      
      setCertificate(newCertificate);
      
      toast({
        title: "Certificate Created",
        description: "The academic credential has been created and added to the blockchain."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Issue Academic Credential</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Create a new blockchain-verified academic certificate
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Certificate Information</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Enter the details for the new academic credential
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-sm sm:text-base">Student Name</Label>
                    <Input
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student name"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="universityName" className="text-sm sm:text-base">University Name</Label>
                    <Input
                      id="universityName"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      placeholder="Enter university name"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-sm sm:text-base">Degree</Label>
                    <Input
                      id="degree"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Enter degree name"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="graduationDate" className="text-sm sm:text-base">Graduation Date</Label>
                    <Input
                      id="graduationDate"
                      type="date"
                      value={graduationDate}
                      onChange={(e) => setGraduationDate(e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full text-sm sm:text-base" disabled={isLoading}>
                    {isLoading ? "Creating Certificate..." : "Issue Certificate"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-medium mb-4">Certificate Preview</h3>
              
              {certificate ? (
                <div className="space-y-4">
                  <CertificateCard certificate={certificate} />
                  
                  <Button
                    variant="outline"
                    className="w-full mt-4 text-sm sm:text-base"
                    onClick={() => {
                      if (certificate) downloadCertificate(certificate);
                    }}
                  >
                    Download Certificate
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-6 sm:p-8 text-center h-full flex items-center justify-center">
                  <div className="text-gray-500">
                    <p className="text-sm sm:text-base">
                      Fill out the form and issue a certificate to see a preview here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
