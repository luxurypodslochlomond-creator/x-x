import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from '@/components/climate/useRecordImage';

export default function SolutionCard({ item, lead = false }) {
  const isSolution = item.entry_type === 'solution';
  const image = useRecordImage(item);
  const borderTone = isSolution ? 'border-t-record-signal' : 'border-t-record-red';
  const badgeTone = isSolution ? 'bg-record-signal text-record-ink' : 'bg-record-red text-record-paper';
  const titleSize = lead ? 'lg:text-[23px]' : 'lg:text-lg';
  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      className="record-entry-plate record-media-mount relative flex h-full w-full min-w-0 flex-col bg-record-paper text-left text-record-ink"
    >
      <span className="record-entry-image relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-record-bone">
        {image.src && <img src={image.src} alt="" loading={lead ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" onError={image.onError} />}
        {/* ── THE SOURCE OF THE ART, ON THE ART ───────────────────────────────────
            Brian asked on 18 November what happens to artist credits and the sources of
            pictures. On the record's own photographs the credit has always travelled with
            the image; an entry's picture had none, so a reader met a photograph with
            nothing saying whose it was. The credit is printed on the plate now, small and
            in the machine's voice, over the picture it belongs to — never underneath it,
            never apart from it. */}
        {item.image_credit && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-record-ink via-record-ink/70 to-transparent px-2 pb-1.5 pt-7 font-mono text-[9px] uppercase leading-[1.4] tracking-[0.12em] text-record-paper/90">
            {item.image_credit}
          </span>
        )}
      </span>
      <div className={['record-entry-copy w-full flex-1 border-t-4 bg-record-paper p-4', borderTone].join(' ')}>
        <span className={['record-header-type mb-3 inline-block px-2 py-1 text-xs uppercase', badgeTone].join(' ')}>
          {isSolution ? 'Solution' : 'Crisis'}
        </span>
        <h3 className={['record-header-type text-[15px] uppercase leading-[1.4] sm:text-lg', titleSize].join(' ')}>
          {item.title}
        </h3>
        {(image.illustrative || !image.src) && <span className="mt-3 block font-record-ui text-xs text-record-muted">{image.src ? image.label : 'Image unavailable'}</span>}
      </div>
    </Link>
  );
}