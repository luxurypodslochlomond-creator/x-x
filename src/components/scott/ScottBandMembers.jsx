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
    const [newMember, setNewMember] = useState({
        name: '',
        role: '',
        email: '',
        phone: ''
    });

    const members = artist?.members || [];

    const handleAdd = () => {
        if (!newMember.name.trim()) return;
        
        const updated = [...members, newMember];
        onUpdate({ members: updated });
        
        setNewMember({ name: '', role: '', email: '', phone: '' });
        setAdding(false);
    };

    const handleRemove = (index) => {
        const updated = members.filter((_, i) => i !== index);
        onUpdate({ members: updated });
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
                        />
                        <Input
                            placeholder="Role (e.g., Guitar, Vocals)"
                            value={newMember.role}
                            onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                        />
                        <Input
                            placeholder="Phone"
                            type="tel"
                            value={newMember.phone}
                            onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                            className="bg-gray-950 border-gray-800 text-white font-mono"
                        />
                        <Button
                            onClick={handleAdd}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold font-mono"
                        >
                            ADD MEMBER
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