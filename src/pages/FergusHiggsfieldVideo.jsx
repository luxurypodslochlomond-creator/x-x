import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Film, ExternalLink } from 'lucide-react';
import { WHY_THIS_SHAPE, THE_FACE_THING, SHOTS, COOL_NOT_DICK, FILMING, FREE_KIT, LINKING } from '@/components/fergus/videoScript';

const Label = ({ children }) => (
  <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-record-muted">{children}</p>
);

export default function FergusHiggsfieldVideo() {
  return (
    <div className="min-h-screen bg-record-paper text-record-ink">
      <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
        <Link
          to="/FergusHiggsfield"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> The note to Higgsfield
        </Link>

        <h1 className="mt-3 text-[26px] leading-tight">The 60 seconds</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-record-ink/75">
          Shot by shot, with the words to say. Under a hundred words spoken in total.
        </p>

        <p className="mt-4 border-l-2 border-record-ink/30 pl-3 text-[13.5px] leading-relaxed text-record-ink/80">
          {WHY_THIS_SHAPE}
        </p>

        <section className="mt-6 border-2 border-record-ink bg-record-bone/50 p-4">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            About his face on camera
          </h2>
          <ul className="mt-2 space-y-2 text-[13.5px] leading-relaxed text-record-ink/85">
            {THE_FACE_THING.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className="mt-7 border-t-2 border-record-ink pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            The film
          </h2>
          <ol className="mt-4 space-y-5">
            {SHOTS.map((s) => (
              <li key={s.at} className="border-l-2 border-record-ink/30 pl-3">
                <Label>{s.at}</Label>
                <p className="mt-1 text-[13px] leading-relaxed text-record-ink/70">{s.on}</p>
                <p className="mt-2 text-[15px] leading-snug">“{s.say}”</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-record-muted">{s.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 border-t-2 border-record-ink pt-5">
          <h2 className="flex items-center gap-2 font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            <Film className="h-4 w-4" /> Cool, not a dick
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-record-ink/75">
            The same six rules, written as the thing to say instead of the thing that gives it away.
          </p>
          <dl className="mt-4 space-y-4">
            {COOL_NOT_DICK.map((r) => (
              <div key={r.do} className="border-l-2 border-record-ink/30 pl-3">
                <dt className="text-[14.5px] leading-snug">{r.do}</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-record-ink/60 line-through decoration-record-red/50">
                  {r.not}
                </dd>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-record-muted">{r.why}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Filming it on a phone
          </h2>
          <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-record-ink/85">
            {FILMING.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className="mt-6 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Free kit, nothing to buy
          </h2>
          <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-record-ink/85">
            {FREE_KIT.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className="mt-6 border-2 border-record-ink bg-record-bone/50 p-4">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em]">
            Sending the link
          </h2>
          <ul className="mt-2 space-y-2 text-[13.5px] leading-relaxed text-record-ink/85">
            {LINKING.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </section>

        <a
          href="https://higgsfield.ai/creator-partnership-program"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-[46px] items-center justify-center gap-2 border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
        >
          Open the application form <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}