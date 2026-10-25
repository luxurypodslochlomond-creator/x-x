import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MessageSquare, Send, Check } from 'lucide-react';


export default function ClimateCommentSection({ entryId, entryType }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [published, setPublished] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!entryId) return;
    let cancelled = false;
    base44.entities.ClimateComment.filter({ entry_id: entryId, status: 'published' })
      .then(r => { if (!cancelled) setComments(r || []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [entryId, refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !content.trim()) {
      setError('Name, email, and comment are all needed.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please give a valid email.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await base44.functions.invoke('climateSubmitReview', {
        type: 'comment',
        data: {
          entry_id: entryId,
          entry_type: entryType,
          author_name: name.trim(),
          author_email: email.trim(),
          content: content.trim(),
        }
      });
      const wentUp = res?.data?.status === 'published';
      setPublished(wentUp);
      if (wentUp) setRefresh(r => r + 1); // it is live — show it without a reload
      setSubmitted(true);
      setName(''); setEmail(''); setContent('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-8 border-t-2 border-[#141210] pt-5">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-[#1e3a2b]" />
        <h3 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
          Comments
        </h3>
        <div className="flex-1 h-px bg-[#141210]/20" />
        <span className="text-[10px] font-black font-mono text-[#1e3a2b]">{comments.length}</span>
      </div>

      {/* Published comments */}
      {loading ? (
        <p className="text-[11px] font-mono text-[#5a5246] py-3">Loading…</p>
      ) : comments.length > 0 ? (
        <div className="space-y-2.5 mb-5">
          {comments.map(c => (
            <div key={c.id} className="bg-[#f7f1e5] border border-[#141210] border-l-4 border-l-[#1e3a2b] p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black font-mono uppercase text-[#141210]">{c.author_name}</span>
                <span className="text-[9px] font-mono text-[#5a5246]">
                  {new Date(c.created_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] font-mono text-[#5a5246] py-3 mb-3">No comments yet — be the first to share.</p>
      )}

      {/* Comment form */}
      {submitted ? (
        <div className="bg-[#1e3a2b] text-[#efe7d6] p-4 border-2 border-[#141210]">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <p className="text-[12px] font-black font-mono uppercase">
              {published ? 'Thank you — your comment is on the record.' : 'Thank you — a person will check this one first.'}
            </p>
          </div>
          <p className="text-[10px] font-mono text-[#efe7d6]/80 mt-2 leading-relaxed">
            {published
              ? 'It is up now. Spam is screened automatically, so the information can flow.'
              : 'The spam screen was unsure about this one, so a person reads it before it appears.'}
          </p>
          <button onClick={() => setSubmitted(false)} className="mt-3 text-[10px] font-black font-mono uppercase text-[#e2602a] underline">
            Add another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#f7f1e5] border-2 border-[#141210] p-4">
          <p className="text-[10px] font-mono text-[#5a5246] mb-2 leading-relaxed">
            Your email is required. It is never shown publicly — we use it only to reach you about this comment. Never shared, never sold.
          </p>
          <div className="bg-[#1e3a2b]/5 border-l-4 border-l-[#1e3a2b] p-2 mb-3">
            <p className="text-[10px] font-black font-mono uppercase text-[#1e3a2b] mb-0.5">✓ Spam screened · Information flows</p>
            <p className="text-[10px] font-mono text-[#141210] leading-relaxed">
              Clear comments appear at once. Anything unclear waits for a person.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="bg-[#efe7d6] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="bg-[#efe7d6] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]"
            />
          </div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your knowledge, experience, or question…"
            rows={3}
            className="w-full bg-[#efe7d6] border border-[#141210] px-3 py-2.5 text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none"
          />
          {error && <p className="text-[10px] font-mono text-[#b3261e] mt-2">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Sending…' : 'Post comment'}
          </button>
        </form>
      )}
    </section>
  );
}