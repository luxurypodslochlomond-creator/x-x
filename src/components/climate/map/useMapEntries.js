import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';

const common = ['country', 'source_url', 'created_date'];
const verified = ['category', 'verification', 'corroborating_source'];
const sources = [
  ['ClimateSolution', ['title', 'summary', 'entry_type', 'region_rough', 'source_name']],
  ['ClimateAction', ['title', 'description', 'region_rough']],
  ['ClimateNews', ['headline', 'what_changed', 'where_label', 'source_name']],
  // The picture comes with the record: a plate of a wall of drawings that shows no drawing
  // is a chart of something nobody can see.
  ['ClimateCartoon', ['title', 'artist_name', 'for_line', 'origin', 'credit', 'image_url']],
];
const types = ['solution', 'action', 'wire', 'cartoon'];

// Cache the public map, so Back restores the instrument rather than rebuilding it.
export default function useMapEntries() {
  return useQuery({
    queryKey: ['record-map-entries'],
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      const query = { status: 'published' };
      const results = await Promise.all(sources.map(async ([entity, fields], i) => {
        const [page, total] = await Promise.all([
          base44.entities[entity].filter(query, { sort: '-created_date', limit: 200, fields: [...common, ...(i === 3 ? [] : verified), ...fields] }),
          base44.entities[entity].count(query),
        ]);
        return {
          total,
          entries: page.items.map((row) => {
            const type = i === 0 && row.entry_type === 'climate_crisis' ? 'crisis' : types[i];
            return {
              ...row,
              id: `${type}-${row.id}`, entryId: row.id, type,
              title: row.title || row.headline || row.artist_name,
              summary: row.summary || row.description || row.what_changed || row.for_line || '',
              region: row.region_rough || row.where_label || row.origin,
              source_name: row.artist_name ? `Drawn by ${row.artist_name}` : row.source_name,
              ...(type === 'cartoon' ? { display_image_url: cartoonImageSource(row) } : {}),
              arrived: row.created_date,
            };
          }),
        };
      }));
      return { entries: results.flatMap((result) => result.entries), publishedTotal: results.reduce((sum, result) => sum + result.total, 0) };
    },
  });
}