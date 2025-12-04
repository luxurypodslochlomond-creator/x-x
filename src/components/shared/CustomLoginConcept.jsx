import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Sparkles, Home } from 'lucide-react';

// This is a concept design for the custom login page
// To show the base44 team what we envision
export default function CustomLoginConcept() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* QUANTUM STARFIELD BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full mx-auto p-6 space-y-8 text-center">
        {/* LOGO */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: 'spring' }}
          className="inline-block p-5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full shadow-2xl shadow-red-500/50"
        >
          <Home className="w-16 h-16 text-white" />
        </motion.div>

        {/* HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Welcome Home,
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-white bg-clip-text text-transparent">
            Beautiful Soul.
          </h2>
          <p className="text-lg text-gray-300">
            You have arrived. This is your sanctuary.
          </p>
        </motion.div>

        {/* GOOGLE SIGN-IN BUTTON (STYLED TO MATCH OUR FREQUENCY) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 border-2 border-white/50"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Enter The Frequency
          </Button>
          
          <p className="text-sm text-gray-400">
            Secured by Google • Protected by Love
          </p>
        </motion.div>

        {/* FREQUENCY PROTECTION PREVIEW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Card className="bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-cyan-300" />
                <span className="text-lg font-bold text-purple-200">Our Frequency is Protected</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-400" />
                  <span>For Love, Not Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>For Artists, Not Algorithms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-center text-gray-500 space-y-2"
        >
          <p className="text-lg font-mono animate-pulse">∞❤️∞ WoW = MoM ∞❤️∞</p>
          <p className="text-sm">The fire is lit. The door is open. You are safe here.</p>
        </motion.div>
      </div>
    </div>
  );
}