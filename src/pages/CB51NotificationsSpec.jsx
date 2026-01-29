import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51NotificationsSpec() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-bold font-mono">BACK</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3 mb-8"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
            <Bell className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black">CB51 NOTIFICATIONS</h1>
          <p className="text-cyan-300 text-lg">The blueprint. Clutter-free. Stress-free. Simple.</p>
        </motion.div>

        {/* CORE PRINCIPLES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-cyan-300 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            CORE PRINCIPLES
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['CLUTTER FREE', 'SIMPLE', 'UNRESTRICTED', 'EASY', 'STRESS FREE'].map((principle, i) => (
              <div
                key={i}
                className="bg-black/40 border border-cyan-500/50 rounded p-3 text-center font-bold text-cyan-300"
              >
                {principle}
              </div>
            ))}
          </div>
        </motion.div>

        {/* GIG OFFER WORKFLOW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-green-300 mb-4">📧 GIG OFFER WORKFLOW</h2>
          <div className="space-y-3 text-white">
            <p className="font-bold text-lg">Manager pastes gig offer, uploads screenshot of offer, or AI scans email for offer</p>
            <div className="bg-black/40 border border-green-500/30 rounded p-4 space-y-2">
              <p className="text-green-300 font-bold">↓ CB51 processes offer</p>
              <p className="text-green-300 font-bold">↓ CB51 sends notification to Manager phone as above</p>
            </div>
          </div>
        </motion.div>

        {/* RECEIVE NOTIFICATION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-cyan-900/30 to-teal-900/30 border-2 border-cyan-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-cyan-300 mb-4 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            RECEIVE NOTIFICATION: GREEN YES or RED NO
          </h2>
          <div className="space-y-4">
            <div className="bg-black/40 border-l-4 border-green-500 p-4">
              <p className="font-bold text-green-400 mb-2">✅ ARTIST checks personal diary</p>
              <p className="text-gray-300">Look at calendar, availability, conflicts</p>
            </div>
            <div className="bg-black/40 border-l-4 border-cyan-500 p-4">
              <p className="font-bold text-cyan-400 mb-2">📱 Artist answers: YES or NO</p>
              <p className="text-gray-300">Green = Yes, ready to gig. Red = No, can't do it.</p>
            </div>
          </div>
        </motion.div>

        {/* IF EVERYONE YES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-900/30 to-lime-900/30 border-2 border-green-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-green-300 mb-4">🎯 IF EVERYONE YES RESPONSE GOES TO AGENT</h2>
          <div className="space-y-3">
            <div className="bg-black/40 p-4 border border-green-500/30 rounded">
              <p className="font-bold text-green-400">Agent confirms</p>
              <p className="text-sm text-gray-300 mt-1">Band has agreed. Gig is locked in.</p>
            </div>
            <div className="bg-black/40 p-4 border border-cyan-500/30 rounded">
              <p className="font-bold text-cyan-400">Band to CB51 calendar, hand calendar and personal calendars (where necessary / relevant)</p>
              <p className="text-sm text-gray-300 mt-1">Gig syncs everywhere. No missed dates.</p>
            </div>
          </div>
        </motion.div>

        {/* IF ANY NO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-red-300 mb-4">⚠️ IF ANY BAND MEMBER CLICKS NO</h2>
          <div className="space-y-3">
            <div className="bg-black/40 p-4 border border-red-500/30 rounded">
              <p className="font-bold text-red-400">They say why in a reply comment</p>
              <p className="text-sm text-gray-300 mt-1">Context = easy communication</p>
            </div>
            <div className="bg-black/40 p-4 border border-yellow-500/30 rounded">
              <p className="font-bold text-yellow-400">Manager receives notification and discusses with them from there to find resolution</p>
              <p className="text-sm text-gray-300 mt-1">Human conversation. Problem-solving.</p>
            </div>
          </div>
        </motion.div>

        {/* CONFIRMED OR TURNED DOWN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-purple-300 mb-4">📋 WHEN CONFIRMED OR TURNED DOWN</h2>
          <p className="text-white mb-4">This is documented in CB51</p>
          <div className="space-y-2">
            <div className="bg-black/40 p-3 border border-purple-500/30 rounded">
              <p className="font-mono text-sm text-gray-300">✅ Notification messages back and forth, or can be sorted by text / email and confirmed on CB51</p>
            </div>
          </div>
        </motion.div>

        {/* OFFER DETAILS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-2 border-amber-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-amber-300 mb-4">💼 OFFER DETAILS - GREEN YES / RED NO</h2>
          <p className="text-white mb-4">If Manager clicks YES: Band members get same notification as above</p>
          <p className="text-white mb-4">If all band members click YES → Manager gets notification saying "Band have confirmed a draft email confirming the show to the agent/promoter"</p>
          <p className="text-white mb-4">Manager can auto-send or manually edit the email before sending</p>
        </motion.div>

        {/* COMMUNICATION WORKFLOW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-black text-cyan-300 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            COMMUNICATION IS EASY
          </h2>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>If any member says YES or NO their sentence from them which is easy to communication → Manager gets goals to manager</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Notification messages back forth, or can be sorted by text / email and confirmed on CB51</span>
            </li>
          </ul>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center py-8 border-t border-cyan-500/30">
          <p className="text-cyan-300 font-bold mb-2">This is the spec. This is what works.</p>
          <p className="text-gray-400 italic">Clear. Simple. Human. ♾️❤️♾️</p>
        </div>
      </div>
    </div>
  );
}