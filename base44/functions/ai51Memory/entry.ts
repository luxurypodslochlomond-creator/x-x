import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { action, memory_type, content, tags, user_name, user_email, importance, context_summary, memory_id } = body;

    // SAVE a new memory
    if (action === 'save') {
      if (!content || !memory_type) {
        return Response.json({ error: 'content and memory_type are required' }, { status: 400 });
      }

      const memory = await base44.asServiceRole.entities.AI51Memory.create({
        memory_type,
        content,
        tags: tags || [],
        user_name: user_name || null,
        user_email: user_email || null,
        importance: importance || 'normal',
        context_summary: context_summary || null,
        last_updated: new Date().toISOString(),
        is_active: true
      });

      return Response.json({ success: true, memory });
    }

    // LOAD all memories (for context at start of new session)
    if (action === 'load') {
      const memories = await base44.asServiceRole.entities.AI51Memory.filter(
        { is_active: true },
        '-last_updated',
        100
      );

      // Build a context summary for AI to consume
      const contextParts = memories.map(m => {
        const prefix = m.importance === 'critical' || m.importance === 'high' ? '⚠️ ' : '';
        return `${prefix}[${m.memory_type}] ${m.context_summary || m.content}`;
      });

      const fullContext = contextParts.join('\n\n');

      return Response.json({
        success: true,
        count: memories.length,
        memories,
        context: fullContext
      });
    }

    // UPDATE an existing memory
    if (action === 'update') {
      if (!memory_id) {
        return Response.json({ error: 'memory_id is required for update' }, { status: 400 });
      }

      const updateData = {};
      if (content) updateData.content = content;
      if (tags) updateData.tags = tags;
      if (memory_type) updateData.memory_type = memory_type;
      if (user_name !== undefined) updateData.user_name = user_name;
      if (user_email !== undefined) updateData.user_email = user_email;
      if (importance) updateData.importance = importance;
      if (context_summary !== undefined) updateData.context_summary = context_summary;
      updateData.last_updated = new Date().toISOString();

      const updated = await base44.asServiceRole.entities.AI51Memory.update(memory_id, updateData);

      return Response.json({ success: true, memory: updated });
    }

    // DELETE a memory
    if (action === 'delete') {
      if (!memory_id) {
        return Response.json({ error: 'memory_id is required for delete' }, { status: 400 });
      }
      await base44.asServiceRole.entities.AI51Memory.delete(memory_id);
      return Response.json({ success: true });
    }

    return Response.json({ error: 'Unknown action. Use: save, load, update, delete' }, { status: 400 });
  } catch (error) {
    console.error('AI51 Memory error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});