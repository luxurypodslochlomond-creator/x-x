import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Users, Plus, MessageSquare, TrendingUp, Calendar, DollarSign, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * AAA DASHBOARD - ALL ACCESS AREAS 🤣❤️
 * 
 * Scott's manager view:
 * - The score (what's happening)
 * - Team management (Rosie + crew)
 * - P2P comms (not surveillance, just collaboration)
 * - Easy overview without tech fanny vibes
 * 
 * NOT technical. Just the info that matters.
 */

export default function CB51AAA() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);
    const [showAddTeam, setShowAddTeam] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', phone: '', email: '', role: 'crew' });

    useEffect(() => {
        document.title = 'CB51 • AAA Dashboard';
        base44.auth.me().then(setUser);
    }, []);

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({ archived: false })
    });

    const { data: team = [] } = useQuery({
        queryKey: ['scottTeam'],
        queryFn: () => base44.entities.ScottTeamMember.filter({})
    });

    const { data: offers = [] } = useQuery({
        queryKey: ['scottAllOffers'],
        queryFn: () => base44.entities.ScottGigOffer.filter({})
    });

    const { data: events = [] } = useQuery({
        queryKey: ['scottAllEvents'],
        queryFn: () => base44.entities.ScottEvent.filter({})
    });

    const { data: invoices = [] } = useQuery({
        queryKey: ['scottAllInvoices'],
        queryFn: () => base44.entities.ScottInvoice.filter({})
    });

    const addTeamMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottTeamMember.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottTeam'] });
            setNewMember({ name: '', phone: '', email: '', role: 'crew' });
            setShowAddTeam(false);
        }
    });

    const removeTeamMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottTeamMember.update(id, { status: 'inactive' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottTeam'] })
    });

    const handleAddTeam = () => {
        if (!newMember.name.trim()) return;
        addTeamMutation.mutate(newMember);
    };

    // THE SCORE
    const pendingOffers = offers.filter(o => o.status === 'pending_manager_review').length;
    const awaitingBand = offers.filter(o => o.status === 'sent_to_band').length;
    const confirmedGigs = offers.filter(o => o.status === 'confirmed').length;
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date() && e.status === 'confirmed').length;
    const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
    const totalOwed = invoices.filter(i => i.status === 'unpaid').reduce((sum, inv) => sum + (inv.amount || 0), 0);

    const activeTeam = team.filter(m => m.status !== 'inactive');

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <button
                onClick={() => navigate(createPageUrl('CB51'))}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Radio className="w-8 h-8 text-cyan-400" />
                    <h1 className="text-3xl font-black text-cyan-400 font-mono">AAA DASHBOARD</h1>
                </div>
                <p className="text-gray-600 text-sm font-mono">All Access Areas • The score at a glance</p>
            </div>

            {/* THE SCORE - CLEAN STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                <Link to={createPageUrl('ScottGigOffers')}>
                    <div className="bg-black border-2 border-amber-500/50 rounded-xl p-4 hover:border-amber-500 transition-all">
                        <p className="text-2xl font-black text-white font-mono">{pendingOffers}</p>
                        <p className="text-amber-400 text-xs font-mono tracking-widest font-bold">PENDING OFFERS</p>
                    </div>
                </Link>

                <Link to={createPageUrl('ScottGigOffers')}>
                    <div className="bg-black border-2 border-cyan-500/50 rounded-xl p-4 hover:border-cyan-500 transition-all">
                        <p className="text-2xl font-black text-white font-mono">{awaitingBand}</p>
                        <p className="text-cyan-400 text-xs font-mono tracking-widest font-bold">WITH BAND</p>
                    </div>
                </Link>

                <Link to={createPageUrl('ScottGigOffers')}>
                    <div className="bg-black border-2 border-green-500/50 rounded-xl p-4 hover:border-green-500 transition-all">
                        <p className="text-2xl font-black text-white font-mono">{confirmedGigs}</p>
                        <p className="text-green-400 text-xs font-mono tracking-widest font-bold">CONFIRMED</p>
                    </div>
                </Link>

                <Link to={createPageUrl('ScottCalendarView')}>
                    <div className="bg-black border-2 border-purple-500/50 rounded-xl p-4 hover:border-purple-500 transition-all">
                        <p className="text-2xl font-black text-white font-mono">{upcomingEvents}</p>
                        <p className="text-purple-400 text-xs font-mono tracking-widest font-bold">UPCOMING GIGS</p>
                    </div>
                </Link>

                <Link to={createPageUrl('ScottInvoices')}>
                    <div className="bg-black border-2 border-red-500/50 rounded-xl p-4 hover:border-red-500 transition-all">
                        <p className="text-2xl font-black text-white font-mono">{overdueInvoices}</p>
                        <p className="text-red-400 text-xs font-mono tracking-widest font-bold">OVERDUE</p>
                    </div>
                </Link>

                <div className="bg-black border-2 border-amber-500/50 rounded-xl p-4">
                    <p className="text-2xl font-black text-white font-mono">£{totalOwed.toLocaleString()}</p>
                    <p className="text-amber-400 text-xs font-mono tracking-widest font-bold">OWED</p>
                </div>
            </div>

            {/* ARTISTS QUICK VIEW */}
            <div className="mb-8 bg-black border-2 border-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-lg font-mono tracking-wider">ARTISTS</h2>
                    </div>
                    <Link to={createPageUrl('ScottAddArtist')}>
                        <button className="text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            ADD
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {artists.length === 0 ? (
                        <p className="text-gray-600 text-sm font-mono col-span-2">No artists yet</p>
                    ) : (
                        artists.map(artist => (
                            <Link key={artist.id} to={createPageUrl(`ScottArtistHome?id=${artist.id}`)}>
                                <div className="bg-black border-2 border-gray-900 hover:border-cyan-500/50 rounded-lg p-3 transition-all">
                                    <p className="text-white font-bold font-mono text-sm truncate">{artist.name}</p>
                                    <p className="text-gray-600 text-xs font-mono">{artist.genre || 'Artist'}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* TEAM MANAGEMENT - P2P COMMS */}
            <div className="bg-black border-2 border-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-amber-400" />
                        <h2 className="text-amber-400 font-black text-lg font-mono tracking-wider">TEAM</h2>
                    </div>
                    <button 
                        onClick={() => setShowAddTeam(!showAddTeam)}
                        className="text-xs font-bold font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                        <Plus className="w-3 h-3" />
                        ADD
                    </button>
                </div>

                {/* ADD TEAM FORM */}
                <AnimatePresence>
                    {showAddTeam && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4 space-y-3"
                        >
                            <Input
                                placeholder="Name (e.g. Rosie)"
                                value={newMember.name}
                                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                            />
                            <Input
                                placeholder="Phone (optional)"
                                value={newMember.phone}
                                onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                            />
                            <Input
                                placeholder="Email (optional)"
                                value={newMember.email}
                                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setNewMember({...newMember, role: 'assistant'})}
                                    className={`flex-1 py-2 rounded font-bold text-sm font-mono ${newMember.role === 'assistant' ? 'bg-cyan-500 text-black' : 'bg-black border-2 border-gray-900 text-gray-600'}`}
                                >
                                    ASSISTANT
                                </button>
                                <button
                                    onClick={() => setNewMember({...newMember, role: 'crew'})}
                                    className={`flex-1 py-2 rounded font-bold text-sm font-mono ${newMember.role === 'crew' ? 'bg-cyan-500 text-black' : 'bg-black border-2 border-gray-900 text-gray-600'}`}
                                >
                                    CREW
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setShowAddTeam(false)}
                                    className="flex-1 bg-black border-2 border-gray-900 text-gray-600"
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    onClick={handleAddTeam}
                                    disabled={!newMember.name.trim() || addTeamMutation.isPending}
                                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black"
                                >
                                    SAVE
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TEAM LIST */}
                <div className="space-y-2">
                    {activeTeam.length === 0 ? (
                        <p className="text-gray-600 text-sm font-mono text-center py-4">No team members yet</p>
                    ) : (
                        activeTeam.map(member => (
                            <div key={member.id} className="bg-black border-2 border-gray-900 rounded-lg p-3 flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-white font-bold font-mono">{member.name}</p>
                                    <p className="text-gray-600 text-xs font-mono capitalize">{member.role}</p>
                                    {(member.phone || member.email) && (
                                        <div className="mt-1 space-y-0.5">
                                            {member.phone && <p className="text-gray-600 text-xs font-mono">{member.phone}</p>}
                                            {member.email && <p className="text-gray-600 text-xs font-mono">{member.email}</p>}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm(`Remove ${member.name}?`)) {
                                            removeTeamMutation.mutate(member.id);
                                        }
                                    }}
                                    className="text-xs font-bold font-mono text-red-400 hover:text-red-300"
                                >
                                    REMOVE
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 bg-black border-2 border-cyan-500/50 rounded-lg p-3">
                    <p className="text-cyan-400 text-xs font-mono font-bold tracking-widest mb-1">P2P TEAM COMMS</p>
                    <p className="text-gray-600 text-xs font-mono">Best in world peer-to-peer communication. No surveillance, just collaboration ♾️❤️</p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-800 text-xs font-mono">CB51 • AAA Dashboard</p>
            </div>
        </div>
    );
}