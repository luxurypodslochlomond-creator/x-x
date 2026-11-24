import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '@/components/fergus/fergus-room.css';
export default function FergusPageFrame({ embedded = false, section, children }) {
  return <div className={`fergus-document${embedded ? ' is-embedded' : ''}`}>
    {!embedded && <nav className="fergus-public-nav" aria-label="Fergus"><Link to="/FergusRoom"><ArrowLeft size={18} /> Fergus’s room</Link><span>{section}</span></nav>}
    {children}
  </div>;
}