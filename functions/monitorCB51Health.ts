import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * CB51 HEALTH MONITOR - AI51 AUTO-HEALING
 * Runs tests → detects breaks → logs for AI51 to fix
 * Eventually: AI51 reads errors → writes fixes automatically
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Run workflow test
        const testResult = await base44.asServiceRole.functions.invoke('testCB51Workflow', {});

        const health = {
            timestamp: new Date().toISOString(),
            status: testResult?.data?.status || 'UNKNOWN',
            passed: testResult?.data?.summary?.passed || 0,
            failed: testResult?.data?.summary?.failed || 0,
            tests: testResult?.data?.tests || [],
            needs_fix: (testResult?.data?.summary?.failed || 0) > 0
        };

        // Log to CB51 health monitoring entity
        await base44.asServiceRole.entities.ScottFeatureRequest.create({
            feature_title: `CB51 Health Check: ${health.status}`,
            description: `Automated nightly test results:\n\n✅ ${health.passed} passed\n❌ ${health.failed} failed\n\nTimestamp: ${health.timestamp}\n\nFailed tests:\n${health.tests.filter(t => !t.passed).map(t => `- ${t.test}: ${t.message}`).join('\n') || 'None'}`,
            priority: health.needs_fix ? 'urgent' : 'low',
            status: health.needs_fix ? 'pending' : 'completed',
            requested_by: 'AI51 Health Monitor'
        });

        // Future: AI51 auto-fix
        // if (health.needs_fix) {
        //     await base44.integrations.Core.InvokeLLM({
        //         prompt: `Fix these CB51 workflow breaks:\n${JSON.stringify(health.tests.filter(t => !t.passed), null, 2)}`
        //     });
        // }

        return Response.json({
            health,
            message: health.needs_fix 
                ? '⚠️ Issues detected - logged for AI51 to fix' 
                : '✅ All systems operational'
        });

    } catch (error) {
        return Response.json({ 
            error: error.message,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
});