import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data, old_data } = await req.json();

    if (event.type !== 'update') return Response.json({ ok: true });

    // Only notify if status changed to 'done'
    if (old_data?.status === data?.status || data?.status !== 'done') {
      return Response.json({ ok: true });
    }

    const task = data;
    const creator = task.created_by;

    if (!creator) return Response.json({ ok: true });

    // Notify manager that task is done
    await base44.asServiceRole.entities.CB51Notification.create({
      recipient_email: creator,
      notification_type: 'task_completed',
      title: `✅ Task Done: ${task.title}`,
      message: `${task.responsible_name} completed "${task.title}"`,
      action_url: `/ScottToDo?id=${task.artist_id || ''}`,
      decision_button: null
    });

    // Send browser push to manager
    await base44.functions.invoke('sendBrowserPush', {
      recipient_email: creator,
      title: `✅ ${task.title}`,
      message: `${task.responsible_name} marked it done`,
      action_url: `/ScottToDo?id=${task.artist_id || ''}`,
      tag: `task-complete-${task.id}`
    });

    return Response.json({ success: true, manager_notified: creator });
  } catch (error) {
    console.error('Manager notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});