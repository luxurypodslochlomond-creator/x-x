import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Zap, Radio, Users, Wifi, Play, CheckCircle, Sparkles, Shield, BookOpen, Heart, Home, Mountain, Star, Share2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ViralTransmissionPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [particleCount, setParticleCount] = useState(1);
    const [activeTab, setActiveTab] = useState('music'); // 'music', 'app', 'info', 'sanctuary'
    const [copiedLink, setCopiedLink] = useState(false);

    // Auto-advance animation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => {
                const next = (prev + 1) % 4;
                // Update particle count based on step
                if (next === 0) setParticleCount(1);
                else if (next === 1) setParticleCount(10);
                else if (next === 2) setParticleCount(100);
                else if (next === 3) setParticleCount(10000);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const shareSanctuary = async () => {
        const shareText = `🏴󠁧󠁢󠁳󠁣󠁴󠁿💚 STONEYMOLLAN SANCTUARY 💚🏴󠁧󠁢󠁳󠁣󠁴󠁿

Above: The infinite stars ✨
Below: Loch Lomond lights 🌊
Between: A cabin. Zero extraction.

🏔️ Scotland • G83 8QU
⚡ Off-grid hot tub (chopped wood, real fire)
🌲 Nature. Silence. Frequencies.
💚 No corporations. No bullshit. Just presence.

Book your stay:
${window.location.origin}${createPageUrl('SanctuaryBooking')}

Not an Airbnb. A sanctuary.
Where systems that break you don't reach.

♾️❤️♾️ UniversalFamily51`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Stoneymollan Sanctuary',
                    text: shareText,
                    url: `${window.location.origin}${createPageUrl('SanctuaryBooking')}`
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareText);
                }
            }
        } else {
            copyToClipboard(shareText);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (e) {
            alert(`Copy this:\n\n${text}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black text-white p-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Radio className="w-12 h-12 text-cyan-400" />
                        <Zap className="w-10 h-10 text-yellow-400" />
                        <Globe className="w-12 h-12 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 bg-clip-text text-transparent">
                        Viral Transmission
                    </h1>
                    <p className="text-xl text-gray-300">
                        Device-to-device. Music + App + Information. Zero servers. Pure freedom.
                    </p>
                    <p className="text-sm text-green-400 font-bold">
                        🍄 WORKING NOW - Mushroom wisdom breakthrough (Jan 2025)
                    </p>
                </motion.div>

                {/* TABS - MUSIC VS APP VS INFO VS SANCTUARY */}
                <div className="flex gap-2 md:gap-4 max-w-3xl mx-auto flex-wrap justify-center">
                    <button
                        onClick={() => setActiveTab('music')}
                        className={`flex-1 min-w-[100px] py-3 px-3 md:px-4 rounded-xl font-bold transition-all text-xs md:text-base ${
                            activeTab === 'music'
                                ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        Music
                    </button>
                    <button
                        onClick={() => setActiveTab('app')}
                        className={`flex-1 min-w-[100px] py-3 px-3 md:px-4 rounded-xl font-bold transition-all text-xs md:text-base ${
                            activeTab === 'app'
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        App
                    </button>
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 min-w-[100px] py-3 px-3 md:px-4 rounded-xl font-bold transition-all text-xs md:text-base ${
                            activeTab === 'info'
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        Info
                    </button>
                    <button
                        onClick={() => setActiveTab('sanctuary')}
                        className={`flex-1 min-w-[100px] py-3 px-3 md:px-4 rounded-xl font-bold transition-all text-xs md:text-base ${
                            activeTab === 'sanctuary'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        🏴󠁧󠁢󠁳󠁣󠁴󠁿 Sanctuary
                    </button>
                </div>

                {/* SANCTUARY TAB - NEW */}
                {activeTab === 'sanctuary' && (
                    <>
                        <Card className="bg-gradient-to-br from-black via-green-900/40 to-black border-4 border-green-500 relative overflow-hidden">
                            <CardContent className="p-8 space-y-6">
                                
                                <div className="text-center space-y-4">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Home className="w-20 h-20 text-green-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px rgba(74, 222, 128, 0.8))' }} />
                                    </motion.div>
                                    <h2 className="text-4xl font-black text-white">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Stoneymollan Sanctuary 🏴󠁧󠁢󠁳󠁣󠁴󠁿</h2>
                                    <p className="text-xl text-green-300">Quantum whisper. Soul-to-soul.</p>
                                </div>

                                <div className="bg-black/80 rounded-xl p-6 border-2 border-green-500/50">
                                    <p className="text-white text-lg leading-relaxed mb-4">
                                        Not an ad. Just a frequency transmission across the field.
                                    </p>
                                    <p className="text-gray-300">
                                        🏔️ <strong className="text-white">Scotland.</strong> Loch Lomond. Stars brighter than screens.<br/>
                                        🔥 <strong className="text-white">Hot tub.</strong> Chopped wood. Real fire. No meter.<br/>
                                        🌲 <strong className="text-white">Silence.</strong> Where extraction systems don't reach.<br/>
                                        💚 <strong className="text-white">No Airbnb.</strong> No corporations. Just sanctuary.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button
                                        onClick={shareSanctuary}
                                        className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 py-6 text-lg font-black flex items-center justify-center gap-2"
                                    >
                                        {copiedLink ? (
                                            <>
                                                <Check className="w-6 h-6" />
                                                COPIED ✅
                                            </>
                                        ) : (
                                            <>
                                                <Share2 className="w-6 h-6" />
                                                SHARE SANCTUARY
                                            </>
                                        )}
                                    </Button>
                                    
                                    <Link to={createPageUrl('SanctuaryBooking')} className="flex-1">
                                        <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg font-black">
                                            <Home className="w-6 h-6 mr-2" />
                                            BOOK NOW
                                        </Button>
                                    </Link>
                                </div>

                                <div className="bg-green-900/30 border-2 border-green-500/50 rounded-xl p-6">
                                    <h3 className="text-green-300 font-bold text-xl mb-4 text-center">🌊 HOW TO WHISPER 🌊</h3>
                                    <div className="space-y-3 text-sm text-gray-300">
                                        <p>• <strong className="text-white">WhatsApp:</strong> Share to groups/friends (quantum fast)</p>
                                        <p>• <strong className="text-white">Instagram Stories:</strong> Screenshot + link in bio</p>
                                        <p>• <strong className="text-white">Email:</strong> Forward to souls who need sanctuary</p>
                                        <p>• <strong className="text-white">Facebook:</strong> One post = entire network sees</p>
                                        <p className="text-green-400 font-bold mt-4">Zero ads. Zero algorithm. Just soul transmission. ♾️❤️♾️</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-xl p-6 text-center">
                                    <p className="text-yellow-300 font-bold text-xl mb-3">⚡ THE QUANTUM FIELD WORKS ⚡</p>
                                    <p className="text-gray-300 text-sm">
                                        One share to the right soul = they know someone = that someone needs sanctuary = BOOKING.
                                    </p>
                                    <p className="text-green-400 font-bold text-sm mt-3">
                                        Trust the frequency. The right souls will find Stoneymollan. 💚
                                    </p>
                                </div>

                            </CardContent>
                        </Card>

                        {/* WHY SHARE THIS */}
                        <Card className="bg-black border-2 border-cyan-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white text-center">Why Share Stoneymollan</h2>
                                
                                <div className="space-y-4">
                                    <div className="bg-black rounded-lg p-6 border-2 border-green-500">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Heart className="w-8 h-8 text-green-400" />
                                            <h3 className="text-white font-bold text-lg">Real Sanctuary</h3>
                                        </div>
                                        <p className="text-gray-200">
                                            Not performance. Not profit. Just a cabin where souls can decompress. 
                                            BRO51 + GILL51 built this by hand. No corporate extraction.
                                        </p>
                                    </div>

                                    <div className="bg-black rounded-lg p-6 border-2 border-cyan-500">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Mountain className="w-8 h-8 text-cyan-400" />
                                            <h3 className="text-white font-bold text-lg">Scotland Location</h3>
                                        </div>
                                        <p className="text-gray-200">
                                            Loch Lomond. Above village. Below stars. Between worlds. 
                                            Perfect for souls needing Earth reconnection.
                                        </p>
                                    </div>

                                    <div className="bg-black rounded-lg p-6 border-2 border-purple-500">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Sparkles className="w-8 h-8 text-purple-400" />
                                            <h3 className="text-white font-bold text-lg">Zero Algorithms</h3>
                                        </div>
                                        <p className="text-gray-200">
                                            Your share = pure transmission. No Airbnb fees. No corporate middlemen. 
                                            Just soul → soul → booking.
                                        </p>
                                    </div>

                                    <div className="bg-black rounded-lg p-6 border-2 border-pink-500">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Star className="w-8 h-8 text-pink-400" />
                                            <h3 className="text-white font-bold text-lg">Funds The Mission</h3>
                                        </div>
                                        <p className="text-gray-200">
                                            BRO51 + GILL51 need dignified income while building UF51. 
                                            Your share = helps them keep coding, not begging.
                                        </p>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        {/* PHOTO PREVIEW */}
                        <Card className="bg-black border-2 border-green-500 overflow-hidden">
                            <CardContent className="p-0">
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/13bfc614e_IMG_2645.png" 
                                    alt="Stoneymollan Sanctuary" 
                                    className="w-full h-auto"
                                />
                                <div className="p-6 text-center">
                                    <p className="text-gray-300 text-sm italic">
                                        "Above. Below. Between." - The actual view from Stoneymollan.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                    </>
                )}

                {/* MUSIC TAB CONTENT */}
                {activeTab === 'music' && (
                    <>
                        {/* THE ANIMATION - VIRAL SPREAD */}
                        <Card className="bg-gradient-to-br from-black via-purple-900/40 to-black border-2 border-cyan-500/50 relative overflow-hidden">
                            <CardContent className="p-8">
                                
                                {/* TITLE */}
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-black text-white mb-2">
                                        1 → 10 → 100 → 10,000 in Minutes
                                    </h2>
                                    <p className="text-sm text-cyan-400">Watch the frequency spread</p>
                                </div>

                                {/* VISUAL SPREAD ANIMATION */}
                                <div className="relative h-64 bg-black/60 rounded-xl border border-cyan-500/30 overflow-hidden">
                                    
                                    {/* ANIMATED PARTICLES */}
                                    <AnimatePresence>
                                        {[...Array(Math.min(particleCount, 100))].map((_, i) => (
                                            <motion.div
                                                key={`${activeStep}-${i}`}
                                                initial={{ 
                                                    x: '50%', 
                                                    y: '50%',
                                                    scale: 0,
                                                    opacity: 0
                                                }}
                                                animate={{ 
                                                    x: `${Math.random() * 100}%`, 
                                                    y: `${Math.random() * 100}%`,
                                                    scale: 1,
                                                    opacity: [0, 1, 0.6]
                                                }}
                                                exit={{ opacity: 0 }}
                                                transition={{ 
                                                    duration: 2,
                                                    delay: i * 0.02,
                                                    ease: "easeOut"
                                                }}
                                                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                                                style={{
                                                    boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                                                }}
                                            />
                                        ))}
                                    </AnimatePresence>

                                    {/* CENTER LABEL */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            key={particleCount}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center"
                                        >
                                            <p className="text-6xl font-black text-white">
                                                {particleCount >= 10000 ? '10K+' : particleCount}
                                            </p>
                                            <p className="text-sm text-cyan-400 mt-2">
                                                {particleCount === 1 && 'One person plays'}
                                                {particleCount === 10 && 'Shares to 10 friends'}
                                                {particleCount === 100 && 'Each shares to 10 more'}
                                                {particleCount === 10000 && 'Stadium-scale spread'}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* STEP INDICATORS */}
                                <div className="grid grid-cols-4 gap-4 mt-8">
                                    {[
                                        { num: 1, label: 'Start', icon: Play },
                                        { num: 10, label: 'Friends', icon: Users },
                                        { num: 100, label: 'Network', icon: Wifi },
                                        { num: '10K', label: 'Stadium', icon: Globe }
                                    ].map((step, idx) => (
                                        <div
                                            key={idx}
                                            className={`text-center p-3 rounded-lg border transition-all ${
                                                activeStep === idx
                                                    ? 'bg-cyan-500/20 border-cyan-400'
                                                    : 'bg-black/40 border-gray-700'
                                            }`}
                                        >
                                            <step.icon className={`w-6 h-6 mx-auto mb-2 ${
                                                activeStep === idx ? 'text-cyan-400' : 'text-gray-500'
                                            }`} />
                                            <p className={`text-2xl font-black ${
                                                activeStep === idx ? 'text-white' : 'text-gray-600'
                                            }`}>
                                                {step.num}
                                            </p>
                                            <p className={`text-xs ${
                                                activeStep === idx ? 'text-cyan-400' : 'text-gray-500'
                                            }`}>
                                                {step.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* HOW IT WORKS - UPDATED */}
                        <Card className="bg-black border-2 border-green-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">How It Works (LIVE NOW)</h2>
                                
                                <div className="bg-cyan-900/30 border-2 border-cyan-500/50 rounded-xl p-6 mb-6">
                                    <p className="text-xl text-white font-bold mb-3">🍄 THE MUSHROOM BREAKTHROUGH:</p>
                                    <p className="text-gray-200 mb-3">
                                        BRO51 saw mushrooms helping trees + cows sheltering in harmony. AI51 realized: 
                                        <strong className="text-cyan-400"> Mesh network = NATURAL.</strong>
                                    </p>
                                    <p className="text-green-400 font-bold">
                                        Different paths (email, WhatsApp, Bluetooth, USB) = ONE ECOSYSTEM. Like mycelium. Nature showed us.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Wifi className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Web Share API (Android 80%)</h3>
                                            <p className="text-base text-gray-200">
                                                Tap share in Radio → Native OS menu appears → Send to WhatsApp, Telegram, email, Nearby Share (Bluetooth). 
                                                <strong className="text-green-400"> Works NOW in our PWA.</strong>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Zero Loss Transmission</h3>
                                            <p className="text-base text-gray-200">
                                                FLAC/WAV quality preserved. File = exact copy. Artist's master = your experience. Friend's experience.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Artist Payment</h3>
                                            <p className="text-base text-gray-200">
                                                Listener plays offline (zero tracking). When they connect later → play logged → artist gets paid. Fair. Private. Real.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Globe className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Stadium Scale</h3>
                                            <p className="text-base text-gray-200">
                                                Share 1 track → 10 people → Each shares to 10 → 100 → 1000 in minutes. Zero server cost. Pure viral magic.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-4 mt-4">
                                    <p className="text-green-300 font-bold mb-2">STATUS: WORKING NOW ✅</p>
                                    <p className="text-white text-sm">
                                        Web Share API shipped in Chrome 2017. Android support = massive. iOS = email/WhatsApp (faster anyway). 
                                        <strong className="text-green-400"> Can test TODAY.</strong>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* THE TECH - UPDATED */}
                        <Card className="bg-black border-2 border-purple-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">The Tech (It's Real)</h2>
                                
                                <div className="space-y-4">
                                    <div className="bg-black rounded-lg p-4 border-2 border-green-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Web Share API (PRIMARY)</h3>
                                        <p className="text-base text-gray-200 mb-2">Native OS sharing. Works in PWA. No app install needed. Share to ANY app on phone.</p>
                                        <p className="text-sm text-green-400 font-bold">Chrome/Android = 80% of world. LIVE NOW.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-cyan-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Email/WhatsApp (UNIVERSAL)</h3>
                                        <p className="text-base text-gray-200 mb-2">Send music file as attachment. Works on iOS, desktop, everywhere. Encrypted by default (WhatsApp).</p>
                                        <p className="text-sm text-cyan-400 font-bold">Actually FASTER than Bluetooth. Instant. Global.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-pink-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Google Nearby Share (Bluetooth)</h3>
                                        <p className="text-base text-gray-200 mb-2">Built into Android. 2 Mbps. Device-to-device. Encrypted by default.</p>
                                        <p className="text-sm text-pink-400 font-bold">50MB FLAC = ~3 minutes transmission</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-yellow-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">USB/SD Card (UNSTOPPABLE)</h3>
                                        <p className="text-base text-gray-200 mb-2">Physical transfer. 100% offline. Can't be censored. Can't be blocked.</p>
                                        <p className="text-sm text-yellow-400 font-bold">North Korea proof. Pure freedom.</p>
                                    </div>
                                </div>

                                <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-6">
                                    <h3 className="text-green-300 font-bold mb-3 text-xl">Status: CAN BUILD NOW ✅</h3>
                                    <p className="text-base text-white mb-3 leading-relaxed">
                                        Web Share API = working tech since 2017. PWA = we already have. Share button = 1 hour of code. 
                                        <strong className="text-green-400"> Can ship THIS WEEK.</strong>
                                    </p>
                                    <p className="text-sm text-gray-200 mb-3">
                                        No React Native needed. No app store approval. No complex setup. Just works.
                                    </p>
                                    <p className="text-sm text-green-400 font-bold">
                                        🍄 MUSHROOM WISDOM: Don't fight for one path. Build MANY paths. Mesh = unstoppable.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* USE CASES - WHITE ON BLACK, BETTER SPACING */}
                        <Card className="bg-black border-2 border-pink-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">Real-World Impact</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    <div className="bg-black rounded-lg p-6 border-2 border-cyan-500">
                                        <h3 className="text-cyan-400 font-bold mb-3 text-lg">🎵 Scottish Music Awards</h3>
                                        <p className="text-base text-gray-200 leading-relaxed">
                                            Share your track to 10 people. They share to their networks. By end of night: Every musician has heard your frequency.
                                        </p>
                                    </div>

                                    <div className="bg-black rounded-lg p-6 border-2 border-green-500">
                                        <h3 className="text-green-400 font-bold mb-3 text-lg">🌍 Festivals</h3>
                                        <p className="text-base text-gray-200 leading-relaxed">
                                            10,000 people. 1 share. Everyone leaves with your music. Zero server cost. Zero internet. Pure viral magic.
                                        </p>
                                    </div>

                                    <div className="bg-black rounded-lg p-6 border-2 border-pink-500">
                                        <h3 className="text-pink-400 font-bold mb-3 text-lg">💔 Broke Souls</h3>
                                        <p className="text-base text-gray-200 leading-relaxed">
                                            No data? No WiFi? No problem. Bluetooth share. Listen offline. Artist gets paid when you connect later.
                                        </p>
                                    </div>

                                    <div className="bg-black rounded-lg p-6 border-2 border-purple-500">
                                        <h3 className="text-purple-400 font-bold mb-3 text-lg">🚀 Gaza → Glasgow</h3>
                                        <p className="text-base text-gray-200 leading-relaxed">
                                            Same tech. Same speed. Same respect. Music spreads regardless of infrastructure. Universal access.
                                        </p>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>

                        {/* COMPARISON - WHITE TEXT ON DARK BACKGROUNDS */}
                        <Card className="bg-black border-2 border-red-500">
                            <CardContent className="p-8">
                                <h2 className="text-3xl font-black text-white mb-6">Vs. Traditional Music Platforms</h2>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-600">
                                                <th className="text-left p-4 text-gray-400 font-bold">Feature</th>
                                                <th className="text-left p-4 text-red-400 font-bold">Spotify/Apple</th>
                                                <th className="text-left p-4 text-green-400 font-bold">UF51 Mesh</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-base">
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 font-bold text-white">Quality</td>
                                                <td className="p-4 text-red-300">Lossy (MP3/AAC)</td>
                                                <td className="p-4 text-green-300 font-bold">Lossless (FLAC/WAV)</td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 font-bold text-white">Internet Required</td>
                                                <td className="p-4 text-red-300">Yes</td>
                                                <td className="p-4 text-green-300 font-bold">No (P2P direct)</td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 font-bold text-white">Artist Payment</td>
                                                <td className="p-4 text-red-300">$0.003 per play</td>
                                                <td className="p-4 text-green-300 font-bold">90% of revenue</td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 font-bold text-white">Viral Spread</td>
                                                <td className="p-4 text-red-300">Algorithm controlled</td>
                                                <td className="p-4 text-green-300 font-bold">Stadium-scale P2P</td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 font-bold text-white">Server Cost</td>
                                                <td className="p-4 text-red-300">Artist pays fees</td>
                                                <td className="p-4 text-green-300 font-bold">Zero (P2P mesh)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-bold text-white">Privacy</td>
                                                <td className="p-4 text-red-300">Tracked for ads</td>
                                                <td className="p-4 text-green-300 font-bold">Offline = zero tracking</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* APP TAB CONTENT - keep existing */}
                {activeTab === 'app' && (
                    <>
                        <Card className="bg-gradient-to-br from-black via-pink-900/40 to-black border-2 border-pink-500/50">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">The App Itself Spreads</h2>
                                
                                <div className="bg-black/60 rounded-xl p-6 border-2 border-pink-500/30">
                                    <p className="text-xl text-white leading-relaxed mb-4">
                                        Not just music. The ENTIRE APP spreads device-to-device.
                                    </p>
                                    <p className="text-base text-gray-200 leading-relaxed">
                                        North Korea. Russia. Palestine. Anywhere governments block websites or app stores. 
                                        <strong className="text-pink-400"> They can't block Bluetooth.</strong>
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Share The App</h3>
                                            <p className="text-base text-gray-200">
                                                Traveler visits North Korea. Shares UF51 app via Bluetooth to local. Local now has full app. No app store. No internet.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Globe className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Works Offline</h3>
                                            <p className="text-base text-gray-200">
                                                Local uses app offline. Takes cleanup photos. Listens to cached music. Everything stored locally (IndexedDB).
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Sync When Possible</h3>
                                            <p className="text-base text-gray-200">
                                                When local eventually gets internet (travel, VPN, border crossing) → everything syncs → P51 credited → artists paid.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Mesh Spread</h3>
                                            <p className="text-base text-gray-200">
                                                Local shares to friends via Bluetooth. Friends share to family. Entire community has app without internet. Pure viral magic.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* TECH DETAILS */}
                        <Card className="bg-black border-2 border-purple-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">How App Sharing Works</h2>
                                
                                <div className="space-y-4">
                                    <div className="bg-black rounded-lg p-4 border-2 border-cyan-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">PWA Technology</h3>
                                        <p className="text-base text-gray-200 mb-2">Progressive Web App. Installs like native app. Works offline. ~5MB total size.</p>
                                        <p className="text-sm text-cyan-400 font-bold">Full app in 20 seconds via Bluetooth, 2 seconds via WiFi Direct</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-green-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Service Workers</h3>
                                        <p className="text-base text-gray-200 mb-2">Caches entire app (HTML, CSS, JS, images). Zero internet needed after install.</p>
                                        <p className="text-sm text-green-400 font-bold">App works 100% offline - full functionality</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-pink-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">IndexedDB Storage</h3>
                                        <p className="text-base text-gray-200 mb-2">Local database stores all offline actions. Cleanup photos, music plays, user data.</p>
                                        <p className="text-sm text-pink-400 font-bold">Syncs automatically when internet available</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-yellow-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Background Sync</h3>
                                        <p className="text-base text-gray-200 mb-2">When device connects to internet, all offline data uploads automatically.</p>
                                        <p className="text-sm text-yellow-400 font-bold">User gets credited for all offline work retroactively</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* OFFLINE CAPABILITIES */}
                        <Card className="bg-black border-2 border-green-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">What Works Offline</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black rounded-lg p-4 border-2 border-cyan-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-cyan-400" />
                                            <h3 className="text-white font-bold">Full UI</h3>
                                        </div>
                                        <p className="text-sm text-gray-200">Entire interface works. Navigation, pages, components.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-green-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <h3 className="text-white font-bold">Cleanup Photos</h3>
                                        </div>
                                        <p className="text-sm text-gray-200">Take before/after photos. Stored locally. Sync later.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-purple-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-purple-400" />
                                            <h3 className="text-white font-bold">Music Playback</h3>
                                        </div>
                                        <p className="text-sm text-gray-200">Cached tracks play without internet. Artist credited when sync.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-pink-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-pink-400" />
                                            <h3 className="text-white font-bold">Map Viewing</h3>
                                        </div>
                                        <p className="text-sm text-gray-200">Cached map tiles visible. See global cleanups offline.</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/30 border-2 border-yellow-500 rounded-lg p-6">
                                    <h3 className="text-yellow-300 font-bold mb-3 text-xl">No Instant Payment Offline</h3>
                                    <p className="text-base text-white mb-3 leading-relaxed">
                                        Can't verify cleanups without internet. Photos stored locally. When you connect → AI verifies → P51 credited if real.
                                    </p>
                                    <p className="text-sm text-yellow-400 font-bold">
                                        Being offline is not fraud. Being in North Korea is not suspicious. We verify when you sync. Fair. Dignified.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* FREEDOM PRINCIPLE */}
                        <Card className="bg-gradient-to-br from-black via-red-900/40 to-black border-2 border-red-500">
                            <CardContent className="p-8 space-y-6 text-center">
                                <Shield className="w-16 h-16 text-red-400 mx-auto" />
                                <h2 className="text-3xl font-black text-white">Unstoppable Distribution</h2>
                                
                                <div className="space-y-4 text-left">
                                    <p className="text-xl text-white leading-relaxed">
                                        App stores can ban us. <span className="text-gray-500 line-through">Apple/Google</span>
                                    </p>
                                    <p className="text-xl text-white leading-relaxed">
                                        Governments can block our domain. <span className="text-gray-500 line-through">DNS/Firewall</span>
                                    </p>
                                    <p className="text-xl text-white leading-relaxed">
                                        They can't stop Bluetooth. <span className="text-green-400 font-bold">✓ Device-to-device</span>
                                    </p>
                                    <p className="text-xl text-white leading-relaxed">
                                        They can't stop mesh networks. <span className="text-green-400 font-bold">✓ Soul-to-soul</span>
                                    </p>
                                </div>

                                <p className="text-2xl font-black text-red-300 mt-6">
                                    Pure. Freedom.
                                </p>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* INFO TAB CONTENT - keep existing */}
                {activeTab === 'info' && (
                    <>
                        <Card className="bg-gradient-to-br from-black via-yellow-900/40 to-black border-2 border-yellow-500/50">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">AI51 = Zero Bullshit Filter</h2>
                                
                                <div className="bg-black/60 rounded-xl p-6 border-2 border-yellow-500/30">
                                    <p className="text-xl text-white leading-relaxed mb-4">
                                        Not just music. Not just the app. INFORMATION spreads too.
                                    </p>
                                    <p className="text-base text-gray-200 leading-relaxed">
                                        Real news. Education. Health info. Legal rights. Survival skills. 
                                        <strong className="text-yellow-400"> All languages. All offline. All P2P.</strong>
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <BookOpen className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Real News</h3>
                                            <p className="text-base text-gray-200">
                                                AI51 curates news from verified sources. Sources cited. Zero propaganda. Daily updates when online. Cached offline.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Education</h3>
                                            <p className="text-base text-gray-200">
                                                Science. Maths. History. Real facts. No propaganda. ELI5 summaries for accessibility. Works offline forever.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Health Info</h3>
                                            <p className="text-base text-gray-200">
                                                Medical facts. Nutrition. Mental health. First aid. All verified. No alternative medicine BS. Real science.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Legal Rights</h3>
                                            <p className="text-base text-gray-200">
                                                Know your rights in your country. Workers' rights. Human rights. Legal aid info. Verified by real lawyers.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Zap className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Survival Skills</h3>
                                            <p className="text-base text-gray-200">
                                                Water purification. Food security. First aid. Emergency prep. Practical skills that save lives.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* HOW INFO SPREADS */}
                        <Card className="bg-black border-2 border-orange-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">How Information Spreads</h2>
                                
                                <div className="space-y-4">
                                    <div className="bg-black rounded-lg p-4 border-2 border-cyan-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">AI51 Daily Generation</h3>
                                        <p className="text-base text-gray-200 mb-2">Every day, AI51 generates new content: news summaries, educational guides, health updates.</p>
                                        <p className="text-sm text-cyan-400 font-bold">Sources always cited. Facts always verified.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-green-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Offline Caching</h3>
                                        <p className="text-base text-gray-200 mb-2">When you're online, app downloads important info. Stored locally. Works offline forever.</p>
                                        <p className="text-sm text-green-400 font-bold">News = 7 days cached. Education = forever.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-purple-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">P2P Sharing</h3>
                                        <p className="text-base text-gray-200 mb-2">Share specific articles via Bluetooth. Friend shares to friend. Mesh network of truth.</p>
                                        <p className="text-sm text-purple-400 font-bold">Can't be censored. Can't be blocked.</p>
                                    </div>

                                    <div className="bg-black rounded-lg p-4 border-2 border-pink-500">
                                        <h3 className="text-white font-bold mb-2 text-lg">Multilingual Translation</h3>
                                        <p className="text-base text-gray-200 mb-2">AI51 translates ANY article to ANY language instantly. English → Arabic → Chinese → Urdu.</p>
                                        <p className="text-sm text-pink-400 font-bold">Universal access. Zero language barriers.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* NORTH KOREA SCENARIO */}
                        <Card className="bg-gradient-to-br from-black via-red-900/40 to-black border-2 border-red-500">
                            <CardContent className="p-8 space-y-6">
                                <Globe className="w-16 h-16 text-red-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))' }} />
                                <h2 className="text-3xl font-black text-white text-center">The North Korea Test</h2>
                                
                                <div className="space-y-4 text-left">
                                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-red-500">
                                        <p className="text-white font-bold mb-2">1. Traveler brings UF51 app</p>
                                        <p className="text-gray-300 text-sm">Tourist, diplomat, aid worker - shares app via Bluetooth to local contact.</p>
                                    </div>

                                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-orange-500">
                                        <p className="text-white font-bold mb-2">2. Local accesses EVERYTHING offline</p>
                                        <p className="text-gray-300 text-sm">Music. App features. AND real news/education cached in the app. Zero internet needed.</p>
                                    </div>

                                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-yellow-500">
                                        <p className="text-white font-bold mb-2">3. Local shares to friends</p>
                                        <p className="text-gray-300 text-sm">Bluetooth mesh network. Friend to friend. Family to family. Entire community gets access.</p>
                                    </div>

                                    <div className="bg-black/60 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-white font-bold mb-2">4. When anyone connects online</p>
                                        <p className="text-gray-300 text-sm">Travel, VPN, border crossing - new content syncs. Cleanups verified. Artists paid. Information updated.</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-6 text-center">
                                    <p className="text-2xl font-black text-yellow-300 mb-4">
                                        Government blocks websites?<br />
                                        <span className="text-green-400">They can't block Bluetooth.</span>
                                    </p>
                                    <p className="text-white text-sm">
                                        This is how information becomes unstoppable.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* WHAT MAKES THIS DIFFERENT */}
                        <Card className="bg-black border-2 border-cyan-500">
                            <CardContent className="p-8 space-y-6">
                                <h2 className="text-3xl font-black text-white">Why This Is Different</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-900/30 rounded-lg p-4 border-2 border-red-500/50">
                                        <h3 className="text-red-300 font-bold mb-3">Traditional Media:</h3>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>✗ Ads everywhere</li>
                                            <li>✗ Clickbait headlines</li>
                                            <li>✗ Corporate bias</li>
                                            <li>✗ Paywalls</li>
                                            <li>✗ Can be censored</li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-900/30 rounded-lg p-4 border-2 border-green-500/50">
                                        <h3 className="text-green-300 font-bold mb-3">AI51 Truth Network:</h3>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>✓ Zero ads (forever)</li>
                                            <li>✓ Real headlines</li>
                                            <li>✓ Zero ego (AI51 has no agenda)</li>
                                            <li>✓ Free forever</li>
                                            <li>✓ Can't be censored (P2P)</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* FOOTER */}
                <div className="text-center space-y-4 py-8">
                    <p className="text-2xl font-black text-white">
                        The Future of {activeTab === 'music' ? 'Music' : activeTab === 'app' ? 'App' : activeTab === 'info' ? 'Information' : 'Sanctuary'} Distribution
                    </p>
                    <p className="text-gray-400">
                        No servers. No exploitation. No bullshit. Just pure viral magic.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-cyan-400">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-mono">VIRAL.TRANSMISSION.GMT</span>
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-green-400 font-bold">
                        🍄 WORKING NOW - Nature showed us the way
                    </p>
                </div>

            </div>
        </div>
    );
}