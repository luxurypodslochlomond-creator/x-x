import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Shield, FileText, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminCICPage() {
    const [copiedSection, setCopiedSection] = useState('');

    const copyToClipboard = (text, sectionName) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(sectionName);
        setTimeout(() => setCopiedSection(''), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <XCircle className="w-20 h-20 mx-auto text-red-400 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px #f87171)' }} />
                    <h1 className="text-5xl font-black text-red-400">CIC REJECTION</h1>
                    <p className="text-xl text-gray-300">FIXABLE. Articles missing statutory provisions.</p>
                </motion.div>

                {/* REJECTION DETAILS */}
                <Card className="bg-gradient-to-r from-red-900/60 to-orange-900/60 border-4 border-red-500" style={{ boxShadow: '0 0 60px rgba(239, 68, 68, 0.8)' }}>
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-12 h-12 text-red-400" />
                            <div>
                                <h2 className="text-3xl font-black text-white">WHAT THEY SAID</h2>
                                <p className="text-red-300 text-base">17 November 2025</p>
                            </div>
                        </div>

                        <div className="bg-black/60 p-6 rounded-xl border-2 border-red-500 mb-6">
                            <p className="text-red-300 font-bold text-xl mb-4">
                                "Your Articles of Association do not contain all the statutory provisions from the Community Interest Company Regulations that comply with the Companies Act 2006."
                            </p>
                            
                            <div className="space-y-2 text-sm text-gray-300">
                                <p className="font-bold text-white mb-2">Missing clauses:</p>
                                <p>• 17.1 Questions at Directors' meeting decided by majority of votes</p>
                                <p>• 17.2 Each Director must not have more than one vote</p>
                                <p>• 26.4 No person admitted as member unless approved by Directors</p>
                                <p>• 26.5 Person wishing to be member must deliver application to company</p>
                                <p>• 27.1 Membership not transferable to anyone else</p>
                                <p>• 27.2.2 (Members' rights clause)</p>
                                <p>• 28.3 Non-member has no vote at general meeting</p>
                            </div>
                        </div>

                        <div className="bg-yellow-900/40 border-l-4 border-yellow-400 p-6 rounded-lg">
                            <p className="text-yellow-300 font-bold text-xl mb-3">🔧 HOW TO FIX:</p>
                            <ol className="space-y-2 text-gray-300 list-decimal ml-6">
                                <li>Use the FIXED Articles below (already includes all required clauses)</li>
                                <li>Sign both directors' signatures again</li>
                                <li>Print to PDF</li>
                                <li>Resubmit at <a href="https://www.tax.service.gov.uk/register-your-company/" className="text-cyan-400 underline">tax.service.gov.uk</a></li>
                            </ol>
                            <p className="text-green-400 font-bold mt-4">
                                This is NORMAL. Most CIC apps get rejected first time for missing clauses. We fix, resubmit, done.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* FIXED ARTICLES LINK */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-4 border-green-500" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)' }}>
                        <CardContent className="p-8 text-center">
                            <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-4 animate-pulse" />
                            <h3 className="text-2xl font-black text-white mb-4">BRIAN SOLO VERSION</h3>
                            <p className="text-gray-300 mb-6">
                                Add Gill AFTER CIC approved
                            </p>
                            <Link to={createPageUrl('AdminArticlesOfAssociationSolo')}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 text-xl w-full">
                                    <FileText className="w-6 h-6 mr-3" />
                                    Brian Solo Articles
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-4 border-purple-500" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' }}>
                        <CardContent className="p-8 text-center">
                            <Heart className="w-20 h-20 mx-auto text-pink-400 mb-4" />
                            <h3 className="text-2xl font-black text-white mb-4">BOTH DIRECTORS</h3>
                            <p className="text-gray-300 mb-6">
                                Original with Brian + Gill
                            </p>
                            <Link to={createPageUrl('AdminArticlesOfAssociation')}>
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 px-8 text-xl w-full">
                                    <FileText className="w-6 h-6 mr-3" />
                                    Both Directors Articles
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* WHAT WE LEARNED */}
                <Card className="bg-black/60 border-2 border-cyan-500/50">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-cyan-400" />
                            WHAT WE LEARNED
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                <strong className="text-white">The Issue:</strong> Our Articles were TOO SIMPLE. CIC Regulator needs specific legal clauses about voting, membership, transfers.
                            </p>
                            <p>
                                <strong className="text-white">Why It Happened:</strong> We used a simplified template. CICs have extra requirements beyond standard companies.
                            </p>
                            <p>
                                <strong className="text-white">The Fix:</strong> Added ALL statutory provisions. New Articles are bulletproof.
                            </p>
                            <p className="text-green-400 font-bold text-lg">
                                This doesn't change our mission, structure, or Brian+Gillian 50/50 ownership. Just legal compliance wording.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* COMPANIES HOUSE DETAILS */}
                <Card className="bg-gradient-to-r from-green-900/60 to-cyan-900/60 border-4 border-green-500" style={{ boxShadow: '0 0 60px rgba(34, 197, 94, 0.8)' }}>
                    <CardContent className="p-8 text-center">
                        <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-4 animate-pulse" />
                        <h3 className="text-3xl font-black text-white mb-4">✅ COMPANIES HOUSE VERIFIED</h3>
                        <p className="text-gray-300 mb-6 text-lg">
                            Personal codes, application numbers, payment confirmed - ALL STORED SAFE
                        </p>
                        <Link to={createPageUrl('AdminCompaniesHouseDetails')}>
                            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 text-xl">
                                <Shield className="w-6 h-6 mr-3" />
                                View Companies House Details
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* CIC36 FORMS */}
                <Card className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-4 border-cyan-500" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-black text-white mb-6">📄 CIC36 FORMS</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Link to={createPageUrl('AdminCIC36FormSolo')}>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg flex items-center justify-center gap-2">
                                    <FileText className="w-6 h-6" />
                                    Brian Solo CIC36
                                </Button>
                            </Link>

                            <Link to={createPageUrl('AdminCIC36Form')}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 text-lg flex items-center justify-center gap-2">
                                    <FileText className="w-6 h-6" />
                                    Both Directors CIC36
                                </Button>
                            </Link>
                        </div>

                        <p className="text-cyan-400 text-sm text-center mt-4">
                            Use SOLO version for CIC submission. Add Gill later.
                        </p>
                    </CardContent>
                </Card>

                {/* RESUBMISSION CHECKLIST */}
                <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-black text-white mb-6">📋 RESUBMISSION CHECKLIST</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-black/40 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 font-black">1</div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Open Fixed Articles</p>
                                    <p className="text-gray-400 text-sm">Click green button above</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-black/40 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 font-black">2</div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Both Directors Sign</p>
                                    <p className="text-gray-400 text-sm">Brian + Gillian signatures on signature pads</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-black/40 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 font-black">3</div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Print to PDF</p>
                                    <p className="text-gray-400 text-sm">Cmd+P → Destination: Save as PDF</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-black/40 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 font-black">4</div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Go to Companies House</p>
                                    <p className="text-gray-400 text-sm mb-2">
                                        <a href="https://www.tax.service.gov.uk/register-your-company/" className="text-cyan-400 underline" target="_blank" rel="noopener noreferrer">
                                            tax.service.gov.uk/register-your-company
                                        </a>
                                    </p>
                                    <p className="text-gray-400 text-sm">Login with Gateway ID: 60 61 30 94 03 92</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-black/40 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 font-black">5</div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Start New Application</p>
                                    <p className="text-gray-400 text-sm">Same details, upload new Articles PDF</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-black/40 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 font-black">6</div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Wait 10-14 days</p>
                                    <p className="text-gray-400 text-sm">Should be approved this time</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* QUICK REFERENCE */}
                <Card className="bg-black/40 border border-cyan-500/30">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">📋 Quick Reference</h3>
                        <div className="space-y-3 text-sm">
                            <div className="bg-purple-900/20 p-4 rounded-lg">
                                <p className="text-purple-400 font-bold mb-1">Company Name</p>
                                <p className="text-white font-bold text-lg">UniversalFrequency51 CIC</p>
                            </div>
                            
                            <div className="bg-green-900/20 p-4 rounded-lg">
                                <p className="text-green-400 font-bold mb-1">Registered Office</p>
                                <p className="text-white">Upper Stoneymollan Cottage</p>
                                <p className="text-white">Upper Stoneymollan Road</p>
                                <p className="text-white">Alexandria, G83 8QU</p>
                            </div>
                            
                            <div className="bg-cyan-900/20 p-4 rounded-lg">
                                <p className="text-cyan-400 font-bold mb-1">Gateway ID + Codes</p>
                                <p className="text-white text-sm">See Companies House Details page (green button above)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BOTTOM ENCOURAGEMENT */}
                <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-3xl font-black text-white mb-4">YOU GOT THIS BRO 💪</h3>
                        <p className="text-gray-300 mb-4 text-lg">
                            This is a NORMAL part of the process. Articles were too simple. Now they're perfect.
                        </p>
                        <p className="text-pink-400 font-bold text-xl mb-4">
                            Brian + Gillian = 50/50 Leaders
                        </p>
                        <p className="text-cyan-400 font-bold text-lg">
                            One resubmission. Done. Then funding opens up. ♾️❤️♾️
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}