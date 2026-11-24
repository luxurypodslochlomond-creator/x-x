import React, { useEffect, useState } from 'react';
import FergusPageFrame from '@/components/fergus/FergusPageFrame';
import { Copy, Check } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';

// A card he can screenshot and send, or hold up on his phone. Restraint is the whole design:
// one name, four facts, one line, nothing else. That is what reads as cool — a card that has
// to explain itself is a leaflet.
const BIO =
  'Fergus Hughes, 17, Glasgow. Barber, artist, footballer — Shotts Bon Accord record signing. I make things. Give me a product and a week and I\'ll send you the videos and the numbers.';

const FACTS = ['Barber', 'Artist', 'Footballer', 'Shotts Bon Accord · record signing'];

export default function FergusCard({ embedded = false }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  const copy = async () => {
    const ok = await copyText(BIO);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <FergusPageFrame embedded={embedded} section="My card">
    <div className="flex min-h-screen items-center justify-center bg-record-paper px-4 py-8">
      <div className="w-full max-w-[420px]">
        {/* THE CARD — screenshot this */}
        <div className="bg-record-ink px-6 py-10 text-record-paper">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-record-paper/45">
            17 · Glasgow
          </p>

          <h1 className="mt-5 text-[44px] leading-[0.92] tracking-tight">
            Fergus<br />Hughes
          </h1>

          <div className="mt-7 space-y-1.5">
            {FACTS.map((f) => (
              <p key={f} className="font-mono text-[11px] uppercase tracking-[0.16em] text-record-paper/70">
                {f}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-record-paper/20 pt-6">
            <p className="text-[17px] leading-snug">
              I make things. Give me a product and a week — you'll get the videos and the numbers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={copy}
          className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 border-2 border-record-ink px-4 py-2 font-mono text-[11px] font-black uppercase tracking-wide"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy the one-liner'}
        </button>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wide text-record-muted">
          Screenshot the card, or paste the line into a DM.
        </p>
      </div>
    </div>
    </FergusPageFrame>
  );
}