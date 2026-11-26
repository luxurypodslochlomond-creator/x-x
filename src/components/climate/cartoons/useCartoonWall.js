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
    // Keep the whole wall, not just the sheet that happened to be on screen. A phone carried
    // into a room with no signal should hold every drawing the record has published, not the
    // first sixteen — so once a day it asks for all of them, and then warms each picture so
    // the wall is not a set of titles with holes where the drawings were.
    const keptAt = kept?.day ? new Date(kept.day).getTime() : 0;
    if (Date.now() - keptAt < 6 * 60 * 60 * 1000) return;
    let alive = true;
    (async () => {
      try {
        const all = [];
        let cursor = null;
        do {
          const page = await base44.entities.ClimateCartoon.filter(
            { status: 'published' },
            { sort: '-created_date', limit: 100, ...(cursor ? { cursor } : {}) },
          );
          all.push(...(page.items || []).map((cartoon) => ({ ...cartoon, display_image_url: cartoonImageSource(cartoon) })));
          cursor = page.has_more ? page.next_cursor : null;
        } while (cursor && alive);
        if (!alive || !all.length) return;
        const cartoons = orderWall(all);
        localStorage.setItem(KEPT_WALL, JSON.stringify({ day: new Date().toISOString(), cartoons }));
        cartoons.forEach((cartoon) => {
          if (!cartoon.display_image_url) return;
          const picture = new Image();
          picture.src = cartoon.display_image_url;
        });
      } catch {
        // A full disk, a private window, or a picture that will not load: the wall keeps what it had.
      }
    })();
    return () => { alive = false; };
  }, [wall.data, kept]);
  // Hung in the room's own order, not in the order rows were typed in.
  const keptDay = wall.isError && kept ? kept.day : null;
  return {
    ...wall,
    keptDay,
    cartoons: keptDay ? kept.cartoons : orderWall(wall.data?.pages.flatMap((page) => page.items || []) || []),
  };
}