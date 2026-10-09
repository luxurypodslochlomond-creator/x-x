import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Returns aggregated, non-sensitive impact stats for the public dashboard.
// No individual records are exposed — only counts and country totals.
// This is what powers the "global impact" view that shows Janine how far her record reaches.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const totalViews = await base44.asServiceRole.entities.ClimateView.count({});

    const byCountry = await base44.asServiceRole.entities.ClimateView.aggregate({
      groupBy: 'country',
      count: true,
      sort: '-count',
      limit: 200,
    });

    const countries = (byCountry.rows || [])
      .filter((r) => r.country && r.country.trim())
      .map((r) => ({ country: r.country, views: r.count }));

    // Count total published entries — shows the size of the record
    const publishedSolutions = await base44.asServiceRole.entities.ClimateSolution.count({ status: 'published' });
    const publishedActions = await base44.asServiceRole.entities.ClimateAction.count({ status: 'published' });

    return Response.json({
      total_views: totalViews,
      unique_countries: countries.length,
      countries,
      published_entries: publishedSolutions + publishedActions,
    });
  } catch (error) {
    console.error('climateImpactStats error:', error.message);
    return Response.json({
      total_views: 0,
      unique_countries: 0,
      countries: [],
      published_entries: 0,
    }, { status: 200 });
  }
}