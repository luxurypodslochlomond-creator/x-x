import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCovenantCard } from '@/components/climate/xEqualsXCard';
import { recordAddress } from '@/components/climate/recordAddress';
import { COVENANT_SHARE } from '@/components/climate/xEqualsXCopy';

// ── THE TWO WAYS ONWARD, UNDER THE THUMB ────────────────────────────────────────
// Brian, 26 November, on a phone: "why does it feel like old website on device and not
// coolasfuck ... why can't be next level bro of PWA layout on mobile screen". He is right,
// and this is the honest half of the answer: on a phone the page's two doors — read the
// record, pass the principle on — were at the top of a very long scroll, so a reader who
// had gone all the way down had to climb back up to leave. Every app anybody actually uses
// keeps its way out where the hand already is.
//
// So the bar sits at the foot of the glass on a phone and nowhere else, in the record's own
// clothes: the machine's mono caps, an ink rule along the top, the paper underneath, and
// the safe-area padding so it clears the home indicator on an iPhone. It carries no new
// claim and nothing is added to the page's argument — it is the same two doors, within
// reach. On a desk it does not exist: a mouse does not have a thumb.
export default function XEqualsXPhoneBar() {
  return (
    <div className="x-eq-phonebar">
      <Link to="/TogetherChangeClimate" className="x-eq-phonebar-main">
        Read the record <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
      <div className="covenant-share x-eq-phonebar-share">
        <ShareCardButton
          entry={{ id: 'x-equals-x', title: 'x = x' }}
          build={buildCovenantCard}
          label="Share"
          link={recordAddress('/XEqualsX')}
          description={COVENANT_SHARE}
        />
      </div>
    </div>
  );
}