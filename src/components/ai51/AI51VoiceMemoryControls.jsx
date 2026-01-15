import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Brain, Trash2, Power, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * USER CONTROLS FOR VOICE LEARNING
 * Full transparency: see what AI learned, delete anytime
 */

export default function AI51VoiceMemoryControls() {
  const [profile, setProfile] = useState(null);
  const [memories, setMemories] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const user = await base44.auth.me();
      if (!user) return;

      const profiles = await base44.entities.AI51VoiceProfile.filter({
        created_by: user.email
      });

      if (profiles.length > 0) {
        setProfile(profiles[0]);

        // Load related memories
        const allMemories = await base44.entities.AI51Memory.filter({
          tags: { $in: ['voice_learning'] }
        });
        setMemories(allMemories);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLearning = async () => {
    if (!profile) return;

    const newState = !profile.learning_consent;
    try {
      await base44.entities.AI51VoiceProfile.update(profile.id, {
        learning_consent: newState
      });
      setProfile({ ...profile, learning_consent: newState });
    } catch (error) {
      console.error('Failed to update consent:', error);
    }
  };

  const clearAllMemories = async () => {
    if (!confirm('Permanently delete all voice learning data?')) return;

    try {
      // Delete all voice learning memories
      await Promise.all(
        memories.map(m => base44.entities.AI51Memory.delete(m.id))
      );

      // Reset profile
      if (profile) {
        await base44.entities.AI51VoiceProfile.update(profile.id, {
          voice_characteristics: {},
          emotional_patterns: {},
          memory_entries: [],
          learning_consent: false
        });
      }

      setMemories([]);
      setProfile({ ...profile, learning_consent: false });
    } catch (error) {
      console.error('Failed to clear memories:', error);
    }
  };

  if (isLoading) return null;
  if (!profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black border-2 border-cyan-500/30 rounded-xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-cyan-400" />
          <h3 className="text-white font-black font-mono text-lg">VOICE LEARNING</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-400 hover:text-cyan-400 transition-colors"
        >
          {showDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Status */}
      <div className="bg-black border border-cyan-500/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm font-mono">Learning Status</span>
          <button
            onClick={toggleLearning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
              profile.learning_consent
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
            }`}
          >
            <Power className="w-4 h-4" />
            {profile.learning_consent ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        <p className="text-gray-500 text-xs font-mono mb-3">
          {profile.learning_consent
            ? '✓ AI51 is learning your voice patterns (on-device only)'
            : '✗ Voice learning is disabled'}
        </p>

        {profile.learning_consent && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-2">
            <p className="text-cyan-300 text-xs font-mono">
              🔒 All data stays on your device
              <br />
              📊 Used to personalize responses
              <br />
              🗑️ You can delete anytime
            </p>
          </div>
        )}
      </div>

      {/* Learning Scope */}
      {profile.learning_scope && profile.learning_scope.length > 0 && (
        <div className="bg-black border border-cyan-500/20 rounded-lg p-4 mb-4">
          <span className="text-gray-400 text-sm font-mono block mb-3">What We're Learning</span>
          <div className="flex flex-wrap gap-2">
            {profile.learning_scope.map(scope => (
              <span
                key={scope}
                className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-mono rounded"
              >
                {scope.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Memories */}
      {showDetails && memories.length > 0 && (
        <div className="bg-black border border-cyan-500/20 rounded-lg p-4 mb-4">
          <span className="text-gray-400 text-sm font-mono block mb-3">
            Learned Patterns ({memories.length})
          </span>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {memories.map(m => (
              <div key={m.id} className="bg-black border border-gray-900 rounded p-2">
                <p className="text-gray-300 text-xs font-mono">{m.content}</p>
                {m.context && (
                  <p className="text-gray-600 text-xs font-mono mt-1">{m.context}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <button
        onClick={clearAllMemories}
        disabled={memories.length === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/50 text-red-300 rounded-lg font-bold font-mono transition-all"
      >
        <Trash2 className="w-4 h-4" />
        DELETE ALL VOICE DATA
      </button>
    </motion.div>
  );
}