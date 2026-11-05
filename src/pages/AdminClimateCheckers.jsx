import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { UserPlus, Pause, Play, Trash2, RefreshCw } from 'lucide-react';
import AddKeeper from '@/components/climate/AddKeeper';

// The guest list for checking. Deliberately not the same as admin: a checker reads what is
// waiting and says what they find, and that is all. Making somebody an admin to let them do
// that would hand them every submitter's address and the delete button as well, which is a
// much worse trade than it looks on the day you make it.
export default function AdminClimateCheckers() {
  const [list, setList] = useState([]);
  const [keepers, setKeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const rows = await base44.entities.ClimateChecker.list({ sort: '-created_date', limit: 200 });
    // Keepers are read back here so the desk can show the whole list of people itself.
    const people = await base44.entities.User.list().catch(() => []);
    setList(rows?.items || rows || []);
    setKeepers((people?.items || people || []).filter((p) => p.role === 'admin'));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async () => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) { setMessage('That address does not look right.'); return; }
    setBusy(true);
    setMessage('');
    try {
      const me = await base44.auth.me();
      const created = await base44.entities.ClimateChecker.create({
        email: clean,
        name: name.trim(),
        active: true,
        note: note.trim(),
        added_by: me?.email || '',
      });
      let invited = true;
      try {
        await base44.users.inviteUser(clean, 'user');
      } catch (e) {
        invited = false;
      }
      // Being counted in is written on the record, the same as being counted out.
      await base44.functions
        .invoke('climateCheckerNotice', {
          email: clean,
          name: name.trim(),
          state: 'invited',
          person_letter: !invited,
          row_id: created?.id || '',
        })
        .catch(() => {});
      setMessage(
        invited
          ? `${clean} is on the list and has been sent an invitation.`
          : `${clean} is on the list. They already had an account, so no invitation was needed.`
      );
      setEmail(''); setName(''); setNote('');
      load();
    } catch (e) {
      setMessage(e?.message || 'That did not save.');
    } finally {
      setBusy(false);
    }
  };

  // Pausing or ending someone's access used to happen in silence, which is how an honest
  // record ends up with people wondering whether they did something wrong. The letter goes
  // after the change has actually landed, and a failed letter never undoes the change.
  const tell = (row, state) =>
    base44.functions
      .invoke('climateCheckerNotice', { email: row.email, name: row.name, state })
      .catch(() => {});

  const toggle = async (row) => {
    await base44.entities.ClimateChecker.update(row.id, { active: !row.active });
    tell(row, row.active ? 'paused' : 'restored');
    setMessage(
      row.active
        ? `${row.email} is paused and has been told. Notes they already wrote stay in their name.`
        : `${row.email} can check again and has been told.`
    );
    load();
  };

  const remove = async (row) => {
    await base44.entities.ClimateChecker.delete(row.id);
    tell(row, 'removed');
    setMessage(`${row.email} has ended and has been told. What they wrote stays on the record.`);
    load();
  };

  return (
    <div className="pb-16">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red mb-3">keepers only</p>
        <h1 className="font-black text-record-ink text-2xl leading-tight mb-2">People who check the record</h1>
        <p className="text-sm text-record-ink/75 leading-relaxed mb-6">
          Someone on this list can open entries that are waiting and write a note saying whether each source holds up.
          They cannot publish, edit or delete anything, and they never see a submitter's email address. Only you and the
          other keepers can add or remove names.
        </p>
        {/* The keys, shown here in the desk rather than looked up somewhere else. A keeper
            could always check — the checking door lets them straight in — but that was only
            written in code, so on this page a keeper appeared to be nobody. */}
        <div className="border-2 border-record-ink/25 bg-record-bone p-3 mb-4">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mb-2">
            who holds the keys · {keepers.length}
          </p>
          {keepers.map((k) => (
            <p key={k.id} className="text-[11px] font-mono text-record-ink/85 truncate">{k.full_name || k.email}</p>
          ))}
          <p className="text-[10px] font-mono text-record-muted mt-2 leading-relaxed">
            A keeper publishes, corrects, signs, adds people — and can always check. They are added once, above;
            they never need a line on the checker list as well.
          </p>
        </div>

        <div className="bg-record-bone border-2 border-record-ink/20 p-4 mb-8">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mb-3">add a checker</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="their email address"
            inputMode="email"
            className="w-full min-h-[44px] px-3 mb-2 text-[13px] font-mono bg-record-paper border-2 border-record-ink/25 text-record-ink"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="their name, as their notes will be signed"
            className="w-full min-h-[44px] px-3 mb-2 text-[13px] font-mono bg-record-paper border-2 border-record-ink/25 text-record-ink"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="why (optional), e.g. Trebuchet volunteer"
            className="w-full min-h-[44px] px-3 mb-3 text-[13px] font-mono bg-record-paper border-2 border-record-ink/25 text-record-ink"
          />
          <button
            onClick={add}
            disabled={busy}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-record-ink text-record-paper text-[10px] font-black font-mono uppercase tracking-[0.2em] disabled:opacity-40"
          >
            <UserPlus className="w-4 h-4" /> {busy ? 'adding' : 'add and invite'}
          </button>
          {message && <p className="text-[11px] font-mono text-record-ink/80 mt-3 leading-relaxed">{message}</p>}
        </div>

        <AddKeeper onAdded={load} />

        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink">
            on the list · {list.length}
          </p>
          <button onClick={load} className="text-[10px] font-mono uppercase text-record-muted inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> refresh
          </button>
        </div>

        {loading && <p className="text-[11px] font-mono text-record-muted">loading</p>}

        {!loading && !list.length && (
          <p className="text-[12px] text-record-ink/70 leading-relaxed border-2 border-record-ink/15 bg-record-bone p-4">
            Nobody yet. Add the first checker above and they will get an email with a link to set their password.
          </p>
        )}

        <div className="space-y-2">
          {list.map((row) => (
            <div key={row.id} className="bg-record-bone border-2 border-record-ink/20 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[12px] font-black text-record-ink truncate">{row.name || row.email}</p>
                  <p className="text-[10px] font-mono text-record-muted truncate">{row.email}</p>
                  {row.note && <p className="text-[10px] font-mono text-record-muted truncate">{row.note}</p>}
                </div>
                <span
                  className="text-[9px] font-mono font-black uppercase px-2 py-1 border flex-shrink-0"
                  style={{
                    color: row.active ? '#1e3a2b' : '#b3261e',
                    borderColor: row.active ? 'rgba(30,58,43,0.4)' : 'rgba(179,38,30,0.4)',
                  }}
                >
                  {row.active ? 'checking' : 'paused'}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggle(row)}
                  className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 border-2 border-record-ink/30 text-[9px] font-black font-mono uppercase text-record-ink"
                >
                  {row.active ? <><Pause className="w-3 h-3" /> pause</> : <><Play className="w-3 h-3" /> restore</>}
                </button>
                <button
                  onClick={() => remove(row)}
                  className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 border-2 border-record-red/40 text-[9px] font-black font-mono uppercase text-record-red"
                >
                  <Trash2 className="w-3 h-3" /> remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-mono text-record-muted leading-relaxed mt-8 border-t border-record-ink/15 pt-4">
          Pausing or removing ends access immediately. Notes they already wrote stay on the record and stay in their
          name, because the checking they did was real whether or not they can check tomorrow.
        </p>
      </div>
    </div>
  );
}