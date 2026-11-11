import React from 'react';

/* ── THE HILL, DRAWN ─────────────────────────────────────────────────────────────
   Two maps, and they do different jobs.

   The first is drawn by hand, in the record's own ink: the loch on the right, the
   village at the foot, the road climbing to the cabins, and the old coffin road going
   out west to Cardross. It is not to scale and it says so — a drawing that pretends to
   be a survey is a lie told with a compass rose. What it is for is understanding: this
   is the shape of the place, and these are the two lines you can arrive on.

   The second is a real map, and it is OpenStreetMap rather than Google — free, made by
   people who map their own streets, and no account, no tracking and no key. Nothing on
   this page asks a reader to sign their journey over to an advertising company. */

/* The frame is the road itself, not a pin somebody guessed at: it runs from the Balloch
   roundabout, where Stoneymollan Road begins, west and up to Upper Stoneymollan — the
   point OpenStreetMap actually records for the top of the road (56.0015, -4.6189).
   An earlier version of this page dropped a marker on a coordinate invented for the
   cabins. There is no public pin for a house, so there is none here: the marker sits on
   the road, and the gate is sent to a guest when they book. */
const OSM_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=-4.6500%2C55.9930%2C-4.5550%2C56.0110&layer=mapnik&marker=56.0015%2C-4.6189';
const OSM_LINK = 'https://www.openstreetmap.org/search?query=Stoneymollan%20Road%2C%20Balloch';

export default function TheHillDrawn() {
  return (
    <div className="mx-auto w-full max-w-[38rem]">
      <div className="border border-record-ink/25 bg-record-bone">
        <svg
          viewBox="0 0 360 250"
          className="block w-full"
          role="img"
          aria-label="A drawn plan: Balloch at the south end of Loch Lomond, a road climbing from the village to the cabins, and the coffin road running west to Cardross."
        >
          {/* the water */}
          <path
            d="M300 0h60v250h-74c20-40 6-80 20-118 12-34 0-76-6-132Z"
            fill="rgb(15 95 122)"
            fillOpacity="0.13"
          />

          {/* the A82, down the side of the loch */}
          <path
            d="M296 4c-8 54 10 112-2 162-6 26-14 50-20 66"
            fill="none"
            stroke="rgb(20 18 16)"
            strokeOpacity="0.5"
            strokeWidth="1.6"
          />

          {/* the hill itself */}
          <path
            d="M142 204c24-34 52-46 82-26"
            fill="none"
            stroke="rgb(20 18 16)"
            strokeOpacity="0.55"
            strokeWidth="1.4"
          />

          {/* the road up from the village, and the coffin road out west */}
          <path
            d="M280 152c-24 8-50 6-78 14"
            fill="none"
            stroke="rgb(204 45 42)"
            strokeWidth="2"
          />
          <path
            d="M196 168c-26 12-56 22-84 30-24 6-44 8-62 10"
            fill="none"
            stroke="rgb(204 45 42)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />

          {/* the cabins */}
          <rect x="194" y="163" width="9" height="9" fill="rgb(20 18 16)" />

          {/* the village */}
          <circle cx="282" cy="152" r="3.6" fill="rgb(204 45 42)" />

          <text x="200" y="152" textAnchor="middle" fontSize="10" letterSpacing="2" className="fill-record-ink font-mono">
            STONEYMOLLAN
          </text>
          <text x="282" y="170" textAnchor="middle" fontSize="9" letterSpacing="1.6" className="fill-record-ink font-mono">
            BALLOCH
          </text>
          <text x="282" y="182" textAnchor="middle" fontSize="8" letterSpacing="1.2" className="fill-record-red font-mono">
            ROUNDABOUT
          </text>
          <text x="248" y="140" textAnchor="middle" fontSize="8" letterSpacing="1.2" className="fill-record-red font-mono">
            TURN LEFT
          </text>
          <text x="48" y="222" textAnchor="start" fontSize="9" letterSpacing="1.6" className="fill-record-ink font-mono">
            CARDROSS
          </text>
          <text x="296" y="18" textAnchor="start" fontSize="9" letterSpacing="1.6" className="fill-record-ink font-mono">
            A82
          </text>
          <text x="322" y="130" textAnchor="middle" fontSize="10" letterSpacing="1.4" transform="rotate(-90 322 130)" className="fill-record-ink font-mono">
            LOCH LOMOND
          </text>
          <text x="14" y="242" textAnchor="start" fontSize="8.5" letterSpacing="1.2" className="fill-record-ink font-mono">
            - - - coffin road · John Muir Way
          </text>
        </svg>
        <p className="border-t border-record-ink/20 px-3 py-2 font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.1em] text-record-ink/85">
          Not to scale &middot; the shape of it, not a survey
        </p>
      </div>

      <div className="mt-4 border border-record-ink/25 bg-record-paper">
        <iframe
          title="Stoneymollan and Balloch on OpenStreetMap"
          src={OSM_EMBED}
          loading="lazy"
          className="block h-[240px] w-full"
          style={{ border: 0 }}
        />
        <p className="border-t border-record-ink/20 px-3 py-2 font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.1em] text-record-ink/85">
          The real road, from the Balloch roundabout up to Upper Stoneymollan. The cabins are
          off it &middot; we send the gate when you book.
        </p>
        <a
          href={OSM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[46px] items-center justify-center border-t border-record-ink/20 font-mono text-[10.5px] uppercase tracking-[0.12em] text-record-ink active:bg-record-ink active:text-record-paper"
        >
          Open the road on OpenStreetMap
        </a>
      </div>
    </div>
  );
}