import React from 'react';
import { Send, Check, MessageSquare } from 'lucide-react';
export default function FergusNotes({ notes, draft, setDraft, error, busy, saved, add }) {
  return <section className="fergus-notes" aria-labelledby="fergus-notes-title">
    <header><span className="fergus-eyebrow"><MessageSquare size={16} /> Kept in the room</span><h1 id="fergus-notes-title">Notes.</h1></header>
    {notes.length ? <ul className="fergus-note-list">{notes.map(note => <li key={note.id}>
      <div><strong>{note.from || 'Dad'}</strong><time>{new Date(note.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</time></div>
      <p>{note.body}</p>
    </li>)}</ul> : <p className="fergus-empty">No notes yet. Anything added below stays here for next time.</p>}
    <form onSubmit={add} className="fergus-note-form">
      <label htmlFor="fergus-note">Leave a note</label>
      <textarea id="fergus-note" rows={4} value={draft} onChange={event => setDraft(event.target.value)} placeholder="What you want him to read next." required />
      <button className="fergus-primary" disabled={busy || !draft.trim()}>{saved ? <Check size={17} /> : <Send size={17} />}{saved ? 'Added' : busy ? 'Saving…' : 'Add it'}</button>
      {error && <p className="fergus-error" role="alert">{error}</p>}
      {saved && <p role="status" className="fergus-saved">The note is saved in the room.</p>}
    </form>
  </section>;
}