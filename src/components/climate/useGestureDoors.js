import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { GESTURES, GESTURE_WORDS } from '@/components/climate/smallGestures';

/* ── THE DOOR OUT OF EACH SMALL GESTURE ────────────────────────────────────────────
   One list, one hook, two rooms that use it — the record's home and the map's foot — so
   the five can never point in different directions on the two pages that print them.

   A gesture opens an entry only when that entry's own title or subject actually carries
   the gesture's words. No near-matches, no "closest thing": a person sent to an entry
   that is not about what they pressed has been misled by the record, which is the one
   thing this place cannot do. Where the record holds nothing on the subject — today,
   four of the five — the gesture opens the record's search for it, which is honest even
   when the answer is that the record has nothing yet. */
export default function useGestureDoors() {
  const { data } = useQuery({
    queryKey: ['gesture-doors'],
    staleTime: 300000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      const options = { limit: 200, fields: ['title', 'category', 'entry_type'] };
      const [actions, solutions] = await Promise.all([
        base44.entities.ClimateAction.filter({ status: 'published' }, options),
        base44.entities.ClimateSolution.filter({ status: 'published' }, options),
      ]);
      const rows = [
        ...(actions.items || []).map((row) => ({
          id: row.id,
          type: 'action',
          text: `${row.title || ''} ${row.category || ''}`.toLowerCase(),
        })),
        ...(solutions.items || []).map((row) => ({
          id: row.id,
          type: 'solution',
          // A crisis is something to understand, not something to do: a gesture never
          // opens one, so a crisis row is dropped here rather than matched and skipped.
          ...(row.entry_type === 'climate_crisis' ? { skip: true } : {}),
          text: `${row.title || ''} ${row.category || ''}`.toLowerCase(),
        })),
      ];
      return rows.filter((row) => !row.skip);
    },
  });

  return useMemo(
    () =>
      GESTURES.map((label) => {
        const words = GESTURE_WORDS[label] || [];
        const hit = (data || []).find((row) => words.some((word) => row.text.includes(word)));
        return {
          label,
          to: hit
            ? `/ClimateDetail/${hit.type}/${hit.id}`
            : `/ClimateSearch?q=${encodeURIComponent(words[0] || label)}`,
        };
      }),
    [data]
  );
}