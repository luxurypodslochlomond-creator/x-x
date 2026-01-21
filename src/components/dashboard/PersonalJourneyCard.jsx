import React from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKFire } from '@/components/shared/COOLASFUCKIcon';
import { TrendingDown, Flame } from 'lucide-react';

export default function PersonalJourneyCard({ sessions }) {
  if (!sessions || sessions.length === 0) return null;

  // Total sessions
  const totalSessions = sessions.length;

  // Top frequency (most used protocol)
  const protocolCounts = {};
  sessions.forEach(s => {
    protocolCounts[s.recommended_protocol] = (protocolCounts[s.recommended_protocol] || 0) + 1;
  });
  const topProtocol = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1])[0];
  const topProtocolName = topProtocol ? (topProtocol[0] === 'menopause' ? 'vitality' : topProtocol[0].split('_')[0]) : 'unknown';
  const topProtocolCount = topProtocol ? topProtocol[1] : 0;

  // Stress improvement (first session vs recent average)
  const firstStress = sessions[sessions.length - 1]?.stress_level_detected || 50;
  const recentSessions = sessions.slice(0, 7);
  const avgRecentStress = recentSessions.length > 0
    ? Math.round(recentSessions.reduce((sum, s) => sum + (s.stress_level_detected || 0), 0) / recentSessions.length)
    : 50;
  const stressImprovement = firstStress - avgRecentStress;

  // Healing streak (consecutive days with sessions)
  const sessionDates = new Set(
    sessions.map(s => {
      if (!s.session_date) return null;
      return new Date(s.session_date).toDateString();
    }).filter(Boolean)
  );
  
  let streak = 0;
  let currentDate = new Date();
  for (let i = 0; i < 365; i++) {
    const dateStr = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000).toDateString();
    if (sessionDates.has(dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black border-4 border-cyan-500 p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <COOLASFUCKWaves size={32} animate={true} />
        <div>
          <h2 className="text-2xl font-black font-mono text-cyan-400">YOUR PERSONAL JOURNEY</h2>
          <p className="text-cyan-300 font-mono text-xs">Your healing in real numbers</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Sessions */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-black border-2 border-cyan-500/50 p-4 text-center"
        >
          <p className="text-3xl font-black text-cyan-400 font-mono">{totalSessions}</p>
          <p className="text-xs text-gray-400 font-mono mt-2">SESSIONS</p>
        </motion.div>

        {/* Top Frequency */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-black border-2 border-pink-500/50 p-4 text-center"
        >
          <p className="text-sm font-black text-pink-400 font-mono leading-tight">{topProtocolName}</p>
          <p className="text-xs text-gray-400 font-mono mt-2">{topProtocolCount}x USED</p>
        </motion.div>

        {/* Stress Improvement */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black border-2 border-green-500/50 p-4 text-center"
        >
          <div className="flex items-center justify-center gap-1">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <p className="text-2xl font-black text-green-400 font-mono">{Math.abs(stressImprovement)}</p>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-2">STRESS DROP</p>
        </motion.div>

        {/* Healing Streak */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black border-2 border-purple-500/50 p-4 text-center"
        >
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-purple-400" />
            <p className="text-2xl font-black text-purple-400 font-mono">{streak}</p>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-2">DAY STREAK</p>
        </motion.div>
      </div>

      <div className="mt-4 p-3 bg-cyan-900/20 border-2 border-cyan-500/50">
        <p className="text-cyan-300 font-mono text-xs text-center">
          {stressImprovement > 0 
            ? `Your stress dropped ${Math.abs(stressImprovement)} points. The frequencies work.`
            : 'Healing isn\'t always linear - consistency matters most.'}
        </p>
      </div>
    </motion.div>
  );
}