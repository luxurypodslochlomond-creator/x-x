/**
 * DEVICE CRYPTO - ZERO SURVEILLANCE WALLET
 * Each device = unique crypto keypair
 * No usernames, no emails, just device-to-device
 * 
 * ♾️❤️♾️
 */

export class DeviceCrypto {
    static STORAGE_KEY = 'uf51_device_keypair';
    static DEVICE_ID_KEY = 'uf51_device_id';

    /**
     * Get or generate device keypair
     */
    static async getKeypair() {
        try {
            // Check if exists
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const { publicKey, privateKey } = JSON.parse(stored);
                return {
                    publicKey: await crypto.subtle.importKey(
                        'jwk',
                        publicKey,
                        { name: 'ECDSA', namedCurve: 'P-256' },
                        true,
                        ['verify']
                    ),
                    privateKey: await crypto.subtle.importKey(
                        'jwk',
                        privateKey,
                        { name: 'ECDSA', namedCurve: 'P-256' },
                        true,
                        ['sign']
                    )
                };
            }

            // Generate new keypair
            const keypair = await crypto.subtle.generateKey(
                {
                    name: 'ECDSA',
                    namedCurve: 'P-256'
                },
                true,
                ['sign', 'verify']
            );

            // Export and store
            const publicKeyJwk = await crypto.subtle.exportKey('jwk', keypair.publicKey);
            const privateKeyJwk = await crypto.subtle.exportKey('jwk', keypair.privateKey);

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
                publicKey: publicKeyJwk,
                privateKey: privateKeyJwk
            }));

            // Generate device ID from public key
            const deviceId = await this.deriveDeviceId(publicKeyJwk);
            localStorage.setItem(this.DEVICE_ID_KEY, deviceId);

            return keypair;
        } catch (error) {
            console.error('Keypair error:', error);
            throw error;
        }
    }

    /**
     * Get device ID (hash of public key)
     */
    static async getDeviceId() {
        let deviceId = localStorage.getItem(this.DEVICE_ID_KEY);
        if (!deviceId) {
            const keypair = await this.getKeypair();
            const publicKeyJwk = await crypto.subtle.exportKey('jwk', keypair.publicKey);
            deviceId = await this.deriveDeviceId(publicKeyJwk);
            localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
        }
        return deviceId;
    }

    /**
     * Derive device ID from public key
     */
    static async deriveDeviceId(publicKeyJwk) {
        const keyString = JSON.stringify(publicKeyJwk);
        const encoder = new TextEncoder();
        const data = encoder.encode(keyString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
    }

    /**
     * Sign transaction data
     */
    static async signTransaction(transactionData) {
        try {
            const keypair = await this.getKeypair();
            const encoder = new TextEncoder();
            const data = encoder.encode(JSON.stringify(transactionData));
            
            const signature = await crypto.subtle.sign(
                {
                    name: 'ECDSA',
                    hash: { name: 'SHA-256' }
                },
                keypair.privateKey,
                data
            );

            // Convert to hex
            const signatureArray = Array.from(new Uint8Array(signature));
            return signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            console.error('Signature error:', error);
            throw error;
        }
    }

    /**
     * Verify transaction signature
     */
    static async verifyTransaction(transactionData, signature, publicKeyJwk) {
        try {
            const publicKey = await crypto.subtle.importKey(
                'jwk',
                publicKeyJwk,
                { name: 'ECDSA', namedCurve: 'P-256' },
                true,
                ['verify']
            );

            const encoder = new TextEncoder();
            const data = encoder.encode(JSON.stringify(transactionData));
            
            // Convert hex signature to ArrayBuffer
            const signatureArray = signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
            const signatureBuffer = new Uint8Array(signatureArray).buffer;

            const isValid = await crypto.subtle.verify(
                {
                    name: 'ECDSA',
                    hash: { name: 'SHA-256' }
                },
                publicKey,
                signatureBuffer,
                data
            );

            return isValid;
        } catch (error) {
            console.error('Verification error:', error);
            return false;
        }
    }

    /**
     * Get public key for sharing
     */
    static async getPublicKeyForSharing() {
        const keypair = await this.getKeypair();
        return await crypto.subtle.exportKey('jwk', keypair.publicKey);
    }

    /**
     * Export keypair for backup
     */
    static async exportKeypair() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            throw new Error('No keypair found');
        }
        return stored;
    }

    /**
     * Import keypair from backup
     */
    static async importKeypair(backupData) {
        localStorage.setItem(this.STORAGE_KEY, backupData);
        
        // Regenerate device ID
        const { publicKey } = JSON.parse(backupData);
        const deviceId = await this.deriveDeviceId(publicKey);
        localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
    }
}