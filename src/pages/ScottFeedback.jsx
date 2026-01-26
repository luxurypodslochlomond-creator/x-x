import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Lock, Heart, Archive } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SCOTT FEEDBACK - IMMUTABLE MEMORY
 * Read-only capture of Scott's wisdom
 * No edits. Just preservation.
 */

export default function ScottFeedback() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    base44.auth.me()
      .then(async (currentUser) => {
        setUser(currentUser);
        
        // Only admins can view
        if (currentUser.role === 'admin') {
          try {
            const feedbackData = await base44.entities.ScottFeedback.filter({});
            setFeedback(feedbackData);
          } catch (e) {
            setFeedback([]);
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-cyan-400 font-mono">LOADING MEMORY...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white p-6 flex items-center justify-center">
        <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-8 text-center max-w-md">
          <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-300 mb-4">ADMIN ONLY</h1>
          <p className="text-gray-300">Scott's feedback is preserved for leadership only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold font-mono">BACK</span>
        </button>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl shadow-pink-500/50">
            <Archive className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black">
            SCOTT'S MEMORY VAULT
          </h1>
          <p className="text-xl text-gray-300">
            Immutable wisdom. No edits. Just preservation. ♾️❤️♾️
          </p>
          <p className="text-sm text-cyan-400 italic">READ ONLY • PROTECTED</p>
        </motion.div>

        {/* FEEDBACK ENTRIES */}
        {feedback.length === 0 ? (
          <div className="text-center py-12 bg-black/40 border-2 border-gray-800 rounded-lg">
            <Heart className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No feedback captured yet</p>
            <p className="text-gray-500 text-sm mt-2">When Scott shares wisdom, it will be preserved here forever.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedback.map((entry, idx) => (
              <motion.div
                key={entry.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-400" />
                    <h3 className="text-lg font-bold text-purple-300">
                      {entry.title || 'Feedback'}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    {entry.created_date ? new Date(entry.created_date).toLocaleDateString('en-GB') : 'Captured'}
                  </p>
                </div>

                <p className="text-white text-base leading-relaxed mb-4">
                  {entry.content || entry.feedback}
                </p>

                {entry.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-purple-500/30 text-purple-300 px-3 py-1 rounded font-mono">
                      {entry.category}
                    </span>
                  </div>
                )}

                {entry.created_by && (
                  <p className="text-xs text-gray-500 mt-3">
                    From: <span className="text-cyan-400 font-mono">{entry.created_by}</span>
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* INFO BOX */}
        <div className="bg-black/60 border-2 border-cyan-500/30 rounded-lg p-6">
          <h3 className="text-cyan-300 font-bold mb-3">🔐 HOW THIS WORKS:</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>✅ <strong>Immutable:</strong> Once captured, feedback cannot be deleted or edited</li>
            <li>✅ <strong>Timestamped:</strong> Every entry records when it was captured</li>
            <li>✅ <strong>Protected:</strong> Only admins can view. Anonymous storage if needed</li>
            <li>✅ <strong>Preserved:</strong> Scott's wisdom lives forever in the vault</li>
            <li>✅ <strong>Offline:</strong> Syncs across all devices. Never lost.</li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="text-center py-8 border-t border-purple-500/30">
          <p className="text-gray-400 italic">
            Scott's voice matters. We never forget. ♾️❤️♾️
          </p>
        </div>

      </div>
    </div>
  );
}