import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Music, Calendar, ClipboardList, DollarSign, Mic2, Users, Plus, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
            <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500"
                />
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
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
            <div className="px-4 pt-4 pb-28">
                <motion.button 
                    onClick={() => navigate(createPageUrl('CB51'))} 
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-bold">Back</span>
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-6"
                >
                    {artist.profile_pic_url ? (
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-green-500 rounded-2xl blur opacity-60" />
                            <img src={artist.profile_pic_url} alt={artist.name} className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-green-400 to-cyan-500 flex items-center justify-center text-black font-black text-2xl shadow-xl">
                            {artist.name.charAt(0)}
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">{artist.name}</h1>
                        <p className="text-cyan-400 text-sm font-semibold">Operations</p>
                    </div>
                </motion.div>

            {/* PENDING VOTES */}
            <AnimatePresence>
                {pendingVotes.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative mb-6 p-4 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/50"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50"
                            />
                            <h2 className="text-pink-400 font-black text-sm tracking-wide flex items-center gap-2">
                                YOUR VOTE NEEDED
                                <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">{pendingVotes.length}</span>
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {pendingVotes.map(offer => (
                                <Link key={offer.id} to={createPageUrl(`ScottBandVote?id=${offer.id}`)}>
                                    <motion.div
                                        whileTap={{ scale: 0.97 }}
                                        className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-pink-500/30 hover:border-pink-500 transition-all"
                                    >
                                        <p className="text-white font-bold text-base">{offer.venue || 'Gig Offer'}</p>
                                        <div className="flex items-center gap-2 text-sm mt-2">
                                            <span className="text-pink-400 font-semibold">{offer.date || 'TBD'}</span>
                                            {offer.fee && (
                                                <>
                                                    <span className="text-gray-600">•</span>
                                                    <span className="text-green-400 font-bold">{offer.currency || 'GBP'}{offer.fee}</span>
                                                </>
                                            )}
                                        </div>
                                        {offer.city && <p className="text-gray-400 text-xs mt-1">📍 {offer.city}</p>}
                                        <div className="flex items-center gap-2 mt-3 text-pink-400 text-sm font-bold">
                                            TAP TO VOTE
                                            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3 mb-6">
                {sections.map((section, i) => {
                    const Icon = section.icon;
                    const gradients = {
                        cyan: 'from-cyan-500 to-blue-500',
                        orange: 'from-orange-500 to-amber-500'
                    };
                    const gradient = gradients[section.color] || gradients.cyan;

                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileTap={{ scale: 0.96 }} 
                                className="relative h-28 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all p-4"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-2 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                                </div>
                                <p className="text-white font-black text-sm tracking-tight">{section.title}</p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 mb-4"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <Calendar className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-white font-black text-base tracking-tight">UPCOMING GIGS</h2>
                </div>
                {events.filter(e => e.date && new Date(e.date) >= new Date()).length > 0 ? (
                    <div className="space-y-3 mb-4">
                        <AnimatePresence>
                            {events
                                .filter(e => e.date && new Date(e.date) >= new Date())
                                .sort((a, b) => new Date(a.date) - new Date(b.date))
                                .slice(0, 3)
                                .map((event, i) => (
                                    <motion.div 
                                        key={event.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-3 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10"
                                    >
                                        <p className="text-white font-bold text-sm">{event.venue || event.title}</p>
                                        <div className="flex items-center gap-2 text-xs mt-2">
                                            <span className="text-cyan-400 font-semibold">{event.date}</span>
                                            {event.fee && (
                                                <>
                                                    <span className="text-gray-600">•</span>
                                                    <span className="text-green-400 font-bold">{event.currency || 'GBP'}{event.fee}</span>
                                                </>
                                            )}
                                        </div>
                                        {event.city && <p className="text-gray-400 text-xs mt-1">📍 {event.city}</p>}
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm text-center py-4">No upcoming gigs</p>
                )}
                <Link to={createPageUrl(`ScottCalendarView?id=${artistId}`)}>
                    <motion.button 
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-12 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400 font-bold text-sm hover:border-cyan-500 transition-all"
                    >
                        VIEW CALENDAR
                    </motion.button>
                </Link>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-4 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
            >
                <motion.button 
                    onClick={() => setBandExpanded(!bandExpanded)} 
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                            <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-white font-black text-base tracking-tight flex items-center gap-2">
                            BAND MEMBERS
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">{bandMembers.length}</span>
                        </h2>
                    </div>
                    <motion.div 
                        animate={{ rotate: bandExpanded ? 45 : 0 }}
                        className="text-2xl text-white/60"
                    >
                        +
                    </motion.div>
                </motion.button>
                
                <AnimatePresence>
                    {bandExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 space-y-3"
                        >
                            {bandMembers.map((member, i) => (
                                <motion.div 
                                    key={member.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between p-3 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10"
                                >
                                    <div>
                                        <p className="text-white font-bold text-sm">{member.name}</p>
                                        <p className="text-gray-400 text-xs">{member.email}</p>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            if (confirm(`Remove ${member.name}?`)) {
                                                deleteMemberMutation.mutate(member.id);
                                            }
                                        }}
                                        className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </motion.button>
                                </motion.div>
                            ))}
                            
                            {!addingMember ? (
                                <motion.button
                                    onClick={() => setAddingMember(true)}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full h-12 rounded-2xl border-2 border-dashed border-green-500/30 text-green-400 font-bold text-sm hover:border-green-500/50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    ADD MEMBER
                                </motion.button>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-3 pt-3 border-t border-white/10"
                                >
                                    <Input
                                        placeholder="Name"
                                        value={newMember.name}
                                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                        className="bg-black/40 border-white/10 text-white h-12 rounded-xl"
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={newMember.email}
                                        onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                                        className="bg-black/40 border-white/10 text-white h-12 rounded-xl"
                                    />
                                    <div className="flex gap-3">
                                        <motion.button
                                            onClick={handleAddMember}
                                            disabled={addMemberMutation.isPending}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl disabled:opacity-50"
                                        >
                                            {addMemberMutation.isPending ? 'SAVING...' : 'SAVE'}
                                        </motion.button>
                                        <motion.button
                                            onClick={() => {
                                                setAddingMember(false);
                                                setNewMember({ name: '', email: '' });
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 h-12 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
                                        >
                                            CANCEL
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            </div>
        </div>
    );
}