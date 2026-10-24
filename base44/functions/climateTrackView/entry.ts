import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Records an anonymous read of a climate entry.
// Stores only the country code from geo-headers — no IP, no user ID, no PII.
// Also stores an optional self-identified reader_region (e.g. "Scotland") —
// voluntary, lets nations without their own ISO code be visible.
//
// ── WHAT THE NUMBER IS, AND WHAT KEEPS IT TRUE ────────────────────────────────
// Everything downstream of this is labelled READS, never people: one entry opened is
// one read, and one person reading ten entries is ten reads. Calling that "people"
// would be the record's easiest lie, so it is never called that.
//
// Two guards keep the number from being inflated, and both of them use only what the
// record already stores — the entry, the place, and the time:
//   1. The entry must really exist and be published. An invented id adds nothing.
//   2. A place counts once per entry per half hour. A refresh, a step back and forward,
//      or a script cannot turn one read into ten.
// No IP, no cookie, no device or person identifier is kept to do this — so the reader
// is still nobody to this record.
const COUNT_WINDOW_MS = 30 * 60 * 1000;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const { entry_id, entry_type, reader_region } = await req.json();

    if (!entry_id || !entry_type) {
      return Response.json({ ok: false, counted: false });
    }

    // Derive country from request geo-headers (privacy-respecting — country only)
    const country = (
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('x-country-code') ||
      req.headers.get('x-appengine-country') ||
      ''
    ).toUpperCase();

    // Sanitize reader_region — trim, cap length, strip HTML
    const cleanRegion = reader_region
      ? String(reader_region).trim().slice(0, 60).replace(/[<>]/g, '')
      : '';

    // A nation naming itself is not an entry read, and never lands in the totals.
    // It is let through as before, so self-identification still shows up at once.
    if (entry_type !== 'region_self_id') {
      // 0. Anything that is not an entry id at all is turned away here, so junk never
      //    reaches the record and never shows up as noise in the logs.
      if (!/^[a-f0-9]{24}$/i.test(String(entry_id))) {
        return Response.json({ ok: true, counted: false });
      }

      // 1. A read only counts for a real, published entry.
      const found = entry_type === 'action'
        ? await base44.asServiceRole.entities.ClimateAction.filter(
            { id: entry_id, status: 'published' },
            { limit: 1 }
          )
        : await base44.asServiceRole.entities.ClimateSolution.filter(
            { id: entry_id, status: 'published' },
            { limit: 1 }
          );

      if (!(found?.items || []).length) {
        return Response.json({ ok: true, counted: false });
      }

      // 2. The same place reading the same entry again inside the window is the same read.
      const recent = await base44.asServiceRole.entities.ClimateView.filter(
        { entry_id, country },
        { sort: '-created_date', limit: 1 }
      );
      const last = recent?.items?.[0]?.created_date;
      if (last && Date.now() - new Date(last).getTime() < COUNT_WINDOW_MS) {
        return Response.json({ ok: true, counted: false });
      }
    }

    await base44.asServiceRole.entities.ClimateView.create({
      entry_id,
      entry_type,
      country,
      reader_region: cleanRegion || undefined,
    });

    return Response.json({ ok: true, counted: true });
  } catch (error) {
    console.error('climateTrackView error:', error.message);
    // Never fail the page load — views are best-effort
    return Response.json({ ok: false, error: error.message }, { status: 200 });
  }
}