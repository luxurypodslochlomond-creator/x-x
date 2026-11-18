import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// ── THE RECORD ANSWERING, RATHER THAN LISTING ────────────────────────────────────
// The index could already show which entries matched. That is a listing, and a listing
// makes a reader do the reading. This asks the record to say what it holds in a sentence
// or two, names where each part came from, and says plainly what it does not cover.
//
// It reads ONLY the record. The server refuses to add a fact the record does not hold,
// so an empty answer is a true answer here and not a failure.
export default function useBaseOneAnswer(question) {
  const q = String(question || '').trim();
  const { data, isFetching, isError } = useQuery({
    queryKey: ['base-1-answer', q],
    enabled: q.length >= 2,
    queryFn: async () => {
      const response = await base44.functions.invoke('aletheiaQuery', { question: q });
      if (response?.data?.error) throw new Error(response.data.error);
      return response.data;
    },
    staleTime: 60000,
    retry: false,
  });

  const active = q.length >= 2;
  return {
    answer: active ? data?.result || null : null,
    loading: active && isFetching && !isError,
    // A silent gap in the answer reads as "the record holds nothing", which is a different
    // and untrue statement. So the failure is handed back to be said out loud.
    failed: active && isError,
  };
}