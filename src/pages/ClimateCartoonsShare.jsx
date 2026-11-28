import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import ShareWord from '@/components/climate/cartoons/share/ShareWord';
import RoomCode from '@/components/climate/cartoons/RoomCode';
import SendToAlina from '@/components/climate/cartoons/share/SendToAlina';
import KeeperKey from '@/components/climate/KeeperKey';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { InkArrow } from '@/components/climate/cartoons/CartoonInkIcons';
import { buildWorkshopCard, WORKSHOP_CARD } from '@/components/climate/cartoons/workshopCard';
import {
  shareLines,
  eventLines,
  workshopLines,
  descriptionLine,
  ROOM_ADDRESS,
  HOUR_ADDRESS,
  ONE_LINE,
} from '@/components/climate/cartoons/share/shareLines';

// A heading between the three groups on this page: the description, the event, the room.
const GroupHead = ({ title, note }) => (
  <div className="mt-9 border-t-2 border-record-ink/25 pt-3">
    <h2 className="text-[15px] leading-snug lg:text-[17px]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
    {note && <p className="mt-1 text-[11.5px] leading-snug text-record-muted">{note}</p>}
  </div>
);

// ── CARRYING THE ROOM OUT OF THE CHAT ──────────────────────────────────────────
// The drawings travel hand to hand, and the hand-over is already one tap on the room's own
// page. What was missing was the words: a link dropped into a feed with nothing around it
// says nothing, so the room looked like a poster for something nobody could name.
//
// This page is the words, written for the five places a person actually posts, with the
// count read live from the wall so it can never say a number the room does not hold. It is
// not a marketing page: there is no ask on it beyond looking, and the last line is the
// plainest description of the room there is, for anybody who wants one sentence only.
//
// ── WHY IT IS TWO COLUMNS ON A DESKTOP SCREEN ──────────────────────────────────
// Brian, 26 November: "desktop it optimised for description about Benin … spacing balance
// could be better in places." He was right, and the fault was shape, not words. The shell
// gives every page one wide card, so this one was a thousand pixels of paper with a
// sixty-five-character ribbon of prose down the left of it and a QR code stranded at the
// top: the address scrolled away the moment you started reading, and the three-day event
// in Benin City — reference material, not the thing anybody came for — was laid out at the
// same weight as the invite they were about to send.
//
// So on a wide screen the address and its code sit in a rail that stays beside the words,
// the invite stays a single full-width column because it is what a person came to copy,
// and the reference blocks (the event, the room) are paired two-up so they read as a set
// rather than as three more pages of article. Nothing has been cut and nothing reordered:
// on a phone the page is exactly the column it was.
export default function ClimateCartoonsShare() {
  const [count, setCount] = useState(null);
  // Janine's joining link, pasted once by whoever is sending the invite. It is never invented
  // here and never stored: it lives in this box until the page is closed.
  const [join, setJoin] = useState('');

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const n = await base44.entities.ClimateCartoon.count({ status: 'published' });
        if (live) setCount(n);
      } catch {
        // The words still work without a number; the page never says a figure it cannot read.
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  const description = descriptionLine();
  const workshop = workshopLines({ join: join.trim() });
  const event = eventLines();
  const room = shareLines(count);

  return (
    <ClimateRecordShell
      painted
      eyebrow="The cartoon room · words to carry it"
      marker="One picture, the words for every place, one address"
      title="Words for wherever you send it"
      statement="The drawings travel hand to hand, and a link on its own says nothing. So here is the room described for the occasion it is going to — a group chat, a story, a caption, an institution’s feed, one line, one email, a printed sheet — each with the address on the end. It opens with the picture and the invite for Sunday, then the initiative in Janine Selendy’s own words, because that is the shortest true description of what this room is part of."
      returnTo="/ClimateCartoons"
      returnLabel="The room"
      footer="Every figure on this page is read from the wall itself when the page opens. Nothing here is a claim the room cannot show."
      mobileCompact
      wide
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-x-10">

        {/* THE ADDRESS, KEPT BESIDE THE WORDS ───────────────────────────────────────
            The rail is second on a desktop screen and first in the reading order, which is
            the order a phone already had: the address, then what to say with it. On a wide
            screen it stays where the eye can find it while the invites scroll past, because
            the one thing a person needs twice on this page is the address itself. */}
        <aside className="lg:order-2 lg:sticky lg:top-6">
          <div className="flex items-start justify-between gap-3 border-b border-record-ink/15 pb-3">
            <p className="font-mono text-[11px] break-all text-record-ink/80">{ROOM_ADDRESS}</p>
            <CopyLine text={ROOM_ADDRESS} label="Copy address" />
          </div>

          {/* The address again, as a picture — for the sheet somebody prints, the card handed
              over at the biennial, or the screen held up in a room. It opens the wall itself,
              never a redirect, and it is drawn on this page rather than by anybody else. */}
          <RoomCode
            text={ROOM_ADDRESS}
            size={112}
            caption="The wall, as a code — for a printed sheet, a card handed over, or a screen held up in a room. The address in words is printed above it, always."
          />
          {/* Said here, once, so nobody promises a room more than a browser can do: with no
              signal at all, a phone cannot hand a file to another phone. What works is this
              code, a printed sheet, or a phone that has already kept its own copy. */}
          <p className="mt-2 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-record-muted">
            With no signal at all, the way across is this code, a printed sheet, or a phone that has already kept its own copy — a browser is not allowed to hand a file straight to another phone.
          </p>
        </aside>

        <div className="lg:order-1">
          <p className="mt-3 text-[13.5px] leading-relaxed text-record-ink/90 lg:mt-0 lg:max-w-[62ch] lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
            Copy whichever one fits, or tap the app it is going to and send it — the words open already in
            it, with the address on the end. Change them to your own if you would rather: they are written
            plainly on purpose, so what the wall is, whose hands are on it and where to look all survive
            being forwarded by somebody who never read this page.
          </p>

          {/* ── THE PICTURE FIRST ─────────────────────────────────────────────────────
              Alina's first ask was a visual: the workshop, the cartoons, the speakers and the
              organisations in one creative for the biennial's own accounts. It sits first because
              a picture is what gets sent, and the words are what travel with it. */}
          <GroupHead
            title="The first creative · one picture for the accounts that carry the workshop"
            note="Workshop-first: the subject, the drawing, the four speakers with what each is doing, and the three organisations behind it. Save it or share it from the card itself."
          />
          <div className="mt-3">
            <ShareCardButton
              entry={WORKSHOP_CARD}
              build={buildWorkshopCard}
              label="Save or share the picture"
              includeMessage
              windowTitle="Share the hour"
              link={HOUR_ADDRESS}
              description="A climate workshop · Sunday 29 November · 3pm West Africa · 2pm UK · online, free. Janine Selendy hosts, Francis Umendu Odupute brings the cartoonists, Alina Sen presents CEEW’s What On Earth!."
              icon={InkArrow}
              previewFirst
            />
          </div>

          <GroupHead
            title="The workshop · Sunday, one hour"
            note="Alina asked for an invite she could pass into more groups, with some humour and the joining link in it. Paste the link once and it lands in every one of these."
          />

          <div className="mt-3 border border-record-ink/20 p-3">
            <label htmlFor="join-line" className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">
              Janine’s joining link and passcode, if you have them
            </label>
            <input
              id="join-line"
              value={join}
              onChange={(e) => setJoin(e.target.value)}
              placeholder="zoom.us/j/… · passcode …"
              className="mt-2 w-full border-0 border-b border-record-ink/30 bg-transparent px-0 py-1.5 text-[13.5px] text-record-ink outline-none focus:border-record-red"
            />
            <p className="mt-1.5 text-[11px] leading-snug text-record-muted">
              Typed here only, and gone when the page closes. Left empty, the words say the link is the
              host’s to hand out rather than sending anybody to a door that will not open.
            </p>
          </div>

          {workshop.map((line) => (
            <ShareWord key={line.id} where={line.where} note={line.note} text={line.text} />
          ))}

          <KeeperKey>
            <SendToAlina text={workshop[0].text} />
          </KeeperKey>

          <GroupHead title="What this is · Janine Selendy’s description" note="Her words, unchanged, with her name on them." />
          <ShareWord where={description.where} note={description.note} text={description.text} />

          {/* The reference blocks, paired on a wide screen: the three days in Benin City and
              the wall itself are things a reader looks up, not the invite they came to send,
              and giving them one column each stops the event reading as the subject of the page. */}
          <GroupHead
            title="The event · 28–30 November, Benin City"
            note="For CEEW and anyone carrying the three days, and the hour on Sunday that is open online."
          />
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
            {event.map((line) => (
              <ShareWord key={line.id} where={line.where} note={line.note} text={line.text} subject={line.subject} />
            ))}
          </div>

          <GroupHead title="The room · the wall itself" note="For anyone you would rather send straight to the drawings." />
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
            {room.map((line) => (
              <ShareWord key={line.id} where={line.where} note={line.note} text={line.text} subject={line.subject} />
            ))}
          </div>

          <GroupHead title="If you only have one line" note="One sentence, for a bio, a sign-off, or a reply to somebody asking what this is." />
          <ShareWord where="One line · anywhere" text={ONE_LINE} />
        </div>
      </div>
    </ClimateRecordShell>
  );
}