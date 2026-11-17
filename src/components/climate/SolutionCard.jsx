import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_IMAGE } from '@/components/climate/categoryImages';

export default function SolutionCard({ item, lead = false }) {
  const isSolution = item.entry_type === 'solution';
  const cardImage = item.image_url || (isSolution ? CATEGORY_IMAGE(item.category) : null);
  const [failedImage, setFailedImage] = useState(null);
  const hasImage = !!cardImage && failedImage !== cardImage;
  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      className={`record-entry-plate relative flex h-full min-h-[13rem] w-full min-w-0 flex-col justify-end overflow-hidden border border-record-ink/25 border-t-4 text-left transition-transform duration-100 active:scale-95 lg:min-h-[17rem] ${isSolution ? 'border-t-record-signal' : 'border-t-record-red'} ${hasImage ? 'bg-record-ink text-record-paper' : 'bg-record-signal text-record-ink'}`}
    >
      {hasImage && <>
        <img src={cardImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" onError={() => setFailedImage(cardImage)} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-record-ink via-record-ink/75 to-record-ink/5" />
      </>}
      <div className="relative z-10 w-full p-3 lg:p-5">
        <span className={`mb-3 inline-block px-2 py-1 font-display text-xs font-bold uppercase tracking-wide ${hasImage ? (isSolution ? 'bg-record-signal text-record-ink' : 'bg-record-red text-record-paper') : 'bg-record-ink text-record-signal'}`}>
          {isSolution ? 'Solution' : 'Crisis'}
        </span>
        <h3 className={`font-display text-[15px] font-bold uppercase leading-[1.12] sm:text-lg ${lead ? 'lg:text-[26px]' : 'lg:text-xl'}`}>
          {item.title}
        </h3>
      </div>
    </Link>
  );
}