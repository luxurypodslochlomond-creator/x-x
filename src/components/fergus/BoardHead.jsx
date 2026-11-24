import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function BoardHead({ kicker, title, line, fullTo, fullLabel = 'The whole page' }) {
  return <header className="fergus-board-head">
    <div><span className="fergus-board-kicker">{kicker}</span><h1>{title}</h1>{line && <p>{line}</p>}</div>
    {fullTo && <Link to={fullTo} className="fergus-board-full">{fullLabel} <ArrowUpRight size={16} /></Link>}
  </header>;
}