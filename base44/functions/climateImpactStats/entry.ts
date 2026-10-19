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

    // Top stories by country-reach — which entries the world is reaching for.
    // Two aggregates (solutions + actions), each grouped by entry_id with distinct-country count.
    // No dopamine, no ranking by "popularity" — just honest reach signal for the contributor and the panel.
    const [solutionReach, actionReach] = await Promise.all([
      base44.asServiceRole.entities.ClimateView.aggregate({
        query: { entry_type: 'solution' },
        groupBy: 'entry_id',
        count: true,
        countDistinct: 'country',
        limit: 15,
      }).catch(() => ({ rows: [] })),
      base44.asServiceRole.entities.ClimateView.aggregate({
        query: { entry_type: 'action' },
        groupBy: 'entry_id',
        count: true,
        countDistinct: 'country',
        limit: 15,
      }).catch(() => ({ rows: [] })),
    ]);

    // Fetch all published entries (titles only) to join with the aggregate.
    // The record is small enough that fetching all is cheaper than per-id lookups.
    const [solutionsPage, actionsPage] = await Promise.all([
      base44.asServiceRole.entities.ClimateSolution.filter(
        { status: 'published' },
        { fields: ['title', 'entry_type', 'category'], limit: 200 }
      ).catch(() => ({ items: [] })),
      base44.asServiceRole.entities.ClimateAction.filter(
        { status: 'published' },
        { fields: ['title', 'action_type', 'category'], limit: 200 }
      ).catch(() => ({ items: [] })),
    ]);

    const solutionMap = new Map((solutionsPage.items || []).map((s) => [s.id, s]));
    const actionMap = new Map((actionsPage.items || []).map((a) => [a.id, a]));

    const topStories = [
      ...(solutionReach.rows || []).map((r) => {
        const entry = solutionMap.get(r.entry_id);
        if (!entry) return null;
        return {
          id: r.entry_id,
          type: 'solution',
          entry_type: entry.entry_type || 'solution',
          title: entry.title,
          category: entry.category,
          countries: r.count_distinct_country || 0,
          readers: r.count || 0,
        };
      }),
      ...(actionReach.rows || []).map((r) => {
        const entry = actionMap.get(r.entry_id);
        if (!entry) return null;
        return {
          id: r.entry_id,
          type: 'action',
          entry_type: 'action',
          title: entry.title,
          category: entry.category,
          countries: r.count_distinct_country || 0,
          readers: r.count || 0,
        };
      }),
    ]
      .filter(Boolean)
      .filter((s) => s.countries > 0)
      .sort((a, b) => b.countries - a.countries || b.readers - a.readers)
      .slice(0, 10);

    return Response.json({
      total_views: totalViews,
      unique_countries: countries.length,
      countries,
      regions,
      published_entries: publishedSolutions + publishedActions,
      top_stories: topStories,
    });
  } catch (error) {
    console.error('climateImpactStats error:', error.message);
    return Response.json({
      total_views: 0,
      unique_countries: 0,
      countries: [],
      regions: [],
      published_entries: 0,
      top_stories: [],
    }, { status: 200 });
  }
}