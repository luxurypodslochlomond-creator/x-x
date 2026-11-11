import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ShareStoneymollan from './ShareStoneymollan';

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

// The direct booking engine on their own site. Never a platform: a booking taken here
// is a booking that reaches Brian and Gillian, which is the whole point of the block.
const BOOK_DIRECT = 'https://hotels.cloudbeds.com/reservation/CD3LLY';

/**
 * The stay — what is actually up here, said in short lines instead of a paragraph, and
 * one way to book that pays nobody in the middle. The guest line is Ben's own review,
 * quoted and signed, with no platform linked from it: the words are his, the booking
 * stays ours.
 */
export default function StayHere({ shareImage, shareCredit }) {
  return (
    <section className="border-t border-record-ink/25 bg-record-paper">
      <div className="mx-auto w-full max-w-[44rem] px-6 py-10">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-record-muted">
          Over Loch Lomond &middot; Brian &amp; Gillian
        </p>

        <h2
          className="mx-auto mt-3 max-w-[20ch] text-center text-[27px] leading-[1.1] tracking-tight"
          style={SERIF}
        >
          Two cabins, up on the hill this road runs over.
        </h2>

        <div
          className="mx-auto mt-5 max-w-[22ch] space-y-1 text-center text-[20px] leading-[1.3]"
          style={SERIF}
        >
          <p>Wood-fired hot tub.</p>
          <p>Wood-fired sauna.</p>
          <p>Cold water plunge.</p>
          <p className="text-record-signal">A view that turns all the way round.</p>
        </div>

        <p className="mx-auto mt-5 max-w-[42ch] text-center text-[16.5px] leading-[1.68]" style={READING}>
          Mist in the morning, stars at night, and nothing at all between you and the hill. The
          John Muir Way and the Three Lochs Way start at the end of our tree-lined drive.
        </p>

        <p className="mx-auto mt-5 max-w-[40ch] text-center font-mono text-[9.5px] uppercase leading-[2] tracking-[0.16em] text-record-muted">
          2 hillside cabins
          <span className="px-1.5 text-record-ink/25">/</span>
          hot tub
          <span className="px-1.5 text-record-ink/25">/</span>
          sauna
          <span className="px-1.5 text-record-ink/25">/</span>
          cold plunge
          <span className="px-1.5 text-record-ink/25">/</span>
          360&deg; views
          <span className="px-1.5 text-record-ink/25">/</span>
          stargazing
        </p>

        <div className="mx-auto mt-5 max-w-[34ch] border-y border-record-ink/20 py-4">
          <p className="text-center text-[17px] italic leading-[1.5]" style={READING}>
            &ldquo;This place is unreal. It is almost beyond words how special it is.&rdquo;
          </p>
          <p className="mt-2 text-center font-mono text-[9.5px] uppercase tracking-[0.16em] text-record-muted">
            Ben, Ibiza &middot; July 2024 &middot; 10/10
          </p>
        </div>

        <p className="mx-auto mt-5 max-w-[40ch] text-center text-[15px] leading-relaxed text-record-muted" style={READING}>
          Glasgow airport, 25 minutes. Edinburgh, an hour and a quarter. Say the word and one of
          us will meet you in the Defender.
        </p>

        <div className="mx-auto mt-6 w-full max-w-[20rem]">
          <a
            href={BOOK_DIRECT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 border-2 border-record-signal bg-record-signal px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-record-paper transition-colors active:bg-record-ink"
          >
            Check dates &middot; book direct
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-2 text-center font-mono text-[9.5px] uppercase leading-[1.9] tracking-[0.14em] text-record-muted">
            Straight to us, not a platform. What they take stays on the hill.
          </p>
        </div>

        <div className="mx-auto mt-5 flex flex-col items-center gap-1.5">
          <a
            href="https://www.overlochlomond.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-record-ink underline decoration-record-ink/25 underline-offset-4 hover:decoration-record-ink"
          >
            overlochlomond.com
          </a>
          <a
            href="mailto:10-5@overlochlomond.com"
            className="font-mono text-[11px] tracking-[0.06em] text-record-muted underline decoration-record-ink/20 underline-offset-4 hover:decoration-record-ink"
          >
            10-5@overlochlomond.com
          </a>
        </div>

        <ShareStoneymollan imageUrl={shareImage} imageCredit={shareCredit} />
      </div>
    </section>
  );
}