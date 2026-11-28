import { useInfiniteQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';

export default function useGoalDrawings(goal, enabled) {
  const readings = goal.drawings.map(({ title }) => title);
  const query = useInfiniteQuery({
    queryKey: ['cartoon-wall', 'goal', goal.n, readings],
    enabled,
    initialPageParam: null,
    queryFn: ({ pageParam }) => base44.entities.ClimateCartoon.filter(
      { status: 'published', $or: [{ title: { $in: readings } }, { goal: goal.n }] },
      { sort: '-created_date', limit: 12, ...(pageParam ? { cursor: pageParam } : {}) },
    ),
    getNextPageParam: (page) => page.has_more ? page.next_cursor : undefined,
    staleTime: 5 * 60 * 1000,
  });
  return {
    ...query,
    drawings: (query.data?.pages.flatMap((page) => page.items) || []).map((piece) => ({
      ...piece, display_image_url: cartoonImageSource(piece),
    })),
  };
}