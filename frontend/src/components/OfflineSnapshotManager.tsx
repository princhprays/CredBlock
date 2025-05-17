import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { getSnapshot, getLastSyncTime, saveSnapshot, clearSnapshot } from '@/lib/offlineStorage';
import { formatDistanceToNow } from 'date-fns';

export function OfflineSnapshotManager() {
  const { toast } = useToast();
  const [lastSync, setLastSync] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLastSync(getLastSyncTime());
  }, []);

  const handleDownloadSnapshot = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/snapshots/download');
      if (!response.ok) throw new Error('Failed to download snapshot');
      
      const snapshot = await response.json();
      await saveSnapshot(snapshot);
      
      setLastSync(Date.now());
      
      toast({
        title: 'Snapshot Downloaded',
        description: 'The blockchain snapshot has been saved for offline use.',
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Failed to download the blockchain snapshot. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSnapshot = () => {
    clearSnapshot();
    setLastSync(0);
    toast({
      title: 'Snapshot Cleared',
      description: 'The offline snapshot has been removed.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offline Verification</CardTitle>
        <CardDescription>
          Download a blockchain snapshot for offline credential verification
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {lastSync > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Last synced: {formatDistanceToNow(lastSync, { addSuffix: true })}
            </p>
            <p className="text-sm text-gray-500">
              You can verify credentials offline using this snapshot.
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No offline snapshot available. Download one to enable offline verification.
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleClearSnapshot}
          disabled={lastSync === 0}
        >
          Clear Snapshot
        </Button>
        
        <Button
          onClick={handleDownloadSnapshot}
          disabled={isLoading}
        >
          {isLoading ? 'Downloading...' : 'Download Snapshot'}
        </Button>
      </CardFooter>
    </Card>
  );
} 