import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Keep desktop's open spread; on smaller screens the context opens on request.
export default function PressRoomNote({ label, className = '', children }) {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const change = () => setCompact(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  if (!compact) return <>{children}</>;
  return (
    <details className={`press-room-note ${className}`}>
      <summary><span>{label}</span><ChevronDown size={18} aria-hidden="true" /></summary>
      <div className="press-room-note-body">{children}</div>
    </details>
  );
}