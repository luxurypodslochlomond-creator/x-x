import React, { useState, useEffect } from 'react';
import { Users, Bell, Check, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * TEAM SYNC
 * Scott assigns task to Rosie → She gets push notification
 * Band gets gig offer → Everyone votes YES/NO
 * Demo uploaded → Whole team notified
 * 
 * ZERO RE-EXPLAINING. Everyone's synced.
 */

export default function ScottTeamSync({ artistId, eventType, eventData }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [isNotifying, setIsNotifying] = useState(false);

    useEffect(() => {
        loadTeamMembers();
    }, [artistId]);

    const loadTeamMembers = async () => {
        try {
            let members = [];
            
            if (artistId) {
                // Get team for this specific artist/band
                members = await base44.entities.ScottTeamMember.filter({ artist_id: artistId, status: 'active' });
            } else {
                // Get Scott's whole team (like Rosie who can see everything)
                members = await base44.entities.ScottTeamMember.filter({ can_see_all: true, status: 'active' });
            }
            
            setTeamMembers(members);
        } catch (error) {
            console.error('Team load error:', error);
        }
    };

    const notifyTeam = async (message, requiresResponse = false) => {
        setIsNotifying(true);
        try {
            // Send push notifications to all relevant team members
            for (const member of teamMembers) {
                if (!member.push_endpoint) continue;

                // Check if they want this type of notification
                const prefs = member.notification_preferences || {};
                let shouldNotify = false;

                if (eventType === 'gig_offer' && prefs.gig_offers) shouldNotify = true;
                if (eventType === 'schedule_change' && prefs.schedule_changes) shouldNotify = true;
                if (eventType === 'demo_upload' && prefs.demo_uploads) shouldNotify = true;

                if (shouldNotify) {
                    // TODO: Implement Web Push API call here
                    console.log(`Notifying ${member.name}: ${message}`);
                }
            }
        } catch (error) {
            console.error('Notification error:', error);
        } finally {
            setIsNotifying(false);
        }
    };

    return (
        <div className="bg-purple-900/20 border-2 border-purple-500 p-4">
            <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-purple-400 font-black font-mono text-sm">TEAM SYNC</h3>
            </div>

            <div className="space-y-2">
                {teamMembers.length === 0 ? (
                    <p className="text-gray-500 text-xs font-mono">No team members yet</p>
                ) : (
                    teamMembers.map(member => (
                        <div key={member.id} className="flex items-center justify-between bg-black/40 p-2">
                            <div>
                                <p className="text-white text-sm font-mono">{member.name}</p>
                                <p className="text-gray-500 text-xs">{member.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {member.push_endpoint ? (
                                    <Bell className="w-4 h-4 text-green-400" />
                                ) : (
                                    <Bell className="w-4 h-4 text-gray-600" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {teamMembers.length > 0 && (
                <button
                    onClick={() => notifyTeam('Update from Scott')}
                    disabled={isNotifying}
                    className="w-full mt-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-mono text-sm"
                >
                    {isNotifying ? 'Notifying...' : 'Notify Team'}
                </button>
            )}
        </div>
    );
}