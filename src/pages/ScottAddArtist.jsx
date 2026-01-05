import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check } from 'lucide-react';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';
import { base44 } from '@/api/base44Client';

export default function ScottAddArtist() {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const newArtist = await base44.entities.ScottArtist.create(formData);
            navigate(createPageUrl(`ScottArtistHome?id=${newArtist.id}`));
        } catch (error) {
            alert('Error saving: ' + error.message);
            setSaving(false);
        }
    };

    // Quick select buttons for common values
    const relationshipOptions = [
        { value: 'excellent', label: 'Excellent', color: 'bg-green-500' },
        { value: 'good', label: 'Good', color: 'bg-cyan-500' },
        { value: 'neutral', label: 'Neutral', color: 'bg-gray-500' },
        { value: 'needs_work', label: 'Needs Work', color: 'bg-red-500' },
        { value: 'unknown', label: 'Unknown', color: 'bg-gray-700' }
    ];

    const typeOptions = [
        { value: 'artist', label: 'Artist' },
        { value: 'client', label: 'Client' },
        { value: 'venue', label: 'Venue' },
        { value: 'band_crew', label: 'Band/Crew' },
        { value: 'other', label: 'Other' }
    ];

    return (
        <div className="min-h-screen bg-black p-4 pb-20">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-amber-500/30">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>
                
                <div className="flex items-center gap-2">
                    <KingdomCrown8Bit size={32} animate={true} />
                    <h1 className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>ADD</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                
                {/* TYPE - BIG BUTTONS */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>TYPE</label>
                    <div className="grid grid-cols-3 gap-2">
                        {typeOptions.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setFormData({...formData, type: opt.value})}
                                className={`py-3 px-2 rounded-lg font-bold text-xs transition-all border-2 ${
                                    formData.type === opt.value 
                                        ? 'bg-amber-500 text-black border-amber-500' 
                                        : 'bg-black text-gray-500 border-gray-800 hover:border-amber-500/50'
                                }`}
                                style={{ fontFamily: 'monospace' }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* NAME - BIG INPUT */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>NAME *</label>
                    <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-black border-2 border-amber-500/50 !text-white h-14 text-lg focus:border-amber-500 transition-all"
                        style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                        placeholder="Full name"
                    />
                </div>

                {/* PHONE */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>PHONE</label>
                    <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-black border-2 border-gray-800 !text-white h-14 text-lg focus:border-amber-500 transition-all"
                        style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                        placeholder="+44..."
                    />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>EMAIL</label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-black border-2 border-gray-800 !text-white h-14 text-lg focus:border-amber-500 transition-all"
                        style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                        placeholder="email@example.com"
                    />
                </div>

                {/* SOCIALS */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>INSTAGRAM</label>
                        <Input
                            value={formData.instagram}
                            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                            className="bg-black border-2 border-gray-800 !text-white h-14 text-base focus:border-amber-500 transition-all"
                            style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                            placeholder="@handle"
                        />
                    </div>
                    <div>
                        <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>SPOTIFY</label>
                        <Input
                            value={formData.spotify}
                            onChange={(e) => setFormData({...formData, spotify: e.target.value})}
                            className="bg-black border-2 border-gray-800 !text-white h-14 text-base focus:border-amber-500 transition-all"
                            style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                            placeholder="Link"
                        />
                    </div>
                </div>

                {/* RATE & GENRE */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>RATE (£)</label>
                        <Input
                            type="number"
                            value={formData.rate}
                            onChange={(e) => setFormData({...formData, rate: e.target.value})}
                            className="bg-black border-2 border-gray-800 !text-white h-14 text-lg focus:border-amber-500 transition-all"
                            style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                            placeholder="250"
                        />
                    </div>
                    <div>
                        <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>GENRE</label>
                        <Input
                            value={formData.genre}
                            onChange={(e) => setFormData({...formData, genre: e.target.value})}
                            className="bg-black border-2 border-gray-800 !text-white h-14 text-base focus:border-amber-500 transition-all"
                            style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                            placeholder="Rock, Jazz..."
                        />
                    </div>
                </div>

                {/* GEAR */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>GEAR/SKILLS</label>
                    <Input
                        value={formData.gear}
                        onChange={(e) => setFormData({...formData, gear: e.target.value})}
                        className="bg-black border-2 border-gray-800 !text-white h-14 text-base focus:border-amber-500 transition-all"
                        style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                        placeholder="Guitar, keys..."
                    />
                </div>

                {/* RELATIONSHIP - BIG BUTTONS */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>RELATIONSHIP</label>
                    <div className="grid grid-cols-3 gap-2">
                        {relationshipOptions.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setFormData({...formData, relationship: opt.value})}
                                className={`py-3 px-2 rounded-lg font-bold text-xs transition-all border-2 relative ${
                                    formData.relationship === opt.value 
                                        ? `${opt.color} text-white border-transparent` 
                                        : 'bg-black text-gray-500 border-gray-800 hover:border-gray-600'
                                }`}
                                style={{ fontFamily: 'monospace' }}
                            >
                                {formData.relationship === opt.value && (
                                    <Check className="w-4 h-4 absolute top-1 right-1" />
                                )}
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* NOTES */}
                <div>
                    <label className="text-amber-400 text-xs mb-3 block tracking-widest font-bold" style={{ fontFamily: 'monospace' }}>NOTES</label>
                    <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="bg-black border-2 border-gray-800 !text-white focus:border-amber-500 min-h-[100px] transition-all"
                        style={{ fontFamily: 'monospace', color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}
                        placeholder="Quick notes..."
                    />
                </div>

                {/* SAVE BUTTON - HUGE */}
                <Button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black h-16 text-xl transition-all shadow-lg"
                    style={{ fontFamily: 'monospace', boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}
                >
                    {saving ? 'SAVING...' : 'SAVE'}
                </Button>
            </form>
        </div>
    );
}