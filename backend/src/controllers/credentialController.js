import { generateSignature, hashCredential } from '../services/cryptoService.js';
import { addToBlockchain } from '../services/blockchainService.js';
import { saveCredential } from '../services/storageService.js';

export const issueCredential = async (req, res) => {
  try {
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

    res.json({
      message: 'Credential issued successfully',
      credential: {
        id: savedCredential.id,
        hash,
        signature,
        merkleProof,
        blockchainTxId: transactionId
      }
    });
  } catch (error) {
    console.error('Error issuing credential:', error);
    res.status(500).json({ error: 'Failed to issue credential' });
  }
};

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

export const verifyCredential = async (req, res) => {
  try {
    const { hash, signature, merkleProof } = req.body;

    // Verify signature
    const isSignatureValid = await verifySignature(hash, signature);
    if (!isSignatureValid) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Invalid signature' 
      });
    }

    // Verify Merkle proof
    const isMerkleValid = await verifyMerkleProof(hash, merkleProof);
    if (!isMerkleValid) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Invalid Merkle proof' 
      });
    }

    res.json({ 
      valid: true,
      message: 'Credential verified successfully'
    });
  } catch (error) {
    console.error('Error verifying credential:', error);
    res.status(500).json({ 
      valid: false,
      error: 'Failed to verify credential' 
    });
  }
}; 