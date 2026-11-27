import React from 'react';

export default function FilingStep({ step, done, onToggle }) {
  const { n, title, body, links } = step;
  const id = `filing-step-${n}`;

  return (
    <li className="border-t border-[#1a1612]/15">
      <div className="flex items-start gap-3 py-4">
        <input
          id={id}
          type="checkbox"
          checked={done}
          onChange={onToggle}
          className="mt-1 h-5 w-5 shrink-0 accent-[#1e3a2b]"
        />
        <div className="min-w-0 flex-1">
          <label htmlFor={id} className="flex cursor-pointer items-baseline gap-2">
            <span className="font-mono text-xs font-bold text-[#b3261e]">{n}</span>
            <span className={`text-[17px] font-bold leading-snug ${done ? 'text-[#6b6258] line-through' : 'text-[#1a1612]'}`}>
              {title}
            </span>
          </label>
          <div className="mt-1.5 text-[15px] leading-relaxed text-[#3d362e]">{body}</div>
          {links?.length ? (
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-bold text-[#1a1612] underline decoration-[#b3261e] underline-offset-4"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}