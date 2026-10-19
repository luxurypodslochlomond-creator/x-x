import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Returns aggregated, non-sensitive impact stats for the public dashboard.
// No individual records are exposed — only counts, country totals, and
// self-identified region totals (e.g. Scotland, Catalonia, Kurdistan).
// This is what powers the "global impact" view that shows Janine how far her record reaches.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Count only real entry reads — exclude region self-identifications
    const totalViews = await base44.asServiceRole.entities.ClimateView.count({
      entry_type: { $ne: 'region_self_id' }
    });

    const byCountry = await base44.asServiceRole.entities.ClimateView.aggregate({
      groupBy: 'country',
      count: true,
      sort: '-count',
      limit: 200,
    });

    const countries = (byCountry.rows || [])
      .filter((r) => r.country && r.country.trim())
      .map((r) => ({ country: r.country, views: r.count }));

    // Self-identified regions — nations that don't have their own ISO code
    const byRegion = await base44.asServiceRole.entities.ClimateView.aggregate({
      groupBy: 'reader_region',
      count: true,
      sort: '-count',
      limit: 200,
    });

    const regions = (byRegion.rows || [])
      .filter((r) => r.reader_region && r.reader_region.trim())
      .map((r) => ({ region: r.reader_region, views: r.count }));

    // Count total published entries — shows the size of the record
    const publishedSolutions = await base44.asServiceRole.entities.ClimateSolution.count({ status: 'published' });
    const publishedActions = await base44.asServiceRole.entities.ClimateAction.count({ status: 'published' });

    return Response.json({
      total_views: totalViews,
      unique_countries: countries.length,
      countries,
      regions,
      published_entries: publishedSolutions + publishedActions,
    });
  } catch (error) {
    console.error('climateImpactStats error:', error.message);
    return Response.json({
      total_views: 0,
      unique_countries: 0,
      countries: [],
      regions: [],
      published_entries: 0,
    }, { status: 200 });
  }
}