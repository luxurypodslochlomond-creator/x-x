import React from 'react';
import { Users } from 'lucide-react';

/**
 * CB51 Test Role Switcher
 * Quick toggle between manager and band member views for testing
 */
export default function CB51TestRoleSwitcher({ currentRole, onRoleChange }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-purple-600 border-2 border-purple-400 rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-white" />
        <span className="text-white text-xs font-mono font-bold">TEST MODE</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onRoleChange('manager')}
          className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-all ${
            currentRole === 'manager'
              ? 'bg-cyan-400 text-black'
              : 'bg-black text-cyan-400 border border-cyan-400'
          }`}
        >
          MANAGER
        </button>
        <button
          onClick={() => onRoleChange('band_member')}
          className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-all ${
            currentRole === 'band_member'
              ? 'bg-green-400 text-black'
              : 'bg-black text-green-400 border border-green-400'
          }`}
        >
          BAND
        </button>
      </div>
    </div>
  );
}