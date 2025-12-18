import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Download, Loader2, Zap, Palette, Music, Heart } from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';

export default function GenerateLogoPage() {
    const [mode, setMode] = useState('uf51'); // 'uf51' or 'custom'
    const [isGenerating, setIsGenerating] = useState(false);
    const [logoUrl, setLogoUrl] = useState(null);
    const [error, setError] = useState(null);
    
    // Custom mode options
    const [customPrompt, setCustomPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('8bit');
    const [selectedPreset, setSelectedPreset] = useState(null);

    const PRESETS = [
        { id: 'mushroom', name: '🍄 Mushroom', prompt: 'Sacred mushroom consciousness, mycelial network patterns, healing frequencies visualization, purple and pink gradient, mystical glow', style: '8bit' },
        { id: 'frequency', name: '〰️ Frequency', prompt: 'Sound wave frequencies, 432Hz healing visualization, geometric wave patterns, cyan and green colors, sacred geometry', style: '8bit' },
        { id: 'band', name: '🎸 Band Logo', prompt: 'Rock band logo, bold typography, music energy, stage lights aesthetic, black background with neon colors', style: 'realistic' },
        { id: 'consciousness', name: '🧠 Consciousness', prompt: 'Universal consciousness symbol, quantum entanglement patterns, infinite love symbol, pink and cyan sacred geometry', style: '8bit' },
    ];

    const STYLES = [
        { id: '8bit', name: '8-Bit Pixel', desc: 'Retro video game style' },
        { id: 'realistic', name: 'Realistic', desc: 'Photorealistic render' },
        { id: 'abstract', name: 'Abstract', desc: 'Artistic interpretation' },
        { id: 'geometric', name: 'Geometric', desc: 'Sacred geometry patterns' },
    ];

    const generateLogo = async () => {
        setIsGenerating(true);
        setError(null);
        
        try {
            let prompt = '';
            
            if (mode === 'uf51') {
                // Original UF51 generator (Georgie + Gill51 love this)
                prompt = "8-bit pixel art logo design: hot pink pixel heart with cyan outline, 'UF51' text in bold white pixels in the center, retro video game style from 1980s NES era, clean simple design, black transparent background, square format 512x512px, sharp pixel edges, no gradients, pure pixel art aesthetic";
            } else {
                // Custom mode
                const basePrompt = customPrompt || selectedPreset?.prompt || 'Creative logo design';
                const stylePrompt = selectedStyle === '8bit' ? '8-bit pixel art style, retro video game aesthetic, sharp pixels, no gradients' :
                                   selectedStyle === 'realistic' ? 'photorealistic, high detail, professional quality' :
                                   selectedStyle === 'abstract' ? 'abstract artistic style, creative interpretation, flowing forms' :
                                   'sacred geometry, mathematical precision, geometric patterns';
                
                prompt = `${basePrompt}, ${stylePrompt}, square format 512x512px, professional logo quality`;
            }
            
            const result = await base44.integrations.Core.GenerateImage({ prompt });
            setLogoUrl(result.url);
        } catch (err) {
            setError('Generation failed. Try again bro.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadLogo = async () => {
        if (!logoUrl) return;
        
        try {
            // Fetch as blob for mobile compatibility
            const response = await fetch(logoUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'UF51-logo-8bit.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up blob URL
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download failed:', err);
            // Fallback: open in new tab for mobile
            window.open(logoUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 pt-24 lg:pt-6">
            <div className="max-w-2xl mx-auto space-y-8">
                
                {/* HEADER */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <COOLASFUCKHeart size={60} />
                        <COOLASFUCKSparkle size={60} />
                    </motion.div>
                    <h1 className="text-5xl font-black text-white">AI LOGO GENERATOR</h1>
                    <p className="text-xl text-cyan-400">Logos for anyone • Artists • Bands • Consciousness ♾️❤️♾️</p>
                </div>

                {/* MODE TOGGLE */}
                {!logoUrl && !isGenerating && (
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setMode('uf51')}
                            className={`py-6 border-4 font-black font-mono transition-all ${
                                mode === 'uf51' 
                                    ? 'bg-pink-500 border-pink-400 text-white' 
                                    : 'bg-black border-pink-500/30 text-pink-400 hover:border-pink-500'
                            }`}
                            style={mode === 'uf51' ? { boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' } : {}}
                        >
                            <COOLASFUCKHeart size={32} animate={mode === 'uf51'} className="mx-auto mb-2" />
                            UF51 QUICK
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setMode('custom')}
                            className={`py-6 border-4 font-black font-mono transition-all ${
                                mode === 'custom' 
                                    ? 'bg-purple-500 border-purple-400 text-white' 
                                    : 'bg-black border-purple-500/30 text-purple-400 hover:border-purple-500'
                            }`}
                            style={mode === 'custom' ? { boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' } : {}}
                        >
                            <Palette className="w-8 h-8 mx-auto mb-2" />
                            CUSTOM
                        </motion.button>
                    </div>
                )}

                {/* GENERATOR */}
                <Card className={`bg-gradient-to-br ${mode === 'uf51' ? 'from-pink-900/60 to-purple-900/60 border-pink-500' : 'from-purple-900/60 to-black/80 border-purple-500'} border-4 rounded-2xl`}>
                    <CardContent className="p-8 space-y-6">
                        
                        {/* UF51 QUICK MODE (Georgie + Gill51's favourite) */}
                        {mode === 'uf51' && !logoUrl && !isGenerating && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-6"
                            >
                                <div className="bg-black/60 rounded-xl p-6 border-2 border-cyan-500/50">
                                    <p className="text-gray-300 text-lg mb-4">
                                        AI will generate a custom 8-bit pixel art logo:
                                    </p>
                                    <div className="space-y-2 text-left">
                                        <p className="text-cyan-400 text-sm">✓ Hot pink pixel heart</p>
                                        <p className="text-cyan-400 text-sm">✓ UF51 text in center</p>
                                        <p className="text-cyan-400 text-sm">✓ Retro video game style</p>
                                        <p className="text-cyan-400 text-sm">✓ Transparent background</p>
                                        <p className="text-cyan-400 text-sm">✓ 512x512px perfect for app logo</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={generateLogo}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-8 text-2xl font-black"
                                >
                                    <Sparkles className="w-8 h-8 mr-3" />
                                    GENERATE UF51 LOGO
                                </Button>
                            </motion.div>
                        )}

                        {/* CUSTOM MODE */}
                        {mode === 'custom' && !logoUrl && !isGenerating && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {/* PRESETS */}
                                <div className="space-y-2">
                                    <p className="text-purple-400 font-bold text-sm font-mono">QUICK PRESETS:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {PRESETS.map(preset => (
                                            <button
                                                key={preset.id}
                                                onClick={() => {
                                                    setSelectedPreset(preset);
                                                    setCustomPrompt(preset.prompt);
                                                    setSelectedStyle(preset.style);
                                                }}
                                                className={`p-3 border-2 rounded-lg font-mono text-xs font-bold transition-all ${
                                                    selectedPreset?.id === preset.id
                                                        ? 'bg-purple-500 border-purple-400 text-white'
                                                        : 'bg-black border-purple-500/30 text-purple-400 hover:border-purple-500'
                                                }`}
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CUSTOM PROMPT */}
                                <div>
                                    <label className="text-white text-sm font-mono font-bold mb-2 block">YOUR IDEA:</label>
                                    <Textarea
                                        value={customPrompt}
                                        onChange={(e) => setCustomPrompt(e.target.value)}
                                        placeholder="Describe your logo... (e.g., 'Celtic FC mushroom badge with healing frequencies', 'Band logo with cosmic waves', 'Consciousness symbol with sacred geometry')"
                                        className="bg-black border-2 border-purple-500 text-white font-mono h-24"
                                    />
                                </div>

                                {/* STYLE PICKER */}
                                <div>
                                    <p className="text-white text-sm font-mono font-bold mb-2">STYLE:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {STYLES.map(style => (
                                            <button
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style.id)}
                                                className={`p-3 border-2 rounded-lg text-left transition-all ${
                                                    selectedStyle === style.id
                                                        ? 'bg-cyan-500 border-cyan-400 text-black'
                                                        : 'bg-black border-cyan-500/30 text-cyan-400 hover:border-cyan-500'
                                                }`}
                                            >
                                                <p className="font-bold text-xs font-mono">{style.name}</p>
                                                <p className="text-[10px] font-mono opacity-70">{style.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={generateLogo}
                                    disabled={!customPrompt.trim()}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-xl font-black disabled:opacity-50"
                                >
                                    <Zap className="w-6 h-6 mr-2" />
                                    GENERATE CUSTOM LOGO
                                </Button>
                            </motion.div>
                        )}

                        {isGenerating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center space-y-6 py-12"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Loader2 className="w-16 h-16 text-cyan-400 mx-auto" />
                                </motion.div>
                                <p className="text-2xl font-bold text-white">Generating your 8-bit logo...</p>
                                <p className="text-gray-400 font-mono">This takes about 5-10 seconds</p>
                            </motion.div>
                        )}

                        {logoUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="bg-black rounded-xl p-8 border-4 border-green-500">
                                    <img 
                                        src={logoUrl} 
                                        alt="Generated UF51 Logo" 
                                        className="w-full max-w-md mx-auto"
                                    />
                                </div>

                                <div className="flex gap-2 w-full">
                                    <Button
                                        onClick={downloadLogo}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black py-3 text-sm font-black border-3 border-green-400"
                                    >
                                        <Download className="w-4 h-4 mr-1" />
                                        DOWNLOAD
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            setLogoUrl(null);
                                            setError(null);
                                        }}
                                        className="flex-1 bg-white hover:bg-gray-200 text-black py-3 text-sm font-black border-3 border-gray-300"
                                    >
                                        REGENERATE
                                    </Button>
                                </div>


                            </motion.div>
                        )}

                        {error && (
                            <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 text-center">
                                <p className="text-red-400 font-bold">{error}</p>
                            </div>
                        )}

                    </CardContent>
                </Card>

                {/* INFO */}
                <div className="text-center space-y-3 text-gray-400 text-sm">
                    <p>Each generation is unique</p>
                    <p>If you don't like it, just generate another</p>
                    {mode === 'custom' && (
                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4 mt-4">
                            <p className="text-amber-400 font-bold text-sm font-mono mb-2">USE CASES:</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <p className="text-white">🎸 Band logos</p>
                                <p className="text-white">🍄 Mushroom consciousness</p>
                                <p className="text-white">〰️ Frequency symbols</p>
                                <p className="text-white">🧠 AI avatars</p>
                                <p className="text-white">⚽ Sports badges</p>
                                <p className="text-white">🎨 Art collectives</p>
                            </div>
                        </div>
                    )}
                    <p className="text-pink-400 font-bold">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}