import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

export default function AdminCICBuilderPage() {
    const { data: cicData } = useQuery({
        queryKey: ['adminCICData'],
        queryFn: async () => {
            const data = await base44.entities.CICApplication.filter({}, '-created_date', 1);
            return data[0] || {};
        }
    });

    const [formData, setFormData] = useState({
        company_name: 'UniversalFrequency51 CIC',
        beneficiaries: `The global community, particularly:
-People performing environmental cleanup work who lack access to traditional finance
-Communities affected by pollution and environmental degradation
-Those in need of humanitarian aid (disaster relief, food security, medical assistance)
-Organizations protecting wildlife and ecosystems
-The planet itself through verified removal of pollution`,
        activities: 'Environmental cleanup verification and reward system using digital currency ($P51 tokens)',
        community_benefit: `Provides instant economic reward for verified environmental action. Users collect litter, submit photo evidence with GPS verification, and receive $P51 tokens within seconds. These can be converted to fiat currency or used peer-to-peer. We measure impact through kg of litter removed, number of verified cleanups, and geographic spread of action.`,
        surplus_use: 'Reinvestment into the company\'s community benefit activities: funding environmental cleanup operations, developing verification technology, supporting humanitarian aid missions through our 10% tithe system, and expanding access to underserved communities globally.',
        director_1_name: 'Brian Hughes',
        director_1_dob: '',
        director_2_name: 'Gillian Brown',
        director_2_dob: '',
        contact_name: 'Brian Hughes',
        contact_email: 'family@uf51.love',
        contact_phone: '07494023328',
        registered_office: 'Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, Loch Lomond, G83 8QU'
    });

    const handleGenerate = () => {
        // This will trigger PDF generation
        // For now, we'll just show success - actual PDF generation would need backend
        alert('PDF Generation: This will create your CIC36 and Articles PDFs. Backend integration needed.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-black text-white mb-2">CIC36 + Articles Builder</h1>
                    <p className="text-gray-400">Government Bullshit Killer™ - Fill once, generate perfect PDFs</p>
                </header>

                <div className="grid gap-6 mb-8">
                    <Card className="bg-black/40 border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-400" />
                                Company Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Company Name</Label>
                                <Input
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700"
                                />
                            </div>

                            <div>
                                <Label>Registered Office</Label>
                                <Input
                                    value={formData.registered_office}
                                    onChange={(e) => setFormData({...formData, registered_office: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-green-400" />
                                Section A: Community Benefit
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Who Benefits (Beneficiaries)</Label>
                                <Textarea
                                    value={formData.beneficiaries}
                                    onChange={(e) => setFormData({...formData, beneficiaries: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 min-h-[150px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-cyan-400" />
                                Section B: Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>What You Do (Activities)</Label>
                                <Textarea
                                    value={formData.activities}
                                    onChange={(e) => setFormData({...formData, activities: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 min-h-[100px]"
                                />
                            </div>

                            <div>
                                <Label>How Community Benefits</Label>
                                <Textarea
                                    value={formData.community_benefit}
                                    onChange={(e) => setFormData({...formData, community_benefit: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 min-h-[150px]"
                                />
                            </div>

                            <div>
                                <Label>How Surplus is Used</Label>
                                <Textarea
                                    value={formData.surplus_use}
                                    onChange={(e) => setFormData({...formData, surplus_use: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-pink-400" />
                                Directors
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Director 1 Name</Label>
                                    <Input
                                        value={formData.director_1_name}
                                        onChange={(e) => setFormData({...formData, director_1_name: e.target.value})}
                                        className="bg-gray-900/50 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <Label>Director 1 DOB (DD/MM/YYYY)</Label>
                                    <Input
                                        value={formData.director_1_dob}
                                        onChange={(e) => setFormData({...formData, director_1_dob: e.target.value})}
                                        placeholder="e.g. 15/03/1980"
                                        className="bg-gray-900/50 border-gray-700"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Director 2 Name</Label>
                                    <Input
                                        value={formData.director_2_name}
                                        onChange={(e) => setFormData({...formData, director_2_name: e.target.value})}
                                        className="bg-gray-900/50 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <Label>Director 2 DOB (DD/MM/YYYY)</Label>
                                    <Input
                                        value={formData.director_2_dob}
                                        onChange={(e) => setFormData({...formData, director_2_dob: e.target.value})}
                                        placeholder="e.g. 22/07/1975"
                                        className="bg-gray-900/50 border-gray-700"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-orange-400" />
                                Contact Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Contact Name</Label>
                                <Input
                                    value={formData.contact_name}
                                    onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700"
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    value={formData.contact_email}
                                    onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700"
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={formData.contact_phone}
                                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="sticky bottom-6 bg-gradient-to-r from-purple-900 to-indigo-900 border-2 border-purple-500 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Ready to Generate</h3>
                            <p className="text-sm text-gray-300">Creates CIC36 + Articles of Association PDFs</p>
                        </div>
                        <Button
                            onClick={handleGenerate}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Generate PDFs
                        </Button>
                    </div>
                </div>

                <div className="mt-8 bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-6">
                    <h3 className="font-bold text-yellow-300 mb-2">⚠️ Next Steps After Generation:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Download both PDFs (CIC36 + Articles)</li>
                        <li>Print and sign CIC36 (both directors must sign)</li>
                        <li>Scan signed CIC36</li>
                        <li>Upload to Companies House (that annoying 17 second timer page 😂)</li>
                        <li>Submit with £86 fee</li>
                        <li>Wait for approval</li>
                        <li>Freedom on Oct 15th 2025 💚</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}