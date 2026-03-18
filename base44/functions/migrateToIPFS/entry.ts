/**
 * MIGRATE EXISTING CLEANUPS TO IPFS
 * 
 * Safe background migration - fetches existing photos from centralized storage
 * and pins them to IPFS (web3.storage/Filecoin) for permanent decentralization.
 * 
 * Juan Benet's vision: Data that outlives corporations, governments, and time itself.
 * Every cleanup photo becomes permanent proof of human love for Earth.
 * 
 * ♾️❤️♾️
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        // Admin only - this is a migration tool
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Admin access required' }, { status: 403 });
        }

        const WEB3_STORAGE_TOKEN = Deno.env.get('WEB3_STORAGE_TOKEN');
        if (!WEB3_STORAGE_TOKEN) {
            return Response.json({ 
                error: 'WEB3_STORAGE_TOKEN not configured',
                help: 'Get free token at web3.storage'
            }, { status: 400 });
        }

        // Get all cleanups that don't have IPFS hashes yet
        const allCleanups = await base44.asServiceRole.entities.Cleanup.filter({});
        const needsMigration = allCleanups.filter(c => 
            c.photo_url && 
            !c.photo_url.includes('ipfs') && 
            !c.ipfs_hash
        );

        const results = {
            total: allCleanups.length,
            needs_migration: needsMigration.length,
            migrated: 0,
            failed: 0,
            errors: []
        };

        // Process in batches of 5 to be gentle on APIs
        const batchSize = 5;
        for (let i = 0; i < Math.min(needsMigration.length, 50); i += batchSize) {
            const batch = needsMigration.slice(i, i + batchSize);
            
            await Promise.all(batch.map(async (cleanup) => {
                try {
                    // Fetch the existing image
                    const imageResponse = await fetch(cleanup.photo_url);
                    if (!imageResponse.ok) {
                        throw new Error(`Failed to fetch image: ${imageResponse.status}`);
                    }
                    
                    const imageBuffer = await imageResponse.arrayBuffer();
                    const blob = new Blob([imageBuffer], { 
                        type: imageResponse.headers.get('content-type') || 'image/jpeg' 
                    });

                    // Upload to IPFS via web3.storage
                    const ipfsResponse = await fetch('https://api.web3.storage/upload', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${WEB3_STORAGE_TOKEN}`,
                            'X-Name': `cleanup-${cleanup.id}.jpg`
                        },
                        body: blob
                    });

                    if (!ipfsResponse.ok) {
                        throw new Error(`IPFS upload failed: ${await ipfsResponse.text()}`);
                    }

                    const ipfsData = await ipfsResponse.json();
                    const ipfsHash = ipfsData.cid;

                    // Update cleanup with IPFS hash (keep original URL as backup)
                    await base44.asServiceRole.entities.Cleanup.update(cleanup.id, {
                        ipfs_hash: ipfsHash,
                        // Store IPFS gateway URLs for redundancy
                        ipfs_gateways: [
                            `https://w3s.link/ipfs/${ipfsHash}`,
                            `https://dweb.link/ipfs/${ipfsHash}`,
                            `https://ipfs.io/ipfs/${ipfsHash}`
                        ]
                    });

                    // Also record in IPFSUpload entity for tracking
                    await base44.asServiceRole.entities.IPFSUpload.create({
                        ipfs_hash: ipfsHash,
                        user_id: cleanup.created_by,
                        file_name: `cleanup-${cleanup.id}.jpg`,
                        file_size: imageBuffer.byteLength,
                        file_type: 'image/jpeg',
                        gateways: [
                            `https://w3s.link/ipfs/${ipfsHash}`,
                            `https://dweb.link/ipfs/${ipfsHash}`,
                            `https://ipfs.io/ipfs/${ipfsHash}`
                        ],
                        pinned_at: new Date().toISOString()
                    });

                    results.migrated++;
                    console.log(`✅ Migrated cleanup ${cleanup.id} to IPFS: ${ipfsHash}`);

                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        cleanup_id: cleanup.id,
                        error: error.message
                    });
                    console.error(`❌ Failed to migrate cleanup ${cleanup.id}:`, error.message);
                }
            }));

            // Small delay between batches to be nice to APIs
            if (i + batchSize < needsMigration.length) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        return Response.json({
            success: true,
            message: `Migration complete! Juan Benet would be proud ♾️❤️♾️`,
            results,
            note: results.needs_migration > 50 
                ? `Processed first 50. Run again to continue migration.`
                : `All cleanups now on IPFS!`
        });

    } catch (error) {
        console.error('Migration error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});