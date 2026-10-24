// ── THE RECORD'S OWN STAMP ──────────────────────────────────────────────────────
// A track's date is not a field anyone fills in, and it is not rounded to a month to
// look tidier. It is the moment the record itself took the master in, and it is the
// same stamp for every track that arrives — which is what lets anyone reading the page
// check that tracks stand in the order they were given, the only order the page
// promises. Nothing typed in, nothing guessed: with no stamp, no date is printed.
export function givenStamp(value, form = 'long') {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', form === 'short'
    ? { day: 'numeric', month: 'short', year: 'numeric' }
    : { day: 'numeric', month: 'long', year: 'numeric' });
}