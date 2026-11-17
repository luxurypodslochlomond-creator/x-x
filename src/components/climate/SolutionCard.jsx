import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from '@/components/climate/useRecordImage';

export default function SolutionCard({ item, lead = false }) {
  const isSolution = item.entry_type === 'solution';
  const image = useRecordImage(item);
  const borderTone = isSolution ? 'border-t-record-signal' : 'border-t-record-red';
  const badgeTone = isSolution ? 'bg-record-signal text-record-ink' : 'bg-record-red text-record-paper';
  const titleSize = lead ? 'lg:text-[26px]' : 'lg:text-xl';
  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      className={['record-entry-plate relative flex h-full min-h-[13rem] w-full min-w-0 flex-col justify-end overflow-hidden border border-record-ink/25 border-t-4 bg-record-ink text-left text-record-paper transition-transform duration-100 active:scale-95 lg:min-h-[17rem]', borderTone].join(' ')}
    >
      {image.src && <img src={image.src} alt="" loading={lead ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" onError={image.onError} />}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-record-ink via-record-ink/60 to-record-ink/5" />
      <div className="relative z-10 w-full p-3 lg:p-5">
        <span className={['record-header-type mb-3 inline-block px-2 py-1 text-xs uppercase', badgeTone].join(' ')}>
          {isSolution ? 'Solution' : 'Crisis'}
        </span>
        <h3 className={['record-header-type text-[15px] uppercase leading-[1.4] sm:text-lg', titleSize].join(' ')}>
          {item.title}
        </h3>
        {(image.illustrative || !image.src) && <span className="mt-3 block font-record-ui text-xs text-record-paper/80">{image.src ? image.label : 'Image unavailable'}</span>}
      </div>
    </Link>
  );
}