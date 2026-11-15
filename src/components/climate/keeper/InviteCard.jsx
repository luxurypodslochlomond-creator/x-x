import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { buildInviteCard } from './inviteCard';
import ShareCardPreview from '../ShareCardPreview';
import { recordAddress, recordOrigin } from '../recordAddress';

// One tap on the card: it goes into the device's share sheet where there is one, so it
// can land in an email to one person or a group chat of eight without anything being
// retyped. Where the sheet is refused — the editor's frame, a locked-down browser — the
// card is put on screen to keep, never quietly dropped into Downloads.
export default function InviteCard({ name = '' }) {
  const [state, setState] = useState('idle');
  const [card, setCard] = useState(null);

  const share = async () => {
    if (state === 'building') return;
    setState('building');
    try {
      const blob = await buildInviteCard({ name }, { origin: recordOrigin() });
      if (!blob) throw new Error('The card could not be drawn.');
      const file = new File([blob], 'record-of-the-time-invitation.png', { type: 'image/png' });
      const title = name.trim() ? `An invitation, ${name.trim()}` : 'An invitation to the record';
      const line = recordAddress();

      const carriesFile = !!(navigator.canShare && navigator.canShare({ files: [file] }));
      if (carriesFile || navigator.share) {
        try {
          await navigator.share(carriesFile ? { files: [file], title, text: line } : { title, text: line });
          setState('shared');
          setTimeout(() => setState('idle'), 3500);
          return;
        } catch (err) {
          if (err?.name === 'AbortError') { setState('idle'); return; }
        }
      }
      setCard({ blob, fileName: file.name });
      setState('idle');
    } catch (err) {
      setState('idle');
      throw err;
    }
  };

  const Icon = state === 'shared' ? Check : Share2;
  const reading = { fontFamily: 'var(--font-reading)' };

  return (
    <div>
      <button
        onClick={share}
        disabled={state === 'building'}
        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 border-2 border-[#141210] text-[#141210] text-[14px] font-semibold active:bg-[#141210] active:text-[#f4efe4] disabled:opacity-60"
        style={reading}
      >
        <Icon className="w-4 h-4" />
        {state === 'building' ? 'Drawing their card…' : state === 'shared' ? 'Sent' : 'Draw their card'}
      </button>
      <ShareCardPreview
        open={!!card}
        onClose={() => setCard(null)}
        blob={card?.blob}
        fileName={card?.fileName}
        link={recordAddress()}
        headline={name.trim() ? `An invitation, ${name.trim()}` : 'An invitation to the record'}
      />
    </div>
  );
}