import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, WifiOff } from 'lucide-react';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { useScottOffline, ScottOfflineProvider } from '@/components/scott/ScottOfflineStorage';

function ScottAddArtistInner() {
    const navigate = useNavigate();
    const scott = useScottOffline();
    
    // PIN CHECK
    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);
    
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'artist',
        phone: '',
        email: '',
        instagram: '',
        spotify: '',
        rate: '',
        genre: '',
        gear: '',
        relationship: 'unknown',
        availability: 'unknown',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const newArtist = scott.createArtist(formData);
            navigate(createPageUrl(`ScottArtist?id=${newArtist.id}`));
        } catch (error) {
            alert('Error saving: ' + error.message);
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-4">
            
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm tracking-wider font-bold">BACK</span>
                </button>
                
                {/* OFFLINE INDICATOR */}
                {!scott.isOnline && (
                    <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded">
                        <WifiOff className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] text-green-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                            WORKS OFFLINE
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
                <KingdomCrown8Bit size={32} />
                <h1 className="text-2xl font-black text-amber-400 tracking-tight" style={{ fontFamily: 'monospace' }}>ADD CONTACT</h1>
            </div>

            <Card className="bg-black border border-amber-500/20 p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Type</label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({...formData, type: value})}
                        >
                            <SelectTrigger className="bg-black border-2 border-gray-800 text-white hover:border-amber-500/50 transition-all hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]" style={{ fontFamily: 'monospace', padding: '12px' }}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-2 border-amber-500/30" style={{ fontFamily: 'monospace' }}>
                                <SelectItem value="artist" className="text-white hover:bg-amber-500/20 focus:bg-amber-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Artist</SelectItem>
                                <SelectItem value="client" className="text-white hover:bg-amber-500/20 focus:bg-amber-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Client</SelectItem>
                                <SelectItem value="venue" className="text-white hover:bg-amber-500/20 focus:bg-amber-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Venue</SelectItem>
                                <SelectItem value="band_crew" className="text-white hover:bg-amber-500/20 focus:bg-amber-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Band/Crew</SelectItem>
                                <SelectItem value="other" className="text-white hover:bg-amber-500/20 focus:bg-amber-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Name *</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="Full name"
                        />
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Phone</label>
                        <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="+44..."
                        />
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Email</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Instagram</label>
                            <Input
                                value={formData.instagram}
                                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                                style={{ fontFamily: 'monospace' }}
                                placeholder="@handle"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Spotify</label>
                            <Input
                                value={formData.spotify}
                                onChange={(e) => setFormData({...formData, spotify: e.target.value})}
                                className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                                style={{ fontFamily: 'monospace' }}
                                placeholder="Artist link"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Rate (£)</label>
                            <Input
                                type="number"
                                value={formData.rate}
                                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                                className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                                style={{ fontFamily: 'monospace' }}
                                placeholder="250"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Genre</label>
                            <Input
                                value={formData.genre}
                                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                                className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                                style={{ fontFamily: 'monospace' }}
                                placeholder="Jazz, Rock..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Gear/Skills</label>
                        <Input
                            value={formData.gear}
                            onChange={(e) => setFormData({...formData, gear: e.target.value})}
                            className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="Guitar, keys, sound engineer..."
                        />
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Relationship</label>
                        <Select
                            value={formData.relationship}
                            onValueChange={(value) => setFormData({...formData, relationship: value})}
                        >
                            <SelectTrigger className="bg-black border-2 border-gray-800 text-white hover:border-amber-500/50 transition-all hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]" style={{ fontFamily: 'monospace', padding: '12px' }}>
                                <SelectValue placeholder="Unknown" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-2 border-amber-500/30" style={{ fontFamily: 'monospace' }}>
                                <SelectItem value="excellent" className="text-white hover:bg-green-500/20 focus:bg-green-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Excellent</SelectItem>
                                <SelectItem value="good" className="text-white hover:bg-cyan-500/20 focus:bg-cyan-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Good</SelectItem>
                                <SelectItem value="neutral" className="text-white hover:bg-gray-500/20 focus:bg-gray-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Neutral</SelectItem>
                                <SelectItem value="needs_work" className="text-white hover:bg-amber-500/20 focus:bg-amber-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Needs Work</SelectItem>
                                <SelectItem value="unknown" className="text-white hover:bg-gray-500/20 focus:bg-gray-500/20 cursor-pointer" style={{ fontFamily: 'monospace' }}>Unknown</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Notes</label>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors min-h-[100px]"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="Genre, gear, contract details..."
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-4 tracking-wider transition-all hover:scale-[1.02]"
                        style={{ fontFamily: 'monospace', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), inset 0 -2px 0 rgba(0,0,0,0.3)' }}
                    >
                        {saving ? 'SAVING...' : 'SAVE'}
                    </Button>
                </form>
                </Card>
                </div>
                );
                }

                export default function ScottAddArtist() {
                return (
                <ScottOfflineProvider>
                <ScottAddArtistInner />
                </ScottOfflineProvider>
                );
                }