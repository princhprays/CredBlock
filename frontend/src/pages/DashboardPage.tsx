
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blockchain } from "@/lib/blockchain";
import { downloadSnapshotAsFile, localBlockchainStorage } from "@/lib/storage";
import { BlockchainRecord } from "@/lib/types";
import { Download, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { toast } = useToast();
  
  const [records, setRecords] = useState<BlockchainRecord[]>([]);
  const [hasLocalSnapshot, setHasLocalSnapshot] = useState(false);
  const [snapshotAge, setSnapshotAge] = useState<number | null>(null);
  const [expandedRecords, setExpandedRecords] = useState<string[]>([]);
  
  useEffect(() => {
    // Get blockchain records
    const blockchainRecords = blockchain.getAllRecords();
    setRecords(blockchainRecords);
    
    // Check local snapshot status
    const hasSnapshot = localBlockchainStorage.hasSnapshot();
    setHasLocalSnapshot(hasSnapshot);
    
    if (hasSnapshot) {
      setSnapshotAge(localBlockchainStorage.getSnapshotAge());
    }
  }, []);
  
  const handleSaveSnapshot = () => {
    localBlockchainStorage.saveSnapshot({
      records,
      lastUpdated: Date.now()
    });
    
    setHasLocalSnapshot(true);
    setSnapshotAge(0);
    
    toast({
      title: "Snapshot Saved",
      description: "Blockchain snapshot saved to local storage for offline verification"
    });
  };
  
  const handleDownloadSnapshot = () => {
    downloadSnapshotAsFile(records);
    
    toast({
      title: "Snapshot Downloaded",
      description: "Blockchain data downloaded successfully"
    });
  };
  
  const formatSnapshotAge = (ageMs: number | null) => {
    if (ageMs === null) return "Never";
    
    const minutes = Math.floor(ageMs / (1000 * 60));
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };
  
  const toggleRecordExpansion = (id: string) => {
    setExpandedRecords(prev => 
      prev.includes(id) 
        ? prev.filter(recordId => recordId !== id)
        : [...prev, id]
    );
  };
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blockchain Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage blockchain records
            </p>
          </div>
          
          <div className="space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleSaveSnapshot}
            >
              <RefreshCw className="h-4 w-4" />
              Save Local Snapshot
            </Button>
            
            <Button
              className="flex items-center gap-2"
              onClick={handleDownloadSnapshot}
            >
              <Download className="h-4 w-4" />
              Download Snapshot
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Blockchain Status</CardTitle>
              <CardDescription>Current state of the verification blockchain</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Records:</span>
                  <span className="font-medium">{records.length}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Latest Update:</span>
                  <span className="font-medium">
                    {records.length > 0
                      ? new Date(records[0].timestamp).toLocaleString()
                      : "No records"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Local Snapshot</CardTitle>
              <CardDescription>Status of local verification data</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className={`font-medium ${hasLocalSnapshot ? 'text-green-600' : 'text-amber-600'}`}>
                    {hasLocalSnapshot ? 'Available' : 'Not Available'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">
                    {formatSnapshotAge(snapshotAge)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Blockchain Records</CardTitle>
            <CardDescription>
              All certificates recorded on the blockchain
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 bg-muted/50 font-medium text-sm">
                <div>Certificate ID</div>
                <div>Timestamp</div>
                <div>Issuer</div>
                <div></div>
              </div>
              
              <div className="divide-y">
                {records.length > 0 ? (
                  records.map((record) => (
                    <div key={record.id} className="text-sm">
                      <div className="grid grid-cols-4 p-4 items-center">
                        <div className="font-medium truncate">{record.id}</div>
                        <div>{new Date(record.timestamp).toLocaleString()}</div>
                        <div className="truncate">{record.issuer}</div>
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleRecordExpansion(record.id)}
                          >
                            {expandedRecords.includes(record.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {expandedRecords.includes(record.id) && (
                        <div className="p-4 pt-0 bg-muted/20">
                          <div className="text-xs font-mono break-all p-3 bg-muted/30 rounded">
                            <div><span className="font-medium">Hash:</span> {record.hash}</div>
                            <div className="mt-2"><span className="font-medium">Signature:</span> {record.signature}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No blockchain records available
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
