# 🎓 CredBlock

**Full-Stack Academic Credential Verifier Using Blockchain Principles**

CredBlock is a full-stack application designed to verify academic credentials using blockchain and digital signatures, with full offline support. It allows universities to issue digitally signed credentials and provides an offline-capable verifier for employers and institutions.

## 🌟 Features

- ✅ Issue academic certificates with digital signatures
- 🔐 Store credential hashes on blockchain (Ethereum or mock)
- 📥 Download blockchain snapshots for offline verification
- 📄 Support for PDF and JSON credential formats
- ⚙️ Modern React frontend with TypeScript
- 📦 Offline verification using local blockchain data
- 🔍 RSA digital signature verification
- 🧾 Clear validation results: `✅ Valid` or `❌ Invalid`

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express |
| Database | SQLite |
| Blockchain | Ethereum/Web3.js |
| Crypto | node-forge (RSA) |
| UI | Tailwind CSS + Radix UI |

## 📁 Project Structure

```
/credblock/
├── backend/           # Node.js backend
│   ├── controllers/   # Request handlers
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── keys/          # RSA keys
│   ├── data/          # Database and files
│   └── server.js      # Entry point
├── frontend/          # React frontend
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── components/# React components
│   │   ├── pages/     # Page components
│   │   ├── utils/     # Utility functions
│   │   └── App.tsx    # Main component
├── credentials/       # Sample credentials
├── tests/            # Unit tests
├── README.md
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- SQLite3
- (Optional) Ethereum node for production

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/princhprays/credblock.git
   cd credblock
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Generate RSA keys:
   ```bash
   cd backend
   npm run generate-keys
   ```

4. Set up environment variables:
   ```bash
   # Backend (.env)
   PORT=3001
   NODE_ENV=development
   ETHEREUM_NODE_URL=http://localhost:8545  # For production
   CONTRACT_ADDRESS=0x...                   # For production

   # Frontend (.env)
   VITE_API_URL=http://localhost:3001
   ```

5. Start the development servers:
   ```bash
   # From root directory
   npm start
   ```

## 🛠️ Development

- Backend runs on http://localhost:3001
- Frontend runs on http://localhost:5173

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Production Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

3. Set up environment variables for production

4. Start the production server:
   ```bash
   cd backend
   npm start
   ```

## 🔒 Security Features

- RSA public/private key pairs for digital signatures
- Blockchain-based hash storage for immutability
- Offline verification capability
- Secure file handling and validation
- Environment-based configuration

## 📝 License

MIT

## 👨‍🎓 Author

Paul Antigo (PJ)
- 2nd Year BSCS Student
- Masinloc, Zambales
- GitHub: [@princhprays](https://github.com/princhprays)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📌 Features

- ✅ University can issue academic certificates with digital signatures
- 🔐 Hashes of credentials are stored on a blockchain (mock or Ethereum)
- 📥 Blockchain snapshot can be downloaded for offline verification
- 📄 Supports PDF or JSON credential files
- ⚙️ Verifier UI built with React
- 📦 Offline local blockchain data stored in SQLite or JSON
- 🔍 Digital signature verification with issuer public key
- 🧾 Output result: `✅ Valid Credential` or `❌ Invalid Credential`

---

## 🏗️ Tech Stack

| Layer     | Technology         |
|----------|--------------------|
| Backend  | Node.js (Express.js) |
| Frontend | React              |
| Crypto   | Node's `crypto` module or `crypto-js` |
| Blockchain | Custom JSON-based or Ethereum mock |
| Storage  | JSON file or SQLite |
| Offline  | React + localStorage or IndexedDB |

---

## 🚀 Getting Started

### 🛠️ Backend (Node.js)

```bash
cd backend
npm install
node server.js

Starts Express server for issuing and signing credentials.

Stores hashed credentials in a simple blockchain (blockchain_snapshot.json).

Provides endpoint to download the blockchain snapshot.

🖥️ Frontend (React)

cd frontend
npm install
npm run dev


📄 Credential Format
{
  "name": "Paul Antigo",
  "degree": "BSCS",
  "graduationDate": "yyyy-mm-dd",
  "issuer": "University",
  "signature": "BASE64_ENCODED_SIGNATURE"
}

🧪 Verification Logic
Load blockchain snapshot (from file or IndexedDB).

Upload credential (PDF or JSON).

Hash the file using SHA-256.

Compare the hash to hashes in the blockchain.

Verify the digital signature using the issuer's public key.

Output:

✅ Valid Credential

❌ Invalid Credential

🔒 Security Notes
Only the hash is stored on the blockchain — privacy preserved.

The digital signature proves the credential came from the university.

Blockchain snapshot is verifiable offline and tamper-proof.

👨‍🎓 Author
Paul Antigo (PJ)
2nd Year BSCS Student
Masinloc, Zambales
GitHub: [https://github.com/princhprays]

