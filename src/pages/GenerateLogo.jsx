import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';

export default function GenerateLogoPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [logoUrl, setLogoUrl] = useState(null);
    const [error, setError] = useState(null);

    const generateLogo = async () => {
        setIsGenerating(true);
        setError(null);
        
        try {
            const result = await base44.integrations.Core.GenerateImage({
                prompt: "8-bit pixel art logo design: hot pink pixel heart with cyan outline, 'UF51' text in bold white pixels in the center, retro video game style from 1980s NES era, clean simple design, black transparent background, square format 512x512px, sharp pixel edges, no gradients, pure pixel art aesthetic"
            });
            
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
                    <h1 className="text-5xl font-black text-white">8-BIT LOGO GENERATOR</h1>
                    <p className="text-xl text-cyan-400">One click = custom UF51 logo ♾️❤️♾️</p>
                </div>

                {/* GENERATOR */}
                <Card className="bg-gradient-to-br from-pink-900/60 to-purple-900/60 border-4 border-pink-500 rounded-2xl">
                    <CardContent className="p-8 space-y-6">
                        
                        {!logoUrl && !isGenerating && (
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
                                    GENERATE LOGO
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
                    <p className="text-pink-400 font-bold">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}