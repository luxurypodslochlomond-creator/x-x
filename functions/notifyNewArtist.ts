import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Send notification when artist is added by manager
 * Called after artist creation in ScottAddArtist
 */
Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { artist_id, artist_name, artist_email } = await req.json();

        if (!artist_id || !artist_email) {
            return Response.json({ error: 'Missing artist_id or artist_email' }, { status: 400 });
        }

        // Send invitation email
        await base44.integrations.Core.SendEmail({
            to: artist_email,
            subject: `You're added to CB51 as ${artist_name}`,
            body: `Hey ${artist_name},\n\nYour manager just added you to CB51.\n\nLog in here and you'll see your artist profile.\n\nLove ❤️`
        });

        return Response.json({ success: true, message: 'Notification sent' });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});