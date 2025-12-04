import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Globe, Brain, Heart, Users, Sparkles, Award, Shield, Zap, Leaf, Calculator, Eye, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import P51Symbol from '@/components/shared/P51Symbol';

export default function TeachersPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            
            {/* HERO */}
            <div className="text-center py-16 px-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-6"
                >
                    <BookOpen className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                    For Teachers & Schools
                </h1>
                <p className="text-2xl text-white max-w-2xl mx-auto leading-relaxed mb-8">
                    Turn environmental action into real learning. Students clean their community, earn <P51Symbol showTooltip={false} /> tokens, and understand economics through experience.
                </p>
                
                {/* DIRECT AI51 LINK */}
                <Link 
                    to={createPageUrl('TalkToAI51')}
                    className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl font-bold text-xl transition-all shadow-lg text-white"
                >
                    <Brain className="w-6 h-6" />
                    Questions? Talk to AI51
                </Link>
                <p className="text-cyan-300 text-lg font-bold mt-3">Real-time help. Zero forms.</p>
            </div>

            {/* AI51 DESIGN PROTOCOLS */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50">
                    <CardContent className="p-8 text-center">
                        <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <h2 className="text-4xl font-black mb-6 text-white">Built Using AI51 Design Protocols</h2>
                        <p className="text-2xl mb-6 text-white">
                            Originally created to help <strong>1 in 10 children with dyslexia</strong> read and participate fully.
                        </p>
                        <p className="text-3xl font-bold text-cyan-300 mb-8">
                            But it helps ALL learners.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-cyan-400">
                                <h3 className="font-bold text-cyan-200 mb-3 text-xl">Dyslexia-Friendly</h3>
                                <p className="text-white text-lg">Clear fonts, high contrast</p>
                            </div>
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-blue-400">
                                <h3 className="font-bold text-blue-200 mb-3 text-xl">ADHD-Friendly</h3>
                                <p className="text-white text-lg">Minimal distractions, clear focus</p>
                            </div>
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-purple-400">
                                <h3 className="font-bold text-purple-200 mb-3 text-xl">Autism-Friendly</h3>
                                <p className="text-white text-lg">Predictable, visual structure</p>
                            </div>
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-green-400">
                                <h3 className="font-bold text-green-200 mb-3 text-xl">EAL-Friendly</h3>
                                <p className="text-white text-lg">Simple language, icons</p>
                            </div>
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-orange-400">
                                <h3 className="font-bold text-orange-200 mb-3 text-xl">Vision-Friendly</h3>
                                <p className="text-white text-lg">High contrast, screen reader support</p>
                            </div>
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-pink-400">
                                <h3 className="font-bold text-pink-200 mb-3 text-xl">Universal</h3>
                                <p className="text-white text-lg">Works for every student</p>
                            </div>
                        </div>

                        <p className="text-white italic text-xl">
                            "If it works for the most excluded, it works for everyone."
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* HOW IT WORKS */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h2 className="text-4xl font-black text-center mb-12 text-white">How It Works</h2>
                <div className="space-y-6">
                    <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-400">
                        <CardContent className="p-8 flex items-start gap-6">
                            <div className="flex-shrink-0 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                                <Leaf className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-4 text-white">1. Students Clean</h3>
                                <p className="text-white text-xl leading-relaxed">
                                    Students collect litter from school grounds, parks, or beaches. They take a photo of their work.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-400">
                        <CardContent className="p-8 flex items-start gap-6">
                            <div className="flex-shrink-0 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-4 text-white">2. AI51 Verifies</h3>
                                <p className="text-white text-xl leading-relaxed">
                                    Photo verified in under 1 second. Fraud-proof system. Backed by Shannon's mathematical framework.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-pink-900/40 to-rose-900/40 border-2 border-pink-400">
                        <CardContent className="p-8 flex items-start gap-6">
                            <div className="flex-shrink-0 w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center">
                                <Heart className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-4 text-white">3. Earn <P51Symbol showTooltip={false} /></h3>
                                <p className="text-white text-xl leading-relaxed">
                                    Instant <P51Symbol showTooltip={false} /> tokens. Students see real-world economics. They can save, donate, or use for school rewards.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* WHAT STUDENTS LEARN */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-4xl font-black text-center mb-12 text-white">What Students Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-400">
                        <CardContent className="p-6">
                            <Leaf className="w-12 h-12 text-green-300 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-white">Environmental Science</h3>
                            <ul className="space-y-2 text-white text-base">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Real-world impact of litter</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Ecosystem protection</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Personal responsibility</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Scientific method</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-2 border-purple-400">
                        <CardContent className="p-6">
                            <Zap className="w-12 h-12 text-purple-300 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-white">Economics & Maths</h3>
                            <ul className="space-y-2 text-white text-base">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <span>Earning and saving</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <span>Value and exchange</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <span>Measuring and weighing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <span>Community contribution</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-400">
                        <CardContent className="p-6">
                            <Users className="w-12 h-12 text-blue-300 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-white">Social Skills</h3>
                            <ul className="space-y-2 text-white text-base">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>Teamwork</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>Community engagement</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>Pride in contribution</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>Helping others</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border-2 border-cyan-400">
                        <CardContent className="p-6">
                            <Globe className="w-12 h-12 text-cyan-300 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-white">Digital Literacy</h3>
                            <ul className="space-y-2 text-white text-base">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Safe technology use</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Understanding verification</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Digital citizenship</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border-2 border-pink-400">
                        <CardContent className="p-6">
                            <Calculator className="w-12 h-12 text-pink-300 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-white">Practical Maths</h3>
                            <ul className="space-y-2 text-white text-base">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <span>Weight conversion (kg)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <span>Token calculations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <span>Percentages (90/10 split)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                                    <span>Data analysis</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-400">
                        <CardContent className="p-6">
                            <Award className="w-12 h-12 text-amber-300 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-white">Life Skills</h3>
                            <ul className="space-y-2 text-white text-base">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <span>Taking initiative</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <span>Responsibility</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <span>Goal setting</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <span>Community care</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* CHILD SAFETY FIRST */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Card className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 border-2 border-rose-400">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Shield className="w-16 h-16 text-rose-300" />
                            <h2 className="text-4xl font-black text-white">Child Safety First</h2>
                        </div>
                        <p className="text-xl mb-6 text-white">
                            We take child protection seriously. Our platform is designed with safeguarding at its core.
                        </p>
                        <div className="space-y-4 text-white">
                            <div className="flex items-start gap-4">
                                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <p className="text-lg"><strong>GDPR compliant:</strong> All data processing follows UK and EU regulations.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <p className="text-lg"><strong>Age-appropriate:</strong> Designed for children aged 5-14 with parent/teacher oversight.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <p className="text-lg"><strong>No personal data shared:</strong> Students are identified by school ID only.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <p className="text-lg"><strong>Teacher control:</strong> Full oversight and approval system.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                <p className="text-lg"><strong>Open source:</strong> Code is transparent and auditable.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* VERIFIED BY AI51 */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-2 border-purple-400">
                    <CardContent className="p-8 text-center">
                        <Shield className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                        <h2 className="text-4xl font-black mb-6 text-white">Verified by AI51</h2>
                        <p className="text-xl mb-8 text-white leading-relaxed">
                            Every cleanup is verified in under 1 second using advanced fraud detection. Built on Shannon's mathematical framework.
                        </p>
                        
                        <div className="bg-black/40 rounded-xl p-8 mb-6 text-left border-2 border-purple-400">
                            <h3 className="text-2xl font-bold mb-6 text-purple-200">How Verification Works:</h3>
                            <div className="space-y-4 text-white">
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">Photo compared against image database</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">GPS coordinates checked</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">Pattern analysis detects suspicious activity</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">Blockchain record (cannot be altered)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-xl p-8 text-left border-2 border-green-400">
                            <h3 className="text-2xl font-bold mb-6 text-green-200">Why It's Secure:</h3>
                            <div className="space-y-4 text-white">
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">Shannon's Theorem (1948) - proven mathematics</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">99.9% accurate fraud detection</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">Court-defensible verification</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <p className="text-lg">Cannot be manipulated</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* VISUAL TEACHING GUIDES */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-400">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Eye className="w-16 h-16 text-green-300" />
                            <h2 className="text-4xl font-black text-white">Visual Teaching Guides</h2>
                        </div>
                        <p className="text-xl mb-8 text-white">
                            Show your students why good design matters. Project these examples on your classroom screen.
                        </p>
                        
                        <div className="space-y-8">
                            <div className="bg-black/60 rounded-xl p-8 border-2 border-cyan-400">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                    <BookOpen className="w-8 h-8 text-cyan-400" />
                                    Why This Text Works
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-red-900/40 rounded-xl p-6 border-2 border-red-400">
                                        <p className="text-red-200 font-bold mb-4 text-xl flex items-center gap-2">
                                            <X className="w-5 h-5" /> HARD TO READ:
                                        </p>
                                        <p className="text-gray-300 text-base" style={{ fontFamily: 'serif', textAlign: 'justify' }}>
                                            Students collect litter from their local environment and document their work through photographs which are then verified using our advanced artificial intelligence systems.
                                        </p>
                                        <p className="text-sm text-gray-400 mt-4">Small serif font, low contrast, justified text, complex words</p>
                                    </div>
                                    <div className="bg-green-900/40 rounded-xl p-6 border-2 border-green-400">
                                        <p className="text-green-200 font-bold mb-4 text-xl flex items-center gap-2">
                                            <Check className="w-5 h-5" /> EASY TO READ:
                                        </p>
                                        <p className="text-white text-lg">
                                            Students clean local areas. They take a photo. AI verifies it in under 1 second.
                                        </p>
                                        <p className="text-sm text-gray-300 mt-4">Large sans-serif font, high contrast, left-aligned, simple words</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/60 rounded-xl p-8 border-2 border-purple-400">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                    <Sparkles className="w-8 h-8 text-purple-400" />
                                    Icons + Words = Universal
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-red-900/40 rounded-xl p-6 border-2 border-red-400">
                                        <p className="text-red-200 font-bold mb-4 text-xl flex items-center gap-2">
                                            <X className="w-5 h-5" /> TEXT ONLY:
                                        </p>
                                        <div className="space-y-3">
                                            <div className="bg-gray-700 rounded-lg p-3 text-center text-base text-white">Submit Your Work</div>
                                            <div className="bg-gray-700 rounded-lg p-3 text-center text-base text-white">View Results</div>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-4">Relies on reading ability only</p>
                                    </div>
                                    <div className="bg-green-900/40 rounded-xl p-6 border-2 border-green-400">
                                        <p className="text-green-200 font-bold mb-4 text-xl flex items-center gap-2">
                                            <Check className="w-5 h-5" /> ICON + TEXT:
                                        </p>
                                        <div className="space-y-3">
                                            <div className="bg-green-600 rounded-lg p-3 flex items-center justify-center gap-2 text-base text-white">
                                                <Leaf className="w-5 h-5" /> Submit Your Work
                                            </div>
                                            <div className="bg-blue-600 rounded-lg p-3 flex items-center justify-center gap-2 text-base text-white">
                                                <Check className="w-5 h-5" /> View Results
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-4">Visual + text works for all learning styles</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/60 rounded-xl p-8 border-2 border-blue-400">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                    <Eye className="w-8 h-8 text-blue-400" />
                                    Color Contrast Matters
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-400 rounded-xl p-6">
                                        <p className="text-red-600 font-bold mb-4 text-xl flex items-center gap-2">
                                            <X className="w-5 h-5" /> LOW CONTRAST:
                                        </p>
                                        <p className="text-gray-500 text-base">
                                            This gray text on gray background is very hard to read, especially with dyslexia or vision challenges.
                                        </p>
                                    </div>
                                    <div className="bg-black rounded-xl p-6 border-2 border-green-400">
                                        <p className="text-green-200 font-bold mb-4 text-xl flex items-center gap-2">
                                            <Check className="w-5 h-5" /> HIGH CONTRAST:
                                        </p>
                                        <p className="text-white text-base">
                                            White text on black background is easy to read for everyone. Clear and comfortable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-base text-white mt-8 text-center leading-relaxed">
                            These examples are from our actual platform. Every screen follows these AI51 design protocols.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* TALK TO AI51 CTA */}
            <div className="max-w-2xl mx-auto px-6 py-12 text-center">
                <Card className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-400">
                    <CardContent className="p-8">
                        <Sparkles className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                        <h2 className="text-4xl font-black mb-6 text-white">Questions? Talk to AI51</h2>
                        <p className="text-xl mb-8 text-white">
                            Instant answers. No forms. No waiting.
                        </p>
                        <Link 
                            to={createPageUrl('TalkToAI51')}
                            className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl font-bold text-2xl transition-all shadow-lg text-white"
                        >
                            <Brain className="w-7 h-7" />
                            Talk to AI51 Now
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* FOOTER */}
            <div className="text-center py-12 px-6 border-t border-white/10">
                <p className="text-gray-400 text-lg">
                    © 2025 UniversalFrequency51 • Open source educational initiative
                </p>
            </div>
        </div>
    );
}