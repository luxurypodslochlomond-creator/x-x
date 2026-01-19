import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check, Upload, Image as ImageIcon, Mic2 } from 'lucide-react';
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

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice only works in Safari/Chrome. Use screenshot or paste link instead! 🎤');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setVoiceRecording(true);
        recognition.onend = () => setVoiceRecording(false);

        recognition.onerror = (event) => {
            setVoiceRecording(false);
            if (event.error === 'not-allowed') {
                alert('🎤 Mic blocked!\n\nSettings → Safari → Microphone → Allow\n\nOr just use screenshot/paste instead ♾️');
            } else {
                alert('Voice error. Use screenshot or paste link instead!');
            }
        };

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            
            setMagicLoading(true);
            try {
                const result = await base44.integrations.Core.InvokeLLM({
                    prompt: `Extract artist info from this voice note: "${transcript}"\n\nReturn JSON with: name, phone, email, genre, rate, instagram, spotify, notes`,
                    response_json_schema: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            phone: { type: "string" },
                            email: { type: "string" },
                            genre: { type: "string" },
                            rate: { type: "string" },
                            instagram: { type: "string" },
                            spotify: { type: "string" },
                            notes: { type: "string" }
                        }
                    }
                });

                setFormData({
                    ...formData,
                    name: result.name || formData.name,
                    phone: result.phone || formData.phone,
                    email: result.email || formData.email,
                    genre: result.genre || formData.genre,
                    rate: result.rate || formData.rate,
                    instagram: result.instagram || formData.instagram,
                    spotify: result.spotify || formData.spotify,
                    notes: result.notes || formData.notes
                });
            } catch (error) {
                alert('Could not process voice: ' + error.message);
            } finally {
                setMagicLoading(false);
            }
        };

        try {
            recognition.start();
        } catch (error) {
            alert('Voice failed. Use screenshot or paste link instead!');
            setVoiceRecording(false);
        }
    };

    const handlePhotoExtract = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPhotoExtracting(true);
        try {
            const uploadResult = await base44.integrations.Core.UploadFile({ file });
            
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract ALL info from this screenshot (could be Instagram, Spotify, Twitter, any social/music platform).

If you see MULTIPLE links/profiles (e.g. both Instagram AND Spotify visible), extract BOTH.

Return JSON with: name, genre, instagram (username or link), spotify (link), twitter (if visible), bio/description.`,
                file_urls: [uploadResult.file_url],
                response_json_schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        genre: { type: "string" },
                        instagram: { type: "string" },
                        spotify: { type: "string" },
                        bio: { type: "string" }
                    }
                }
            });

            setFormData({
                ...formData,
                name: result.name || formData.name,
                genre: result.genre || formData.genre,
                instagram: result.instagram || formData.instagram,
                spotify: result.spotify || formData.spotify,
                notes: result.bio || formData.notes,
                profile_pic_url: uploadResult.file_url
            });
        } catch (error) {
            alert('Could not extract from photo: ' + error.message);
        } finally {
            setPhotoExtracting(false);
        }
    };

    const handleImportFromContacts = () => {
        alert('Import from contacts coming soon - for now paste their info or use voice 🎤');
    };

    const handleMagicFill = async () => {
        if (!socialLink.trim()) return;
        
        setMagicLoading(true);
        try {
            const prompt = `Extract artist info from this link: ${socialLink}
            
Return ONLY valid JSON (no markdown):
{
  "name": "artist name",
  "genre": "genre if obvious",
  "instagram": "username if Instagram link",
  "spotify": "link if Spotify",
  "bio": "short bio or description"
}`;

            const result = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                response_json_schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        genre: { type: "string" },
                        instagram: { type: "string" },
                        spotify: { type: "string" },
                        bio: { type: "string" }
                    }
                }
            });

            setFormData({
                ...formData,
                name: result.name || formData.name,
                genre: result.genre || formData.genre,
                instagram: result.instagram || formData.instagram,
                spotify: result.spotify || formData.spotify,
                notes: result.bio || formData.notes
            });
            
            setSocialLink('');
        } catch (error) {
            alert('Could not extract info: ' + error.message);
        } finally {
            setMagicLoading(false);
        }
    };

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

    // Quick select buttons for common values
    const relationshipOptions = [
        { value: 'excellent', label: 'Excellent', color: 'bg-green-500' },
        { value: 'good', label: 'Good', color: 'bg-cyan-500' },
        { value: 'neutral', label: 'Neutral', color: 'bg-gray-500' },
        { value: 'needs_work', label: 'Needs Work', color: 'bg-red-500' },
        { value: 'unknown', label: 'Unknown', color: 'bg-gray-700' }
    ];

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