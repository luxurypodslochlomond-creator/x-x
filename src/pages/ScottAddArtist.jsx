import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ScottAddArtist() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!editId);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        profile_pic_url: ''
    });
    const [uploadingImage, setUploadingImage] = useState(false);

    // Load artist data if editing
    React.useEffect(() => {
        if (editId) {
            setLoading(true);
            base44.entities.ScottArtist.filter({ id: editId })
                .then(artists => {
                    if (artists.length > 0) {
                        const artist = artists[0];
                        setFormData({
                            name: artist.name || '',
                            phone: artist.phone || '',
                            email: artist.email || '',
                            profile_pic_url: artist.profile_pic_url || ''
                        });
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [editId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Require at least email or phone
        if (!formData.email && !formData.phone) {
            alert('Need at least email or phone');
            return;
        }

        setSaving(true);

        try {
            if (editId) {
                // UPDATE existing artist
                await base44.entities.ScottArtist.update(editId, {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    profile_pic_url: formData.profile_pic_url
                });
                navigate(createPageUrl(`ScottArtistHome?id=${editId}`));
            } else {
                // CREATE new artist - use Artist entity (migrated schema)
                const newArtist = await base44.entities.Artist.create({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    profile_pic_url: formData.profile_pic_url
                });
                
                // Send CB51 branded invitation (non-blocking - artist already saved)
                if (formData.email) {
                    base44.functions.invoke('sendCB51BrandedInvite', {
                        email: formData.email,
                        name: formData.name,
                        artistName: formData.name
                    }).catch(e => console.log('Email send failed:', e));
                }
                
                // Invalidate queries so CB51 dashboard updates
                queryClient.invalidateQueries({ queryKey: ['cb51Artists'] });
                
                navigate(createPageUrl('CB51'));
            }
        } catch (error) {
            alert('Error saving: ' + error.message);
            setSaving(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const result = await base44.integrations.Core.UploadFile({ file });
            setFormData({ ...formData, profile_pic_url: result.file_url });
        } catch (error) {
            console.error('Upload error:', error);
            alert('Image upload failed: ' + error.message);
        } finally {
            setUploadingImage(false);
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
                    <h1 className="text-3xl font-black text-cyan-400 font-mono mb-1">{editId ? 'EDIT ARTIST' : 'ADD ARTIST'}</h1>
                    <p className="text-gray-600 text-sm font-mono">Name • Phone • Email</p>
                </div>
            </div>

            {loading && (
                <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-8 text-center mb-6">
                    <Radio className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-cyan-400 font-mono text-sm">Loading artist...</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* IMAGE UPLOAD */}
                <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-6">
                    <label className="text-cyan-400 text-xs font-bold font-mono mb-3 block">ARTIST PHOTO</label>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-black border-2 border-cyan-500 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                            {formData.profile_pic_url ? (
                                <img src={formData.profile_pic_url} alt="Artist" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-cyan-500 text-black font-black text-2xl flex items-center justify-center">
                                    {formData.name.charAt(0) || '?'}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className={`block w-full text-center bg-cyan-500/20 border border-cyan-500 text-cyan-400 py-2 px-4 rounded-lg font-mono text-xs font-bold cursor-pointer hover:bg-cyan-500/30 transition-all ${uploadingImage ? 'opacity-50' : ''}`}>
                                {uploadingImage ? 'UPLOADING...' : formData.profile_pic_url ? 'CHANGE PHOTO' : 'ADD PHOTO'}
                            </label>
                        </div>
                    </div>
                </div>

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
                    disabled={saving || loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-6 text-lg font-mono rounded-xl"
                >
                    {saving ? 'SAVING...' : editId ? 'UPDATE ARTIST' : '+ SAVE ARTIST'}
                </Button>
            </form>
        </div>
    );
}