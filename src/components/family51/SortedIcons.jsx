import React from 'react';

// ─── BRAND MARKS ────────────────────────────────────────────────
export function SortedMark({ size = 28, accentColor = '#f5a623', dark = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke={dark ? '#1a1208' : '#f97316'} strokeWidth="1.8" fill={dark ? 'rgba(26,18,8,0.06)' : 'rgba(249,115,22,0.08)'} />
      <path d="M11 11V8a4 4 0 018 0v3" stroke={dark ? '#1a1208' : '#f97316'} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke={accentColor} strokeWidth="1.4" fill={`${accentColor}40`} />
      <circle cx="15" cy="19" r="0.8" fill={accentColor} />
    </svg>
  );
}

export function F51Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.06)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.25)" />
      <circle cx="15" cy="19" r="0.8" fill="#f97316" />
    </svg>
  );
}

// ─── TOOL ICONS ──────────────────────────────────────────────────
export function DecodeIcon({ color = '#f5a623', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2.5" stroke={color} strokeWidth="1.8"/>
      <path d="M8 7h8M8 11h8M8 15h5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function ReplyToolIcon({ color = '#2563eb', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function ConflictToolIcon({ color = '#059669', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ScamToolIcon({ color = '#ef4444', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ContractToolIcon({ color = '#7c3aed', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 15h6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── SMALL UI ICONS ──────────────────────────────────────────────
export function BoltIcon({ color = '#f5a623', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M8.5 1.5L3 7.5h4L4.5 12.5L11 6H7L8.5 1.5Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill={`${color}30`} />
    </svg>
  );
}

export function TargetIcon({ color = '#f5a623', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.2" />
      <circle cx="7" cy="7" r="3" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="7" cy="7" r="1" fill={color} />
    </svg>
  );
}

export function PinIcon({ color = '#f5a623', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="4" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="7" cy="5" r="1.6" fill={color} />
      <path d="M7 9v3.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function LockIcon({ color = '#f5a623', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6.5" width="9" height="6" rx="1.2" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
      <path d="M4.5 6.5V4.5a2.5 2.5 0 015 0v2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="1" fill={color} />
    </svg>
  );
}

export function MailIcon({ color = '#f5a623', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1.2" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
      <path d="M2 3.5L7 7.5L12 3.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon({ color = '#f5a623', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

export function ArrowRight({ color = 'rgba(26,18,8,0.35)', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ArrowLeft({ color = 'rgba(26,18,8,0.5)', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CasesIcon({ color = '#f5a623', size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <rect x="2" y="4" width="11" height="9" rx="1.2" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M5 4V3a2.5 2.5 0 015 0v1" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M4.5 8h6M4.5 10.5h4" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// ─── PROBLEM SECTION ICONS ──────────────────────────────────────
export function CouncilIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="1" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <rect x="6" y="10" width="3" height="4" fill="#f97316" opacity="0.6" />
      <rect x="10.5" y="9" width="3" height="5" fill="#f97316" opacity="0.6" />
      <rect x="15" y="10" width="3" height="4" fill="#f97316" opacity="0.6" />
      <path d="M8 6L8 4M12 6L12 4M16 6L16 4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function EmployerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="11" rx="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="6.5" r="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="6.5" r="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="6.5" r="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M7 13v2M12 13v2M17 13v2" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function LandlordIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h16M7 20V9M17 20V9M10 20V11M14 20V11M12 5L5 9H19L12 5Z" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="1.5" fill="#f97316" opacity="0.6" />
    </svg>
  );
}

export function CourtIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 4v4M12 4v4M18 4v4M4 9h16M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M9 13h6" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 17l2 2 4-4" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}