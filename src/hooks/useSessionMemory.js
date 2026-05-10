import { useEffect, useRef } from 'react';

const MEMORY_KEY = 'sorted_session_memory';

export function useSessionMemory(pageId) {
  const memoryRef = useRef(null);

  // Load state on mount
  useEffect(() => {
    const stored = localStorage.getItem(MEMORY_KEY);
    if (stored) {
      try {
        const memory = JSON.parse(stored);
        memoryRef.current = memory[pageId] || {};
      } catch {
        memoryRef.current = {};
      }
    }
    // Restore scroll
    const scrollPos = memoryRef.current?.scrollY || 0;
    if (scrollPos > 0) {
      setTimeout(() => window.scrollTo(0, scrollPos), 0);
    }
  }, [pageId]);

  // Save state on unmount
  useEffect(() => {
    return () => {
      const memory = JSON.parse(localStorage.getItem(MEMORY_KEY) || '{}');
      memory[pageId] = {
        ...(memoryRef.current || {}),
        scrollY: window.scrollY,
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
    };
  }, [pageId]);

  const saveState = (key, value) => {
    if (!memoryRef.current) memoryRef.current = {};
    memoryRef.current[key] = value;
  };

  const getState = (key) => memoryRef.current?.[key];

  const clearMemory = () => {
    const memory = JSON.parse(localStorage.getItem(MEMORY_KEY) || '{}');
    delete memory[pageId];
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
    memoryRef.current = {};
  };

  return { saveState, getState, clearMemory };
}