import React, { useRef, useEffect } from 'react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';
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
    <div style={{ minHeight: '100dvh', background: '#FDFBF7', color: '#1a1a1a', overflowX: 'hidden' }}>
      
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
          fontSize: 15, color: '#666', lineHeight: 1.5, margin: 0,
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
            accentColor="#d4760a" 
            onClick={() => openTool('letter')} 
          />
          <SortedToolCard 
            icon="reply" 
            title="Write a Reply" 
            description="Ready-to-send response, right tone, zero waffle" 
            accentColor="#6B7A99" 
            onClick={() => openTool('reply')} 
          />
        </div>

        {/* SOMETHING ELSE */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 12 }}>
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
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ background: 'rgba(0,0,0,0.04)', padding: '5px 11px', borderRadius: 12, fontSize: 10, fontWeight: 600, color: '#666' }}>
            UK & Scottish law
          </div>
          <div style={{ background: 'rgba(0,0,0,0.04)', padding: '5px 11px', borderRadius: 12, fontSize: 10, fontWeight: 600, color: '#666' }}>
            All languages supported
          </div>
          <div style={{ background: 'rgba(0,0,0,0.04)', padding: '5px 11px', borderRadius: 12, fontSize: 10, fontWeight: 600, color: '#666' }}>
            Nothing stored. No account. No trace.
          </div>
        </div>

        {/* PRICING CALLOUT */}
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(212,118,10,0.05)', borderRadius: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#d4760a' }}>
            $9.99/month when you're ready for unlimited.
          </div>
        </div>
      </div>

      {/* LIVE COUNTER */}
      <div style={{ padding: '16px 20px', maxWidth: 520, margin: '0 auto' }}>
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

      {/* FOOTER */}
      <div style={{ padding: '40px 20px', textAlign: 'center', marginTop: 24 }}>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 12, fontSize: 12, color: '#888' }}>
          <a href="/SortedFAQ" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>FAQ</a>
          <span style={{ color: '#ddd' }}>•</span>
          <a href="/SortedTerms" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>Terms</a>
          <span style={{ color: '#ddd' }}>•</span>
          <a href="/SortedPrivacy" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>Privacy</a>
          <span style={{ color: '#ddd' }}>•</span>
          <a href="/SortedGlobalAccess" style={{ textDecoration: 'none', color: '#22c55e', fontWeight: 700 }}>🌍 Global Access</a>
        </div>
        <p style={{ fontSize: 10, color: '#aaa', margin: 0, letterSpacing: '0.05em' }}>
          ZERO LOSS — ZERO BULLSHIT
        </p>
      </div>
    </div>
  );
}