import React from 'react';
import { Link } from 'react-router-dom';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import SortedTrustStrip from '@/components/family51/SortedTrustStrip';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

export default function SortedHome() {
  const { isPremium } = useSortedUsage();

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf8f5 40%)', color: '#1a1a1a', overflowX: 'hidden' }}>

      {/* HERO */}
      <div style={{ padding: '28px 20px 8px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 900, lineHeight: 1.15,
          margin: '0 0 10px', color: '#1a1a1a', letterSpacing: '-0.03em',
        }}>
          Whatever that letter says — we've got you.
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.5)', lineHeight: 1.5, margin: 0 }}>
          Paste it, snap a photo, or tell us what's happening. We'll work out what it means and what to do — in any language, any country.
        </p>
      </div>

      {/* THE ONE INPUT */}
      <div style={{ padding: '20px 20px 8px', maxWidth: 520, margin: '0 auto' }}>
        <SortedV2Flow />
      </div>

      {/* HOW IT WORKS — minimal */}
      <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          {['Paste or snap', 'We decode it', 'Know your next step'].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ flex: 1, textAlign: 'center', padding: '0 4px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(217,119,6,0.08)', border: '2px solid rgba(217,119,6,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 13, fontWeight: 900, color: '#d97706' }}>{i + 1}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,18,8,0.5)', lineHeight: 1.3 }}>{step}</div>
              </div>
              {i < 2 && <div style={{ width: 16, height: 2, background: 'rgba(217,119,6,0.15)', flexShrink: 0, marginTop: 17, borderRadius: 1 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* LIVE COUNTER */}
      <div style={{ padding: '16px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* YOUR CASES */}
      <div style={{ padding: '24px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />
      </div>

      {/* PAYWALL */}
      {!isPremium && (
        <div style={{ padding: '28px 20px 0', maxWidth: 520, margin: '0 auto' }}>
          <SortedForLifeCard />
        </div>
      )}

      {/* HELPLINES */}
      <div style={{ padding: '0 20px 20px', maxWidth: 520, margin: '0 auto' }}>
        <SortedHelplines />
      </div>

      <SortedTrustStrip />

      {/* FOOTER */}
      <div style={{ padding: '32px 20px 28px', textAlign: 'center', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>FAQ</Link>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Terms</Link>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Privacy</Link>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>About</Link>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.3)', margin: 0, letterSpacing: '0.08em' }}>
          Built by Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}