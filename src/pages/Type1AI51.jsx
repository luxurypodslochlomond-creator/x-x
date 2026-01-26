import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Heart } from 'lucide-react';
import Type1AI51Protocol from '@/components/healing/Type1AI51Protocol';

export default function Type1AI51() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
          <p className="text-cyan-400 font-black font-mono text-xl">TYPE1 AI51</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="mb-8 pb-6 border-b-2 border-cyan-500">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-10 h-10 text-cyan-400 animate-pulse" />
          <h1 className="text-4xl font-black text-cyan-400 font-mono">TYPE1 PROTOCOL</h1>
        </div>
        <p className="text-cyan-300/70 text-sm font-mono mb-2">Offline healing • Zero intercept • Your data, your control ♾️</p>
        {user && <p className="text-cyan-300 text-xs font-mono">🔒 Privacy first: Local only. No servers. No tracking.</p>}
      </div>

      <Type1AI51Protocol />
    </div>
  );
}