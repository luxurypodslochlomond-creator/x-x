import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';

export default function CartoonWall() {
  const client = useQueryClient();
  const wall = useInfiniteQuery({
    queryKey: ['cartoon-wall'],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => base44.entities.ClimateCartoon.filter({ status: 'published' }, { sort: '-created_date', limit: 12, ...(pageParam ? { cursor: pageParam } : {}) }),
    getNextPageParam: (page) => page.has_more ? page.next_cursor : undefined,
  });
  useEffect(() => base44.entities.ClimateCartoon.subscribe(() => client.invalidateQueries({ queryKey: ['cartoon-wall'] })), [client]);
  const cartoons = wall.data?.pages.flatMap((page) => page.items || []) || [];
  return (
    <section className="comic-wall" aria-labelledby="cartoon-wall-title">
      <h2 id="cartoon-wall-title" className="comic-section-title">The people’s pages.</h2>
      <p className="record-meta comic-workshop-note">The artist’s name stays. A custodian looks before it goes up.</p>
      {wall.isPending && <p className="record-meta flex items-center gap-2 py-6" role="status"><Loader2 size={18} className="animate-spin" />Opening the wall…</p>}
      {wall.isError && <div className="comic-wall-empty"><p className="record-meta">The wall could not be opened.</p><button type="button" onClick={() => wall.refetch()} className="underline">Try again</button></div>}
      {!wall.isPending && !wall.isError && !cartoons.length && <div className="comic-wall-empty"><span aria-hidden="true">…</span><p className="record-meta">A space for the first human drawing.<br />No pretend contributors. This bit is yours.</p></div>}
      {!!cartoons.length && <div className="mt-5 grid gap-6 lg:grid-cols-2">{cartoons.map((cartoon) => <CartoonPlate key={cartoon.id} cartoon={cartoon} />)}</div>}
      {wall.hasNextPage && <button type="button" className="comic-load-more" disabled={wall.isFetchingNextPage} onClick={() => wall.fetchNextPage()}>{wall.isFetchingNextPage ? 'Opening more…' : 'More from the wall'}</button>}
      <CartoonsWaiting />
    </section>
  );
}