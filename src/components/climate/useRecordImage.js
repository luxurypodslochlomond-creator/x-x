import { useState } from 'react';
import { CATEGORY_IMAGE, IMAGES, RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';

// ── A BORROWED PICTURE IS NOT THE ENTRY'S PICTURE ──────────────────────────────
// This used to answer one question: what shall we show? It now answers two, because the
// second one was the whole of Brian's complaint on 18 November — "images look fake" — and
// the answer was that the record was printing stock photographs as if they belonged to the
// entry. Every candidate therefore declares whether the picture is the entry's own or a
// stand-in, and a stand-in is never printed on an entry again: SolutionCard draws the
// entry's facts instead (see RecordDrawnPlate).
//
// The test covers both ways a stand-in gets in. It is a category picture the card fell back
// to, or it is one of the stock addresses the record already knows by heart — including the
// ones that were once saved into an entry's own image_url, which is the sneakiest case: the
// entry looked as though it had a photograph of its own and did not.
const STOCK_HOSTS = /^https:\/\/(images\.unsplash\.com|source\.unsplash\.com)\//i;
const KNOWN_STOCK = Object.values(IMAGES);

const isBorrowed = (candidate) => {
  if (!candidate) return true;
  if (candidate.illustrative) return true;
  const src = candidate.src || '';
  return STOCK_HOSTS.test(src) || KNOWN_STOCK.includes(src);
};

export default function useRecordImage(entry, { entryOnly = false } = {}) {
  const [failed, setFailed] = useState([]);
  const cover = window.matchMedia('(max-width: 639px)').matches ? RECORD_COVER_SCREEN : IMAGES.cover;
  const category = entry?.entry_type === 'solution' ? CATEGORY_IMAGE(entry.category) : null;
  const candidates = [
    entry?.image_url && { src: entry.image_url, credit: entry.image_credit, illustrative: false },
    !entryOnly && category && {
      src: category,
      credit: category === IMAGES.mangroves ? 'Illustration · generated for the record' : 'Illustrative photograph · Unsplash',
      illustrative: true,
    },
    !entryOnly && { src: cover, credit: 'Cover artwork · painted for the record', illustrative: true },
  ].filter(Boolean);
  const image = candidates.find(candidate => !failed.includes(candidate.src));
  return {
    ...image,
    borrowed: isBorrowed(image),
    missingLabel: entry?.image_url ? 'Photograph unavailable' : 'No photograph supplied',
    label: image?.src === cover || image?.src === IMAGES.mangroves ? 'Record artwork' : 'Illustrative photograph',
    onError: () => {
      if (image) setFailed(previous => previous.includes(image.src) ? previous : [...previous, image.src]);
    },
  };
}