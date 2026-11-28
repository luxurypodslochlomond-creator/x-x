import React from 'react';
import ShareWord from '@/components/climate/cartoons/share/ShareWord';
import ShareCardButton from '@/components/climate/ShareCardButton';
import KeeperKey from '@/components/climate/KeeperKey';
import SendToAlina from '@/components/climate/cartoons/share/SendToAlina';
import { buildWorkshopCard, WORKSHOP_CARD } from '@/components/climate/cartoons/workshopCard';
import { HOUR_ADDRESS, workshopLines } from '@/components/climate/cartoons/share/shareLines';

export default function WorkshopInvitation({ join, onJoinChange }) {
  const messages = workshopLines({ join: join.trim() });
  return <div className="invitation-main">
    <p className="invitation-kicker">Sunday 29 November · one hour online</p>
    <h2 className="invitation-heading">An invitation. Not an essay.</h2>
    <div className="invitation-join">
      <label htmlFor="join-line">Host’s joining link and passcode, if supplied</label>
      <textarea id="join-line" rows={2} maxLength={320} value={join} onChange={event => onJoinChange(event.target.value)} placeholder="Paste the host’s joining details" />
      <p>Added to the message and picture. Not saved. Share only with the host’s permission.</p>
    </div>
    <ShareWord where={messages[0].where} text={messages[0].text} />
    <section className="invitation-picture" aria-labelledby="invitation-picture-title">
      <h2 id="invitation-picture-title">Send the picture with it.</h2>
      <p>Francis’s complete cover, his credit, the speakers and the working QR.</p>
      <ShareCardButton entry={{ ...WORKSHOP_CARD, join: join.trim() }} build={buildWorkshopCard} label="Save or share the invitation" includeMessage windowTitle="Workshop invitation" link={HOUR_ADDRESS} description={messages[0].text} icon={false} previewFirst />
    </section>
    <details className="invitation-fold">
      <summary>Other short versions</summary>
      {messages.slice(1).map(line => <ShareWord key={line.id} {...line} />)}
    </details>
    <details className="invitation-fold">
      <summary>For custodians · send to Alina</summary>
      <KeeperKey><SendToAlina text={messages[0].text} /></KeeperKey>
    </details>
  </div>;
}