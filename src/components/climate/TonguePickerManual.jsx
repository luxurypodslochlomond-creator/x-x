import React from 'react';

export default function TonguePickerManual({ theme, otherOpen, setOtherOpen, manual, setManual, refusal, setRefusal, manualRef, onCommit }) {
  const { divide, field, dim, rowIdle, accent } = theme;
  return (
    <div className={`flex-shrink-0 max-h-[45%] overflow-y-auto p-2 border-t-2 ${divide}`}>
      {otherOpen ? (
        <div className="flex items-center gap-2">
          <input ref={manualRef} value={manual}
            onChange={(event) => { setManual(event.target.value); if (refusal) setRefusal(''); }}
            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); onCommit(); } }}
            placeholder="e.g. Kiswahili, Basque, Bislama" aria-label="Type any language on Earth"
            autoComplete="off" autoCapitalize="words" enterKeyHint="go"
            className={`flex-1 min-w-0 border px-3 py-2 min-h-[38px] text-[16px] sm:text-[12px] font-mono outline-none ${field}`} />
          <button type="button" onClick={onCommit}
            className="flex-shrink-0 px-3 py-2 min-h-[38px] text-[10px] font-black font-mono uppercase"
            /* Ink on the mark's red is too close to read; paper on it is not. So the one
               filled control in the picker is written in paper, like the mark itself. */
            style={{ background: accent, color: 'rgb(var(--record-paper))' }}>Go</button>
          <button type="button" onClick={() => { manualRef.current?.blur(); setOtherOpen(false); setManual(''); }} aria-label="Cancel"
            className={`flex-shrink-0 w-[38px] h-[38px] flex items-center justify-center border text-base leading-none ${field}`}>×</button>
        </div>
      ) : (
        <button type="button" onClick={() => setOtherOpen(true)}
          className={`w-full px-2 py-2.5 min-h-[42px] text-left text-[12px] font-mono ${rowIdle}`}>
          Any other language on Earth
        </button>
      )}
      {refusal && <p className={`mt-2 border-l-2 border-record-signal pl-2 text-[11px] font-mono leading-relaxed ${dim}`}>{refusal}</p>}
    </div>
  );
}