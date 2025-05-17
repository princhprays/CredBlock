import { generateSignature, hashCredential } from '../services/cryptoService.js';
import { addToBlockchain } from '../services/blockchainService.js';
import { saveCredential } from '../services/storageService.js';
import { asyncHandler, ValidationError, BlockchainError } from '../utils/errors.js';

export const issueCredential = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('No file uploaded');
  }

  if (!req.body) {
    throw new ValidationError('No metadata provided');
  }

  const credential = {
    metadata: req.body,
    file: req.file
  };

  // Generate hash of the credential
  const hash = await hashCredential(credential);

  // Sign the hash
  const signature = await generateSignature(hash);

  // Add to blockchain and get Merkle proof
  const { transactionId, merkleProof } = await addToBlockchain(hash);

  // Save credential with signature and Merkle proof
  const savedCredential = await saveCredential({
    ...credential,
    hash,
    signature,
    merkleProof,
    blockchainTxId: transactionId
  });

  res.status(201).json({
    status: 'success',
    data: {
      id: savedCredential.id,
      hash,
      signature,
      merkleProof,
      blockchainTxId: transactionId
    }
  });
});

export const getCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const credential = await getCredentialById(id);

    if (!credential) {
      return res.status(404).json({ error: 'Credential not found' });
    }

    res.json({
      ...credential,
      merkleProof: credential.merkleProof // Include Merkle proof in response
    });
  } catch (error) {
    console.error('Error retrieving credential:', error);
    res.status(500).json({ error: 'Failed to retrieve credential' });
  }
};

export const verifyCredential = asyncHandler(async (req, res) => {
  const { hash, signature, merkleProof } = req.body;

  if (!hash || !signature || !merkleProof) {
    throw new ValidationError('Missing required fields: hash, signature, or merkleProof');
  }

  // Verify signature
  const isSignatureValid = await verifySignature(hash, signature);
  if (!isSignatureValid) {
    throw new ValidationError('Invalid signature');
  }

  // Verify Merkle proof
  const isMerkleValid = await verifyMerkleProof(hash, merkleProof);
  if (!isMerkleValid) {
    throw new ValidationError('Invalid Merkle proof');
  }

  res.json({
    status: 'success',
    data: {
      valid: true,
      message: 'Credential verified successfully'
    }
  });
}); 