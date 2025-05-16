
import { CheckCircle, XCircle } from "lucide-react";
import { VerificationResult } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface VerificationStatusProps {
  result: VerificationResult | null;
  isVerifying: boolean;
}

export function VerificationStatus({ result, isVerifying }: VerificationStatusProps) {
  if (isVerifying) {
    return (
      <Card className="mt-6 bg-muted/40">
        <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-muted rounded-full mb-4"></div>
            <div className="h-4 w-40 bg-muted rounded mb-2"></div>
            <div className="h-3 w-32 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!result) {
    return null;
  }
  
  return (
    <Card className={cn(
      "mt-6 border-2",
      result.isValid 
        ? "border-brand-green bg-brand-green/5"
        : "border-brand-red bg-brand-red/5"
    )}>
      <CardContent className="pt-6 px-6 pb-6">
        <div className="flex flex-col items-center text-center animate-fade-in">
          {result.isValid ? (
            <>
              <CheckCircle className="h-12 w-12 text-brand-green mb-4" />
              <h3 className="text-xl font-bold mb-2 text-brand-green">Valid Credential</h3>
              {result.studentName && result.universityName && (
                <p className="text-gray-600">
                  This certificate for {result.studentName} from {result.universityName} is valid.
                </p>
              )}
            </>
          ) : (
            <>
              <XCircle className="h-12 w-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold mb-2 text-brand-red">Invalid Credential</h3>
              <p className="text-gray-600">{result.message}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
