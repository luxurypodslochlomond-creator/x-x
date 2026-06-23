import React, { useRef, useEffect } from 'react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';
import SortedTrustStrip from '@/components/family51/SortedTrustStrip';
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
            Nothing stored. No account. No trace.
          </div>
        </div>

        {/* PRICING CALLOUT */}
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(217,119,6,0.05)', borderRadius: 12, marginBottom: 16, border: '1px solid rgba(217,119,6,0.12)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#d97706' }}>
            From £9.99/month when you're ready for unlimited.
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <SortedTrustStrip />

      {/* LIVE COUNTER */}
      <div style={{ padding: '0 20px 16px', maxWidth: 520, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* DIVIDER */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)', margin: '0 20px' }} />

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
        <div style={{ background: 'rgba(217,119,6,0.03)', borderRadius: 16, padding: '18px 20px', border: '1px solid rgba(217,119,6,0.12)' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#d97706', letterSpacing: '0.14em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            NEED A HUMAN RIGHT NOW?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="tel:08001448848" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(217,119,6,0.1)', transition: 'border-color 0.15s' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208' }}>Citizens Advice</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>Free advice — debt, housing, benefits</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#d97706', fontFamily: 'monospace' }}>0800 144 8848</div>
            </a>
            <a href="tel:08088084000" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(217,119,6,0.1)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208' }}>National Debtline</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>Free debt advice — UK</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#d97706', fontFamily: 'monospace' }}>0808 808 4000</div>
            </a>
            <a href="tel:08088004444" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(217,119,6,0.1)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208' }}>Shelter</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>Housing, eviction, homelessness</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#d97706', fontFamily: 'monospace' }}>0808 800 4444</div>
            </a>
            <a href="tel:08001381111" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(217,119,6,0.1)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208' }}>StepChange</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>Free debt management plans</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#d97706', fontFamily: 'monospace' }}>0800 138 1111</div>
            </a>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', marginTop: 12, textAlign: 'center' }}>All free. All UK-based. Tap to call.</div>
        </div>
      </div>

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