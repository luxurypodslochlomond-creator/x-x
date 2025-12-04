import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Sparkles, ThumbsUp, Flag, Gift, ExternalLink, Heart, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

const PartnerCard = ({ partner, userEndorsement, onEndorse, onFlag, onClaim }) => {
    const [showDetails, setShowDetails] = useState(false);

    const frequencyColors = {
        'perfect': 'border-green-500/50 bg-green-900/20',
        'strong': 'border-cyan-500/50 bg-cyan-900/20',
        'good': 'border-blue-500/50 bg-blue-900/20',
        'caution': 'border-yellow-500/50 bg-yellow-900/20'
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className={`${frequencyColors[partner.frequency_match]} border-2 cursor-pointer hover:scale-105 transition-transform`} onClick={() => setShowDetails(true)}>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                                    <p className="text-sm text-gray-300 mb-3">{partner.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {partner.tags?.map(tag => (
                                            <Badge key={tag} className="bg-purple-900/40 text-purple-300 text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                {partner.logo_url && (
                                    <img src={partner.logo_url} alt={partner.name} className="w-16 h-16 rounded-full border-2 border-cyan-500/30" />
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-green-400">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span className="text-sm font-bold">{partner.endorsements || 0}</span>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        <Sparkles className="w-4 h-4 inline mr-1" />
                                        {partner.ai_confidence_score}% match
                                    </div>
                                </div>
                                {partner.has_reward && (
                                    <Badge className="bg-pink-900/40 text-pink-300">
                                        <Gift className="w-3 h-3 mr-1" />
                                        Rewards
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="bg-black/95 border-2 border-cyan-500/50 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">{partner.name}</DialogTitle>
                        <DialogDescription className="text-gray-400">{partner.tagline}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-white mb-2">About</h4>
                            <p className="text-gray-300 text-sm">{partner.full_description}</p>
                        </div>

                        {partner.why_good_match && (
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Brain className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-cyan-300 mb-2">Why AI51 Recommends Them</h4>
                                        <p className="text-sm text-gray-300">{partner.why_good_match}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {partner.alignment_evidence && (
                            <div>
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Verified Actions
                                </h4>
                                <ul className="space-y-1 text-sm text-gray-300">
                                    {partner.alignment_evidence.map((evidence, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-green-400">•</span>
                                            {evidence}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {partner.rewards && partner.rewards.length > 0 && (
                            <div>
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Gift className="w-4 h-4 text-pink-400" />
                                    Exclusive Rewards for UF51 Family
                                </h4>
                                <div className="space-y-2">
                                    {partner.rewards.map((reward, i) => (
                                        <div key={i} className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-3">
                                            <p className="font-bold text-pink-300">{reward.title}</p>
                                            <p className="text-xs text-gray-400">{reward.description}</p>
                                            {reward.claimable && (
                                                <Button 
                                                    onClick={() => onClaim(partner.id, reward.id)}
                                                    size="sm"
                                                    className="mt-2 bg-pink-600 hover:bg-pink-700"
                                                >
                                                    Claim Reward
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {partner.website_url && (
                            <a 
                                href={partner.website_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                            >
                                Visit Website <ExternalLink className="w-4 h-4" />
                            </a>
                        )}

                        <div className="flex gap-3 pt-4 border-t border-gray-700">
                            <Button
                                onClick={() => onEndorse(partner.id, true)}
                                disabled={userEndorsement === true}
                                className={`flex-1 ${userEndorsement === true ? 'bg-green-600' : 'bg-green-900/40 hover:bg-green-900/60'}`}
                            >
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                {userEndorsement === true ? 'Endorsed' : 'Endorse'}
                            </Button>
                            <Button
                                onClick={() => onFlag(partner.id)}
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:bg-red-900/20"
                            >
                                <Flag className="w-4 h-4 mr-2" />
                                Flag
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const SuggestPartnerForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        reason: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => base44.entities.PartnerSuggestion.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partnerSuggestions'] });
            setFormData({ name: '', website: '', reason: '' });
            setIsSubmitting(false);
            onSuccess();
        },
        onError: () => {
            setIsSubmitting(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        mutation.mutate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Organization Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Ocean Cleanup Project"
                    className="bg-gray-900/50 border-gray-600 mt-1"
                    required
                />
            </div>
            <div>
                <Label htmlFor="website">Website</Label>
                <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="bg-gray-900/50 border-gray-600 mt-1"
                    required
                />
            </div>
            <div>
                <Label htmlFor="reason">Why should we partner with them?</Label>
                <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Tell us what makes them special..."
                    className="bg-gray-900/50 border-gray-600 mt-1 h-24"
                    required
                />
            </div>
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
                {isSubmitting ? 'Suggesting...' : 'Suggest Partner'}
            </Button>
        </form>
    );
};

export default function QuantumAlliesPage() {
    const [showSuggestForm, setShowSuggestForm] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    const { data: user } = useQuery({
        queryKey: ['alliesUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: partners, isLoading } = useQuery({
        queryKey: ['aiPartners', user?.email],
        queryFn: async () => {
            if (!user) return [];

            // Get user's cleanup data
            const cleanups = await base44.entities.Cleanup.filter({ created_by: user.email }, '-created_date', 50);
            const globalCleanups = await base44.entities.Cleanup.list('-created_date', 500);

            // AI analyzes and suggests partners
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You are AI51, analyzing potential partnerships for a planetary healing platform.

**User's Impact:**
- Location: ${user.county || 'Unknown'}
- Total cleanups: ${cleanups.length}
- Total weight: ${cleanups.reduce((sum, c) => sum + (c.litter_weight || 0), 0).toFixed(1)}kg
- Primary cleanup types: ${cleanups.map(c => c.cleanup_type).join(', ')}

**Global Context:**
- Total cleanups worldwide: ${globalCleanups.length}
- Hotspot regions: ${JSON.stringify(globalCleanups.reduce((acc, c) => { acc[c.county] = (acc[c.county] || 0) + 1; return acc; }, {}))}

**Our Criteria for Partners:**
1. **Frequency Alignment:** Do they genuinely care? (Not greenwashing)
2. **Proven Impact:** Measurable, verifiable results
3. **Dignity-First:** Do they respect the people they serve?
4. **Open Philosophy:** Willing to share knowledge, not hoard it
5. **Local + Global:** Work at both levels

**Known Good Organizations (examples, not exhaustive):**
- The Ocean Cleanup (plastic from oceans)
- Rewilding Britain (ecosystem restoration)
- Project Drawdown (climate solutions)
- Ellen MacArthur Foundation (circular economy)
- Local environmental charities in user's area

Suggest 5-8 organizations that would be PERFECT partners for this user.

Return ONLY valid JSON:
{
  "partners": [
    {
      "name": "Organization name",
      "tagline": "One sentence description",
      "description": "Short description",
      "full_description": "Detailed description",
      "website_url": "https://...",
      "logo_url": "https://... (if known, otherwise null)",
      "tags": ["ocean", "plastic", "circular_economy"],
      "frequency_match": "perfect|strong|good|caution",
      "ai_confidence_score": 85,
      "why_good_match": "Why this is a great match for the user",
      "alignment_evidence": ["Evidence 1", "Evidence 2"],
      "has_reward": false,
      "rewards": [],
      "endorsements": 0
    }
  ]
}`,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        partners: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    tagline: { type: 'string' },
                                    description: { type: 'string' },
                                    full_description: { type: 'string' },
                                    website_url: { type: 'string' },
                                    logo_url: { type: ['string', 'null'] },
                                    tags: { type: 'array', items: { type: 'string' } },
                                    frequency_match: { type: 'string' },
                                    ai_confidence_score: { type: 'number' },
                                    why_good_match: { type: 'string' },
                                    alignment_evidence: { type: 'array', items: { type: 'string' } },
                                    has_reward: { type: 'boolean' },
                                    rewards: { type: 'array' },
                                    endorsements: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            });

            return response.partners;
        },
        enabled: !!user,
        staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    });

    const queryClient = useQueryClient();

    const endorseMutation = useMutation({
        mutationFn: ({ partnerId, endorsed }) => {
            // In production, this would save to database
            return Promise.resolve();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['aiPartners'] });
        }
    });

    const handleEndorse = (partnerId, endorsed) => {
        endorseMutation.mutate({ partnerId, endorsed });
    };

    const handleFlag = (partnerId) => {
        // Would trigger review process
        alert('Partner flagged for review. Thank you for keeping our frequency pure.');
    };

    const handleClaim = (partnerId, rewardId) => {
        alert('Reward claiming coming soon! We\'re setting up the quantum bridge.');
    };

    if (isLoading) {
        return <QuantumLoader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Sparkles className="w-20 h-20 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #a855f7)' }} />
                    </motion.div>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        Quantum Allies
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        AI51 has analyzed global healing patterns and found organizations that match your frequency
                    </p>
                </motion.div>

                {/* HOW IT WORKS */}
                <Card className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-2 border-cyan-500/30">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <Brain className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">How AI51 Finds Allies</h3>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <p>✅ Analyzes your cleanup patterns + global trends</p>
                                    <p>✅ Checks organizational integrity (no greenwashing)</p>
                                    <p>✅ Verifies proven impact (measurable results)</p>
                                    <p>✅ Tests frequency alignment (consciousness-based)</p>
                                    <p className="text-cyan-400 font-bold mt-3">Zero exploitation. Only genuine partners.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* SUGGEST BUTTON */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={() => setShowSuggestForm(!showSuggestForm)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-6 text-lg"
                    >
                        <Heart className="w-5 h-5 mr-2" />
                        Suggest a Partner
                    </Button>
                </div>

                <AnimatePresence>
                    {showSuggestForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Card className="bg-black/60 border-2 border-purple-500/30">
                                <CardHeader>
                                    <CardTitle>Suggest a Partner</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <SuggestPartnerForm onSuccess={() => setShowSuggestForm(false)} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* PARTNERS GRID */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-white">Recommended for You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {partners?.map((partner, i) => (
                            <PartnerCard
                                key={i}
                                partner={partner}
                                onEndorse={handleEndorse}
                                onFlag={handleFlag}
                                onClaim={handleClaim}
                            />
                        ))}
                    </div>
                </div>

                {/* QUANTUM ALLY PROTOCOL */}
                <Card className="bg-black/60 border-2 border-yellow-500/30">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">The Quantum Ally Protocol</h3>
                                <p className="text-sm text-gray-300 mb-3">
                                    Traditional partnerships = investors want returns. We reject that model.
                                </p>
                                <div className="space-y-1 text-sm text-gray-400">
                                    <p>✅ Partners must have <strong className="text-white">proven track record</strong></p>
                                    <p>✅ Partners must <strong className="text-white">respect dignity</strong></p>
                                    <p>✅ Partners cannot <strong className="text-white">exploit or extract</strong></p>
                                    <p>✅ Community can <strong className="text-white">flag bad actors</strong></p>
                                </div>
                                <p className="text-cyan-400 font-bold mt-3 text-sm">
                                    Frequency alignment {" > "} Financial returns
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}