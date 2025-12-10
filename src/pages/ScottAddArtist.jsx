import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

export default function ScottAddArtist() {
    const navigate = useNavigate();
    
    // PIN CHECK
    React.useEffect(() => {
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
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const newArtist = await base44.asServiceRole.entities.ScottArtist.create(formData);
            navigate(createPageUrl(`ScottArtist?id=${newArtist.id}`));
        } catch (error) {
            alert('Error saving: ' + error.message);
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-4">
            
            <button
                onClick={() => navigate(createPageUrl('ScottManager'))}
                className="flex items-center gap-2 text-gray-600 mb-6 hover:text-amber-400 transition-all hover:gap-1"
            >
                <ArrowLeft className="w-4 h-4" />
                <span style={{ fontFamily: 'monospace' }} className="text-sm tracking-wider font-bold">BACK</span>
            </button>

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

                    <div>
                        <label className="text-gray-500 text-xs tracking-widest mb-2 block uppercase" style={{ fontFamily: 'monospace' }}>Notes</label>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="bg-black border border-gray-800 text-white placeholder:text-gray-700 focus:border-amber-500/50 transition-colors min-h-[100px]"
                            style={{ fontFamily: 'monospace' }}
                            placeholder="Important info..."
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