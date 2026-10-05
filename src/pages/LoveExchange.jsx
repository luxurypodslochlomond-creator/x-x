import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, GraduationCap, Users, Shield, Target, Sparkles, Search, Leaf, Loader2, CheckCircle } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';

const iconMap = {
    humanitarian: Heart,
    environmental: Leaf,
    animal_welfare: Users,
    creative: Sparkles,
    educational: GraduationCap
};

const MissionCard = ({ mission, onSupport }) => {
    const Icon = iconMap[mission.mission_type] || Heart;
    const progress = mission.gmt_target > 0 ? (mission.gmt_raised / mission.gmt_target) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-purple-900/40 to-black border-2 border-purple-500/30 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all shadow-xl"
        >
            {/* Image */}
            {mission.image_url && (
                <div className="h-48 overflow-hidden">
                    <img src={mission.image_url} alt={mission.title} className="w-full h-full object-cover" />
                </div>
            )}
            
            <div className="p-6 space-y-4">
                {/* Header with icon and title */}
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                        <Icon className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-1">{mission.title}</h3>
                        {mission.mission_type && (
                            <p className="text-sm text-gray-400 capitalize">{mission.mission_type.replace(/_/g, ' ')}</p>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm line-clamp-3">{mission.description}</p>

                {/* Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-bold font-mono">
                            {(mission.gmt_raised || 0).toLocaleString()} / {(mission.gmt_target || 0).toLocaleString()} P51
                        </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 italic">raised from our family</p>
                </div>

                {/* Support Button */}
                <Button 
                    onClick={() => onSupport(mission)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-6 rounded-xl"
                >
                    <Heart className="w-5 h-5 mr-2" />
                    Support This Mission
                </Button>
            </div>
        </motion.div>
    );
};

const SupportModal = ({ mission, onClose, onConfirm, userBalance }) => {
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        const numAmount = parseFloat(amount);
        if (!numAmount || numAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (numAmount > userBalance) {
            alert("You don't have enough P51. Heal the planet to earn more! 🌍");
            return;
        }

        setIsSubmitting(true);
        try {
            await onConfirm(mission, numAmount);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            alert('Error supporting mission. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="bg-gradient-to-br from-purple-900 to-black border-2 border-green-500/50 text-white max-w-md">
                    <div className="text-center py-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-2">Love Transmitted!</h2>
                        <p className="text-gray-300">Your P51 is now healing the world. 🪐♾️❤️</p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-gradient-to-br from-purple-900 to-black border-2 border-purple-500/50 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{mission.title}</DialogTitle>
                    <DialogDescription className="text-gray-300 text-base">
                        Send your P51 to support this mission. Every bit helps heal our world.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div>
                        <Label htmlFor="amount" className="text-gray-200 mb-2 block">Amount to Send</Label>
                        <div className="relative">
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="bg-black/50 border-purple-500/30 text-white text-lg pr-16"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-purple-400 font-mono">
                                P51
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-400">Your Balance:</span>
                            <span className="text-white font-bold font-mono">{userBalance.toLocaleString()} P51</span>
                        </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <p className="text-sm text-gray-300">
                            <strong className="text-white">Mission needs:</strong> {mission.gmt_target?.toLocaleString() || 0} P51
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                            <strong className="text-white">Already raised:</strong> {mission.gmt_raised?.toLocaleString() || 0} P51
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-3">
                    <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Transmitting...
                            </>
                        ) : (
                            <>
                                <Heart className="w-4 h-4 mr-2" />
                                Send Love
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function LoveExchange() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [supportingMission, setSupportingMission] = useState(null);

    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ['loveExchangeUser'],
        queryFn: () => base44.auth.me()
    });

    const { data: missions = [], isLoading } = useQuery({
        queryKey: ['missions'],
        queryFn: () => base44.entities.Mission.list('-created_date', 100),
        initialData: []
    });

    const supportMutation = useMutation({
        mutationFn: async ({ mission, amount }) => {
            // Deduct from user
            const newBalance = (user.total_tokens_earned || 0) - amount;
            await base44.auth.updateMe({ total_tokens_earned: newBalance });

            // Add to mission
            const newRaised = (mission.gmt_raised || 0) + amount;
            await base44.entities.Mission.update(mission.id, { gmt_raised: newRaised });

            // Create transaction
            await base44.entities.Transaction.create({
                transaction_type: 'sent',
                p51_amount: amount,
                from_user: user.email,
                to_user: 'love_exchange',
                reason: `Supported: ${mission.title}`,
                reference_id: mission.id
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['missions'] });
            queryClient.invalidateQueries({ queryKey: ['loveExchangeUser'] });
            queryClient.invalidateQueries({ queryKey: ['walletUser'] });
            queryClient.invalidateQueries({ queryKey: ['portalUser'] });
        }
    });

    const categories = [
        { id: 'all', label: 'All Missions', icon: Target },
        { id: 'humanitarian', label: 'Humanitarian Aid', icon: Heart },
        { id: 'environmental', label: 'Environmental', icon: Leaf },
        { id: 'animal_welfare', label: 'Wildlife & Conservation', icon: Users },
        { id: 'educational', label: 'Education', icon: GraduationCap },
    ];

    const filteredMissions = missions.filter(m => {
        const matchesCategory = selectedCategory === 'all' || m.mission_type === selectedCategory;
        const matchesSearch = m.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSupport = (mission) => {
        if (!user) {
            base44.auth.redirectToLogin();
            return;
        }
        setSupportingMission(mission);
    };

    const handleConfirmSupport = async (mission, amount) => {
        await supportMutation.mutateAsync({ mission, amount });
    };

    if (isLoading) return <QuantumLoader />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <header className="text-center space-y-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Globe className="w-20 h-20 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #67e8f9)'}} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        The Love Exchange
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Where your P51 becomes real-world healing. Support verified missions with pure love currency.
                    </p>

                    {user && (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-block bg-black/60 backdrop-blur-lg px-8 py-4 rounded-full border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                        >
                            <span className="text-gray-400 mr-3">Your Balance:</span>
                            <span className="text-3xl font-bold text-white">{(user.total_tokens_earned || 0).toLocaleString()}</span>
                            <span className="text-purple-400 ml-2 font-mono text-xl">P51</span>
                        </motion.div>
                    )}
                </header>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Badge className="bg-green-900/50 text-green-300 border-2 border-green-500/50 px-5 py-2.5 text-sm font-bold">
                        <Shield className="w-5 h-5 mr-2" />
                        ESG Verified
                    </Badge>
                    <Badge className="bg-blue-900/50 text-blue-300 border-2 border-blue-500/50 px-5 py-2.5 text-sm font-bold">
                        <Target className="w-5 h-5 mr-2" />
                        UN SDG Aligned
                    </Badge>
                    <Badge className="bg-purple-900/50 text-purple-300 border-2 border-purple-500/50 px-5 py-2.5 text-sm font-bold">
                        <Sparkles className="w-5 h-5 mr-2" />
                        100% Transparent
                    </Badge>
                </div>

                {/* Trust Message */}
                <Card className="bg-black/50 border-2 border-purple-500/30 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-300 text-lg">
                            Every mission is verified. Every P51 is tracked. Every impact is measurable. This is how love currency becomes real change.
                        </p>
                    </CardContent>
                </Card>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.id;
                        return (
                            <Button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`${
                                    isActive 
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-400' 
                                        : 'bg-black/50 border-gray-700 text-gray-300 hover:bg-gray-800'
                                } border-2 font-bold`}
                            >
                                <Icon className="w-5 h-5 mr-2" />
                                {cat.label}
                            </Button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search missions by name or cause..."
                            className="pl-12 bg-black/50 border-2 border-purple-500/30 text-white placeholder-gray-500 h-14 text-lg rounded-xl"
                        />
                    </div>
                </div>

                {/* Missions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredMissions.length > 0 ? (
                            filteredMissions.map((mission) => (
                                <MissionCard key={mission.id} mission={mission} onSupport={handleSupport} />
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20"
                            >
                                <Heart className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400 text-xl">No missions found. Try a different search or filter.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* Support Modal */}
            {supportingMission && (
                <SupportModal 
                    mission={supportingMission}
                    onClose={() => setSupportingMission(null)}
                    onConfirm={handleConfirmSupport}
                    userBalance={user?.total_tokens_earned || 0}
                />
            )}
        </div>
    );
}