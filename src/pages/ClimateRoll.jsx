import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PersonOnTheRoll from '@/components/climate/roll/PersonOnTheRoll';
import RollOwnLine from '@/components/climate/roll/RollOwnLine';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCheckerShareCard } from '@/components/climate/roll/checkerCard';

// ── THE ROLL ────────────────────────────────────────────────────────────────
// The founder asked, 13 November: a page for the people who check this record, so they
// can see something of themselves on it and Janine can see them too — "not bullshit
// social media", and not a duck either.
//
// So this is what it is: a roll. Names, the few words each person wrote in their own
// hand, and the work that can be counted from the checks table. No likes, no followers,
// no comments, no messages, no portraits, no ranking, no badges for turning up. Every one
// of those is a way of making people perform, and a volunteer opening sources for an hour
// is not performing: they are doing the one thing this record cannot do for itself.
//
// It is also not a second list. The people here are the record's own guest list — the same
// rows that decide who may read a source and who may publish — so the roll can never say
// somebody is checking when they have stopped, or leave off somebody who started.
export default function ClimateRoll() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const res = await base44.functions.invoke('climateRoll', {});
      if (res?.data?.error) throw new Error(res.data.error);
      setData(res.data);
    } catch (e) {
      setError('That did not open. Try again in a moment.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const people = data?.people || [];
  const totals = data?.totals || {};

  return (
    <ClimateRecordShell
      className="record-room-veiled"
      eyebrow="THE RECORD"
      marker="The roll · who keeps this record honest"
      title="The people who check this record"
      statement="A name, a few words in their own hand, and what they have actually signed. No likes, no followers, no messages — a roll, not a feed."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Everyone here is on the record's own list. Nothing about a person is printed until they have written it themselves."
    >
      {data?.me && <RollOwnLine me={data.me} onSaved={load} />}

      {/* ── THE CARD, NOT A PAGE ────────────────────────────────────────────────
          What a witness can actually hand to somebody — a body, a journal, a grant
          panel. It appears once their line is on the roll, because a card with no
          words of their own on it is a certificate, and this record does not issue
          certificates. Every number on it is counted when it is drawn. */}
      {data?.me?.line && (
        <div className="mb-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-record-red">your card</p>
          <p className="mt-2 mb-3 max-w-[46ch] text-[13px] leading-[1.6] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>
            What you have checked, on one sheet you can hand to anyone who asks. No address, no account, no score —
            and it says plainly that a name here is not a rating: what the record stands behind is every entry, each
            one carrying who says so, open for anyone to check.
          </p>
          <ShareCardButton
            instant
            entry={{ ...data.me, title: data.me.name }}
            build={buildCheckerShareCard}
            label="Send this as a card"
            includeMessage
            windowTitle="Send this as a card"
          />
        </div>
      )}

      {error && (
        <p className="text-[13px] leading-[1.6] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
          {error}
        </p>
      )}

      {!data && !error && (
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-record-muted">opening the roll</p>
      )}

      {data && (
        <>
          {/* The facts of the list itself, which need no one's permission to be true. */}
          <p className="font-mono text-[11px] leading-[1.7] text-record-muted">
            {totals.on_list || 0} {totals.on_list === 1 ? 'person holds' : 'people hold'} a place on this list ·{' '}
            {totals.keepers || 0} {totals.keepers === 1 ? 'holds' : 'hold'} the keys ·{' '}
            {totals.signed || 0} {totals.signed === 1 ? 'entry' : 'entries'} signed
            {totals.signers ? ` · by ${totals.signers} ${totals.signers === 1 ? 'person' : 'people'}` : ''}
          </p>

          {/* ── WHY A KEEPER'S NAME CAN BE ON A PAGE ABOUT CHECKING ───────────────
              The founder asked, and it is a fair question: if this is the volunteers'
              page, why are the three of us on it? Because a keeper reads what is waiting
              like anybody else — holding the keys does not mean you stop reading sources
              — and because a line only ever appears where its owner wrote one. So being
              here is a choice each keeper makes by writing, and not writing keeps them
              off it. Said out loud, because otherwise it looks like a rule nobody set. */}
          <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.65] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>
            Everyone who checks this record appears here, custodians included — a custodian reads what is waiting like
            anybody else, and carries the keys besides. It is never automatic: a name appears only where its owner
            wrote a line, so a custodian who would rather the roll carried only the volunteers leaves their own line
            empty and stays off it. Nothing else about them changes.
          </p>

          <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.65] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>
            The other half of the answer is the{' '}
            <Link to="/ClimateSeals" className="font-bold text-record-red underline decoration-2 underline-offset-2">seal</Link>
            : a fingerprint on every entry, recomputed in your own browser, so nobody has to take our word for whether
            the words moved.
          </p>

          {people.length > 0 ? (
            <div className="mt-7">
              {people.map((p) => (
                <PersonOnTheRoll key={p.id} person={p} />
              ))}
            </div>
          ) : (
            <div className="mt-7 border-t border-record-ink/15 pt-6">
              <p className="max-w-[52ch] text-[14px] leading-[1.65] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
                Nobody has put their own words here yet. The list is private by design — the record never prints a
                name unless the person it belongs to wrote it — so this page fills one person at a time, and that is
                the right speed for it.
              </p>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.65] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>
                If you are on the list, sign in and the place to write your line appears at the top of this page. If
                you are not on it yet, there is a page for that.
              </p>
            </div>
          )}

          <div className="mt-9 border-t border-record-ink/15 pt-5">
            <Link
              to="/ClimateFellows"
              className="inline-flex min-h-[44px] items-center gap-2 text-[13.5px] text-record-ink transition-colors hover:text-record-red"
              style={{ fontFamily: 'var(--font-reading)' }}
            >
              What checking involves, and how to ask to take part
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </>
      )}
    </ClimateRecordShell>
  );
}