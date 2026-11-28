import React from 'react';
import { Link } from 'react-router-dom';
import '@/components/climate/cartoons/room-new.css';

export default function CartoonRoomNew() {
  return <aside className="room-new" aria-label="Your drawing and your rights">
    <p><strong>Your rights stay yours.</strong> The wall shows the whole drawing with its credit. A custodian reviews it before publication.</p>
    <p><Link to="/ClimateMethod#say">Ask for a correction or removal</Link> · <Link to="/ClimateCartoons/WhatThisIs">Read the full terms for your work</Link></p>
  </aside>;
}