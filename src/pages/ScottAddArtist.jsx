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

            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-500/30">
                <KingdomCrown8Bit size={32} />
                <h1 className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>ADD CONTACT</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                
                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>TYPE</label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger className="bg-black border-2 border-gray-800 text-white h-12" style={{ fontFamily: 'monospace' }}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-2 border-gray-800">
                            <SelectItem value="artist">Artist</SelectItem>
                            <SelectItem value="client">Client</SelectItem>
                            <SelectItem value="venue">Venue</SelectItem>
                            <SelectItem value="band_crew">Band/Crew</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>NAME *</label>
                    <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                        style={{ fontFamily: 'monospace' }}
                        placeholder="Full name"
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>PHONE</label>
                    <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                        style={{ fontFamily: 'monospace' }}
                        placeholder="+44..."
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>EMAIL</label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                        style={{ fontFamily: 'monospace' }}
                        placeholder="email@example.com"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>INSTAGRAM</label>
                        <Input
                            value={formData.instagram}
                            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                            className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="@handle"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>SPOTIFY</label>
                        <Input
                            value={formData.spotify}
                            onChange={(e) => setFormData({...formData, spotify: e.target.value})}
                            className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="Link"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>RATE (£)</label>
                        <Input
                            type="number"
                            value={formData.rate}
                            onChange={(e) => setFormData({...formData, rate: e.target.value})}
                            className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="250"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>GENRE</label>
                        <Input
                            value={formData.genre}
                            onChange={(e) => setFormData({...formData, genre: e.target.value})}
                            className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="Rock, Jazz..."
                        />
                    </div>
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>GEAR/SKILLS</label>
                    <Input
                        value={formData.gear}
                        onChange={(e) => setFormData({...formData, gear: e.target.value})}
                        className="bg-black border-2 border-gray-800 text-white h-12 focus:border-amber-500"
                        style={{ fontFamily: 'monospace' }}
                        placeholder="Guitar, keys..."
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>RELATIONSHIP</label>
                    <Select value={formData.relationship} onValueChange={(value) => setFormData({...formData, relationship: value})}>
                        <SelectTrigger className="bg-black border-2 border-gray-800 text-white h-12" style={{ fontFamily: 'monospace' }}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-2 border-gray-800">
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="needs_work">Needs Work</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'monospace' }}>NOTES</label>
                    <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="bg-black border-2 border-gray-800 text-white focus:border-amber-500 min-h-[80px]"
                        style={{ fontFamily: 'monospace' }}
                        placeholder="Quick notes..."
                    />
                </div>

                <Button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black h-14 text-lg transition-all"
                    style={{ fontFamily: 'monospace' }}
                >
                    {saving ? 'SAVING...' : 'SAVE'}
                </Button>
            </form>
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