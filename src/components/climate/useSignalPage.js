import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// ── THE WIRE, KEPT ON THE PHONE ───────────────────────────────────────────────
// The room's pages are already kept by the worker, but the Wire's entries are fetched, so
// with no signal the page opened and showed nothing — the one room where a reader most
// needs words. So the last plain Wire this device saw is kept here, on the device, and read
// only when the device says it has no connection. It never pretends to be live: the page
// says which day it kept.
const KEPT_WIRE = 'wire-kept-v1';

function readKeptWire() {
  try {
    const raw = localStorage.getItem(KEPT_WIRE);
    if (!raw) return null;
    const kept = JSON.parse(raw);
    return Array.isArray(kept?.entries) && kept.entries.length ? kept : null;
  } catch {
    return null;
  }
}

const FIELDS = ['headline', 'what_changed', 'replicable', 'source_name', 'source_author', 'where_label', 'country', 'category', 'publisher_type', 'when_label', 'image_credit', 'corroborating_source', 'editor'];
export default function useSignalPage({ query, kind, verification }) {
  const [search, setSearch] = useState(query);
  useEffect(() => { const timer = setTimeout(() => setSearch(query), 250); return () => clearTimeout(timer); }, [query]);
  const words = search.trim().split(/\s+/).filter(word => word.length > 1).map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const plain = !search.trim() && kind === 'all' && verification === 'all';
  const kept = useMemo(() => (plain ? readKeptWire() : null), [plain]);
  const readingKept = !!kept && typeof navigator !== 'undefined' && !navigator.onLine;
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
    // With no connection and a copy already kept, the phone does not knock on a door it
    // knows is shut: it reads its own copy and says so.
    enabled: !readingKept,
  });
  useEffect(() => {
    if (!plain || !result.data?.pages?.length) return;
    const entries = result.data.pages.flatMap(page => page.items || []);
    if (!entries.length) return;
    try {
      localStorage.setItem(KEPT_WIRE, JSON.stringify({ day: new Date().toISOString(), entries }));
    } catch {
      // A full disk or a private window: the Wire simply keeps nothing, and nothing breaks.
    }
  }, [result.data, plain]);
  return {
    ...result,
    keptDay: readingKept ? kept.day : null,
    entries: readingKept ? kept.entries : result.data?.pages.flatMap(page => page.items || []) || [],
    searching: search !== query,
  };
}