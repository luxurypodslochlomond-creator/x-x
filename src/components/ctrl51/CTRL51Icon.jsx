export default function CTRL51Icon({ size = 40, animate = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animate ? 'animate-pulse' : ''}
    >
      {/* Outer shield shape */}
      <path
        d="M20 2 L28 6 L28 16 C28 24 20 32 20 32 C20 32 12 24 12 16 L12 6 L20 2 Z"
        stroke="#06b6d4"
        strokeWidth="1.2"
        fill="none"
      />
      
      {/* Circuit nodes */}
      <circle cx="20" cy="12" r="2" fill="#06b6d4" />
      <circle cx="15" cy="17" r="1.5" fill="#06b6d4" opacity="0.6" />
      <circle cx="25" cy="17" r="1.5" fill="#06b6d4" opacity="0.6" />
      <circle cx="20" cy="25" r="1.5" fill="#06b6d4" opacity="0.6" />
      
      {/* Circuit connections */}
      <line x1="20" y1="14" x2="20" y2="17" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
      <line x1="18" y1="12" x2="15" y2="17" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="12" x2="25" y2="17" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="18" x2="20" y2="23" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
      <line x1="25" y1="18" x2="20" y2="23" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
      
      {/* Heartbeat line through center */}
      <polyline
        points="8,20 10,20 12,16 14,24 16,20 20,20 22,18 24,22 26,20 28,20 32,20"
        stroke="#ec4899"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}