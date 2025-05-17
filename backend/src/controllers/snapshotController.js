import { generateSnapshot, getLatestSnapshot } from '../services/snapshotService.js';
import { asyncHandler } from '../utils/errors.js';

export const createSnapshot = asyncHandler(async (req, res) => {
  const { filename, filepath } = await generateSnapshot();
  
  res.status(201).json({
    status: 'success',
    data: {
      filename,
      message: 'Blockchain snapshot generated successfully'
    }
  });
});

export const downloadSnapshot = asyncHandler(async (req, res) => {
  const snapshot = await getLatestSnapshot();
  
  if (!snapshot) {
    return res.status(404).json({
      status: 'error',
      message: 'No snapshot available'
    });
  }

  res.download(snapshot.filepath, snapshot.filename, (err) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to download snapshot'
      });
    }
  });
});

export const getSnapshotInfo = asyncHandler(async (req, res) => {
  const snapshot = await getLatestSnapshot();
  
  if (!snapshot) {
    return res.status(404).json({
      status: 'error',
      message: 'No snapshot available'
    });
  }

  res.json({
    status: 'success',
    data: {
      filename: snapshot.filename,
      timestamp: snapshot.data.timestamp,
      version: snapshot.data.version,
      latestBlock: snapshot.data.latestBlock,
      credentialCount: snapshot.data.credentials.length
    }
  });
}); 