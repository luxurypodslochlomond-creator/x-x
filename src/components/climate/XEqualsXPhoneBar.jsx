import React, { useEffect, useState } from 'react';
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
// ── AND IT WAITS UNTIL THE FIRST SCREEN IS BEHIND YOU ───────────────────────────
// The plate at the head of this page carries the same two doors, in the same words, at the
// size a first screen is allowed. A bar that arrived with the page would have sat on top of
// them and made the two real buttons unreachable with a thumb — a bar that hides the thing
// it duplicates is not a shortcut. So it rises only once the plate has gone past, which is
// also when a reader first needs it: from there to the foot of the page there is no other
// way out but the top of the glass.
//
// It exists only under 1024 pixels and adds no claim to the page. On a desk it is not
// rendered at all: a mouse does not have a thumb.
export default function XEqualsXPhoneBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="x-eq-phonebar" data-shown={shown ? '' : undefined} aria-hidden={shown ? undefined : 'true'}>
      <Link to="/TogetherChangeClimate" className="x-eq-phonebar-main" tabIndex={shown ? undefined : -1}>
        Read the record <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
      <div className="covenant-share x-eq-phonebar-share">
        <ShareCardButton
          instant
          entry={{ id: 'x-equals-x', title: 'x = x' }}
          build={buildCovenantCard}
          label="Share"
          link={recordAddress('/XEqualsX')}
          description={COVENANT_SHARE}
          includeMessage
          windowTitle="Share x = x"
        />
      </div>
    </div>
  );
}