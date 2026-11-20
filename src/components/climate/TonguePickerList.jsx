import React from 'react';
import { Check } from 'lucide-react';
import { TongueMark, MarkGlobe } from './tongueMarks';

export default function TonguePickerList({ theme, query, found, lang, detected, chosen, nameFor, onChoose }) {
  const { divide, dim, rowIdle, rowOn, accent } = theme;
  return (
    <div role="listbox" aria-label="Languages" className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
      {!query.trim() && (
        <button type="button" role="option" aria-selected={lang === 'auto'} onClick={() => onChoose('auto')}
          className={`w-full flex items-center gap-2 px-3 py-2.5 min-h-[42px] text-left text-[13px] font-mono border-b ${divide} ${lang === 'auto' ? rowOn : rowIdle}`}>
          <MarkGlobe size={13} className="flex-shrink-0 opacity-80" />
          <span data-no-translate className="flex-1 min-w-0 truncate">Auto — {nameFor(detected)}</span>
          <span className={`flex-shrink-0 text-[9px] font-mono uppercase tracking-widest ${dim}`}>device</span>
          {lang === 'auto' && <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />}
        </button>
      )}
      <div className="sm:grid sm:grid-cols-2">
        {found.map((language) => (
          <button key={language.code} type="button" role="option" aria-selected={chosen === language.code} onClick={() => onChoose(language.code)}
            className={`w-full flex items-center gap-2 px-3 py-2.5 min-h-[42px] text-left text-[13px] font-mono border-b ${divide} ${chosen === language.code ? rowOn : rowIdle}`}>
            {/* A tongue whose own script this record cannot print carries its cut mark here
                instead of a borrowed character. Everything else needs none: the script is the
                mark. */}
            <TongueMark code={language.code} size={15} className="flex-shrink-0" />
            <span data-no-translate className="flex-1 min-w-0 truncate">{language.label}</span>
            {chosen === language.code && <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />}
          </button>
        ))}
      </div>
      {found.length === 0 && (
        <p className={`px-3 py-6 text-center text-[11px] font-mono leading-relaxed ${dim}`}>
          No language on the list by that name. Type it below and the record will speak it.
        </p>
      )}
    </div>
  );
}