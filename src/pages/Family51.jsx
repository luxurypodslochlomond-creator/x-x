import React, { useState, useRef } from 'react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedTrustRow from '@/components/family51/SortedTrustRow';
import SortedAbout from '@/components/family51/SortedAbout';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import MauroChat from '@/components/family51/MauroChat';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedPhotoButton from '@/components/family51/SortedPhotoButton';
import SortedFileUploadButton from '@/components/family51/SortedFileUploadButton';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';

const TOOLS = [
  {
    id: 'decode',
    engineId: 'letter',
    title: 'Decode a Letter',
    description: 'Plain English · what it means · what to do',
    icon: 'letter',
    color: '#d4760a',
  },
  {
    id: 'reply',
    engineId: 'reply',
    title: 'Write a Reply',
    description: 'Draft a response · firm but fair',
    icon: 'reply',
    color: '#b85c00',
  },
  {
    id: 'conflict',
    engineId: 'conflict',
    title: 'Resolve a Conflict',
    description: 'Navigate disputes · know your rights',
    icon: 'conflict',
    color: '#7c3a00',
  },
  {
    id: 'scam',
    engineId: 'scam',
    title: 'Is This a Scam?',
    description: 'Spot fraud · protect yourself',
    icon: 'scam',
    color: '#c0392b',
  },
  {
    id: 'contract',
    engineId: 'contract',
    title: 'Check a Contract',
    description: 'Understand terms · find the traps',
    icon: 'contract',
    color: '#1a6b3a',
  },
];

export default function Family51Page() {
  const engineRef = useRef(null);
  const { usageCount, isPremium, recordUse, isLocked } = useSortedUsage();
  const geoPrice = useSortedGeoPrice();
  const [showPaywall, setShowPaywall] = useState(false);

  const openTool = (engineId, handoffData = null) => {
    engineRef.current?.open(engineId, handoffData);
  };

  const handlePhotoDecoded = (text) => {
    openTool('letter', { prefillText: text });
  };

  const handleFileDecoded = (text) => {
    openTool('letter', { prefillText: text });
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#fef8ee', color: '#1a1208' }}>

      {/* ENGINE — always mounted, slides up when active */}
      <SortedUnifiedEngine
        ref={engineRef}
        geoPrice={geoPrice}
        recordUse={recordUse}
        isLocked={isLocked}
        onPaywall={() => setShowPaywall(true)}
      />

      {/* HERO */}
      <div style={{
        padding: '40px 20px 28px',
        textAlign: 'center',
        maxWidth: 520,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(212,118,10,0.08)', border: '1px solid rgba(212,118,10,0.2)',
          borderRadius: 20, padding: '5px 14px', marginBottom: 18,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#d4760a', letterSpacing: '0.08em' }}>FREE TO USE · NO SIGNUP</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(30px, 8vw, 42px)',
          fontWeight: 900,
          lineHeight: 1.1,
          margin: '0 0 14px',
          color: '#1a1208',
          letterSpacing: '-0.03em',
        }}>
          We'll decode it.<br />
          <span style={{ color: '#d4760a' }}>Tell you what to do.</span>
        </h1>

        <p style={{
          fontSize: 15,
          color: 'rgba(26,18,8,0.6)',
          lineHeight: 1.6,
          margin: '0 0 24px',
          maxWidth: 380,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Paste, type, snap a photo or upload a file — any language, any country, nothing stored.
        </p>

        {/* PRIMARY ENTRY POINTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => openTool('letter')}
            style={{
              background: '#d4760a',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              width: '100%',
            }}
          >
            Start — paste or type
          </button>

          <SortedPhotoButton onDecoded={handlePhotoDecoded} />
          <SortedFileUploadButton onDecoded={handleFileDecoded} />
        </div>

        {/* TRUST ROW */}
        <SortedTrustRow geoPrice={geoPrice} usageCount={usageCount} isPremium={isPremium} />
      </div>

      {/* DIVIDER */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,118,10,0.15), transparent)', margin: '0 20px' }} />

      {/* TOOL GRID */}
      <div style={{ padding: '28px 16px 0', maxWidth: 560, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(26,18,8,0.35)', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 14 }}>
          CHOOSE A TOOL
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {TOOLS.map((tool) => (
            <SortedToolCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              accentColor={tool.color}
              onClick={() => openTool(tool.engineId)}
            />
          ))}
        </div>
      </div>

      {/* LIVE COUNTER */}
      <div style={{ padding: '28px 16px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* DIVIDER */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,118,10,0.12), transparent)', margin: '28px 20px 0' }} />

      {/* MAURO CHAT */}
      <div style={{ padding: '24px 16px 0', maxWidth: 560, margin: '0 auto' }}>
        <MauroChat />
      </div>

      {/* CASE HISTORY */}
      <div style={{ padding: '24px 16px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedCaseHistory onOpenTool={(toolId, data) => openTool(toolId, data)} isPremium={isPremium} />
      </div>

      {/* ABOUT */}
      <div style={{ padding: '24px 16px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedAbout />
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 20px', textAlign: 'center', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          {[
            { label: 'Terms', href: '/SortedTerms' },
            { label: 'Privacy', href: '/SortedPrivacy' },
            { label: 'FAQ', href: '/SortedFAQ' },
            { label: 'Press', href: '/SortedPressRelease' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: 12, color: 'rgba(26,18,8,0.35)', textDecoration: 'none', fontWeight: 600 }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.25)', margin: 0 }}>
          SORTED is not a law firm and does not provide legal advice.
        </p>
      </div>
    </div>
  );
}