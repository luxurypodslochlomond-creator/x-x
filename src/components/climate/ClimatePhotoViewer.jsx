import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import ClimatePhotoCredit from '@/components/climate/ClimatePhotoCredit';
import ClimatePhotoControls from '@/components/climate/ClimatePhotoControls';
import useClimatePhotoDialog from '@/components/climate/useClimatePhotoDialog';

export default function ClimatePhotoViewer({ photos, startIndex, onClose }) {
  const { index, dialogRef, go, gestures } = useClimatePhotoDialog(startIndex, photos.length);
  const photo = photos[index];
  const onKeyDown = event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      go(event.key === 'ArrowRight' ? 1 : -1);
    }
  };
  return createPortal(
    <dialog ref={dialogRef} dir="ltr" aria-label="Full-size photographs" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={onKeyDown} className="climate-photo-dialog">
      <div className="climate-photo-viewer-top flex shrink-0 items-center justify-between px-3 pb-2">
        <span className="font-body text-xs">Photographs</span>
        <button type="button" autoFocus onClick={onClose} aria-label="Close photographs and return to the record" className="flex min-h-11 min-w-11 items-center justify-center border border-record-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal"><X className="h-5 w-5" /></button>
      </div>
      <div {...gestures} className="relative min-h-0 flex-1">
        <img key={photo.id} src={photo.display_url || photo.image_url} alt={photo.caption || 'Photograph on the record'} draggable="false" className="absolute inset-0 h-full w-full object-contain" />
      </div>
      <ClimatePhotoCredit photo={photo} />
      <div className="climate-photo-viewer-bottom shrink-0"><ClimatePhotoControls index={index} total={photos.length} onPrevious={() => go(-1)} onNext={() => go(1)} /></div>
    </dialog>, document.body
  );
}