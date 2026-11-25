import { QueryClient } from '@tanstack/react-query';


// ── A PAGE YOU JUST LEFT IS NOT A PAGE YOU HAVE TO FETCH AGAIN ──────────────────
// Brian, 25 November: "it's really slow from one page to another just now, don't think it's
// my device." He was right, and this was the reason. Every query defaulted to staleTime 0,
// which tells React Query that everything on screen is out of date the instant it arrives —
// so going Record → Wire → an entry → back to Record fetched the same entries four times
// over, and the wait on each page was the network, not the phone.
//
// A minute of freshness is the honest number for a record of published entries: an entry a
// keeper publishes appears on the next page load within the minute, the cartoon wall keeps
// its own live subscription so a drawing arriving during the workshop still appears at once,
// and nothing a reader can see is ever a minute out of date in a way that matters. This does
// not cache anything on the device between visits — it only stops one visit re-buying what
// the last screen already paid for.
export const queryClientInstance = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 60_000,
			gcTime: 5 * 60_000,
		},
	},
});