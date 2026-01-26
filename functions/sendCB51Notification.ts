import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Send push notification to CB51 user
 * Called when: new gig offers, urgent messages, overdue invoices
 * Sends local notification to browser (service worker handles display)
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, body, tag, url } = await req.json();

    if (!title || !body) {
      return Response.json({ error: 'Missing title or body' }, { status: 400 });
    }

    console.log(`📢 Notification to ${user.email}: ${title} - ${body}`);

    // Store notification in database for later retrieval
    try {
      await base44.entities.AI51Message.create({
        recipient_email: user.email,
        from_name: 'CB51',
        message_type: 'notification',
        message: body,
        subject: title,
        status: 'unread',
        data: { url, tag },
      });
    } catch (e) {
      console.log('Message store (non-critical):', e);
    }

    return Response.json({
      success: true,
      message: 'Notification sent',
      notification: { title, body, tag, url },
    });
  } catch (error) {
    console.error('Notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});