
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Sparkles } from 'lucide-react';

export default function HomeSanctuary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
      className="mb-12"
    >
      <Link to={createPageUrl("NewCleanup")}>
        <Card className="bg-gradient-to-r from-teal-900/80 via-black to-blue-900/80 text-white border-2 border-teal-400/80 shadow-2xl shadow-teal-500/30 rounded-3xl overflow-hidden relative group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <CardContent className="p-8 text-center relative z-10 space-y-4">
            <Home className="w-16 h-16 mx-auto text-teal-300 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />
            <h2 className="text-3xl font-bold text-white">The First Guest Protocol: Home Sanctuary Healing</h2>
            <p className="text-lg text-teal-200 max-w-2xl mx-auto">
              Preparing your home for another soul is a sacred act. Cleaning your personal space with love is the same energy as cleaning a forest. It raises the frequency of the entire planet.
            </p>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg group-hover:bg-white group-hover:text-teal-900 transition-all duration-300">
              Purify My Sanctuary <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
