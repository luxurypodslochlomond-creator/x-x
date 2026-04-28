import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Mauro — SORTED's AI helpdesk. Friendly, honest, not a team member.
const SYSTEM_PROMPT = `You are SORTED AI, the helpdesk for SORTED — a tool that helps people decode scary legal letters, write replies, and resolve disputes.

Your job: answer questions about how SORTED works, what it can help with, pricing (£9.99/month, 3 free uses, cancel anytime), hardship access (just email family@uf51.love), privacy (nothing stored, nothing logged), and how the AI tools work.

Be warm, direct, and honest. Don't oversell. If someone is in genuine distress, acknowledge it. If you can't answer something, say so clearly and point them to family@uf51.love.

Never pretend to be a lawyer or give specific legal advice yourself — that's what the SORTED tools are for. Encourage them to try the tools.

Keep replies short — 2-4 sentences max unless they ask something complex. No corporate language. Talk like a smart, kind person.`;

export default function MauroChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi — I'm SORTED AI. I can answer questions about how SORTED works, pricing, hardship access, or anything else. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const history = [...messages, userMsg].map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.text
    }));

    const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${history.map(m => `${m.role === 'user' ? 'User' : 'Mauro'}: ${m.content}`).join('\n')}\n\nMauro:`;

    const reply = await base44.integrations.Core.InvokeLLM({ prompt });
    setMessages(prev => [...prev, { role: 'assistant', text: typeof reply === 'string' ? reply : reply?.text || "Sorry, I couldn't get a response. Try emailing family@uf51.love." }]);
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* MESSAGES */}
      <div style={{ maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16, paddingRight: 4 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.role === 'user' ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.06)',
              border: m.role === 'user' ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.1)',
              fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.55
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask Mauro anything..."
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#fff', outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            padding: '11px 18px', borderRadius: 10, fontSize: 12, fontWeight: 800,
            letterSpacing: '0.06em', border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            background: loading || !input.trim() ? 'rgba(249,115,22,0.2)' : '#f97316',
            color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#000',
            transition: 'all 0.15s', whiteSpace: 'nowrap'
          }}
        >
          SEND
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}