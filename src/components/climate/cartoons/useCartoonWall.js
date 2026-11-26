import { useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import { orderWall } from '@/components/climate/cartoons/wallOrder';

// ── THE WALL IN A POCKET, WITH NO SIGNAL ───────────────────────────────────────
// Brian, 26 November: "we could go offline and people could still share the whole wall."
// The worker already keeps the pages and any drawing somebody has looked at, but the wall's
// own words — every title, hand and line — come from the record's database, so offline the
// room opened and said it could not be reached. That is the half that matters at a workshop:
// the pictures are on the phone, and the sentence that gives them their meaning is not.
//
// So the last wall this device actually saw is kept here, on the device, in its own storage.
// It is never sent anywhere, and it is only ever read when the record cannot be reached. When
// that happens the page says which day it is showing, because a copy that pretends to be the
// live record is worse than no copy at all.
const KEPT_WALL = 'cartoon-wall-kept-v1';

function readKeptWall() {
  try {
    const raw = localStorage.getItem(KEPT_WALL);
    if (!raw) return null;
    const kept = JSON.parse(raw);
    return Array.isArray(kept?.cartoons) && kept.cartoons.length ? kept : null;
  } catch {
    return null;
  }
}

export default function useCartoonWall(watch = false) {
  const client = useQueryClient();
  const wall = useInfiniteQuery({
    queryKey: ['cartoon-wall', 'restored-originals-v4'],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const page = await base44.entities.ClimateCartoon.filter(
        { status: 'published' },
        { sort: '-created_date', limit: 16, ...(pageParam ? { cursor: pageParam } : {}) },
      );
      return { ...page, items: page.items.map((cartoon) => ({ ...cartoon, display_image_url: cartoonImageSource(cartoon) })) };
    },
    staleTime: 30 * 60 * 1000,
    getNextPageParam: (page) => page.has_more ? page.next_cursor : undefined,
  });
  useEffect(() => {
    if (!watch) return;
    return base44.entities.ClimateCartoon.subscribe(() => client.invalidateQueries({ queryKey: ['cartoon-wall'] }));
  }, [client, watch]);
  const kept = useMemo(readKeptWall, []);
  useEffect(() => {
    if (!wall.data?.pages?.length) return;
    try {
      const cartoons = orderWall(wall.data.pages.flatMap((page) => page.items || []));
      if (cartoons.length) localStorage.setItem(KEPT_WALL, JSON.stringify({ day: new Date().toISOString(), cartoons }));
    } catch {
      // A full disk or a private window: the wall simply does not keep a copy, and nothing breaks.
    }
  }, [wall.data]);
  // Hung in the room's own order, not in the order rows were typed in.
  const keptDay = wall.isError && kept ? kept.day : null;
  return {
    ...wall,
    keptDay,
    cartoons: keptDay ? kept.cartoons : orderWall(wall.data?.pages.flatMap((page) => page.items || []) || []),
  };
}