import React from 'react';

// The same printed language as the masthead: solid ink, one meaningful red part.
// Solutions join a gap; crises show a break; actions put a tool to work;
// groups are separate participants meeting on one shared line. Not subject icons.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'currentColor',
  stroke: 'none',
};

export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 9h12v7h-5v15H4zM24 9h12v22h-7V16h-5z" />
      <rect x="14" y="9" width="12" height="7" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 5h12l-4 13 5 7-3 10H4zM24 5h12v30H22l4-11-5-7z" />
      <path d="m18 8 7 4-5 11-7-4z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="11" width="8" height="15" />
      <rect x="16" y="5" width="8" height="21" />
      <rect x="28" y="11" width="8" height="15" />
      <rect x="4" y="29" width="32" height="6" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M10 4h20v11h-7v7h-6v-7h-7zm6 4v3h8V8z" fillRule="evenodd" />
      <path d="M12 22h16v6c0 5-4 8-8 8s-8-3-8-8z" className="text-record-mark" />
    </svg>
  );
}