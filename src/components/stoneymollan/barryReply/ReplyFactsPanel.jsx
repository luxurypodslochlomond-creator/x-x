import React from 'react';
import { ExternalLink } from 'lucide-react';
import { HIS_PAPERS, RECORD_FACTS } from '@/components/stoneymollan/barryReply/replyFacts';

function FactList({ items }) {
  return (
    <ol className="mt-3 space-y-4">
      {items.map((f) => (
        <li key={f.label} className="border-l-2 border-record-ink/30 pl-3">
          <p className="font-mono text-[10.5px] font-black uppercase tracking-wide">{f.label}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
            {f.text}
          </p>
          {f.href ? (
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-2"
            >
              {f.src} <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-record-muted">{f.src}</p>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ReplyFactsPanel() {
  const summary = 'cursor-pointer font-mono text-[11px] font-black uppercase tracking-[0.18em] text-record-red';
  return (
    <>
      <details className="mt-8 border-2 border-record-ink bg-record-bone/40 p-4">
        <summary className={summary}>What Barry's own papers say</summary>
        <FactList items={HIS_PAPERS} />
      </details>
      <details className="mt-3 border-2 border-record-ink bg-record-bone/40 p-4">
        <summary className={summary}>The public record, and where each line came from</summary>
        <FactList items={RECORD_FACTS} />
      </details>
    </>
  );
}