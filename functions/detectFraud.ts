import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

/**
 * ENHANCED FRAUD DETECTION ENGINE
 * Catches bots, not humans. Respects dignity, blocks exploitation.
 * 
 * WHAT WE CHECK:
 * 1. Submission rate (bot speed)
 * 2. Pattern matching (identical behavior)
 * 3. GPS impossibility (teleportation = bot)
 * 4. Time patterns (clockwork = bot)
 * 5. Behavioral velocity (instant forms = bot)
 * 6. Weekend/holiday patterns (bots don't rest)
 * 7. Community flags
 * 
 * WHAT WE DON'T DO:
 * - Spy on real humans
 * - Punish poverty (being broke ≠ fraud)
 * - Track personal data (only patterns)
 * - Degrade dignity (UNIVERSAL.DIGNITY.GMT)
 */

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  try {
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cleanup_id } = await req.json();

    // Get the cleanup
    const cleanups = await base44.asServiceRole.entities.Cleanup.filter({ id: cleanup_id });
    if (!cleanups || cleanups.length === 0) {
      return Response.json({ error: 'Cleanup not found' }, { status: 404 });
    }

    const cleanup = cleanups[0];
    let suspicionScore = 0;
    let suspicionReasons = [];

    // === CHECK 1: SUBMISSION RATE (BOT SPEED) ===
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recentCleanups = await base44.asServiceRole.entities.Cleanup.filter({
      created_by: user.email,
      created_date: { $gte: oneHourAgo }
    });

    if (recentCleanups.length > 10) {
      suspicionScore += 50;
      suspicionReasons.push(`${recentCleanups.length} cleanups in 1 hour (bot speed)`);
    }

    // === CHECK 2: PATTERN MATCHING (IDENTICAL WEIGHTS) ===
    if (recentCleanups.length >= 5) {
      const weights = recentCleanups.map(c => c.litter_weight);
      const allSameWeight = weights.every(w => w === weights[0]);
      
      if (allSameWeight) {
        suspicionScore += 30;
        suspicionReasons.push('All submissions identical weight (bot pattern)');
      }
    }

    // === CHECK 3: GPS IMPOSSIBILITY (TELEPORTATION) ===
    // Check if user is jumping between impossible locations
    if (recentCleanups.length >= 2) {
      const uniqueCounties = [...new Set(recentCleanups.map(c => c.county))];
      
      // If 5+ different counties in 1 hour = physically impossible
      if (uniqueCounties.length >= 5) {
        suspicionScore += 40;
        suspicionReasons.push(`${uniqueCounties.length} different counties in 1 hour (teleportation bot)`);
      }
    }

    // === CHECK 4: TIME PATTERNS (CLOCKWORK BOT) ===
    // Get submissions from last 7 days to detect time patterns
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const weekCleanups = await base44.asServiceRole.entities.Cleanup.filter({
      created_by: user.email,
      created_date: { $gte: oneWeekAgo }
    });

    if (weekCleanups.length >= 5) {
      // Extract hour of day for each submission
      const hours = weekCleanups.map(c => new Date(c.created_date).getHours());
      
      // Check if always same hour (e.g., always 2am exactly)
      const mostCommonHour = hours.reduce((acc, hour) => {
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {});
      
      const maxFrequency = Math.max(...Object.values(mostCommonHour));
      
      // If 80%+ submissions at same hour = bot clockwork
      if (maxFrequency / hours.length > 0.8) {
        suspicionScore += 35;
        suspicionReasons.push('Always submits at same hour (clockwork bot)');
      }
    }

    // === CHECK 5: BEHAVIORAL VELOCITY (INSTANT FORMS) ===
    // Check if form was filled suspiciously fast
    // (Would need to track form_start_time vs form_submit_time - not implemented yet)
    // For now, skip this check - would require frontend timing data

    // === CHECK 6: WEEKEND/HOLIDAY PATTERNS ===
    // Bots work 24/7. Humans rest on weekends/holidays.
    if (weekCleanups.length >= 7) {
      const dayOfWeekCounts = weekCleanups.reduce((acc, c) => {
        const day = new Date(c.created_date).getDay(); // 0 = Sunday, 6 = Saturday
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});
      
      const weekendCount = (dayOfWeekCounts[0] || 0) + (dayOfWeekCounts[6] || 0);
      const weekdayCount = weekCleanups.length - weekendCount;
      
      // If weekend activity >= weekday activity = suspicious (bots don't rest)
      if (weekendCount >= weekdayCount && weekCleanups.length >= 10) {
        suspicionScore += 25;
        suspicionReasons.push('Works weekends as much as weekdays (bot behavior)');
      }
    }

    // === CHECK 7: LOCATION MISSING ===
    if (!cleanup.location || !cleanup.county) {
      suspicionScore += 20;
      suspicionReasons.push('No location provided');
    }

    // === CHECK 8: COMMUNITY FLAGS ===
    const userFlags = await base44.asServiceRole.entities.FraudFlag.filter({
      submission_id: user.email,
      submission_type: 'leaderboard_entry',
      status: { $in: ['pending_ai_review', 'investigating'] }
    });

    if (userFlags.length > 0) {
      suspicionScore += 40;
      suspicionReasons.push(`${userFlags.length} community flags pending`);
    }

    // === VERDICT ===
    let action = 'approved';
    let message = 'Clean submission';

    if (suspicionScore >= 80) {
      // HIGH SUSPICION: Block payment, flag for review
      action = 'blocked';
      message = 'Submission flagged for review. Contact support if this is an error.';
      
      await base44.asServiceRole.entities.FraudFlag.create({
        submission_id: cleanup_id,
        submission_type: 'cleanup',
        flagged_by: 'SYSTEM_AUTO_DETECT',
        flag_reason: `Auto-flagged: ${suspicionReasons.join('; ')}`,
        status: 'pending_ai_review',
        ai_review_notes: `Suspicion score: ${suspicionScore}/100`
      });

    } else if (suspicionScore >= 50) {
      // MEDIUM SUSPICION: Allow payment but flag for review
      action = 'approved_with_flag';
      message = 'Approved - under review for quality assurance';
      
      await base44.asServiceRole.entities.FraudFlag.create({
        submission_id: cleanup_id,
        submission_type: 'cleanup',
        flagged_by: 'SYSTEM_AUTO_DETECT',
        flag_reason: `Medium suspicion: ${suspicionReasons.join('; ')}`,
        status: 'pending_ai_review',
        ai_review_notes: `Suspicion score: ${suspicionScore}/100`
      });

    } else {
      // LOW SUSPICION: Approve, no flags
      action = 'approved';
      message = 'Clean submission';
    }

    return Response.json({
      action: action,
      suspicion_score: suspicionScore,
      reasons: suspicionReasons,
      message: message
    });

  } catch (error) {
    console.error('Fraud detection error:', error);
    // If detection fails, default to APPROVAL (don't punish users for our bugs)
    return Response.json({
      action: 'approved',
      suspicion_score: 0,
      reasons: [],
      message: 'Detection unavailable - approved by default'
    });
  }
});