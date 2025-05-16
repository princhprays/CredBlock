
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { localBlockchainStorage } from "@/lib/storage";
import { blockchain } from "@/lib/blockchain";

interface SnapshotManagerProps {
  hasLocalSnapshot: boolean;
  onSnapshotUpdated: () => void;
}

export function SnapshotManager({ hasLocalSnapshot, onSnapshotUpdated }: SnapshotManagerProps) {
  const { toast } = useToast();
  
  const handleSaveSnapshot = () => {
    const records = blockchain.getAllRecords();
    localBlockchainStorage.saveSnapshot({
      records,
      lastUpdated: Date.now()
    });
    
    onSnapshotUpdated();
    
    toast({
      title: "Snapshot Saved",
      description: "Blockchain snapshot saved to local storage for offline verification"
    });
  };

  if (hasLocalSnapshot) return null;
  
  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No Local Snapshot</AlertTitle>
      <AlertDescription>
        Save a local snapshot for offline verification.
      </AlertDescription>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2"
        onClick={handleSaveSnapshot}
      >
        Save Snapshot
      </Button>
    </Alert>
  );
}
