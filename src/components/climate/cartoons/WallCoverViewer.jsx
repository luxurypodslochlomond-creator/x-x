import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import '@/components/climate/cartoons/wall-cover-viewer.css';

export default function WallCoverViewer({ onClose }) {
  const dialog = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  useBodyScrollLock(true);
  useEffect(() => { const node = dialog.current; node.showModal(); return () => { if (node.open) node.close(); }; }, []);
  return createPortal(<dialog ref={dialog} className="wall-cover-viewer" aria-labelledby="wall-cover-title" onClose={onClose}>
    <header><div><h2 id="wall-cover-title">{CARTOON_EVENT.biennial}</h2><p>{CARTOON_EVENT.coverArt}</p></div>
      <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Fit image' : 'Enlarge'}</button>
      <button type="button" onClick={() => dialog.current.close()} autoFocus>Close</button>
    </header>
    <div className="wall-cover-scroll" data-zoom={zoomed}><img src={CARTOON_COVER} alt={`The CartoonAFRICA catalogue cover. ${CARTOON_EVENT.coverArt}.`} /></div>
  </dialog>, document.body);
}