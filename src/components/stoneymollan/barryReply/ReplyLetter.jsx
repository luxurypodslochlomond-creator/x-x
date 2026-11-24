import React from 'react';

function blocks(text) {
  return text.split('\n\n').map((raw) => {
    const t = raw.trim();
    if (/^\d{1,2}\.\s[A-Z]/.test(t) && !t.includes('\n') && t.length < 90) return { kind: 'head', text: t };
    if (t.startsWith('- ')) return { kind: 'list', items: t.split('\n').map((l) => l.replace(/^-\s/, '')) };
    return { kind: 'para', text: t };
  });
}

export default function ReplyLetter({ text }) {
  return (
    <article className="mt-6 border-t-2 border-record-ink pt-5">
      {blocks(text).map((b, i) => {
        if (b.kind === 'head') {
          return (
            <h2 key={i} className="mt-6 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-record-red">
              {b.text}
            </h2>
          );
        }
        if (b.kind === 'list') {
          return (
            <ul key={i} className="mt-2 space-y-1.5 pl-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
                  <span className="text-record-muted">–</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-3 whitespace-pre-line text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            {b.text}
          </p>
        );
      })}
    </article>
  );
}