import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ArrowLeft } from 'lucide-react';
import { Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ScottAddArtist() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Require at least email or phone
        if (!formData.email && !formData.phone) {
            alert('Need at least email or phone');
            return;
        }

        setSaving(true);

        try {
            // Create artist record
            const newArtist = await base44.entities.ScottArtist.create({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                type: 'artist'
            });
            
            // Invite to CB51 if email exists
            if (formData.email) {
                try {
                    await base44.users.inviteUser(formData.email, 'user');
                    // Send notification
                    try {
                        await base44.functions.invoke('notifyNewArtist', {
                            artist_id: newArtist.id,
                            artist_name: formData.name,
                            artist_email: formData.email
                        });
                    } catch (e) {
                        console.log('Notification sent (may have failed silently)');
                    }
                } catch (inviteError) {
                    console.log('User exists or invite failed:', inviteError.message);
                }
            }
            
            navigate(createPageUrl(`ScottArtistHome?id=${newArtist.id}`));
        } catch (error) {
            alert('Error saving: ' + error.message);
            setSaving(false);
        }
    };



    return (
        <div className="min-h-screen bg-black p-6 pb-20">
            
            {/* HEADER */}
            <button
                onClick={() => navigate(createPageUrl('CB51'))}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-cyan-400 font-mono mb-1">ADD ARTIST</h1>
                    <p className="text-gray-600 text-sm font-mono">Name • Phone • Email</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">



                {/* FORM CARD - JUST 3 FIELDS */}
                <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-6 space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">NAME</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-gray-950 border-2 border-gray-800 text-white font-mono placeholder:text-gray-700"
                            placeholder="Full name"
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">PHONE</label>
                        <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="bg-gray-950 border-2 border-gray-800 text-white font-mono placeholder:text-gray-700"
                            placeholder="Phone"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">EMAIL</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-gray-950 border-2 border-gray-800 text-white font-mono placeholder:text-gray-700"
                            placeholder="Email"
                        />
                    </div>
                </div>

                {/* SAVE BUTTON */}
                <Button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-6 text-lg font-mono rounded-xl"
                >
                    {saving ? 'SAVING...' : '+ SAVE ARTIST'}
                </Button>
            </form>
        </div>
    );
}