import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function RecordFooterGroup({ group }) {
  const { pathname } = useLocation();
  return (
    <details name="record-footer" className="border-b border-record-ink/20">
      <summary className="cursor-pointer min-h-16 py-4 text-record-ink marker:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-4">
        <span className="text-[17px] font-semibold leading-snug">{group.label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-record-muted">{group.note}</span>
      </summary>
      <ul className="pb-3 pl-4">
        {group.links.map((item) => (
          <li key={item.to}>
            <Link to={item.to} aria-current={pathname === item.to ? 'page' : undefined}
              className="flex min-h-11 items-center py-2 text-[15px] leading-snug underline decoration-record-ink/25 underline-offset-4 hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}