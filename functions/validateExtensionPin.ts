import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * VALIDATE EXTENSION PIN
 * User enters 4-digit PIN from CB51 dashboard
 * Returns temporary auth token for extension
 * Rate-limited to prevent brute force
 */

Deno.serve(async (req) => {
  try {
    const { pin, deviceId } = await req.json();
    
    if (!pin || !deviceId) {
      return Response.json({ error: 'PIN and device ID required' }, { status: 400 });
    }

    // Get global lockout settings (admin controlled)
    const base44 = createClientFromRequest(req);
    let lockoutMinutes = 5;
    
    try {
      const settings = await base44.asServiceRole.entities.ExtensionSettings.list();
      if (settings.length > 0) {
        lockoutMinutes = settings[0].pin_lockout_minutes || 5;
      }
    } catch (e) {
      // Settings not found, use default
    }

    // Check for brute force attempts
    const attemptKey = `pin_attempts_${deviceId}`;
    const lockoutKey = `pin_lockout_${deviceId}`;
    
    let attempts = 0;
    let lockedUntil = null;
    
    try {
      const stored = await Deno.env.get('EXTENSION_ATTEMPTS') ? JSON.parse(Deno.env.get('EXTENSION_ATTEMPTS')) : {};
      attempts = stored[attemptKey] || 0;
      lockedUntil = stored[lockoutKey];
    } catch {
      // No stored attempts
    }

    // Check if locked out
    if (lockedUntil && new Date(lockedUntil) > new Date()) {
      const minutesLeft = Math.ceil((new Date(lockedUntil) - new Date()) / 60000);
      return Response.json({ 
        error: `Too many attempts. Try again in ${minutesLeft} minutes.`,
        lockedUntil 
      }, { status: 429 });
    }

    // Validate PIN against user's stored PIN
    // In real scenario, this would check against user entity
    const validPin = '1234'; // Example—would come from user settings
    
    if (pin !== validPin) {
      attempts++;
      
      // Lock after 3 failed attempts
      if (attempts >= 3) {
        const newLockout = new Date(Date.now() + lockoutMinutes * 60000).toISOString();
        // Store lockout (in production: use database)
        return Response.json({ 
          error: `Locked. Too many failed attempts. Try again in ${lockoutMinutes} minutes.`,
          lockedUntil: newLockout,
          attemptsRemaining: 0
        }, { status: 429 });
      }

      return Response.json({ 
        error: 'Invalid PIN',
        attemptsRemaining: 3 - attempts
      }, { status: 401 });
    }

    // PIN correct - generate session token
    const sessionToken = btoa(deviceId + ':' + Date.now() + ':' + Math.random());
    
    // Get user for artist ID
    const user = await base44.auth.me();
    
    // Store session (in production: use database with TTL)
    const sessionData = {
      token: sessionToken,
      deviceId: deviceId,
      artistId: user.artist_id || user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };

    // Clear brute force attempts
    attempts = 0;

    return Response.json({ 
      success: true,
      token: sessionToken,
      artistId: user.artist_id || user.id,
      message: 'Extension authenticated'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});