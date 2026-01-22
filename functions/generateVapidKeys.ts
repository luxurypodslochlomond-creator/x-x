import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // Generate VAPID keys
    const vapidKeys = webpush.generateVAPIDKeys();

    // Store in User entity
    await base44.asServiceRole.entities.User.update(user.id, {
      vapid_public_key: vapidKeys.publicKey,
      vapid_private_key: vapidKeys.privateKey
    });

    return Response.json({
      success: true,
      publicKey: vapidKeys.publicKey,
      message: 'VAPID keys generated and stored ✓'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});