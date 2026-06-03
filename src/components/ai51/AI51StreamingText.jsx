import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * AI51 STREAMING TEXT — renders AI response word by word
 * Feels like thinking. Feels alive. ♾️❤️
 */
export default function AI51StreamingText({ text, isStreaming = false, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const wordsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!text) return;

    wordsRef.current = text.split(' ');
    setDisplayed('');
    setWordIndex(0);

    let i = 0;
    const streamWords = () => {
      if (i >= wordsRef.current.length) {
        onComplete?.();
        return;
      }
      setDisplayed(prev => prev + (i === 0 ? '' : ' ') + wordsRef.current[i]);
      i++;
      // Variable speed — feels human
      const delay = 18 + Math.random() * 30 + (wordsRef.current[i - 1]?.endsWith('.') || wordsRef.current[i - 1]?.endsWith('?') || wordsRef.current[i - 1]?.endsWith('!') ? 180 : 0);
      timerRef.current = setTimeout(streamWords, delay);
    };

    streamWords();

    return () => clearTimeout(timerRef.current);
  }, [text]);

  return (
    <span>
      {displayed}
      {isStreaming && displayed !== text && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}