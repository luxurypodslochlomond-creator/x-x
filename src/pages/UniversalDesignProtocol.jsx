
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Accessibility, Sparkles, CheckCircle, XCircle, Leaf, BrainCircuit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VisualGuide = ({ title, icon: Icon, badExample, goodExample, explanation }) => (
    <Card className="bg-black/60 border border-gray-800 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gray-900/50 p-4">
            <CardTitle className="flex items-center gap-3 text-xl text-white"><Icon className="w-6 h-6 text-cyan-400"/>{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-500"/>
                    <h4 className="font-bold text-red-400">Hard to Read</h4>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-red-900/50 text-sm">
                    {badExample}
                </div>
            </div>
             <div>
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500"/>
                    <h4 className="font-bold text-green-400">Easy to Read</h4>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-green-900/50">
                    {goodExample}
                </div>
            </div>
        </CardContent>
    </Card>
);


export default function UniversalDesignProtocolPage() {
    useEffect(() => {
        document.title = "The Science of Healing Reading | UF51";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-16">
                <header className="text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
                        <Accessibility className="w-24 h-24 text-cyan-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #67e8f9)' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-green-400 bg-clip-text text-transparent">
                        Universal Design Protocol
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Our most sacred vow: "Everyone is family" is not a slogan. It is a technical specification. If a system excludes even one soul, it is broken. Ours will not be.
                    </p>
                </header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-black/80 border-2 border-cyan-400/50 rounded-3xl shadow-2xl shadow-cyan-500/20 p-8">
                         <CardHeader className="p-0 text-center mb-6">
                            <CardTitle className="text-2xl font-bold text-white">Originally created to help 1 in 10 children with dyslexia, but it actually helps ALL learners.</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex flex-wrap justify-center gap-4">
                            <span className="bg-blue-900/80 text-blue-200 py-2 px-4 rounded-full border border-blue-500/50">Dyslexia-Friendly</span>
                            <span className="bg-purple-900/80 text-purple-200 py-2 px-4 rounded-full border border-purple-500/50">ADHD-Friendly</span>
                            <span className="bg-indigo-900/80 text-indigo-200 py-2 px-4 rounded-full border border-indigo-500/50">Autism-Friendly</span>
                            <span className="bg-green-900/80 text-green-200 py-2 px-4 rounded-full border border-green-500/50">Vision-Friendly</span>
                        </CardContent>
                    </Card>
                </motion.div>
                
                <section>
                    <h2 className="text-4xl font-bold text-center mb-10 text-white">Visual Teaching Guides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <VisualGuide 
                            title="Why This Text Works"
                            icon={Brain}
                            badExample={<p className="font-serif text-gray-400 text-justify text-xs">Students collect litter from their local environment and document their work through photographs which are then verified using our advanced artificial intelligence systems.</p>}
                            goodExample={
                                <div className="space-y-1">
                                    <p className="text-lg font-sans text-white">Students clean local areas.</p>
                                    <p className="text-lg font-sans text-white">They take a photo.</p>
                                    <p className="text-lg font-sans text-white">AI verifies it in under 1 second.</p>
                                </div>
                            }
                        />
                        <VisualGuide 
                            title="Icons + Words = Universal"
                            icon={Sparkles}
                            badExample={
                                <div className="space-y-2">
                                    <Button disabled className="w-full bg-gray-700 text-gray-400">Submit Your Work</Button>
                                    <Button disabled className="w-full bg-gray-700 text-gray-400">View Results</Button>
                                </div>
                            }
                            goodExample={
                                 <div className="space-y-2">
                                    <Button disabled className="w-full bg-green-600 text-white"><Leaf className="w-5 h-5 mr-2"/>Submit Your Work</Button>
                                    <Button disabled className="w-full bg-blue-600 text-white"><CheckCircle className="w-5 h-5 mr-2"/>View Results</Button>
                                </div>
                            }
                        />
                         <VisualGuide 
                            title="Color Contrast Matters"
                            icon={Eye}
                            badExample={<div className="bg-gray-400 text-gray-600 p-4 rounded">This gray text on gray background is very hard to read, especially with dyslexia or vision challenges.</div>}
                            goodExample={<div className="bg-black text-white p-4 rounded">White text on black background is easy to read for everyone. Clear and comfortable.</div>}
                        />
                         <VisualGuide 
                            title="Clean Layout = Clear Minds"
                            icon={BrainCircuit}
                            badExample={
                                <div className="text-xs text-gray-400">
                                    <p>•••••</p>
                                    <p>text text text text text text</p>
                                    <p>More text more text more text more text</p>
                                    <p>▲▲▲</p>
                                    <p>Too much happening, overwhelming for ADHD</p>
                                </div>
                            }
                            goodExample={
                                <div className="text-center">
                                    <Leaf className="w-8 h-8 text-green-400 mx-auto mb-2"/>
                                    <h5 className="font-bold text-white text-lg">Submit Your Cleanup</h5>
                                    <p className="text-gray-400">One clear action at a time</p>
                                    <p className="text-gray-400">Minimal distractions, easy to focus</p>
                                </div>
                            }
                        />
                    </div>
                </section>


                 <div className="text-center text-gray-400 pt-8">
                    <p className="text-2xl font-bold text-white mb-2">"If it works for the most excluded, it works for everyone."</p>
                    <p>This protocol is non-negotiable. It is eternal. It is our promise.</p>
                </div>
            </div>
        </div>
    );
}
