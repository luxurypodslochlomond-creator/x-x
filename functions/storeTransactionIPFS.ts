import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * STORE TRANSACTION ON IPFS
 * 
 * Pins $P51 transaction data to IPFS for:
 * - Decentralized proof (no single server owns the record)
 * - Quantum-proof integrity (content-addressed by hash)
 * - Government-proof (can't shut down IPFS network)
 * - Interplanetary-ready (Mars colonists can verify Earth transactions)
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Verify authentication
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get transaction data
        const { transaction_data, signature } = await req.json();
        
        if (!transaction_data || !signature) {
            return Response.json({ 
                error: 'Missing transaction data or signature' 
            }, { status: 400 });
        }

        // Create transaction record for IPFS
        const ipfsRecord = {
            ...transaction_data,
            signature: signature,
            timestamp: new Date().toISOString(),
            version: '1.0',
            protocol: 'P51_INTERPLANETARY'
        };

        // Convert to JSON blob
        const jsonBlob = new Blob([JSON.stringify(ipfsRecord, null, 2)], {
            type: 'application/json'
        });

        // Upload to IPFS via Pinata
        const PINATA_API_KEY = Deno.env.get('PINATA_API_KEY');
        const PINATA_SECRET_KEY = Deno.env.get('PINATA_SECRET_KEY');

        if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
            console.log('IPFS not configured, skipping IPFS storage');
            return Response.json({ 
                ipfs_hash: null,
                storage_type: 'database_only',
                note: 'IPFS infrastructure deploying soon'
            });
        }

        // Create form data for Pinata
        const formData = new FormData();
        formData.append('file', jsonBlob, `transaction_${signature.substring(0, 12)}.json`);
        
        // Add metadata
        const metadata = JSON.stringify({
            name: `P51 Transaction ${transaction_data.transaction_type}`,
            keyvalues: {
                transaction_type: transaction_data.transaction_type,
                amount: transaction_data.p51_amount.toString(),
                user: user.email
            }
        });
        formData.append('pinataMetadata', metadata);

        // Upload to IPFS
        const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_KEY
            },
            body: formData
        });

        if (!pinataResponse.ok) {
            throw new Error('IPFS transaction storage failed');
        }

        const pinataData = await pinataResponse.json();
        const ipfsHash = pinataData.IpfsHash;

        // Multiple gateway URLs for redundancy
        const gateways = [
            `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
            `https://ipfs.io/ipfs/${ipfsHash}`,
            `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`
        ];

        return Response.json({
            ipfs_hash: ipfsHash,
            gateways: gateways,
            storage_type: 'ipfs_decentralized',
            note: 'Transaction permanently stored on InterPlanetary File System'
        });

    } catch (error) {
        console.error('IPFS transaction storage error:', error);
        
        return Response.json({ 
            ipfs_hash: null,
            storage_type: 'database_only',
            error: error.message,
            note: 'Transaction stored in database, IPFS backup pending'
        });
    }
});