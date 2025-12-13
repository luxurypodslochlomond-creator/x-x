import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building, Plus, Phone, Mail, Star, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';

/**
 * SCOTT LABEL CONTACTS - Track A&R, execs, scouts
 * Who responds, who's helpful, who to avoid
 */

const CONTACT_TYPES = ['A&R', 'Executive', 'Scout', 'Manager', 'Promoter', 'Booking Agent'];

export default function ScottLabelContacts() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        label: '',
        type: 'A&R',
        email: '',
        phone: '',
        notes: '',
        rating: 3
    });

    // PIN CHECK
    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);

    // Fetch contacts (using ScottArtist entity with type=label)
    const { data: contacts = [], isLoading } = useQuery({
        queryKey: ['scott-label-contacts'],
        queryFn: async () => {
            const results = await base44.entities.ScottArtist.filter({ type: 'label' });
            return results;
        }
    });

    // Add contact
    const addMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.ScottArtist.create({
                name: data.name,
                type: 'label',
                genre: data.type, // Using genre field for contact type
                email: data.email,
                phone: data.phone,
                notes: data.notes,
                relationship: data.rating >= 4 ? 'excellent' : data.rating >= 3 ? 'good' : 'needs_work'
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scott-label-contacts'] });
            setShowForm(false);
            setFormData({
                name: '',
                label: '',
                type: 'A&R',
                email: '',
                phone: '',
                notes: '',
                rating: 3
            });
        }
    });

    // Delete contact
    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottArtist.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scott-label-contacts'] });
        }
    });

    const handleSubmit = () => {
        if (!formData.name.trim()) return;
        addMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>

                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                    <div className="bg-black rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building className="w-8 h-8 text-amber-400" />
                                <div>
                                    <h1 className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>LABEL CONTACTS</h1>
                                    <p className="text-gray-400 text-xs font-mono">A&R, execs, scouts</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="p-2 bg-amber-500 hover:bg-amber-600 rounded-lg transition-all"
                            >
                                <Plus className="w-5 h-5 text-black" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD FORM */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black border-2 border-amber-500/50 rounded-xl p-4 mb-6"
                >
                    <p className="text-amber-400 font-bold text-sm mb-3 font-mono">NEW CONTACT</p>
                    
                    <div className="space-y-3">
                        <Input
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-black border border-amber-500/30 text-white font-mono"
                        />

                        <Input
                            placeholder="Label/Company"
                            value={formData.label}
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            className="bg-black border border-amber-500/30 text-white font-mono"
                        />

                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-black border border-amber-500/30 rounded p-2 text-white text-sm font-mono focus:border-amber-500 focus:outline-none"
                        >
                            {CONTACT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <Input
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-black border border-amber-500/30 text-white font-mono"
                        />

                        <Input
                            placeholder="Phone (optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-black border border-amber-500/30 text-white font-mono"
                        />

                        <Textarea
                            placeholder="Notes (how you met, what they're looking for...)"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="bg-black border border-amber-500/30 text-white font-mono"
                            rows={3}
                        />

                        <div>
                            <p className="text-gray-400 text-xs font-mono mb-2">Rating (1-5)</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setFormData({ ...formData, rating: n })}
                                        className={`p-2 rounded ${
                                            formData.rating >= n
                                                ? 'bg-amber-500 text-black'
                                                : 'bg-gray-800 text-gray-600'
                                        }`}
                                    >
                                        <Star className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => setShowForm(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={!formData.name.trim() || addMutation.isPending}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold"
                            >
                                {addMutation.isPending ? 'SAVING...' : 'SAVE'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* CONTACTS LIST */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 font-mono">Loading...</p>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                        <Building className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm font-mono">No contacts yet</p>
                        <p className="text-gray-700 text-xs font-mono mt-1">Add A&R, scouts, label contacts</p>
                    </div>
                ) : (
                    contacts.map(contact => (
                        <motion.div
                            key={contact.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-black border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-4 transition-all"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-base mb-0.5 font-mono">{contact.name}</h3>
                                    <p className="text-gray-500 text-xs font-mono">{contact.genre || 'Contact'}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${
                                                    (contact.relationship === 'excellent' && i < 5) ||
                                                    (contact.relationship === 'good' && i < 3) ||
                                                    (contact.relationship === 'needs_work' && i < 2)
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-gray-800'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => deleteMutation.mutate(contact.id)}
                                        className="p-1 text-gray-600 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                {contact.email && (
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex items-center gap-1 text-cyan-400 text-xs font-mono hover:text-cyan-300"
                                    >
                                        <Mail className="w-3 h-3" />
                                        {contact.email}
                                    </a>
                                )}
                                {contact.phone && (
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center gap-1 text-green-400 text-xs font-mono hover:text-green-300"
                                    >
                                        <Phone className="w-3 h-3" />
                                        {contact.phone}
                                    </a>
                                )}
                            </div>

                            {contact.notes && (
                                <p className="text-gray-400 text-sm font-mono pt-2 border-t border-gray-800">
                                    {contact.notes}
                                </p>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Kingdom51Crown8Bit size={20} animate={false} />
                    <p className="text-amber-500/60 text-xs font-black tracking-wider" style={{ fontFamily: 'monospace' }}>KINGDOM51</p>
                </div>
            </div>
        </div>
    );
}