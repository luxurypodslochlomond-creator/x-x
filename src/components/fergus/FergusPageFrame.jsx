import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import useFergusRoom from '@/components/fergus/useFergusRoom';
import FergusGate from '@/components/fergus/FergusGate';
import '@/components/fergus/fergus-room.css';

// Direct links must pass the same server-checked door as the room itself.
export default function FergusPageFrame({ embedded = false, section, children }) {
  const room = useFergusRoom();
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  if (!room.open) return <div className="fergus-room"><FergusGate {...room} /></div>;
  return <div className={`fergus-document${embedded ? ' is-embedded' : ''}`}>
    {!embedded && <nav className="fergus-public-nav" aria-label="Fergus"><Link to="/FergusRoom"><ArrowLeft size={18} /> My room</Link><span>{section}</span><button type="button" onClick={room.lock} className="inline-flex min-h-11 items-center gap-2 text-sm"><LockKeyhole size={17} /> Lock</button></nav>}
    {children}
  </div>;
}