
// Crypto utility functions for working with certificates

// Generate a hash from string data
export async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  // Use Web Crypto API for secure hash generation
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  
  // Convert buffer to hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Simulate key pair generation (in a real app, this would use proper asymmetric crypto)
export function generateKeyPair(): { publicKey: string, privateKey: string } {
  // In a real app, we would use proper asymmetric cryptography
  // This is just for demo purposes
  const randomId = Math.random().toString(36).substring(2, 15);
  
  return {
    publicKey: `public-${randomId}`,
    privateKey: `private-${randomId}`
  };
}

// Sign data with private key (simulated)
export async function signData(data: string, privateKey: string): Promise<string> {
  // In a real app, this would use asymmetric cryptography for signing
  // For demo, we'll create a deterministic but secure-looking signature
  const combinedData = data + privateKey;
  const signature = await generateHash(combinedData);
  
  return signature;
}

// Verify signature with public key (simulated)
export async function verifySignature(
  data: string,
  signature: string, 
  publicKey: string
): Promise<boolean> {
  // Find the university's private key (this would be done differently in production)
  const fakePrivateKey = `private-${publicKey.slice(7)}`;
  
  // Re-create the signature and compare
  const expectedSignature = await signData(data, fakePrivateKey);
  
  return signature === expectedSignature;
}
