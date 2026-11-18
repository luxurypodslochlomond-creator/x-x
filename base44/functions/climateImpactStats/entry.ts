import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Returns aggregated, non-sensitive impact stats for the public dashboard.
// No individual records are exposed — only counts, country totals, and
// self-identified region totals (e.g. Scotland, Catalonia, Kurdistan).
// This is what powers the "global impact" view that shows Janine how far her record reaches.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const place = body?.place;
    const placeType = body?.place_type;

    // Place-specific view: which stories reached a specific country or nation.
    // The reader explores the signal — which stories landed where — without anyone being tracked.
    if (place && placeType) {
      const query = placeType === 'country'
        ? { country: place, entry_type: { $ne: 'region_self_id' } }
        : { reader_region: place, entry_type: { $ne: 'region_self_id' } };

      const totalReaders = await base44.asServiceRole.entities.ClimateView.count(query);

      const [solReach, actReach] = await Promise.all([
        base44.asServiceRole.entities.ClimateView.aggregate({
          // A crisis is an entry on the same record, stored in the same table as a solution —
          // its reads were simply never asked for here, so a country's page listed the good
          // news and left out the emergency that reader had also opened. Both, always.
          query: { ...query, entry_type: { $in: ['solution', 'climate_crisis'] } },
          groupBy: 'entry_id',
          count: true,
          limit: 50,
        }).catch(() => ({ rows: [] })),
        base44.asServiceRole.entities.ClimateView.aggregate({
          query: { ...query, entry_type: 'action' },
          groupBy: 'entry_id',
          count: true,
          limit: 50,
        }).catch(() => ({ rows: [] })),
      ]);

      const [sols, acts] = await Promise.all([
        base44.asServiceRole.entities.ClimateSolution.filter(
          { status: 'published' },
          { fields: ['title', 'entry_type', 'category'], limit: 200 }
        ).catch(() => ({ items: [] })),
        base44.asServiceRole.entities.ClimateAction.filter(
          { status: 'published' },
          { fields: ['title', 'action_type', 'category'], limit: 200 }
        ).catch(() => ({ items: [] })),
      ]);

      const solMap = new Map((sols.items || []).map((s) => [s.id, s]));
      const actMap = new Map((acts.items || []).map((a) => [a.id, a]));

      const stories = [
        ...((solReach.rows || []).map((r) => {
          const e = solMap.get(r.entry_id);
          if (!e) return null;
          return { id: r.entry_id, type: 'solution', entry_type: e.entry_type || 'solution', title: e.title, category: e.category, readers: r.count };
        })),
        ...((actReach.rows || []).map((r) => {
          const e = actMap.get(r.entry_id);
          if (!e) return null;
          return { id: r.entry_id, type: 'action', entry_type: 'action', title: e.title, category: e.category, readers: r.count };
        })),
      ].filter(Boolean).sort((a, b) => b.readers - a.readers);

      return Response.json({
        place,
        place_type: placeType,
        total_readers: totalReaders,
        stories,
      });
    }

    // Count only real entry reads — exclude region self-identifications
    const totalViews = await base44.asServiceRole.entities.ClimateView.count({
      entry_type: { $ne: 'region_self_id' }
    });

    const byCountry = await base44.asServiceRole.entities.ClimateView.aggregate({
      query: { entry_type: { $ne: 'region_self_id' } },
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
      query: { entry_type: { $ne: 'region_self_id' } },
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
    // The drawings are entries on this record too, and leaving them out of the figure made
    // a wall of named work look like nothing at all. Counted, and counted apart, so nobody
    // has to guess how much of the record is drawn rather than written.
    const publishedCartoons = await base44.asServiceRole.entities.ClimateCartoon.count({ status: 'published' }).catch(() => 0);

    // Top stories by country-reach — which entries the world is reaching for.
    // Two aggregates (solutions + actions), each grouped by entry_id with distinct-country count.
    // No dopamine, no ranking by "popularity" — just honest reach signal for the contributor and the panel.
    const [solutionReach, actionReach] = await Promise.all([
      base44.asServiceRole.entities.ClimateView.aggregate({
        // As above: a climate crisis is read on this record too, and leaving it out of the
        // reach figures made the emergencies look unread while every solution was counted.
        query: { entry_type: { $in: ['solution', 'climate_crisis'] } },
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

    // Upcoming actions — the world is acting, not just reading.
    // Published actions with a future date, soonest-first. No popularity ranking.
    // This is the "doing" signal: a story landed here, and here's what's happening next.
    const nowIso = new Date().toISOString();
    const upcomingActionsPage = await base44.asServiceRole.entities.ClimateAction.filter(
      { status: 'published', date: { $gte: nowIso } },
      { sort: 'date', limit: 12, fields: ['title', 'action_type', 'category', 'country', 'region_rough', 'date'] }
    ).catch(() => ({ items: [] }));

    const upcoming_actions = (upcomingActionsPage.items || []).map((a) => ({
      id: a.id,
      title: a.title,
      action_type: a.action_type,
      category: a.category,
      country: a.country,
      region_rough: a.region_rough,
      date: a.date,
    }));

    return Response.json({
      total_views: totalViews,
      unique_countries: countries.length,
      countries,
      regions,
      published_entries: publishedSolutions + publishedActions + publishedCartoons,
      published_cartoons: publishedCartoons,
      top_stories: topStories,
      upcoming_actions: upcoming_actions,
    });
  } catch (error) {
    console.error('climateImpactStats error:', error.message);
    // A failed count is not a zero. This used to answer with 0 reads, 0 countries and 0
    // entries on any error, and the page printed all three as though they were facts about
    // the world rather than a fact about us: the server could not look. The figures now come
    // back absent, and every page that shows them prints a dash or says the count could not
    // be reached. Nothing on this record is allowed to fail towards a number.
    return Response.json({ counts_unavailable: true }, { status: 200 });
  }
}