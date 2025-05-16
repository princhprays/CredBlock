import crypto from 'crypto';

class MerkleTree {
    constructor(leaves = []) {
        this.leaves = leaves;
        this.tree = [leaves];
        this.buildTree();
    }

    buildTree() {
        let level = this.leaves;
        while (level.length > 1) {
            const nextLevel = [];
            for (let i = 0; i < level.length; i += 2) {
                const left = level[i];
                const right = i + 1 < level.length ? level[i + 1] : left;
                nextLevel.push(this.hashPair(left, right));
            }
            this.tree.push(nextLevel);
            level = nextLevel;
        }
    }

    hashPair(left, right) {
        return crypto.createHash('sha256')
            .update(left + right)
            .digest('hex');
    }

    getRoot() {
        return this.tree[this.tree.length - 1][0];
    }

    getProof(index) {
        const proof = [];
        let currentIndex = index;

        for (let i = 0; i < this.tree.length - 1; i++) {
            const level = this.tree[i];
            const isRightNode = currentIndex % 2 === 1;
            const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;
            
            if (siblingIndex < level.length) {
                proof.push({
                    hash: level[siblingIndex],
                    isRight: !isRightNode
                });
            }
            
            currentIndex = Math.floor(currentIndex / 2);
        }

        return proof;
    }

    verifyProof(leaf, proof, root) {
        let computedHash = leaf;
        
        for (const proofElement of proof) {
            if (proofElement.isRight) {
                computedHash = this.hashPair(computedHash, proofElement.hash);
            } else {
                computedHash = this.hashPair(proofElement.hash, computedHash);
            }
        }
        
        return computedHash === root;
    }
}

// Singleton instance to maintain the Merkle tree state
let merkleTree = new MerkleTree();

export const addCredentialHash = async (hash) => {
    merkleTree = new MerkleTree([...merkleTree.leaves, hash]);
    return {
        root: merkleTree.getRoot(),
        proof: merkleTree.getProof(merkleTree.leaves.length - 1)
    };
};

export const getMerkleRoot = () => {
    return merkleTree.getRoot();
};

export const getMerkleProof = (hash) => {
    const index = merkleTree.leaves.indexOf(hash);
    if (index === -1) {
        throw new Error('Hash not found in Merkle tree');
    }
    return merkleTree.getProof(index);
};

export const verifyMerkleProof = (hash, proof, root) => {
    return merkleTree.verifyProof(hash, proof, root);
};

export const getMerkleTreeSnapshot = () => {
    return {
        root: merkleTree.getRoot(),
        leaves: merkleTree.leaves
    };
}; 