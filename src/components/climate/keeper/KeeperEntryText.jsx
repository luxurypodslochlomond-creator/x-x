import React from 'react';

export default function KeeperEntryText({ text }) {
  if (!text) return null;
  if (text.length <= 240) return <p className="room-entry-text">{text}</p>;
  return (
    <details className="room-entry-text group">
      <summary className="cursor-pointer list-none">
        <span className="block line-clamp-3 group-open:hidden">{text}</span>
        <span className="room-text-link mt-1 inline-block group-open:hidden">Read full entry</span>
        <span className="room-text-link hidden group-open:inline-block">Close full entry</span>
      </summary>
      <p className="mt-2 whitespace-pre-line">{text}</p>
    </details>
  );
}