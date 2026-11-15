import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { LANGS } from '@/components/climate/useClimateLanguage';
import { HAND_WRITTEN } from '@/pages/TogetherChangeClimate';

// ── ONE PLACE WHERE THE RECORD COUNTS ITSELF ─────────────────────────────────────
// This module exists because of a real fault, found on 15 November 2026: the two pages
// that go to an institution — the brief and the summary — printed figures typed into the
// source. They were true the week they were typed and then quietly stopped being true.
// By the time anyone looked, the summary told Yale there were 44 seals when the record
// held 93, that the interface spoke 65 tongues when it spoke 97, and that 14 of 19 entries
// carried no statement of how well they are known when only 4 did. Every one of those was
// wrong in the same way: a number that was true once, printed as though it still was.
//
// Worse than any single figure was what the pages said about themselves. The summary ended
// with "Every figure here was counted from the record", and that sentence was false. A
// record whose whole argument is that nothing has to be taken on trust cannot print a
// flattering sentence about its own arithmetic that its own arithmetic does not support.
//
// So there are two rules here, and both are the point.
//
// THE FIRST: nothing is typed. Every count below is asked of the database at the moment a
// reader opens the page. Tongues are counted from the list the interface actually serves,
// and the hand-written ones from the dictionaries that actually exist, so those two cannot
// drift from the code without the code saying so.
//
// THE SECOND, and the harder one: when a count cannot be made, this returns null and the
// page prints a dash. It does not fall back to the last number anyone wrote down. An old
// figure presented as a current one is exactly the thing this record was built to refuse,
// and falling back to it would make the page a brochure with a straight face. A dash is
// ugly and it is true. Ugly and true is the job.

export const TONGUES = LANGS.length;
export const HAND_WRITTEN_TONGUES = HAND_WRITTEN.length;

// A failing count is not an error to be papered over — it is a fact about what we know
// right now, and the honest thing to do with it is carry it to the page as an absence.
const counted = (entity, query = {}) =>
  base44.entities[entity].count(query).catch(() => null);

// The gaps are counted from the entries themselves rather than from a note in the source,
// because a gap that is described in prose is a gap that will be described wrongly within
// a month. Nineteen entries is one page of reading; the whole record is walked here.
const walked = (entity, query, measure) =>
  base44.entities[entity]
    .filter(query, { limit: 500 })
    .then((page) => {
      const rows = page?.items ?? page ?? [];
      return measure(rows);
    })
    .catch(() => null);

export async function readRecordFigures() {
  const [
    solutions,
    crises,
    seals,
    wire,
    actions,
    categories,
    facets,
    groups,
    entries,
  ] = await Promise.all([
    counted('ClimateSolution', { entry_type: 'solution', status: 'published' }),
    counted('ClimateSolution', { entry_type: 'climate_crisis', status: 'published' }),
    counted('ClimateSeal', {}),
    counted('ClimateNews', { status: 'published' }),
    counted('ClimateAction', { status: 'published' }),
    counted('ClimateCategory', {}),
    base44.functions
      .invoke('climateRecordFacets', {})
      .then((r) => r?.data || null)
      .catch(() => null),
    walked('ClimateGroup', { status: 'published' }, (rows) => ({
      total: rows.length,
      noContact: rows.filter((r) => !r.contact_email).length,
    })),
    walked('ClimateSolution', { status: 'published' }, (rows) => ({
      total: rows.length,
      noVerification: rows.filter((r) => !r.verification).length,
      unsigned: rows.filter((r) => !r.editor).length,
    })),
  ]);

  return {
    // The two entry types are counted separately and added here, so the total can never
    // disagree with the halves printed beside it.
    entries: solutions == null || crises == null ? null : solutions + crises,
    solutions,
    crises,
    seals,
    wire,
    actions,
    groups: groups?.total ?? null,
    groupsNoContact: groups?.noContact ?? null,
    categoriesTotal: categories,
    // Categories carrying an entry, and countries represented, are counted on the server:
    // the record no longer hands out the address a submitter gave, and a field held back
    // that way also stops a browser counting distinct values for itself.
    categoriesUsed: facets?.categories ?? null,
    locations: facets?.countries ?? null,
    unsigned: entries?.unsigned ?? null,
    noVerification: entries?.noVerification ?? null,
    // These two are not counted at all — they are read from the code that serves them.
    tongues: TONGUES,
    handWritten: HAND_WRITTEN_TONGUES,
  };
}

// `undefined` means "not asked yet" (the page has just opened) and `null` means "asked, and
// no answer came back". Both print the same thing, because a reader needs neither to know
// which. What they must never get is a number from last month wearing today's date.
export function show(n) {
  return typeof n === 'number' && Number.isFinite(n) ? String(n) : '—';
}

export function useRecordFigures() {
  const [figures, setFigures] = useState(null);
  useEffect(() => {
    let alive = true;
    readRecordFigures().then((f) => {
      if (alive) setFigures(f);
    });
    return () => {
      alive = false;
    };
  }, []);
  return figures;
}