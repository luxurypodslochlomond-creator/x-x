// Who may come into the record, and what they may do. One answer, used by every function
// that asks, because two copies of a rule like this drift apart and the looser one always
// wins in the end.
//
// Two kinds of line, one list:
//   a checker — reads what is waiting and writes a note in their own name. Nothing more.
//   a keeper  — the person the record answers to. They may publish or hold back.
//
// Being a keeper of this record is deliberately NOT the same as being an administrator of the
// app. An admin everywhere can read the vault, the finance and the personal paperwork that
// lives in the same building; the founder of the record must hold the record's own keys and
// nothing else. So a roster line is enough for the record, and the app's admin role is only
// accepted because whoever built the record needs to be able to test it.
//
// The list is read with the service role because it is not the reader's to read back: a
// checker finds out whether they are on it by being let in or not, and never sees who else is.
export async function resolveChecker(base44) {
  const user = await base44.auth
    .me()
    .catch((e) => (e.status === 401 ? null : Promise.reject(e)));
  if (!user) return { error: 'Unauthorized', status: 401 };

  const isAdmin = user.role === 'admin';

  // Read the line whether or not it is open today. A paused checker is not a stranger, and
  // telling them the same "not on the list" as someone who never asked is the record being
  // polite about a decision it made — which reads, to the person, as if their work was
  // nothing. So the two answers are different, and the paused one says so.
  const rows = await base44.asServiceRole.entities.ClimateChecker.filter({
    email: user.email,
  });
  const list = rows?.items || rows || [];
  const line = list[0] || null;

  if (line && !line.active && !isAdmin) {
    return { error: 'Your place on this record is paused', status: 403, paused: true };
  }
  if (!line && !isAdmin) return { error: 'Not a checker on this record', status: 403 };

  return {
    user,
    name: line?.name || user.full_name || user.email,
    isKeeper: Boolean(line?.is_keeper) || isAdmin,
    isChecker: true,
  };
}

// The keeper's door. Throws the response a function should return, so a caller cannot
// accidentally carry on after a refusal — the one mistake worth making impossible here.
export async function requireKeeper(base44) {
  const who = await resolveChecker(base44);
  if (who.error) return { error: who.error, status: who.status };
  if (!who.isKeeper) {
    return { error: 'Only the keeper may do that on this record', status: 403 };
  }
  return who;
}