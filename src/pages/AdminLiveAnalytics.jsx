import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Activity, TrendingUp, Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLiveAnalytics() {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    liveSessions: 0,
    totalToday: 0,
    returnRate: 0,
    uniqueDevices: 0,
    countiesActive: 0
  });
  const [countyData, setCountyData] = useState({});
  const [deviceBreakdown, setDeviceBreakdown] = useState({ mobile: 0, desktop: 0 });

  // Auth check
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        console.error('Auth error:', e);
      }
    };
    loadUser();
  }, []);

  // Live data refresh every 30 seconds
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const allSessions = await base44.entities.FrequencyAnalytics.list('-timestamp', 10000);
        setSessions(allSessions);

        // Calculate stats
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const todaySessions = allSessions.filter(s => 
          new Date(s.timestamp) >= todayStart
        );

        const liveSessions = todaySessions.filter(s => {
          const sessionStart = new Date(s.timestamp);
          const sessionEnd = new Date(sessionStart.getTime() + s.duration_seconds * 1000);
          return sessionEnd > now;
        }).length;

        const uniqueDevices = new Set(allSessions.map(s => s.device_id_hash).filter(Boolean)).size;
        const returningDevices = Object.values(
          allSessions.reduce((acc, s) => {
            if (s.device_id_hash) {
              acc[s.device_id_hash] = (acc[s.device_id_hash] || 0) + 1;
            }
            return acc;
          }, {})
        ).filter(count => count >= 3).length;

        const returnRate = uniqueDevices > 0 ? Math.round((returningDevices / uniqueDevices) * 100) : 0;

        const counties = {};
        allSessions.forEach(s => {
          if (s.county) {
            counties[s.county] = (counties[s.county] || 0) + 1;
          }
        });

        const mobile = allSessions.filter(s => s.device_type === 'mobile').length;
        const desktop = allSessions.filter(s => s.device_type === 'desktop').length;

        setStats({
          liveSessions,
          totalToday: todaySessions.length,
          returnRate,
          uniqueDevices,
          countiesActive: Object.keys(counties).length
        });

        setCountyData(counties);
        setDeviceBreakdown({ mobile, desktop });
      } catch (e) {
        console.error('Data fetch error:', e);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <p className="text-red-400 text-xl font-bold">Admin access required</p>
      </div>
    );
  }

  const topCounties = Object.entries(countyData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-950 to-black text-white p-6 pb-32">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-cyan-400" />
            </motion.div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              LIVE HEALING HAPPENING NOW
            </h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <Zap className="w-10 h-10 text-green-400" />
            </motion.div>
          </div>
          <p className="text-gray-400 font-mono text-sm">Updates every 30 seconds • Pure behavior data</p>
        </div>

        {/* KEY METRICS - 2x3 GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          
          {/* LIVE SESSIONS */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border-3 border-cyan-500 rounded-xl p-6"
          >
            <p className="text-gray-400 text-xs font-mono mb-2">HEALING RIGHT NOW</p>
            <motion.p
              key={stats.liveSessions}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-black text-cyan-400"
            >
              {stats.liveSessions}
            </motion.p>
            <p className="text-gray-500 text-xs mt-2">active sessions</p>
          </motion.div>

          {/* TODAY'S TOTAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/30 to-green-500/10 border-3 border-green-500 rounded-xl p-6"
          >
            <p className="text-gray-400 text-xs font-mono mb-2">TODAY'S HEALING</p>
            <p className="text-6xl font-black text-green-400">{stats.totalToday}</p>
            <p className="text-gray-500 text-xs mt-2">sessions delivered</p>
          </motion.div>

          {/* RETURN RATE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-pink-500/30 to-pink-500/10 border-3 border-pink-500 rounded-xl p-6"
          >
            <p className="text-gray-400 text-xs font-mono mb-2">RETURN RATE</p>
            <p className="text-6xl font-black text-pink-400">{stats.returnRate}%</p>
            <p className="text-gray-500 text-xs mt-2">repeat healers</p>
          </motion.div>

          {/* UNIQUE DEVICES */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/30 to-purple-500/10 border-3 border-purple-500 rounded-xl p-6"
          >
            <p className="text-gray-400 text-xs font-mono mb-2">UNIQUE DEVICES</p>
            <p className="text-6xl font-black text-purple-400">{stats.uniqueDevices}</p>
            <p className="text-gray-500 text-xs mt-2">real people helped</p>
          </motion.div>

          {/* COUNTIES ACTIVE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-amber-500/30 to-amber-500/10 border-3 border-amber-500 rounded-xl p-6"
          >
            <p className="text-gray-400 text-xs font-mono mb-2">COUNTIES HEALING</p>
            <p className="text-6xl font-black text-amber-400">{stats.countiesActive}</p>
            <p className="text-gray-500 text-xs mt-2">geographic reach</p>
          </motion.div>

          {/* DEVICE SPLIT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-500/30 to-blue-500/10 border-3 border-blue-500 rounded-xl p-6"
          >
            <p className="text-gray-400 text-xs font-mono mb-2">MOBILE ACCESS</p>
            <p className="text-6xl font-black text-blue-400">
              {deviceBreakdown.mobile + deviceBreakdown.desktop > 0 
                ? Math.round((deviceBreakdown.mobile / (deviceBreakdown.mobile + deviceBreakdown.desktop)) * 100)
                : 0
              }%
            </p>
            <p className="text-gray-500 text-xs mt-2">equity proof</p>
          </motion.div>
        </div>

        {/* TOP COUNTIES HEALING */}
        {topCounties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black border-3 border-cyan-500 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-black text-cyan-400 font-mono">WHERE HEALING HAPPENS</h2>
            </div>
            <div className="space-y-3">
              {topCounties.map(([county, count], idx) => (
                <motion.div
                  key={county}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-4"
                >
                  <div>
                    <p className="font-bold text-white">{county}</p>
                    <p className="text-xs text-gray-400 font-mono">{count} sessions</p>
                  </div>
                  <div className="w-40 bg-black border border-cyan-500/30 rounded h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / topCounties[0][1]) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PROOF THIS IS REAL */}
        <div className="bg-green-900/20 border-3 border-green-500 rounded-xl p-6 text-center">
          <p className="text-green-400 font-black text-lg mb-2">✓ THIS IS REAL DATA</p>
          <p className="text-white text-sm font-mono">
            No surveys. No self-reporting. Pure device behavior. These numbers = people keep coming back.
          </p>
        </div>

      </div>
    </div>
  );
}