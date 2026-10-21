import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// The wall beside the record: the names givers chose to stand in public.
// Names only. No amounts, no totals, no ranking — a £2 gift and a £500 gift
// read exactly the same here, and anonymous gifts are counted, never named.

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const { items } = await base44.asServiceRole.entities.ClimateSupport.filter(
      { status: 'paid', visibility: 'public' },
      { sort: 'created_date', limit: 300 }
    );

    const names = items
      .filter(gift => !gift.wall_hidden && gift.display_name)
      .map(gift => gift.display_name);

    const supporters = await base44.asServiceRole.entities.ClimateSupport.count({ status: 'paid' });

    return Response.json({ names, supporters });
  } catch (error) {
    console.error('[ClimateSupport] wall error:', error.message);
    return Response.json({ names: [], supporters: 0 });
  }
}