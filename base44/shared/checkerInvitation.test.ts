import { describe, expect, it, vi } from 'npm:vitest@1.6.1';
import { sendCheckerInvitation } from './checkerInvitation.ts';

const client = () => ({
  users: { inviteUser: vi.fn().mockResolvedValue({ success: true }) },
  functions: { invoke: vi.fn().mockResolvedValue({ data: { sent: true } }) },
  asServiceRole: { entities: { ClimateChecker: { update: vi.fn().mockResolvedValue({}) } } },
});
const row = { id: 'local-test', email: 'invitation@example.invalid', name: 'Local test' };

describe('single-email checker invitations', () => {
  it('requests one platform invitation, not a second welcome letter', async () => {
    const api = client();
    const result = await sendCheckerInvitation(api, { ...row, notice_error: 'Old optional email failed' });
    expect(result.complete).toBe(true);
    expect(api.users.inviteUser).toHaveBeenCalledTimes(1);
    expect(api.users.inviteUser).toHaveBeenCalledWith(row.email, 'user');
    expect(api.functions.invoke).not.toHaveBeenCalled();
    expect(api.asServiceRole.entities.ClimateChecker.update).toHaveBeenCalledWith(row.id, expect.objectContaining({ sign_in_error: '', sign_in_sent_at: expect.any(String) }));
  });
  it('preserves the real refusal without a second send or erasing earlier acceptance', async () => {
    const api = client();
    api.users.inviteUser.mockRejectedValue({ response: { data: { detail: 'Invitation limit reached' } } });
    const result = await sendCheckerInvitation(api, { ...row, sign_in_sent_at: 'earlier' });
    expect(result.complete).toBe(false);
    expect(result.message).toContain('Invitation limit reached');
    expect(api.functions.invoke).not.toHaveBeenCalled();
    expect(api.asServiceRole.entities.ClimateChecker.update).toHaveBeenCalledWith(row.id, { sign_in_error: 'Invitation limit reached' });
  });
  it('only sends a record reminder to someone already signed in', async () => {
    const api = client();
    const result = await sendCheckerInvitation(api, { ...row, joined_at: 'earlier', sign_in_error: 'old failure' });
    expect(result.complete).toBe(true);
    expect(api.users.inviteUser).not.toHaveBeenCalled();
    expect(api.functions.invoke).toHaveBeenCalledTimes(1);
    expect(result.delivery_channel).toBe('record');
  });
  it('does not claim a rejected reminder was sent', async () => {
    const api = client();
    api.functions.invoke.mockResolvedValue({ data: { sent: false, error: 'Recipient unsubscribed' } });
    const result = await sendCheckerInvitation(api, { ...row, joined_at: 'earlier' });
    expect(result.email_accepted).toBe(false);
    expect(result.message).toContain('Recipient unsubscribed');
  });
  it('distinguishes email acceptance from a status-save failure without retrying', async () => {
    const api = client();
    api.asServiceRole.entities.ClimateChecker.update.mockRejectedValue(new Error('Save unavailable'));
    const result = await sendCheckerInvitation(api, row);
    expect(result.email_accepted).toBe(true);
    expect(result.status_saved).toBe(false);
    expect(result.complete).toBe(false);
    expect(api.users.inviteUser).toHaveBeenCalledTimes(1);
  });
});