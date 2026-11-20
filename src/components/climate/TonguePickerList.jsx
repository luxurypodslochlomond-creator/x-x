import React from 'react';
import { Check } from 'lucide-react';
import { TongueMark, MarkGlobe } from './tongueMarks';
import { englishBeside } from './tongueNames';
import { TONGUE_GROUPS } from './tongueGroups';

// ── THE LIST OF THE WORLD'S TONGUES, AND WHAT IT HAS TO DO ──────────────────────
// Brian, 20 November: "some of the languages are coolasfuck but don't know the name in English
// might be a way to help educate bro... and the tongue picker needs to be phenomenal, don't
// want to look not like us."
//
// Three things were wrong with this list, and none of them was the number of tongues on it.
//
// One: it printed each tongue's own name and nothing else, so a reader met "Gaelg" or "Diné
// bizaad" or "Nāhuatl" with no way to learn which tongue that is. Now every row carries the
// English name under the tongue's own name, in small caps — the teaching, printed quietly
// beneath the name the tongue has for itself, never instead of it.
//
// Two: a hundred and twenty tongues sat in one flat scroll in the order somebody happened to
// add them, so nothing could be found by eye. They now stand in the places they are spoken,
// under headings that stay at the top of the list as you scroll, because a heading you cannot
// see is a heading that has already scrolled away. Search flattens the list again: once a
// reader has typed, the group headings are noise between them and the tongue they want.
//
// Three: the rows were a single cramped line of mono with a tick at the end. They are now the
// height a finger actually is, with the tongue's script given room to be itself at the size it
// needs — which is the whole reason these are not flags. A flag would have been easier and
// would have been wrong: a tongue is not a country, and half of them do not have one.
const GROUP_FALLBACK = 'Every other tongue';

export default function TonguePickerList({ theme, query, found, lang, detected, chosen, nameFor, onChoose }) {
  const { divide, dim, rowIdle, rowOn, accent } = theme;
  const searching = Boolean(query.trim());

  // The tongues in their places, in the groups' own order. Anything the groups do not know
  // still renders — a reader never loses a tongue because somebody forgot to file it.
  const byCode = new Map(found.map((language) => [language.code, language]));
  const placed = new Set();
  const sections = [];
  if (!searching) {
    TONGUE_GROUPS.forEach((group) => {
      const items = group.codes.map((code) => byCode.get(code)).filter(Boolean);
      if (!items.length) return;
      items.forEach((item) => placed.add(item.code));
      sections.push({ key: group.key, title: group.title, items });
    });
    const rest = found.filter((language) => !placed.has(language.code));
    if (rest.length) sections.push({ key: 'rest', title: GROUP_FALLBACK, items: rest });
  } else {
    sections.push({ key: 'found', title: '', items: found });
  }

  const row = (language) => {
    const english = englishBeside(language);
    const on = chosen === language.code;
    return (
      <button key={language.code} type="button" role="option" aria-selected={on} onClick={() => onChoose(language.code)}
        className={`w-full flex items-start gap-2.5 px-3 py-2.5 min-h-[46px] text-left border-b ${divide} ${on ? rowOn : rowIdle}`}>
        {/* A tongue whose own script this record cannot print carries its cut mark here
            instead of a borrowed character. Everything else needs none: the script is the
            mark. The slot is held open either way, so every name in the list starts on the
            same line down the page rather than stepping in and out. */}
        <span className="w-4 flex-shrink-0 mt-[3px]"><TongueMark code={language.code} size={15} /></span>
        <span className="flex-1 min-w-0">
          <span data-no-translate className="block text-[13px] leading-snug break-words">{language.label}</span>
          {english && (
            <span data-no-translate className={`block mt-0.5 text-[9px] font-mono uppercase tracking-[0.16em] leading-tight ${on ? 'opacity-70' : dim}`}>{english}</span>
          )}
        </span>
        {on && <Check className="w-3.5 h-3.5 flex-shrink-0 mt-1" style={{ color: accent }} />}
      </button>
    );
  };

  return (
    <div role="listbox" aria-label="Languages" className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
      {!searching && (
        <button type="button" role="option" aria-selected={lang === 'auto'} onClick={() => onChoose('auto')}
          className={`w-full flex items-start gap-2.5 px-3 py-2.5 min-h-[46px] text-left border-b ${divide} ${lang === 'auto' ? rowOn : rowIdle}`}>
          <span className="w-4 flex-shrink-0 mt-[3px]"><MarkGlobe size={15} /></span>
          <span className="flex-1 min-w-0">
            <span data-no-translate className="block text-[13px] leading-snug">Auto — {nameFor(detected)}</span>
            <span className={`block mt-0.5 text-[9px] font-mono uppercase tracking-[0.16em] leading-tight ${lang === 'auto' ? 'opacity-70' : dim}`}>
              <span>device</span>
            </span>
          </span>
          {lang === 'auto' && <Check className="w-3.5 h-3.5 flex-shrink-0 mt-1" style={{ color: accent }} />}
        </button>
      )}
      {sections.map((section) => (
        <section key={section.key}>
          {section.title && (
            <h3 className={`sticky top-0 z-10 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] border-b ${divide} ${dim}`}
              style={{ background: '#141210' }}>
              {section.title}
            </h3>
          )}
          <div className="sm:grid sm:grid-cols-2">{section.items.map(row)}</div>
        </section>
      ))}
      {found.length === 0 && (
        <p className={`px-3 py-6 text-center text-[11px] font-mono leading-relaxed ${dim}`}>
          No language on the list by that name. Type it below and the record will speak it.
        </p>
      )}
    </div>
  );
}