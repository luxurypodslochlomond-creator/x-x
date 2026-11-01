import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── KEEP WHAT THE SOURCE SAID ─────────────────────────────────────────────────
// A link is a promise somebody else keeps. This takes the promise out of their
// hands: it reads the origin itself, keeps the words exactly as they stood, and
// fingerprints that copy. If the page changes, a second copy is taken — the old
// one is never edited, because a copy that can be quietly rewritten is worthless.
//
// Only a keeper can run this, and the record still always sends the reader to the
// origin first. This is a copy for reading, not a claim of ownership.

const LIMIT_CHARS = 40000;

function readable(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article|blockquote)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ ]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function fingerprint(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function takeCopy(candidate) {
  const response = await fetch(candidate.source_url, {
    signal: AbortSignal.timeout(20000),
    redirect: 'follow',
    headers: { 'User-Agent': 'TogetherWeCanChangeClimate/1.0 (record source archive)' },
  });
  if (!response.ok) {
    return { ok: false, entry_id: candidate.entry_id, url: candidate.source_url, reason: `Origin answered ${response.status}` };
  }
  const text = readable(await response.text()).slice(0, LIMIT_CHARS);
  if (text.length < 40) {
    return { ok: false, entry_id: candidate.entry_id, url: candidate.source_url, reason: 'Nothing readable was returned' };
  }
  return {
    ok: true,
    copy: {
      entry_type: candidate.entry_type,
      entry_id: candidate.entry_id,
      entry_title: candidate.entry_title,
      source_url: candidate.source_url,
      source_name: candidate.source_name || '',
      fetched_at: new Date().toISOString(),
      http_status: response.status,
      chars: text.length,
      content_sha256: await fingerprint(text),
      archived_text: text,
    },
  };
}

async function candidatesOf(base44, entityName, entryType) {
  const { items } = await base44.asServiceRole.entities[entityName].filter({ status: 'published' }, { limit: 200 });
  return items
    .filter(r => typeof r.source_url === 'string' && r.source_url.startsWith('http'))
    .map(r => ({
      entry_type: entryType,
      entry_id: r.id,
      entry_title: r.headline || r.title || '',
      source_url: r.source_url,
      source_name: r.source_name || '',
    }));
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const { limit = 60, refresh = false } = await req.json().catch(() => ({}));

    const [solutions, actions, news] = await Promise.all([
      candidatesOf(base44, 'ClimateSolution', 'solution'),
      candidatesOf(base44, 'ClimateAction', 'action'),
      candidatesOf(base44, 'ClimateNews', 'news'),
    ]);
    const all = [...solutions, ...actions, ...news];

    const existing = await base44.asServiceRole.entities.ClimateSourceArchive.filter({}, { limit: 500 });
    const alreadyKept = new Set(refresh ? [] : existing.items.map(c => c.entry_id));

    const queue = all.filter(c => !alreadyKept.has(c.entry_id)).slice(0, limit);
    if (queue.length === 0) {
      return Response.json({ kept: 0, skipped: all.length, failed: [], note: 'Every source already has a copy.' });
    }

    const kept = [];
    const failed = [];
    for (let i = 0; i < queue.length; i += 6) {
      const batch = await Promise.allSettled(queue.slice(i, i + 6).map(takeCopy));
      batch.forEach(result => {
        if (result.status === 'fulfilled' && result.value.ok) kept.push(result.value.copy);
        else if (result.status === 'fulfilled') failed.push(result.value);
        else failed.push({ url: 'unknown', reason: result.reason?.message || 'Could not be read' });
      });
    }

    if (kept.length > 0) {
      await base44.asServiceRole.entities.ClimateSourceArchive.bulkCreate(kept);
    }

    return Response.json({
      kept: kept.length,
      skipped: all.length - queue.length,
      stillToKeep: Math.max(0, all.length - alreadyKept.size - kept.length),
      failed,
    });
  } catch (error) {
    console.log('climateArchiveSources failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}