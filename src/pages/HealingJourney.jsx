import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';
import { Heart, Shield, Moon, Brain, Zap, Wind, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * MY HEALING JOURNEY
 * 8-bit COOLASFUCK visual proof of your healing progress
 * Zero extraction, pure empowerment
 */

const PROTOCOL_ICONS = {
  anxiety: Shield,
  sleep: Moon,
  focus: Brain,
  trauma: Shield,
  pain: Zap,
  morning: Sun,
  tinnitus: Wind,
  depression: Heart,
  addiction: Shield,
  burnout: Sun,
  immune: Shield,
  emotional_eating: Heart,
  grief: Heart,
  anger: Zap,
  menopause: Sun,
  emergency: Shield
};

const PROTOCOL_COLORS = {
  anxiety: '#8B5CF6',
  sleep: '#3B82F6',
  focus: '#10B981',
  trauma: '#06B6D4',
  pain: '#F59E0B',
  morning: '#F97316',
  tinnitus: '#06B6D4',
  depression: '#14B8A6',
  addiction: '#F59E0B',
  burnout: '#8B5CF6',
  immune: '#22C55E',
  emotional_eating: '#F59E0B',
  grief: '#EC4899',
  anger: '#F97316',
  menopause: '#F97316',
  emergency: '#EF4444'
};

export default function HealingJourney() {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        console.log('Not authenticated');
      }
    };
    loadUser();
  }, []);

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['healingSessions'],
    queryFn: () => base44.entities.VoiceHealingSession.list('-session_date', 100),
    enabled: !!user
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <COOLASFUCKHeart size={64} animate={true} />
          <h2 className="text-2xl font-black font-mono">Sign in to see your healing journey</h2>
          <button
            onClick={() => base44.auth.redirectToLogin()}
            className="px-6 py-3 bg-pink-600 border-4 border-pink-400 text-white font-black font-mono"
            style={{ boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.8)' }}
          >
            SIGN IN
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <COOLASFUCKWaves size={64} animate={true} />
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex justify-center mb-6"
            >
              <COOLASFUCKHeart size={80} animate={true} />
            </motion.div>
            <h1 className="text-5xl font-black font-mono mb-4">MY HEALING JOURNEY</h1>
            <p className="text-gray-400 font-mono">Your personal healing story starts here</p>
          </header>

          <div className="bg-black border-4 border-pink-500 p-8 text-center space-y-6">
            <p className="text-xl text-white font-mono">No sessions yet!</p>
            <p className="text-gray-400">Start your first Voice Healing session to begin tracking your journey.</p>
            <Link
              to={createPageUrl('FrequencyChamber')}
              className="inline-block px-8 py-4 bg-pink-600 border-4 border-pink-400 text-white font-black font-mono text-lg hover:bg-pink-700"
              style={{ boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.8)' }}
            >
              START HEALING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalSessions = sessions.length;
  const firstSession = sessions[sessions.length - 1];
  const latestSession = sessions[0];
  const stressReduction = Math.round(firstSession.stress_level_detected - latestSession.stress_level_detected);
  const avgStress = Math.round(sessions.reduce((sum, s) => sum + s.stress_level_detected, 0) / sessions.length);
  
  // Protocol usage
  const protocolCounts = {};
  sessions.forEach(s => {
    protocolCounts[s.recommended_protocol] = (protocolCounts[s.recommended_protocol] || 0) + 1;
  });
  const topProtocol = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1])[0];

  // Time patterns
  const hourCounts = {};
  sessions.forEach(s => {
    const hour = new Date(s.created_date).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  const bestHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex justify-center mb-6"
          >
            <COOLASFUCKHeart size={80} animate={true} />
          </motion.div>
          <h1 className="text-5xl font-black font-mono mb-4">MY HEALING JOURNEY</h1>
          <p className="text-gray-400 font-mono">Your progress, your story, your power</p>
        </header>

        {/* BIG STATS - 8-BIT STYLE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black border-4 border-cyan-500 p-6"
            style={{ boxShadow: '4px 4px 0px rgba(34, 211, 238, 0.5)' }}
          >
            <p className="text-4xl font-black text-cyan-400 font-mono">{totalSessions}</p>
            <p className="text-sm text-gray-400 font-mono mt-2">SESSIONS</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black border-4 border-green-500 p-6"
            style={{ boxShadow: '4px 4px 0px rgba(34, 197, 94, 0.5)' }}
          >
            <p className="text-4xl font-black text-green-400 font-mono">
              {stressReduction > 0 ? '-' : '+'}{Math.abs(stressReduction)}%
            </p>
            <p className="text-sm text-gray-400 font-mono mt-2">STRESS CHANGE</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black border-4 border-pink-500 p-6"
            style={{ boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.5)' }}
          >
            <p className="text-4xl font-black text-pink-400 font-mono">{avgStress}%</p>
            <p className="text-sm text-gray-400 font-mono mt-2">AVG STRESS</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black border-4 border-purple-500 p-6"
            style={{ boxShadow: '4px 4px 0px rgba(168, 85, 247, 0.5)' }}
          >
            <p className="text-4xl font-black text-purple-400 font-mono">{topProtocol[1]}</p>
            <p className="text-sm text-gray-400 font-mono mt-2">{topProtocol[0].toUpperCase()}</p>
          </motion.div>
        </div>

        {/* 8-BIT STRESS GRAPH */}
        <div className="bg-black border-4 border-cyan-500 p-6 mb-8">
          <h2 className="text-2xl font-black font-mono text-cyan-400 mb-6">STRESS OVER TIME</h2>
          <div className="h-64 flex items-end gap-1">
            {sessions.slice(-20).reverse().map((session, i) => {
              const height = (session.stress_level_detected / 100) * 100;
              const color = session.stress_level_detected > 70 ? '#ef4444' : session.stress_level_detected > 40 ? '#f59e0b' : '#22c55e';
              
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 rounded-t cursor-pointer hover:opacity-80"
                  style={{ 
                    backgroundColor: color,
                    minWidth: '8px',
                    boxShadow: `0 0 10px ${color}40`
                  }}
                  title={`Session ${sessions.length - i}: ${session.stress_level_detected}% stress`}
                />
              );
            })}
          </div>
          <p className="text-xs text-gray-500 font-mono mt-4 text-center">Last 20 sessions</p>
        </div>

        {/* INSIGHTS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-black border-4 border-pink-500 p-6">
            <h3 className="text-xl font-black font-mono text-pink-400 mb-4">YOUR PATTERN</h3>
            <div className="space-y-3 text-sm font-mono">
              <p className="text-gray-300">
                <span className="text-white font-bold">Best time:</span> {bestHour[0]}:00 ({bestHour[1]} sessions)
              </p>
              <p className="text-gray-300">
                <span className="text-white font-bold">Most used:</span> {topProtocol[0]} protocol
              </p>
              <p className="text-gray-300">
                <span className="text-white font-bold">Current stress:</span> {latestSession.stress_level_detected}%
              </p>
            </div>
          </div>

          <div className="bg-black border-4 border-green-500 p-6">
            <h3 className="text-xl font-black font-mono text-green-400 mb-4">PROTOCOLS USED</h3>
            <div className="space-y-2">
              {Object.entries(protocolCounts).sort((a, b) => b[1] - a[1]).map(([protocol, count]) => {
                const Icon = PROTOCOL_ICONS[protocol] || Heart;
                const color = PROTOCOL_COLORS[protocol] || '#ec4899';
                const percentage = Math.round((count / totalSessions) * 100);
                
                return (
                  <div key={protocol} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-mono text-white">{protocol}</span>
                        <span className="text-sm font-mono text-gray-400">{count}x</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SESSION HISTORY */}
        <div className="bg-black border-4 border-purple-500 p-6">
          <h2 className="text-2xl font-black font-mono text-purple-400 mb-6">SESSION HISTORY</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.map((session, i) => {
              const Icon = PROTOCOL_ICONS[session.recommended_protocol] || Heart;
              const color = PROTOCOL_COLORS[session.recommended_protocol] || '#ec4899';
              const date = new Date(session.created_date).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              });
              
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gray-900/50 border-2 border-gray-700 p-4 hover:border-gray-500 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 flex-shrink-0 mt-1" style={{ color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <p className="text-white font-mono font-bold">{session.healing_intent}</p>
                        <p className="text-gray-500 text-sm font-mono">{date}</p>
                      </div>
                      <div className="flex gap-4 text-sm font-mono">
                        <span className={`${session.stress_level_detected > 70 ? 'text-red-400' : session.stress_level_detected > 40 ? 'text-amber-400' : 'text-green-400'}`}>
                          Stress: {session.stress_level_detected}%
                        </span>
                        <span className="text-cyan-400">F0: {Math.round(session.voice_f0_hz)}Hz</span>
                        <span className="text-purple-400">Vowel: {session.dominant_vowel}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 font-mono">→ {session.recommended_protocol}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-12 text-center">
          <Link
            to={createPageUrl('FrequencyChamber')}
            className="inline-block px-8 py-4 bg-pink-600 border-4 border-pink-400 text-white font-black font-mono text-lg hover:bg-pink-700"
            style={{ boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.8)' }}
          >
            NEW SESSION
          </Link>
        </div>

      </div>
    </div>
  );
}