// Called only after keeper authorisation and an active roster row have been checked.
const reasonOf = (error) => {
  const data = error?.response?.data || error?.data || error;
  const reason = data?.error || data?.detail || data?.message || error?.message;
  return (typeof reason === 'string' ? reason : reason ? JSON.stringify(reason) : 'The email service did not accept this request.').slice(0, 400);
};

export async function sendCheckerInvitation(base44, row) {
  // One recipient email per click. New arrivals get the platform invitation (which
  // includes sign-in and the console). People already signed in get a record reminder.
  // An optional second letter must never turn an accepted invitation into a failure.
  const joined = Boolean(row.joined_at);
  const sentField = joined ? 'notice_sent_at' : 'sign_in_sent_at';
  const errorField = joined ? 'notice_error' : 'sign_in_error';
  let accepted = false;
  let error = '';
  try {
    const response = joined
      ? await base44.functions.invoke('climateCheckerNotice', {
          email: row.email, name: row.name, row_id: row.id,
          state: 'invited', person_letter: true, notify_keepers: false,
        })
      : await base44.users.inviteUser(row.email, 'user');
    const data = response?.data || response;
    if (data?.success === false || data?.error || (joined && data?.sent !== true)) throw new Error(reasonOf(data));
    accepted = true;
  } catch (failure) {
    error = reasonOf(failure);
    console.error('checkerInvitation: email refused', error);
  }
  const patch = { [errorField]: error, ...(accepted ? { [sentField]: new Date().toISOString() } : {}) };
  let statusSaved = true;
  try {
    await base44.asServiceRole.entities.ClimateChecker.update(row.id, patch);
  } catch (failure) {
    statusSaved = false;
    console.error('checkerInvitation: could not save email outcome', reasonOf(failure));
  }
  const message = accepted
    ? `Invitation accepted for sending. Inbox delivery is not confirmed.${statusSaved ? '' : ' The email status could not be saved; refresh before sending again.'}`
    : `Access is saved, but the email was not accepted: ${error} No second email was attempted. You can copy the joining link beside their name.`;
  return { email_accepted: accepted, complete: accepted && statusSaved, status_saved: statusSaved, delivery_channel: joined ? 'record' : 'sign_in', message };
}