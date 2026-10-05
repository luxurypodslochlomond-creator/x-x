import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Music, Upload, Loader2, Sparkles, CheckCircle, ArrowLeft, AlertTriangle, DollarSign, Radio, MapPin, FileText, Leaf, Waves, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SubmitFrequencyPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        description: '',
        frequency_type: '',
        file_url: null,
        lyrics: '',
        tablature: '',
        key_signature: '',
        bpm: '',
    });
    
    const [selectedAudioFile, setSelectedAudioFile] = useState(null);
    const [audioQuality, setAudioQuality] = useState(null);
    const [coverArtFile, setCoverArtFile] = useState(null);
    const [coverArtPreview, setCoverArtPreview] = useState(null);

    const [isUploadingAudio, setIsUploadingAudio] = useState(false);
    const [isExtractingLyrics, setIsExtractingLyrics] = useState(false);
    const [isAnalyzingFrequency, setIsAnalyzingFrequency] = useState(false); // NEW
    const [frequencyAnalysis, setFrequencyAnalysis] = useState(null); // NEW
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const [coordinates, setCoordinates] = useState(null);
    const [isCapturingLocation, setIsCapturingLocation] = useState(false);

    const coverArtInputRef = useRef(null);

    const { data: user } = useQuery({
        queryKey: ['submitFrequencyUser'],
        queryFn: () => base44.auth.me()
    });

    const { data: myTracks } = useQuery({
        queryKey: ['myTracks', user?.email],
        queryFn: () => base44.entities.Soundtrack.filter({ created_by: user.email }, '-created_date'),
        enabled: !!user
    });

    // Audio quality detection
    const detectAudioQuality = (file) => {
        const name = file.name.toLowerCase();
        const size = file.size;
        
        if (name.endsWith('.flac')) {
            return { format: 'FLAC', quality: 'Lossless', icon: '💎', color: 'text-purple-400', description: 'Studio Master - Zero Loss' };
        }
        if (name.endsWith('.wav')) {
            return { format: 'WAV', quality: 'Lossless', icon: '💎', color: 'text-cyan-400', description: 'Uncompressed - Pure Signal' };
        }
        if (name.endsWith('.m4a') || name.endsWith('.alac')) {
            return { format: 'ALAC', quality: 'Lossless', icon: '💎', color: 'text-blue-400', description: 'Lossless - Zero Loss' };
        }
        if (name.endsWith('.mp3')) {
            // Rough estimate based on file size
            if (size > 10000000) { // >10MB for a typical song
                return { format: 'MP3', quality: 'High (320kbps)', icon: '⚡', color: 'text-green-400', description: 'High Quality Compressed' };
            }
            return { format: 'MP3', quality: 'Standard', icon: '📻', color: 'text-yellow-400', description: 'Compressed Audio' };
        }
        if (name.endsWith('.aac')) {
            return { format: 'AAC', quality: 'High (256kbps)', icon: '⚡', color: 'text-green-400', description: 'High Quality Compressed' };
        }
        return { format: 'Audio', quality: 'Uploaded', icon: '🎵', color: 'text-gray-400', description: 'Audio File' };
    };

    // NEW: Frequency Analysis Function
    const analyzeFrequency = async (fileUrl) => {
        setIsAnalyzingFrequency(true);
        try {
            const analysis = await base44.integrations.Core.InvokeLLM({
                prompt: `Perform a detailed frequency fingerprint analysis of the provided audio file.
                Identify and describe:
                1. Harmonic Signature: Overtone series, resonance, coherence score (0-100%).
                2. Brainwave State Induction: Dominant brainwave state (Alpha, Theta, Delta, Gamma, Beta) and its associated consciousness effect.
                3. Sacred Frequencies: Detect presence of solfeggio frequencies (e.g., 528Hz, 432Hz).
                4. Quantum Coherence: Overall energetic coherence score (0-100%) and a brief description.
                5. Simple Summary: A one-sentence, poetic summary of the frequency's essence and potential impact.`,
                file_urls: fileUrl,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        harmonic_analysis: {
                            type: 'object',
                            properties: {
                                overtone_description: { type: 'string' },
                                coherence_score: { type: 'number' } // 0-100
                            },
                            required: ['overtone_description']
                        },
                        brainwave_state: {
                            type: 'object',
                            properties: {
                                dominant_state: { type: 'string', enum: ['Alpha', 'Theta', 'Delta', 'Gamma', 'Beta'] },
                                frequency_range_hz: { type: 'string' },
                                consciousness_effect: { type: 'string' }
                            },
                            required: ['dominant_state', 'frequency_range_hz', 'consciousness_effect']
                        },
                        sacred_frequencies: {
                            type: 'object',
                            properties: {
                                solfeggio_present: { type: 'array', items: { type: 'string' } },
                                other_notable_frequencies: { type: 'array', items: { type: 'string' } }
                            },
                            required: ['solfeggio_present']
                        },
                        quantum_coherence: {
                            type: 'object',
                            properties: {
                                coherence_score: { type: 'number' }, // 0-100
                                description: { type: 'string' }
                            },
                            required: ['coherence_score', 'description']
                        },
                        simple_summary: { type: 'string' }
                    },
                    required: ['harmonic_analysis', 'brainwave_state', 'sacred_frequencies', 'quantum_coherence', 'simple_summary']
                }
            });
            setFrequencyAnalysis(analysis);
        } catch (err) {
            console.error("Frequency analysis failed:", err);
            setError('Failed to analyze frequency fingerprint. Please try again. You can still submit without analysis.');
            setFrequencyAnalysis(null);
        } finally {
            setIsAnalyzingFrequency(false);
        }
    };

    const handleAudioFileChange = async (e) => {
        setError('');
        const file = e.target.files[0];
        if (file) {
            const isAudioByType = file.type.startsWith('audio/');
            const hasAudioExtension = file.name.match(/\.(mp3|wav|flac|m4a|aac|ogg|alac)$/i);

            if (!isAudioByType && !hasAudioExtension) {
                setError('Please select an audio file (MP3, WAV, FLAC, M4A, AAC, ALAC, or OGG)');
                setSelectedAudioFile(null);
                setFormData(prev => ({ ...prev, file_url: null }));
                setAudioQuality(null);
                setFrequencyAnalysis(null); // Clear analysis
                return;
            }

            setSelectedAudioFile(file);
            const quality = detectAudioQuality(file);
            setAudioQuality(quality);
            setIsUploadingAudio(true);
            setFormData(prev => ({ ...prev, file_url: null })); // Clear file_url while uploading

            try {
                const { file_url } = await base44.integrations.Core.UploadFile({ file });
                setFormData(prev => ({ ...prev, file_url: file_url }));
                await analyzeFrequency(file_url); // Trigger analysis after upload
            } catch (err) {
                console.error("Audio upload failed:", err);
                setError('Audio file upload failed. Please try again.');
                setSelectedAudioFile(null);
                setFormData(prev => ({ ...prev, file_url: null }));
                setAudioQuality(null);
                setFrequencyAnalysis(null); // Clear analysis
            } finally {
                setIsUploadingAudio(false);
            }
        }
    };

    // AUTO-EXTRACT LYRICS
    const handleExtractLyrics = async () => {
        if (!formData.file_url) {
            setError('Please upload audio file first');
            return;
        }

        setIsExtractingLyrics(true);
        setError('');

        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract the lyrics from this song. Listen carefully and transcribe exactly what is being sung. Include:
- All verses, choruses, bridges
- [Instrumental] markers where appropriate
- Line breaks where natural pauses occur

Format clearly for readability.`,
                file_urls: formData.file_url,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        lyrics: { type: 'string' },
                        confidence: { type: 'string' },
                        notes: { type: 'string' }
                    }
                }
            });

            setFormData(prev => ({ 
                ...prev, 
                lyrics: response.lyrics 
            }));

            // Show confidence message
            if (response.confidence === 'low') {
                setError(`Lyrics extracted but AI wasn't confident. Please review carefully! ${response.notes || ''}`);
            }
        } catch (err) {
            console.error('Lyrics extraction failed:', err);
            setError('Could not extract lyrics automatically. You can still type them manually below.');
        } finally {
            setIsExtractingLyrics(false);
        }
    };

    const handleCoverArtFileChange = (e) => {
        setError('');
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setCoverArtFile(file);
            const reader = new FileReader();
            reader.onload = (event) => setCoverArtPreview(event.target.result);
            reader.readAsDataURL(file);
        } else {
            setError('Please upload a valid image file for cover art.');
            setCoverArtFile(null);
            setCoverArtPreview(null);
        }
    };

    const captureLocation = () => {
        setIsCapturingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setIsCapturingLocation(false);
                },
                (error) => {
                    console.error("Location error:", error);
                    setError("Could not capture location. You can still submit without it.");
                    setIsCapturingLocation(false);
                }
            );
        } else {
            setError("Geolocation not supported by your browser.");
            setIsCapturingLocation(false);
        }
    };

    const uploadMutation = useMutation({
        mutationFn: (file) => base44.integrations.Core.UploadFile({ file }),
    });

    const createSoundtrackMutation = useMutation({
        mutationFn: (data) => base44.entities.Soundtrack.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['soundtracks'] });
            queryClient.invalidateQueries({ queryKey: ['myTracks'] });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title.trim() || !formData.artist.trim() || !formData.frequency_type || !formData.file_url) {
            setError("Please provide a title, artist name, frequency type, and ensure your audio file is uploaded.");
            return;
        }

        setIsSubmittingForm(true);

        try {
            const existingTracks = await base44.entities.Soundtrack.list('-sequence', 1);
            const maxSequence = existingTracks.length > 0 ? existingTracks[0].sequence : 0;

            let coverArtFinalUrl = null;
            if (coverArtFile) {
                const { file_url } = await uploadMutation.mutateAsync(coverArtFile);
                coverArtFinalUrl = file_url;
            }
            
            await createSoundtrackMutation.mutateAsync({
                title: formData.title,
                artist: formData.artist,
                description: formData.description,
                frequency_type: formData.frequency_type,
                file_url: formData.file_url,
                cover_art_url: coverArtFinalUrl,
                sequence: maxSequence + 1,
                pay_what_you_want: false,
                suggested_price_p51: 0,
                total_earned_p51: 0,
                audio_quality_format: audioQuality?.format || 'Unknown',
                audio_quality_description: audioQuality?.description || 'Uploaded Audio',
                coordinates: coordinates,
                lyrics: formData.lyrics || null,
                tablature: formData.tablature || null,
                key_signature: formData.key_signature || null,
                bpm: formData.bpm ? parseFloat(formData.bpm) : null,
                frequency_fingerprint_analysis: frequencyAnalysis, // NEW
            });
            
            setIsSubmittingForm(false);
            setIsSuccess(true);
            setTimeout(() => navigate(createPageUrl('QuantumJukebox')), 6000);

        } catch (error) {
            console.error("Frequency submission failed:", error);
            setError("Something went wrong with submission. Please try again.");
            setIsSubmittingForm(false);
        }
    };
    
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center p-6">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-2xl">
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-4xl font-bold text-white mb-4">Frequency Received</h1>
                    <p className="text-xl text-gray-300 mb-8">Your sound has been integrated into the universal continuum. Thank you for sharing your soul's vibration.</p>
                    
                    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30 rounded-2xl p-8 space-y-4">
                        <h2 className="text-2xl font-bold text-green-300">Artist Economics Activated</h2>
                        <div className="text-6xl font-black text-white my-4">90%</div>
                        <p className="text-lg text-gray-300">You keep 90% of all love generated by your frequency.</p>
                        <p className="text-sm text-gray-400">10% flows to the Universal Love Treasury for planetary healing missions.</p>
                        <p className="text-xs text-gray-500 mt-4">This is not negotiable. This is eternal. Artists are sacred.</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-12">
                 <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-300 hover:bg-gray-800 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back
                </Button>

                <header className="text-center space-y-4">
                    <Music className="w-16 h-16 text-cyan-400 mx-auto" />
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Submit Your Frequency</h1>
                    <p className="text-lg text-gray-400">The first jukebox where planetary healing pays artists directly.</p>
                </header>

                {/* THE CORE TRUTH */}
                <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Leaf className="w-8 h-8 text-green-400" />
                            <h2 className="text-2xl font-bold text-white">The New Economics</h2>
                        </div>
                        <div className="space-y-4 text-gray-300">
                            <p className="text-lg">
                                <strong className="text-white">Someone cleans a beach.</strong> They earn P51 (verified by photo + GPS).
                            </p>
                            <p className="text-lg">
                                <strong className="text-white">They hear your song.</strong> They send you P51.
                            </p>
                            <p className="text-lg">
                                <strong className="text-white">You get paid.</strong> From a planetary healing act. Not an ad. Not a subscription.
                            </p>
                            <div className="bg-black/40 p-4 rounded-lg border border-green-500/30 mt-6">
                                <p className="text-center text-xl font-bold text-green-300">
                                    Healing Earth → Verified Value → Supports Artists
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* THE FREQUENCY FINGERPRINT™ */}
                <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Waves className="w-8 h-8 text-cyan-400" />
                            <h2 className="text-2xl font-bold text-white">The Photonic Wavelength Analysis™</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                            <strong className="text-white">World first:</strong> We auto-analyze the harmonic signature of your music. Science meets soul.
                        </p>
                        <div className="space-y-3 text-sm text-gray-300">
                            <p>🧠 <strong className="text-white">Brainwave state</strong> - Alpha (focus), Theta (meditation), Delta (deep healing)</p>
                            <p>✨ <strong className="text-white">Sacred frequencies</strong> - 528Hz (DNA repair), 432Hz (universal healing)</p>
                            <p>🌀 <strong className="text-white">Quantum coherence</strong> - How harmonically aligned your frequencies are</p>
                            <p>❤️ <strong className="text-white">Emotional resonance</strong> - The consciousness shift your music creates</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-cyan-500/30 mt-6">
                            <p className="text-xs text-cyan-400 text-center font-mono">
                                Innovation timestamped: January 2025 | The Photonic Wavelength Analysis™ by UF51
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* ZERO LOSS PROTOCOL */}
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Radio className="w-8 h-8 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">Zero Loss Audio</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                            We play your music <strong className="text-white">EXACTLY</strong> as you uploaded it. No compression. No transcoding. No bullshit.
                        </p>
                        <div className="space-y-3 text-sm text-gray-300">
                            <p>💎 <strong className="text-white">FLAC / WAV / ALAC</strong> - Lossless formats preserved perfectly</p>
                            <p>⚡ <strong className="text-white">High-quality MP3/AAC</strong> - Delivered exactly as encoded</p>
                            <p>🎵 <strong className="text-white">Your mix, your master</strong> - We touch nothing</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-purple-500/30 mt-6">
                            <p className="text-center text-sm text-purple-300">
                                Inspired by Claude Shannon's information theory: <strong className="text-white">Signal transmitted = Signal received</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* YOU KEEP 90% */}
                <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/50">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign className="w-8 h-8 text-amber-400" />
                            <h2 className="text-2xl font-bold text-white">Artist Economics</h2>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="text-7xl font-black text-amber-400">90%</div>
                            <p className="text-xl text-gray-300">You keep 90% of every P51 sent to you.</p>
                            <p className="text-sm text-gray-400">10% flows to the Universal Love Treasury for planetary healing missions + funding new artist dreams.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-amber-500/30 mt-6">
                            <p className="text-xs text-amber-400 text-center">
                                This is not negotiable. This is eternal. <strong className="text-white">Artists are sacred.</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* MY TRACKS SECTION */}
                {myTracks && myTracks.length > 0 && (
                    <Card className="bg-black/50 border border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Your Frequencies</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {myTracks.map(track => (
                                <div key={track.id} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                    {track.cover_art_url && <img src={track.cover_art_url} className="w-12 h-12 rounded" alt={track.title} />}
                                    <div className="flex-1">
                                        <p className="font-bold text-white">{track.title}</p>
                                        <p className="text-sm text-gray-400">{track.artist} • {track.frequency_type}</p>
                                        {track.audio_quality_format && (
                                            <p className="text-xs text-cyan-400 mt-1">
                                                {track.audio_quality_format} • {track.audio_quality_description}
                                            </p>
                                        )}
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => navigate(createPageUrl('QuantumJukebox'))}>
                                        View
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* THE FORM */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="bg-black/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl">
                        <CardContent className="p-8">
                            
                            {/* Audio File Upload with Quality Detection */}
                            <div>
                                <Label htmlFor="file" className="text-lg font-semibold text-purple-300">Audio File <span className="text-red-400">*</span></Label>
                                <p className="text-sm text-gray-400 mb-3">
                                    Upload your sacred frequency. We support studio-quality lossless formats (FLAC, WAV, ALAC) and high-quality compressed (MP3 320kbps, AAC 256kbps). 
                                    Your audio will be played <strong className="text-cyan-300">EXACTLY as you upload it</strong> - no compression, no transcoding, no degradation.
                                </p>
                                <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center hover:border-purple-500/60 transition-colors">
                                    {formData.file_url ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <CheckCircle className="w-12 h-12 text-green-400" />
                                            <p className="text-green-300 font-medium">File uploaded successfully!</p>
                                            {audioQuality && (
                                                <div className={`flex items-center gap-2 ${audioQuality.color}`}>
                                                    <span className="text-2xl">{audioQuality.icon}</span>
                                                    <div className="text-left">
                                                        <p className="font-bold">{audioQuality.format} - {audioQuality.quality}</p>
                                                        <p className="text-xs text-gray-400">{audioQuality.description}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500 break-all max-w-full mt-2">{selectedAudioFile?.name}</p>
                                        </div>
                                    ) : isUploadingAudio ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
                                            <p className="text-purple-300">Uploading your frequency...</p>
                                        </div>
                                    ) : (
                                        <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-3">
                                            <Upload className="w-12 h-12 text-purple-400" />
                                            <p className="text-purple-300 font-medium">Tap to select your audio file</p>
                                            <div className="text-xs text-gray-500 space-y-1">
                                                <p className="font-bold text-cyan-400">💎 Lossless (Recommended):</p>
                                                <p>FLAC, WAV, ALAC - Studio quality, zero loss</p>
                                                <p className="font-bold text-green-400 mt-2">⚡ High Quality Compressed:</p>
                                                <p>MP3 (320kbps), AAC (256kbps), M4A</p>
                                            </div>
                                            <Input 
                                                id="file" 
                                                type="file" 
                                                accept="audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg,.alac"
                                                onChange={handleAudioFileChange} 
                                                className="hidden" 
                                                required
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* FREQUENCY ANALYSIS DISPLAY */}
                            {isAnalyzingFrequency && (
                                <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 text-cyan-300">
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <div>
                                                <p className="font-bold">Analyzing Photonic Wavelength...</p>
                                                <p className="text-sm text-gray-400">Extracting harmonic data, brainwave states, sacred frequencies...</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {frequencyAnalysis && (
                                <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-white flex items-center gap-2">
                                            <Brain className="w-6 h-6 text-cyan-400" />
                                            Photonic Wavelength Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Harmonic Analysis */}
                                        {frequencyAnalysis.harmonic_analysis && (
                                            <div className="bg-black/40 p-4 rounded-lg border border-cyan-500/30">
                                                <h3 className="text-lg font-bold text-cyan-300 mb-2">🎵 Harmonic Signature</h3>
                                                <p className="text-sm text-gray-300">{frequencyAnalysis.harmonic_analysis.overtone_description}</p>
                                                {frequencyAnalysis.harmonic_analysis.coherence_score && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-gray-400">Harmonic Coherence:</p>
                                                        <p className="text-2xl font-bold text-white">{frequencyAnalysis.harmonic_analysis.coherence_score}%</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Brainwave State */}
                                        {frequencyAnalysis.brainwave_state && (
                                            <div className="bg-black/40 p-4 rounded-lg border border-purple-500/30">
                                                <h3 className="text-lg font-bold text-purple-300 mb-2">🧠 Consciousness Effect</h3>
                                                <p className="text-sm text-gray-300"><strong className="text-white">{frequencyAnalysis.brainwave_state.dominant_state}</strong> ({frequencyAnalysis.brainwave_state.frequency_range_hz})</p>
                                                <p className="text-sm text-gray-400 mt-1">{frequencyAnalysis.brainwave_state.consciousness_effect}</p>
                                            </div>
                                        )}

                                        {/* Sacred Frequencies */}
                                        {frequencyAnalysis.sacred_frequencies && frequencyAnalysis.sacred_frequencies.solfeggio_present && frequencyAnalysis.sacred_frequencies.solfeggio_present.length > 0 && (
                                            <div className="bg-black/40 p-4 rounded-lg border border-yellow-500/30">
                                                <h3 className="text-lg font-bold text-yellow-300 mb-2">✨ Sacred Frequencies Detected</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {frequencyAnalysis.sacred_frequencies.solfeggio_present.map((freq, i) => (
                                                        <span key={i} className="px-3 py-1 bg-yellow-900/30 border border-yellow-500/30 rounded-full text-sm text-yellow-200">
                                                            {freq}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Quantum Coherence */}
                                        {frequencyAnalysis.quantum_coherence && (
                                            <div className="bg-black/40 p-4 rounded-lg border border-green-500/30">
                                                <h3 className="text-lg font-bold text-green-300 mb-2">🌀 Quantum Coherence</h3>
                                                <p className="text-3xl font-bold text-white mb-1">{frequencyAnalysis.quantum_coherence.coherence_score}%</p>
                                                <p className="text-sm text-gray-300">{frequencyAnalysis.quantum_coherence.description}</p>
                                            </div>
                                        )}

                                        {/* Simple Summary */}
                                        {frequencyAnalysis.simple_summary && (
                                            <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30">
                                                <h3 className="text-lg font-bold text-pink-300 mb-2">❤️ In Simple Terms</h3>
                                                <p className="text-sm text-gray-300">{frequencyAnalysis.simple_summary}</p>
                                            </div>
                                        )}

                                        <p className="text-center text-xs text-cyan-400 mt-4 font-mono">
                                            Analyzed by Photonic Wavelength Analysis™ | Jan 2025
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Track Title */}
                            <div>
                                <Label htmlFor="title" className="text-lg font-semibold text-gray-300 block mb-2">
                                    Track Title <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="e.g., Free Fallin'"
                                    className="bg-black/70 border-gray-700 text-white"
                                    required
                                />
                            </div>

                            {/* Artist Name */}
                            <div>
                                <Label htmlFor="artist" className="text-lg font-semibold text-gray-300 block mb-2">
                                    Artist Name <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    id="artist"
                                    value={formData.artist}
                                    onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                                    placeholder="e.g., Dillon Squire"
                                    className="bg-black/70 border-gray-700 text-white"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description" className="text-lg font-semibold text-gray-300 block mb-2">
                                    The Story Behind the Sound
                                </Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="What does this frequency heal or create?"
                                    className="bg-black/70 border-gray-700 text-white min-h-[100px]"
                                />
                            </div>

                            {/* Frequency Type */}
                            <div>
                                <Label htmlFor="frequencyType" className="text-lg font-semibold text-gray-300 block mb-2">
                                    Frequency Type <span className="text-red-400">*</span>
                                </Label>
                                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, frequency_type: value }))} value={formData.frequency_type} required>
                                    <SelectTrigger className="bg-black/70 border-gray-700 text-white">
                                        <SelectValue placeholder="Select the purpose of this frequency" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-gray-700 text-white">
                                        <SelectItem value="Creation">✨ Creation</SelectItem>
                                        <SelectItem value="Healing">💚 Healing</SelectItem>
                                        <SelectItem value="Focus">🎯 Focus</SelectItem>
                                        <SelectItem value="Love">❤️ Love</SelectItem>
                                        <SelectItem value="Revolution">✊ Revolution</SelectItem>
                                        <SelectItem value="Decompression">🌙 Decompression</SelectItem>
                                        <SelectItem value="Genesis">🌟 Genesis</SelectItem>
                                        <SelectItem value="Cosmic">🌌 Cosmic</SelectItem>
                                        <SelectItem value="Soul_Signature">💜 Soul Signature</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cover Art Upload */}
                            <div>
                                <Label className="text-lg font-semibold text-gray-300 block mb-2">Upload Cover Art (Optional)</Label>
                                <p className="text-sm text-gray-400 mb-3">High-res artwork (1400x1400px recommended). This is what listeners see.</p>
                                <Input
                                    ref={coverArtInputRef}
                                    id="coverArt"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverArtFileChange}
                                    className="bg-black/70 border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-cyan-600 file:text-white file:cursor-pointer hover:file:bg-cyan-700"
                                />
                                {coverArtPreview && (
                                    <div className="mt-3">
                                        <img src={coverArtPreview} alt="Cover art preview" className="w-32 h-32 object-cover rounded-lg border-2 border-cyan-500" />
                                    </div>
                                )}
                            </div>
                            
                            {/* AUTO-EXTRACT LYRICS */}
                            {formData.file_url && (
                                <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-purple-400" />
                                                Auto-Extract Lyrics
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1">AI51 will transcribe your lyrics. You review & approve.</p>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleExtractLyrics}
                                            disabled={isExtractingLyrics || isUploadingAudio}
                                            className="bg-purple-600 hover:bg-purple-700"
                                        >
                                            {isExtractingLyrics ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Extracting...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    Extract Lyrics
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Lyrics (manual or auto) */}
                            <div>
                                <Label htmlFor="lyrics" className="text-lg font-semibold text-gray-300 block mb-2">
                                    Lyrics (Optional)
                                </Label>
                                <p className="text-sm text-gray-400 mb-2">Share your lyrics so people can learn and sing along. Radically accessible.</p>
                                <Textarea
                                    id="lyrics"
                                    value={formData.lyrics}
                                    onChange={(e) => setFormData(prev => ({ ...prev, lyrics: e.target.value }))}
                                    placeholder="Verse 1:&#10;I'm free fallin'&#10;Yeah I'm free fallin'..."
                                    className="bg-black/70 border-gray-700 text-white min-h-[200px] font-mono text-sm"
                                />
                            </div>

                            {/* Tablature */}
                            <div>
                                <Label htmlFor="tablature" className="text-lg font-semibold text-gray-300 block mb-2">
                                    Chords / Tablature (Optional)
                                </Label>
                                <p className="text-sm text-gray-400 mb-2">Help people learn to play your song. Chords, tabs, whatever helps.</p>
                                <Textarea
                                    id="tablature"
                                    value={formData.tablature}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tablature: e.target.value }))}
                                    placeholder="Intro: D - A - Em - G&#10;Verse: D A Em G&#10;Or guitar tab format..."
                                    className="bg-black/70 border-gray-700 text-white min-h-[150px] font-mono text-sm"
                                />
                            </div>

                            {/* Musical Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="key_signature" className="text-sm font-semibold text-gray-300 block mb-2">
                                        Key Signature (Optional)
                                    </Label>
                                    <Input
                                        id="key_signature"
                                        value={formData.key_signature}
                                        onChange={(e) => setFormData(prev => ({ ...prev, key_signature: e.target.value }))}
                                        placeholder="e.g., D Major"
                                        className="bg-black/70 border-gray-700 text-white"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="bpm" className="text-sm font-semibold text-gray-300 block mb-2">
                                        BPM (Optional)
                                    </Label>
                                    <Input
                                        id="bpm"
                                        type="number"
                                        value={formData.bpm}
                                        onChange={(e) => setFormData(prev => ({ ...prev, bpm: e.target.value }))}
                                        placeholder="e.g., 120"
                                        className="bg-black/70 border-gray-700 text-white"
                                    />
                                </div>
                            </div>

                            {/* Location (Optional) */}
                            <div>
                                <Label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Location (Optional)
                                </Label>
                                <p className="text-sm text-gray-400 mb-2">Where was this frequency created? Helps listeners connect to the landscape that inspired it.</p>
                                <Button
                                    type="button"
                                    onClick={captureLocation}
                                    disabled={isCapturingLocation || !!coordinates}
                                    variant="outline"
                                    className="w-full border-gray-700 bg-black/70 text-gray-300 hover:bg-gray-800 hover:text-white"
                                >
                                    {isCapturingLocation ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Capturing...
                                        </>
                                    ) : coordinates ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                            Location Captured ({coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)})
                                        </>
                                    ) : (
                                        <>
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Capture Location
                                        </>
                                    )}
                                </Button>
                            </div>

                            {error && (
                                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-300 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isSubmittingForm || isUploadingAudio || isExtractingLyrics || isAnalyzingFrequency || !formData.file_url || !formData.title || !formData.artist || !formData.frequency_type}
                                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-lg py-6"
                            >
                                {isSubmittingForm ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Transmitting Frequency...
                                    </>
                                ) : (
                                    <>
                                        <Radio className="w-5 h-5 mr-2" />
                                        Transmit Frequency to Universal Catalog
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}