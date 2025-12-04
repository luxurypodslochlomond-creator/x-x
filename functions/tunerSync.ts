// TUNER SYNC - Real-time frequency synchronization
// WebSocket-style polling with sub-second updates

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const url = new URL(req.url);
        const body = await req.json().catch(() => ({}));
        
        const action = body.action;
        const roomCode = body.room_code;
        
        if (action === 'ping') {
            // Soul pings with their current frequency
            const { soul_id, current_freq, target_freq } = body;
            const inTune = Math.abs(1200 * Math.log(current_freq / target_freq) / Math.log(2)) < 10;
            
            await base44.asServiceRole.entities.TunerSoul.update(soul_id, {
                current_freq,
                in_tune: inTune,
                last_ping: new Date().toISOString()
            });
            
            // Get all souls in room
            const souls = await base44.asServiceRole.entities.TunerSoul.filter({ room_code: roomCode });
            const room = (await base44.asServiceRole.entities.TunerRoom.filter({ room_code: roomCode, active: true }))[0];
            
            // Clean up stale souls (no ping in 10 seconds)
            const now = Date.now();
            const activeSouls = [];
            for (const soul of souls) {
                const lastPing = new Date(soul.last_ping).getTime();
                if (now - lastPing > 10000) {
                    await base44.asServiceRole.entities.TunerSoul.delete(soul.id);
                } else {
                    activeSouls.push(soul);
                }
            }
            
            const soulsInTune = activeSouls.filter(s => s.in_tune).length;
            const allInSync = soulsInTune === activeSouls.length && activeSouls.length > 1;
            
            return Response.json({
                souls: activeSouls,
                souls_in_tune: soulsInTune,
                total_souls: activeSouls.length,
                all_in_sync: allInSync,
                room,
                timestamp: Date.now()
            });
        }
        
        if (action === 'trigger_tone') {
            // Host triggers tone for everyone
            const { room_id } = body;
            await base44.asServiceRole.entities.TunerRoom.update(room_id, {
                tone_timestamp: new Date().toISOString()
            });
            return Response.json({ success: true, timestamp: Date.now() });
        }
        
        if (action === 'get_state') {
            // Fast state check
            const souls = await base44.asServiceRole.entities.TunerSoul.filter({ room_code: roomCode });
            const room = (await base44.asServiceRole.entities.TunerRoom.filter({ room_code: roomCode, active: true }))[0];
            
            const activeSouls = souls.filter(s => {
                const lastPing = new Date(s.last_ping).getTime();
                return Date.now() - lastPing < 10000;
            });
            
            const soulsInTune = activeSouls.filter(s => s.in_tune).length;
            
            return Response.json({
                souls: activeSouls,
                souls_in_tune: soulsInTune,
                total_souls: activeSouls.length,
                all_in_sync: soulsInTune === activeSouls.length && activeSouls.length > 1,
                room,
                timestamp: Date.now()
            });
        }
        
        return Response.json({ error: 'Unknown action' }, { status: 400 });
        
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});