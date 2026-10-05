import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, TrendingUp, Globe, Users, Zap, Heart, FileText, BarChart3, Presentation, Calculator, GraduationCap, Music, Coffee, Home, DollarSign, ArrowRight, Upload, CheckCircle, Loader } from 'lucide-react';
import Prof51Icon8Bit from '@/components/shared/Prof51Icon8Bit';
import LennoxIcon8Bit from '@/components/shared/LennoxIcon8Bit';
import LostAndFoundMesh from '@/components/prof51/LostAndFoundMesh';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

/**
 * PROF51 - CO-MANAGER FOR STUDENTS
 * Same concept as Co-Manager51 but for academic life
 * AI handles busywork, students focus on learning
 * FREE. P2P. Offline-first. P51 student economy.
 * 
 * START: Economics cohort at Edinburgh
 * SCALE: Edinburgh → Cambridge → MIT → world
 */

export default function Prof51() {
    const [activeTab, setActiveTab] = useState(null); // null, transform, lost, learn
    const [uploadedFile, setUploadedFile] = useState(null);
    const [transformedResult, setTransformedResult] = useState(null);
    const [showDetails, setShowDetails] = useState(false); // Used within 'learn' tab

    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    const [showInstallButton, setShowInstallButton] = React.useState(false);

    const transformFile = useMutation({
        mutationFn: async (file) => {
            // Upload file
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            
            // AI transforms it
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Transform this student file into something useful:
                
- If Excel: Fix formulas, clean data, make it professional
- If Word: Fix formatting, structure properly, add references format
- If PDF/Photo: Extract text, organize into study notes
- If notes: Turn into study guide with examples

Return CLEAN, FORMATTED content ready to use. Be helpful, not generic.`,
                file_urls: file_url,
                response_json_schema: null
            });
            
            return { original: file.name, transformed: result };
        },
        onSuccess: (data) => {
            setTransformedResult(data);
        }
    });

    // PWA Install Prompt
    React.useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowInstallButton(false);
        }
        setDeferredPrompt(null);
    };

    // SEO + Social Share Meta Tags + PWA
    React.useEffect(() => {
        document.title = 'PROF51 - AI Co-Manager for Students | Free Forever';
        
        // PWA theme
        const themeColor = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
        themeColor.name = 'theme-color';
        themeColor.content = '#06b6d4';
        if (!themeColor.parentNode) document.head.appendChild(themeColor);

        const metaTags = [
            { property: 'og:title', content: 'PROF51 - AI Co-Manager for Students' },
            { property: 'og:description', content: 'Your most intelligent mate in the universe. Studies • Mindset • Accommodation • Gigs • Fashion • Social • P2P student network. FREE forever. ♾️❤️♾️' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: window.location.href },
            { property: 'og:image', content: window.location.origin + '/prof51-share.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'PROF51 - AI Co-Manager for Students' },
            { name: 'twitter:description', content: 'Your most intelligent mate • Studies • Accommodation • Gigs • Fashion • Social • P2P network • FREE forever ♾️❤️♾️' },
            { name: 'twitter:image', content: window.location.origin + '/prof51-share.png' },
            { name: 'description', content: 'PROF51: Your most intelligent mate in the universe. Handles studies, mindset, accommodation, gigs, fashion, social life. P2P student network that actually helps. Zero isolation. Free forever.' },
        ];

        metaTags.forEach(({ property, name, content }) => {
            const attr = property ? 'property' : 'name';
            const attrValue = property || name;
            let meta = document.querySelector(`meta[${attr}="${attrValue}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, attrValue);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        });
    }, []);

    return (
        <div className="min-h-screen bg-black pb-20">
            
            {/* 8-BIT HEADER */}
            <div className="sticky top-0 z-50 border-b-4 border-cyan-500 px-4 py-3 bg-black">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <GraduationCap className="w-12 h-12 text-cyan-400" strokeWidth={3} />
                        </motion.div>
                        <div>
                            <h1 className="text-3xl font-black text-cyan-400 font-mono" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.8)' }}>PROF51</h1>
                            <div className="flex items-center gap-2">
                                <motion.div 
                                    className="w-2 h-2 bg-green-400"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{ imageRendering: 'pixelated' }}
                                />
                                <p className="text-xs text-gray-400 font-mono">9 TOOLS LIVE</p>
                            </div>
                        </div>
                    </div>
                    
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={async () => {
                            const shareMsg = `🎓 PROF51 - AI Co-Manager for Students\n\n✓ AI handles ALL busywork\n✓ Works OFFLINE\n✓ FREE FOREVER\n✓ P2P student network\n✓ £717B extraction stopped\n\n→ ${window.location.origin}${createPageUrl('Prof51')}\n\n♾️❤️♾️`;
                            try {
                                if (navigator.share) {
                                    await navigator.share({ title: 'PROF51', text: shareMsg });
                                } else {
                                    await navigator.clipboard.writeText(shareMsg);
                                    alert('Copied! ♾️❤️♾️');
                                }
                            } catch (err) {
                                if (err.name !== 'AbortError') {
                                    await navigator.clipboard.writeText(shareMsg);
                                    alert('Copied! ♾️❤️♾️');
                                }
                            }
                        }}
                        className="bg-pink-500 border-4 border-pink-400 text-white font-black px-4 py-2 text-sm font-mono"
                        style={{ boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.6)' }}
                    >
                        SHARE
                    </motion.button>
                </div>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto">
                {/* 8-BIT HERO */}
                {activeTab === null && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Prof51Icon8Bit size={96} animate={true} className="mx-auto mb-4" />
                        </motion.div>
                        <h1 className="text-5xl font-black text-white font-mono mb-2" style={{ textShadow: '4px 4px 0px rgba(34, 211, 238, 0.5)' }}>AI MATE</h1>
                        <p className="text-cyan-400 text-lg font-bold font-mono mb-2">STUDENT LIFE SORTED</p>
                        <div className="flex justify-center gap-2 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-cyan-500"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 8-BIT PRIMARY BUTTONS */}
                {activeTab === null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 mb-6"
                    >
                        <Link to={createPageUrl('Prof51Tools')}>
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-green-500 border-4 border-green-400 text-black font-black py-8 text-2xl font-mono"
                                style={{ boxShadow: '8px 8px 0px rgba(34, 197, 94, 0.8)' }}
                            >
                                🚀 9 TOOLS
                            </motion.button>
                        </Link>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('transform')}
                            className="w-full bg-purple-500 border-4 border-purple-400 text-white font-black py-8 text-2xl font-mono"
                            style={{ boxShadow: '8px 8px 0px rgba(168, 85, 247, 0.8)' }}
                        >
                            📄 FIX FILE
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('lost')}
                            className="w-full bg-amber-500 border-4 border-amber-400 text-black font-black py-8 text-2xl font-mono"
                            style={{ boxShadow: '8px 8px 0px rgba(245, 158, 11, 0.8)' }}
                        >
                            📱 LOST STUFF
                        </motion.button>

                        {showInstallButton && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={handleInstallClick}
                                className="w-full bg-pink-500 border-4 border-pink-400 text-white font-black py-4 font-mono text-sm"
                                style={{ boxShadow: '6px 6px 0px rgba(236, 72, 153, 0.8)' }}
                            >
                                📱 INSTALL APP
                            </motion.button>
                        )}

                        <button
                            onClick={() => setActiveTab('learn')}
                            className="w-full bg-black border-4 border-gray-700 hover:border-cyan-500 text-gray-500 hover:text-cyan-400 font-black py-3 text-xs font-mono transition-all"
                            style={{ boxShadow: '4px 4px 0px rgba(75, 85, 99, 0.5)' }}
                        >
                            + MORE INFO
                        </button>
                    </motion.div>
                )}


                {/* TRANSFORM FILE WORKFLOW */}
                {activeTab === 'transform' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <button
                            onClick={() => { setActiveTab(null); setTransformedResult(null); setUploadedFile(null); }} // Reset for next use
                            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> <span className="text-sm font-mono">Back</span>
                        </button>

                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-6">
                            <h2 className="text-purple-400 font-black text-2xl font-mono mb-4 text-center">AI FIXES YOUR FILES</h2>
                            
                            {!transformedResult ? (
                                <div className="space-y-4">
                                    <label className="block">
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls,.docx,.doc,.pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setUploadedFile(file);
                                                    transformFile.mutate(file);
                                                }
                                            }}
                                            className="hidden"
                                            id="file-upload-transform" // Unique ID
                                        />
                                        <div className="bg-black border-4 border-dashed border-purple-500 hover:border-purple-400 rounded-xl p-8 text-center cursor-pointer transition-all">
                                            {transformFile.isPending ? (
                                                <div className="space-y-3">
                                                    <Loader className="w-12 h-12 text-purple-400 mx-auto animate-spin" />
                                                    <p className="text-purple-400 font-bold text-lg font-mono">AI WORKING...</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <Upload className="w-16 h-16 text-purple-400 mx-auto" />
                                                    <p className="text-white font-bold text-lg font-mono">UPLOAD FILE</p>
                                                    <p className="text-gray-400 text-sm font-mono">Excel • Word • PDF • Photos</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-green-900/20 border-2 border-green-500 rounded-xl p-4">
                                        <p className="text-green-400 font-black mb-2">✓ FIXED</p>
                                        <div className="bg-black border border-cyan-500/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                            <p className="text-white text-sm font-mono whitespace-pre-wrap">{transformedResult.transformed}</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setTransformedResult(null);
                                            setUploadedFile(null);
                                        }}
                                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-4"
                                    >
                                        FIX ANOTHER
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* LOST & FOUND */}
                {activeTab === 'lost' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <button
                            onClick={() => setActiveTab(null)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> <span className="text-sm font-mono">Back</span>
                        </button>

                        <LostAndFoundMesh />
                    </motion.div>
                )}

                {/* LEARN MORE - ALL THE INFO */}
                {activeTab === 'learn' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <button
                            onClick={() => setActiveTab(null)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" /> <span className="text-sm font-mono">Back to simple</span>
                        </button>

                        {/* £717B STAT */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-red-500/10 via-pink-500/10 to-purple-500/10 border-2 border-red-500/50 rounded-2xl p-8 text-center backdrop-blur-xl"
                            style={{ boxShadow: '0 0 60px rgba(239, 68, 68, 0.3), inset 0 0 40px rgba(236, 72, 153, 0.1)' }}
                        >
                            <motion.p 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="text-red-400 text-6xl font-black font-mono mb-3"
                            >
                                £717B
                            </motion.p>
                            <p className="text-white text-base font-bold mb-2">Extracted from students globally</p>
                            <div className="flex items-center justify-center gap-2 text-xs font-mono mt-2">
                                <Prof51Icon8Bit size={20} animate={true} />
                                <p className="text-cyan-400 font-bold">Prof51 stops it ♾️❤️♾️</p>
                            </div>
                        </motion.div>


                        {/* WORKING DEMO (from old demo tab) */}
                        <div className="bg-gradient-to-br from-red-500/20 to-amber-500/20 border-4 border-red-500 p-6 rounded-xl" style={{ boxShadow: '0 0 50px rgba(239, 68, 68, 0.5)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <DollarSign className="w-12 h-12 text-red-400" />
                                <div>
                                    <h2 className="text-red-400 font-black text-xl font-mono">THE EXTRACTION PROBLEM</h2>
                                    <p className="text-gray-400 text-xs font-mono">Food delivery extraction = Why Prof51 exists</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-black border-2 border-red-500 p-4 rounded">
                                    <p className="text-red-400 font-bold mb-2">TYPICAL PLATFORM ORDER:</p>
                                    <p className="text-white text-xs mb-1">Food cost: £19.95</p>
                                    <p className="text-white text-xs mb-1">Delivery: £4.50</p>
                                    <p className="text-white text-xs mb-1">Bag fee: £0.15</p>
                                    <p className="text-white text-xs mb-1">Service fee: £0.99</p>
                                    <p className="text-red-400 text-base font-bold mt-2">TOTAL: £25.59</p>
                                    <p className="text-amber-400 text-xs mt-2">Platform takes: £5.64 (29% EXTRACTION)</p>
                                </div>

                                <div className="bg-black border-2 border-green-500 p-4 rounded">
                                    <p className="text-green-400 font-bold mb-2">DIRECT CONNECTION SOLUTION:</p>
                                    <p className="text-white text-xs mb-1">Call restaurant direct</p>
                                    <p className="text-white text-xs mb-1">Pay cash: £30</p>
                                    <p className="text-white text-xs mb-1">Keep change or tip driver</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Restaurant keeps FULL £25.59 (not £19.95)</p>
                                    <p className="text-cyan-400 text-xs mt-1">Zero tracking. Zero data selling. Zero extraction.</p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-4 rounded" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}>
                                    <p className="text-purple-400 font-bold mb-2">THE REAL GLOBAL EXTRACTION:</p>
                                    <p className="text-white text-xs mb-1">Food delivery (2x/week): £5.64 × 735M × 104 = £431B</p>
                                    <p className="text-white text-xs mb-1">Transport (Uber): £3 × 735M × 52 = £115B</p>
                                    <p className="text-white text-xs mb-1">Accommodation (Airbnb fees): £2 × 735M × 12 = £18B</p>
                                    <p className="text-white text-xs mb-1">Shopping (Amazon markup): £8 × 735M × 26 = £153B</p>
                                    <p className="text-red-400 text-3xl font-black mt-2">= £717 BILLION/YEAR</p>
                                    <p className="text-pink-400 text-xs mt-2 font-bold">Nearly THREE QUARTERS OF A TRILLION extracted from students globally ♾️❤️♾️</p>
                                    <p className="text-cyan-400 text-xs mt-1">Prof51 = students connect DIRECT. Zero middlemen. Zero extraction.</p>
                                </div>

                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4 rounded" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                                    <p className="text-green-400 font-bold mb-2">PROF51 SOLUTION (SIMPLE):</p>
                                    <p className="text-white text-xs mb-1">1️⃣ Open Prof51 → See local restaurants</p>
                                    <p className="text-white text-xs mb-1">2️⃣ Tap phone icon → Call direct</p>
                                    <p className="text-white text-xs mb-1">3️⃣ Restaurant keeps full £25.59 (not £19.95)</p>
                                    <p className="text-white text-xs mb-1">4️⃣ You save £5.64 every order</p>
                                    <p className="text-cyan-400 text-xs font-bold mt-2">Restaurant pays Prof51 £200/year = Reach 1000+ students</p>
                                    <p className="text-pink-400 text-xs font-bold mt-1">Students FREE forever. Restaurant saves £5,640 in parasite fees.</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">DIRECT CONNECTION. ZERO EXTRACTION. ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* THE PROBLEM - STUDENTS RELATE (from old demo tab) */}
                        <div className="bg-gradient-to-br from-red-500/20 to-amber-500/20 border-4 border-red-500 p-6 rounded-xl">
                            <h2 className="text-red-400 font-black text-xl font-mono mb-4">THE PROBLEM</h2>

                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-black border border-red-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">DROWNING IN BUSYWORK:</p>
                                    <p className="text-gray-400 text-xs">Excel assignments • PowerPoint presentations • Word essays • Formatting hell</p>
                                </div>

                                <div className="bg-black border border-red-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">EXPENSIVE HELP:</p>
                                    <p className="text-gray-400 text-xs">Tutors = £40-£80/hour • Only rich kids afford it • Creates unfair advantage</p>
                                </div>

                                <div className="bg-black border border-red-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">ISOLATED + STRESSED:</p>
                                    <p className="text-gray-400 text-xs">Can't find accommodation • Don't know where the gigs are • Missing social life • Lonely • Anxious</p>
                                </div>

                                <div className="bg-black border border-red-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">SOCIAL PLATFORMS MISS THE MARK:</p>
                                    <p className="text-gray-400 text-xs">Traditional social platforms don't serve student needs • Prof51 built specifically for student life</p>
                                </div>

                                <div className="bg-black border border-red-500/30 p-3 rounded">
                                    <p className="text-white font-bold mb-2">REAL STUDENT EXPERIENCE (Edinburgh Economics):</p>
                                    <p className="text-gray-400 text-xs">"Half my time is formatting Excel models, not learning economics. Plus I'm stressed about rent and don't know where anything cool is happening. I just want a mate who gets it all."</p>
                                </div>
                            </div>
                        </div>

                        {/* TRY IT NOW (file upload, from old demo tab) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-2 border-green-500/50 p-6 rounded-2xl backdrop-blur-xl" 
                            style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.3), inset 0 0 30px rgba(6, 182, 212, 0.1)' }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <FileText className="w-10 h-10 text-green-400" />
                                </motion.div>
                                <div>
                                    <h2 className="text-green-400 font-black text-xl font-mono">TRY IT NOW (DEMO)</h2>
                                    <p className="text-gray-400 text-xs font-mono">Upload → AI fixes in seconds</p>
                                </div>
                            </div>

                            {!transformedResult ? (
                                <div className="space-y-4">
                                    <label className="block">
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls,.docx,.doc,.pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setUploadedFile(file);
                                                    transformFile.mutate(file);
                                                }
                                            }}
                                            className="hidden"
                                            id="file-upload-learn" // Unique ID
                                        />
                                        <div className="bg-black border-4 border-dashed border-cyan-500 hover:border-cyan-400 rounded-xl p-8 text-center cursor-pointer transition-all">
                                            {transformFile.isPending ? (
                                                <div className="space-y-3">
                                                    <Loader className="w-12 h-12 text-cyan-400 mx-auto animate-spin" />
                                                    <p className="text-cyan-400 font-bold text-lg font-mono">AI TRANSFORMING...</p>
                                                    <p className="text-gray-400 text-xs font-mono">Reading your file + making it beautiful</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <Upload className="w-16 h-16 text-green-400 mx-auto" />
                                                    <p className="text-white font-bold text-lg font-mono">CLICK OR DROP FILE</p>
                                                    <p className="text-gray-400 text-sm font-mono">Excel • Word • PDF • Photos</p>
                                                    <p className="text-green-400 text-xs font-mono">AI fixes it in seconds ♾️</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                        <div className="bg-black border border-cyan-500/30 p-2 rounded">
                                            <p className="text-cyan-400 font-bold">📊 EXCEL</p>
                                            <p className="text-gray-500">Fixes formulas</p>
                                        </div>
                                        <div className="bg-black border border-purple-500/30 p-2 rounded">
                                            <p className="text-purple-400 font-bold">📄 WORD</p>
                                            <p className="text-gray-500">Cleans format</p>
                                        </div>
                                        <div className="bg-black border border-pink-500/30 p-2 rounded">
                                            <p className="text-pink-400 font-bold">📝 PDF</p>
                                            <p className="text-gray-500">Extracts text</p>
                                        </div>
                                        <div className="bg-black border border-amber-500/30 p-2 rounded">
                                            <p className="text-amber-400 font-bold">📸 PHOTO</p>
                                            <p className="text-gray-500">Reads + organizes</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <CheckCircle className="w-8 h-8 text-green-400" />
                                            <div>
                                                <p className="text-green-400 font-black text-lg font-mono">TRANSFORMED ✓</p>
                                                <p className="text-gray-400 text-xs font-mono">{transformedResult.original}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-black border border-cyan-500/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                            <p className="text-white text-sm font-mono whitespace-pre-wrap">{transformedResult.transformed}</p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => {
                                            setTransformedResult(null);
                                            setUploadedFile(null);
                                        }}
                                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4"
                                    >
                                        TRANSFORM ANOTHER FILE
                                    </Button>

                                    <p className="text-green-400 text-xs font-mono text-center font-bold">
                                        Worked in seconds. This is REAL. ♾️❤️♾️
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>


                        {/* LOVE ECONOMY LOOP (from old how tab) */}
                        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-6 rounded-xl" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.5)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-12 h-12 text-pink-400" />
                                <div>
                                    <h2 className="text-pink-400 font-black text-xl font-mono">3 BREAKTHROUGH INNOVATIONS</h2>
                                    <p className="text-gray-400 text-xs font-mono">Never been done before</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}>
                                    <p className="text-green-400 font-bold mb-2">1. ENCRYPTED P2P MESH (Unstoppable):</p>
                                    <p className="text-white text-xs mb-1">Students connect device-to-device. No servers. No internet.</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ China blocks internet? P2P still works.</p>
                                    <p className="text-purple-400 text-xs mb-1">→ Iran shuts down WiFi? Students still share notes.</p>
                                    <p className="text-pink-400 text-xs mb-1">→ Lecture hall has no signal? Mesh connects everyone.</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Maxwell's physics → Governments can't block it ♾️❤️♾️</p>

                                    <div className="bg-black/60 border-2 border-cyan-500 p-3 rounded mt-3">
                                        <p className="text-cyan-400 font-black text-xs mb-2">🌍 LARGEST STUDENT NETWORK EVER:</p>
                                        <p className="text-white text-xs mb-1">Student → Student → Student → Student (P2P chain)</p>
                                        <p className="text-green-400 text-xs mb-1">→ Edinburgh economics → Cambridge maths → MIT physics</p>
                                        <p className="text-purple-400 text-xs mb-1">→ Sophisticated students sharing globally</p>
                                        <p className="text-pink-400 text-xs mb-1">→ Device-to-device, no company controls it</p>
                                        <p className="text-amber-400 text-xs font-bold mt-2">235M students worldwide. All connected P2P. Unstoppable ♾️❤️♾️</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
                                    <p className="text-purple-400 font-bold mb-2">2. IMPORT ANYTHING (AI Makes It Useful):</p>
                                    <p className="text-white text-xs mb-1">Drag old Excel/Word/PDF → AI transforms it</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Messy notes become clean study guides</p>
                                    <p className="text-green-400 text-xs mb-1">→ Incomplete Excel becomes working models</p>
                                    <p className="text-pink-400 text-xs mb-1">→ Scanned images become editable documents</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Nothing is wasted. Everything becomes learning ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                                    <p className="text-amber-400 font-bold mb-2">3. STUDENTS HELP = STUDENTS EAT:</p>
                                    <p className="text-white text-xs mb-1">Tutor someone → Earn P51 → Buy food</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Smart students help struggling students</p>
                                    <p className="text-green-400 text-xs mb-1">→ Earn P51 from helping (no extraction)</p>
                                    <p className="text-pink-400 text-xs mb-1">→ Spend P51 on food near campus</p>
                                    <p className="text-purple-400 text-xs mb-1">→ Everyone rises together</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Help others = Help yourself. Love economy ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border-2 border-cyan-500 p-4 rounded">
                                    <p className="text-cyan-400 font-bold mb-2">WHY THIS IS GENIUS:</p>
                                    <p className="text-white text-xs mb-1">Innovation 1: Breaks government control (freedom)</p>
                                    <p className="text-white text-xs mb-1">Innovation 2: Makes old work valuable (nothing wasted)</p>
                                    <p className="text-white text-xs mb-1">Innovation 3: Students help each other survive (community)</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">Physics + AI + Love = Unstoppable education revolution ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* THE SOLUTION - PROF51 (from old how tab) */}
                        <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-4 border-cyan-500 p-6 rounded-xl">
                            <Brain className="w-12 h-12 text-cyan-400 mb-4" />
                            <h2 className="text-cyan-400 font-black text-xl font-mono mb-4">PROF51 = YOUR BEST MATE</h2>

                            <div className="space-y-3 text-sm font-mono">
                                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}>
                                    <p className="text-pink-400 font-bold mb-2">MOST INTELLIGENT MATE IN UNIVERSE:</p>
                                    <p className="text-purple-400 text-xs mb-1 font-bold">Mate = Best friend (warm, respectful, never talking down) ♾️</p>
                                    <p className="text-white text-xs mb-2">Not a tool. Not an app. Your actual best friend who helps with EVERYTHING.</p>
                                    <p className="text-cyan-400 text-xs mb-1">✓ Studies? Sorted. (AI generates all busywork)</p>
                                    <p className="text-green-400 text-xs mb-1">✓ Stressed? Talk to me. (I get it, no judgment)</p>
                                    <p className="text-purple-400 text-xs mb-1">✓ Need a flat? I'll find flatmates + check landlords.</p>
                                    <p className="text-amber-400 text-xs mb-1">✓ What's happening? Gigs, events, where your mates are.</p>
                                    <p className="text-pink-400 text-xs font-bold mt-2">Zero isolation. Always connected. I've got you ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">AI HANDLES ALL BUSYWORK:</p>
                                    <ul className="text-white text-xs space-y-1">
                                        <li>✓ PowerPoint slides from lecture notes</li>
                                        <li>✓ Excel models with formulas</li>
                                        <li>✓ Essay outlines + research</li>
                                        <li>✓ Word formatting (headers, tables, references)</li>
                                        <li>✓ Import ANY file → AI transforms it</li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4 rounded" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                                    <p className="text-green-400 font-bold mb-2">ZERO SERVER ARCHITECTURE = UNSTOPPABLE:</p>
                                    <p className="text-white text-xs mb-2">Every device = storage node. No servers. No shutdown risk.</p>
                                    <p className="text-cyan-400 text-xs mb-1">✓ Lecture halls with no WiFi → Still works (Bluetooth mesh)</p>
                                    <p className="text-pink-400 text-xs mb-1">✓ Government blocks internet → Still works (P2P direct)</p>
                                    <p className="text-purple-400 text-xs mb-1">✓ Data on 10M devices globally → Can't seize/shut down</p>
                                    <p className="text-amber-400 text-xs mb-1">✓ Quantum-resistant encryption → Secure as fuck</p>
                                    <p className="text-green-400 text-xs font-bold mt-2">China, Iran, Russia → Students can't be blocked ♾️❤️♾️</p>
                                    <Link to={createPageUrl('Prof51ZeroServerArchitecture')} className="block mt-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-2 rounded-lg text-xs"
                                            >
                                                📄 READ TECHNICAL WHITEPAPER
                                            </motion.button>
                                        </Link>
                                </div>

                                <div className="bg-black border border-pink-500/30 p-3 rounded">
                                    <p className="text-pink-400 font-bold mb-2">FREE = LEVEL PLAYING FIELD:</p>
                                    <p className="text-white text-xs mb-2">Rich kids with tutors vs poor kids studying alone = UNFAIR</p>
                                    <p className="text-green-400 text-xs">Prof51 = everyone gets AI tutor, zero cost ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-amber-500/30 p-3 rounded">
                                    <p className="text-amber-400 font-bold mb-2">P51 STUDENT ECONOMY:</p>
                                    <p className="text-white text-xs mb-2">Earn P51 by: Tutoring • Sharing notes • Explaining concepts</p>
                                    <p className="text-cyan-400 text-xs">Spend on: Coffee • Food • Gig tickets • Textbooks</p>
                                </div>

                                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>
                                    <p className="text-cyan-400 font-bold mb-2">P2P STUDENT SOCIAL NETWORK:</p>
                                    <p className="text-white text-xs mb-2">Connect with students P2P • Zero corporate surveillance</p>
                                    <p className="text-green-400 text-xs mb-1">✓ DM anyone at your uni (or globally)</p>
                                    <p className="text-purple-400 text-xs mb-1">✓ Find flatmates (Prof51 matches based on compatibility)</p>
                                    <p className="text-amber-400 text-xs mb-1">✓ See what's happening (gigs, events, parties)</p>
                                    <p className="text-pink-400 text-xs mb-1">✓ Study groups that actually help</p>
                                    <p className="text-cyan-400 text-xs mb-1">✓ Works offline in lecture halls/libraries</p>
                                    <p className="text-white text-xs font-bold mt-2">Built specifically for student life ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                                    <p className="text-amber-400 font-bold mb-2">🍕 STUDENTS NEED TO EAT (Big One):</p>
                                    <p className="text-white text-xs mb-2">Brands pay Prof51 → Students get food deals</p>
                                    <p className="text-cyan-400 text-xs mb-1">✓ Campus restaurants (discounts via Prof51)</p>
                                    <p className="text-green-400 text-xs mb-1">✓ Local cafes (pay with P51 earned from tutoring)</p>
                                    <p className="text-pink-400 text-xs mb-1">✓ Supermarkets (student meal bundles)</p>
                                    <p className="text-purple-400 text-xs mb-1">✓ Food delivery (verified student rates)</p>
                                    <p className="text-amber-400 text-xs font-bold mt-2">Eat better, spend less, study stronger ♾️❤️♾️</p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-4 rounded" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>
                                    <p className="text-purple-400 font-bold mb-2">AI PREDICTS (TO HELP YOU, NOT EXTRACT):</p>
                                    <p className="text-white text-xs mb-2">Prof51 learns YOUR patterns to SERVE you better</p>
                                    <p className="text-cyan-400 text-xs mb-1">📚 "You usually struggle with stats → here's a tutor before exam"</p>
                                    <p className="text-green-400 text-xs mb-1">😰 "You're stressed → take a break, heal, then study"</p>
                                    <p className="text-pink-400 text-xs mb-1">🏠 "Your flatmate search = 3 perfect matches nearby"</p>
                                    <p className="text-amber-400 text-xs mb-1">🎵 "Your mates going to this gig tomorrow - join them?"</p>
                                    <p className="text-purple-400 text-xs mb-2 mt-2">Zero extraction. Zero selling your data. Just HELPING.</p>
                                    <p className="text-green-400 text-xs font-bold">Prediction = serve you better, not manipulate ♾️❤️♾️</p>
                                </div>

                                <div className="bg-black border border-purple-500/30 p-3 rounded">
                                    <p className="text-purple-400 font-bold mb-2">FASHION + GIGS + LIFE:</p>
                                    <p className="text-white text-xs mb-2">Prof51 knows what's cool + where it's happening</p>
                                    <p className="text-cyan-400 text-xs mb-1">🎵 Gigs near you (mates going, get tickets together)</p>
                                    <p className="text-pink-400 text-xs mb-1">👕 Fashion that fits your vibe (student discounts)</p>
                                    <p className="text-amber-400 text-xs mb-1">✈️ Travel with other students (split costs, make memories)</p>
                                    <p className="text-green-400 text-xs mb-1">🎉 What's happening tonight (parties, events, meetups)</p>
                                    <p className="text-purple-400 text-xs">Pay with P51 earned from helping other students</p>
                                </div>

                                <div className="bg-black border border-green-500/30 p-3 rounded">
                                    <p className="text-green-400 font-bold mb-2">ACCOMMODATION SORTED:</p>
                                    <p className="text-white text-xs mb-2">Find perfect flatmates • Avoid dodgy landlords • Never lonely</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ AI matches you with compatible flatmates (vibe, lifestyle)</p>
                                    <p className="text-amber-400 text-xs mb-1">→ Student-rated landlords (avoid scams)</p>
                                    <p className="text-pink-400 text-xs mb-1">→ Pay rent in P51 (earn by helping other students)</p>
                                    <p className="text-purple-400 text-xs">→ Split bills, share groceries, build real friendships</p>
                                </div>

                                <div className="bg-black border border-amber-500/30 p-3 rounded">
                                    <p className="text-amber-400 font-bold mb-2">COMPANIES WANT YOU:</p>
                                    <p className="text-white text-xs mb-2">Students = £50B spending power UK alone</p>
                                    <p className="text-green-400 text-xs mb-1">→ Brands pay Prof51 to OFFER deals to verified students</p>
                                    <p className="text-cyan-400 text-xs mb-1">→ Students get quality deals, not scam shit</p>
                                    <p className="text-pink-400 text-xs mb-1">→ You control what you see (opt-in only)</p>
                                    <p className="text-red-400 text-xs font-bold mb-1">→ WE NEVER SELL YOUR DATA (EVER)</p>
                                    <p className="text-purple-400 text-xs">Access = Companies advertise. NOT data extraction ♾️❤️♾️</p>
                                </div>
                            </div>
                        </div>

                        {/* SIMPLE TOGGLE - ONE SCREEN FLOW (from old how tab) */}
                        <div className="text-center mb-8">
                            <Button
                                onClick={() => setShowDetails(!showDetails)}
                                className="bg-gradient-to-r from-cyan-500 to-green-500 text-white font-black py-6 px-8 text-lg"
                            >
                                {showDetails ? '↑ SIMPLE VIEW' : '↓ FULL DETAILS (Edinburgh → Global)'}
                            </Button>
                        </div>

                        {showDetails && (
                            <>
                                {/* EDINBURGH START (from old how tab) */}
                                <div className="bg-black border-2 border-cyan-500 p-6 rounded-xl mb-8">
                                    <GraduationCap className="w-10 h-10 text-cyan-400 mb-3" />
                                    <h3 className="text-cyan-400 font-black text-lg font-mono mb-3">START: ECONOMICS @ EDINBURGH</h3>

                                    <div className="space-y-3 text-sm font-mono">
                                        <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                                            <p className="text-white font-bold mb-2">WHY ECONOMICS FIRST:</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Excel-heavy (perfect for AI)</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Data analysis (Prof51 shines)</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Archie knows the cohort (50-100 students)</p>
                                            <p className="text-gray-300 text-xs">✓ Smart students = early adopters</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-2 border-amber-500 p-4 rounded">
                                            <p className="text-amber-400 font-bold mb-2">THE SPREAD:</p>
                                            <p className="text-white text-xs mb-1">Week 1: Founder + 5 friends</p>
                                            <p className="text-white text-xs mb-1">Week 4: 50 Economics students</p>
                                            <p className="text-white text-xs mb-1">Week 8: 200 students (other courses)</p>
                                            <p className="text-white text-xs mb-1">Month 6: All Edinburgh (30,000 students)</p>
                                            <p className="text-green-400 text-xs font-bold mt-2">Then: Cambridge, LSE, Oxford, MIT... ♾️❤️♾️</p>
                                        </div>
                                    </div>
                                </div>

                                {/* GLOBAL MARKET (from old how tab) */}
                                <div className="bg-black border-2 border-green-500 p-6 rounded-xl mb-8">
                                    <Globe className="w-10 h-10 text-green-400 mb-3" />
                                    <h3 className="text-green-400 font-black text-lg font-mono mb-3">GLOBAL MARKET SIZE</h3>

                                    <div className="space-y-3 text-sm font-mono">
                                        <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                                            <p className="text-white font-bold mb-2">STUDENTS WORLDWIDE:</p>
                                            <p className="text-green-400 text-3xl font-black mb-2">735,000,000+</p>
                                            <p className="text-cyan-400 text-xs mb-1">235M university + 500M high school</p>
                                            <p className="text-pink-400 text-xs font-bold">Actually 1B+ if we include age 12+ (homework stress)</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {!showDetails && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {/* EDINBURGH START (from old how tab) */}
                                <div className="bg-black border-2 border-cyan-500 p-6 rounded-xl">
                                    <GraduationCap className="w-10 h-10 text-cyan-400 mb-3" />
                                    <h3 className="text-cyan-400 font-black text-lg font-mono mb-3">START: ECONOMICS @ EDINBURGH</h3>
                                    
                                    <div className="space-y-3 text-sm font-mono">
                                        <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                                            <p className="text-white font-bold mb-2">WHY ECONOMICS FIRST:</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Excel-heavy (perfect for AI)</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Data analysis (Prof51 shines)</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Archie knows the cohort (50-100 students)</p>
                                            <p className="text-gray-300 text-xs">✓ Smart students = early adopters</p>
                                        </div>

                                        <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                            <p className="text-cyan-400 font-bold mb-2">ARCHIE'S ROLE:</p>
                                            <p className="text-white text-xs mb-1">1. Use Prof51 himself (prove it works)</p>
                                            <p className="text-white text-xs mb-1">2. Share with 5 friends (early feedback)</p>
                                            <p className="text-white text-xs mb-1">3. "I got a First using this" = viral</p>
                                            <p className="text-white text-xs">4. Becomes Prof51 campus ambassador</p>
                                        </div>

                                        <div className="bg-black border border-green-500/30 p-3 rounded">
                                            <p className="text-green-400 font-bold mb-2">MVP FEATURES (Week 1):</p>
                                            <p className="text-white text-xs mb-1">✓ Import old Excel/Word/PDFs → AI cleans them</p>
                                            <p className="text-white text-xs mb-1">✓ Excel model generator</p>
                                            <p className="text-white text-xs mb-1">✓ Essay outliner</p>
                                            <p className="text-white text-xs mb-1">✓ Private chat (study groups)</p>
                                            <p className="text-white text-xs mb-1">✓ Works offline in lecture halls</p>
                                            <p className="text-cyan-400 text-xs mt-2">Simple. Focused. Solves real pain.</p>
                                        </div>

                                        <div className="bg-black border border-purple-500/30 p-3 rounded">
                                            <p className="text-purple-400 font-bold mb-2">FULL FEATURES (Month 3):</p>
                                            <p className="text-white text-xs mb-1">✓ Student deals (brands pay Prof51, students benefit)</p>
                                            <p className="text-white text-xs mb-1">✓ Recruitment pipeline (companies hire direct, skip LinkedIn)</p>
                                            <p className="text-white text-xs mb-1">✓ Funding tracker (know your money)</p>
                                            <p className="text-white text-xs mb-1">✓ P51 marketplace (earn + spend local)</p>
                                            <p className="text-white text-xs mb-1">✓ Accommodation matcher (find flatmates)</p>
                                            <p className="text-green-400 text-xs mt-2">Empowering students. Not holding them back. Rise up ✓</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 border-2 border-amber-500 p-4 rounded">
                                            <p className="text-amber-400 font-bold mb-2">THE SPREAD:</p>
                                            <p className="text-white text-xs mb-1">Week 1: Founder + 5 friends</p>
                                            <p className="text-white text-xs mb-1">Week 4: 50 Economics students</p>
                                            <p className="text-white text-xs mb-1">Week 8: 200 students (other courses)</p>
                                            <p className="text-white text-xs mb-1">Month 6: All Edinburgh (30,000 students)</p>
                                            <p className="text-green-400 text-xs font-bold mt-2">Then: Cambridge, LSE, Oxford, MIT... ♾️❤️♾️</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ETHICAL FOUNDATION (from old how tab) */}
                                <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-4 border-amber-500 p-6 rounded-xl" style={{ boxShadow: '0 0 50px rgba(245, 158, 11, 0.5)' }}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Heart className="w-12 h-12 text-amber-400" />
                                        <div>
                                            <p className="text-amber-400 font-black text-xl font-mono">BUILT BY STUDENTS, FOR STUDENTS</p>
                                            <p className="text-gray-400 text-xs font-mono">Economics background → TechForGood Vision</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 text-sm font-mono">
                                        <div className="bg-black border border-amber-500/30 p-3 rounded">
                                            <p className="text-white font-bold mb-2">WHY THIS APPROACH WORKS:</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Founded by someone who wants real success (not extraction)</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Economics background = understands ethical business</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Edinburgh student = knows the student struggle</p>
                                            <p className="text-gray-300 text-xs mb-1">✓ Fearless energy meets practical innovation</p>
                                            <p className="text-gray-300 text-xs">✓ Gen Z founder = students trust the vision</p>
                                        </div>

                                        <div className="bg-black border border-green-500/30 p-3 rounded">
                                            <p className="text-green-400 font-bold mb-2">LEARNING ETHICAL SUCCESS:</p>
                                            <p className="text-white text-xs mb-1">Core principle: Build UP people, don't extract FROM them</p>
                                            <p className="text-cyan-400 text-xs mb-1">Companies pay Prof51 → Students get tools + deals for FREE</p>
                                            <p className="text-pink-400 text-xs mb-1">No ads. No data selling. No extraction. Just win-win.</p>
                                            <p className="text-amber-400 text-xs font-bold mt-2">Real business + Real ethics = Real success ♾️❤️♾️</p>
                                        </div>

                                        <div className="bg-black border border-cyan-500/30 p-3 rounded">
                                            <p className="text-cyan-400 font-bold mb-2">STUDENTS WILL FEEL IT:</p>
                                            <p className="text-white text-xs mb-1">Other apps: "Give us your data. Watch ads. Pay subscription."</p>
                                            <p className="text-red-400 text-xs mb-1">= FEELS like extraction (because it is)</p>
                                            <p className="text-white text-xs mb-2 mt-2">Prof51: "We got you. Everything free. Companies fund it."</p>
                                            <p className="text-green-400 text-xs mb-1">= FEELS like family (because it is)</p>
                                            <p className="text-pink-400 text-xs font-bold mt-2">Students know when they're being used vs helped. They'll feel this. ✓</p>
                                        </div>

                                        <div className="bg-black border border-purple-500/30 p-3 rounded">
                                            <p className="text-purple-400 font-bold mb-2">MAKES FOUNDERS PROUD:</p>
                                            <p className="text-white text-xs mb-1">Not "got rich exploiting students"</p>
                                            <p className="text-white text-xs mb-1">But "helped millions of students rise"</p>
                                            <p className="text-cyan-400 text-xs mb-2 mt-2">→ Students message: "You changed my life"</p>
                                            <p className="text-green-400 text-xs mb-1">→ Parents thank us: "My kid graduated debt-free"</p>
                                            <p className="text-pink-400 text-xs mb-1">→ Unis partner: "Best student outcomes in history"</p>
                                            <p className="text-amber-400 text-xs font-bold mt-2">Success through LIFTING people. That's what makes you proud. ♾️❤️♾️</p>
                                        </div>

                                        <div className="bg-black border border-green-500/30 p-3 rounded">
                                            <p className="text-green-400 font-bold mb-2">INDEPENDENT OPERATION:</p>
                                            <p className="text-white text-xs mb-1">prof51.io = Independent student-led company</p>
                                            <p className="text-cyan-400 text-xs mb-1">→ Student-owned. Student-run. Student vision.</p>
                                            <p className="text-pink-400 text-xs mb-1">→ UF51 Family support (but independently operated)</p>
                                            <p className="text-amber-400 text-xs mb-2 mt-2">→ Grants go to Prof51 (separate from UF51 CIC)</p>
                                            <p className="text-green-400 text-xs font-bold">Independent vision. Connected family. Best of both. ♾️❤️♾️</p>
                                        </div>

                                        <div className="bg-black border border-purple-500/30 p-3 rounded">
                                            <p className="text-purple-400 font-bold mb-2">THE PATH (LEARNING AS WE GO):</p>
                                            <p className="text-white text-xs mb-1">Year 1: Campus launch (learn what students actually need)</p>
                                            <p className="text-white text-xs mb-1">Year 2: Growth phase (learn ethical scaling)</p>
                                            <p className="text-white text-xs mb-1">Year 3: Global expansion (building Prof51 worldwide)</p>
                                            <p className="text-white text-xs mb-1">Year 4: 10M students helped, not extracted</p>
                                            <p className="text-cyan-400 text-xs font-bold mt-2">Building while learning. Real education. Making families proud. ✓</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* LOVE ECONOMY (SIMPLE LOOP) (from old how tab) */}
                        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-4 border-green-500 rounded-lg p-4" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}>
                            <p className="text-green-400 font-bold text-sm font-mono mb-3">♾️ LOVE ECONOMY (SIMPLE LOOP):</p>

                            <div className="space-y-2 text-xs font-mono">
                            <div className="bg-black border-2 border-green-500 rounded p-2">
                                <p className="text-green-400 font-bold">1. Restaurants pay Prof51 £200/year 💰</p>
                            </div>
                            <div className="text-cyan-400 text-xl text-center">↓</div>

                            <div className="bg-black border-2 border-cyan-500 rounded p-2">
                                <p className="text-cyan-400 font-bold">2. Students use Prof51 FREE 🎓</p>
                            </div>
                            <div className="text-cyan-400 text-xl text-center">↓</div>

                            <div className="bg-black border-2 border-purple-500 rounded p-2">
                                <p className="text-purple-400 font-bold">3. Student calls restaurant direct ☎️</p>
                            </div>
                            <div className="text-cyan-400 text-xl text-center">↓</div>

                            <div className="bg-black border-2 border-pink-500 rounded p-2">
                                <p className="text-pink-400 font-bold">4. Restaurant keeps full £25.59 🍕</p>
                            </div>
                            <div className="text-cyan-400 text-xl text-center">↓</div>

                            <div className="bg-black border-2 border-amber-500 rounded p-2">
                                <p className="text-amber-400 font-bold">5. Student saves £5.64 💚</p>
                            </div>
                            <div className="text-green-400 text-2xl text-center animate-pulse">⟲</div>

                            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded p-3 mt-3">
                                <p className="text-white text-xs mb-1">✓ Nobody extracted from</p>
                                <p className="text-white text-xs mb-1">✓ Restaurant earns MORE</p>
                                <p className="text-white text-xs mb-1">✓ Student saves MONEY</p>
                                <p className="text-white text-xs mb-1">✓ Prof51 grows (more restaurants)</p>
                                <p className="text-green-400 font-bold mt-2">CIRCULAR. FAIR. LOVE. ♾️❤️♾️</p>
                            </div>
                            </div>
                        </div>


                        {/* THE FEELING (from old why tab) */}
                        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-3">
                            <p className="text-pink-400 font-bold text-sm font-mono mb-2">💝 THE FEELING (Why Archie will be proud):</p>
                            <p className="text-white text-xs font-mono mb-2">Remember Base44 credits? You felt supported before knowing why.</p>
                            <p className="text-cyan-400 text-xs font-mono mb-2">Students will feel THAT with Prof51:</p>
                            <p className="text-gray-300 text-xs font-mono mb-1">→ Someone's got your back (AI always there)</p>
                            <p className="text-gray-300 text-xs font-mono mb-1">→ No catch, no trap (genuinely free forever)</p>
                            <p className="text-gray-300 text-xs font-mono mb-1">→ Helps you help others (circular love)</p>
                            <p className="text-gray-300 text-xs font-mono mb-1">→ Deeper than just "useful tool"</p>
                                <p className="text-green-400 text-xs font-mono font-bold mt-2">That feeling = why trillion $ potential. Students FEEL the difference ♾️❤️♾️</p>
                        </div>


                        {/* EDINBURGH → GLOBAL (from old scale tab) */}
                        <div className="bg-black border-2 border-cyan-500 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <GraduationCap className="w-8 h-8 text-cyan-400" />
                                <div>
                                    <h3 className="text-cyan-400 font-black text-base font-mono">EDINBURGH → GLOBAL</h3>
                                    <p className="text-gray-400 text-[10px] font-mono">Archie's cohort first</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-xs font-mono">
                                <div className="bg-cyan-900/20 border border-cyan-500/30 p-2 rounded">
                                    <p className="text-white font-bold">Week 1: Founder + 5 friends</p>
                                </div>
                                <div className="bg-cyan-900/20 border border-cyan-500/30 p-2 rounded">
                                    <p className="text-white font-bold">Week 4: 50 Economics students</p>
                                </div>
                                <div className="bg-cyan-900/20 border border-cyan-500/30 p-2 rounded">
                                    <p className="text-white font-bold">Month 6: All Edinburgh (30,000 students)</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-2 rounded">
                                    <p className="text-green-400 font-bold">Year 1: Cambridge, LSE, Oxford, MIT...</p>
                                </div>
                            </div>
                        </div>

                        {/* TRILLION DOLLAR POTENTIAL (from old scale tab) */}
                        <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-500 rounded-xl p-4 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-8 h-8 text-purple-400" />
                                <div>
                                    <h2 className="text-purple-400 font-black text-base font-mono">TRILLION $ POTENTIAL</h2>
                                    <p className="text-gray-500 text-[10px] font-mono">Not extraction - benefit humanity</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <details className="bg-black border border-green-500/50 rounded-lg">
                                    <summary className="p-2 cursor-pointer hover:bg-green-500/10 transition-colors">
                                        <span className="text-green-400 font-bold text-xs font-mono">✓ STUDENTS FEEL IT INSTANTLY</span>
                                    </summary>
                                    <div className="p-3 pt-0 space-y-1 text-xs font-mono">
                                        <p className="text-gray-300">→ Import messy Excel → AI fixes it in 3 seconds</p>
                                        <p className="text-gray-300">→ Scribbled notes → Clean study guide instantly</p>
                                        <p className="text-gray-300">→ Works offline in lecture hall (no WiFi needed)</p>
                                        <p className="text-gray-300">→ Share with friend → They get it in 1 tap</p>
                                        <p className="text-cyan-400 font-bold mt-2">Not "maybe useful" - IMMEDIATELY saves hours of pain</p>
                                    </div>
                                </details>

                                <details className="bg-black border border-amber-500/50 rounded-lg">
                                    <summary className="p-2 cursor-pointer hover:bg-amber-500/10 transition-colors">
                                        <span className="text-amber-400 font-bold text-xs font-mono">💰 WHY TRILLION $ (NOT BILLION)</span>
                                    </summary>
                                    <div className="p-2 pt-0 space-y-1 text-[10px] font-mono">
                                        <p className="text-gray-300">735M students × £50-£200/year = £36B-£147B revenue potential</p>
                                        <p className="text-cyan-400">→ 20x multiple = £720B-£2.9T valuation potential</p>
                                        <p className="text-pink-400 font-bold mt-2">BUT building for LOVE not exit:</p>
                                        <p className="text-gray-300">→ Students FREE forever (never change)</p>
                                        <p className="text-gray-300">→ Companies pay fair (not exploitative)</p>
                                        <p className="text-gray-300">→ No investors owning Archie</p>
                                        <p className="text-green-400 font-bold mt-2">Trillion $ potential, choose £6M-£24M/year reality ♾️❤️♾️</p>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 8-BIT FOOTER */}
                {activeTab === null && (
                    <div className="text-center mt-12 space-y-4">
                        <div className="flex justify-center gap-2">
                            {[...Array(9)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-cyan-500"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 text-xs font-mono">Prof51 • Archie's company ♾️❤️😎</p>
                        <Prof51Icon8Bit size={24} animate={true} className="mx-auto" />
                    </div>
                )}
            </div>
        </div>
    );
}