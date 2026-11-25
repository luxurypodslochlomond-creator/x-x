import React from 'react';
import CartoonArtwork from '@/components/climate/cartoons/CartoonArtwork';

// One plate per drawing, big enough to recognise from a step back, with the maker's name
// under it — because the one thing that must never happen on the day is the wrong drawing
// going up under the wrong person's name.
export default function PresentSections({ sections, onOpen }) {
  let number = 0;
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.key}>
          <h2 className="text-[15px] font-black uppercase tracking-[0.12em] text-record-red lg:text-[17px]">{section.label}</h2>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">{section.note}</p>
          {!section.cartoons.length && (
            <p className="mt-2 border-l-2 border-record-ink/25 pl-3 font-mono text-[10.5px] leading-relaxed text-record-muted">
              {section.waiting || 'Nothing here yet.'}
            </p>
          )}
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {section.cartoons.map((cartoon) => {
              number += 1;
              return (
                <li key={cartoon.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(cartoon.id)}
                    className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red"
                  >
                    <span className="block border-2 border-record-ink bg-record-bone">
                      <CartoonArtwork cartoon={cartoon} />
                    </span>
                    <span className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="font-mono text-[10px] font-bold tabular-nums text-record-red">{number}</span>
                      <span className="text-[12px] font-bold leading-snug">{cartoon.title || 'Untitled'}</span>
                    </span>
                    <span className="block font-mono text-[9.5px] uppercase tracking-[0.1em] text-record-muted">{cartoon.artist_name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}