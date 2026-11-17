import { useState } from 'react';
import { CATEGORY_IMAGE, IMAGES } from '@/components/climate/categoryImages';

// Keep the supplied photograph first. A failed link advances to a labelled
// illustration, never to a blank yellow card or a different claimed site photo.
export default function useRecordImage(entry) {
  const [failed, setFailed] = useState([]);
  const category = entry?.entry_type === 'solution' ? CATEGORY_IMAGE(entry.category) : null;
  const candidates = [
    entry?.image_url && { src: entry.image_url, credit: entry.image_credit, illustrative: false },
    category && {
      src: category,
      credit: category === IMAGES.mangroves ? 'Illustration · generated for the record' : 'Illustrative photograph · Unsplash',
      illustrative: true,
    },
    { src: IMAGES.cover, credit: 'Cover artwork · painted for the record', illustrative: true },
  ].filter(Boolean);
  const image = candidates.find(candidate => !failed.includes(candidate.src));
  return {
    ...image,
    label: image?.src === IMAGES.cover || image?.src === IMAGES.mangroves ? 'Record artwork' : 'Illustrative photograph',
    onError: () => {
      if (image) setFailed(previous => previous.includes(image.src) ? previous : [...previous, image.src]);
    },
  };
}