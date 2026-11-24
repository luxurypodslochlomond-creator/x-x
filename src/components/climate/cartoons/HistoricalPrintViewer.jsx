import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import HistoricalPrintCaption from '@/components/climate/cartoons/HistoricalPrintCaption';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

export default function HistoricalPrintViewer({ works, index, onTurn, onClose }) {
  const dialog = useRef(null);
  const body = useRef(null);
  const work = works[index];
  const [loaded, setLoaded] = useState(null);
  const [failed, setFailed] = useState(null);
  useBodyScrollLock(true);
  useEffect(() => { const node = dialog.current; node.showModal(); return () => { if (node.open) node.close(); }; }, []);
  useEffect(() => { body.current?.scrollTo(0, 0); }, [index]);
  const turn = step => onTurn((index + step + works.length) % works.length);
  return createPortal(<dialog ref={dialog} className="historical-print-viewer" aria-labelledby="historical-viewer-title" aria-describedby="historical-viewer-description" onClose={onClose}
    onKeyDown={event => { if (!event.altKey && !event.ctrlKey && !event.metaKey && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1); } }}>
    <header>
      <div><h2 id="historical-viewer-title">{work.work}</h2><p id="historical-viewer-description" className="historical-print-viewer-description">{work.name} · {work.dates}</p></div>
      <button type="button" className="historical-print-close" onClick={() => dialog.current.close()} aria-label="Close image and return to the wall" autoFocus><X size={22} /></button>
    </header>
    <div className="historical-print-viewer-body" ref={body}>
      <div className="historical-print-viewer-art" aria-busy={loaded !== work.id && failed !== work.id}>
        {loaded !== work.id && failed !== work.id && <p className="historical-image-state" role="status">Opening image…</p>}
        {failed === work.id ? <p className="historical-image-state" role="status">The image could not be opened here. Use “Source &amp; credit” to see its record.</p> : <img key={work.id} src={work.full} alt={`${work.work}, ${work.name}`} decoding="async" onLoad={() => setLoaded(work.id)} onError={() => setFailed(work.id)} />}
      </div>
      <aside><HistoricalPrintCaption work={work} viewer /></aside>
    </div>
    <div className="historical-print-viewer-footer">
      <button type="button" onClick={() => turn(-1)}><ArrowLeft size={18} />Previous</button>
      <span aria-live="polite">{index + 1} / {works.length}</span>
      <button type="button" onClick={() => turn(1)}>Next<ArrowRight size={18} /></button>
    </div>
  </dialog>, document.body);
}