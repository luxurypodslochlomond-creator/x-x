// Called only after requireKeeper and an active roster row have been checked.
const reasonOf = (e) => String(e?.response?.data?.error || e?.response?.data?.message || e?.data?.error || e?.message || 'The email service did not accept this request.').slice(0, 300);

export async function sendCheckerInvitation(base44, row, { retryOnly = false, notifyKeepers = false } = {}) {
  const patch = {};
  let signIn = Boolean(row.sign_in_sent_at) && !row.sign_in_error;
  let signInError = row.sign_in_error || '';
  let notice = Boolean(row.notice_sent_at) && !row.notice_error;
  let noticeError = row.notice_error || '';

  if (!row.joined_at && (!retryOnly || !signIn)) {
    try {
      const result = await base44.users.inviteUser(row.email, 'user');
      const data = result?.data || result;
      if (data?.success === false || data?.error) throw new Error(data.error || data.message || 'The sign-in invitation was not accepted.');
      signIn = true;
      signInError = '';
      patch.sign_in_sent_at = new Date().toISOString();
    } catch (e) {
      signIn = false;
      signInError = reasonOf(e);
      console.error('checkerInvitation: sign-in invitation refused', signInError);
    }
    patch.sign_in_error = signInError;
  }

  if (!retryOnly || !notice) {
    try {
      const response = await base44.functions.invoke('climateCheckerNotice', {
        email: row.email, name: row.name, row_id: row.id,
        state: 'invited', person_letter: true, notify_keepers: notifyKeepers,
      });
      const data = response?.data;
      if (data?.sent !== true || data?.error) throw new Error(data?.error || 'The welcome email was not accepted.');
      notice = true;
      noticeError = '';
      patch.notice_sent_at = new Date().toISOString();
    } catch (e) {
      notice = false;
      noticeError = reasonOf(e);
      console.error('checkerInvitation: welcome email refused', noticeError);
    }
    patch.notice_error = noticeError;
  }

  // Do not erase a previous accepted-send timestamp when a later send fails.
  if (Object.keys(patch).length) await base44.asServiceRole.entities.ClimateChecker.update(row.id, patch);
  const complete = (Boolean(row.joined_at) || signIn) && notice;
  const message = complete
    ? 'Email requests accepted. Inbox delivery is not confirmed here.'
    : `Access is saved. ${signInError ? `Sign-in email: ${signInError} ` : ''}${noticeError ? `Welcome email: ${noticeError}` : ''} Use the invite button beside their name to retry the missing email.`;
  return { sign_in_invited: signIn, notice_sent: notice, complete, message };
}