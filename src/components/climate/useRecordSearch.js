import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

// The address owns the submitted search. Draft typing stays inside the input.
// Back/forward therefore restores both the words and their matching results.
export default function useRecordSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  // ── THE SEARCH ASKS IN THE TONGUE THE RECORD IS BEING READ IN ────────────────────
  // It used to send whatever language the phone happened to be set to, so a reader who
  // had chosen Thai — or Yorùbá, or Cherokee — on the record could still have the record's
  // one translation attempt made in the phone's language instead of theirs. The picker's
  // choice now travels with the question: one tongue for the page and for the search, so
  // the two controls are one setting and not two that disagree.
  const { chosen } = useSiteLanguage();
  const lang = chosen || 'en';
  const search = useQuery({
    queryKey: ['climate-record-search', query.trim(), lang],
    enabled: query.trim().length >= 2,
    queryFn: async () => {
      const response = await base44.functions.invoke('climateSearch', { q: query.trim(), lang });
      return response.data;
    },
    staleTime: 60000,
    retry: false,
  });
  const { refetch } = search;
  const start = useCallback((text) => {
    const q = String(text || '').trim();
    if (q.length < 2) return;
    if (q === query.trim()) { refetch(); return; }
    navigate(`/ClimateSearch?q=${encodeURIComponent(q)}`);
  }, [navigate, query, refetch]);
  const back = useCallback(() => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(query ? '/ClimateSearch' : '/TogetherChangeClimate', { replace: true });
  }, [navigate, query]);
  const active = query.trim().length >= 2;
  return {
    query, start, back,
    data: active ? search.data : null,
    loading: active && search.isFetching,
    error: active && search.isError ? 'The record could not be searched just now. Please try again.' : null,
  };
}