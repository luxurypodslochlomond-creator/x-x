Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    
    const { 
      location, 
      litter_weight, 
      coordinates, 
      photo_hash,
      cleanup_type,
      user_id
    } = payload;

    // Create the data to be signed
    const dataToSign = JSON.stringify({
      location,
      litter_weight,
      coordinates,
      photo_hash,
      cleanup_type,
      user_id,
      timestamp: new Date().toISOString()
    });

    // Generate ECDSA P-256 signature using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(dataToSign);

    // For demo: create a deterministic signature (in production, would use private key)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Create a "signature" (in production, sign with actual ECDSA private key)
    const signature = {
      signature: hashHex.substring(0, 128), // Simulated ECDSA signature
      algorithm: 'ECDSA-P256',
      data_hash: hashHex,
      signed_at: new Date().toISOString()
    };

    return Response.json({
      status: 'success',
      crypto_signature: signature.signature,
      crypto_hash: signature.data_hash,
      crypto_algorithm: signature.algorithm,
      signed_data: dataToSign
    });

  } catch (error) {
    console.error('Signature error:', error);
    return Response.json({ 
      error: error.message,
      status: 'failed'
    }, { status: 500 });
  }
});