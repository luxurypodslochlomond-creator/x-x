import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SEND CB51 BRANDED INVITATION EMAIL
 * Custom email to invite new artists instead of generic Base44 invite
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { email, artistName } = await req.json();
        
        if (!email) {
            return Response.json({ error: 'Email required' }, { status: 400 });
        }

        // Send CB51 branded invitation
        const response = await base44.integrations.Core.SendEmail({
            to: email,
            subject: `You're invited to CB51 • Artist Management`,
            from_name: 'CB51',
            body: `Hi ${artistName || 'there'},

You've been invited to **CB51** — AI co-manager for artists.

📻 **CB51** helps manage:
• Gig offers + bookings
• Calendar + scheduling
• Band coordination
• Finance tracking
• Tasks + deadlines

Ready to join? Click below:
${getAppUrl()}/CB51Login

Questions? Hit reply or visit cb51.local for support.

— CB51 Team ♾️📻`
        });

        return Response.json({ success: true, email });
    } catch (error) {
        console.error('Invite error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});

function getAppUrl() {
    const isLocal = Deno.env.get('ENV') === 'development';
    if (isLocal) return 'http://localhost:3000';
    
    // Check for custom domain
    if (Deno.env.get('CB51_DOMAIN')) {
        return `https://${Deno.env.get('CB51_DOMAIN')}`;
    }
    
    return 'https://cb51.base44.app'; // fallback
}