import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, CheckCircle, Music, Waves, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RequestAIMusicPage() {
    const [formData, setFormData] = useState({
        requested_frequency_type: 'Healing',
        genre: 'House',
        bpm: '120',
        specific_hz: '528Hz',
        vibe_description: '',
        artist_reference: '',
        vocals_requested: false,
        lyrics_theme: '',
        why_needed: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const createRequestMutation = useMutation({
        mutationFn: (data) => base44.entities.TrackRequest.create(data),
        onSuccess: () => {
            setSuccess(true);
            setTimeout(() => {
                navigate(createPageUrl('Radio'));
            }, 3000);
        },
        onError: (err) => {
            console.error('Request failed:', err);
            setIsSubmitting(false);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        createRequestMutation.mutate({
            ...formData,
            bpm: parseFloat(formData.bpm) || 120,
            community_votes: 1 // User's own vote
        });
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center space-y-6"
                >
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #22c55e)' }} />
                    <h2 className="text-4xl font-black text-white">Request Received!</h2>
                    <p className="text-xl text-gray-300">AI51 + BRO51 will review this and work on making it real.</p>
                    <p className="text-sm text-gray-500">Redirecting to Radio...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-4 md:p-12 pb-32">
            <div className="max-w-3xl mx-auto space-y-8">
                
                {/* HEADER */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles className="w-16 h-16 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #a855f7)' }} />
                    </motion.div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white">
                        Request AI51 Track
                    </h1>
                    
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Tell us what frequency the world needs right now. We'll work on making it real.
                    </p>

                    <Card className="bg-yellow-900/20 border-2 border-yellow-500/50">
                        <CardContent className="p-4">
                            <p className="text-yellow-300 text-sm">
                                <strong>Note:</strong> We're still building music generation tech. Your request goes to BRO51 + AI51 for review. 
                                We'll figure out how to make it happen - whether that's AI generation or connecting you with real artists.
                            </p>
                        </CardContent>
                    </Card>
                </header>

                {/* FORM */}
                <Card className="bg-black/60 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-purple-400">What Does The World Need?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Frequency Type */}
                            <div>
                                <label className="text-sm font-bold text-white mb-2 block">
                                    <Waves className="w-4 h-4 inline mr-2" />
                                    Frequency Type
                                </label>
                                <Select value={formData.requested_frequency_type} onValueChange={(val) => setFormData({...formData, requested_frequency_type: val})}>
                                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-950 border-gray-700">
                                        <SelectItem value="Healing">Healing</SelectItem>
                                        <SelectItem value="Creation">Creation</SelectItem>
                                        <SelectItem value="Focus">Focus</SelectItem>
                                        <SelectItem value="Decompression">Decompression</SelectItem>
                                        <SelectItem value="Love">Love</SelectItem>
                                        <SelectItem value="Revolution">Revolution</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Genre */}
                            <div>
                                <label className="text-sm font-bold text-white mb-2 block">
                                    <Music className="w-4 h-4 inline mr-2" />
                                    Genre
                                </label>
                                <Select value={formData.genre} onValueChange={(val) => setFormData({...formData, genre: val})}>
                                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-950 border-gray-700">
                                        <SelectItem value="House">House</SelectItem>
                                        <SelectItem value="Rock">Rock</SelectItem>
                                        <SelectItem value="Electronic">Electronic</SelectItem>
                                        <SelectItem value="Acoustic">Acoustic</SelectItem>
                                        <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                                        <SelectItem value="Jazz">Jazz</SelectItem>
                                        <SelectItem value="Classical">Classical</SelectItem>
                                        <SelectItem value="Ambient">Ambient</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* BPM + Hz */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-white mb-2 block">BPM</label>
                                    <Input
                                        type="number"
                                        value={formData.bpm}
                                        onChange={(e) => setFormData({...formData, bpm: e.target.value})}
                                        className="bg-gray-900/50 border-gray-600 text-white"
                                        placeholder="120"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-white mb-2 block">
                                        <Zap className="w-4 h-4 inline mr-2" />
                                        Healing Hz
                                    </label>
                                    <Input
                                        value={formData.specific_hz}
                                        onChange={(e) => setFormData({...formData, specific_hz: e.target.value})}
                                        className="bg-gray-900/50 border-gray-600 text-white"
                                        placeholder="528Hz, 432Hz"
                                    />
                                </div>
                            </div>

                            {/* Vibe Description */}
                            <div>
                                <label className="text-sm font-bold text-white mb-2 block">
                                    <Heart className="w-4 h-4 inline mr-2" />
                                    How Should This Track Make People Feel?
                                </label>
                                <Textarea
                                    value={formData.vibe_description}
                                    onChange={(e) => setFormData({...formData, vibe_description: e.target.value})}
                                    className="bg-gray-900/50 border-gray-600 text-white h-24"
                                    placeholder="e.g., 'Like dancing at sunrise', 'Deep ocean calm', 'Pure euphoria'"
                                    required
                                />
                            </div>

                            {/* Reference Artist */}
                            <div>
                                <label className="text-sm font-bold text-white mb-2 block">Artist/Track Reference (Optional)</label>
                                <Input
                                    value={formData.artist_reference}
                                    onChange={(e) => setFormData({...formData, artist_reference: e.target.value})}
                                    className="bg-gray-900/50 border-gray-600 text-white"
                                    placeholder="e.g., 'Marshall Jefferson vibe', 'Freddie Mercury energy'"
                                />
                            </div>

                            {/* Why Needed */}
                            <div>
                                <label className="text-sm font-bold text-white mb-2 block">Why Is This Frequency Needed Right Now?</label>
                                <Textarea
                                    value={formData.why_needed}
                                    onChange={(e) => setFormData({...formData, why_needed: e.target.value})}
                                    className="bg-gray-900/50 border-gray-600 text-white h-24"
                                    placeholder="What gap does this fill? What healing does the world need?"
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black h-14 text-lg"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Transmitting Request...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Send Request to AI51
                                    </>
                                )}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}