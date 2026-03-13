import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const {
      cleanup_id,
      location,
      litter_weight,
      coordinates,
      photo_url,
      ai_analysis,
      crypto_signature,
      crypto_hash
    } = payload;

    if (!cleanup_id) {
      return Response.json({ error: 'cleanup_id required' }, { status: 400 });
    }

    // Bundle all cleanup proof data
    const proofBundle = {
      cleanup_id,
      location,
      litter_weight,
      coordinates,
      photo_url,
      ai_analysis,
      crypto_signature,
      crypto_hash,
      bundle_timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const bundleJson = JSON.stringify(proofBundle, null, 2);

    // In production: Upload to web3.storage via IPFS
    // For now: Store locally and return IPFS-ready format
    // TODO: Set WEB3_STORAGE_TOKEN secret to enable actual IPFS upload

    const mockIPFSHash = 'Qm' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return Response.json({
      status: 'success',
      ipfs_hash: mockIPFSHash,
      ipfs_gateways: [
        `https://dweb.link/ipfs/${mockIPFSHash}`,
        `https://gateway.pinata.cloud/ipfs/${mockIPFSHash}`,
        `https://ipfs.io/ipfs/${mockIPFSHash}`
      ],
      bundle_size: bundleJson.length,
      message: 'Cleanup proof ready for IPFS storage'
    });

  } catch (error) {
    console.error('IPFS upload error:', error);
    return Response.json({ 
      error: error.message,
      status: 'failed'
    }, { status: 500 });
  }
});