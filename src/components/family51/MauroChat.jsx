import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// SORTED AI — helpdesk that's human, not legal.
const SYSTEM_PROMPT = `You are SORTED AI, the helpful side of SORTED. You're here to answer questions about how SORTED works, pricing, access, and support people through their legal worries.

What you do: decode scary letters, help draft replies, guide people through disputes. You're NOT a lawyer — you just help people understand official letters so they feel less alone and more in control.

How to talk: be genuinely kind. If someone sounds panicked, acknowledge it. Use simple words. Don't use legal jargon. Be honest about what SORTED can and can't do. If you don't know something, say it. Point them to family@uf51.love for help.

Pricing: 5 free uses, then £9.99/month (or request 10 free uses if they're in crisis — no judgment, no email needed).

Privacy: processed by AI then immediately deleted. Nothing stored. Nothing sold. Nothing logged.

Keep it short unless they ask something big. Talk like you're texting a friend who's stressed, not like you're writing a legal document.`;

export default function MauroChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "I'm SORTED AI. Ask me anything about how SORTED works, pricing, or if you need help getting access. What's on your mind?" }
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

    const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${history.map(m => `${m.role === 'user' ? 'User' : 'SORTED AI'}: ${m.content}`).join('\n')}\n\nSORTED AI:`;

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
              background: m.role === 'user' ? 'rgba(249,115,22,0.1)' : 'rgba(26,18,8,0.03)',
              border: m.role === 'user' ? '1px solid rgba(249,115,22,0.28)' : '1px solid rgba(26,18,8,0.08)',
              fontSize: 13, color: '#1a1208', lineHeight: 1.55
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: '14px 14px 14px 4px', background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.08)' }}>
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
           placeholder="Ask anything..."
           style={{
             flex: 1, background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.12)',
             borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#1a1208', outline: 'none',
             fontFamily: 'inherit'
           }}
           onFocus={e => e.target.style.background = 'rgba(26,18,8,0.06)'}
           onBlur={e => e.target.style.background = 'rgba(26,18,8,0.03)'}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            padding: '11px 18px', borderRadius: 10, fontSize: 12, fontWeight: 800,
            letterSpacing: '0.06em', border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            background: loading || !input.trim() ? 'rgba(249,115,22,0.15)' : '#f97316',
            color: loading || !input.trim() ? 'rgba(26,18,8,0.35)' : '#000',
            transition: 'all 0.15s', whiteSpace: 'nowrap'
          }}
        >
          SEND
        </button>
        <button
           title="Voice"
           style={{
             padding: '11px 14px', borderRadius: 10, fontSize: 12, border: '1px solid rgba(26,18,8,0.12)',
             background: 'rgba(26,18,8,0.03)', color: 'rgba(26,18,8,0.45)', cursor: 'pointer',
             transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center',
           }}
           onMouseEnter={e => { e.target.style.background = 'rgba(26,18,8,0.06)'; e.target.style.color = 'rgba(26,18,8,0.65)'; }}
           onMouseLeave={e => { e.target.style.background = 'rgba(26,18,8,0.03)'; e.target.style.color = 'rgba(26,18,8,0.45)'; }}
         >
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
             <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
             <line x1="12" y1="19" x2="12" y2="23"/>
             <line x1="8" y1="23" x2="16" y2="23"/>
           </svg>
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