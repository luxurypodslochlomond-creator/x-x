import webpush from 'npm:web-push@3.6.7';

/**
 * Generate fresh VAPID keys for push notifications
 * Returns public + private keys to set as secrets
 */
Deno.serve(async (req) => {
  try {
    const vapidKeys = webpush.generateVAPIDKeys();
    
    return Response.json({
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey,
      instructions: "Copy these to the secrets:\nVAPID_PUBLIC_KEY = " + vapidKeys.publicKey + "\nVAPID_PRIVATE_KEY = " + vapidKeys.privateKey
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});