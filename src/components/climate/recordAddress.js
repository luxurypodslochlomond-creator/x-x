// ── THE RECORD'S OWN ADDRESS ──
// A citation is a promise: the address inside it has to resolve — for a reader now, for a
// research panel, for someone quoting the entry in fifty years. So the record never prints
// the address of the room it happens to be standing in while it is being edited: the
// platform's preview frame, or its temporary app address named after the app rather than
// the record. On the record's real home, the reader's own address is used exactly as it is.
//
// The record currently shares uf51.love with the wider family. Change this one line the day
// Janine's own domain is connected — every citation, card and share link follows it.

export const RECORD_HOME = 'https://uf51.love';

// Addresses that are never the record's home: the editor's preview frame, the platform's
// own app address, and a machine only the person building it can reach.
function isTemporary(hostname) {
  return (
    !hostname ||
    hostname.includes('base44.app') ||
    hostname.includes('preview--') ||
    hostname === 'localhost'
  );
}

// Where the record lives, as the reader's browser knows it — or its real home when the
// browser is standing in a temporary room.
export function recordOrigin() {
  if (typeof window === 'undefined') return RECORD_HOME;
  return isTemporary(window.location.hostname) ? RECORD_HOME : window.location.origin;
}

// The address of a page on the record: this page, unless another path is named.
export function recordAddress(path) {
  const where = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  return recordOrigin() + where;
}