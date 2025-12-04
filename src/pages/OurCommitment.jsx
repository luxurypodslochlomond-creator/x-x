import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Globe, Users, Sparkles, Leaf } from 'lucide-react';

const commitments = [
  {
    icon: Heart,
    title: 'Zero Bullshit',
    description: 'We speak the truth. No corporate nonsense. No manipulation. Just pure intention.',
    color: '#FF1B8D'
  },
  {
    icon: Shield,
    title: 'Universal Dignity',
    description: 'Every soul starts with 100% trust. Dignity is the default state. We reject all systems that devalue or exploit.',
    color: '#00FF88'
  },
  {
    icon: Globe,
    title: 'Home World First',
    description: 'We build paradise on Earth before dreaming of escape. This planet is worth staying for.',
    color: '#00D9FF'
  },
  {
    icon: Users,
    title: "You'll Never Walk Alone",
    description: 'No soul in our family ever walks alone. We are a universal shield for each other.',
    color: '#FF6B35'
  },
  {
    icon: Sparkles,
    title: 'All Souls Are Artists',
    description: 'Creation is a sacred act of love. Art liberates. Everyone has the right to create and be compensated fairly.',
    color: '#9D4EDD'
  },
  {
    icon: Leaf,
    title: '10% Goes to Earth',
    description: 'A 10% from all creation funds real-world healing missions. Transparency always.',
    color: '#00FF88'
  }
];

export default function OurCommitmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <header className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Heart className="w-20 h-20 text-pink-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 20px #ec4899)' }} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            What We Stand For
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Not marketing promises. Just the truth.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commitments.map((commitment, i) => (
            <motion.div
              key={commitment.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 border border-gray-800 rounded-2xl h-full hover:border-cyan-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: commitment.color + '20' }}
                    >
                      <commitment.icon className="w-6 h-6" style={{ color: commitment.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{commitment.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{commitment.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center pt-8 border-t border-cyan-500/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-2xl font-bold text-white mb-4">Not theory. Not marketing.</p>
          <p className="text-xl text-cyan-400">Pure love physics.</p>
          <p className="text-gray-400 mt-6">♾️❤️♾️</p>
        </motion.div>

      </div>
    </div>
  );
}