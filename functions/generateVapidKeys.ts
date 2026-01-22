import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if VAPID keys already exist for any admin user
    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    const adminWithKeys = admins.find(a => a.vapid_public_key && a.vapid_private_key);
    
    if (adminWithKeys) {
      // Return existing keys (any user can get public key)
      return Response.json({
        success: true,
        publicKey: adminWithKeys.vapid_public_key,
        message: 'VAPID keys retrieved ✓'
      });
    }

    // Only admin can generate new keys
    if (user.role !== 'admin') {
      return Response.json({ error: 'No VAPID keys configured. Ask admin to enable notifications.' }, { status: 403 });
    }

    // Generate new VAPID keys (admin only)
    const vapidKeys = webpush.generateVAPIDKeys();

    // Store in current admin user
    await base44.asServiceRole.entities.User.update(user.id, {
      vapid_public_key: vapidKeys.publicKey,
      vapid_private_key: vapidKeys.privateKey
    });

    return Response.json({
      success: true,
      publicKey: vapidKeys.publicKey,
      message: 'VAPID keys generated and stored ✓'
    });
    
    // If no keys exist and user isn't admin - admin must generate first
    return Response.json({ error: 'No VAPID keys configured. Ask admin to enable notifications.' }, { status: 403 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});