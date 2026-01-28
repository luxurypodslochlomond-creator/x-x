import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * CB51 AUTOMATED WORKFLOW TESTER
 * Tests the entire gig approval flow end-to-end
 * Run this to verify everything fires properly
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const results = {
            timestamp: new Date().toISOString(),
            tests: [],
            summary: { passed: 0, failed: 0 }
        };

        const log = (test, passed, message, data = null) => {
            results.tests.push({ test, passed, message, data });
            if (passed) results.summary.passed++;
            else results.summary.failed++;
        };

        // TEST 1: Create test artist
        let testArtist;
        try {
            testArtist = await base44.asServiceRole.entities.ScottArtist.create({
                name: `TEST_ARTIST_${Date.now()}`,
                email: 'test@cb51.test',
                phone: '07700900000'
            });
            log('Create Artist', true, 'Test artist created', { id: testArtist.id });
        } catch (error) {
            log('Create Artist', false, error.message);
            return Response.json(results, { status: 500 });
        }

        // TEST 2: Create band members
        let bandMembers = [];
        try {
            for (let i = 1; i <= 3; i++) {
                const member = await base44.asServiceRole.entities.ScottTeamMember.create({
                    artist_id: testArtist.id,
                    name: `Test Member ${i}`,
                    email: `member${i}@cb51.test`,
                    role: 'band_member'
                });
                bandMembers.push(member);
            }
            log('Create Band Members', true, `Created ${bandMembers.length} band members`, { count: bandMembers.length });
        } catch (error) {
            log('Create Band Members', false, error.message);
        }

        // TEST 3: Scan gig offer (AI extraction)
        let gigOffer;
        try {
            const testEmail = `
From: promoter@venue.com
Subject: Gig Offer - The Garage Glasgow

Hi,

We'd love to have ${testArtist.name} play at The Garage Glasgow.

Date: 2026-03-15
Fee: £500
Capacity: 300
Support slot: 9pm - 9:30pm

Let me know if you're interested.

Best,
John Smith
The Garage Glasgow
`;

            const scanResult = await base44.asServiceRole.functions.invoke('scanGigOffers', {
                emailText: testEmail,
                artistId: testArtist.id
            });

            if (scanResult?.data?.success) {
                // Find the created offer
                const offers = await base44.asServiceRole.entities.ScottGigOffer.filter({
                    artist_id: testArtist.id
                });
                gigOffer = offers[offers.length - 1]; // Get most recent
                log('AI Gig Extraction', true, 'Gig offer extracted successfully', { 
                    venue: gigOffer.venue_name,
                    fee: gigOffer.fee,
                    date: gigOffer.date
                });
            } else {
                throw new Error('Scan did not return success');
            }
        } catch (error) {
            log('AI Gig Extraction', false, error.message);
        }

        // TEST 4: Manager approves → should send to band
        let notifications = [];
        try {
            await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
                status: 'sent_to_band',
                sent_to_band_at: new Date().toISOString()
            });

            // Check notifications created
            notifications = await base44.asServiceRole.entities.ScottNotification.filter({
                gig_offer_id: gigOffer.id
            });

            if (notifications.length === bandMembers.length) {
                log('Manager Approval', true, `${notifications.length} notifications sent to band`, { count: notifications.length });
            } else {
                log('Manager Approval', false, `Expected ${bandMembers.length} notifications, got ${notifications.length}`);
            }

            // Check band responses created
            const responses = await base44.asServiceRole.entities.ScottBandResponse.filter({
                gig_offer_id: gigOffer.id
            });

            if (responses.length === bandMembers.length) {
                log('Band Response Records', true, `${responses.length} response records created`);
            } else {
                log('Band Response Records', false, `Expected ${bandMembers.length} responses, got ${responses.length}`);
            }
        } catch (error) {
            log('Manager Approval', false, error.message);
        }

        // TEST 5: Band members vote YES
        try {
            const responses = await base44.asServiceRole.entities.ScottBandResponse.filter({
                gig_offer_id: gigOffer.id
            });

            for (const response of responses) {
                await base44.asServiceRole.entities.ScottBandResponse.update(response.id, {
                    decision: 'yes',
                    responded_at: new Date().toISOString()
                });
            }

            log('Band Voting', true, 'All band members voted YES');
        } catch (error) {
            log('Band Voting', false, error.message);
        }

        // TEST 6: Check auto-confirmation trigger
        try {
            // Wait a moment for automation to fire
            await new Promise(resolve => setTimeout(resolve, 2000));

            const updatedOffer = await base44.asServiceRole.entities.ScottGigOffer.list();
            const currentOffer = updatedOffer.find(o => o.id === gigOffer.id);

            if (currentOffer.status === 'confirmed') {
                log('Auto-Confirmation', true, 'Gig auto-confirmed after unanimous YES');
            } else {
                log('Auto-Confirmation', false, `Status is ${currentOffer.status}, expected confirmed`);
            }
        } catch (error) {
            log('Auto-Confirmation', false, error.message);
        }

        // TEST 7: Check calendar sync
        try {
            const updatedOffer = await base44.asServiceRole.entities.ScottGigOffer.list();
            const currentOffer = updatedOffer.find(o => o.id === gigOffer.id);

            if (currentOffer.google_calendar_event_id) {
                log('Calendar Sync', true, 'Google Calendar event created', { 
                    eventId: currentOffer.google_calendar_event_id 
                });
            } else {
                log('Calendar Sync', false, 'No calendar event ID found');
            }
        } catch (error) {
            log('Calendar Sync', false, error.message);
        }

        // TEST 8: Check email draft
        try {
            const updatedOffer = await base44.asServiceRole.entities.ScottGigOffer.list();
            const currentOffer = updatedOffer.find(o => o.id === gigOffer.id);

            if (currentOffer.promoter_confirmation_email_draft) {
                log('Email Draft', true, 'Promoter email draft generated', {
                    length: currentOffer.promoter_confirmation_email_draft.length
                });
            } else {
                log('Email Draft', false, 'No email draft found');
            }
        } catch (error) {
            log('Email Draft', false, error.message);
        }

        // CLEANUP: Delete test data
        try {
            await base44.asServiceRole.entities.ScottGigOffer.delete(gigOffer.id);
            
            const responses = await base44.asServiceRole.entities.ScottBandResponse.filter({
                gig_offer_id: gigOffer.id
            });
            for (const response of responses) {
                await base44.asServiceRole.entities.ScottBandResponse.delete(response.id);
            }

            for (const notification of notifications) {
                await base44.asServiceRole.entities.ScottNotification.delete(notification.id);
            }

            for (const member of bandMembers) {
                await base44.asServiceRole.entities.ScottTeamMember.delete(member.id);
            }

            await base44.asServiceRole.entities.ScottArtist.delete(testArtist.id);

            log('Cleanup', true, 'Test data deleted');
        } catch (error) {
            log('Cleanup', false, error.message);
        }

        // Generate summary
        const allPassed = results.summary.failed === 0;
        results.status = allPassed ? 'ALL TESTS PASSED ✅' : `${results.summary.failed} TESTS FAILED ❌`;

        return Response.json(results, { 
            status: allPassed ? 200 : 500,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return Response.json({ 
            error: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
});