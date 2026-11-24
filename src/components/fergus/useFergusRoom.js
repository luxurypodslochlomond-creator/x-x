import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
const STORE = 'fergus-room-code';
const message = error => error?.response?.data?.error || error?.message || 'The room could not be opened.';
export default function useFergusRoom() {
  const [pin, setPin] = useState('');
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [restoring, setRestoring] = useState(!!sessionStorage.getItem(STORE));
  const [saved, setSaved] = useState(false);
  const call = async payload => (await base44.functions.invoke('fergusRoom', payload)).data;
  useEffect(() => {
    const held = sessionStorage.getItem(STORE);
    if (!held) return;
    let active = true;
    call({ pin: held, action: 'read' }).then(data => {
      if (active && data?.notes) { setPin(held); setNotes(data.notes); setOpen(true); }
    }).catch(() => { sessionStorage.removeItem(STORE); }).finally(() => { if (active) setRestoring(false); });
    return () => { active = false; };
  }, []);
  const unlock = async event => {
    event.preventDefault(); if (!pin.trim() || busy) return;
    setBusy(true); setError('');
    try {
      const data = await call({ pin, action: 'read' });
      if (!data?.notes) throw new Error('The room did not open.');
      sessionStorage.setItem(STORE, pin); setNotes(data.notes); setOpen(true);
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  };
  const add = async event => {
    event.preventDefault(); if (!draft.trim() || busy) return;
    setBusy(true); setError(''); setSaved(false);
    try {
      const data = await call({ pin, action: 'add', body: draft, from: 'Dad' });
      if (!data?.notes) throw new Error('The note was not saved.');
      setNotes(data.notes); setDraft(''); setSaved(true);
    } catch (err) { setError(message(err)); } finally { setBusy(false); }
  };
  const lock = () => { sessionStorage.removeItem(STORE); setOpen(false); setPin(''); setNotes([]); setDraft(''); setError(''); setSaved(false); };
  return { pin, setPin, open, notes, draft, setDraft, error, busy, restoring, saved, unlock, add, lock };
}