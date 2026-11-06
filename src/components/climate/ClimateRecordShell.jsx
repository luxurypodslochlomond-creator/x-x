import React from 'react';
import { Link } from 'react-router-dom';
import useRecordBack from '@/components/climate/useRecordBack';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordCover from '@/components/climate/RecordCover';

// The record's page shell — the same cold bands the Founder page wears, so every
// page of the record reads as one place: paper, ink, one ocean signal, x = x.
export default function ClimateRecordShell({ dir = 'ltr', eyebrow, marker, title, statement, returnTo, returnLabel, footer, children }) {
  const back = useRecordBack(returnTo);

  return (
    <div dir={dir} className="climate-record twcc-scanlines min-h-screen bg-[#efe7d6] text-[#141210] relative" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header — paper, the way out, the page's name. It scrolls with the page, and
          does not pin: the record's masthead above it already owns the top edge, and a
          second bar pinned to the same edge sat over the nav and ate the taps. */}
      <div className="border-b-2 border-[#141210] bg-[#efe7d6]">
        <div className="max-w-[1100px] mx-auto flex items-center gap-3 px-4 lg:px-10 py-3">
          <button
            onClick={back}
            aria-label="Back"
            className="w-11 h-11 flex items-center justify-center bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">{eyebrow}</span>
        </div>
      </div>

      {/* Cold epigraph band — the covenant mark, same as the record */}
      <div className="bg-[#241d16] px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-[#e2602a]/20" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">{marker}</span>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
        </div>
        {/* The mark, and the way to it — every page of the record carries it, and it goes
            to the page that says what it means. */}
        <Link
          to="/XEqualsX"
          className="text-[10px] font-black font-mono text-[#e2602a] tracking-[0.2em] leading-none hover:text-[#efe7d6] transition-colors"
        >
          x = x
        </Link>
      </div>

      {/* Hero — deep earth, the beacon, the page says what it is.
          The record's cover stands behind every page of the record, faintly, at the top of the
          page. Not decoration for its own sake: it is what stops fourteen separate pages feeling
          like fourteen separate documents. A reader who moves from the brief to the method to
          the corrections should feel the same hand under all of them — one painting, one room,
          the same paper. It is kept low enough that not one word loses its ground. */}
      <div className="relative bg-[#241d16] overflow-hidden">
        <RecordCover position="center 32%" strength={0.5} blend="screen" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(36,29,22,.5), rgba(36,29,22,.72) 55%, #241d16 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)', animation: 'twcc-scan 3s linear infinite' }} />
        <div className="relative z-10 px-6 lg:px-10 py-10 lg:py-16 flex flex-col items-center justify-center gap-4 text-center min-h-[220px] lg:min-h-[320px]">
          <SignalBeacon size={44} color="#7fc9e4" />
          <h1
            className="font-black uppercase text-[#efe7d6] leading-[1.05] max-w-md lg:max-w-3xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 3.6vw, 54px)', letterSpacing: '-0.02em', animation: 'twcc-epigraph 1.4s ease-out .2s both' }}
          >
            {title}
          </h1>
          {statement && (
            <p className="text-[13px] lg:text-[15px] leading-[1.65] text-[#efe7d6]/80 max-w-sm lg:max-w-2xl" style={{ fontFamily: 'var(--font-reading)', animation: 'twcc-epigraph 1.4s ease-out .4s both' }}>
              {statement}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-2xl lg:max-w-3xl mx-auto px-4 py-8 lg:py-14">{children}</div>

      {/* Signal band — the way back to the record */}
      <div className="bg-[#e2602a] px-5 lg:px-10 py-5 lg:py-8 text-center">
        <Link to={returnTo} className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#efe7d6] active:text-[#141210] transition-colors">
          {returnLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {footer && (
        <p className="px-5 py-6 lg:py-8 text-center text-[9px] lg:text-[10px] font-mono text-[#5a5246]/60 leading-relaxed max-w-md lg:max-w-2xl mx-auto">{footer}</p>
      )}

      {/* The credit — every page of the record names who built it. */}
      <p className="px-5 pb-9 text-center text-[11px] font-mono text-[#5a5246] leading-relaxed">
        Platform built by Brian Hughes ·{' '}
        <Link to="/Welcome" className="hover:text-[#b3261e] underline decoration-dotted underline-offset-2 transition-colors">UF51 CIC</Link>
        {' '}· Scotland
      </p>
    </div>
  );
}