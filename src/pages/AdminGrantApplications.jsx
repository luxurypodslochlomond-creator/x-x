import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Target, Plus, ExternalLink, CheckCircle, Clock, 
    FileText, Zap, TrendingUp, Lock, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

const SCOTTISH_GRANTS = [
    {
        name: "Creative Scotland - Open Fund",
        amount: "£20,001 - £100,000",
        deadline: "Applied 2025-01-19",
        url: "https://www.creativescotland.com/funding/funding-programmes/open-fund",
        why_perfect: "Healing frequencies + Scottish artists + wellbeing focus",
        requirements: "CIC status, artist commissions, wellbeing outcomes",
        success_rate: "Applied - awaiting outcome",
        budget_breakdown: {
            total: 100000,
            requesting: 100000,
            artist_commissions: 45000,
            research_impact: 20000,
            project_delivery: 20000,
            marketing: 8000,
            professional_services: 5000,
            accessibility: 2000
        },
        key_details: {
            artists: "30 Scottish musicians",
            rate: "£1,500 average per commission (£500-1500 based on complexity)",
            timeline: "15 months",
            equipment_or_capital: "NO - all operational/creative delivery costs",
            platform_contribution: "Platform infrastructure pre-existing (in-kind contribution)",
            what_cs_funds: "Creative content: artist commissions, research, delivery, marketing"
        }
    },
    {
        name: "Scottish Enterprise - Young Company Grant",
        amount: "£25,000 - £100,000",
        deadline: "Rolling applications",
        url: "https://www.scottish-enterprise.com",
        why_perfect: "New CIC, environmental tech, Scottish base, job creation",
        requirements: "CIC status, business plan, market research",
        success_rate: "Medium-High (local advantage)"
    },
    {
        name: "National Lottery Community Fund",
        amount: "£10,000 - £500,000",
        deadline: "Rolling applications",
        url: "https://www.tnlcommunityfund.org.uk",
        why_perfect: "Community benefit, environmental impact, CIC perfect fit",
        requirements: "CIC status, community consultation proof",
        success_rate: "High (CICs favored)"
    },
    {
        name: "Scottish Government - Climate Challenge Fund",
        amount: "£10,000 - £150,000",
        deadline: "Annual rounds (check website)",
        url: "https://www.keepscotlandbeautiful.org/ccf",
        why_perfect: "Direct carbon reduction, community engagement, measurable impact",
        requirements: "Detailed carbon calculations, community partners",
        success_rate: "Medium (competitive but aligned)"
    },
    {
        name: "Esmée Fairbairn Foundation",
        amount: "£30,000 - £100,000",
        deadline: "Rolling applications",
        url: "https://esmeefairbairn.org.uk",
        why_perfect: "Environment + social justice focus, love the innovative CICs",
        requirements: "Strong social impact story, realistic budget",
        success_rate: "Medium (they like bold ideas)"
    },
    {
        name: "Argyll & Bute Council - Community Grant",
        amount: "£1,000 - £10,000",
        deadline: "Quarterly",
        url: "https://www.argyll-bute.gov.uk",
        why_perfect: "Local council, Stoneymollan sanctuary local benefit",
        requirements: "Local community benefit proof",
        success_rate: "High (local = advantage)"
    },
    {
        name: "West Dunbartonshire Council - Environmental Fund",
        amount: "£500 - £5,000",
        deadline: "Rolling",
        url: "https://www.west-dunbarton.gov.uk",
        why_perfect: "Glasgow proximity, environmental cleanup focus",
        requirements: "Simple application, local project",
        success_rate: "Very High (easy wins)"
    },
];

const PRE_FILLED_DATA = {
    organization_name: "UniversalFrequency51 CIC",
    registered_address: "Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, Loch Lomond, G83 8QU",
    contact_name: "Brian Hughes",
    contact_email: "hello@uf51.love",
    website: "https://uf51.love",
    mission_statement: "We reward verified environmental healing actions with love currency ($P51), creating a direct economic link between planetary health and human wellbeing. 90% to healers, 10% to missions. Zero exploitation.",
    target_beneficiaries: "Environmental activists, low-income communities, young people, musicians, anyone who wants to heal Earth and earn fair value for their work.",
    why_cic: "We're a Community Interest Company because profit extraction contradicts our mission. All value circulates within the healing ecosystem.",
    impact_metrics: "Kilograms of litter removed, verified cleanups, tokens earned by community, carbon reduction, biodiversity protection.",
};

