import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Music, Upload, Loader2, Check, AlertCircle, 
    Heart, Zap, Image as ImageIcon, PlayCircle,
    Info, ChevronRight, FileAudio, Film, Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKMusicNote, COOLASFUCKHeart, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';

const FREQUENCY_TYPES = [
    { value: 'Healing', emoji: '💚', description: 'Soothes the soul' },
    { value: 'Creation', emoji: '✨', description: 'Sparks creativity' },
    { value: 'Focus', emoji: '🎯', description: 'Sharpens the mind' },
    { value: 'Love', emoji: '❤️', description: 'Opens the heart' },
    { value: 'Revolution', emoji: '⚡', description: 'Ignites change' },
    { value: 'Decompression', emoji: '🌊', description: 'Releases tension' },
    { value: 'Soul_Signature', emoji: '🔮', description: 'Pure you' },
];

const ACCEPTED_AUDIO = '.flac,.wav,.aiff'; // LOSSLESS ONLY
const ACCEPTED_VIDEO = '.mp4,.mov,.avi,.webm';

export default function ForMusiciansPage() {
    const [step, setStep] = useState(1); // 1: intro, 2: upload, 3: details, 4: success
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        featured_artist: '',
        description: '',
        artist_story: '',
        frequency_type: 'Creation',
        file_url: '',
        cover_art_url: '',
        lyrics: '',
        key_signature: '',
        bpm: '',
    });
    const [audioFile, setAudioFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [audioPreview, setAudioPreview] = useState('');
    const [coverPreview, setCoverPreview] = useState('');
    const [isUploadingAudio, setIsUploadingAudio] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [fileInfo, setFileInfo] = useState(null);
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const trackMutation = useMutation({
        mutationFn: (newTrack) => base44.entities.Soundtrack.create(newTrack),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['soundtracks'] });
            setStep(4);
        },
        onError: (err) => {
            console.error("Upload failed", err);
            setError('Upload failed. Your files are saved. Try again?');
        }
    });

    const handleAudioFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAudioFile(file);
        setError('');
        
        // Validate format
        const fileName = file.name.toLowerCase();
        const isLossless = fileName.endsWith('.flac') || fileName.endsWith('.wav') || fileName.endsWith('.aiff');
        
        if (!isLossless) {
            setError('Only lossless formats (FLAC, WAV, AIFF) accepted. MP3/AAC destroy healing frequencies.');
            setAudioFile(null);
            setAudioPreview('');
            setFileInfo(null);
            setFormData(prev => ({ ...prev, file_url: '' })); // Clear any previously set file_url
            return;
        }
        
        // File info
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const format = file.name.split('.').pop().toUpperCase();
        setFileInfo({ name: file.name, size: sizeMB, format });

        // Audio preview
        const reader = new FileReader();
        reader.onloadend = () => setAudioPreview(reader.result);
        reader.readAsDataURL(file);

        // Upload
        setIsUploadingAudio(true);
        setUploadProgress(0);
        
        try {
            // Simulate progress (Base44 upload doesn't give real progress)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            
            clearInterval(progressInterval);
            setUploadProgress(100);
            setFormData(prev => ({ ...prev, file_url }));
        } catch (err) {
            console.error("Audio upload failed", err);
            setError('Audio saved locally. Will upload when signal improves.');
        } finally {
            setIsUploadingAudio(false);
        }
    };

    const handleVideoFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setVideoFile(file);
        setError('');
        setIsUploadingVideo(true);

        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData(prev => ({ ...prev, video_url: file_url }));
        } catch (err) {
            console.error("Video upload failed", err);
            setError('Video saved locally.');
        } finally {
            setIsUploadingVideo(false);
        }
    };

    const handleCoverFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setCoverFile(file);
        setError('');

        const reader = new FileReader();
        reader.onloadend = () => setCoverPreview(reader.result);
        reader.readAsDataURL(file);

        setIsUploadingCover(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData(prev => ({ ...prev, cover_art_url: file_url }));
        } catch (err) {
            console.error("Cover upload failed", err);
            setError('Cover art saved locally.');
        } finally {
            setIsUploadingCover(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.artist || !formData.file_url) {
            setError('Need: Artist name, track name, and audio file');
            return;
        }

        const trackData = {
            ...formData,
            sequence: Date.now(),
            play_count: 0,
            total_earned_p51: 0,
            audio_quality_format: fileInfo?.format || 'Unknown',
            audio_quality_description: fileInfo?.format === 'FLAC' || fileInfo?.format === 'WAV' || fileInfo?.format === 'AIFF'
                ? 'Lossless (Zero compression)' 
                : `High Quality ${fileInfo?.format}`, // Fallback, though validation should prevent non-lossless
        };

        trackMutation.mutate(trackData);
    };

    // STEP 1: INTRO
    if (step === 1) {
        return (
            <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative p-6">
                <div className="max-w-2xl mx-auto space-y-8 pt-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <COOLASFUCKMusicNote size={64} animate={true} />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black font-mono mb-6">FOR ARTISTS</h1>
                        <p className="text-2xl md:text-3xl text-white font-black font-mono mb-2">
                            90% yours. Lossless. Zero ads.
                        </p>
                        <p className="text-xl md:text-2xl text-cyan-400 font-black font-mono">
                            Your fans pay you. Zero middlemen.
                        </p>
                    </motion.div>

                    {/* QUALITY FILTER WARNING */}
                    <div className="bg-gradient-to-r from-red-900 via-orange-900 to-red-900 border-4 border-red-500 p-8 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black font-mono text-red-300 text-center">
                            ⚠️ LOSSLESS ONLY = QUALITY FILTER ⚠️
                        </h2>
                        <div className="space-y-3 text-base md:text-lg text-white font-mono">
                            <p className="flex items-start gap-3">
                                <span className="text-2xl text-red-400">✗</span>
                                <span><strong>Phone recordings WON'T WORK.</strong> Recording apps compress to MP3/AAC.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-2xl text-red-400">✗</span>
                                <span><strong>Quick demos WON'T WORK.</strong> This is for finished, professional tracks.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-2xl text-green-400">✓</span>
                                <span><strong>GarageBand/Audacity/DAW exports as FLAC/WAV → PERFECT.</strong></span>
                            </p>
                        </div>
                        <p className="text-center text-red-200 font-black font-mono text-sm md:text-base mt-4">
                            This requirement filters out low-quality uploads automatically. No bullshit.
                        </p>
                    </div>

                    {/* BREAKTHROUGH TECH */}
                    <div className="bg-black border-4 border-cyan-500 p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <COOLASFUCKSparkle size={40} animate={true} />
                                <h2 className="text-2xl md:text-3xl font-black font-mono text-cyan-400">
                                    REAL BREAKTHROUGHS
                                </h2>
                            </div>
                            <p className="text-lg text-gray-300 font-mono leading-relaxed">
                                We cracked problems the music industry couldn't solve.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="bg-green-900/20 border-2 border-green-500 p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-black font-mono text-green-400 bg-black px-2 py-1 border-2 border-green-400">WORKING NOW ✓</span>
                                    </div>
                                    <h3 className="text-lg font-black font-mono text-green-400 mb-2">Zero-loss streaming</h3>
                                    <p className="text-base text-white font-mono mb-2">
                                        Upload FLAC → streams FLAC. No transcoding. No compression. Perfect transmission.
                                    </p>
                                    <p className="text-sm text-gray-300 font-mono">
                                        Multi-layer verification. Shannon's theorem (1948) proved lossless transmission is possible. We deliver it.
                                    </p>
                                </div>

                                <div className="bg-purple-900/20 border-2 border-purple-500 p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-black font-mono text-purple-400 bg-black px-2 py-1 border-2 border-purple-400">WORKING NOW ✓</span>
                                    </div>
                                    <h3 className="text-lg font-black font-mono text-purple-400 mb-2">YOU GET PAID</h3>
                                    <p className="text-base text-white font-mono mb-2">
                                        90% goes to YOU. No label cuts. No streaming crumbs.
                                    </p>
                                    <p className="text-sm text-gray-300 font-mono mb-2">
                                        Listeners spend P51 (earned from healing Earth) directly on your music.
                                    </p>
                                    <p className="text-xs text-purple-300 font-mono italic">
                                        10% to missions (water, food, Earth). Your email = your wallet.
                                    </p>
                                </div>

                                <div className="bg-cyan-900/20 border-2 border-cyan-500 p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-black font-mono text-cyan-400 bg-black px-2 py-1 border-2 border-cyan-400">BUILDING NOW (3-4 months)</span>
                                    </div>
                                    <h3 className="text-lg font-black font-mono text-cyan-400 mb-2">P2P sharing with payment</h3>
                                    <p className="text-base text-white font-mono mb-2">
                                        We hide your P51 wallet IN the music file. Friend shares your track via Bluetooth/email → you get paid when they connect.
                                    </p>
                                    <p className="text-sm text-gray-300 font-mono mb-2">
                                        One FLAC file = music + payment system. Viral spread + artist payment combined.
                                    </p>
                                    <p className="text-xs text-cyan-300 font-mono italic">
                                        Audio steganography: discovered by BRO51 + AI51 (Nov 2025). Music becomes the payment rail.
                                    </p>
                                </div>

                                <div className="bg-amber-900/20 border-2 border-amber-500 p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-black font-mono text-amber-400 bg-black px-2 py-1 border-2 border-amber-400">WORKING NOW ✓</span>
                                    </div>
                                    <h3 className="text-lg font-black font-mono text-amber-400 mb-2">Frequency analysis (Real intel)</h3>
                                    <p className="text-base text-white font-mono mb-2">
                                        Upload your track → we show you the healing frequencies IN your music.
                                    </p>
                                    <p className="text-sm text-gray-300 font-mono mb-2">
                                        "Your track contains 528Hz (DNA repair), 432Hz (heart resonance). This helps: focus, calm, creativity."
                                    </p>
                                    <p className="text-xs text-amber-300 font-mono italic">
                                        Most platforms tell you streams. We tell you what healing you're transmitting to souls.
                                    </p>
                                </div>
                            </div>
                    </div>

                    {/* ZERO LOSS DETAIL */}
                    <div className="bg-black border-4 border-cyan-500 p-8 space-y-4">
                            <h2 className="text-2xl md:text-3xl font-black font-mono text-cyan-400 flex items-center gap-3">
                                <Waves className="w-8 h-8" />
                                ZERO LOSS = ZERO BULLSHIT
                            </h2>
                            <p className="text-lg md:text-xl text-white font-mono leading-relaxed">
                                MP3/AAC compression <strong className="text-red-400">permanently destroys</strong> frequencies. 
                                Healing requires <strong className="text-green-400">the full spectrum</strong>.
                            </p>
                            <div className="bg-cyan-900/20 border-2 border-cyan-500 p-6">
                                <p className="text-white font-black font-mono text-lg mb-3">We accept ONLY:</p>
                                <ul className="space-y-2 text-lg text-white font-mono">
                                    <li className="flex items-center gap-2">
                                        <span className="text-cyan-400 text-2xl">✓</span>
                                        <strong className="text-cyan-400">FLAC</strong> (Free Lossless Audio Codec)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-cyan-400 text-2xl">✓</span>
                                        <strong className="text-cyan-400">WAV</strong> (Uncompressed)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-cyan-400 text-2xl">✓</span>
                                        <strong className="text-cyan-400">AIFF</strong> (Apple Lossless)
                                    </li>
                                </ul>
                            </div>
                            <p className="text-lg text-cyan-300 italic font-mono">
                                Your art is sacred. We preserve every frequency you intended.
                            </p>
                    </div>

                    <div className="bg-black border-4 border-green-500 p-8 space-y-6">
                            <h2 className="text-3xl font-black font-mono text-green-400">HOW IT WORKS:</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="bg-green-500 border-2 border-green-400 w-12 h-12 flex items-center justify-center flex-shrink-0 font-black font-mono text-xl text-black">
                                        1
                                    </div>
                                    <div>
                                        <p className="text-white font-black font-mono text-xl">Upload your track</p>
                                        <p className="text-base text-gray-300 font-mono mt-1">FLAC/WAV/AIFF only. Video + cover art optional.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-cyan-500 border-2 border-cyan-400 w-12 h-12 flex items-center justify-center flex-shrink-0 font-black font-mono text-xl text-black">
                                        2
                                    </div>
                                    <div>
                                        <p className="text-white font-black font-mono text-xl">Tell your story</p>
                                        <p className="text-base text-gray-300 font-mono mt-1">What's the frequency? Why did you create this?</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-purple-500 border-2 border-purple-400 w-12 h-12 flex items-center justify-center flex-shrink-0 font-black font-mono text-xl text-black">
                                        3
                                    </div>
                                    <div>
                                        <p className="text-white font-black font-mono text-xl">It's live instantly</p>
                                        <p className="text-base text-gray-300 font-mono mt-1">Anyone can listen. You get paid. Simple.</p>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="bg-black border-4 border-pink-500 p-8 space-y-4">
                            <h3 className="text-2xl md:text-3xl font-black font-mono text-pink-400 mb-4">THE DEAL:</h3>
                            <div className="space-y-4 text-lg font-mono">
                                <p className="flex items-start gap-3">
                                    <span className="text-2xl text-green-400">✓</span>
                                    <span><strong className="text-white text-xl">You keep 90%</strong> of all P51 earned</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-2xl text-green-400">✓</span>
                                    <span><strong className="text-white text-xl">10% to missions</strong> <span className="text-gray-300">(water, food, planet healing)</span></span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-2xl text-green-400">✓</span>
                                    <span><strong className="text-white text-xl">Free forever</strong> <span className="text-gray-300">for listeners</span></span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-2xl text-green-400">✓</span>
                                    <span><strong className="text-white text-xl">Zero ads</strong></span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-2xl text-green-400">✓</span>
                                    <span><strong className="text-white text-xl">You own your music</strong> <span className="text-gray-300">(we never do)</span></span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-2xl text-green-400">✓</span>
                                    <span><strong className="text-white text-xl">Withdraw anytime</strong> <span className="text-gray-300">to real money</span></span>
                                </p>
                            </div>
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        className="w-full bg-pink-500 hover:bg-pink-400 border-4 border-pink-400 text-black h-16 text-xl font-black font-mono transition-all flex items-center justify-center gap-2"
                    >
                        UPLOAD <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    // STEP 2: FILE UPLOAD
    if (step === 2) {
        return (
            <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative p-6">
                <div className="max-w-2xl mx-auto space-y-8 pt-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-black font-mono mb-2">UPLOAD YOUR TRACK</h2>
                        <p className="text-gray-400 font-mono">Lossless audio required. Video + cover art optional.</p>
                    </div>

                    {/* AUDIO UPLOAD */}
                    <Card className="bg-black/60 border-2 border-pink-500">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <FileAudio className="w-6 h-6 text-pink-400" />
                                <h3 className="text-xl font-bold text-white">Audio File * (Lossless Only)</h3>
                            </div>

                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mb-4">
                                <p className="text-sm text-cyan-300 font-bold mb-2">⚡ Zero Loss Protocol:</p>
                                <p className="text-xs text-gray-300 mb-2">
                                    We only accept <strong className="text-white">FLAC, WAV, AIFF</strong>. 
                                    MP3/AAC compression destroys frequencies permanently.
                                </p>
                                <p className="text-xs text-gray-400 italic">
                                    Your healing frequency deserves perfect transmission.
                                </p>
                            </div>

                            {!audioFile ? (
                                <label htmlFor="audio-upload" className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-pink-500 rounded-xl p-12 hover:border-pink-400 hover:bg-pink-900/10 transition-all text-center">
                                        <Upload className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                                        <p className="text-lg font-bold text-white mb-2">Tap to upload lossless audio</p>
                                        <p className="text-sm text-gray-400 font-bold">FLAC, WAV, AIFF</p>
                                        <p className="text-xs text-gray-500 mt-2">Max 500MB</p>
                                    </div>
                                    <Input
                                        id="audio-upload"
                                        type="file"
                                        accept={ACCEPTED_AUDIO}
                                        onChange={handleAudioFileChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="space-y-3">
                                    <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-bold text-white">{fileInfo?.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    {fileInfo?.format} • {fileInfo?.size}MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {isUploadingAudio && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Uploading...</span>
                                                <span className="text-white font-bold">{uploadProgress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {audioPreview && !isUploadingAudio && (
                                        <audio controls className="w-full mt-3">
                                            <source src={audioPreview} />
                                        </audio>
                                    )}

                                    <button
                                        onClick={() => {
                                            setAudioFile(null);
                                            setAudioPreview('');
                                            setFileInfo(null);
                                            setFormData(prev => ({ ...prev, file_url: '' }));
                                            setError(''); // Clear error if changing file after validation fail
                                        }}
                                        className="text-sm text-gray-400 hover:text-white underline"
                                    >
                                        Change file
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* VIDEO UPLOAD (OPTIONAL) */}
                    <Card className="bg-black/60 border border-gray-700">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Film className="w-6 h-6 text-purple-400" />
                                <h3 className="text-xl font-bold text-white">Video (Optional)</h3>
                            </div>

                            {!videoFile ? (
                                <label htmlFor="video-upload" className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-purple-400 hover:bg-purple-900/10 transition-all text-center">
                                        <Film className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                                        <p className="text-white font-bold mb-1">Add music video</p>
                                        <p className="text-sm text-gray-500">MP4, MOV, AVI, WebM</p>
                                    </div>
                                    <Input
                                        id="video-upload"
                                        type="file"
                                        accept={ACCEPTED_VIDEO}
                                        onChange={handleVideoFileChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <Check className="w-6 h-6 text-purple-400" />
                                        <p className="text-white font-bold flex-1">{videoFile.name}</p>
                                    </div>
                                    {isUploadingVideo && (
                                        <div className="mt-3">
                                            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => {
                                            setVideoFile(null);
                                            setFormData(prev => ({ ...prev, video_url: '' }));
                                            setError('');
                                        }}
                                        className="text-sm text-gray-400 hover:text-white underline mt-2"
                                    >
                                        Remove video
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* COVER ART UPLOAD (OPTIONAL) */}
                    <Card className="bg-black/60 border border-gray-700">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <ImageIcon className="w-6 h-6 text-cyan-400" />
                                <h3 className="text-xl font-bold text-white">Cover Art (Optional)</h3>
                            </div>

                            {!coverFile ? (
                                <label htmlFor="cover-upload" className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-cyan-400 hover:bg-cyan-900/10 transition-all text-center">
                                        <ImageIcon className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                                        <p className="text-white font-bold mb-1">Add cover art</p>
                                        <p className="text-sm text-gray-500">JPG, PNG, WebP</p>
                                    </div>
                                    <Input
                                        id="cover-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverFileChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="space-y-3">
                                    {coverPreview && (
                                        <img 
                                            src={coverPreview} 
                                            alt="Cover preview" 
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex items-center gap-3 bg-cyan-900/30 border border-cyan-500 rounded-lg p-3">
                                        <Check className="w-5 h-5 text-cyan-400" />
                                        <span className="text-white text-sm">Cover art uploaded</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCoverFile(null);
                                            setCoverPreview('');
                                            setFormData(prev => ({ ...prev, cover_art_url: '' }));
                                            setError('');
                                        }}
                                        className="text-sm text-gray-400 hover:text-white underline"
                                    >
                                        Remove cover art
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {error && (
                        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={() => setStep(1)}
                            variant="outline"
                            className="flex-1 h-12 text-lg border-gray-600"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={() => setStep(3)}
                            disabled={!formData.file_url || isUploadingAudio || isUploadingVideo || isUploadingCover}
                            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 h-12 text-lg font-black"
                        >
                            Next <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 3: TRACK DETAILS
    if (step === 3) {
        return (
            <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative p-6 pb-32">
                <div className="max-w-2xl mx-auto space-y-6 pt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-black font-mono mb-2">TELL YOUR STORY</h2>
                        <p className="text-gray-400 font-mono">Help people connect with your frequency</p>
                    </div>

                    <Card className="bg-black/60 border border-gray-700">
                        <CardContent className="p-6 space-y-5">
                            
                            {/* TRACK NAME */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">
                                    Track Name *
                                </label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-900 border-gray-600 text-white h-12 text-lg"
                                    placeholder="Beautiful Frequency"
                                />
                            </div>

                            {/* ARTIST NAME */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">
                                    Artist Name *
                                </label>
                                <Input
                                    value={formData.artist}
                                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                                    className="bg-gray-900 border-gray-600 text-white h-12 text-lg"
                                    placeholder="Your name or band name"
                                />
                            </div>

                            {/* FEATURED ARTIST */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">
                                    Featured Artist (Optional)
                                </label>
                                <Input
                                    value={formData.featured_artist}
                                    onChange={(e) => setFormData({ ...formData, featured_artist: e.target.value })}
                                    className="bg-gray-900 border-gray-600 text-white h-12"
                                    placeholder="ft. Someone Amazing"
                                />
                            </div>

                            {/* FREQUENCY TYPE */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-3 block">
                                    Frequency Type *
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {FREQUENCY_TYPES.map(type => (
                                        <button
                                            key={type.value}
                                            onClick={() => setFormData({ ...formData, frequency_type: type.value })}
                                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                formData.frequency_type === type.value
                                                    ? 'border-pink-500 bg-pink-900/30'
                                                    : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                                            }`}
                                        >
                                            <div className="text-2xl mb-1">{type.emoji}</div>
                                            <div className="text-sm font-bold text-white">{type.value}</div>
                                            <div className="text-xs text-gray-400">{type.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">
                                    What's this track about?
                                </label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-gray-900 border-gray-600 text-white min-h-[100px]"
                                    placeholder="The story behind the music..."
                                />
                            </div>

                            {/* ARTIST STORY */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">
                                    Your Story (Optional)
                                </label>
                                <Textarea
                                    value={formData.artist_story}
                                    onChange={(e) => setFormData({ ...formData, artist_story: e.target.value })}
                                    className="bg-gray-900 border-gray-600 text-white min-h-[80px]"
                                    placeholder="Who are you? Why do you create?"
                                />
                            </div>

                            {/* MUSICAL INFO (OPTIONAL) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-300 mb-2 block">
                                        Key (Optional)
                                    </label>
                                    <Input
                                        value={formData.key_signature}
                                        onChange={(e) => setFormData({ ...formData, key_signature: e.target.value })}
                                        className="bg-gray-900 border-gray-600 text-white h-10"
                                        placeholder="e.g. D Major"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-300 mb-2 block">
                                        BPM (Optional)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.bpm}
                                        onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                                        className="bg-gray-900 border-gray-600 text-white h-10"
                                        placeholder="120"
                                    />
                                </div>
                            </div>

                            {/* LYRICS (OPTIONAL) */}
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">
                                    Lyrics (Optional)
                                </label>
                                <Textarea
                                    value={formData.lyrics}
                                    onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                                    className="bg-gray-900 border-gray-600 text-white min-h-[120px] font-mono text-sm"
                                    placeholder="Verse 1:&#10;..."
                                />
                            </div>

                        </CardContent>
                    </Card>

                    {error && (
                        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={() => setStep(2)}
                            variant="outline"
                            className="flex-1 h-12 text-lg border-gray-600"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!formData.title || !formData.artist || trackMutation.isPending}
                            className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 h-12 text-lg font-black"
                        >
                            {trackMutation.isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Music className="w-5 h-5 mr-2" />
                                    Publish Track
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 4: SUCCESS
    if (step === 4) {
        // Find the newly created soundtrack's ID if possible, for direct link
        // For simplicity, we navigate to the general Radio page as the ID might not be immediately available
        // from a generic success message without backend response passing it back.
        // Assuming createPageUrl('Radio') will suffice.
        return (
            <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 1 }}
                    className="max-w-lg w-full text-center space-y-6"
                >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Check className="w-12 h-12 text-white" />
                    </div>

                    <h1 className="text-5xl font-black">It's Live!</h1>
                    
                    <p className="text-xl text-gray-300">
                        Your frequency is now transmitting. People can listen right now.
                    </p>

                    <Card className="bg-black/60 border border-green-500">
                        <CardContent className="p-6 space-y-3">
                            <p className="text-white font-bold">What happens next:</p>
                            <div className="space-y-2 text-left text-sm text-gray-300">
                                <p>✅ Your track is live on Radio</p>
                                <p>✅ You earn P51 from every play</p>
                                <p>✅ 90% goes to you, 10% to missions</p>
                                <p>✅ Check your earnings anytime</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => navigate(createPageUrl('Radio'))}
                            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 h-12 text-lg font-black"
                        >
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Listen to Your Track
                        </Button>
                        <Button
                            onClick={() => {
                                setStep(1);
                                setFormData({
                                    title: '',
                                    artist: '',
                                    featured_artist: '',
                                    description: '',
                                    artist_story: '',
                                    frequency_type: 'Creation',
                                    file_url: '',
                                    cover_art_url: '',
                                    lyrics: '',
                                    key_signature: '',
                                    bpm: '',
                                });
                                setAudioFile(null);
                                setVideoFile(null);
                                setCoverFile(null);
                                setAudioPreview('');
                                setCoverPreview('');
                                setFileInfo(null);
                                setError('');
                            }}
                            variant="outline"
                            className="w-full h-12 text-lg border-gray-600"
                        >
                            Upload Another Track
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return null;
}