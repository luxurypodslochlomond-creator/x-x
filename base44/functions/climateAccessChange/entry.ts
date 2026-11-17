import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireKeeper } from '../../shared/checkerAccess.ts';

// ── WHO MAY COME IN, AND NEVER BY ONE HAND ────────────────────────────────────
// The guest list is the most dangerous thing on this record: it decides who can open a
// person's entry and who cannot, and until now a single keeper could pause or remove
// anybody in one tap, with no second voice in it. That is not a record, it is a lever.
//
// So access moves by two keys. One keeper asks; a different keeper agrees; only then does
// anything change. The keeper who asked can never agree to their own line — the server
// refuses it, not the page, because a rule held only in a browser is a suggestion. There is
// exactly one exception and it is the honest one: if a single keeper is the only active
// keeper on the record, there is no second key that exists to ask, so their word stands and
// the audit line says plainly that it stood alone.
//
// Two more floors, because a fair rule must not have a hole in it:
//   • the record can never be left with nobody holding the keys — the last active keeper
//     cannot be paused or removed, by anybody, however many agree;
//   • every settled ask is written into the audit trail with the name of the hand that landed
//     it, and every ask that was withdrawn or refused is kept as a line rather than deleted.
//
// Roster rows are read and written with the service role: the keepers manage this list, and a
// keeper is not an administrator of the building. That was always true of the code and it is
// now true of the table too — no browser writes a ClimateChecker or an access change directly.

const ROSTER = 'ClimateChecker';
const CHANGES = 'ClimateAccessChange';
const AUDIT = 'ClimateAuditLog';

const VERB = { add: 'Add', pause: 'Pause', restore: 'Restore', remove: 'Remove' };

const lower = (v) => String(v || '').trim().toLowerCase();

async function rosterOf(base44) {
  const rows = await base44.asServiceRole.entities[ROSTER].list({ sort: 'created_date', limit: 300 });
  return rows?.items || rows || [];
}

// ── WHAT THE KEEPER ACTUALLY KNOWS ABOUT EACH PERSON ─────────────────────────
// A list that only says "on it" leaves the keeper asking the one question she cannot
// answer from it: has this person turned up yet? So each line carries its evidence, and
// only evidence: how many notes they have signed and when the last one was, and whether
// they have written their own line on the roll. Nothing here is a guess about an email
// being opened — a letter cannot be read back, and the record will not pretend it can.
function shapeLine(row, evidence, names, agreed) {
  const e = (evidence && evidence.get(lower(row.email))) || { notes: 0, last: '' };
  return {
    id: row.id,
    email: row.email || '',
    name: row.name || '',
    note: row.note || '',
    // ── THE TRAIL, AS THE RECORD ACTUALLY KNOWS IT ─────────────────────────────
    // Four facts a keeper asks about a name: when they were written down, whether the
    // letter went (and why not, when it did not), whether they have ever turned up, and
    // whose word put them here. Nothing here is a guess about an inbox.
    invited_at: row.invited_at || row.created_date || '',
    notice_sent_at: row.notice_sent_at || '',
    notice_error: row.notice_error || '',
    joined_at: row.joined_at || '',
    agreed_by: (agreed && agreed.get(lower(row.email))) || '',
    // ── WHOSE WORD PUT THIS LINE HERE ────────────────────────────────────────────
    // With three keepers on the record, "on the list" is not the answer a keeper needs —
    // "put here by Brian" is. A guest list where any line could have come from anyone is
    // not a record of vouching, it is just a queue of addresses. The address was always
    // stored; the name is looked up from the list itself so nobody has to read an email.
    added_by: names?.get(lower(row.added_by)) || (String(row.added_by || '').includes('@') ? '' : row.added_by || ''),
    is_keeper: Boolean(row.is_keeper),
    active: Boolean(row.active),
    asked: row.created_date || '',
    notes: e.notes,
    last_note: e.last,
    line_written: Boolean(String(row.public_line || '').trim()),
  };
}

async function logIt(base44, { rowId, title, action, reviewer, note }) {
  try {
    await base44.asServiceRole.entities[AUDIT].create({
      entity_type: 'keeper',
      entity_id: rowId || '',
      entity_title: title || '',
      action,
      reviewer_email: reviewer,
      ai_assessment: note || '',
    });
  } catch (e) {
    console.error('climateAccessChange: audit line failed:', e.message);
  }
}

