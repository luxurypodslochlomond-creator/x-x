import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check } from 'lucide-react';

export default function SortedShareMomentScam({ result, accentColor = '#ef4444' }) {
  const [copied, setCopied] = useState('');

  const VERDICT_EMOJIS = {
    safe: '✅',
    warning: '⚠️',
    scam: '🚨',
  };

  const shareText = `SORTED Scam Check

${VERDICT_EMOJIS[result.verdict]} ${result.verdict === 'safe' ? 'Looks Legitimate' : result.verdict === 'warning' ? 'Be Careful' : 'Almost Certainly a Scam'}
${result.confidence}

${result.what_this_is || ''}

What to do:
${result.what_to_do?.map((s, i) => `${i + 1}. ${s}`).join('\n') || ''}

Report to: ${result.report_to || 'Action Fraud'}

sorted.uf51.love — free, instant, nothing stored`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SORTED Scam Check',
          text: shareText,
        });
        return;
      } catch (e) {
        // User cancelled or share failed — fall through to clipboard
      }
    }
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied('share');
      setTimeout(() => setCopied(''), 2000);
    } catch {
      // Final fallback for older browsers
      const el = document.createElement('textarea');
      el.value = shareText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied('share');
      setTimeout(() => setCopied(''), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleShare}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.96 }}
      style={{
        width: '100%',
        padding: '12px 0',
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.1em',
        cursor: 'pointer',
        border: `1px solid ${accentColor}40`,
        background: copied === 'share' ? `${accentColor}20` : 'transparent',
        color: accentColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        transition: 'all 0.2s',
      }}
    >
      {copied === 'share' ? (
        <>
          <Check className="w-4 h-4" />
          COPIED
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          SHARE THIS
        </>
      )}
    </motion.button>
  );
}