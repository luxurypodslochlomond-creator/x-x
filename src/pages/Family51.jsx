import React, { useState, useRef, useEffect } from 'react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
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
    <div style={{ minHeight: '100dvh', background: '#FDFBF7', color: '#1a1a1a', overflowX: 'hidden' }}>
      
      {/* ENGINE */}
      <SortedUnifiedEngine
        ref={engineRef}
        geoPrice={geoPrice}
        recordUse={recordUse}
        isLocked={isLocked}
        onPaywall={() => {}}
      />

      {/* HEADER */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: '#d4760a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 14 }}>S</span>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em' }}>SORTED</div>
            <div style={{ fontSize: 10, color: '#666', fontWeight: 600 }}>WE'VE GOT YOU</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ background: '#FFE5C7', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#d4760a' }}>
            10 FREE
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: '32px 20px 24px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(28px, 7vw, 38px)', fontWeight: 900, lineHeight: 1.1,
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
      <div style={{ padding: '0 20px', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div onClick={() => openTool('letter')} style={{
            padding: '20px 16px', background: 'white', borderRadius: 12,
            border: '2px solid #F3D7A1', cursor: 'pointer',
            transition: 'all 0.2s', ':hover': { borderColor: '#d4760a' }
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📄</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#1a1a1a' }}>Decode a Letter</div>
            <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>Plain English breakdown, urgency check, what to actually do</div>
          </div>
          <div onClick={() => openTool('reply')} style={{
            padding: '20px 16px', background: 'white', borderRadius: 12,
            border: '2px solid #B8C5E7', cursor: 'pointer',
            transition: 'all 0.2s', ':hover': { borderColor: '#6B7A99' }
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>✍️</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#1a1a1a' }}>Write a Reply</div>
            <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>Ready-to-send response, right tone, zero waffle</div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
          <SortedPhotoButton onDecoded={handlePhotoDecoded} />
          <SortedFileUploadButton onDecoded={handleFileDecoded} />
          <button
            onClick={() => openTool('letter')}
            style={{
              flex: 1, maxWidth: 140, padding: '12px 16px', background: 'white',
              border: '2px solid #ddd', borderRadius: 10, fontWeight: 700, fontSize: 11,
              cursor: 'pointer', color: '#666', letterSpacing: '0.05em'
            }}
          >
            TYPE / PASTE
          </button>
        </div>

        {/* SOMETHING ELSE */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 12 }}>
            SOMETHING ELSE?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div onClick={() => openTool('scam')} style={{
              padding: '16px 12px', background: 'white', borderRadius: 10,
              border: '1px solid #eee', cursor: 'pointer', textAlign: 'center'
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>⚠️</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: '#1a1a1a', marginBottom: 3 }}>Scam Checker</div>
              <div style={{ fontSize: 10, color: '#888' }}>Spot it fast</div>
            </div>
            <div onClick={() => openTool('contract')} style={{
              padding: '16px 12px', background: 'white', borderRadius: 10,
              border: '1px solid #eee', cursor: 'pointer', textAlign: 'center'
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>📋</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: '#1a1a1a', marginBottom: 3 }}>Contract Checker</div>
              <div style={{ fontSize: 10, color: '#888' }}>Rights grabs</div>
            </div>
            <div onClick={() => openTool('conflict')} style={{
              padding: '16px 12px', background: 'white', borderRadius: 10,
              border: '1px solid #eee', cursor: 'pointer', textAlign: 'center'
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🤝</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: '#1a1a1a', marginBottom: 3 }}>Resolve Conflict</div>
              <div style={{ fontSize: 10, color: '#888' }}>Step-by-step</div>
            </div>
          </div>
        </div>

        {/* TAGS */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ background: '#f5f5f5', padding: '4px 10px', borderRadius: 12, fontSize: 10, fontWeight: 600, color: '#666' }}>
            UK law
          </div>
          <div style={{ background: '#f5f5f5', padding: '4px 10px', borderRadius: 12, fontSize: 10, fontWeight: 600, color: '#666' }}>
            Nothing stored. No account. No trace.
          </div>
        </div>

        {/* PRICING CALLOUT */}
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(212,118,10,0.05)', borderRadius: 8, marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#d4760a' }}>
            $9.99/month when you're ready for unlimited.
          </div>
        </div>
      </div>

      {/* LIVE COUNTER */}
      <div style={{ padding: '24px 20px', maxWidth: 520, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* DIVIDER */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)', margin: '0 20px' }} />

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
      <div style={{ padding: '48px 20px', textAlign: 'center', marginTop: 24 }}>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 16 }}>
          <a href="/SortedFAQ" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none', fontWeight: 600 }}>FAQ & HOW IT WORKS</a>
          <span style={{ color: '#ddd' }}>•</span>
          <a href="/SortedTerms" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none', fontWeight: 600 }}>Terms</a>
          <span style={{ color: '#ddd' }}>•</span>
          <a href="/SortedPrivacy" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none', fontWeight: 600 }}>Privacy</a>
        </div>
        <p style={{ fontSize: 11, color: '#999', margin: 0 }}>
          ZERO LOSS — ZERO BULLSHIT
        </p>
      </div>
    </div>
  );
}