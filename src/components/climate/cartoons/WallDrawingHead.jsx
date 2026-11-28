import React from 'react';
import { Link } from 'react-router-dom';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';

export default function WallDrawingHead() {
  return <header className="press-wall-head">
    <div className="wall-drawings-heading">
      <div>
        <p className="press-eyebrow">CartoonAFRICA · CEEW’s What On Earth! · contributing artists</p>
        <h2 id="press-wall-title" className="press-wall-title">The drawings.</h2>
      </div>
      <nav className="wall-drawings-tools" aria-label="Use the wall">
        <Link to="/ClimateCartoons/Thread">Present</Link>
        <Link to="/ClimateCartoons/Print">Print a show</Link>
        <a href="#wall-money">Stand behind the work</a>
      </nav>
    </div>
    <CartoonSignal />
    <p className="press-wall-line press-wall-swipe">Swipe along the wall. Tap a drawing to look closer.</p>
  </header>;
}