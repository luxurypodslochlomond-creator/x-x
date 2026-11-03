import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// A play is one number added to one field, and nothing else.
//
// The gallery is open to anyone — a child with no account can press play — so the
// browser used to keep a write on the whole creation just to bump a counter, which
// also meant anyone could rewrite a child's app through that same door. Now the
// browser asks for the counter and the server does the adding: the only thing a
// visitor can change on a creation is how many times it has been played.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const { id } = await req.json().catch(() => ({}));
    if (!id || typeof id !== 'string') {
      return Response.json({ error: 'id is required' }, { status: 400 });
    }

    const record = await base44.asServiceRole.entities.ZappCreation
      .get(id)
      .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
    if (!record) return Response.json({ error: 'Not found' }, { status: 404 });

    const play_count = (record.play_count || 0) + 1;
    await base44.asServiceRole.entities.ZappCreation.update(id, { play_count });

    return Response.json({ play_count });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}