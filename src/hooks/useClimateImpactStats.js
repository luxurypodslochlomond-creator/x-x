import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// One shared read of the record's reach — the strip on the record and the impact
// page both ask this hook, so the server is asked once and tapping through is
// instant. It refreshes in the background; it never blocks a page from painting.
export function useClimateImpactStats() {
  return useQuery({
    queryKey: ['climateImpactStats'],
    queryFn: async () => {
      const res = await base44.functions.invoke('climateImpactStats', {});
      return res?.data || res;
    },
    // The strip used to poll every minute, and every answer re-rendered the whole impact
    // page underneath it — a page holding a map. The number is a count of reads, not a
    // live score, so five minutes is honest and the page stops twitching while you read it.
    staleTime: 60000,
    refetchInterval: 300000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}