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
        <div className="bg-black border border-cyan-500/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-cyan-400 font-black text-sm font-mono">BAND MEMBERS</h2>
                <button
                    onClick={() => setAdding(!adding)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                        className="mb-2 bg-black border border-gray-900 rounded-lg p-2 space-y-2"
                    >
                        <Input
                            placeholder="Name"
                            value={newMember.name}
                            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono text-xs"
                            disabled={saving}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono text-xs"
                            disabled={saving}
                        />
                        <Button
                            onClick={handleAdd}
                            disabled={saving}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold font-mono disabled:opacity-50 text-xs py-2"
                        >
                            {saving ? 'SAVING...' : 'ADD'}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-1">
                {members.length === 0 ? (
                    <p className="text-gray-600 text-xs font-mono text-center py-2">
                        No band members yet
                    </p>
                ) : (
                    members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black border border-gray-900 rounded p-2 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-bold font-mono text-xs truncate">
                                        {member.name}
                                    </p>
                                    {member.email && (
                                        <p className="text-gray-600 text-[9px] font-mono truncate">
                                            {member.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(index)}
                                className="text-red-500 hover:text-red-400 transition-colors ml-2"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}