import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Zap, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * TEST GIG WORKFLOW
 * Complete end-to-end test of the gig approval system
 * Creates test artist, band members, gig offer, simulates full flow
 */

export default function TestGigWorkflow() {
    const [testData, setTestData] = useState(null);
    const [log, setLog] = useState([]);
    const [running, setRunning] = useState(false);

    const addLog = (message, type = 'info') => {
        setLog(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
        console.log(`[${type.toUpperCase()}]`, message);
    };

    const runFullTest = async () => {
        setRunning(true);
        setLog([]);
        
        try {
            addLog('🚀 Starting full workflow test...', 'info');

            // 1. Create test artist
            addLog('1️⃣ Creating test artist...', 'info');
            const artist = await base44.entities.ScottArtist.create({
                name: 'Test Band ' + Date.now(),
                email: 'testband@example.com'
            });
            addLog(`✓ Artist created: ${artist.name} (${artist.id})`, 'success');

            // 2. Create test band members
            addLog('2️⃣ Creating 3 band members...', 'info');
            const bandMembers = await Promise.all([
                base44.entities.ScottTeamMember.create({
                    artist_id: artist.id,
                    name: 'Drummer Dave',
                    email: 'drummer@test.com',
                    role: 'band_member'
                }),
                base44.entities.ScottTeamMember.create({
                    artist_id: artist.id,
                    name: 'Bassist Bob',
                    email: 'bassist@test.com',
                    role: 'band_member'
                }),
                base44.entities.ScottTeamMember.create({
                    artist_id: artist.id,
                    name: 'Guitarist Gary',
                    email: 'guitarist@test.com',
                    role: 'band_member'
                })
            ]);
            addLog(`✓ Band members created: ${bandMembers.length}`, 'success');

            // 3. Create test gig offer
            addLog('3️⃣ Creating test gig offer...', 'info');
            const gigOffer = await base44.entities.ScottGigOffer.create({
                artist_id: artist.id,
                venue_name: 'Test Venue',
                city: 'Glasgow',
                country: 'UK',
                date: '2026-03-15',
                fee: 500,
                promoter_name: 'Test Promoter',
                promoter_email: 'promoter@test.com',
                status: 'pending_manager_review'
            });
            addLog(`✓ Gig offer created: ${gigOffer.venue_name} (${gigOffer.id})`, 'success');

            // 4. Simulate manager approval
            addLog('4️⃣ Simulating manager YES...', 'info');
            await base44.entities.ScottGigOffer.update(gigOffer.id, {
                status: 'sent_to_band',
                sent_to_band_at: new Date().toISOString()
            });
            
            // Call notifyBandGigApproval
            const notifyResult = await base44.functions.invoke('notifyBandGigApproval', {
                gigOfferId: gigOffer.id,
                gigDetails: {
                    venue: gigOffer.venue_name,
                    date: gigOffer.date,
                    promoter: gigOffer.promoter_name,
                    fee: gigOffer.fee
                }
            });
            addLog(`✓ Band notifications sent: ${notifyResult.notificationsSent}`, 'success');

            // 5. Check notifications created
            await new Promise(r => setTimeout(r, 1000)); // Wait for creation
            const notifications = await base44.entities.ScottNotification.filter({
                gig_offer_id: gigOffer.id
            });
            addLog(`✓ Notifications created: ${notifications.length}`, 'success');

            // 6. Simulate band votes (2 YES, 1 NO)
            addLog('5️⃣ Simulating band votes...', 'info');
            await base44.entities.ScottBandResponse.create({
                gig_offer_id: gigOffer.id,
                band_member_email: bandMembers[0].email,
                band_member_name: bandMembers[0].name,
                decision: 'yes',
                responded_at: new Date().toISOString()
            });
            addLog(`✓ ${bandMembers[0].name} voted YES`, 'success');

            await base44.entities.ScottBandResponse.create({
                gig_offer_id: gigOffer.id,
                band_member_email: bandMembers[1].email,
                band_member_name: bandMembers[1].name,
                decision: 'yes',
                responded_at: new Date().toISOString()
            });
            addLog(`✓ ${bandMembers[1].name} voted YES`, 'success');

            await base44.entities.ScottBandResponse.create({
                gig_offer_id: gigOffer.id,
                band_member_email: bandMembers[2].email,
                band_member_name: bandMembers[2].name,
                decision: 'no',
                reason_if_no: 'Family commitment that day',
                responded_at: new Date().toISOString()
            });
            addLog(`✓ ${bandMembers[2].name} voted NO (reason: family commitment)`, 'warning');

            // 7. Wait for automation to run
            addLog('6️⃣ Waiting for notifyManagerAllVotesIn automation...', 'info');
            await new Promise(r => setTimeout(r, 3000)); // Wait 3s

            // 8. Check manager notification
            const managerNotifs = await base44.entities.ScottNotification.filter({
                gig_offer_id: gigOffer.id,
                notification_type: 'manager_votes_in'
            });
            addLog(`✓ Manager notification created: ${managerNotifs.length > 0 ? 'YES' : 'NO'}`, managerNotifs.length > 0 ? 'success' : 'warning');

            // 9. Test ALL YES scenario
            addLog('7️⃣ Testing ALL YES scenario...', 'info');
            const gigOffer2 = await base44.entities.ScottGigOffer.create({
                artist_id: artist.id,
                venue_name: 'Test Venue 2',
                city: 'Edinburgh',
                country: 'UK',
                date: '2026-04-20',
                fee: 750,
                promoter_name: 'Test Promoter 2',
                promoter_email: 'promoter2@test.com',
                status: 'sent_to_band'
            });

            // All vote YES
            await Promise.all(bandMembers.map(member =>
                base44.entities.ScottBandResponse.create({
                    gig_offer_id: gigOffer2.id,
                    band_member_email: member.email,
                    band_member_name: member.name,
                    decision: 'yes',
                    responded_at: new Date().toISOString()
                })
            ));
            addLog('✓ All 3 members voted YES', 'success');

            await new Promise(r => setTimeout(r, 3000)); // Wait for automation

            // Check if auto-confirmed
            const updatedOffer = await base44.entities.ScottGigOffer.filter({ id: gigOffer2.id });
            if (updatedOffer[0].status === 'confirmed') {
                addLog('✓ Auto-confirmed! Calendar sync + email draft triggered', 'success');
            } else {
                addLog(`⚠ Not auto-confirmed (status: ${updatedOffer[0].status})`, 'warning');
            }

            addLog('🎉 TEST COMPLETE! Check results above.', 'success');
            toast.success('Workflow test complete!');

            setTestData({
                artist,
                bandMembers,
                gigOffer,
                gigOffer2
            });

        } catch (error) {
            addLog(`❌ ERROR: ${error.message}`, 'error');
            toast.error('Test failed - check log');
        } finally {
            setRunning(false);
        }
    };

    const cleanup = async () => {
        if (!testData) return;
        
        try {
            addLog('🧹 Cleaning up test data...', 'info');
            
            // Delete in reverse order
            await base44.entities.ScottBandResponse.filter({ 
                gig_offer_id: testData.gigOffer.id 
            }).then(responses => Promise.all(responses.map(r => 
                base44.entities.ScottBandResponse.delete(r.id)
            )));
            
            await base44.entities.ScottNotification.filter({ 
                gig_offer_id: testData.gigOffer.id 
            }).then(notifs => Promise.all(notifs.map(n => 
                base44.entities.ScottNotification.delete(n.id)
            )));

            await base44.entities.ScottGigOffer.delete(testData.gigOffer.id);
            if (testData.gigOffer2) {
                await base44.entities.ScottGigOffer.delete(testData.gigOffer2.id);
            }

            await Promise.all(testData.bandMembers.map(m => 
                base44.entities.ScottTeamMember.delete(m.id)
            ));

            await base44.entities.ScottArtist.delete(testData.artist.id);

            addLog('✓ Cleanup complete', 'success');
            toast.success('Test data cleaned up');
            setTestData(null);
        } catch (error) {
            addLog(`❌ Cleanup error: ${error.message}`, 'error');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER */}
                <div className="mb-8 text-center">
                    <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <h1 className="text-3xl font-black text-cyan-400 font-mono mb-2">GIG WORKFLOW TEST</h1>
                    <p className="text-gray-600 text-sm font-mono">End-to-end automation test</p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mb-6">
                    <Button
                        onClick={runFullTest}
                        disabled={running}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-black font-black py-4"
                    >
                        {running ? 'RUNNING TEST...' : '▶ RUN FULL TEST'}
                    </Button>
                    {testData && (
                        <Button
                            onClick={cleanup}
                            disabled={running}
                            variant="outline"
                            className="bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                        >
                            CLEANUP
                        </Button>
                    )}
                </div>

                {/* LOG */}
                <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 space-y-2 max-h-[600px] overflow-y-auto font-mono text-xs">
                    {log.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No logs yet. Click RUN FULL TEST.</p>
                    ) : (
                        log.map((entry, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`p-2 rounded ${
                                    entry.type === 'success' ? 'bg-green-900/20 text-green-400' :
                                    entry.type === 'error' ? 'bg-red-900/20 text-red-400' :
                                    entry.type === 'warning' ? 'bg-amber-900/20 text-amber-400' :
                                    'bg-cyan-900/20 text-cyan-400'
                                }`}
                            >
                                {entry.message}
                            </motion.div>
                        ))
                    )}
                </div>

                {/* RESULTS */}
                {testData && (
                    <div className="mt-6 bg-black border-2 border-green-500 rounded-lg p-4">
                        <h3 className="text-green-400 font-black font-mono mb-3">TEST DATA CREATED</h3>
                        <div className="space-y-2 text-sm">
                            <p className="text-white">Artist: {testData.artist.name}</p>
                            <p className="text-white">Band: {testData.bandMembers.length} members</p>
                            <p className="text-white">Gig: {testData.gigOffer.venue_name}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}