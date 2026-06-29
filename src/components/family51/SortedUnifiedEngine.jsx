import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';
import Family51ScamChecker from '@/components/family51/Family51ScamChecker';
import SortedContractChecker from '@/components/family51/SortedContractChecker';
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

const SortedUnifiedEngine = forwardRef(function SortedUnifiedEngine({ geoPrice, recordUse, isLocked, onPaywall }, ref) {
  const TOOL_COLORS = {
    letter:   { color: '#d97706', bg: 'rgba(217,119,6,0.08)',  border: 'rgba(217,119,6,0.35)',  label: 'DECODE A LETTER',    hint: 'Paste, type or snap a photo of your letter below.' },
    scam:     { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.35)',   label: 'SCAM CHECK',         hint: 'Paste the message, email or text below — or snap a photo.' },
    reply:    { color: '#0891b2', bg: 'rgba(8,145,178,0.08)',   border: 'rgba(8,145,178,0.35)',   label: 'WRITE A REPLY',      hint: 'Describe the situation below and we\'ll write the letter for you.' },
    conflict: { color: '#059669', bg: 'rgba(5,150,105,0.08)',   border: 'rgba(5,150,105,0.35)',   label: 'RESOLVE A DISPUTE',  hint: 'Tell us what\'s happening below — we\'ll give you a clear plan.' },
    contract: { color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.35)',  label: 'CHECK A CONTRACT',   hint: 'Paste the contract text or clause you\'re unsure about.' },
  };

  const [activeTool, setActiveTool] = useState(null);
  const [visible, setVisible] = useState(false); // drives the CSS transition
  const [prefillContext, setPrefillContext] = useState(null);
  const [completedTools, setCompletedTools] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [triggerPhoto, setTriggerPhoto] = useState(false);

  // Open: set tool → immediately visible, scroll to top
  const handleToolOpen = (toolId, handoffData = null) => {
    if (isLocked && onPaywall) {
      onPaywall();
      return;
    }
    setActiveTool(toolId);
    setPrefillContext(handoffData || null);
    setShowShare(false);
    setTriggerPhoto(handoffData?.triggerPhoto || false);
    setVisible(true);
    // Always scroll to top when a tool opens
    setTimeout(() => window.scrollTo(0, 0), 50);
  };

  const handleToolComplete = (toolId) => {
    // Note: recordUse() is NOT called here — each tool component already calls
    // recordSortedUse() internally before the LLM call. Calling it here too
    // would double-count uses against the rate limit.
    setCompletedTools(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
    if (toolId === 'letter' && !completedTools.includes('letter')) {
      setTimeout(() => setShowShare(true), 1200);
    }
  };

  const handleBack = () => {
    if (navigator.vibrate) navigator.vibrate(8);
    setVisible(false);
    setTriggerPhoto(false);
    setTimeout(() => {
      setActiveTool(null);
      setPrefillContext(null);
    }, 220);
  };

  useImperativeHandle(ref, () => ({
    open: (toolId, handoffData = null) => handleToolOpen(toolId, handoffData),
  }));

  const tc = TOOL_COLORS[activeTool] || TOOL_COLORS.letter;
  const sheetRef = useRef(null);

  // Scroll the sheet itself to top when tool changes
  useEffect(() => {
    if (visible && sheetRef.current) {
      sheetRef.current.scrollTop = 0;
    }
  }, [activeTool, visible]);

  return (
    <div
      ref={sheetRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
        transition: visible
          ? 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)'
          : 'transform 0.22s cubic-bezier(0.4, 0, 1, 1)',
        willChange: 'transform',
        background: '#faf8f5',
        overflowY: activeTool ? 'auto' : 'hidden',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        WebkitOverflowScrolling: 'touch',
        // Keep mounted when not active so no remount flash
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* COLOURED TOP ACCENT BAR */}
      <div style={{ height: 3, background: tc.color, flexShrink: 0, transition: 'background 0.2s' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 560, margin: '0 auto', width: '100%', padding: '16px 16px 80px' }}>

        {/* HEADER ROW — back + tool label + human hint */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <NativeButton
              onClick={handleBack}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.45)',
                letterSpacing: '0.06em', background: 'none', border: 'none', padding: '8px 0',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </NativeButton>
            <div style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
              color: tc.color, background: `${tc.color}15`,
              border: `1px solid ${tc.color}35`,
              borderRadius: 20, padding: '4px 12px',
            }}>
              SORTED
            </div>
          </div>
          {/* HUMAN GUIDANCE — tells the user exactly what to do */}
          <div style={{ borderLeft: `3px solid ${tc.color}`, paddingLeft: 12 }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: '#1a1208', margin: '0 0 3px', letterSpacing: '-0.01em' }}>{tc.label}</p>
            <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.5)', margin: 0, lineHeight: 1.5 }}>{tc.hint}</p>
          </div>
        </div>

        {/* JOURNEY BAR */}
        {completedTools.length > 0 && (
          <SortedJourneyBar
            completedTools={completedTools}
            currentTool={activeTool}
            onNavigate={handleToolOpen}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {activeTool === 'letter' && (
              <Family51LetterDecoder
                accentColor={tc.color}
                onResult={() => handleToolComplete('letter')}
                onHandoff={(data) => {
                  setTriggerPhoto(false);
                  handleToolOpen('reply', data);
                }}
                triggerPhoto={triggerPhoto}
                prefillFileUrl={prefillContext?.prefillFileUrl}
                onPhotoTriggered={() => setTriggerPhoto(false)}
              />
            )}
            {activeTool === 'reply' && (
              <Family51ReplyWriter
                accentColor={tc.color}
                onResult={() => handleToolComplete('reply')}
                prefillContext={prefillContext}
                suggestedTone={prefillContext?.suggestedTone || prefillContext?.suggested_tone}
                relatedCaseId={prefillContext?.related_case_id}
                onHandoff={(replyCtx) => handleToolOpen('conflict', {
                  ...prefillContext,
                  related_case_id: prefillContext?.related_case_id,
                  reply_summary: replyCtx?.subject_line || '',
                  reply_body: replyCtx?.letter_body || '',
                  situation_hint: replyCtx?.situation_hint || '',
                })}
              />
            )}
            {activeTool === 'conflict' && (
              <Family51ConflictHelper
                accentColor={tc.color}
                onResult={() => handleToolComplete('conflict')}
                prefillContext={prefillContext}
              />
            )}
            {activeTool === 'scam' && (
              <Family51ScamChecker
                accentColor={tc.color}
                onResult={() => handleToolComplete('scam')}
                onHandoff={(data) => handleToolOpen('reply', data)}
              />
            )}
            {activeTool === 'contract' && (
              <SortedContractChecker
                accentColor={tc.color}
                onResult={() => handleToolComplete('contract')}
                onHandoff={(data) => handleToolOpen('reply', data)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showShare && activeTool === 'letter' && (
            <SortedShareMoment onDismiss={() => setShowShare(false)} />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
});

export default SortedUnifiedEngine;