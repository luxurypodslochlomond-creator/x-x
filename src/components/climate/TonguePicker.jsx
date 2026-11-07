import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { LANGS } from './useClimateLanguage';
import { tongueMatches, languageFromTyped } from './tongueNames';

import TonguePickerDialog from '@/components/climate/TonguePickerDialog';
import TonguePickerPanel from '@/components/climate/TonguePickerPanel';

// ── EVERY TONGUE — the record's own list ──
// A browser's own dropdown cannot be dressed. It opens in the operating system's
// clothes: grey, foreign, and nothing like this record. So the tongue is chosen
// from the record's own panel instead — searchable, in the reader's own scripts,
// and drawn in the same ink, bone and signal as everything else on the record.

const nameFor = (code) => {
  if (!code) return 'English';
  const hit = LANGS.find(l => l.code.toLowerCase() === code.toLowerCase());
  return hit ? hit.label : code;
};

export default function TonguePicker({ lang, detected, onChange, tone = 'ink' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [otherOpen, setOtherOpen] = useState(false);
  const [manual, setManual] = useState('');
  const [refusal, setRefusal] = useState('');
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const [anchor, setAnchor] = useState(null);
  const searchRef = useRef(null);
  const manualRef = useRef(null);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const ink = tone === 'ink';
  const accent = ink ? '#e2602a' : '#b3261e';
  const field = ink
    ? 'border-[#efe7d6]/25 bg-transparent text-[#efe7d6]'
    : 'border-[#141210] bg-[#f7f1e5] text-[#141210]';

  const chosen = lang === 'auto' ? detected : lang;

  // A tongue answers to its own name and to its English one, accents aside — "French" and
  // "Français" are the same tongue, and a finger without é should not be turned away.
  const found = useMemo(() => {
    if (!query.trim()) return LANGS;
    return LANGS.filter(l => tongueMatches(l, query));
  }, [query]);

  // The panel is drawn into the page rather than inside the strip it was opened from.
  // It used to be absolutely positioned inside the record's masthead, and every masthead
  // on the record is overflow-hidden so the cover cannot bleed out of it — which meant
  // the list was there, and clipped to nothing. Measured from the button, drawn on the
  // body, and it can never be cut off again.
  useEffect(() => {
    if (!open || mobile) return;
    const place = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (r) setAnchor({ top: r.bottom, right: Math.max(8, window.innerWidth - r.right) });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, mobile]);

  // Escape closes it, and so does a tap anywhere else — the record never traps a reader.
  useEffect(() => {
    if (!open || mobile) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const onDown = (e) => {
      if (wrapRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, mobile]);

  // A mouse can be sent straight to the search box. A finger cannot: on a phone
  // that throws the keyboard up over the panel before the reader has looked at it,
  // so on touch the field waits to be tapped instead.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) searchRef.current?.focus();
  }, [open]);

  // The mobile panel already follows the keyboard. Never scroll the page on focus.
  useEffect(() => {
    if (otherOpen && !mobile) manualRef.current?.focus({ preventScroll: true });
  }, [otherOpen, mobile]);

  const close = () => {
    searchRef.current?.blur();
    manualRef.current?.blur();
    setOpen(false);
    setQuery('');
    setOtherOpen(false);
  };
  const choose = (code) => { onChange(code); close(); };
  // Every tongue is taken, ancient scripts included. Nothing is refused at the door: the
  // whole record goes into the reader's script, and the page says out loud that an ancient
  // wording is a machine's attempt that nobody alive can check.
  const commit = () => {
    const typed = manual.trim();
    if (!typed) return;
    setRefusal('');
    // Typed in the English word for a tongue already on the list? Take the tongue it means,
    // so the reader lands on the kept one instead of making a second Français by another name.
    onChange(languageFromTyped(typed, LANGS) || typed);
    setManual('');
    close();
  };

  const panel = ink ? 'bg-[#141210] border-[#e2602a] text-[#efe7d6]' : 'bg-[#f7f1e5] border-[#141210] text-[#141210]';
  const divide = ink ? 'border-[#efe7d6]/15' : 'border-[#141210]/15';
  const rowIdle = ink ? 'text-[#efe7d6] hover:bg-[#efe7d6]/10' : 'text-[#141210] hover:bg-[#141210]/5';
  const rowOn = ink ? 'text-[#efe7d6] bg-[#e2602a]/20' : 'text-[#141210] bg-[#b3261e]/10';
  const dim = ink ? 'text-[#efe7d6]/55' : 'text-[#5a5246]';
  const content = open && (
    <TonguePickerPanel theme={{ ink, accent, field, panel, divide, rowIdle, rowOn, dim }}
      mobile={mobile} onClose={close} searchRef={searchRef} query={query} setQuery={setQuery}
      listProps={{ found, lang, detected, chosen, nameFor, onChoose: choose }}
      manualProps={{ otherOpen, setOtherOpen, manual, setManual, refusal, setRefusal, manualRef, onCommit: commit }} />
  );

  return (
    <div ref={wrapRef} className="relative flex-1 min-w-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup={mobile ? 'dialog' : 'listbox'}
        aria-expanded={open}
        aria-label="Choose the record's language"
        className={`w-full flex items-center justify-between gap-2 border px-2 py-1.5 min-h-[36px] text-[13px] font-bold font-mono text-left outline-none cursor-pointer ${field}`}
      >
        {/* A language is named in its own words and never translated: a control that
            renames itself in the tongue you are leaving cannot be trusted or used. */}
        <span data-no-translate className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{lang === 'auto' ? `🌐 Auto — ${nameFor(detected)}` : nameFor(lang)}</span>
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && mobile && <TonguePickerDialog onClose={close}>{content}</TonguePickerDialog>}
      {open && !mobile && anchor && createPortal(
        <div ref={panelRef} style={{ position: 'fixed', top: anchor.top, right: anchor.right, zIndex: 80 }}>
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}