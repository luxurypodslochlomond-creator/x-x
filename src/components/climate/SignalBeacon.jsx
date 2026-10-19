// Beadie Signal beacon — concentric transmission arcs in signal red.
// Replaces flags and dots for both countries and self-identified nations.
// One marker, universal, on-brand: "someone here is transmitting."
export default function SignalBeacon({ size = 22, color = "#b3261e" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* Center dot */}
      <circle cx="14" cy="14" r="2.5" fill={color} />
      {/* Inner pulse */}
      <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="1.5" fill="none">
        <animate attributeName="r" values="3;9;3" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {/* Outer pulse (offset) */}
      <circle cx="14" cy="14" r="9" stroke={color} strokeWidth="1.5" fill="none">
        <animate attributeName="r" values="5;12;5" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
      </circle>
    </svg>
  );
}