// Who may check the record. One answer, used by every function that asks, because two
// copies of a rule like this drift apart and the looser one always wins in the end.
//
// A keeper (admin) may always check. Anyone else must be on the guest list, switched on,
// under the exact address they signed in with. The list is read with the service role
// because it is not the checker's to read back: they find out whether they are on it by
// being let in or not, and never see who else is.
export async function resolveChecker(base44) {
  const user = await base44.auth
    .me()
    .catch((e) => (e.status === 401 ? null : Promise.reject(e)));
  if (!user) return { error: 'Unauthorized', status: 401 };

  if (user.role === 'admin') {
    return { user, name: user.full_name || user.email };
  }

  const rows = await base44.asServiceRole.entities.ClimateChecker.filter({
    email: user.email,
    active: true,
  });
  const list = rows?.items || rows || [];
  if (!list.length) return { error: 'Not a checker on this record', status: 403 };

  return { user, name: list[0].name || user.full_name || user.email };
}