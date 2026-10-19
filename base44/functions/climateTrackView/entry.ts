import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Records an anonymous view of a climate entry.
// Stores only the country code from geo-headers — no IP, no user ID, no PII.
// Also stores an optional self-identified reader_region (e.g. "Scotland") —
// voluntary, lets nations without their own ISO code be visible.
// Called from the ClimateDetail page when someone opens an entry.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { entry_id, entry_type, reader_region } = await req.json();

    if (!entry_id || !entry_type) {
      return Response.json({ ok: false });
    }

    // Derive country from request geo-headers (privacy-respecting — country only)
    const country =
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('x-country-code') ||
      req.headers.get('x-appengine-country') ||
      '';

    // Sanitize reader_region — trim, cap length, strip HTML
    const cleanRegion = reader_region
      ? String(reader_region).trim().slice(0, 60).replace(/[<>]/g, '')
      : '';

    await base44.asServiceRole.entities.ClimateView.create({
      entry_id,
      entry_type,
      country: country.toUpperCase(),
      reader_region: cleanRegion || undefined,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('climateTrackView error:', error.message);
    // Never fail the page load — views are best-effort
    return Response.json({ ok: false, error: error.message }, { status: 200 });
  }
}