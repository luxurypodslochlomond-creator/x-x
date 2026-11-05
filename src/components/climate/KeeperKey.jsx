import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { currentUser } from '@/lib/currentUser';
import { Lock, ArrowRight, KeyRound } from 'lucide-react';

// ── THE RECORD'S OWN DOOR ON THE RECORD'S OWN DESK ───────────────────────────────
//
// This screen used to sit behind the building's door — the app's admin role — which meant a
// keeper invited to hold the record's keys was stopped here and told "Admins only" on the one
// page built for her. The record's keys and the building's keys are not the same keys, and the
// desk belongs to the record.
//
// So the question is the record's: a line on its guest list with the keeper flag set. An app
// admin still opens it (whoever built the record has to be able to test it), and anybody else
// is told plainly what this is, with one tap back to sign in as themselves.
export default function KeeperKey({ children }) {
  const [state, setState] = useState('checking'); // checking | open | anon | denied

  useEffect(() => {
    let live = true;
    (async () => {
      const user = await currentUser().catch(() => null);
      if (!live) return;
      if (!user) { setState('anon'); return; }
      if (user.role === 'admin') { setState('open'); return; }
      const res = await base44.functions
        .invoke('climateKeeperRoom', { action: 'whoami' })
        .catch(() => null);
      if (live) setState(res?.data?.isKeeper ? 'open' : 'denied');
    })();
    return () => { live = false; };
  }, []);

  if (state === 'open') return children;

  if (state === 'checking') {
    return (
      <div className="min-h-screen bg-[#f4efe4] flex items-center justify-center">
        <div className="w-7 h-7 rounded-full animate-spin" style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4efe4] twcc-scanlines relative flex items-center justify-center p-6">
      <div className="relative z-10 max-w-md w-full bg-[#efe7d6] border-2 border-[#1a1612] p-6 text-center">
        {state === 'denied' ? (
          <>
            <Lock className="w-8 h-8 text-[#b3261e] mx-auto mb-3" />
            <p
              className="font-black uppercase text-[#1a1612] mb-2"
              style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.01em' }}
            >
              Keepers only
            </p>
            <p className="text-[11px] font-mono text-[#6b6258] leading-relaxed">
              This is the record's desk — what is waiting, who is checking, and the count of what is on
              the record. It names every person on the list, so it opens to a keeper of this record and
              to nobody else. Your address is not on that list yet.
            </p>
          </>
        ) : (
          <>
            <KeyRound className="w-8 h-8 text-[#b3261e] mx-auto mb-3" />
            <p
              className="font-black uppercase text-[#1a1612] mb-2"
              style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.01em' }}
            >
              Sign in to the record
            </p>
            <p className="text-[11px] font-mono text-[#6b6258] leading-relaxed">
              The desk belongs to the record, not to the building. Sign in with the address a keeper
              invited, and this page opens where you left it.
            </p>
            <button
              onClick={() => base44.auth.redirectToLogin(window.location.href)}
              className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-[#b3261e] text-[#f4efe4] text-[11px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#1a1612] active:border-[#1a1612] transition-colors"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}