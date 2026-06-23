import React, { useRef, useEffect } from 'react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';
import SortedTrustStrip from '@/components/family51/SortedTrustStrip';
import SortedHelplines from '@/components/family51/SortedHelplines';
export default function Family51Page() {
  const engineRef = useRef(null);
  const { isPremium, recordUse, isLocked } = useSortedUsage();
  const geoPrice = useSortedGeoPrice();
  const paywallRef = useRef(null);
  const caseHistoryRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgrade')) {
      setTimeout(() => paywallRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    } else if (params.get('cases')) {
      setTimeout(() => caseHistoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, []);

  const openTool = (engineId, handoffData = null) => {
    console.log('[SORTED] openTool called:', engineId, handoffData);
    console.log('[SORTED] engineRef.current:', engineRef.current);
    if (engineRef.current) {
      engineRef.current.open(engineId, handoffData);
      console.log('[SORTED] Engine opened successfully');
    } else {
      console.error('[SORTED] ERROR: engineRef.current is null - engine not mounted!');
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf8f5 40%)', color: '#1a1a1a', overflowX: 'hidden' }}>
      
      {/* SORTED ENGINE MODAL */}
      <SortedUnifiedEngine ref={engineRef} geoPrice={geoPrice} recordUse={recordUse} isLocked={isLocked} />

      {/* HERO */}
      <div style={{ padding: '32px 20px 16px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(26px, 7vw, 36px)', fontWeight: 900, lineHeight: 1.1,
          margin: '0 0 12px', color: '#1a1a1a', letterSpacing: '-0.03em',
        }}>
          Paste, type, snap a photo or upload a file
        </h1>
        <p style={{
          fontSize: 15, color: 'rgba(26,18,8,0.5)', lineHeight: 1.5, margin: 0,
        }}>
          We'll decode it into plain language — any language — then tell you exactly what to do.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '8px 20px 20px', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          {['Paste your letter', 'Get plain English', 'Know your next step'].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(217,119,6,0.1)', border: '1.5px solid rgba(217,119,6,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 12, fontWeight: 900, color: '#d97706' }}>{i + 1}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(26,18,8,0.6)', lineHeight: 1.3 }}>{step}</div>
              </div>
              {i < 2 && <div style={{ width: 16, height: 1, background: 'rgba(217,119,6,0.2)', flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MAIN CARDS */}
      <div style={{ padding: '16px 20px 8px', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <SortedToolCard 
            icon="letter" 
            title="Decode a Letter" 
            description="Debt, rent arrears, council letters — urgency check, what to do next" 
            accentColor="#d97706" 
            onClick={() => openTool('letter')} 
          />
          <SortedToolCard 
            icon="reply" 
            title="Write a Reply" 
            description="Ready-to-send response, right tone, zero waffle" 
            accentColor="#0891b2" 
            onClick={() => openTool('reply')} 
          />
        </div>

        {/* SOMETHING ELSE */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(26,18,8,0.3)', letterSpacing: '0.14em', textAlign: 'center', marginBottom: 12 }}>
            SOMETHING ELSE?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <SortedToolCard 
              icon="scam" 
              title="Scam Checker" 
              description="Spot it fast" 
              accentColor="#ef4444" 
              onClick={() => openTool('scam')} 
              variant="secondary" 
            />
            <SortedToolCard 
              icon="contract" 
              title="Contract Checker" 
              description="Rights grabs" 
              accentColor="#7c3aed" 
              onClick={() => openTool('contract')} 
              variant="secondary" 
            />
            <SortedToolCard 
              icon="conflict" 
              title="Resolve Conflict" 
              description="Step-by-step" 
              accentColor="#059669" 
              onClick={() => openTool('conflict')} 
              variant="secondary" 
            />
          </div>
        </div>

        {/* TAGS */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(217,119,6,0.06)', padding: '6px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: '#d97706', border: '1px solid rgba(217,119,6,0.15)' }}>
            Any country, any jurisdiction
          </div>
          <div style={{ background: 'rgba(217,119,6,0.06)', padding: '6px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: '#d97706', border: '1px solid rgba(217,119,6,0.15)' }}>
            All languages supported
          </div>
          <div style={{ background: 'rgba(217,119,6,0.06)', padding: '6px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: '#d97706', border: '1px solid rgba(217,119,6,0.15)' }}>
            Your letters stay on your device
          </div>
        </div>

      </div>

      {/* LIVE COUNTER — social proof right after tools */}
      <div style={{ padding: '0 20px 16px', maxWidth: 520, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* YOUR CASES */}
      <div ref={caseHistoryRef} style={{ padding: '32px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedCaseHistory onOpenTool={(toolId, data) => openTool(toolId, data)} isPremium={isPremium} />
      </div>

      {/* PAYWALL */}
      {!isPremium && (
        <div ref={paywallRef} style={{ padding: '32px 20px 0', maxWidth: 520, margin: '0 auto' }}>
          <SortedForLifeCard />
        </div>
      )}

      {/* HUMAN HELP STRIP */}
      <div style={{ padding: '0 20px 24px', maxWidth: 520, margin: '0 auto' }}>
        <SortedHelplines />
      </div>

      {/* TRUST STRIP — who we are, at the bottom as a trust signal */}
      <SortedTrustStrip />

      {/* FOOTER */}
      <div style={{ padding: '40px 20px 32px', textAlign: 'center', marginTop: 24 }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
          <a href="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>FAQ</a>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <a href="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Terms</a>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <a href="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Privacy</a>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <a href="/SortedGlobalAccess" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Global</a>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <a href="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>About</a>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.3)', margin: 0, letterSpacing: '0.08em' }}>
          Built by Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}