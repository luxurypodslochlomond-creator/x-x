import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * PUBLIC endpoint - return VAPID public key for push notifications
 * No auth required (it's public)
 */

Deno.serve(async (req) => {
  try {
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    
    if (!vapidPublicKey) {
      console.error('❌ VAPID_PUBLIC_KEY not set in environment');
      return Response.json({ error: 'VAPID key not configured' }, { status: 500 });
    }

    console.log('✓ VAPID public key served');
    return Response.json({ vapidPublicKey });
  } catch (error) {
    console.error('VAPID fetch error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});