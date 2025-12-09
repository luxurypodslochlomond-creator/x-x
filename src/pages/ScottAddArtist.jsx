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

export default function ScottAddArtist() {
    const navigate = useNavigate();
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
            const newArtist = await base44.entities.ScottArtist.create(formData);
            navigate(createPageUrl(`ScottArtist?id=${newArtist.id}`));
        } catch (error) {
            alert('Error saving: ' + error.message);
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 p-4">
            
            <button
                onClick={() => navigate(createPageUrl('ScottManager'))}
                className="flex items-center gap-2 text-purple-400 mb-6 hover:text-purple-300"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-mono">Back</span>
            </button>

            <h1 className="text-3xl font-black text-white mb-6">ADD NEW</h1>

            <Card className="bg-black/60 border-2 border-purple-500 p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="text-purple-400 text-sm font-bold mb-2 block">Type</label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({...formData, type: value})}
                        >
                            <SelectTrigger className="bg-black/60 border-purple-500/50 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="artist">Artist</SelectItem>
                                <SelectItem value="client">Client</SelectItem>
                                <SelectItem value="venue">Venue</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-purple-400 text-sm font-bold mb-2 block">Name *</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-black/60 border-purple-500/50 text-white"
                            placeholder="Full name"
                        />
                    </div>

                    <div>
                        <label className="text-purple-400 text-sm font-bold mb-2 block">Phone</label>
                        <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="bg-black/60 border-purple-500/50 text-white"
                            placeholder="Phone number"
                        />
                    </div>

                    <div>
                        <label className="text-purple-400 text-sm font-bold mb-2 block">Email</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-black/60 border-purple-500/50 text-white"
                            placeholder="Email address"
                        />
                    </div>

                    <div>
                        <label className="text-purple-400 text-sm font-bold mb-2 block">Notes</label>
                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="bg-black/60 border-purple-500/50 text-white min-h-[100px]"
                            placeholder="Any important info..."
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black py-6"
                    >
                        {saving ? 'SAVING...' : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                SAVE
                            </>
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}