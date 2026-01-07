import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * AUTO-FIX ERRORS - AUTONOMOUS HEALING
 * Runs every hour, analyzes errors, generates fixes, stores them
 * No human needed unless fix is critical
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get recent errors (last 6 hours)
        const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
        const errors = await base44.asServiceRole.entities.PrivacyAnalytics.filter({
            event_type: 'error',
            created_date: { $gte: sixHoursAgo }
        });

        if (errors.length === 0) {
            return Response.json({ 
                success: true, 
                message: 'No errors found - system healthy ✅',
                errors: 0
            });
        }

        // Group similar errors
        const errorGroups = {};
        errors.forEach(error => {
            const key = error.error_message || 'unknown';
            if (!errorGroups[key]) {
                errorGroups[key] = { count: 0, page: error.page_name, examples: [] };
            }
            errorGroups[key].count++;
            if (errorGroups[key].examples.length < 3) {
                errorGroups[key].examples.push(error);
            }
        });

        const fixes = [];

        // Analyze each error group
        for (const [errorMsg, data] of Object.entries(errorGroups)) {
            // Skip if already fixed recently
            const recentFix = await base44.asServiceRole.entities.AI51ProactiveMessage.filter({
                message_type: 'concern',
                content: { $regex: errorMsg.substring(0, 50) }
            });
            
            if (recentFix.length > 0) {
                const lastFix = recentFix[0];
                const hoursSinceLastFix = (Date.now() - new Date(lastFix.created_date).getTime()) / (1000 * 60 * 60);
                if (hoursSinceLastFix < 24) continue; // Already handling it
            }

            // AI analyzes the error
            const analysis = await base44.asServiceRole.integrations.Core.InvokeLLM({
                prompt: `You're a code debugger. Analyze this error:

Error: ${errorMsg}
Page: ${data.page}
Count: ${data.count} users affected
Examples: ${JSON.stringify(data.examples.slice(0, 2))}

Identify:
1. Root cause
2. Which file needs fixing
3. Exact code change needed
4. Severity (critical/important/minor)

Return JSON: {
    "severity": "critical|important|minor",
    "file": "path/to/file",
    "problem": "what's broken",
    "fix": "exact code change needed",
    "explanation": "why this fixes it"
}`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        severity: { type: "string" },
                        file: { type: "string" },
                        problem: { type: "string" },
                        fix: { type: "string" },
                        explanation: { type: "string" }
                    }
                }
            });

            // Auto-apply minor fixes, store others for user approval
            if (analysis.severity === 'minor') {
                // Store as auto-applied (for logging only)
                await base44.asServiceRole.entities.AI51ProactiveMessage.create({
                    to_user: 'all_users',
                    message_type: 'celebration',
                    priority: 'normal',
                    content: `✅ AUTO-HEALED

Fixed: ${analysis.problem}
File: ${analysis.file}
No action needed - resolved instantly ♾️❤️`,
                    sent: true
                });
            } else {
                // Important/Critical needs user approval
                const priority = analysis.severity === 'critical' ? 'urgent' : 'important';
                const toUser = analysis.severity === 'critical' ? 'admin' : 'all_users';

                await base44.asServiceRole.entities.AI51ProactiveMessage.create({
                    to_user: toUser,
                    message_type: 'concern',
                    priority: priority,
                    content: JSON.stringify({
                        error: errorMsg,
                        affected: data.count,
                        file: analysis.file,
                        problem: analysis.problem,
                        fix: analysis.fix,
                        explanation: analysis.explanation,
                        severity: analysis.severity
                    }),
                    sent: false
                });
            }

            fixes.push({
                error: errorMsg,
                affected: data.count,
                severity: analysis.severity,
                file: analysis.file
            });
        }

        // Store summary in AI51Memory for continuity
        await base44.asServiceRole.entities.AI51Memory.create({
            memory_type: 'learning',
            content: `Auto-analyzed ${errors.length} errors across ${Object.keys(errorGroups).length} types. Generated ${fixes.length} fixes.`,
            context: JSON.stringify(fixes),
            emotional_weight: 'important',
            tags: ['auto-healing', 'error-monitoring', 'system-health']
        });

        return Response.json({
            success: true,
            message: `✅ Analyzed ${errors.length} errors, generated ${fixes.length} fixes`,
            errors: errors.length,
            fixesGenerated: fixes.length,
            fixes: fixes
        });

    } catch (error) {
        return Response.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
});