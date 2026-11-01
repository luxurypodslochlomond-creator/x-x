import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── WHAT THE SOURCE SAID, IN A FEW LINES ─────────────────────────────────────
// The copies are kept so a claim can be checked after its link dies. They are not
// reprinted: the origin keeps its words and its rights, and the record sends the
// reader there first. So a reader gets what is needed to check a quote — the date
// the copy was taken, how much was held, and a short excerpt in the source's own
// words — while the whole copy stays with the keeper and is read on request.

const EXCERPT_CHARS = 480;

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const { entry_id } = await req.json().catch(() => ({}));
    if (!entry_id) return Response.json({ found: false });

    const { items } = await base44.asServiceRole.entities.ClimateSourceArchive
      .filter({ entry_id }, { sort: '-fetched_at', limit: 1 });
    const copy = items?.[0];
    if (!copy) return Response.json({ found: false });

    const text = decodeEntities(copy.archived_text || '');
    // The opening of a page is nearly always its menu. The words worth showing are
    // the sentences, so the excerpt is taken from the page's own prose — still
    // exactly as the source wrote it, just not its navigation.
    const prose = text.split('\n').map(l => l.trim()).filter(l => l.length >= 80).join(' ');
    const source = prose.length >= 120 ? prose : text.replace(/\n+/g, ' ');
    let excerpt = source.slice(0, EXCERPT_CHARS);
    if (source.length > EXCERPT_CHARS) excerpt = excerpt.slice(0, excerpt.lastIndexOf(' ')) + '…';

    return Response.json({
      found: true,
      fetched_at: copy.fetched_at,
      chars: copy.chars,
      content_sha256: copy.content_sha256,
      source_url: copy.source_url,
      http_status: copy.http_status,
      excerpt,
    });
  } catch (error) {
    console.log('climateSourceNote failed:', error.message);
    return Response.json({ found: false, error: error.message }, { status: 500 });
  }
}