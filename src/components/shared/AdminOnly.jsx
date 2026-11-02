import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Lock, ArrowRight } from 'lucide-react';

// ADMINS ONLY — the door on the record's working screens.
//
// The record's permission rules already keep an ordinary visitor out of every table these
// screens read: what protects the data is the rules, not this door. But a person who lands on
// a review queue and finds an empty, broken-looking page does not conclude "I am not allowed"
// — they conclude "this is broken". A research panel reads that as carelessness. So the door
// says what it is, plainly.

export default function AdminOnly({ children }) {
  const [state, setState] = useState('checking'); // checking | admin | denied

  useEffect(() => {
    let cancelled = false;
    base44.auth.me()
      .then((user) => { if (!cancelled) setState(user?.role === 'admin' ? 'admin' : 'denied'); })
      .catch(() => { if (!cancelled) setState('denied'); });
    return () => { cancelled = true; };
  }, []);

  if (state === 'checking') {
    return (
      <div className="min-h-screen bg-[#f4efe4] flex items-center justify-center">
        <div className="w-7 h-7 rounded-full animate-spin" style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }} />
      </div>
    );
  }

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-[#f4efe4] twcc-scanlines relative flex items-center justify-center p-6">
        <div className="relative z-10 max-w-md w-full bg-[#efe7d6] border-2 border-[#1a1612] p-6 text-center">
          <Lock className="w-8 h-8 text-[#b3261e] mx-auto mb-3" />
          <p className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.01em' }}>
            Admins only
          </p>
          <p className="text-[11px] font-mono text-[#6b6258] leading-relaxed">
            This is one of the record's working screens — submissions waiting for a person, categories, photographs, the vault. Nothing here is public, and nobody outside the record's own admins can read or change it.
          </p>
          {/* One tap on the account they already hold, returning them to this exact screen —
              the queue they were reaching for, not the front of the app. Their address is never
              typed and never sent a code. The email-and-password path stays underneath, for
              anyone who has no such account, as the fallback rather than the front door. */}
          <button
            onClick={() => base44.auth.loginWithProvider('google', window.location.href)}
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-[#b3261e] text-[#f4efe4] text-[11px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#1a1612] active:border-[#1a1612] transition-colors"
          >
            Continue with Google <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="mt-2 w-full px-4 py-2 min-h-[44px] text-[10px] font-mono uppercase text-[#6b6258] hover:text-[#1a1612] transition-colors"
          >
            or use an email and password
          </button>
        </div>
      </div>
    );
  }

  return children;
}