import React from 'react';

// The little spinner between pages. It used to pull in the whole animation
// library, and because it sits at the very top of the app it made every page
// wait on that library before anything could appear. Same look, same timing,
// plain CSS — nothing else changes.
export default function SortedPageTransition({ isTransitioning }) {
  if (!isTransitioning) return null;

  return (
    <div
      className="uf51-page-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div className="uf51-page-spinner" />
    </div>
  );
}