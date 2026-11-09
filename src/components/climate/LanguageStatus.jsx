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
    <div data-no-translate className="px-0 pb-1 pt-2 text-[12px] leading-relaxed text-record-muted">
      {translationError ? (
        <div role="status" className="flex items-start justify-between gap-3">
          <span>{translationError}</span>
          <button type="button" onClick={retryLanguage} className="shrink-0 border border-record-mark px-2 py-1 text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red">Try again</button>
        </div>
      ) : <p className="max-w-[62ch]">{note}</p>}
    </div>
  );
}