import { getDictionary, pullDictionary, translateWords } from '@/components/shared/translation/translationCache';
import { eachWord, isOurWrite, scanWords, visitWord } from '@/components/shared/translation/translationDom';

// A page/language gets its own queue and lifetime. It never shares a busy flag with its replacement.
export default function translationSession(lang, update) {
  let active = true, working = false, ready = false, timer;
  const dict = getDictionary(lang);
  const queue = new Set();
  const touched = new Set();
  const collect = () => scanWords(dict).forEach((word) => queue.add(word));

  async function drain() {
    if (!active || working || !ready) return;
    working = true;
    let incomplete = false;
    update(true, '');
    try {
      while (active && queue.size) {
        const words = [...queue];
        queue.clear();
        if (!navigator.onLine) { incomplete = true; break; }
        const result = await translateWords(lang, words, () => active);
        incomplete = incomplete || result.incomplete;
      }
      if (active) {
        // One final synchronous paint, rather than a reflow after every returned piece.
        scanWords(dict);
        update(false, incomplete ? 'Some words could not be translated. Original text is shown.' : '');
      }
    } finally {
      working = false;
      if (active && queue.size) drain();
    }
  }

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'childList') record.addedNodes.forEach((node) => eachWord(node, (word) => touched.add(word)));
      else if (!isOurWrite(record.target)) touched.add(record.target);
    }
    if (!touched.size) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      touched.forEach((node) => {
        const word = visitWord(node, dict);
        if (word) queue.add(word);
      });
      touched.clear();
      if (queue.size) drain();
    }, 100);
  });

  collect();
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] });
  update(true, '');
  pullDictionary(lang).catch(() => { /* Cached text is still usable; missing words get a normal request. */ }).finally(() => {
    if (!active) return;
    ready = true;
    collect();
    drain();
  });

  return () => { active = false; observer.disconnect(); clearTimeout(timer); };
}