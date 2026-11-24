import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
const FIELDS = ['headline', 'what_changed', 'replicable', 'source_name', 'source_author', 'where_label', 'country', 'category', 'publisher_type', 'when_label', 'image_credit', 'corroborating_source', 'editor'];
export default function useSignalPage({ query, kind, verification }) {
  const [search, setSearch] = useState(query);
  useEffect(() => { const timer = setTimeout(() => setSearch(query), 250); return () => clearTimeout(timer); }, [query]);
  const words = search.trim().split(/\s+/).filter(word => word.length > 1).map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const result = useInfiniteQuery({
    queryKey: ['wire-signals', search, kind, verification],
    initialPageParam: null,
    queryFn: ({ pageParam }) => base44.entities.ClimateNews.filter({
      status: 'published',
      ...(kind !== 'all' ? { kind } : {}),
      ...(verification !== 'all' ? { verification } : {}),
      ...(words.length ? { $and: words.map(word => ({ $or: FIELDS.map(field => ({ [field]: { $regex: word, $options: 'i' } })) })) } : {}),
    }, { sort: '-when_date', limit: 12, ...(pageParam ? { cursor: pageParam } : {}) }),
    getNextPageParam: page => page.has_more ? page.next_cursor : undefined,
    throwOnError: true,
  });
  return { ...result, entries: result.data?.pages.flatMap(page => page.items || []) || [], searching: search !== query };
}