/**
 * SortedPushNudge
 * Gentle one-time push notification opt-in shown after first decode result.
 * Reminds users of deadlines. Can be dismissed permanently. Never nags.
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'sorted_push_nudge_dismissed';

export default function SortedPushNudge({ deadline }) {
  const [visible, setVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // Only show if:
    // 1. Browser supports notifications
    // 2. Not already dismissed
    // 3. Not already granted
    // 4. There's a real deadline or we show general reminder option
    if (!('Notification' in window)) return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (Notification.permission === 'granted') { setGranted(true); return; }
    if (Notification.permission === 'denied') return;

    // Small delay so result renders first
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  const handleAllow = async () => {
    setRequesting(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setGranted(true);
        setVisible(false);
        localStorage.setItem(STORAGE_KEY, '1');

        // Send a gentle confirmation notification
        new Notification('SORTED ✓', {
          body: deadline && deadline !== 'No deadline mentioned'
            ? `We'll remind you about your deadline: ${deadline}`
            : 'We\'ve got you. We\'ll be here when you need us.',
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          tag: 'sorted-welcome',
        });
      } else {
        dismiss();
      }
    } catch (_) {
      dismiss();
    }
    setRequesting(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '16px 18px', borderRadius: 14,
            background: 'rgba(139,92,246,0.05)',
            border: '1px solid rgba(139,92,246,0.2)',
            position: 'relative',
          }}
        >
          <button
            onClick={dismiss}
            style={{
              position: 'absolute', top: 10, right: 14,
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 16, color: 'rgba(26,18,8,0.25)', lineHeight: 1,
            }}
          >×</button>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>🔔</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#1a1208', margin: '0 0 4px' }}>
                Want a reminder?
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.55)', margin: '0 0 14px', lineHeight: 1.6 }}>
                {deadline && deadline !== 'No deadline mentioned'
                  ? `We can remind you about your deadline — "${deadline}". Turn off anytime.`
                  : 'We can send a gentle nudge if you need us. Turn off anytime, no spam ever.'}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleAllow}
                  disabled={requesting}
                  style={{
                    flex: 2, padding: '10px 0', borderRadius: 10, fontSize: 12,
                    fontWeight: 800, letterSpacing: '0.06em', cursor: 'pointer',
                    border: '1.5px solid rgba(139,92,246,0.5)',
                    background: 'rgba(139,92,246,0.1)', color: '#7c3aed',
                    transition: 'all 0.2s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {requesting ? 'ALLOWING…' : 'YES PLEASE'}
                </button>
                <button
                  onClick={dismiss}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 11,
                    fontWeight: 700, cursor: 'pointer',
                    border: '1px solid rgba(26,18,8,0.1)',
                    background: 'transparent', color: 'rgba(26,18,8,0.4)',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  NO THANKS
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}