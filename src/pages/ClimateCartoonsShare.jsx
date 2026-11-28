import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import WorkshopInvitation from '@/components/climate/cartoons/share/WorkshopInvitation';
import InvitationAddressRail from '@/components/climate/cartoons/share/InvitationAddressRail';
import ShareReferenceMessages from '@/components/climate/cartoons/share/ShareReferenceMessages';
import '@/components/climate/cartoons/share/invitation-page.css';

export default function ClimateCartoonsShare() {
  const [count, setCount] = useState(null);
  const [join, setJoin] = useState('');
  useEffect(() => {
    let live = true;
    base44.entities.ClimateCartoon.count({ status: 'published' }).then(value => {
      if (live) setCount(value);
    }).catch(() => {});
    return () => { live = false; };
  }, []);
  return <ClimateRecordShell painted wide mobileCompact className="invitation-page"
    eyebrow="The Wall · pass it on" marker="The invitation · Sunday 29 November"
    title="Pass it on."
    statement="One short invitation. The full artwork. Every credit kept."
    returnTo="/ClimateCartoons" returnLabel="Back to the wall"
    footer="Joining details stay on this device until shared. The artist’s credit stays with the picture.">
    <div className="invitation-layout">
      <div className="min-w-0">
        <WorkshopInvitation join={join} onJoinChange={setJoin} />
        <ShareReferenceMessages count={count} />
      </div>
      <InvitationAddressRail />
    </div>
  </ClimateRecordShell>;
}