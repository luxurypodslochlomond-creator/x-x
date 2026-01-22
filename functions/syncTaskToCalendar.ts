import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { task_id, member_email, title, deadline, artist_id } = await req.json();

    if (!deadline) return Response.json({ ok: true });

    // Create calendar event for the member
    await base44.asServiceRole.entities.ScottEvent.create({
      artist_id: artist_id || null,
      title: `📋 ${title}`,
      event_type: 'task_deadline',
      date: deadline,
      assigned_to: member_email,
      notes: `Task deadline - mark complete in CB51 when done`
    });

    return Response.json({ success: true, event_created: true });
  } catch (error) {
    console.error('Calendar sync error:', error);
    // Don't fail the whole flow if calendar sync fails
    return Response.json({ success: true, calendar_error: error.message });
  }
});