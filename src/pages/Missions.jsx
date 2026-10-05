import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Users, ShieldCheck, Heart, Send, Loader2, CheckCircle, Gift, ExternalLink, MapPin, Calendar, Target, Award, AlertCircle, Clock, Zap, Flame } from 'lucide-react';
import { COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import P51Symbol from '@/components/shared/P51Symbol';
import QuantumLoader from '@/components/shared/QuantumLoader';

const URGENCY_CONFIG = {
    critical_life_threat: {
        color: 'red',
        label: 'CRITICAL',
        icon: Flame,
        bgClass: 'bg-red-900/40',
        borderClass: 'border-red-500',
        textClass: 'text-red-400',
        pulse: true
    },
    urgent_intervention: {
        color: 'orange',
        label: 'URGENT',
        icon: Zap,
        bgClass: 'bg-orange-900/40',
        borderClass: 'border-orange-500',
        textClass: 'text-orange-400',
        pulse: false
    },
    important_prevention: {
        color: 'yellow',
        label: 'IMPORTANT',
        icon: AlertCircle,
        bgClass: 'bg-yellow-900/40',
        borderClass: 'border-yellow-500',
        textClass: 'text-yellow-400',
        pulse: false
    },
    long_term_healing: {
        color: 'green',
        label: 'LONG-TERM',
        icon: Clock,
        bgClass: 'bg-green-900/40',
        borderClass: 'border-green-500',
        textClass: 'text-green-400',
        pulse: false
    }
};

const FundMissionModal = ({ mission, user, isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: (updatedData) => base44.auth.updateMe(updatedData),
    });

    const updateMissionMutation = useMutation({
        mutationFn: ({ id, updatedData }) => base44.entities.Mission.update(id, updatedData),
    });

    const createContributionMutation = useMutation({
        mutationFn: (contributionData) => base44.entities.MissionContribution.create(contributionData),
    });
    
    const transactionMutation = useMutation({
      mutationFn: (txData) => base44.entities.Transaction.create(txData)
    });

    const handleFund = async () => {
        const fundAmount = parseFloat(amount);
        if (isNaN(fundAmount) || fundAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (fundAmount > (user.love_balance || 0)) {
            setError("You don't have enough P51.");
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            await updateUserMutation.mutateAsync({
                love_balance: (user.love_balance || 0) - fundAmount,
            });

            const newRaisedAmount = (mission.gmt_raised || 0) + fundAmount;
            await updateMissionMutation.mutateAsync({
                id: mission.id,
                updatedData: { gmt_raised: newRaisedAmount },
            });

            await createContributionMutation.mutateAsync({
                mission_id: mission.id,
                mission_name: mission.title,
                gmt_amount: fundAmount,
                contributor_email: user.email,
                contributor_name: user.full_name || 'A Beautiful Soul',
            });
            
            await transactionMutation.mutateAsync({
              transaction_type: 'sent',
              p51_amount: fundAmount,
              from_user: user.email,
              to_user: `mission_${mission.id}`,
              reason: `Fueled Mission: ${mission.title}`,
              reference_id: mission.id
            });

            queryClient.invalidateQueries({ queryKey: ['missions'] });
            queryClient.invalidateQueries({ queryKey: ['walletUser'] });
            queryClient.invalidateQueries({ queryKey: ['walletTransactions'] });

            onClose();
        } catch (err) {
            console.error('Funding failed:', err);
            setError('An error occurred during the transmission. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const fundAmount = parseFloat(amount) || 0;
    const nextReward = mission.rewards_offered?.find(r => fundAmount >= r.threshold);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black/80 border-cyan-500/50 text-white backdrop-blur-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Fuel Mission: "{mission.title}"</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Your current balance: {Number(user?.love_balance || 0).toLocaleString()} <P51Symbol />
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Label htmlFor="amount" className="text-lg">Amount of love to send</Label>
                    <div className="relative">
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="bg-gray-900/50 border-gray-700 text-2xl font-bold pr-16 h-14"
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center">
                            <P51Symbol />
                        </div>
                    </div>
                    
                    {nextReward && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-lg p-4"
                        >
                            <div className="flex items-center gap-3">
                                <Gift className="w-6 h-6 text-pink-400" />
                                <div>
                                    <p className="font-bold text-pink-300">{nextReward.reward_title}</p>
                                    <p className="text-xs text-gray-400">{nextReward.reward_description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <Button onClick={handleFund} disabled={isProcessing} size="lg" className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold">
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                    Confirm & Send Love
                </Button>
            </DialogContent>
        </Dialog>
    );
};

const MissionCard = ({ mission, onFund }) => {
    const [showDetails, setShowDetails] = useState(false);
    const percentage = mission.gmt_target > 0 ? ((mission.gmt_raised || 0) / mission.gmt_target) * 100 : 0;

    const urgencyConfig = mission.urgency_level ? URGENCY_CONFIG[mission.urgency_level] : null;
    const UrgencyIcon = urgencyConfig?.icon;

    const organizerBadge = mission.organizer_type === 'verified_partner' ? (
        <Badge className="bg-cyan-900/40 text-cyan-300 border border-cyan-500/30">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verified Partner
        </Badge>
    ) : mission.organizer_type === 'uf51_core' ? (
        <Badge className="bg-purple-900/40 text-purple-300 border border-purple-500/30">
            <Heart className="w-3 h-3 mr-1" />
            UF51 Core
        </Badge>
    ) : (
        <Badge className="bg-gray-900/40 text-gray-300">
            <Users className="w-3 h-3 mr-1" />
            Community
        </Badge>
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col h-full hover:border-cyan-500/60 transition-all cursor-pointer" onClick={() => setShowDetails(true)}>
                    <CardHeader className="p-0">
                        <div className="relative">
                            {mission.image_url && mission.image_url.includes('supabase') && (
                                <img src={mission.image_url} alt={mission.title} className="w-full h-48 object-cover" />
                            )}
                            {(!mission.image_url || !mission.image_url.includes('supabase')) && (
                                <div className="w-full h-48 bg-gradient-to-br from-cyan-900/40 to-purple-900/40 flex items-center justify-center">
                                    <Globe className="w-16 h-16 text-cyan-400/50" />
                                </div>
                            )}
                            
                            {/* URGENCY BADGE - TOP LEFT */}
                            {urgencyConfig && (
                                <motion.div
                                    className={`absolute top-3 left-3 ${urgencyConfig.bgClass} ${urgencyConfig.borderClass} border-2 rounded-lg px-3 py-2 flex items-center gap-2`}
                                    animate={urgencyConfig.pulse ? {
                                        scale: [1, 1.1, 1],
                                        boxShadow: [
                                            '0 0 20px rgba(239, 68, 68, 0.6)',
                                            '0 0 40px rgba(239, 68, 68, 1)',
                                            '0 0 20px rgba(239, 68, 68, 0.6)'
                                        ]
                                    } : {}}
                                    transition={urgencyConfig.pulse ? { duration: 1.5, repeat: Infinity } : {}}
                                >
                                    <UrgencyIcon className={`w-4 h-4 ${urgencyConfig.textClass}`} />
                                    <span className={`font-black text-xs ${urgencyConfig.textClass}`}>{urgencyConfig.label}</span>
                                </motion.div>
                            )}
                            
                            {/* ORGANIZER BADGE - TOP RIGHT */}
                            <div className="absolute top-3 right-3">
                                {organizerBadge}
                            </div>

                            {/* LIVES SAVED - BOTTOM OVERLAY */}
                            {mission.lives_saved_estimate > 0 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                    <div className="flex items-center gap-2 justify-center">
                                        <Heart className="w-5 h-5 text-pink-400" />
                                        <span className="text-white font-black text-lg">
                                            {mission.lives_saved_estimate.toLocaleString()} Lives Saved
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                        <CardTitle className="text-xl font-bold text-white mb-2">{mission.title}</CardTitle>
                        <p className="text-sm text-gray-400 mb-3">{mission.organizer_name}</p>
                        
                        {/* TIME TO IMPACT - CRITICAL INFO */}
                        {mission.time_to_impact && (
                            <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-3 mb-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <p className="text-xs text-cyan-300 font-bold">Time to Impact: {mission.time_to_impact}</p>
                                </div>
                            </div>
                        )}
                        
                        <p className="text-sm text-gray-300 mb-4 line-clamp-3">{mission.description}</p>
                        
                        {mission.expected_impact && (
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
                                <p className="text-xs text-green-300 font-bold mb-1">Expected Impact:</p>
                                <p className="text-xs text-gray-300">{mission.expected_impact}</p>
                            </div>
                        )}

                        {/* INDIGENOUS PARTNERSHIP BADGE */}
                        {mission.indigenous_partnership && (
                            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-2 mb-3">
                                <p className="text-xs text-amber-300 font-bold">
                                    🪶 Indigenous Partnership: {mission.indigenous_community_name}
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="p-6 bg-black/30 space-y-3">
                        <div className="w-full space-y-2">
                            <div className="flex justify-between items-center text-sm text-gray-300">
                                <span>{(mission.gmt_raised || 0).toLocaleString()} <P51Symbol showTooltip={false} /></span>
                                <span>{mission.gmt_target.toLocaleString()} <P51Symbol showTooltip={false} /></span>
                            </div>
                            <Progress value={percentage} className="w-full h-3 bg-gray-800 [&>*]:bg-gradient-to-r [&>*]:from-green-400 [&>*]:to-cyan-400" />
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onFund(mission);
                            }}
                            className="w-full border-2 border-cyan-500/50 hover:border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-black py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                        >
                            <COOLASFUCKHeart size={16} />
                            FUND
                        </button>
                    </CardFooter>
                </Card>
            </motion.div>

            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="bg-black/95 border-2 border-cyan-500/50 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black">{mission.title}</DialogTitle>
                        <DialogDescription className="text-gray-400 flex items-center gap-2 mt-2 flex-wrap">
                            {organizerBadge}
                            <span>{mission.organizer_name}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* URGENCY + LIVES SAVED - TOP */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {urgencyConfig && (
                                <div className={`${urgencyConfig.bgClass} ${urgencyConfig.borderClass} border-2 rounded-xl p-4`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <UrgencyIcon className={`w-6 h-6 ${urgencyConfig.textClass}`} />
                                        <p className={`font-black ${urgencyConfig.textClass}`}>{urgencyConfig.label}</p>
                                    </div>
                                    {mission.time_to_impact && (
                                        <p className="text-xs text-gray-300">⏱ {mission.time_to_impact}</p>
                                    )}
                                </div>
                            )}
                            
                            {mission.lives_saved_estimate > 0 && (
                                <div className="bg-pink-900/40 border-2 border-pink-500 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Heart className="w-6 h-6 text-pink-400" />
                                        <p className="font-black text-pink-400">LIVES SAVED</p>
                                    </div>
                                    <p className="text-3xl font-black text-white">{mission.lives_saved_estimate.toLocaleString()}</p>
                                </div>
                            )}
                        </div>

                        {mission.image_url && (
                            <img src={mission.image_url} alt={mission.title} className="w-full h-64 object-cover rounded-lg" />
                        )}

                        <div>
                            <h4 className="font-bold text-white mb-2">About This Mission</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{mission.description}</p>
                        </div>

                        {mission.expected_impact && (
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-green-300 mb-2">Expected Impact</h4>
                                        <p className="text-sm text-gray-300">{mission.expected_impact}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mission.verification_method && (
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-cyan-300 mb-2">Verification Method</h4>
                                        <p className="text-sm text-gray-300">{mission.verification_method}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mission.indigenous_partnership && (
                            <div className="bg-amber-900/30 border-2 border-amber-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🪶</span>
                                    <div>
                                        <h4 className="font-bold text-amber-300 mb-2">Indigenous Partnership</h4>
                                        <p className="text-sm text-gray-300">{mission.indigenous_community_name}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mission.rewards_offered && mission.rewards_offered.length > 0 && (
                            <div>
                                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-pink-400" />
                                    Contributor Rewards
                                </h4>
                                <div className="space-y-2">
                                    {mission.rewards_offered.map((reward, i) => (
                                        <div key={i} className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-3">
                                            <p className="font-bold text-pink-300">{reward.reward_title}</p>
                                            <p className="text-xs text-gray-400">{reward.reward_description}</p>
                                            <p className="text-xs text-pink-400 mt-1">Contribute {reward.threshold} <P51Symbol showTooltip={false} /> or more</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {mission.location_name && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin className="w-4 h-4" />
                                {mission.location_name}
                            </div>
                        )}

                        {mission.deadline && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Calendar className="w-4 h-4" />
                                Deadline: {new Date(mission.deadline).toLocaleDateString()}
                            </div>
                        )}

                        {mission.partner_website && (
                            <a 
                                href={mission.partner_website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                            >
                                Visit Partner Website <ExternalLink className="w-4 h-4" />
                            </a>
                        )}

                        {mission.progress_updates && mission.progress_updates.length > 0 && (
                            <div>
                                <h4 className="font-bold text-white mb-3">Progress Updates</h4>
                                <div className="space-y-3">
                                    {mission.progress_updates.map((update, i) => (
                                        <div key={i} className="bg-gray-900/40 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-2">
                                                {formatDistanceToNow(new Date(update.date), { addSuffix: true })}
                                            </p>
                                            <p className="text-sm text-gray-300">{update.update_text}</p>
                                            {update.photo_url && (
                                                <img src={update.photo_url} alt="Update" className="mt-3 w-full h-32 object-cover rounded-lg" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white font-bold">{percentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={percentage} className="w-full h-3 [&>*]:bg-gradient-to-r [&>*]:from-green-400 [&>*]:to-cyan-400 mb-2" />
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>{(mission.gmt_raised || 0).toLocaleString()} <P51Symbol showTooltip={false} /></span>
                                <span>{mission.gmt_target.toLocaleString()} <P51Symbol showTooltip={false} /></span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default function MissionsPage() {
    const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('urgency'); // NEW: Default to urgency sort

    const { data: missions, isLoading, error } = useQuery({
        queryKey: ['missions', filterType],
        queryFn: async () => {
            if (filterType === 'all') {
                return base44.entities.Mission.filter({ status: 'funding' }, '-created_date');
            }
            return base44.entities.Mission.filter({ 
                status: 'funding',
                organizer_type: filterType 
            }, '-created_date');
        },
    });

    const { data: user } = useQuery({
        queryKey: ['walletUser'],
        queryFn: () => base44.auth.me()
    });

    // SORT BY URGENCY
    const sortedMissions = React.useMemo(() => {
        if (!missions) return [];
        
        if (sortBy === 'urgency') {
            const urgencyOrder = {
                critical_life_threat: 0,
                urgent_intervention: 1,
                important_prevention: 2,
                long_term_healing: 3
            };
            
            return [...missions].sort((a, b) => {
                const aUrgency = urgencyOrder[a.urgency_level] ?? 999;
                const bUrgency = urgencyOrder[b.urgency_level] ?? 999;
                return aUrgency - bUrgency;
            });
        }
        
        return missions;
    }, [missions, sortBy]);

    const handleOpenFundModal = (mission) => {
        setSelectedMission(mission);
        setIsFundingModalOpen(true);
    };

    const handleCloseFundModal = () => {
        setSelectedMission(null);
        setIsFundingModalOpen(false);
    };

    if (isLoading) return <QuantumLoader />;

    // Count critical missions
    const criticalCount = missions?.filter(m => m.urgency_level === 'critical_life_threat').length || 0;

    return (
        <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] p-6 md:p-12 pb-32 twcc-scanlines relative">
            {selectedMission && user && (
                <FundMissionModal
                    mission={selectedMission}
                    user={user}
                    isOpen={isFundingModalOpen}
                    onClose={handleCloseFundModal}
                />
            )}
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="inline-block p-5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full shadow-2xl shadow-green-500/30 mb-4">
                        <Globe className="w-12 h-12 text-white" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-green-400 via-white to-cyan-400 bg-clip-text text-transparent">
                        Humanitarian Missions
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-4">
                        Direct funding to verified missions. Water access, food security, medical aid, conflict resolution.
                    </p>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto mt-3">
                        All missions verified by partner organisations. 100% transparency. Real-time impact tracking.
                    </p>
                    


                    {/* CRITICAL ALERT */}
                    {criticalCount > 0 && (
                        <motion.div
                            animate={{ 
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    '0 0 20px rgba(239, 68, 68, 0.6)',
                                    '0 0 40px rgba(239, 68, 68, 1)',
                                    '0 0 20px rgba(239, 68, 68, 0.6)'
                                ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="bg-red-900/40 border-4 border-red-500 rounded-xl p-6 max-w-2xl mx-auto mt-6"
                        >
                            <div className="flex items-center gap-3 justify-center">
                                <Flame className="w-8 h-8 text-red-400" />
                                <p className="text-2xl font-black text-white">
                                    {criticalCount} CRITICAL MISSION{criticalCount > 1 ? 'S' : ''} - LIVES AT STAKE
                                </p>
                            </div>
                            <p className="text-red-300 text-sm mt-2">People die without water/medical aid in DAYS. These missions save lives IMMEDIATELY.</p>
                        </motion.div>
                    )}
                </header>

                <Tabs value={filterType} onValueChange={setFilterType} className="mb-8">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-black/50">
                        <TabsTrigger value="all">All Missions</TabsTrigger>
                        <TabsTrigger value="verified_partner">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Partners
                        </TabsTrigger>
                        <TabsTrigger value="uf51_core">
                            <Heart className="w-4 h-4 mr-2" />
                            UF51
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* SORT TOGGLE */}
                <div className="flex justify-center mb-8">
                    <Button
                        onClick={() => setSortBy(sortBy === 'urgency' ? 'recent' : 'urgency')}
                        variant="outline"
                        className="border-cyan-500/30"
                    >
                        Sort: {sortBy === 'urgency' ? '🔥 Most Urgent First' : '📅 Most Recent'}
                    </Button>
                </div>

                {error ? (
                    <p className="text-center text-red-500">Failed to load missions. The frequency may be disrupted.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedMissions?.map(mission => (
                            <MissionCard key={mission.id} mission={mission} onFund={handleOpenFundModal} />
                        ))}
                    </div>
                )}

                {missions?.length === 0 && (
                    <div className="text-center py-20">
                        <Globe className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                        <p className="text-xl text-gray-500">No missions in this category yet.</p>
                    </div>
                )}

                {/* HOW IT WORKS */}
                <Card className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/50 rounded-2xl mt-12">
                    <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-10 h-10 text-pink-400" />
                            <h2 className="text-3xl font-black text-white">Fund With P51</h2>
                        </div>
                        
                        <p className="text-lg text-white mb-4">
                            Use your earned P51 to directly fund verified humanitarian missions. 100% transparent. Real impact.
                        </p>

                        <div className="bg-black/60 rounded-xl p-6">
                            <div className="space-y-3 text-sm text-gray-300">
                                <p>• <strong className="text-white">Earn P51</strong> by cleaning Earth (1kg = 1 P51)</p>
                                <p>• <strong className="text-white">Send instantly</strong> to any mission you choose</p>
                                <p>• <strong className="text-white">Track impact</strong> in real-time</p>
                                <p>• <strong className="text-white">Verified partners</strong> ensure money reaches people</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-xs">
                            £/$/€ bridge coming soon for those who want to fund with fiat. For now, earn P51 and send directly.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}