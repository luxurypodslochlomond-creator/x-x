import React from 'react';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import { isAncientScript, ANCIENT_SCRIPT_NOTE } from './ancientScripts';
import { TONGUE_EN } from './tongueNames';

// The honest line under the record. It never hides a failure, and it never lets a
// machine's wording in a tongue nobody can check pass as an inscription.
//
// Every tongue but English here is made by a machine. That is said out loud in that
// tongue's own reader's line, not buried: a reader who cannot check the wording is
// exactly the reader who most needs to know who wrote it. The entry behind the link
// is still in its original words, so a doubtful word can always be checked against
// what the source actually said. A tongue a speaker has checked loses this line.
export default function LanguageStatus() {
  const { chosen, translationError, retryLanguage } = useSiteLanguage();
  const name = TONGUE_EN[chosen] || chosen || '';
  const isEnglish = /^en(-|$)/i.test(chosen || 'en');
  const note = isAncientScript(chosen)
    ? ANCIENT_SCRIPT_NOTE
    : !isEnglish && name
      ? `${name} here is made by a machine, and no speaker of it has checked the wording. The entry behind each link is still in its original words, so anything that reads wrong can be checked against what the source actually said.`
      : '';
  if (!translationError && !note) return null;
  return (
    <div data-no-translate className="border-t border-record-signal/20 px-5 py-2 text-[11px] font-mono leading-relaxed text-record-paper/80">
      {translationError ? (
        <div role="status" className="flex items-center justify-between gap-3">
          <span>{translationError}</span>
          <button type="button" onClick={retryLanguage} className="shrink-0 border border-record-signal px-2 py-1 text-record-paper focus-visible:outline focus-visible:outline-record-signal">Try again</button>
        </div>
      ) : <p>{note}</p>}
    </div>
  );
}