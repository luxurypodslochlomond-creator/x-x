import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Lock, Heart, Archive } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScottFeedback() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then((currentUser) => {
        setUser(currentUser);
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
        <p className="text-cyan-400 font-mono text-sm">LOADING...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="border-2 border-red-500/40 bg-black rounded p-8 text-center max-w-md">
          <h1 className="text-2xl font-mono font-bold text-red-400 mb-3">ADMIN ONLY</h1>
          <p className="text-gray-400 text-xs font-mono mb-6">Scott's feedback is protected.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold transition"
          >
            BACK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mb-8 font-mono text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </button>

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-mono font-black text-white mb-2 tracking-wider">SCOTT'S FEEDBACK</h1>
          <p className="text-cyan-400 text-xs font-mono">Core system design principles</p>
        </div>

        {/* MAIN GRID */}
        <div className="space-y-6">

          {/* DESIGN PRINCIPLES */}
          <div>
            <div className="border-2 border-cyan-500/40 bg-black px-4 py-3 mb-3">
              <p className="text-cyan-400 font-mono font-black text-sm tracking-wider">DESIGN FIRST</p>
            </div>
            <div className="border-2 border-cyan-500/40 bg-black p-4 space-y-2">
              <p className="text-white font-mono text-xs leading-relaxed">
                CLUTTER FREE • SIMPLE • ACTIONABLE • EASY • STRESS FREE
              </p>
            </div>
          </div>

          {/* VOTE FLOW */}
          <div>
            <div className="border-2 border-green-500/40 bg-black px-4 py-3 mb-3">
              <p className="text-green-400 font-mono font-black text-sm tracking-wider">VOTE FLOW</p>
            </div>
            <div className="border-2 border-green-500/40 bg-black p-4 space-y-2">
              <p className="text-gray-300 font-mono text-xs">Artist receives: GREEN YES / RED NO</p>
              <p className="text-gray-300 font-mono text-xs">Artist checks diary → Answers YES or NO</p>
              <p className="text-gray-300 font-mono text-xs">All YES → agent/promoter</p>
              <p className="text-gray-300 font-mono text-xs">Any NO → discussion to resolve</p>
            </div>
          </div>

          {/* MANAGER CONTROL */}
          <div>
            <div className="border-2 border-amber-500/40 bg-black px-4 py-3 mb-3">
              <p className="text-amber-400 font-mono font-black text-sm tracking-wider">MANAGER CONTROL</p>
              <p className="text-amber-400 font-mono text-[10px] mt-1">(NOT SURVEILLANCE)</p>
            </div>
            <div className="border-2 border-amber-500/40 bg-black p-4 space-y-2">
              <p className="text-gray-300 font-mono text-xs">Manager pastes gig or AI scans email</p>
              <p className="text-gray-300 font-mono text-xs">CB51 → Manager phone notification</p>
              <p className="text-gray-300 font-mono text-xs">Manager: YES/NO via GREEN/RED</p>
              <p className="text-gray-300 font-mono text-xs">YES → Band gets notification to vote</p>
              <p className="text-gray-300 font-mono text-xs">All YES → Manager gets confirmation + email draft</p>
              <p className="text-gray-300 font-mono text-xs">Any NO → Discussion notification to resolve</p>
            </div>
          </div>

          {/* NOTIFICATION CORE */}
          <div>
            <div className="border-2 border-cyan-500/40 bg-black px-4 py-3 mb-3">
              <p className="text-cyan-400 font-mono font-black text-sm tracking-wider">NOTIFICATION CORE</p>
            </div>
            <div className="border-2 border-cyan-500/40 bg-black p-4 space-y-2">
              <p className="text-gray-300 font-mono text-xs">Text/Email or CB51 confirmation</p>
              <p className="text-gray-300 font-mono text-xs">Sort by status • Never lose context</p>
              <p className="text-gray-300 font-mono text-xs">Immutable timestamp record</p>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-6 border-t border-cyan-500/20 text-center">
          <p className="text-gray-500 font-mono text-xs">Scott's voice. Protected. Forever. ♾️❤️</p>
        </div>

      </div>
    </div>
  );
}