import forge from 'node-forge';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load private key
const loadPrivateKey = async () => {
  const keyPath = join(__dirname, '../../keys/private.pem');
  const privateKeyPem = await fs.readFile(keyPath, 'utf8');
  return forge.pki.privateKeyFromPem(privateKeyPem);
};

// Load public key
const loadPublicKey = async () => {
  const keyPath = join(__dirname, '../../keys/public.pem');
  const publicKeyPem = await fs.readFile(keyPath, 'utf8');
  return forge.pki.publicKeyFromPem(publicKeyPem);
};

export const generateSignature = async (data) => {
  try {
    const privateKey = await loadPrivateKey();
    const md = forge.md.sha256.create();
    md.update(data);
    const signature = privateKey.sign(md);
    return forge.util.encode64(signature);
  } catch (error) {
    console.error('Error generating signature:', error);
    throw new Error('Failed to generate signature');
  }
};

export const verifySignature = async (data, signature) => {
  try {
    const publicKey = await loadPublicKey();
    const md = forge.md.sha256.create();
    md.update(data);
    const signatureBytes = forge.util.decode64(signature);
    return publicKey.verify(md.digest().bytes(), signatureBytes);
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw new Error('Failed to verify signature');
  }
};

export const hashCredential = async (credential) => {
  try {
    const fileContent = await fs.readFile(credential.file.path);
    const metadata = JSON.stringify(credential.metadata);
    
    const md = forge.md.sha256.create();
    md.update(fileContent);
    md.update(metadata);
    
    return md.digest().toHex();
  } catch (error) {
    console.error('Error hashing credential:', error);
    throw new Error('Failed to hash credential');
  }
}; 