import React, { useState, useRef, useEffect } from 'react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedTrustRow from '@/components/family51/SortedTrustRow';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import MauroChat from '@/components/family51/MauroChat';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedPhotoButton from '@/components/family51/SortedPhotoButton';
import SortedFileUploadButton from '@/components/family51/SortedFileUploadButton';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';

export default function Family51Page() {
  const engineRef = useRef(null);
  const { usageCount, isPremium, recordUse, isLocked } = useSortedUsage();
  const geoPrice = useSortedGeoPrice();
  const paywallRef = useRef(null);
  const caseHistoryRef = useRef(null);

  // Handle header badge taps - make sure they actually scroll
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgrade')) {
      setTimeout(() => paywallRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    } else if (params.get('cases')) {
      setTimeout(() => caseHistoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, []);

  const openTool = (engineId, handoffData = null) => {
    engineRef.current?.open(engineId, handoffData);
  };

  const handlePhotoDecoded = (url) => openTool('letter', { prefillFileUrl: url });
  const handleFileDecoded = (url) => openTool('letter', { prefillFileUrl: url });

  return (
    <div style={{ minHeight: '100dvh', background: '#fef8ee', color: '#1a1208', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>

      {/* ENGINE — always mounted, slides up when active */}
      <SortedUnifiedEngine
        ref={engineRef}
        geoPrice={geoPrice}
        recordUse={recordUse}
        isLocked={isLocked}
        onPaywall={() => {}}
      />

      {/* ── HERO ── */}
      <div style={{ padding: '40px 20px 0', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>

        {/* Free badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(212,118,10,0.07)', border: '1px solid rgba(212,118,10,0.18)',
          borderRadius: 20, padding: '5px 14px', marginBottom: 20,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#d4760a', letterSpacing: '0.08em' }}>FREE TO USE · NO SIGNUP</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(32px, 9vw, 44px)', fontWeight: 900, lineHeight: 1.05,
          margin: '0 0 14px', color: '#1a1208', letterSpacing: '-0.03em',
        }}>
          We'll decode it.<br />
          <span style={{ color: '#d4760a' }}>Tell you what to do.</span>
        </h1>

        <p style={{
          fontSize: 15, color: 'rgba(26,18,8,0.55)', lineHeight: 1.6,
          margin: '0 0 28px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto',
        }}>
          Got a scary letter? Stuck in a dispute? Paste it, photo it, or upload — any language, nothing stored.
        </p>

        {/* PRIMARY CTA */}
        <button
          onClick={() => openTool('letter')}
          style={{
            width: '100%', background: '#d4760a', color: '#fff', border: 'none',
            borderRadius: 14, padding: '16px 28px', fontSize: 16, fontWeight: 900,
            cursor: 'pointer', letterSpacing: '-0.01em', marginBottom: 10,
            boxShadow: '0 4px 18px rgba(212,118,10,0.28)',
          }}
        >
          Start — paste or type
        </button>

        {/* SECONDARY INPUT ROW */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <SortedPhotoButton onDecoded={handlePhotoDecoded} compact />
          <SortedFileUploadButton onDecoded={handleFileDecoded} compact />
        </div>

        {/* TRUST ROW */}
        <SortedTrustRow geoPrice={geoPrice} usageCount={usageCount} isPremium={isPremium} />
      </div>

      {/* ── TOOLS GRID ── */}
      <div style={{ padding: '24px 16px 0', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <SortedToolCard icon="letter" title="I got a scary letter" description="Plain English · what to do" accentColor="#d4760a" onClick={() => openTool('letter')} />
          <SortedToolCard icon="reply" title="I need to write back" description="Right tone · ready to send" accentColor="#b85c00" onClick={() => openTool('reply')} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <SortedToolCard icon="scam" title="Is this a scam?" description="Spot it fast" accentColor="rgba(26,18,8,0.35)" onClick={() => openTool('scam')} variant="secondary" />
          <SortedToolCard icon="contract" title="Check contract" description="Know your rights" accentColor="rgba(26,18,8,0.35)" onClick={() => openTool('contract')} variant="secondary" />
          <SortedToolCard icon="conflict" title="In a dispute" description="Clear plan" accentColor="rgba(26,18,8,0.35)" onClick={() => openTool('conflict')} variant="secondary" />
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,118,10,0.1), transparent)', margin: '32px 20px 0' }} />

      {/* ── YOUR CASES — only if you have them ── */}
      <div ref={caseHistoryRef} style={{ padding: '24px 16px 0', maxWidth: 480, margin: '0 auto' }}>
        <SortedCaseHistory onOpenTool={(toolId, data) => openTool(toolId, data)} isPremium={isPremium} />
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,118,10,0.1), transparent)', margin: '32px 20px 0' }} />

      {/* ── LIVE COUNTER — others helped ── */}
      <div style={{ padding: '16px 16px 0', maxWidth: 480, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* ── PAYWALL — only when you hit limits ── */}
      {!isPremium && (
        <>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,118,10,0.12), transparent)', margin: '32px 20px 0' }} />
          <div ref={paywallRef} style={{ padding: '24px 16px 0', maxWidth: 480, margin: '0 auto' }}>
            <SortedForLifeCard />
          </div>
        </>
      )}

      {/* ── SIMPLE FOOTER ── */}
      <div style={{ padding: '40px 20px', textAlign: 'center', marginTop: 24 }}>
        <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.3)', margin: '0 0 8px' }}>
          SORTED is not a law firm and does not provide legal advice.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', fontSize: 12, color: 'rgba(26,18,8,0.4)' }}>
          <a href="/SortedTerms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</a>
          <a href="/SortedPrivacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</a>
          <a href="/SortedFAQ" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</a>
        </div>
      </div>
    </div>
  );
}