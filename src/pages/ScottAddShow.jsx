import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Radio, ArrowLeft, Save, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScottAddShow() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const [formData, setFormData] = useState({
        venue: '',
        city: '',
        county: '',
        country: 'UK',
        date: '',
        time: '',
        fee: '',
        currency: 'GBP',
        capacity: '',
        promoter: '',
        promoter_contact: '',
        requirements: '',
        notes: '',
        artist_id: artistId || ''
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottGigOffer.create({
            ...data,
            status: 'pending_manager_review',
            raw_email: 'MANUAL_ENTRY'
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
            alert('✓ Show added successfully');
            navigate(-1);
        },
        onError: (error) => {
            alert('Error: ' + (error.message || 'Failed to add show'));
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.venue || !formData.date || !formData.fee || !formData.artist_id) {
            alert('Missing required fields: Venue, Date, Fee, Artist');
            return;
        }

        createMutation.mutate({
            ...formData,
            fee: parseFloat(formData.fee),
            capacity: formData.capacity ? parseInt(formData.capacity) : null
        });
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-bold font-mono">BACK</span>
                </button>
                <span className="text-gray-600 text-xs">|</span>
                <a href={createPageUrl('CB51')} className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all">
                    <Radio className="w-4 h-4" />
                    <span className="text-xs font-bold font-mono">CB51</span>
                </a>
            </div>

            <div className="mb-6">
                <h1 className="text-4xl font-black text-white font-mono mb-2">ADD SHOW</h1>
                <p className="text-gray-600 text-xs font-mono">Manual entry</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* ARTIST SELECT */}
                {!artistId && (
                    <Card className="bg-black border-2 border-gray-900">
                        <CardContent className="p-4">
                            <label className="block mb-2 text-gray-400 text-xs font-mono font-bold">ARTIST *</label>
                            <select
                                value={formData.artist_id}
                                onChange={(e) => setFormData({...formData, artist_id: e.target.value})}
                                className="w-full bg-black border-2 border-gray-900 text-white p-3 rounded font-mono"
                                required
                            >
                                <option value="">Select artist...</option>
                                {artists.map(artist => (
                                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                                ))}
                            </select>
                        </CardContent>
                    </Card>
                )}

                {/* VENUE */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            <label className="text-gray-400 text-xs font-mono font-bold">VENUE *</label>
                        </div>
                        <Input
                            value={formData.venue}
                            onChange={(e) => setFormData({...formData, venue: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono"
                            placeholder="Venue name"
                            required
                        />
                    </CardContent>
                </Card>

                {/* LOCATION */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <label className="block mb-2 text-gray-400 text-xs font-mono font-bold">LOCATION</label>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                                placeholder="City"
                            />
                            <Input
                                value={formData.county}
                                onChange={(e) => setFormData({...formData, county: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                                placeholder="County"
                            />
                        </div>
                        <Input
                            value={formData.country}
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono mt-3"
                            placeholder="Country"
                        />
                    </CardContent>
                </Card>

                {/* DATE & TIME */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <label className="text-gray-400 text-xs font-mono font-bold">DATE & TIME *</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                                required
                            />
                            <Input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white font-mono"
                                placeholder="Time"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* FEE */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <label className="text-gray-400 text-xs font-mono font-bold">FEE *</label>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    value={formData.fee}
                                    onChange={(e) => setFormData({...formData, fee: e.target.value})}
                                    className="bg-black border-2 border-gray-900 text-white font-mono"
                                    placeholder="Amount"
                                    required
                                />
                            </div>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                                className="bg-black border-2 border-gray-900 text-white p-3 rounded font-mono"
                            >
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* CAPACITY */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <label className="text-gray-400 text-xs font-mono font-bold">CAPACITY</label>
                        </div>
                        <Input
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono"
                            placeholder="Venue capacity"
                        />
                    </CardContent>
                </Card>

                {/* PROMOTER */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <label className="block mb-2 text-gray-400 text-xs font-mono font-bold">PROMOTER</label>
                        <Input
                            value={formData.promoter}
                            onChange={(e) => setFormData({...formData, promoter: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono mb-3"
                            placeholder="Promoter name"
                        />
                        <Input
                            value={formData.promoter_contact}
                            onChange={(e) => setFormData({...formData, promoter_contact: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono"
                            placeholder="Email or phone"
                        />
                    </CardContent>
                </Card>

                {/* REQUIREMENTS */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <label className="block mb-2 text-gray-400 text-xs font-mono font-bold">TECH / HOSPITALITY</label>
                        <Textarea
                            value={formData.requirements}
                            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono min-h-[80px]"
                            placeholder="Backline, sound, hospitality..."
                        />
                    </CardContent>
                </Card>

                {/* NOTES */}
                <Card className="bg-black border-2 border-gray-900">
                    <CardContent className="p-4">
                        <label className="block mb-2 text-gray-400 text-xs font-mono font-bold">NOTES</label>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="bg-black border-2 border-gray-900 text-white font-mono min-h-[80px]"
                            placeholder="Additional details..."
                        />
                    </CardContent>
                </Card>

                {/* SUBMIT */}
                <motion.button
                    type="submit"
                    disabled={createMutation.isPending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    {createMutation.isPending ? (
                        'SAVING...'
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            SAVE SHOW
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
}