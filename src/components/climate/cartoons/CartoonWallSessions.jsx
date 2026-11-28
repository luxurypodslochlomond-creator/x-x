import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { recordOrigin } from '@/components/climate/recordAddress';
import { buildCartoonShareCard, CARTOON_CARD } from '@/components/climate/cartoons/cartoonCard';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { HUMOUR } from '@/components/climate/cartoons/humourFacts';
import { InkArrow } from '@/components/climate/cartoons/CartoonInkIcons';
import '@/components/climate/cartoons/cartoon-wall-sessions.css';

// ── THE THREE DAYS, AND THE HOURS, AT THE TOP WHERE THEY CAN BE FOUND ────────
// Brian, 28 November: "we have all event details, they're just lost down the page… would be
// cooler as fuck to have something that Francis etc can share like the Dutch guy… at the
// top of the wall across from the paragraph that starts 'the name is older than the room'…
// on desktop a lot of empty space and this section looks off balance."
//
// He was looking at a real hole. The room's name and the Iya paragraph sit in a column on
// the left, and at desktop width the whole right half of that band was empty paper — while
// the dates, the museum and the two online hours were three chapters further down, past the
// drawings, the goals and the invitation. The one thing a visitor from CAIB, a school or a
// newsroom needs in the first screen was the one thing buried deepest.
//
// So the facts come up here, into the empty half, in the shape Francis's own post used: what
// it is, when it is, where it is, and the two hours a person can actually join. And the card
// that already exists for this room is offered with it, because the point of putting the
// details at the top is that somebody passes them on — the card and the words are already
// made, they were simply standing at the wrong end of the room.
//
// Every fact here is read from CARTOON_EVENT and HUMOUR, not typed again: the room's dates
// are written once and the record does not allow itself two versions of a Sunday.
export default function CartoonWallSessions() {
  return (
    <aside className="cartoon-sessions" aria-label="When the biennial is, and the hours that are online">
      {/* Not "the three days" — that is the name of the programme chapter further down, and
          two blocks with one name is how a room starts repeating itself. */}
      <p className="cartoon-sessions-eyebrow">When, and where</p>
      <p className="cartoon-sessions-days">{CARTOON_EVENT.when}</p>
      <p className="cartoon-sessions-where">{CARTOON_EVENT.where}</p>

      <hr className="cartoon-sessions-rule" />

      {/* The hour this wall was gathered for. */}
      <p className="cartoon-sessions-label">The climate hour</p>
      <p className="cartoon-sessions-title">Janine Selendy’s workshop</p>
      <p className="cartoon-sessions-when">
        Sunday 29 November · 3pm West Africa · 2pm UK · the festival lists this hour as online
      </p>
      {/* ── WHY THERE IS NO LINK IN THIS BOX ────────────────────────────────────
          Brian, 28 November: "the Dutch guy had zoom details etc bro, we don't."
          He did, and that was the point of his post: a notice you can act on. We have not
          got Janine's joining link, and this record does not publish a room's address that
          was not given to it — the same rule as the workshop page. So the absence is said
          out loud rather than left as a hole a reader fills with a wrong idea. If she gives
          us the link and her word, it goes here in one line. */}
      <p className="cartoon-sessions-note">Online · the joining link is Janine’s to send.</p>
      <p className="cartoon-sessions-door">
        <Link to="/ClimateWorkshop">What happens in the hour →</Link>
      </p>

      <hr className="cartoon-sessions-rule" />

      {/* And the session Francis sent, credited to the people who gave it. */}
      <p className="cartoon-sessions-label">Also in the programme</p>
      <p className="cartoon-sessions-title">{HUMOUR.research.short}</p>
      <p className="cartoon-sessions-when">{HUMOUR.research.by}</p>
      <p className="cartoon-sessions-door">
        <a href={HUMOUR.research.href} target="_blank" rel="noopener noreferrer">
          {HUMOUR.research.label} ↗
        </a>
      </p>

      <hr className="cartoon-sessions-rule" />

      {/* The thing Francis, a school or a newsroom can put in a message today. */}
      <ShareCardButton
        compact
        entry={CARTOON_CARD}
        build={buildCartoonShareCard}
        label="Pass it on"
        link={`${recordOrigin()}/ClimateCartoons`}
        description={CARTOON_EVENT.shareLine}
        icon={InkArrow}
        previewFirst
        includeMessage
        windowTitle="Pass the room on"
        alt="The cover of the African Cartoon Biennial book, drawn by Francis Umendu Odupute"
      />
      <p className="cartoon-sessions-note">
        The cover, the dates and the hour — for a cartoonist, a classroom or a newsroom.
      </p>
    </aside>
  );
}