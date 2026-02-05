import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Users, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';

export default function ScottArtistHome() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [artist, setArtist] = useState(null);
    const [calendarExpanded, setCalendarExpanded] = useState(false);
    const [bandExpanded, setBandExpanded] = useState(false);
    const [addingMember, setAddingMember] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', email: '' });
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: events = [] } = useQuery({
        queryKey: ['scottCalendarEvents', artistId],
        queryFn: () => base44.entities.ScottEvent.filter({ artist_id: artistId }),
        enabled: !!artistId
    });

    const { data: bandMembers = [] } = useQuery({
        queryKey: ['scottBandMembers', artistId],
        queryFn: async () => {
            const allMembers = await base44.entities.ScottTeamMember.list();
            return allMembers.filter(m => m.artist_access?.includes(artistId));
        },
        enabled: !!artistId
    });

    const { data: pendingVotes = [] } = useQuery({
        queryKey: ['scottPendingVotes', artistId],
        queryFn: () => base44.entities.ScottGigOffer.filter({ 
            artist_id: artistId,
            status: 'sent_to_band'
        }),
        enabled: !!artistId,
        refetchInterval: 10000 // Poll every 10s for new votes
    });

    const addMemberMutation = useMutation({
        mutationFn: (memberData) => base44.entities.ScottTeamMember.create(memberData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottBandMembers', artistId] });
            setNewMember({ name: '', email: '' });
            setAddingMember(false);
        }
    });

    const deleteMemberMutation = useMutation({
        mutationFn: (memberId) => base44.entities.ScottTeamMember.delete(memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottBandMembers', artistId] });
        }
    });

    const handleAddMember = async () => {
        if (!newMember.name || !newMember.email) {
            alert('Need name and email');
            return;
        }
        
        // Send invite email first
        try {
            await base44.users.inviteUser(newMember.email, 'user');
        } catch (e) {
            console.log('Invite failed (may already be registered):', e);
        }
        
        addMemberMutation.mutate({
            name: newMember.name,
            email: newMember.email,
            artist_access: [artistId],
            role: 'assistant'
        });
    };

    useEffect(() => {
        if (!artistId) {
            navigate(createPageUrl('CB51'));
            return;
        }
        base44.entities.ScottArtist.list().then(allArtists => {
            const found = allArtists.find(a => a.id === artistId);
            if (found) {
                setArtist(found);
                document.title = `CB51 • ${found.name}`;
            } else {
                navigate(createPageUrl('CB51'));
            }
        });
    }, [artistId]);

    if (!artist) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Radio className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
            </div>
        );
    }

    const sections = [
        { title: 'LIVE', icon: Mic2, link: createPageUrl(`ScottLive?id=${artistId}`), color: 'cyan' },
        { title: 'SESSIONS', icon: Music, link: createPageUrl(`ScottSessions?id=${artistId}`), color: 'orange' },
        { title: 'TO-DO', icon: ClipboardList, link: createPageUrl(`ScottToDo?id=${artistId}`), color: 'cyan' },
        { title: 'FINANCE', icon: DollarSign, link: createPageUrl(`ScottFinanceAdmin?id=${artistId}`), color: 'orange' },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-3 pb-20">
            <button onClick={() => navigate(createPageUrl('CB51'))} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-3">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
                {artist.profile_pic_url ? (
                    <img src={artist.profile_pic_url} alt={artist.name} className="w-12 h-12 rounded object-cover border border-cyan-500" />
                ) : (
                    <div className="w-12 h-12 rounded bg-cyan-500 text-black font-black text-lg flex items-center justify-center">{artist.name.charAt(0)}</div>
                )}
                <div>
                    <h1 className="text-xl font-black text-white font-mono">{artist.name}</h1>
                    <p className="text-gray-600 text-xs font-mono">Operations</p>
                </div>
            </div>

            {/* PENDING VOTES - Only gigs manager already approved */}
            {pendingVotes.length > 0 && (
                <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500 rounded-lg p-3 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-pink-400 rounded-full"
                        />
                        <h2 className="text-pink-400 font-black text-sm font-mono">YOUR VOTE NEEDED ({pendingVotes.length})</h2>
                    </div>
                    <div className="space-y-2">
                        {pendingVotes.map(offer => (
                            <Link key={offer.id} to={createPageUrl(`ScottBandVote?id=${offer.id}`)}>
                                <motion.div
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-black/60 border border-pink-500/50 rounded p-3 hover:border-pink-500 transition-all"
                                >
                                    <p className="text-white font-bold text-sm">{offer.venue || 'Gig Offer'}</p>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className="text-pink-400 font-mono">{offer.date || 'TBD'}</span>
                                        {offer.fee && (
                                            <>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-green-400 font-bold">{offer.currency || 'GBP'}{offer.fee}</span>
                                            </>
                                        )}
                                    </div>
                                    {offer.city && <p className="text-gray-500 text-[10px] mt-1">📍 {offer.city}</p>}
                                    <p className="text-pink-400 text-[10px] font-bold mt-2">TAP TO VOTE →</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-6">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colorMap = {
                        cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500' },
                        orange: { border: 'border-orange-500', bg: 'bg-orange-500' }
                    };
                    const color = colorMap[section.color] || colorMap.cyan;

                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div whileTap={{ scale: 0.96 }} className={`bg-black border-2 ${color.border} rounded-lg p-2 text-center`}>
                                <div className={`w-12 h-12 rounded ${color.bg} text-black font-black flex items-center justify-center mx-auto mb-1`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <p className="text-white font-black text-[10px] font-mono">{section.title}</p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-black border-2 border-cyan-500 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-cyan-400 font-black text-sm font-mono">UPCOMING GIGS</h2>
                </div>
                {events.filter(e => e.date && new Date(e.date) >= new Date()).length > 0 ? (
                    <div className="space-y-2 mb-3">
                        {events
                            .filter(e => e.date && new Date(e.date) >= new Date())
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .slice(0, 3)
                            .map(event => (
                                <div key={event.id} className="bg-black/60 border border-cyan-500/30 rounded p-2">
                                    <p className="text-white font-bold text-xs">{event.venue || event.title}</p>
                                    <div className="flex items-center gap-2 text-[10px] mt-1">
                                        <span className="text-cyan-400 font-mono">{event.date}</span>
                                        {event.fee && (
                                            <>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-green-400 font-bold">{event.currency || 'GBP'}{event.fee}</span>
                                            </>
                                        )}
                                    </div>
                                    {event.city && <p className="text-gray-500 text-[9px] mt-1">{event.city}</p>}
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-xs text-center py-2">No upcoming gigs</p>
                )}
                <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                    <button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs font-bold font-mono py-2 rounded border border-cyan-500/50">
                        VIEW CALENDAR
                    </button>
                </Link>
            </div>

            <div className="bg-black border-2 border-green-500 rounded-lg p-3 mb-3">
                <button onClick={() => setBandExpanded(!bandExpanded)} className="w-full flex items-center justify-between p-1">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-400" />
                        <h2 className="text-green-400 font-black text-xs font-mono">BAND MEMBERS ({bandMembers.length})</h2>
                    </div>
                    <div className="text-green-400">{bandExpanded ? '−' : '+'}</div>
                </button>
                {bandExpanded && (
                    <div className="pt-3 space-y-2">
                        {bandMembers.map(member => (
                            <div key={member.id} className="flex items-center justify-between bg-black/60 border border-green-500/30 rounded p-2">
                                <div>
                                    <p className="text-white text-xs font-bold">{member.name}</p>
                                    <p className="text-gray-600 text-[9px] font-mono">{member.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm(`Remove ${member.name}?`)) {
                                            deleteMemberMutation.mutate(member.id);
                                        }
                                    }}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        
                        {!addingMember ? (
                            <button
                                onClick={() => setAddingMember(true)}
                                className="w-full text-[10px] font-bold font-mono text-green-400 hover:text-green-300 py-2 border border-dashed border-green-500/30 rounded"
                            >
                                + ADD MEMBER
                            </button>
                        ) : (
                            <div className="space-y-2 pt-2 border-t border-green-500/30">
                                <Input
                                    placeholder="Name"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                    className="bg-black border-green-500/50 text-white text-xs"
                                />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={newMember.email}
                                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                                    className="bg-black border-green-500/50 text-white text-xs"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddMember}
                                        disabled={addMemberMutation.isPending}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold py-2 rounded"
                                    >
                                        {addMemberMutation.isPending ? 'SAVING...' : 'SAVE'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAddingMember(false);
                                            setNewMember({ name: '', email: '' });
                                        }}
                                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-[10px] font-bold py-2 rounded"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}