import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plane, Plus, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { format } from 'date-fns';

/**
 * VISA TRACKER
 * LA tour coming up? Track every artist's visa status
 * Deadlines, documents, costs - all in one place
 */

export default function ScottVisas() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [visas, setVisas] = useState([]);
    const [artists, setArtists] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newVisa, setNewVisa] = useState({
        artist_id: '',
        visa_type: 'O-1',
        country: 'USA',
        status: 'not_started',
        application_deadline: '',
        tour_dates: '',
        agent_contact: '',
        cost: 0,
        notes: ''
    });

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadData();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const allVisas = await base44.entities.ScottVisa.list('-application_deadline');
            const allArtists = await base44.entities.ScottArtist.list();
            setVisas(allVisas);
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddVisa = async () => {
        if (!newVisa.artist_id) return;

        try {
            await base44.entities.ScottVisa.create(newVisa);
            setShowAddForm(false);
            setNewVisa({
                artist_id: '',
                visa_type: 'O-1',
                country: 'USA',
                status: 'not_started',
                application_deadline: '',
                tour_dates: '',
                agent_contact: '',
                cost: 0,
                notes: ''
            });
            loadData();
        } catch (error) {
            console.error('Add error:', error);
            alert('Failed to add visa');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return { bg: 'bg-green-900/40', border: 'border-green-500', text: 'text-green-400' };
            case 'submitted': return { bg: 'bg-cyan-900/40', border: 'border-cyan-500', text: 'text-cyan-400' };
            case 'documents_gathering': return { bg: 'bg-amber-900/40', border: 'border-amber-500', text: 'text-amber-400' };
            case 'denied': return { bg: 'bg-red-900/40', border: 'border-red-500', text: 'text-red-400' };
            default: return { bg: 'bg-gray-900/40', border: 'border-gray-700', text: 'text-gray-400' };
        }
    };

    if (!pinEntered) return null;

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Plane className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
                    <p className="text-gray-500 text-sm font-mono">Loading visas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Plane className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>VISAS</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>LA tour visa tracker</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-black border border-green-500/30 p-3 text-center">
                        <p className="text-2xl font-black text-green-400" style={{ fontFamily: 'monospace' }}>
                            {visas.filter(v => v.status === 'approved').length}
                        </p>
                        <p className="text-xs text-green-500" style={{ fontFamily: 'monospace' }}>APPROVED</p>
                    </div>
                    <div className="bg-black border border-cyan-500/30 p-3 text-center">
                        <p className="text-2xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>
                            {visas.filter(v => v.status === 'submitted').length}
                        </p>
                        <p className="text-xs text-cyan-500" style={{ fontFamily: 'monospace' }}>PENDING</p>
                    </div>
                    <div className="bg-black border border-amber-500/30 p-3 text-center">
                        <p className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>
                            {visas.filter(v => v.status === 'documents_gathering').length}
                        </p>
                        <p className="text-xs text-amber-500" style={{ fontFamily: 'monospace' }}>IN PROGRESS</p>
                    </div>
                    <div className="bg-black border border-gray-700 p-3 text-center">
                        <p className="text-2xl font-black text-gray-400" style={{ fontFamily: 'monospace' }}>
                            {visas.filter(v => v.status === 'not_started').length}
                        </p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: 'monospace' }}>TODO</p>
                    </div>
                </div>

                {/* ADD BUTTON */}
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full mb-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-mono flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        ADD VISA APPLICATION
                    </button>
                )}

                {/* ADD FORM */}
                {showAddForm && (
                    <div className="bg-black border-2 border-cyan-500 p-4 mb-6">
                        <h3 className="text-cyan-400 font-mono font-bold mb-3">NEW VISA APPLICATION</h3>
                        
                        <select
                            value={newVisa.artist_id}
                            onChange={(e) => setNewVisa({...newVisa, artist_id: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        >
                            <option value="">-- Select Artist --</option>
                            {artists.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>

                        <select
                            value={newVisa.visa_type}
                            onChange={(e) => setNewVisa({...newVisa, visa_type: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        >
                            <option value="O-1">O-1 (Extraordinary Ability)</option>
                            <option value="P-1">P-1 (Athlete/Entertainer)</option>
                            <option value="P-2">P-2 (Artist/Entertainer Exchange)</option>
                            <option value="P-3">P-3 (Culturally Unique)</option>
                            <option value="B-1">B-1 (Business Visitor)</option>
                            <option value="other">Other</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Country (USA, Canada, etc)"
                            value={newVisa.country}
                            onChange={(e) => setNewVisa({...newVisa, country: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="date"
                            placeholder="Application Deadline"
                            value={newVisa.application_deadline}
                            onChange={(e) => setNewVisa({...newVisa, application_deadline: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="text"
                            placeholder="Tour dates (e.g., Jan 15 - Feb 20)"
                            value={newVisa.tour_dates}
                            onChange={(e) => setNewVisa({...newVisa, tour_dates: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="text"
                            placeholder="Immigration agent/lawyer (optional)"
                            value={newVisa.agent_contact}
                            onChange={(e) => setNewVisa({...newVisa, agent_contact: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="number"
                            placeholder="Cost (£)"
                            value={newVisa.cost || ''}
                            onChange={(e) => setNewVisa({...newVisa, cost: parseFloat(e.target.value) || 0})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <textarea
                            placeholder="Notes"
                            value={newVisa.notes}
                            onChange={(e) => setNewVisa({...newVisa, notes: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm h-20"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddVisa}
                                className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm"
                            >
                                ADD
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-mono text-sm"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )}

                {/* VISAS LIST */}
                <div className="space-y-4">
                    {visas.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Plane className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No visa applications yet</p>
                        </div>
                    ) : (
                        visas.map(visa => {
                            const artist = artists.find(a => a.id === visa.artist_id);
                            const colors = getStatusColor(visa.status);
                            
                            return (
                                <div key={visa.id} className={`${colors.bg} border-2 ${colors.border} p-4`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-white font-mono font-bold text-lg">{artist?.name}</p>
                                            <p className={`${colors.text} text-sm font-mono uppercase tracking-wider`}>
                                                {visa.visa_type} • {visa.country}
                                            </p>
                                        </div>
                                        <div className={`${colors.text} text-xs font-mono uppercase px-3 py-1 border ${colors.border}`}>
                                            {visa.status.replace(/_/g, ' ')}
                                        </div>
                                    </div>

                                    {visa.tour_dates && (
                                        <p className="text-gray-400 text-sm font-mono mb-2">
                                            🗓️ Tour: {visa.tour_dates}
                                        </p>
                                    )}

                                    {visa.application_deadline && (
                                        <p className="text-amber-400 text-sm font-mono mb-2">
                                            ⏰ Deadline: {format(new Date(visa.application_deadline), 'd MMM yyyy')}
                                        </p>
                                    )}

                                    {visa.agent_contact && (
                                        <p className="text-gray-500 text-xs font-mono mb-2">
                                            Agent: {visa.agent_contact}
                                        </p>
                                    )}

                                    {visa.cost > 0 && (
                                        <p className="text-green-400 text-sm font-mono mb-2">
                                            💰 £{visa.cost}
                                        </p>
                                    )}

                                    {visa.notes && (
                                        <p className="text-gray-500 text-xs font-mono mt-3 pt-3 border-t border-gray-800">
                                            {visa.notes}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to={createPageUrl('ScottManager')} className="text-gray-600 text-sm font-mono hover:text-gray-400">
                        ← Back to Kingdom
                    </Link>
                </div>

            </div>
        </div>
    );
}