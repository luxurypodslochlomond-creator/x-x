import { base44 } from '@/api/base44Client';

// Who is signed in — asked once, shared by everyone on the page who needs to know.
//
// The record's bar, the keeper's door and the admin gate all want the same answer on the same
// page, and each was asking for it separately: three round trips where one will do. On a phone
// that is the difference between a door that opens and one that looks stuck.
let pending = null;

export function currentUser() {
  if (!pending) {
    pending = base44.auth.me().catch(() => null);
  }
  return pending;
}