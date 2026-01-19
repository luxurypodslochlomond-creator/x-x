import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ArrowLeft, Upload } from 'lucide-react';
import { Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ScottAddArtist() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profile_pic_url: '',
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



    const handleProfilePicUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await base44.integrations.Core.UploadFile({ file });
            setFormData({...formData, profile_pic_url: result.file_url});
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const newArtist = await base44.entities.ScottArtist.create({
                ...formData,
                type: 'artist'
            });
            
            // Auto-invite artist if email provided
            if (formData.email) {
                try {
                    await base44.users.inviteUser(formData.email, 'user');
                } catch (inviteError) {
                    console.log('Invite sent or already exists:', inviteError.message);
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

                {/* PROFILE PIC */}
                <div className="flex justify-center">
                    <label className="cursor-pointer group">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleProfilePicUpload}
                            className="hidden"
                        />
                        <div className="relative">
                            {formData.profile_pic_url ? (
                                <img 
                                    src={formData.profile_pic_url} 
                                    alt="Profile" 
                                    className="w-28 h-28 rounded-2xl object-cover border-2 border-cyan-500/50 group-hover:border-cyan-500 transition-all"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-2xl bg-gray-900/60 border-2 border-dashed border-gray-700 group-hover:border-cyan-500/50 flex items-center justify-center transition-all">
                                    <ImageIcon className="w-10 h-10 text-gray-700" />
                                </div>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/80 rounded-2xl flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-gray-800 border-t-cyan-500 rounded-full animate-spin"></div>
                                </div>
                            )}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="w-5 h-5 text-black" />
                            </div>
                        </div>
                    </label>
                </div>

                {/* FORM CARD */}
                <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-6 space-y-5">
                    
                    {/* NAME */}
                    <div>
                        <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">ARTIST NAME</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-gray-950 border-2 border-gray-800 text-white font-mono placeholder:text-gray-700"
                            placeholder="Full name or band name"
                        />
                    </div>

                    {/* CONTACT */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">PHONE</label>
                            <Input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="bg-gray-950 border-2 border-gray-800 text-white font-mono placeholder:text-gray-700"
                                placeholder="Phone number"
                            />
                        </div>
                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">EMAIL</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="bg-gray-950 border-2 border-gray-800 text-white font-mono placeholder:text-gray-700"
                                placeholder="Email address"
                            />
                        </div>
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