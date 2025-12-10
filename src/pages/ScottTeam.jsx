import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, Plus, Bell, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * SCOTT'S TEAM MANAGEMENT
 * Add Rosie, band members, crew
 * Set notification preferences
 * See who's synced
 */

export default function ScottTeam() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        role: 'band_member',
        artist_id: '',
        phone: '',
        email: '',
        can_see_all: false
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
            const members = await base44.entities.ScottTeamMember.list();
            const allArtists = await base44.entities.ScottArtist.list();
            setTeamMembers(members);
            setArtists(allArtists);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    const handleAddMember = async () => {
        if (!newMember.name) return;

        try {
            await base44.entities.ScottTeamMember.create(newMember);
            setShowAddForm(false);
            setNewMember({
                name: '',
                role: 'band_member',
                artist_id: '',
                phone: '',
                email: '',
                can_see_all: false
            });
            loadData();
        } catch (error) {
            console.error('Add error:', error);
            alert('Failed to add team member');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Remove this team member?')) return;
        try {
            await base44.entities.ScottTeamMember.delete(id);
            loadData();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (!pinEntered) return null;

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-2xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-6">
                    <KingdomCrown8Bit size={32} animate={true} />
                    <div>
                        <h1 className="text-3xl font-black text-purple-400" style={{ fontFamily: 'monospace' }}>TEAM</h1>
                        <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>Who's synced with Scott</p>
                    </div>
                </div>

                {/* ADD BUTTON */}
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full mb-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        ADD TEAM MEMBER
                    </button>
                )}

                {/* ADD FORM */}
                {showAddForm && (
                    <div className="bg-black border-2 border-purple-500 p-4 mb-6">
                        <h3 className="text-purple-400 font-mono font-bold mb-3">NEW TEAM MEMBER</h3>
                        
                        <input
                            type="text"
                            placeholder="Name"
                            value={newMember.name}
                            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <select
                            value={newMember.role}
                            onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        >
                            <option value="assistant">Assistant</option>
                            <option value="band_member">Band Member</option>
                            <option value="crew">Crew</option>
                            <option value="producer">Producer</option>
                            <option value="manager">Manager</option>
                        </select>

                        <select
                            value={newMember.artist_id}
                            onChange={(e) => setNewMember({...newMember, artist_id: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        >
                            <option value="">-- No specific artist --</option>
                            {artists.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>

                        <input
                            type="tel"
                            placeholder="Phone (optional)"
                            value={newMember.phone}
                            onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="email"
                            placeholder="Email (optional)"
                            value={newMember.email}
                            onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <label className="flex items-center gap-2 mb-3 text-sm text-gray-400 font-mono">
                            <input
                                type="checkbox"
                                checked={newMember.can_see_all}
                                onChange={(e) => setNewMember({...newMember, can_see_all: e.target.checked})}
                                className="w-4 h-4"
                            />
                            Can see all artists (like Rosie)
                        </label>

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddMember}
                                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-mono text-sm"
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

                {/* TEAM LIST */}
                <div className="space-y-3">
                    {teamMembers.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No team members yet</p>
                        </div>
                    ) : (
                        teamMembers.map(member => {
                            const artist = artists.find(a => a.id === member.artist_id);
                            return (
                                <div key={member.id} className="bg-black border border-gray-800 p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="text-white font-mono font-bold">{member.name}</p>
                                            <p className="text-purple-400 text-xs uppercase tracking-wider font-mono">
                                                {member.role.replace(/_/g, ' ')}
                                            </p>
                                            {artist && (
                                                <p className="text-gray-500 text-xs font-mono mt-1">→ {artist.name}</p>
                                            )}
                                            {member.can_see_all && (
                                                <p className="text-amber-500 text-xs font-mono mt-1">★ Can see all artists</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="p-2 hover:bg-red-900/20 rounded"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-400" />
                                        </button>
                                    </div>

                                    {(member.phone || member.email) && (
                                        <div className="mt-2 space-y-1">
                                            {member.phone && (
                                                <p className="text-gray-500 text-xs font-mono">📞 {member.phone}</p>
                                            )}
                                            {member.email && (
                                                <p className="text-gray-500 text-xs font-mono">✉️ {member.email}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-3 flex items-center gap-2">
                                        {member.push_endpoint ? (
                                            <div className="flex items-center gap-1 text-green-400 text-xs font-mono">
                                                <Bell className="w-3 h-3" />
                                                Push enabled
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-gray-600 text-xs font-mono">
                                                <Bell className="w-3 h-3" />
                                                No push yet
                                            </div>
                                        )}
                                    </div>
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