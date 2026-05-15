import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // Fetch in pages of 500 until we have the full count — never loads full records
    let total = 0;
    let page = 0;
    const PAGE_SIZE = 500;
    while (true) {
      const batch = await base44.asServiceRole.entities.SortedCase.list('-created_date', PAGE_SIZE, page * PAGE_SIZE);
      total += batch?.length || 0;
      if (!batch || batch.length < PAGE_SIZE) break;
      page++;
    }
    return Response.json({ count: total });
  } catch (error) {
    return Response.json({ count: 0, error: error.message }, { status: 200 });
  }
});