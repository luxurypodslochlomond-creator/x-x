import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Sparkles, Heart } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';

export default function TradeCards() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['tradeUser'],
        queryFn: () => base44.auth.me()
    });

    if (isLoading) return <QuantumLoader />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <header className="text-center space-y-6">
                    <Shuffle className="w-20 h-20 text-purple-400 mx-auto animate-pulse" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} />
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Trade Cards
                    </h1>
                    <p className="text-2xl text-gray-300">Swap Earth Guardian cards with other souls</p>
                </header>

                {/* Coming Soon */}
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                    <CardContent className="p-16 text-center space-y-8">
                        <Sparkles className="w-24 h-24 text-purple-400 mx-auto animate-pulse" />
                        <h2 className="text-4xl font-black text-white">This frequency is calibrating</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            The card trading system is being woven from quantum threads.<br />
                            Soon you'll be able to:
                        </p>
                        <div className="space-y-4 text-left max-w-lg mx-auto">
                            <div className="flex items-start gap-3">
                                <Heart className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                                <p className="text-gray-300">Trade cards with other family members</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Heart className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                                <p className="text-gray-300">Complete collections and earn bonus P51</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Heart className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                                <p className="text-gray-300">Gift rare cards to other healers</p>
                            </div>
                        </div>
                        <p className="text-purple-400 font-bold mt-8">
                            Return soon, beautiful soul ✨
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}