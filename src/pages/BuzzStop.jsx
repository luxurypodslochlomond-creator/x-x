import React from 'react';
import BuzzStopEngine from '@/components/healing/BuzzStopEngine';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import { COOLASFUCKZap } from '@/components/shared/COOLASFUCKIcon';

export default function BuzzStopPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6 pt-2">
          <Link to={createPageUrl('FrequencyChamber')}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-300 font-mono text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" />
            FREQUENCY CHAMBER
          </Link>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-1">
            <COOLASFUCKZap size={32} animate={true} />
            <h1 className="text-3xl font-black text-purple-300 font-mono tracking-wider">BUZZSTOP</h1>
          </div>
          <p className="text-gray-400 text-sm font-mono">Find your exact tinnitus frequency. Cancel it.</p>
          <p className="text-gray-600 text-xs font-mono mt-1">Destructive interference • Works offline • Free forever</p>
        </div>

        <BuzzStopEngine />
      </div>
    </div>
  );
}