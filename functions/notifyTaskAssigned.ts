import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    if (event.type !== 'create') return Response.json({ ok: true });

    const task = data;
    if (!task || !task.responsible_email) return Response.json({ ok: true });

    // Get artist info for context
    const artist = task.artist_id 
      ? await base44.asServiceRole.entities.ScottArtist.list().then(all => all.find(a => a.id === task.artist_id))
      : null;

    // Create notification record
    await base44.asServiceRole.entities.ScottNotification.create({
      recipient_email: task.responsible_email,
      notification_type: 'task_assigned',
      title: `📋 New Task: ${task.title}`,
      message: `${task.responsible_name || 'Someone'} assigned you a task${artist ? ` for ${artist.name}` : ''}${task.deadline ? ` • Due ${new Date(task.deadline).toLocaleDateString()}` : ''}`,
      action_url: `/ScottToDo?id=${task.artist_id || ''}`,
      decision_button: null
    });

    // Send browser push
    await base44.functions.invoke('sendBrowserPush', {
      recipient_email: task.responsible_email,
      title: `📋 ${task.title}`,
      message: `Due ${task.deadline ? new Date(task.deadline).toLocaleDateString() : 'no deadline'}`,
      action_url: `/ScottToDo?id=${task.artist_id || ''}`,
      tag: `task-${task.id}`
    });

    // Add to calendar if deadline exists
    if (task.deadline) {
      await base44.functions.invoke('syncTaskToCalendar', {
        task_id: task.id,
        member_email: task.responsible_email,
        title: task.title,
        deadline: task.deadline,
        artist_id: task.artist_id
      });
    }

    return Response.json({ success: true, notified: task.responsible_email });
  } catch (error) {
    console.error('Task notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});