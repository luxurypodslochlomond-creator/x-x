import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, Heart, Users, Lock, Eye, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function COPPACompliancePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="inline-block p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border-2 border-purple-500/50"
                    >
                        <Shield className="w-16 h-16 text-purple-300" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                        Child Safety & Data Protection
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        How we protect children's privacy and safety - UK, Scotland, and International compliance
                    </p>
                </header>

                {/* BACK TO TEACHERS */}
                <div className="text-center">
                    <Link to={createPageUrl("Teachers")}>
                        <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30">
                            ← Back to Teachers Page
                        </Button>
                    </Link>
                </div>

                {/* UK/SCOTLAND COMPLIANCE - NEW SECTION */}
                <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-2 border-blue-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                            <Globe className="w-8 h-8 text-blue-400" />
                            UK & Scotland Compliance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                            For schools in Scotland (like Gartocharn Primary), we comply with all UK and Scottish regulations:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="bg-black/40 p-6 rounded-xl border border-blue-500/30">
                                <h4 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-blue-400" />
                                    UK GDPR Compliance
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                    We fully comply with UK GDPR and the Data Protection Act 2018:
                                </p>
                                <ul className="text-gray-300 text-sm space-y-2 pl-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span><strong className="text-white">Lawful basis:</strong> Legitimate educational interest with school consent</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span><strong className="text-white">Data minimization:</strong> We only collect what's necessary</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span><strong className="text-white">Right to be forgotten:</strong> Parents can request deletion anytime</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span><strong className="text-white">Data portability:</strong> Parents can request their child's data</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-purple-500/30">
                                <h4 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-purple-400" />
                                    ICO Registration
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    We are registered with the UK Information Commissioner's Office (ICO) and follow their guidance on:
                                </p>
                                <ul className="text-gray-300 text-sm space-y-2 pl-4 mt-3">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Children's data protection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Educational data processing</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Parental consent mechanisms</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Data breach protocols</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-green-500/30">
                                <h4 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                    Scottish Education Alignment
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                    Our program aligns with Scottish education frameworks:
                                </p>
                                <ul className="text-gray-300 text-sm space-y-2 pl-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span><strong className="text-white">GIRFEC:</strong> Getting It Right For Every Child principles</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span><strong className="text-white">Curriculum for Excellence:</strong> Health & Wellbeing outcomes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span><strong className="text-white">Local Authority:</strong> West Dunbartonshire Council guidelines</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span><strong className="text-white">Eco-Schools Scotland:</strong> Environmental education standards</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-cyan-500/30">
                                <h4 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                                    Keeping Children Safe
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                    We follow UK statutory guidance "Keeping Children Safe in Education":
                                </p>
                                <ul className="text-gray-300 text-sm space-y-2 pl-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1">•</span>
                                        <span>No direct contact between children and strangers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1">•</span>
                                        <span>All activities supervised by teachers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1">•</span>
                                        <span>Age-appropriate content only</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 mt-1">•</span>
                                        <span>Clear safeguarding protocols</span>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6 mt-6">
                            <h4 className="font-bold text-white text-xl mb-3 text-center">For Scottish Teachers:</h4>
                            <p className="text-gray-300 leading-relaxed text-center">
                                We've worked to ensure UF51 fits within your existing frameworks. You don't need special permissions - 
                                this is an educational resource that supports your curriculum goals while meeting all UK and Scottish 
                                data protection requirements.
                            </p>
                            <p className="text-cyan-300 text-sm text-center mt-4">
                                Questions about Scottish compliance? Email: <a href="mailto:family@uf51.love" className="underline">family@uf51.love</a>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* WHAT IS COPPA - RELABELED FOR CONTEXT */}
                <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">US Compliance (COPPA)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        <p>
                            For context, here's how we comply with US child protection law (COPPA):
                        </p>
                        <p>
                            The <strong className="text-white">Children's Online Privacy Protection Act (COPPA)</strong> is a U.S. federal law designed to protect the privacy of children under 13 years old online.
                        </p>
                        <p>
                            It requires websites and online services to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>Obtain verifiable parental consent before collecting data from children</li>
                            <li>Clearly explain what information is collected and how it's used</li>
                            <li>Not require children to provide more information than necessary</li>
                            <li>Keep children's information secure</li>
                            <li>Delete children's information upon parent request</li>
                        </ul>
                        <p className="text-sm text-gray-400 italic pt-4">
                            Note: COPPA is US law, but its principles align closely with UK GDPR requirements for children's data.
                        </p>
                    </CardContent>
                </Card>

                {/* HOW WE COMPLY - UNIVERSAL PRINCIPLES */}
                <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            Universal Protection Principles
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-gray-300 text-center text-lg">
                            Regardless of jurisdiction, here's how we protect every child:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="bg-black/40 p-6 rounded-xl border border-green-500/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-8 h-8 text-green-400" />
                                    <h3 className="text-xl font-bold text-white">School-Based Accounts</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Student accounts are created and managed by schools or teachers, not by children themselves. This ensures proper supervision and parental awareness.
                                </p>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-cyan-500/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lock className="w-8 h-8 text-cyan-400" />
                                    <h3 className="text-xl font-bold text-white">Minimal Data Collection</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    We only collect what's necessary: cleanup photos, location (general area only), and weight measurements. No personal identifying information beyond what the school provides.
                                </p>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-purple-500/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Eye className="w-8 h-8 text-purple-400" />
                                    <h3 className="text-xl font-bold text-white">Parental Transparency</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Schools inform parents about the program through consent forms. Parents can request their child's data or opt-out at any time.
                                </p>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-pink-500/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-8 h-8 text-pink-400" />
                                    <h3 className="text-xl font-bold text-white">Data Security</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    All data is encrypted and stored securely. We never sell or share children's data with third parties. Period.
                                </p>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* WHAT WE DON'T DO */}
                <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-2 border-red-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">What We DON'T Do</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-lg">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-red-400 font-bold text-xl">✗</span>
                                </div>
                                <div>
                                    <strong className="text-white">We don't collect personal identifiable information</strong>
                                    <p className="text-gray-300">No names, emails, phone numbers, or addresses from children.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-red-400 font-bold text-xl">✗</span>
                                </div>
                                <div>
                                    <strong className="text-white">We don't use targeted advertising</strong>
                                    <p className="text-gray-300">No ads at all. No tracking children's behavior for marketing.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-red-400 font-bold text-xl">✗</span>
                                </div>
                                <div>
                                    <strong className="text-white">We don't enable direct messaging or social features</strong>
                                    <p className="text-gray-300">Children cannot communicate with strangers on our platform.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-red-400 font-bold text-xl">✗</span>
                                </div>
                                <div>
                                    <strong className="text-white">We don't sell data - ever</strong>
                                    <p className="text-gray-300">Children's information is sacred. It's never monetized.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FOR PARENTS */}
                <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                            <Heart className="w-8 h-8 text-pink-400" />
                            For Parents
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        <p>
                            If your child's school is participating in UF51, you have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong className="text-white">Review</strong> what information has been collected about your child</li>
                            <li><strong className="text-white">Request deletion</strong> of your child's data at any time</li>
                            <li><strong className="text-white">Opt-out</strong> of the program without penalty</li>
                            <li><strong className="text-white">Ask questions</strong> about how data is used and protected</li>
                            <li><strong className="text-white">Receive a copy</strong> of your child's data (data portability)</li>
                        </ul>
                        <div className="bg-pink-900/30 border border-pink-500/30 rounded-xl p-6 mt-6">
                            <p className="text-white font-bold text-xl mb-2">Questions or Concerns?</p>
                            <p>
                                Contact us anytime at <a href="mailto:family@uf51.love" className="text-pink-300 hover:underline font-bold">family@uf51.love</a>
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                We respond to all parent inquiries within 24 hours.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* BACK TO TEACHERS */}
                <div className="text-center">
                    <Link to={createPageUrl("Teachers")}>
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-lg px-8 py-4">
                            ← Back to Teachers Page
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}