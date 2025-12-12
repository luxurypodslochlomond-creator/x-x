import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, Clock, MapPin, Phone, Truck, Music, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * GIG PACKS
 * Advance sheets - all venue/show info in one place
 * Load-in, stage size, contacts, parking, tech specs
 */

export default function ScottGigPacks() {
    const [pinEntered, setPinEntered] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        artist_id: '',
        venue_name: '',
        stage_dimensions: '',
        sound_specs: '',
        rider_notes: '',
        load_in_time: '',
        soundcheck_time: '',
        doors_time: '',
        set_time: '',
        parking_info: '',
        contact_name: '',
        contact_phone: '',
        additional_notes: ''
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        } else {
            setPinEntered(true);
        }
    }, [navigate]);

    const { data: gigPacks = [], isLoading } = useQuery({
        queryKey: ['gigPacks'],
        queryFn: () => base44.entities.ScottGigPack.list('-created_date')
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['artists'],
        queryFn: () => base44.entities.ScottArtist.list()
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottGigPack.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gigPacks'] });
            setShowForm(false);
            setFormData({
                artist_id: '',
                venue_name: '',
                stage_dimensions: '',
                sound_specs: '',
                rider_notes: '',
                load_in_time: '',
                soundcheck_time: '',
                doors_time: '',
                set_time: '',
                parking_info: '',
                contact_name: '',
                contact_phone: '',
                additional_notes: ''
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    const getArtistName = (artistId) => {
        const artist = artists.find(a => a.id === artistId);
        return artist?.name || 'Unknown';
    };

    if (!pinEntered) return null;

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-900">
                <div className="flex items-center gap-3">
                    <Link to={createPageUrl('ScottManager')}>
                        <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-white transition-colors" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-cyan-400" />
                        <h1 className="text-xl font-black text-white" style={{ fontFamily: 'monospace' }}>GIG PACKS</h1>
                    </div>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-xs py-2 px-4"
                    style={{ fontFamily: 'monospace' }}
                >
                    <Plus className="w-4 h-4 mr-1" />
                    NEW
                </Button>
            </div>

            {/* FORM */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black border-2 border-cyan-500 rounded-lg p-4 mb-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">ARTIST</label>
                            <select
                                value={formData.artist_id}
                                onChange={(e) => setFormData({...formData, artist_id: e.target.value})}
                                className="w-full bg-black border border-gray-800 text-white p-2 text-sm font-mono"
                                required
                            >
                                <option value="">Select artist...</option>
                                {artists.map(a => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">VENUE NAME</label>
                            <Input
                                value={formData.venue_name}
                                onChange={(e) => setFormData({...formData, venue_name: e.target.value})}
                                className="bg-black border-gray-800 text-white text-sm font-mono"
                                placeholder="Barrowland Ballroom"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-gray-400 text-xs font-mono block mb-1">LOAD IN</label>
                                <Input
                                    value={formData.load_in_time}
                                    onChange={(e) => setFormData({...formData, load_in_time: e.target.value})}
                                    className="bg-black border-gray-800 text-white text-sm font-mono"
                                    placeholder="14:00"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs font-mono block mb-1">SOUNDCHECK</label>
                                <Input
                                    value={formData.soundcheck_time}
                                    onChange={(e) => setFormData({...formData, soundcheck_time: e.target.value})}
                                    className="bg-black border-gray-800 text-white text-sm font-mono"
                                    placeholder="17:00"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs font-mono block mb-1">DOORS</label>
                                <Input
                                    value={formData.doors_time}
                                    onChange={(e) => setFormData({...formData, doors_time: e.target.value})}
                                    className="bg-black border-gray-800 text-white text-sm font-mono"
                                    placeholder="19:00"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs font-mono block mb-1">SET TIME</label>
                                <Input
                                    value={formData.set_time}
                                    onChange={(e) => setFormData({...formData, set_time: e.target.value})}
                                    className="bg-black border-gray-800 text-white text-sm font-mono"
                                    placeholder="21:00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">STAGE SIZE</label>
                            <Input
                                value={formData.stage_dimensions}
                                onChange={(e) => setFormData({...formData, stage_dimensions: e.target.value})}
                                className="bg-black border-gray-800 text-white text-sm font-mono"
                                placeholder="10m x 8m"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">SOUND SPECS</label>
                            <Textarea
                                value={formData.sound_specs}
                                onChange={(e) => setFormData({...formData, sound_specs: e.target.value})}
                                className="bg-black border-gray-800 text-white text-sm font-mono h-20"
                                placeholder="PA system, monitors, mics..."
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">RIDER (Food/Drink)</label>
                            <Textarea
                                value={formData.rider_notes}
                                onChange={(e) => setFormData({...formData, rider_notes: e.target.value})}
                                className="bg-black border-gray-800 text-white text-sm font-mono h-20"
                                placeholder="6 beers, water, sandwiches..."
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">PARKING</label>
                            <Input
                                value={formData.parking_info}
                                onChange={(e) => setFormData({...formData, parking_info: e.target.value})}
                                className="bg-black border-gray-800 text-white text-sm font-mono"
                                placeholder="Loading bay at rear"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-gray-400 text-xs font-mono block mb-1">CONTACT NAME</label>
                                <Input
                                    value={formData.contact_name}
                                    onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                                    className="bg-black border-gray-800 text-white text-sm font-mono"
                                    placeholder="John Smith"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs font-mono block mb-1">CONTACT PHONE</label>
                                <Input
                                    value={formData.contact_phone}
                                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                                    className="bg-black border-gray-800 text-white text-sm font-mono"
                                    placeholder="07XXX XXXXXX"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono block mb-1">NOTES</label>
                            <Textarea
                                value={formData.additional_notes}
                                onChange={(e) => setFormData({...formData, additional_notes: e.target.value})}
                                className="bg-black border-gray-800 text-white text-sm font-mono h-20"
                                placeholder="Any other info..."
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-mono text-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={createMutation.isPending}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold font-mono text-sm"
                            >
                                {createMutation.isPending ? 'Saving...' : 'Save Pack'}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* LIST */}
            <div className="space-y-3">
                {gigPacks.length === 0 ? (
                    <div className="bg-black border border-gray-800 rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm font-bold font-mono mb-2">NO GIG PACKS</p>
                        <p className="text-gray-700 text-xs font-mono">Tap NEW to create advance sheet</p>
                    </div>
                ) : (
                    gigPacks.map(pack => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-black border-2 border-cyan-500/50 hover:border-cyan-500 rounded-lg p-4 transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-white font-black text-base font-mono mb-1">{pack.venue_name}</p>
                                    <p className="text-cyan-400 text-xs font-mono">{getArtistName(pack.artist_id)}</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                {pack.load_in_time && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-600" />
                                        <span className="text-gray-400 text-xs font-mono">Load in: {pack.load_in_time}</span>
                                    </div>
                                )}
                                {pack.soundcheck_time && (
                                    <div className="flex items-center gap-2">
                                        <Music className="w-4 h-4 text-gray-600" />
                                        <span className="text-gray-400 text-xs font-mono">Soundcheck: {pack.soundcheck_time}</span>
                                    </div>
                                )}
                                {pack.set_time && (
                                    <div className="flex items-center gap-2">
                                        <Music className="w-4 h-4 text-gray-600" />
                                        <span className="text-gray-400 text-xs font-mono">Set: {pack.set_time}</span>
                                    </div>
                                )}
                                {pack.contact_phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-600" />
                                        <a href={`tel:${pack.contact_phone}`} className="text-cyan-400 text-xs font-mono underline">
                                            {pack.contact_name || 'Contact'}: {pack.contact_phone}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {pack.stage_dimensions && (
                                <div className="bg-gray-900/50 border border-gray-800 rounded p-2 mb-2">
                                    <p className="text-gray-500 text-[9px] font-mono mb-1">STAGE</p>
                                    <p className="text-white text-xs font-mono">{pack.stage_dimensions}</p>
                                </div>
                            )}

                            {pack.parking_info && (
                                <div className="bg-gray-900/50 border border-gray-800 rounded p-2">
                                    <p className="text-gray-500 text-[9px] font-mono mb-1">PARKING</p>
                                    <p className="text-white text-xs font-mono">{pack.parking_info}</p>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}