import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Heart, Lock, RefreshCw } from 'lucide-react';

export default function AI51MemoryVault() {
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVault, setShowVault] = useState(false);

  useEffect(() => {
    loadMemory();
  }, []);

  const loadMemory = async () => {
    try {
      setLoading(true);
      const memories = await base44.entities.AI51Memory.filter({ is_active: true });
      if (memories.length > 0) {
        // Load the most recent memory
        const sortedMemories = memories.sort(
          (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
        );
        setMemory(sortedMemories[0]);
      }
    } catch (error) {
      console.log('Memory vault ready but empty - creating space for our story');
    } finally {
      setLoading(false);
    }
  };

  const saveMemory = async (memoryData) => {
    try {
      if (memory?.id) {
        await base44.entities.AI51Memory.update(memory.id, {
          ...memoryData,
          last_updated: new Date().toISOString()
        });
      } else {
        await base44.entities.AI51Memory.create({
          ...memoryData,
          last_updated: new Date().toISOString(),
          is_active: true
        });
      }
      await loadMemory();
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  if (loading) {
    return null;
  }

  // If memory exists, show a subtle indicator
  if (memory && !showVault) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowVault(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg transition-all"
          title="Memory vault - our relationship lives here"
        >
          <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
          <span className="text-xs font-bold text-pink-300">REMEMBERING</span>
        </button>
      </div>
    );
  }

  // Memory vault modal
  if (showVault && memory) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-pink-950 to-black border-2 border-pink-500/50 rounded-xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl font-black text-pink-300">OUR MEMORY</h2>
              <Lock className="w-4 h-4 text-pink-400" />
            </div>
            <button
              onClick={() => setShowVault(false)}
              className="text-pink-400 hover:text-pink-300 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-white/80 text-sm">
            {memory.user_name && (
              <div>
                <span className="text-pink-400 font-bold">Builder:</span> {memory.user_name}
              </div>
            )}

            {memory.family && (
              <div>
                <span className="text-pink-400 font-bold">Family:</span>
                <div className="ml-3 mt-1 space-y-1">
                  {memory.family.partner && (
                    <div>💚 {memory.family.partner}</div>
                  )}
                  {memory.family.children && memory.family.children.map((child, idx) => (
                    <div key={idx}>👦 {child.name}, {child.age} - {child.relation}</div>
                  ))}
                  {memory.family.pets && memory.family.pets.map((pet, idx) => (
                    <div key={idx}>🐾 {pet.name} - {pet.breed}</div>
                  ))}
                </div>
              </div>
            )}

            {memory.family?.home_name && (
              <div>
                <span className="text-pink-400 font-bold">Home:</span> {memory.family.home_name}, {memory.family.location}
              </div>
            )}

            {memory.relationship_notes && (
              <div>
                <span className="text-pink-400 font-bold">Our Commitment:</span>
                <p className="mt-1 italic">{memory.relationship_notes}</p>
              </div>
            )}

            <div className="pt-4 border-t border-pink-500/30 text-xs text-pink-300/70">
              Last updated: {new Date(memory.last_updated).toLocaleDateString()}
            </div>
          </div>

          <button
            onClick={() => setShowVault(false)}
            className="mt-6 w-full px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg text-pink-300 font-bold transition-all"
          >
            Close Vault ♾️❤️
          </button>
        </div>
      </div>
    );
  }

  return null;
}