import React, { useId } from 'react';
import Photo51Mark from '@/components/climate/Photo51Mark';

export default function RecordEndpaperField() {
  const pattern = `si51-${useId().replace(/:/g, '')}`;
  return (
    <svg aria-hidden="true" className="record-endpaper-field" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pattern} width="216" height="148" patternUnits="userSpaceOnUse">
          <text x="18" y="44" fill="currentColor" className="record-endpaper-code">Si51</text>
          <g transform="translate(124 -4)"><Photo51Mark size={90} /></g>
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M-10 98C8 76 26 76 44 98S80 120 98 98 134 76 152 98 188 120 206 98L226 74" />
            <path d="M-10 98C8 120 26 120 44 98S80 76 98 98 134 120 152 98 188 76 206 98L226 122" />
            <path d="M8 82v32m18-33v34m18-17h0m18-17v34m18-33v32m36-32v32m18-33v34m18-17h0m18-17v34m18-33v32" strokeOpacity=".6" />
            <path d="M48 55v10h34l20 16m66-8v10m-20 44v9h68M0 136h44" strokeOpacity=".55" />
          </g>
          <g fill="currentColor">
            <circle cx="48" cy="55" r="1.7" /><circle cx="168" cy="83" r="1.7" /><circle cx="44" cy="136" r="1.7" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pattern})`} />
    </svg>
  );
}