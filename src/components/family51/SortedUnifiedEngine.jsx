import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';
import SortedJourneyBar from '@/components/family51/SortedJourneyBar';
import SortedShareMoment from '@/components/family51/SortedShareMoment';

const SortedUnifiedEngine = forwardRef(function SortedUnifiedEngine({ geoPrice, recordUse }, ref) {
  const [activeTool, setActiveTool] = useState(null);
  const [prefillContext, setPrefillContext] = useState(null);
  const [completedTools, setCompletedTools] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [slideDir, setSlideDir] = useState(1);

  const handleToolOpen = (toolId, handoffData = null) => {
    setSlideDir(1);
    setActiveTool(toolId);
    setPrefillContext(handoffData || null);
    setShowShare(false);
  };

  const handleToolComplete = (toolId) => {
    if (recordUse) recordUse();
    setCompletedTools(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
    if (toolId === 'letter' && !completedTools.includes('letter')) {
      setTimeout(() => setShowShare(true), 1200);
    }
  };

  const handleBack = () => {
    setActiveTool(null);
    setPrefillContext(null);
  };

  useImperativeHandle(ref, () => ({
    open: (toolId, handoffData = null) => handleToolOpen(toolId, handoffData),
  }));

  if (!activeTool) return null;

  const portal = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTool}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          inset: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to br, #0a0514 0%, #1a0f2a 50%, #0a0514 100%)',
          zIndex: 9999,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 560, margin: '0 auto', width: '100%', padding: '28px 20px 60px' }}>
        {/* BACK BUTTON */}
        <button
          onClick={handleBack}
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          BACK
        </button>

        {/* JOURNEY BAR */}
        <SortedJourneyBar
          completedTools={completedTools}
          currentTool={activeTool}
          onNavigate={handleToolOpen}
        />

        {activeTool === 'letter' && (
          <Family51LetterDecoder
            accentColor="#f97316"
            onResult={() => handleToolComplete('letter')}
            onHandoff={(data) => handleToolOpen('reply', data)}
          />
        )}
        {activeTool === 'reply' && (
          <Family51ReplyWriter
            accentColor="#06b6d4"
            onResult={() => handleToolComplete('reply')}
            prefillContext={prefillContext}
            suggestedTone={prefillContext?.suggestedTone || prefillContext?.suggested_tone}
            relatedCaseId={prefillContext?.related_case_id}
            onHandoff={() => handleToolOpen('conflict', { related_case_id: prefillContext?.related_case_id })}
          />
        )}
        {activeTool === 'conflict' && (
          <Family51ConflictHelper
            accentColor="#ef4444"
            onResult={() => handleToolComplete('conflict')}
            prefillContext={prefillContext}
          />
        )}

        <AnimatePresence>
          {showShare && activeTool === 'letter' && (
            <SortedShareMoment onDismiss={() => setShowShare(false)} />
          )}
        </AnimatePresence>

        {/* BOTTOM NAV */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
          {[
            { id: 'letter',   label: 'DECODE',  color: '#f97316' },
            { id: 'reply',    label: 'REPLY',   color: '#06b6d4' },
            { id: 'conflict', label: 'DISPUTE', color: '#ef4444' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => handleToolOpen(t.id)}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 10, fontWeight: 800,
                letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${activeTool === t.id ? t.color + '60' : 'rgba(255,255,255,0.08)'}`,
                background: activeTool === t.id ? `${t.color}15` : 'transparent',
                color: activeTool === t.id ? t.color : 'rgba(255,255,255,0.3)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(portal, document.body);
});

export default SortedUnifiedEngine;