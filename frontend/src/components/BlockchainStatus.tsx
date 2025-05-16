
import { Button } from "./ui/button";
import { BlockchainRecord } from "@/lib/types";
import { downloadSnapshotAsFile } from "@/lib/storage";
import { Database, Download } from "lucide-react";

interface BlockchainStatusProps {
  records: BlockchainRecord[];
  hasLocalSnapshot: boolean;
  snapshotAge: number | null;
}

export function BlockchainStatus({ records, hasLocalSnapshot, snapshotAge }: BlockchainStatusProps) {
  const formatSnapshotAge = (ageMs: number | null) => {
    if (ageMs === null) return "No snapshot";
    
    const minutes = Math.floor(ageMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-brand-blue/10 rounded-full mr-3">
            <Database className="h-5 w-5 text-brand-blue" />
          </div>
          <div>
            <h3 className="font-medium">Blockchain Status</h3>
            <p className="text-sm text-gray-500">
              {records.length} records available
              {hasLocalSnapshot && snapshotAge !== null && (
                <> • Last updated {formatSnapshotAge(snapshotAge)}</>
              )}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => downloadSnapshotAsFile(records)}
        >
          <Download className="h-4 w-4" />
          <span>Download Snapshot</span>
        </Button>
      </div>
    </div>
  );
}
