/**
 * TRACKT AI Query Engine
 * 
 * Natural language → asset intelligence.
 * Ask "where is DEF-07?" or "show overdue assets" and get real answers.
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { query, site } = body;
  if (!query?.trim()) {
    return Response.json({ error: 'Query is required' }, { status: 400 });
  }

  const base44 = createClientFromRequest(req);

  // Fetch current asset data to give the AI real context
  let assets = [];
  let scanEvents = [];
  try {
    if (site) {
      assets = await base44.asServiceRole.entities.TracktAsset.filter({ site });
    } else {
      assets = await base44.asServiceRole.entities.TracktAsset.list('-last_seen', 200);
    }
    scanEvents = await base44.asServiceRole.entities.TracktScanEvent.list('-scan_timestamp', 50);
  } catch (err) {
    console.error('[TRACKT QUERY] Failed to fetch data:', err.message);
    return Response.json({ error: 'Failed to fetch asset data' }, { status: 500 });
  }

  // Build context summary for AI
  const now = new Date();
  const assetSummary = assets.map(a => {
    const lastSeen = a.last_seen ? new Date(a.last_seen) : null;
    const minutesAgo = lastSeen ? Math.floor((now - lastSeen) / 60000) : null;
    const timeLabel = minutesAgo === null ? 'never'
      : minutesAgo < 1 ? 'just now'
      : minutesAgo < 60 ? `${minutesAgo}m ago`
      : minutesAgo < 1440 ? `${Math.floor(minutesAgo / 60)}h ago`
      : `${Math.floor(minutesAgo / 1440)}d ago`;

    return `• ${a.asset_name || a.tag_id} | tag:${a.tag_id} | location:${a.location || 'unknown'} | site:${a.site || 'default'} | status:${a.status} | last_seen:${timeLabel} | scans:${a.scan_count || 0}`;
  }).join('\n');

  const recentScans = scanEvents.slice(0, 20).map(s =>
    `• ${s.tag_id} scanned at ${s.location} (${s.reader_id}) — ${new Date(s.scan_timestamp).toLocaleTimeString()}`
  ).join('\n');

  const prompt = `You are TRACKT, an AI intelligence layer for RFID asset tracking. You answer questions about real asset data clearly and concisely.

LIVE ASSET DATA (${assets.length} assets):
${assetSummary || 'No assets registered yet.'}

RECENT SCAN EVENTS (last 20):
${recentScans || 'No recent scans.'}

Current time: ${now.toISOString()}

USER QUERY: "${query}"

Respond in plain English. Be direct and specific. If the asset exists in the data, give its exact location and last-seen time. If you're listing multiple assets, use a bullet list. If something is overdue or anomalous, flag it clearly. Keep responses concise — max 150 words. If there's no data yet, say so honestly and suggest they start scanning.`;

  try {
    const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          answer: { type: "string", description: "The natural language answer to the query" },
          assets_referenced: { type: "array", items: { type: "string" }, description: "Tag IDs of assets referenced in the answer" },
          anomalies: { type: "array", items: { type: "string" }, description: "Any anomalies or issues flagged" },
          confidence: { type: "string", enum: ["high", "medium", "low"] }
        },
        required: ["answer"]
      }
    });

    console.log(`[TRACKT QUERY] "${query}" → answered with confidence:${response.confidence}`);

    return Response.json({
      answer: response.answer,
      assets_referenced: response.assets_referenced || [],
      anomalies: response.anomalies || [],
      confidence: response.confidence || 'high',
      asset_count: assets.length,
      query,
    });
  } catch (err) {
    console.error('[TRACKT QUERY] LLM error:', err.message);
    return Response.json({ error: 'AI query failed', detail: err.message }, { status: 500 });
  }
});