export default function AdminGrantApplicationsPage() {
    const [showNewForm, setShowNewForm] = useState(false);
    const [selectedGrant, setSelectedGrant] = useState(null);
    const [copiedField, setCopiedField] = useState(null);
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        organization: '',
        what_we_sent: '',
        what_we_asked_for: '',
        amount_requested: '',
        expected_timeline: '',
        next_steps: '',
        why_important: '',
        context_notes: '',
    });

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['adminUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: actions, isLoading: actionsLoading } = useQuery({
        queryKey: ['grantActions'],
        queryFn: () => base44.entities.BusinessAction.filter({ action_type: 'grant_application' }),
        enabled: !!user && user.role === 'admin',
    });

    const createActionMutation = useMutation({
        mutationFn: (actionData) => base44.entities.BusinessAction.create(actionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grantActions'] });
            setShowNewForm(false);
            setFormData({
                organization: '',
                what_we_sent: '',
                what_we_asked_for: '',
                amount_requested: '',
                expected_timeline: '',
                next_steps: '',
                why_important: '',
                context_notes: '',
            });
        },
    });

    const updateActionMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.BusinessAction.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grantActions'] });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createActionMutation.mutateAsync({
            action_type: 'grant_application',
            organization: formData.organization,
            contact_method: 'web_form',
            what_we_sent: formData.what_we_sent,
            what_we_asked_for: formData.what_we_asked_for,
            amount_requested: parseFloat(formData.amount_requested) || 0,
            expected_timeline: formData.expected_timeline,
            next_steps: formData.next_steps,
            status: 'sent',
            why_important: formData.why_important,
            context_notes: formData.context_notes,
        });
    };

    const updateStatus = async (id, newStatus) => {
        await updateActionMutation.mutateAsync({
            id,
            data: { status: newStatus }
        });
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (userLoading) return <QuantumLoader />;

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <Card className="bg-red-900/20 border-red-500/50 max-w-md">
                    <CardContent className="p-8 text-center">
                        <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-red-300">Admin Only</h1>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const sentCount = actions?.filter(a => a.status === 'sent' || a.status === 'awaiting_response').length || 0;
    const approvedCount = actions?.filter(a => a.status === 'approved').length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block p-4 bg-green-900/30 rounded-full"
                    >
                        <Target className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black">GRANT PIPELINE</h1>
                    <p className="text-xl text-gray-300">
                        Ready to fire when CIC approved ⚡
                    </p>
                </header>

                {/* QUICK STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-900/20 border-blue-500/30">
                        <CardContent className="p-6 text-center">
                            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-blue-300">{sentCount}</p>
                            <p className="text-sm text-gray-400">Applications Sent</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-900/20 border-green-500/30">
                        <CardContent className="p-6 text-center">
                            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-green-300">{approvedCount}</p>
                            <p className="text-sm text-gray-400">Approved</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-900/20 border-purple-500/30">
                        <CardContent className="p-6 text-center">
                            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                            <p className="text-3xl font-black text-purple-300">
                                £{actions?.filter(a => a.status === 'approved').reduce((sum, a) => sum + (a.amount_requested || 0), 0).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">Total Secured</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="available" className="space-y-6">
                    <TabsList className="bg-black/60 border border-gray-700">
                        <TabsTrigger value="available">Available Grants</TabsTrigger>
                        <TabsTrigger value="applications">My Applications</TabsTrigger>
                        <TabsTrigger value="toolkit">Quick Fill Toolkit</TabsTrigger>
                    </TabsList>

                    <TabsContent value="available" className="space-y-4">
                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4 mb-6">
                            <p className="text-cyan-300 font-bold mb-2">🎯 STRATEGY:</p>
                            <p className="text-sm text-gray-300">Apply for local/small grants FIRST (£1k-£10k). Prove concept. Use success to unlock bigger grants. Build credibility ladder.</p>
                        </div>

                        {SCOTTISH_GRANTS.map((grant, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="bg-black/60 border-2 border-green-500/30 hover:border-green-500/60 transition-all">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl text-white mb-2">{grant.name}</CardTitle>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <Badge className="bg-green-500/20 text-green-300 border border-green-500/50">
                                                        {grant.amount}
                                                    </Badge>
                                                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/50">
                                                        {grant.success_rate}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <a 
                                                href={grant.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-cyan-400 hover:text-cyan-300"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">WHY PERFECT FOR US:</p>
                                            <p className="text-sm text-green-300">{grant.why_perfect}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">REQUIREMENTS:</p>
                                            <p className="text-sm text-gray-300">{grant.requirements}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">DEADLINE:</p>
                                            <p className="text-sm text-white">{grant.deadline}</p>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setSelectedGrant(grant);
                                                setFormData({ ...formData, organization: grant.name });
                                                setShowNewForm(true);
                                            }}
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            <Zap className="w-4 h-4 mr-2" />
                                            Apply Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </TabsContent>

                    <TabsContent value="applications" className="space-y-4">
                        {!showNewForm && (
                            <Button
                                onClick={() => setShowNewForm(true)}
                                className="bg-green-600 hover:bg-green-700 mb-6"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Record New Application
                            </Button>
                        )}

                        <AnimatePresence>
                            {showNewForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Card className="bg-black/60 border border-green-500/30 mb-6">
                                        <CardHeader>
                                            <CardTitle>Record Grant Application</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <Label>Grant Organization</Label>
                                                    <Input
                                                        value={formData.organization}
                                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label>What We Asked For</Label>
                                                    <Textarea
                                                        value={formData.what_we_asked_for}
                                                        onChange={(e) => setFormData({ ...formData, what_we_asked_for: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1"
                                                        placeholder="e.g. Funding for Stoneymollan Sanctuary development"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Amount Requested (£)</Label>
                                                    <Input
                                                        type="number"
                                                        value={formData.amount_requested}
                                                        onChange={(e) => setFormData({ ...formData, amount_requested: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label>What We Sent (Application Summary)</Label>
                                                    <Textarea
                                                        value={formData.what_we_sent}
                                                        onChange={(e) => setFormData({ ...formData, what_we_sent: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1 h-32"
                                                        placeholder="Paste your application or summarize key points"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Expected Response Timeline</Label>
                                                    <Input
                                                        value={formData.expected_timeline}
                                                        onChange={(e) => setFormData({ ...formData, expected_timeline: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1"
                                                        placeholder="e.g. 4-6 weeks"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Next Steps</Label>
                                                    <Textarea
                                                        value={formData.next_steps}
                                                        onChange={(e) => setFormData({ ...formData, next_steps: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1"
                                                        placeholder="What happens after submission?"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Why Important for UF51</Label>
                                                    <Textarea
                                                        value={formData.why_important}
                                                        onChange={(e) => setFormData({ ...formData, why_important: e.target.value })}
                                                        className="bg-gray-900/50 border-gray-600 mt-1"
                                                        placeholder="Strategic importance of this grant"
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                                                        Save Application
                                                    </Button>
                                                    <Button 
                                                        type="button" 
                                                        variant="outline" 
                                                        onClick={() => setShowNewForm(false)}
                                                        className="flex-1"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {actionsLoading ? (
                            <div className="text-center py-12">
                                <QuantumLoader />
                            </div>
                        ) : actions && actions.length > 0 ? (
                            <div className="space-y-4">
                                {actions.map(action => (
                                    <Card key={action.id} className="bg-black/60 border border-gray-700">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg">{action.organization}</CardTitle>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        Applied {new Date(action.created_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge className={
                                                    action.status === 'approved' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                                                    action.status === 'rejected' ? 'bg-red-500/20 text-red-300 border-red-500/50' :
                                                    'bg-blue-500/20 text-blue-300 border-blue-500/50'
                                                }>
                                                    {action.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-400">Amount Requested:</p>
                                                <p className="text-lg font-bold text-white">£{action.amount_requested?.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">What We Asked For:</p>
                                                <p className="text-sm text-gray-300">{action.what_we_asked_for}</p>
                                            </div>
                                            {action.next_steps && (
                                                <div>
                                                    <p className="text-xs text-gray-400">Next Steps:</p>
                                                    <p className="text-sm text-gray-300">{action.next_steps}</p>
                                                </div>
                                            )}
                                            <div className="flex gap-2 flex-wrap">
                                                {action.status === 'sent' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateStatus(action.id, 'awaiting_response')}
                                                        className="bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        Mark Awaiting Response
                                                    </Button>
                                                )}
                                                {(action.status === 'sent' || action.status === 'awaiting_response') && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => updateStatus(action.id, 'approved')}
                                                            className="bg-green-600 hover:bg-green-700"
                                                        >
                                                            ✅ Approved
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => updateStatus(action.id, 'rejected')}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            ❌ Rejected
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="bg-black/60 border border-gray-700">
                                <CardContent className="p-12 text-center">
                                    <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-400">No applications yet. Start with local small grants first!</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="toolkit" className="space-y-6">
                        <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
                            <CardHeader>
                                <CardTitle>🚀 QUICK FILL DATA</CardTitle>
                                <p className="text-sm text-gray-400">Copy-paste these for grant applications</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {Object.entries(PRE_FILLED_DATA).map(([key, value]) => (
                                    <div key={key} className="bg-black/40 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Label className="text-cyan-400 capitalize">
                                                {key.replace(/_/g, ' ')}
                                            </Label>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => copyToClipboard(value, key)}
                                                className="h-6 px-2"
                                            >
                                                {copiedField === key ? (
                                                    <Check className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}