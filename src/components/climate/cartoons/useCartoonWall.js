import { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import { orderWall } from '@/components/climate/cartoons/wallOrder';

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
  // Hung in the room's own order, not in the order rows were typed in.
  return { ...wall, cartoons: orderWall(wall.data?.pages.flatMap((page) => page.items || []) || []) };
}