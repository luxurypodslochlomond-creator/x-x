import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Expand, X } from 'lucide-react';
import { IMAGES } from '@/components/climate/categoryImages';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

export default function MapArtworkView() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useBodyScrollLock(open);
  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return (
    <>
      <button ref={trigger} type="button" className="record-map-artwork-door" onClick={() => setOpen(true)}><Expand size={16} />View the painting</button>
      {open && createPortal(
        <dialog ref={dialog} className="record-map-artwork" aria-label="The record’s painting, whole" onCancel={(event) => { event.preventDefault(); close(); }} onClose={close}>
          <div className="flex items-center justify-between gap-4 px-4 py-2 text-record-paper">
            <span className="text-sm">The record’s painting</span>
            <button type="button" autoFocus onClick={close} className="flex min-h-11 items-center gap-2" aria-label="Close painting and return to the map"><X size={20} />Back to the map</button>
          </div>
          <img src={IMAGES.cover} alt="The record’s painting of Earth, weather and light beneath a star-filled sky" className="min-h-0 w-full flex-1 object-contain" />
        </dialog>, document.body,
      )}
    </>
  );
}