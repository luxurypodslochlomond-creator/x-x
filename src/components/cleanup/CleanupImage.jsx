import React, { useState } from 'react';

/**
 * Shared image component with graceful SVG fallback.
 * Used by NewCleanup + CleanupFeed for consistent broken-image handling.
 */
export default function CleanupImage({ src, alt, className, fallbackClassName }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`${className} ${fallbackClassName || 'bg-gradient-to-br from-green-900/40 to-cyan-900/40'} flex items-center justify-center`}>
        <svg className="w-12 h-12 text-green-500/40" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}