// ── A LETTER THAT WENT AND A LETTER THAT DID NOT ARE TWO DIFFERENT THINGS ───────
// This used to swallow the outcome, so the list could only ever say "told" and a keeper had
// no way of knowing whether the person had heard anything at all. It now answers, and the
// answer is written onto the person's line — the day it went, or the reason it did not.
async function tell(base44, payload) {
  try {
    // Sent as the keeper who made the change, never as the building. The letter's own guard
    // asks for a keeper of this record, and a service-role call carries no keeper at all —
    // which is how a letter that was meant to go out quietly stayed inside the building and
    // nobody was told. Same change, same words, just the hand that actually made it.
    const res = await base44.functions.invoke('climateCheckerNotice', payload);
    const d = res?.data || {};
    if (d?.error) return { sent: false, why: String(d.error).slice(0, 200) };
    return { sent: true, why: '' };
  } catch (e) {
    // ── THE REASON, NOT THE STATUS CODE ──────────────────────────────────────────
    // This used to record "Request failed with status code 500", which tells a keeper
    // nothing and hides the one sentence that matters. The letter's own reason is in the
    // response body ("this recipient hit their hourly limit", for instance), so it is read
    // from there and written onto the person's line in words a person can act on.
    const why =
      e?.response?.data?.error || e?.data?.error || e?.message || 'The letter could not be sent.';
    console.error('climateAccessChange: notice failed:', why);
    return { sent: false, why: String(why).slice(0, 200) };
  }
}

// The record of what happened to the letter, written where the keeper can read it back.
async function markNotice(base44, rowId, told) {
  if (!rowId) return;
  try {
    await base44.asServiceRole.entities[ROSTER].update(rowId, {
      notice_sent_at: told.sent ? new Date().toISOString() : '',
      notice_error: told.sent ? '' : told.why || 'The letter could not be sent.',
    });
  } catch (e) {
    console.error('climateAccessChange: could not record the letter:', e?.message);
  }
}

