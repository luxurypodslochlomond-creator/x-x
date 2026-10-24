import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── THE TWO FACETS THE BRIEF COUNTS ─────────────────────────────────────────────
// How many countries and how many of the taxonomy's categories actually carry a
// published entry. Counted on the server, so the brief's own numbers are counted
// rather than guessed, and stay true however many entries the record grows to.
//
// It reads through the service role, and it reads the entries themselves rather than
// asking the record to group them: the record now holds back the address a submitter
// gave, and a field kept back that way also stops the grouping queries. So it walks
// the published entries a page at a time and counts the places and categories it
// actually sees. Nothing but two numbers comes back — no records, no addresses.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const countries = new Set();
    const categories = new Set();

    let cursor;
    let pages = 0;

    // A page at a time, and a ceiling on how many pages are walked, so a large record
    // can never stall the brief. Only published entries are read.
    while (pages < 25) {
      const page = await base44.asServiceRole.entities.ClimateSolution.filter(
        { status: 'published' },
        cursor ? { limit: 200, cursor } : { limit: 200 }
      );

      const items = Array.isArray(page) ? page : (page?.items || []);

      for (const item of items) {
        const country = String(item?.country ?? '').trim();
        const category = String(item?.category ?? '').trim();
        if (country) countries.add(country);
        if (category) categories.add(category);
      }

      pages += 1;
      cursor = page?.next_cursor;
      if (!page?.has_more || !cursor) break;
    }

    return Response.json({ countries: countries.size, categories: categories.size });
  } catch (error) {
    console.error('climateRecordFacets failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}