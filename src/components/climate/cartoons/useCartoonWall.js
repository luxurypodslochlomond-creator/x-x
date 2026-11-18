import { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function useCartoonWall() {
  const client = useQueryClient();
  const wall = useInfiniteQuery({
    queryKey: ['cartoon-wall', 'original-bytes-v3'],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const result = await base44.functions.invoke('climateCartoon', { action: 'wall', cursor: pageParam });
      return result.data;
    },
    staleTime: 30 * 60 * 1000,
    getNextPageParam: (page) => page.has_more ? page.next_cursor : undefined,
  });
  useEffect(() => base44.entities.ClimateCartoon.subscribe(() => {
    client.invalidateQueries({ queryKey: ['cartoon-wall'] });
  }), [client]);
  return { ...wall, cartoons: wall.data?.pages.flatMap((page) => page.items || []) || [] };
}