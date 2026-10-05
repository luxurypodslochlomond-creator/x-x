import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Wand2, CheckCircle } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

export default function CreateMissionPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        gmt_target: '',
        mission_type: 'environmental',
        expected_impact: '',
        verification_method: '',
        organizer_name: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ['missionCreatorUser'],
        queryFn: () => base44.auth.me(),
    });

    const createMutation = useMutation({
        mutationFn: (missionData) => base44.entities.Mission.create(missionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['missions'] });
            navigate(createPageUrl('Missions'));
        },
        onError: (err) => {
            console.error('Mission creation failed:', err);
            setError('Failed to create mission. Please try again.');
            setIsSubmitting(false);
        }
    });

    const handleAiGenerate = async () => {
        if (!aiPrompt.trim()) {
            setError('Tell AI51 what you want to do');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `You're helping create a real-world healing mission for Universal Frequency 51.
                
User wants to: "${aiPrompt}"

Generate a complete mission proposal. Make it REAL, SPECIFIC, and ACTIONABLE.

Return JSON with:
{
  "title": "Clear, powerful mission title (max 60 chars)",
  "description": "Detailed description of what will be done, how, and why (200-500 words)",
  "expected_impact": "Specific measurable outcomes (e.g., '500kg plastic removed from beach', '10 families fed for 1 month')",
  "verification_method": "How we'll prove it worked (e.g., 'Photo evidence before/after', 'Third-party receipt confirmation')",
  "suggested_target": "Realistic P51 amount needed (number only)"
}

Make it BEAUTIFUL but PRACTICAL. This is REAL healing, not fantasy.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        expected_impact: { type: "string" },
                        verification_method: { type: "string" },
                        suggested_target: { type: "number" }
                    }
                }
            });

            setFormData({
                ...formData,
                title: result.title,
                description: result.description,
                expected_impact: result.expected_impact,
                verification_method: result.verification_method,
                gmt_target: result.suggested_target.toString()
            });

            setAiPrompt('');
        } catch (err) {
            console.error('AI generation failed:', err);
            setError('AI51 had trouble understanding. Try being more specific?');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.gmt_target || !formData.organizer_name) {
            setError('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const missionData = {
            ...formData,
            gmt_target: parseFloat(formData.gmt_target),
            gmt_raised: 0,
            status: 'funding',
            organizer_type: user?.role === 'admin' ? 'uf51_core' : 'community'
        };

        createMutation.mutate(missionData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <header className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto text-purple-400 mb-4" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} />
                    <h1 className="text-4xl md:text-5xl font-black">Create a Mission</h1>
                    <p className="text-gray-400 mt-2">Turn intention into action. Get funded by family.</p>
                </header>

                {/* AI MISSION GENERATOR */}
                <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Wand2 className="w-6 h-6 text-cyan-400" />
                            AI51 Mission Generator
                        </CardTitle>
                        <p className="text-sm text-gray-400">Tell AI51 what you want to do. It'll help structure your mission.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g., 'I want to clean up the beach in my town and remove 200kg of plastic'"
                            className="bg-gray-900/50 border-gray-700 text-white h-24"
                            disabled={isGenerating}
                        />
                        <Button
                            onClick={handleAiGenerate}
                            disabled={isGenerating || !aiPrompt.trim()}
                            className="w-full bg-cyan-600 hover:bg-cyan-700"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    AI51 is thinking...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Generate Mission
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* MISSION FORM */}
                <Card className="bg-black/60 border border-gray-700">
                    <CardHeader>
                        <CardTitle>Mission Details</CardTitle>
                        <p className="text-sm text-gray-400">Edit what AI51 generated, or write it yourself</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div>
                                <Label htmlFor="organizer_name">Your Name / Organization *</Label>
                                <Input
                                    id="organizer_name"
                                    value={formData.organizer_name}
                                    onChange={(e) => setFormData({...formData, organizer_name: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 text-white mt-1"
                                    placeholder="Who's running this mission?"
                                />
                            </div>

                            <div>
                                <Label htmlFor="title">Mission Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 text-white mt-1"
                                    placeholder="Clear, powerful title"
                                />
                            </div>

                            <div>
                                <Label htmlFor="mission_type">Mission Type *</Label>
                                <Select
                                    value={formData.mission_type}
                                    onValueChange={(value) => setFormData({...formData, mission_type: value})}
                                >
                                    <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="environmental">Environmental</SelectItem>
                                        <SelectItem value="humanitarian">Humanitarian</SelectItem>
                                        <SelectItem value="animal_welfare">Animal Welfare</SelectItem>
                                        <SelectItem value="educational">Educational</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                        <SelectItem value="research">Research</SelectItem>
                                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="description">Full Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 text-white h-48 mt-1"
                                    placeholder="What will you do? How? Why does it matter?"
                                />
                            </div>

                            <div>
                                <Label htmlFor="expected_impact">Expected Impact *</Label>
                                <Textarea
                                    id="expected_impact"
                                    value={formData.expected_impact}
                                    onChange={(e) => setFormData({...formData, expected_impact: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 text-white h-24 mt-1"
                                    placeholder="e.g., '500kg plastic removed', '10 families fed for 1 month'"
                                />
                            </div>

                            <div>
                                <Label htmlFor="verification_method">How Will You Prove It? *</Label>
                                <Textarea
                                    id="verification_method"
                                    value={formData.verification_method}
                                    onChange={(e) => setFormData({...formData, verification_method: e.target.value})}
                                    className="bg-gray-900/50 border-gray-700 text-white h-24 mt-1"
                                    placeholder="e.g., 'Before/after photos', 'Receipt from charity', 'Community witness'"
                                />
                            </div>

                            <div>
                                <Label htmlFor="gmt_target">Funding Goal *</Label>
                                <div className="relative mt-1">
                                    <Input
                                        id="gmt_target"
                                        type="number"
                                        value={formData.gmt_target}
                                        onChange={(e) => setFormData({...formData, gmt_target: e.target.value})}
                                        className="bg-gray-900/50 border-gray-700 text-white pr-20"
                                        placeholder="How much P51 do you need?"
                                    />
                                    <div className="absolute inset-y-0 right-4 flex items-center">
                                        <P51Symbol />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
                                    <p className="text-red-300 text-sm">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 h-12 text-lg font-bold"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Create Mission
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* VERIFICATION INFO */}
                <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-white mb-3">🛡️ How Verification Works</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>✅ <strong>Community missions:</strong> Anyone can create. Family votes on funding.</p>
                            <p>✅ <strong>Verified partners:</strong> Contact us to get verified. Easier approval, more trust.</p>
                            <p>✅ <strong>All missions tracked:</strong> When funded, you MUST deliver proof. Otherwise trust score drops.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}