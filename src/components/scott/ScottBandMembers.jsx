import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Band Members Manager
 * Add/remove members for an artist
 */

export default function ScottBandMembers({ artist, onUpdate }) {
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [newMember, setNewMember] = useState({
        name: '',
        role: '',
        email: '',
        phone: ''
    });

    const members = artist?.members || [];

    // AUTO-MIGRATE: Check existing members and create ScottTeamMember records
    React.useEffect(() => {
        const autoMigrate = async () => {
            if (!artist?.id || members.length === 0) return;
            
            try {
                const { base44 } = await import('@/api/base44Client');
                
                for (const member of members) {
                    if (!member.email) continue;
                    
                    // Check if ScottTeamMember already exists
                    const existing = await base44.entities.ScottTeamMember.filter({ 
                        email: member.email,
                        artist_access: { $contains: artist.id }
                    });
                    
                    if (existing.length === 0) {
                        // Create it
                        await base44.entities.ScottTeamMember.create({
                            name: member.name,
                            email: member.email,
                            role: 'assistant',
                            artist_access: [artist.id]
                        });
                        console.log(`✓ Migrated ${member.name} to ScottTeamMember`);
                    }
                }
            } catch (err) {
                console.log('Migration check:', err);
            }
        };
        
        autoMigrate();
    }, [artist?.id, members.length]);

    const handleAdd = async () => {
        if (!newMember.name.trim() || !newMember.email.trim()) {
            setError('Name and email required');
            return;
        }
        
        setError(null);
        setSuccess(null);
        setSaving(true);
        
        try {
            // Add to artist.members array (for display)
            const updated = [...members, newMember];
            await onUpdate({ members: updated });
            
            // ALSO create ScottTeamMember record (for login)
            const { base44 } = await import('@/api/base44Client');
            await base44.entities.ScottTeamMember.create({
                name: newMember.name,
                email: newMember.email,
                role: 'assistant',
                artist_access: [artist.id]
            });
            
            setSuccess('Member added ✓ They can now log in with their email');
            setNewMember({ name: '', role: '', email: '', phone: '' });
            setAdding(false);
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message || 'Failed to add member');
        } finally {
            setSaving(false);
        }
    };

    const handleRemove = async (index) => {
        setError(null);
        setSaving(true);
        
        try {
            const updated = members.filter((_, i) => i !== index);
            await onUpdate({ members: updated });
            setSuccess('Member removed ✓');
            setTimeout(() => setSuccess(null), 2000);
        } catch (err) {
            setError(err.message || 'Failed to remove member');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-cyan-400 font-black text-lg font-mono">BAND MEMBERS</h2>
                <button
                    onClick={() => setAdding(!adding)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    {adding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 bg-red-500/10 border-2 border-red-500 rounded-lg p-3"
                >
                    <p className="text-red-400 text-sm font-mono">❌ {error}</p>
                </motion.div>
            )}

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 bg-green-500/10 border-2 border-green-500 rounded-lg p-3"
                >
                    <p className="text-green-400 text-sm font-mono">{success}</p>
                </motion.div>
            )}

            <AnimatePresence>
                {adding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 bg-black border-2 border-gray-900 rounded-lg p-4 space-y-3"
                    >
                        <Input
                            placeholder="Name"
                            value={newMember.name}
                            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                            disabled={saving}
                        />
                        <Input
                            placeholder="Role (e.g., Guitar, Vocals)"
                            value={newMember.role}
                            onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                            disabled={saving}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                            disabled={saving}
                        />
                        <Input
                            placeholder="Phone"
                            type="tel"
                            value={newMember.phone}
                            onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                            disabled={saving}
                        />
                        <Button
                            onClick={handleAdd}
                            disabled={saving}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold font-mono disabled:opacity-50"
                        >
                            {saving ? 'SAVING...' : 'ADD MEMBER'}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-2">
                {members.length === 0 ? (
                    <p className="text-gray-600 text-sm font-mono text-center py-4">
                        No band members yet
                    </p>
                ) : (
                    members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black border-2 border-gray-900 rounded-lg p-3 flex items-start justify-between"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold font-mono text-sm">
                                        {member.name}
                                    </p>
                                    {member.role && (
                                        <p className="text-cyan-400 text-xs font-mono">
                                            {member.role}
                                        </p>
                                    )}
                                    {member.email && (
                                        <p className="text-gray-600 text-xs font-mono">
                                            {member.email}
                                        </p>
                                    )}
                                    {member.phone && (
                                        <p className="text-gray-600 text-xs font-mono">
                                            {member.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(index)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}