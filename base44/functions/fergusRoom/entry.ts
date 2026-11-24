import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Fergus's room. The PIN is the only credential this room has, so it is compared here on
// the server against a row the browser cannot read, and the key row is never sent back.
// A latch, not a vault: it keeps a page private from strangers, nothing more.
export default async function (req) {
  try {
    const payload = await req.json().catch(() => ({}));
    const pin = typeof payload.pin === 'string' ? payload.pin.trim() : '';
    if (!pin) return Response.json({ error: 'Enter the code.' }, { status: 400 });

    const base44 = createClientFromRequest(req);
    const { items } = await base44.asServiceRole.entities.FergusRoom.filter(
      {},
      { sort: '-created_date', limit: 200 }
    );

    const key = items.find((r) => r.kind === 'pin');
    if (!key || !key.body) return Response.json({ error: 'The room has no key yet.' }, { status: 409 });
    if (key.body.trim() !== pin) return Response.json({ error: 'That code is not right.' }, { status: 403 });

    if (payload.action === 'add') {
      const text = typeof payload.body === 'string' ? payload.body.trim() : '';
      if (!text) return Response.json({ error: 'Write something first.' }, { status: 400 });
      if (text.length > 2000) return Response.json({ error: 'That note is too long.' }, { status: 400 });
      await base44.asServiceRole.entities.FergusRoom.create({
        kind: 'note',
        body: text,
        from: typeof payload.from === 'string' && payload.from.trim() ? payload.from.trim().slice(0, 40) : 'Dad',
      });
    }

    const after = await base44.asServiceRole.entities.FergusRoom.filter(
      {},
      { sort: '-created_date', limit: 200 }
    );

    const notes = after.items
      .filter((r) => r.kind === 'note')
      .map((r) => ({ id: r.id, body: r.body, from: r.from || 'Dad', at: r.created_date }));

    return Response.json({ notes });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}