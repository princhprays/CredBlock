# CredBlock - Academic Credential Verification System

A full-stack application for issuing and verifying academic credentials using blockchain technology.

## Features

- ✅ Issue academic certificates with digital signatures
- 🔐 Store credential hashes on blockchain (Ethereum)
- 📱 Offline verification support
- 🔍 Real-time credential verification
- 📊 Dashboard for credential management
- 🔒 Secure digital signatures
- 📦 Offline snapshots for verification

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Vite
- React Router
- React Query

### Backend
- Node.js + Express
- SQLite (with Knex.js)
- Redis (optional, for caching)
- JWT Authentication

### Blockchain
- Ethereum (Web3.js)
- Smart Contracts for credential storage

## Project Structure

```
credblock/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
│   ├── src/          # Source code
│   ├── migrations/   # Database migrations
│   └── data/         # Database and snapshots
└── contracts/        # Smart contracts
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Backend (.env)
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd frontend
   npm run dev
   ```

## Features

### Credential Issuance
- ✅ University can issue academic certificates with digital signatures
- 🔐 Hashes of credentials are stored on a blockchain (Ethereum)
- 📝 Support for various academic credentials (degrees, certificates, etc.)

### Verification
- 🔍 Real-time verification of credentials
- 📱 Offline verification support
- 🔒 Secure digital signatures
- 📦 Offline snapshots for verification

### Security
- 🔐 Blockchain-based verification
- 🔒 Digital signatures
- 🔑 JWT authentication
- 🔒 Secure storage of credentials

## API Documentation

API documentation is available at `/api-docs` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## 🎓 Author
Tan, Georg Mikhael
Antigo, Paul john E.
- BSCS Student

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
  "name": "your name",
  "degree": "your degree",
  "graduationDate": "yyyy-mm-dd",
  "issuer": "your university",
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
Tan, Georg Mikhael
Antigo, Paul john E.
2nd Year BSCS Student
Masinloc, Zambales
GitHub: [https://github.com/princhprays/CredBlock]

