import React from 'react';
import { Briefcase, Heart } from 'lucide-react';
import { useProfessionalMode } from './ProfessionalMode';

/**
 * PROFESSIONAL MODE TOGGLE
 * Quick switch for founder meetings
 */

export default function ProfessionalModeToggle() {
    const { isProfessional, toggle } = useProfessionalMode();

    return (
        <button
            onClick={toggle}
            className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-black border-2 border-cyan-500 hover:border-pink-500 transition-all shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
            title={isProfessional ? "Switch to real mode" : "Switch to founder mode"}
        >
            {isProfessional ? (
                <Briefcase className="w-5 h-5 text-cyan-400" />
            ) : (
                <Heart className="w-5 h-5 text-pink-400" />
            )}
        </button>
    );
}