// The one place access actually moves. Called for a solo keeper (no second key exists) and for
// a second keeper agreeing to somebody else's ask, so there is a single path and no quieter one.
async function applyChange(base44, change, who, basis) {
  const by = who.user?.email || '';
  const basisNote =
    basis === 'solo'
      ? `Only one keeper held the keys, so there was no second key to ask. Asked and done by ${who.name || by}.`
      : basis === 'owner'
      ? `The owner's word stood alone: ${who.name || by} holds the building's keys, so no second keeper was asked, and the record says so here.`
      : basis === 'single'
      ? `One keeper's word: ${who.name || by}. A checker is a pair of eyes and not a set of keys, so adding a checker, pausing one or ending one is a single decision — and it is written here so it was never quiet.`
      : `Asked by ${change.requested_by_name || change.requested_by}; agreed by ${who.name || by}.`;

  if (change.change === 'add') {
    const email = lower(change.target_email);
    if (!email || !email.includes('@')) return { ok: false, status: 400, message: 'That address does not look right.' };
    const rows = await rosterOf(base44);
    if (rows.some((r) => lower(r.email) === email)) {
      return { ok: false, status: 409, message: 'That address is already on the list.' };
    }

    const created = await base44.asServiceRole.entities[ROSTER].create({
      email,
      name: change.target_name || email,
      is_keeper: Boolean(change.target_is_keeper),
      active: true,
      note: change.note || '',
      added_by: change.requested_by || by,
      invited_at: new Date().toISOString(),
    });

    // ── TWO THINGS HAVE TO HAPPEN, AND THEY ARE DIFFERENT THINGS ────────────────
    // The building's sign-in invitation (which sets their password) and the record's own
    // letter (which says who vouched for them). Either can fail on its own, and the keeper
    // is entitled to be told which — a person added with no sign-in invitation cannot get
    // in at all, and that is not the same as a letter that did not go.
    let signIn = true;
    try {
      await base44.users.inviteUser(email, 'user');
    } catch (e) {
      signIn = false;
      console.error('climateAccessChange: sign-in invite failed:', e?.message);
    }

    // ── THE LETTER THAT NAMES THE PERSON WHO VOUCHED ────────────────────────────
    // This used to send the record's own letter to the person only when the platform's
    // sign-in invitation had FAILED — so the one letter that says "you have a place here,
    // put there by Janine" was the fallback, and the letter that actually arrived was the
    // platform's, which cannot carry a name at all. That is backwards. A person joining a
    // record should hear from a person, not from a form: so they get the record's letter
    // every time, alongside the sign-in key, and the first line of it is whose word it was.
    const told = await tell(base44, {
      email,
      name: change.target_name || email,
      state: 'invited',
      person_letter: true,
      row_id: created?.id || '',
    });
    await markNotice(base44, created?.id, told);

    await logIt(base44, {
      rowId: created?.id || '',
      title: `${change.target_name || email}${change.target_is_keeper ? ' · keeper' : ' · checker'}`,
      action: 'access_granted',
      reviewer: by,
      note: `${basisNote}${told.sent ? ' The record\'s letter went out.' : ' The record\'s letter did NOT go out.'}`,
    });

    const who2 = change.target_name || email;
    const place = change.target_is_keeper ? 'holds the keys now' : 'is on the list';
    // Said plainly, in the order it matters: are they on the record, can they get in, and did
    // the letter actually go. No sentence here claims more than the record did.
    const bits = [`${who2} ${place}.`];
    bits.push(signIn ? 'Their sign-in invitation has gone.' : 'Their sign-in invitation did NOT go — send it again, or they cannot get in.');
    bits.push(told.sent ? 'The record\u2019s letter has gone.' : `The record\u2019s letter did not go${told.why ? `: ${told.why}` : '.'}`);
    return { ok: true, notice_sent: told.sent, sign_in_invited: signIn, message: bits.join(' ') };
  }

  const id = String(change.target_row_id || '');
  if (!id) return { ok: false, status: 400, message: 'That line is missing.' };
  const row = await base44.asServiceRole.entities[ROSTER]
    .get(id)
    .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
  if (!row) return { ok: false, status: 404, message: 'That person is no longer on the list.' };

  const title = `${row.name || row.email}${row.is_keeper ? ' · keeper' : ' · checker'}`;

  // The floor: the record is never left with nobody holding the keys.
  if ((change.change === 'pause' || change.change === 'remove') && row.is_keeper) {
    const rows = await rosterOf(base44);
    const others = rows.filter((r) => r.active && r.is_keeper && r.id !== row.id).length;
    if (others === 0) {
      return {
        ok: false,
        status: 409,
        message: 'The record must always have one keeper holding the keys. Add another keeper first, then this can happen.',
      };
    }
  }

  if (change.change === 'pause') {
    await base44.asServiceRole.entities[ROSTER].update(row.id, { active: false });
    await tell(base44, { email: row.email, name: row.name, state: 'paused' });
    await logIt(base44, { rowId: row.id, title, action: 'access_paused', reviewer: by, note: basisNote });
    return { ok: true, message: `${row.email} is paused and has been told. Notes they already wrote stay in their name.` };
  }

  if (change.change === 'restore') {
    await base44.asServiceRole.entities[ROSTER].update(row.id, { active: true });
    await tell(base44, { email: row.email, name: row.name, state: 'restored' });
    await logIt(base44, { rowId: row.id, title, action: 'access_restored', reviewer: by, note: basisNote });
    return { ok: true, message: `${row.email} can come in again and has been told.` };
  }

  if (change.change === 'remove') {
    await base44.asServiceRole.entities[ROSTER].delete(row.id);
    await tell(base44, { email: row.email, name: row.name, state: 'removed' });
    await logIt(base44, { rowId: row.id, title, action: 'access_removed', reviewer: by, note: basisNote });
    return { ok: true, message: `${row.email} is off the list and has been told. What they wrote stays on the record.` };
  }

  return { ok: false, status: 400, message: 'Unknown change.' };
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const action = body?.action || 'roster';

    const who = await requireKeeper(base44);
    if (who.error) return Response.json({ error: who.error }, { status: who.status });

    const me = lower(who.user?.email);

    // ── WHAT IS ON THE LIST, AND WHAT IS WAITING ON A SECOND KEY ────────────────
    if (action === 'roster') {
      const rows = await rosterOf(base44);
      const pending = await base44.asServiceRole.entities[CHANGES].filter(
        { status: 'waiting' },
        { sort: 'created_date', limit: 50 }
      );
      const waiting = (pending?.items || pending || []).map((w) => ({
        id: w.id,
        change: w.change,
        verb: VERB[w.change] || w.change,
        target_name: w.target_name || w.target_email || '',
        target_email: w.target_email || '',
        target_is_keeper: Boolean(w.target_is_keeper),
        requested_by: w.requested_by || '',
        requested_by_name: w.requested_by_name || w.requested_by || '',
        when: w.requested_at || w.created_date || '',
        mine: lower(w.requested_by) === me,
      }));

      const activeKeepers = rows.filter((r) => r.active && r.is_keeper).length;

      // One read of the notes, folded by address: the checking table is the only honest
      // source for "has this person done any of the work", so it is read rather than asked.
      const evidence = new Map();
      try {
        const page = await base44.asServiceRole.entities.ClimateCheck.list({ sort: '-created_date', limit: 500 });
        (page?.items || page || []).forEach((c) => {
          const key = lower(c.checker_email);
          if (!key) return;
          const e = evidence.get(key) || { notes: 0, last: '' };
          e.notes += 1;
          if (!e.last) e.last = c.created_date || '';
          evidence.set(key, e);
        });
      } catch (e) {
        console.error('climateAccessChange: could not read the checking notes', e?.message);
      }

      // The list read back as addresses-to-names, so a line can say whose word put it there
      // without ever printing one keeper's address to another.
      const names = new Map(rows.map((r) => [lower(r.email), r.name || r.email]));

      // ── WHOSE WORD PUT THEM THERE ─────────────────────────────────────────────
      // For somebody who was actually added, the record already holds the answer in its own
      // access changes: who asked, and who agreed. Read back here as names, never addresses,
      // so a keeper sees "asked by Brian, agreed by Janine" and not a line of email.
      const agreed = new Map();
      try {
        const done = await base44.asServiceRole.entities[CHANGES].filter(
          { status: 'applied', change: 'add' },
          { sort: '-created_date', limit: 100 }
        );
        (done?.items || done || []).forEach((c) => {
          const key = lower(c.target_email);
          const hand = c.confirmed_by || c.requested_by || '';
          if (key && hand && !agreed.has(key)) agreed.set(key, names.get(lower(hand)) || '');
        });
      } catch (e) {
        console.error('climateAccessChange: could not read who agreed', e?.message);
      }

      return Response.json({
        me,
        name: who.name,
        solo: activeKeepers <= 1,
        owner: who.user?.role === 'admin',
        keepers: rows.filter((r) => r.is_keeper).map((r) => shapeLine(r, evidence, names, agreed)),
        checkers: rows.filter((r) => !r.is_keeper).map((r) => shapeLine(r, evidence, names, agreed)),
        waiting,
      });
    }

    // ── WHO CHANGED IT, AND WHEN ────────────────────────────────────────────────
    // The question "who shut that person out, and when" is answered by a row, not a shrug — and
    // the person asking it is a keeper, not an administrator, so the answer lives on this door.
    // The table itself stays closed to browsers; what comes back is keeper lines only, and only
    // to a hand the record already accepts.
    if (action === 'history') {
      const found = await base44.asServiceRole.entities[AUDIT].filter(
        { entity_type: 'keeper' },
        { sort: '-created_date', limit: 40 }
      );
      const rows = found?.items || found || [];
      return Response.json({
        history: rows.map((r) => ({
          id: r.id,
          action: r.action || '',
          title: r.entity_title || '',
          when: r.created_date || '',
          by: r.reviewer_email || '',
          note: r.ai_assessment || '',
        })),
      });
    }

    // ── ASKING ──────────────────────────────────────────────────────────────────
    if (action === 'request') {
      const change = String(body?.change || '');
      if (!VERB[change]) return Response.json({ error: 'Unknown change' }, { status: 400 });

      const rows = await rosterOf(base44);

      const draft = {
        change,
        target_row_id: '',
        target_email: '',
        target_name: '',
        target_is_keeper: false,
        note: '',
        reason: String(body?.reason || '').slice(0, 400),
        requested_by: who.user?.email || '',
        requested_by_name: who.name || who.user?.email || '',
        requested_at: new Date().toISOString(),
        status: 'waiting',
      };

      if (change === 'add') {
        const email = lower(body?.email);
        const name = String(body?.name || '').trim();
        if (!email || !email.includes('@')) {
          return Response.json({ error: 'That address does not look right.' }, { status: 400 });
        }
        if (rows.some((r) => lower(r.email) === email)) {
          return Response.json({ error: 'That address is already on the list.' }, { status: 409 });
        }
        draft.target_email = email;
        draft.target_name = name || email;
        draft.target_is_keeper = Boolean(body?.is_keeper);
        draft.note = String(body?.note || '').trim().slice(0, 300);
      } else {
        const id = String(body?.row_id || '');
        if (!id) return Response.json({ error: 'Missing row_id' }, { status: 400 });
        const row = rows.find((r) => r.id === id);
        if (!row) return Response.json({ error: 'That person is no longer on the list.' }, { status: 404 });
        draft.target_row_id = row.id;
        draft.target_email = lower(row.email);
        draft.target_name = row.name || row.email || '';
        draft.target_is_keeper = Boolean(row.is_keeper);
        draft.note = row.note || '';
      }

      // Refused before it is even asked, so nobody waits on a thing that can never happen.
      if ((change === 'pause' || change === 'remove') && draft.target_is_keeper) {
        const others = rows.filter((r) => r.active && r.is_keeper && r.id !== draft.target_row_id).length;
        if (others === 0) {
          return Response.json(
            { error: 'The record must always have one keeper holding the keys. Add another keeper first.' },
            { status: 409 }
          );
        }
      }

      // ── A CHECKER IS A PAIR OF EYES, NOT A SET OF KEYS ────────────────────────
      // The two-key rule exists because access to this record is power: who may read a
      // person's entry, and who may put one on the record. A checker holds neither. Making
      // the keeper of the record wait for a second keeper to agree before she can add a
      // volunteer is how a record earns a reputation for being difficult — and with two
      // serious researchers waiting to start, difficult is the one thing it cannot afford.
      // So one keeper's word adds, pauses, restores or takes off a checker, and the audit
      // line says plainly whose word it was. Adding or removing the KEYS still needs two.
      if (!draft.target_is_keeper) {
        const done = await applyChange(base44, draft, who, 'single');
        if (!done.ok) return Response.json({ error: done.message }, { status: done.status || 400 });
        return Response.json({ applied: true, single: true, message: done.message });
      }

      // Two keys — unless there is genuinely only one hand to ask, or the hand belongs to the
      // person who owns the building. That second exception is stated plainly rather than
      // hidden: an administrator can already read and write this very table through the
      // record's own permission rules, so refusing them here would protect nobody. It would
      // only make the shed harder to use than the back door, which is how a fair rule gets a
      // reputation for being in the way. So the owner's word stands, and the audit line says
      // out loud that it stood alone. Keepers still need each other.
      const activeKeepers = rows.filter((r) => r.active && r.is_keeper).length;
      const owner = who.user?.role === 'admin';
      if (activeKeepers <= 1 || owner) {
        const done = await applyChange(base44, draft, who, activeKeepers <= 1 ? 'solo' : 'owner');
        if (!done.ok) return Response.json({ error: done.message }, { status: done.status || 400 });
        return Response.json({ applied: true, solo: activeKeepers <= 1, owner, message: done.message });
      }

      // One ask at a time per person and per change, so a desk cannot fill with duplicates of
      // the same request and nobody has to work out which line to agree to.
      const pending = await base44.asServiceRole.entities[CHANGES].filter(
        { status: 'waiting' },
        { sort: 'created_date', limit: 50 }
      );
      const existing = (pending?.items || pending || []).find(
        (w) =>
          w.change === change &&
          ((draft.target_row_id && w.target_row_id === draft.target_row_id) ||
            (draft.target_email && lower(w.target_email) === draft.target_email))
      );
      if (existing) {
        return Response.json({
          applied: false,
          waiting: true,
          message: `Already asked. ${existing.requested_by_name || existing.requested_by} is waiting for a second keeper to agree.`,
        });
      }

      const created = await base44.asServiceRole.entities[CHANGES].create(draft);
      return Response.json({
        applied: false,
        waiting: true,
        id: created?.id || '',
        message:
          'Asked. Nothing has changed yet — a second keeper has to agree before anybody gains or loses access.',
      });
    }

    // ── THE SECOND KEY ──────────────────────────────────────────────────────────
    if (action === 'confirm') {
      const changeId = String(body?.change_id || '');
      if (!changeId) return Response.json({ error: 'Missing change_id' }, { status: 400 });

      const rec = await base44.asServiceRole.entities[CHANGES]
        .get(changeId)
        .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
      if (!rec) return Response.json({ error: 'That request is no longer here.' }, { status: 404 });
      if (rec.status !== 'waiting') {
        return Response.json({ error: 'That request has already been settled.' }, { status: 409 });
      }

      // The heart of it: the hand that asked may never be the hand that agrees.
      if (lower(rec.requested_by) === me) {
        return Response.json(
          { error: 'A second keeper has to agree to this. You cannot confirm your own request.' },
          { status: 403 }
        );
      }

      const done = await applyChange(base44, rec, who, 'second');
      if (!done.ok) {
        // A refusal is kept as a line rather than deleted: a change that could not happen is
        // still part of what was considered.
        await base44.asServiceRole.entities[CHANGES]
          .update(changeId, { status: 'cancelled', confirmed_by: who.user?.email || '' })
          .catch(() => {});
        return Response.json({ error: done.message }, { status: done.status || 400 });
      }

      await base44.asServiceRole.entities[CHANGES]
        .update(changeId, {
          status: 'applied',
          confirmed_by: who.user?.email || '',
          applied_at: new Date().toISOString(),
        })
        .catch(() => {});

      return Response.json({ applied: true, message: done.message });
    }

    // ── WITHDRAWING ─────────────────────────────────────────────────────────────
    if (action === 'cancel') {
      const changeId = String(body?.change_id || '');
      if (!changeId) return Response.json({ error: 'Missing change_id' }, { status: 400 });

      const rec = await base44.asServiceRole.entities[CHANGES]
        .get(changeId)
        .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
      if (!rec) return Response.json({ error: 'That request is no longer here.' }, { status: 404 });
      if (rec.status !== 'waiting') {
        return Response.json({ error: 'That request has already been settled.' }, { status: 409 });
      }

      await base44.asServiceRole.entities[CHANGES]
        .update(changeId, { status: 'cancelled', confirmed_by: who.user?.email || '' });
      return Response.json({ cancelled: true, message: 'Withdrawn. Nothing was changed, and the line stays on the record as withdrawn.' });
    }

    // ── SENDING THE LETTER AGAIN ────────────────────────────────────────────────
    // A letter that failed had no way back: the line said "told" whether or not it had been,
    // and the only cure was to take the person off and add them again — which would have
    // thrown away their notes. So the line can be re-sent from the list, and nothing else
    // about the person changes when it is.
    if (action === 'notice') {
      const id = String(body?.row_id || '');
      if (!id) return Response.json({ error: 'Missing row_id' }, { status: 400 });
      const row = await base44.asServiceRole.entities[ROSTER]
        .get(id)
        .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
      if (!row) return Response.json({ error: 'That person is no longer on the list.' }, { status: 404 });

      // The sign-in invitation is offered again too, because a person whose invitation never
      // went cannot get in at all, and the letter alone would not mend that.
      let signIn = true;
      try {
        await base44.users.inviteUser(row.email, 'user');
      } catch (e) {
        signIn = false;
        console.error('climateAccessChange: sign-in invite failed:', e?.message);
      }

      const told = await tell(base44, {
        email: row.email,
        name: row.name || row.email,
        state: row.active ? 'invited' : 'paused',
        person_letter: true,
        row_id: row.id,
      });
      await markNotice(base44, row.id, told);
      return Response.json({
        sent: told.sent,
        sign_in_invited: signIn,
        message: [
          told.sent ? `The letter has gone out again to ${row.email}.` : `The letter did not go${told.why ? `: ${told.why}` : '.'}`,
          signIn ? 'The sign-in invitation is on its way too.' : 'The sign-in invitation did not go either — try again in a little while.',
        ].join(' '),
      });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('climateAccessChange failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}