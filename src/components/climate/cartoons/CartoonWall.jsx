import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';

export default function CartoonWall() {
  const client = useQueryClient();
  const wall = useInfiniteQuery({
    queryKey: ['cartoon-wall', 'artwork-v2'],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const response = await base44.functions.invoke('climateCartoon', { action: 'wall', ...(pageParam ? { cursor: pageParam } : {}) });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (page) => page.has_more ? page.next_cursor : undefined,
  });
  useEffect(() => base44.entities.ClimateCartoon.subscribe(() => client.invalidateQueries({ queryKey: ['cartoon-wall'] })), [client]);
  const cartoons = wall.data?.pages.flatMap((page) => page.items || []) || [];
  const [lead, ...rest] = cartoons;
  return (
    <section className="comic-wall" aria-labelledby="cartoon-wall-title">
      {/* The heading is small on purpose. On a picture page the pictures are the headline;
          a section title that competes with them turns a wall back into a list. */}
      <h2 id="cartoon-wall-title" className="comic-section-title">The people’s pages.</h2>
      {wall.isPending && <p className="record-meta flex items-center gap-2 py-6" role="status"><Loader2 size={18} className="animate-spin" />Opening the wall…</p>}
      {wall.isError && <div className="comic-wall-empty"><p className="record-meta">The wall could not be opened.</p><button type="button" onClick={() => wall.refetch()} className="underline">Try again</button></div>}
      {!wall.isPending && !wall.isError && !cartoons.length && <div className="comic-wall-empty"><span aria-hidden="true">…</span><p className="record-meta">A space for the first human drawing.<br />No pretend contributors. This bit is yours.</p></div>}
      {/* ── ONE HUNG LARGE, THE REST AS THE WALL ─────────────────────────────────
          Thirteen drawings at the same size is a catalogue; a gallery hangs one big and lets
          the eye start there. The newest drawing goes full width, edge to edge, with its
          name set larger — so the first thing a thumb meets on a phone is a drawing at the
          width of the phone, not a caption. */}
      {lead && <div className="comic-wall-lead"><CartoonPlate cartoon={lead} lead index={1} /></div>}
      {!!rest.length && <div className="comic-wall-grid mt-6 grid gap-6 lg:grid-cols-2">{rest.map((cartoon, i) => <CartoonPlate key={cartoon.id} cartoon={cartoon} index={i + 2} />)}</div>}
      <p className="record-meta comic-workshop-note">The artist’s name stays, and so does their own line. A person looks before a drawing goes up.</p>
      {wall.hasNextPage && <button type="button" className="comic-load-more" disabled={wall.isFetchingNextPage} onClick={() => wall.fetchNextPage()}>{wall.isFetchingNextPage ? 'Opening more…' : 'More from the wall'}</button>}
      <CartoonsWaiting />
    </section>
  );
}