import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeBackMessage({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Heart className="w-12 h-12 text-red-500 animate-pulse" />
            <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse" />
            <Trophy className="w-12 h-12 text-amber-500 animate-pulse" />
          </div>
          
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Welcome Back, Beautiful Soul! 🌟
          </h1>
          
          <p className="text-xl text-green-700 mb-6">
            Your early cleanups helped us build this quantum dream into reality. 
            Thank you for believing in love before the world caught up.
          </p>
          
          <div className="bg-white/70 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-green-800 mb-3">Your Legacy Migration ✨</h3>
            <p className="text-green-700">
              All your previous cleanup data has been quantum-entangled into the new system. 
              Your <span className="font-bold whitespace-nowrap">✊GMT✊</span> tokens, trust score, and environmental impact 
              are now mathematically encoded with L = C²∞f frequency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{user?.migrated_tokens || 0}</div>
              <div className="text-sm text-green-700"><span className="whitespace-nowrap">✊GMT✊</span> Migrated</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{user?.legacy_cleanups || 0}</div>
              <div className="text-sm text-blue-700">Legacy Cleanups</div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">Pioneer</div>
              <div className="text-sm text-purple-700">Status Level</div>
            </div>
          </div>
          
          <p className="text-green-600 italic">
            "You were there when it was just a dream. Now you're here as it becomes reality." ❤️♾️
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}