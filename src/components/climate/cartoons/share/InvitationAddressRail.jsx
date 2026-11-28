import React from 'react';
import CopyLine from '@/components/climate/CopyLine';
import RoomCode from '@/components/climate/cartoons/RoomCode';
import { ROOM_ADDRESS } from '@/components/climate/cartoons/share/shareLines';

export default function InvitationAddressRail() {
  return <aside className="invitation-address" aria-label="The wall’s address and QR code">
    <div className="invitation-address-line">
      <p>{ROOM_ADDRESS}</p><CopyLine text={ROOM_ADDRESS} label="Copy address" />
    </div>
    <RoomCode text={ROOM_ADDRESS} size={112} caption="Scan to open the wall. Every drawing keeps its credit." />
    <p className="invitation-offline">Opening the wall needs a connection unless that device has already kept a copy.</p>
  </aside>;
}