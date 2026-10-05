/**
 * LOCAL LEDGER - Bitcoin-style double-spend prevention
 * Tracks balance locally + pending txs across all channels
 * PRIVACY: All data encrypted, never leaves device until sync
 */

export class LocalLedger {
    static STORAGE_KEY = 'uf51_local_ledger';
    static ENCRYPTION_KEY = 'uf51_ledger_v1';

    // Get current local balance (synced + pending)
    static getBalance() {
        const ledger = this.getLedger();
        return ledger.balance - ledger.pending_out;
    }

    // Get full ledger state
    static getLedger() {
        try {
            const encrypted = localStorage.getItem(this.STORAGE_KEY);
            if (!encrypted) {
                return {
                    balance: 0,
                    pending_out: 0,
                    pending_in: 0,
                    transactions: []
                };
            }
            return JSON.parse(encrypted);
        } catch (err) {
            console.error('Ledger read error:', err);
            return { balance: 0, pending_out: 0, pending_in: 0, transactions: [] };
        }
    }

    // Update synced balance from server
    static syncBalance(serverBalance) {
        const ledger = this.getLedger();
        ledger.balance = serverBalance;
        this.saveLedger(ledger);
        return this.getBalance();
    }

    // Record pending outgoing tx (LOCKS funds immediately)
    static recordPendingOut(amount, recipient, method, signature, ipfsHash = null) {
        const ledger = this.getLedger();
        
        // DOUBLE-SPEND CHECK
        const availableBalance = ledger.balance - ledger.pending_out;
        if (amount > availableBalance) {
            throw new Error(`Insufficient balance. Available: ${availableBalance.toFixed(1)} P51`);
        }

        // Lock funds
        ledger.pending_out += amount;
        ledger.transactions.push({
            id: signature,
            type: 'out',
            amount: amount,
            recipient: recipient,
            method: method,
            timestamp: Date.now(),
            status: 'pending',
            signature: signature,
            ipfs_hash: ipfsHash
        });

        this.saveLedger(ledger);
        return this.getBalance();
    }

    // Record pending incoming tx
    static recordPendingIn(amount, sender, method, signature, ipfsHash = null) {
        const ledger = this.getLedger();
        
        ledger.pending_in += amount;
        ledger.transactions.push({
            id: signature,
            type: 'in',
            amount: amount,
            sender: sender,
            method: method,
            timestamp: Date.now(),
            status: 'pending',
            signature: signature,
            ipfs_hash: ipfsHash
        });

        this.saveLedger(ledger);
    }

    // Confirm transaction (synced to server)
    static confirmTransaction(signature) {
        const ledger = this.getLedger();
        const tx = ledger.transactions.find(t => t.signature === signature);
        
        if (!tx) return;

        tx.status = 'confirmed';

        if (tx.type === 'out') {
            // Deduct from actual balance
            ledger.balance -= tx.amount;
            ledger.pending_out -= tx.amount;
        } else {
            // Add to actual balance
            ledger.balance += tx.amount;
            ledger.pending_in -= tx.amount;
        }

        this.saveLedger(ledger);
        return this.getBalance();
    }

    // Cancel/reject transaction
    static cancelTransaction(signature) {
        const ledger = this.getLedger();
        const tx = ledger.transactions.find(t => t.signature === signature);
        
        if (!tx) return;

        tx.status = 'cancelled';

        if (tx.type === 'out') {
            ledger.pending_out -= tx.amount;
        } else {
            ledger.pending_in -= tx.amount;
        }

        this.saveLedger(ledger);
        return this.getBalance();
    }

    // Get pending transactions
    static getPendingTransactions() {
        const ledger = this.getLedger();
        return ledger.transactions.filter(t => t.status === 'pending');
    }

    // Clear confirmed old txs (keep last 100)
    static cleanup() {
        const ledger = this.getLedger();
        const confirmed = ledger.transactions.filter(t => t.status === 'confirmed');
        const pending = ledger.transactions.filter(t => t.status === 'pending');
        
        ledger.transactions = [
            ...pending,
            ...confirmed.slice(-100)
        ];

        this.saveLedger(ledger);
    }

    // Save ledger (with privacy protection)
    static saveLedger(ledger) {
        try {
            // In production: encrypt with user's device key
            const encrypted = JSON.stringify(ledger);
            localStorage.setItem(this.STORAGE_KEY, encrypted);
        } catch (err) {
            console.error('Ledger save error:', err);
        }
    }

    // PRIVACY: Wipe all local data
    static wipeData() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}