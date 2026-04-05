import React from 'react';
import BuzzStopEngine from '@/components/healing/BuzzStopEngine';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

export default function BuzzStopPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Minimal back link */}
      <div className="fixed top-0 left-0 z-10 p-4 lg:pl-6">
        <Link to={createPageUrl('FrequencyChamber')}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-400 font-mono text-xs transition-colors">
          <ArrowLeft className="w-3 h-3" />
          back
        </Link>
      </div>

      <BuzzStopEngine />
    </div>
  );
}