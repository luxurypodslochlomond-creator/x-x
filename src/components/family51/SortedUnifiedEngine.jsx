import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';
import Family51ScamChecker from '@/components/family51/Family51ScamChecker';
import SortedJourneyBar from '@/components/family51/SortedJourneyBar';
import SortedShareMoment from '@/components/family51/SortedShareMoment';

/*
  COOLASFUCK PWA DESIGN PRINCIPLE:
  - No spring physics — springs overshoot, feel "webby", hard to tune
  - CSS transitions: hardware-accelerated translate3d, cubic-bezier(0.4, 0, 0.2, 1)
  - Press feedback: opacity dim (native iOS pattern), NOT scale
  - Sheet slide: 280ms ease-out up, 220ms ease-in down — matches iOS sheet exactly
  - Touch: touchAction manipulation eliminates 300ms delay, WebkitTapHighlightColor gone
  - Haptic: navigator.vibrate(8) — 8ms is imperceptible as sound but felt as click
*/

// Native-feel tap button — opacity flash, no scale weirdness
function NativeButton({ onClick, children, style, className }) {
  const ref = useRef(null);

  const handlePress = () => {
    if (navigator.vibrate) navigator.vibrate(8);
    if (ref.current) {
      ref.current.style.opacity = '0.45';
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (ref.current) ref.current.style.opacity = '1';
        }, 100);
      });
    }
    onClick && onClick();
  };

  return (
    <button
      ref={ref}
      onPointerDown={handlePress}
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        userSelect: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.1s',
        ...style,
      }}
      className={className}
    >
      {children}
    </button>
  );
}

const SortedUnifiedEngine = forwardRef(function SortedUnifiedEngine({ geoPrice, recordUse }, ref) {
  const [activeTool, setActiveTool] = useState(null);
  const [visible, setVisible] = useState(false); // drives the CSS transition
  const [prefillContext, setPrefillContext] = useState(null);
  const [completedTools, setCompletedTools] = useState([]);
  const [showShare, setShowShare] = useState(false);

  // Open: set tool → immediately visible
  const handleToolOpen = (toolId, handoffData = null) => {
    setActiveTool(toolId);
    setPrefillContext(handoffData || null);
    setShowShare(false);
    setVisible(true);
  };

  const handleToolComplete = (toolId) => {
    if (recordUse) recordUse();
    setCompletedTools(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
    if (toolId === 'letter' && !completedTools.includes('letter')) {
      setTimeout(() => setShowShare(true), 1200);
    }
  };

  const handleBack = () => {
    if (navigator.vibrate) navigator.vibrate(8);
    setVisible(false);
    // Wait for slide-out then clear
    setTimeout(() => {
      setActiveTool(null);
      setPrefillContext(null);
    }, 220);
  };

  useImperativeHandle(ref, () => ({
    open: (toolId, handoffData = null) => handleToolOpen(toolId, handoffData),
  }));

  if (!activeTool) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        // Hardware-accelerated sheet slide — iOS sheet curve
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
        transition: visible
          ? 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)' // ease-out up
          : 'transform 0.22s cubic-bezier(0.4, 0, 1, 1)',    // ease-in down
        willChange: 'transform',
        background: '#0d0a08',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 560, margin: '0 auto', width: '100%', padding: '28px 20px 60px' }}>

        {/* BACK — opacity press, no scale */}
        <NativeButton
          onClick={handleBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.08em', background: 'none', border: 'none',
            marginBottom: 16,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          BACK
        </NativeButton>

        {/* JOURNEY BAR */}
        <SortedJourneyBar
          completedTools={completedTools}
          currentTool={activeTool}
          onNavigate={handleToolOpen}
        />

        {activeTool === 'letter' && (
          <Family51LetterDecoder
            accentColor="#f5a623"
            onResult={() => handleToolComplete('letter')}
            onHandoff={(data) => handleToolOpen('reply', data)}
          />
        )}
        {activeTool === 'reply' && (
          <Family51ReplyWriter
            accentColor="#f5a623"
            onResult={() => handleToolComplete('reply')}
            prefillContext={prefillContext}
            suggestedTone={prefillContext?.suggestedTone || prefillContext?.suggested_tone}
            relatedCaseId={prefillContext?.related_case_id}
            onHandoff={() => handleToolOpen('conflict', { related_case_id: prefillContext?.related_case_id })}
          />
        )}
        {activeTool === 'conflict' && (
          <Family51ConflictHelper
            accentColor="#f5a623"
            onResult={() => handleToolComplete('conflict')}
            prefillContext={prefillContext}
          />
        )}
        {activeTool === 'scam' && (
          <Family51ScamChecker
            accentColor="#f5a623"
          />
        )}

        <AnimatePresence>
          {showShare && activeTool === 'letter' && (
            <SortedShareMoment onDismiss={() => setShowShare(false)} />
          )}
        </AnimatePresence>

        {/* BOTTOM NAV — pure CSS, no Framer on these */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { id: 'letter',   label: 'DECODE',  color: '#f5a623' },
            { id: 'reply',    label: 'REPLY',   color: '#f5a623' },
            { id: 'conflict', label: 'DISPUTE', color: '#f5a623' },
            { id: 'scam',     label: 'SCAM?',   color: '#f5a623' },
          ].map(t => (
            <NativeButton
              key={t.id}
              onClick={() => handleToolOpen(t.id)}
              style={{
                padding: '10px 0', borderRadius: 10, fontSize: 10, fontWeight: 800,
                letterSpacing: '0.1em',
                border: `1px solid ${activeTool === t.id ? t.color + '60' : 'rgba(255,255,255,0.08)'}`,
                background: activeTool === t.id ? `${t.color}15` : 'transparent',
                color: activeTool === t.id ? t.color : 'rgba(255,255,255,0.3)',
              }}
            >
              {t.label}
            </NativeButton>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SortedUnifiedEngine;