import React, { useState, useEffect } from 'react';
import { GreenManCard } from '@/entities/GreenManCard';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Star, Sparkles, Zap, Crown, Diamond, Loader2 } from 'lucide-react';

const rarityConfig = {
  common: {
    name: 'Common',
    icon: Star,
    color: 'text-gray-400',
    bg: 'from-gray-600 to-gray-800',
    border: 'border-gray-500',
    character: '🌱' // Green Sprout Guardian
  },
  rare: {
    name: 'Rare',
    icon: Sparkles,
    color: 'text-blue-400',
    bg: 'from-blue-600 to-blue-800',
    border: 'border-blue-500',
    character: '♻️' // Recycling Guardian
  },
  epic: {
    name: 'Epic',
    icon: Zap,
    color: 'text-purple-400',
    bg: 'from-purple-600 to-purple-800',
    border: 'border-purple-500',
    character: '🌳' // Forest Guardian
  },
  legendary: {
    name: 'Legendary',
    icon: Crown,
    color: 'text-yellow-400',
    bg: 'from-yellow-600 to-orange-600',
    border: 'border-yellow-500',
    character: '🌟' // Star Guardian
  },
  mythic: {
    name: 'Mythic',
    icon: Diamond,
    color: 'text-pink-400',
    bg: 'from-pink-600 to-purple-600',
    border: 'border-pink-500',
    character: '💚' // Heart of Earth
  }
};

export default function CardCollection() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      const userCards = await GreenManCard.filter({ created_by: currentUser.email }, '-mint_date', 100);
      setCards(userCards);
    } catch (error) {
      console.error("Error loading cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cardsByRarity = {
    mythic: cards.filter(c => c.card_rarity === 'mythic'),
    legendary: cards.filter(c => c.card_rarity === 'legendary'),
    epic: cards.filter(c => c.card_rarity === 'epic'),
    rare: cards.filter(c => c.card_rarity === 'rare'),
    common: cards.filter(c => c.card_rarity === 'common')
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Your Earth Guardian Collection
          </h1>
          <p className="text-2xl text-gray-400">
            {cards.length} Total Cards
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(cardsByRarity).map(([rarity, rarityCards]) => {
            const config = rarityConfig[rarity];
            const Icon = config.icon;
            return (
              <Card key={rarity} className="bg-black/50 border-2 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <Icon className={`w-8 h-8 ${config.color} mx-auto mb-2`} />
                  <p className="text-3xl font-bold text-white">{rarityCards.length}</p>
                  <p className="text-sm text-gray-400">{config.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cards Display */}
        {Object.entries(cardsByRarity).map(([rarity, rarityCards]) => {
          if (rarityCards.length === 0) return null;
          const config = rarityConfig[rarity];
          const Icon = config.icon;

          return (
            <div key={rarity} className="space-y-6">
              <h2 className={`text-3xl font-black ${config.color} flex items-center gap-3`}>
                <Icon className="w-8 h-8" />
                {config.name} Guardians ({rarityCards.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rarityCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-br ${config.bg} border-4 ${config.border} shadow-2xl overflow-hidden relative`}>
                      {/* Holographic effect for rarer cards */}
                      {['legendary', 'mythic'].includes(rarity) && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                      )}
                      
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Icon className="w-8 h-8 text-white" />
                          <Badge className="bg-black/40 text-white border border-white/30">
                            #{card.card_number}
                          </Badge>
                        </div>

                        {/* CHARACTER - BIG AND CENTERED */}
                        <div className="text-center my-8 relative">
                          {/* Glow effect for rarer cards */}
                          {['legendary', 'mythic'].includes(rarity) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-32 h-32 rounded-full ${rarity === 'mythic' ? 'bg-pink-500/30' : 'bg-yellow-500/30'} blur-2xl animate-pulse`} />
                            </div>
                          )}
                          <div className="text-8xl relative z-10">{config.character}</div>
                        </div>

                        <CardTitle className="text-2xl text-white mt-4 text-center">
                          {card.card_name}
                        </CardTitle>
                        <p className="text-sm text-gray-300 text-center">{card.rarity_chance}</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-black/40 rounded-lg p-3 text-center">
                          <p className="text-xl font-bold text-white">{card.token_value} GMT</p>
                        </div>
                        {card.metadata && (
                          <div className="text-xs text-gray-300 space-y-1">
                            <p><strong>Location:</strong> {card.metadata.location}</p>
                            <p><strong>Weight:</strong> {card.metadata.litter_weight}kg</p>
                            {card.metadata.weather && <p><strong>Weather:</strong> {card.metadata.weather}</p>}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 text-center">
                          Earned: {new Date(card.mint_date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {cards.length === 0 && (
          <Card className="bg-black/50 border-2 border-purple-500/30">
            <CardContent className="p-12 text-center">
              <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Cards Yet</h3>
              <p className="text-gray-400">Complete your first cleanup to earn your first Earth Guardian card!</p>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}