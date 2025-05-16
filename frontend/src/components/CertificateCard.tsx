
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Certificate } from "@/lib/types";
import { downloadCertificate } from "@/lib/certificate";
import { formatDate } from "@/lib/utils";

interface CertificateCardProps {
  certificate: Certificate;
  showActions?: boolean;
}

export function CertificateCard({ certificate, showActions = true }: CertificateCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-blue/5">
        <CardTitle className="text-xl font-bold">{certificate.degree}</CardTitle>
        <CardDescription>
          Issued to {certificate.studentName} by {certificate.universityName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Certificate ID:</span>
            <span className="text-sm font-medium">{certificate.id}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Graduation Date:</span>
            <span className="text-sm font-medium">{certificate.graduationDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Issue Date:</span>
            <span className="text-sm font-medium">{certificate.issuedDate}</span>
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="bg-muted/30 pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => downloadCertificate(certificate)}
          >
            Download Certificate
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
