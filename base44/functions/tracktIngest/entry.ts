/**
 * TRACKT RFID Ingest Endpoint
 * 
 * Accepts scan events from RFID readers (Urovo, Zebra, Honeywell, Impinj via LLRP/REST)
 * Updates asset last-seen data and creates scan event records.
 * 
 * POST /api/functions/tracktIngest
 * Headers: x-trackt-key: <your API key>
 * 
 * Body formats supported:
 * 1. Single scan:   { tag_id, reader_id, location, site, rssi, timestamp }
 * 2. Batch scans:   { scans: [ { tag_id, reader_id, location, site, rssi, timestamp }, ... ] }
 * 3. Urovo format:  { epc, antenna, zone, signal }
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const INGEST_KEY = Deno.env.get("TRACKT_INGEST_KEY") || "trackt-dev-key";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-trackt-key',
      }
    });
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // API key validation
  const incomingKey = req.headers.get('x-trackt-key') || req.headers.get('authorization')?.replace('Bearer ', '');
  if (incomingKey !== INGEST_KEY) {
    console.error('[TRACKT] Unauthorized ingest attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const base44 = createClientFromRequest(req);

  // Normalise to array of scans
  let scans = [];
  if (Array.isArray(body.scans)) {
    scans = body.scans;
  } else if (body.tag_id || body.epc) {
    scans = [body];
  } else {
    return Response.json({ error: 'No scan data found. Provide tag_id or scans array.' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const results = { processed: 0, errors: [] };

  for (const raw of scans) {
    try {
      // Normalise field names (support Urovo/Zebra/generic formats)
      const tag_id = raw.tag_id || raw.epc || raw.tagId || raw.tag;
      if (!tag_id) { results.errors.push('Missing tag_id'); continue; }

      const reader_id = raw.reader_id || raw.antenna || raw.readerId || raw.reader || 'unknown';
      const location   = raw.location || raw.zone || raw.area || 'unknown';
      const site       = raw.site || raw.facility || 'default';
      const rssi       = raw.rssi || raw.signal || raw.signalStrength || null;
      const scan_ts    = raw.timestamp || raw.scan_timestamp || raw.scanTime || now;

      // 1. Write scan event
      const scanEvent = await base44.asServiceRole.entities.TracktScanEvent.create({
        tag_id,
        reader_id,
        location,
        site,
        rssi,
        scan_timestamp: scan_ts,
        raw_payload: raw,
      });

      // 2. Upsert asset — find existing or create new
      const existing = await base44.asServiceRole.entities.TracktAsset.filter({ tag_id });
      
      if (existing && existing.length > 0) {
        const asset = existing[0];
        await base44.asServiceRole.entities.TracktAsset.update(asset.id, {
          location,
          reader_id,
          site,
          last_seen: scan_ts,
          status: 'active',
          scan_count: (asset.scan_count || 0) + 1,
        });
        if (!asset.asset_name) {
          // Auto-name if not set
          await base44.asServiceRole.entities.TracktAsset.update(asset.id, {
            asset_name: `Asset-${tag_id.slice(-6).toUpperCase()}`,
          });
        }
      } else {
        await base44.asServiceRole.entities.TracktAsset.create({
          tag_id,
          asset_name: `Asset-${tag_id.slice(-6).toUpperCase()}`,
          location,
          reader_id,
          site,
          last_seen: scan_ts,
          status: 'active',
          scan_count: 1,
        });
      }

      results.processed++;
      console.log(`[TRACKT] Processed tag ${tag_id} at ${location}`);
    } catch (err) {
      console.error(`[TRACKT] Error processing scan:`, err.message);
      results.errors.push(err.message);
    }
  }

  return Response.json({
    success: true,
    processed: results.processed,
    errors: results.errors,
    timestamp: now,
  }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
});