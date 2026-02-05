import React from 'react';
import { Radio } from 'lucide-react';

export default function CB51() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-black text-cyan-400 font-mono">CB51</h1>
        <p className="text-gray-600 text-sm font-mono mt-2">Artist Management</p>
      </div>
    </div>
  );
}