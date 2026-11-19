import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';
import CartoonCloseReading from '@/components/climate/cartoons/CartoonCloseReading';

// ── READING THE THREAD ──────────────────────────────────────────────────────────
// One address that opens the room's drawings full size, at the first one, so a room
// can be walked through them one after another without hunting for a plate to tap.
// It is the wall's own hanging order — the same sequence a reader meets on the wall —
// because a thread is a wall read out loud, not a second order invented for the day.
// Closing the reader puts you back on the wall, where the drawings live.
export default function ClimateCartoonsThread() {
  const navigate = useNavigate();
  const wall = useCartoonWall(false);
  const [index, setIndex] = useState(0);
  const cartoons = wall.cartoons || [];

  if (wall.isPending) {
    return (
      <p className="record-meta flex items-center gap-2 py-16" role="status">
        <Loader2 size={18} className="animate-spin" />Opening the thread…
      </p>
    );
  }

  if (!cartoons.length) {
    return (
      <div className="py-16">
        <p className="record-meta">There is no thread yet — the wall is still blank.</p>
        <p className="record-meta mt-3"><Link to="/ClimateCartoons" className="underline">Back to the wall ↗</Link></p>
      </div>
    );
  }

  return (
    <CartoonCloseReading
      cartoons={cartoons}
      index={Math.min(index, cartoons.length - 1)}
      onTurn={setIndex}
      onClose={() => navigate('/ClimateCartoons')}
    />
  );
}