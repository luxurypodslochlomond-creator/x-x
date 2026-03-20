import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, Trash2, Check, CheckCircle2, Circle, Loader2, Sparkles, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryColors = {
  gig_offer: 'border-green-500/30 bg-green-950/20 text-green-400',
  payment_chase: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
  info_request: 'border-blue-500/30 bg-blue-950/20 text-blue-400',
  admin: 'border-purple-500/30 bg-purple-950/20 text-purple-400',
  noise: 'border-gray-500/30 bg-gray-950/20 text-gray-400'
};

const urgencyColors = {
  urgent: 'text-red-400',
  normal: 'text-gray-400',
  low: 'text-blue-400'
};

export default function CB51MessageInbox() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [showAddMsg, setShowAddMsg] = useState(false);
  const [newMessage, setNewMessage] = useState({
    raw_message: '',
    from_contact: '',
    category: 'info_request',
    urgency: 'normal'
  });

  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', artistId],
    queryFn: () => artistId ? base44.entities.CB51Message.filter({ artist_id: artistId }) : [],
    enabled: !!artistId
  });

  const createMsgMutation = useMutation({
    mutationFn: (msgData) => base44.entities.CB51Message.create(msgData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setNewMessage({ raw_message: '', from_contact: '', category: 'info_request', urgency: 'normal' });
      setShowAddMsg(false);
    }
  });

  const updateMsgMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.CB51Message.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] })
  });

  const deleteMsgMutation = useMutation({
    mutationFn: (id) => base44.entities.CB51Message.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] })
  });

  const handleAddMessage = () => {
    if (!newMessage.raw_message.trim()) return;
    createMsgMutation.mutate({
      ...newMessage,
      artist_id: artistId,
      status: 'pending'
    });
  };

  const pending = messages.filter(m => m.status === 'pending');
  const responded = messages.filter(m => m.status === 'responded');
  const ignored = messages.filter(m => m.status === 'ignored');

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-green-400 transition-all mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-bold font-mono">BACK</span>
      </button>

      <h1 className="text-3xl font-black text-green-400 font-mono mb-4">INBOX</h1>

      {showAddMsg && (
        <div className="bg-black border border-green-500/30 rounded p-4 mb-4 space-y-3">
          <textarea
            placeholder="Paste message here…"
            value={newMessage.raw_message}
            onChange={(e) => setNewMessage({...newMessage, raw_message: e.target.value})}
            className="w-full bg-black border border-gray-700 text-white px-3 py-2 font-mono text-sm h-24 resize-none"
          />
          <input
            type="text"
            placeholder="From (contact name/email)"
            value={newMessage.from_contact}
            onChange={(e) => setNewMessage({...newMessage, from_contact: e.target.value})}
            className="w-full bg-black border border-gray-700 text-white px-3 py-2 font-mono text-sm"
          />
          <div className="flex gap-2">
            <select
              value={newMessage.category}
              onChange={(e) => setNewMessage({...newMessage, category: e.target.value})}
              className="flex-1 bg-black border border-gray-700 text-white px-3 py-2 font-mono text-sm"
            >
              <option value="gig_offer">Gig Offer</option>
              <option value="payment_chase">Payment Chase</option>
              <option value="info_request">Info Request</option>
              <option value="admin">Admin</option>
              <option value="noise">Noise</option>
            </select>
            <select
              value={newMessage.urgency}
              onChange={(e) => setNewMessage({...newMessage, urgency: e.target.value})}
              className="flex-1 bg-black border border-gray-700 text-white px-3 py-2 font-mono text-sm"
            >
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowAddMsg(false)} className="flex-1 border border-gray-700 hover:border-gray-500 px-3 py-2 text-gray-400 font-mono text-xs uppercase">Cancel</button>
            <button onClick={handleAddMessage} className="flex-1 bg-green-600 hover:bg-green-700 px-3 py-2 text-white font-mono text-xs uppercase">Save</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowAddMsg(!showAddMsg)} className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded mb-4 flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> ADD MESSAGE
      </button>

      {/* PENDING */}
      {pending.length > 0 && (
        <div className="space-y-2 mb-6">
          <h2 className="text-green-400 font-mono font-bold text-xs uppercase tracking-wider">Pending ({pending.length})</h2>
          {pending.map(msg => (
            <motion.div key={msg.id} layout className="bg-black border border-gray-800 rounded overflow-hidden">
              <button
                onClick={() => setSelectedMsg(selectedMsg?.id === msg.id ? null : msg)}
                className="w-full p-3 flex items-start justify-between hover:bg-green-500/10 transition-all text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${categoryColors[msg.category]}`}>
                      {msg.category.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${urgencyColors[msg.urgency]}`}>
                      {msg.urgency.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm truncate">{msg.summary || msg.from_contact || 'Unknown'}</p>
                  <p className="text-gray-600 text-xs font-mono truncate">{msg.raw_message.substring(0, 60)}</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <Circle className="w-4 h-4 text-green-500" />
                </div>
              </button>

              {selectedMsg?.id === msg.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-800 bg-black/60 p-4 space-y-3 text-sm"
                >
                  {msg.from_contact && <p className="text-gray-400"><span className="text-green-400 font-bold">FROM:</span> {msg.from_contact}</p>}
                  {msg.intent && <p className="text-gray-400"><span className="text-green-400 font-bold">INTENT:</span> {msg.intent}</p>}
                  <div><span className="text-green-400 font-bold">MESSAGE:</span><p className="text-gray-300 mt-1 whitespace-pre-wrap">{msg.raw_message}</p></div>
                  {msg.draft_response && (
                    <div><span className="text-cyan-400 font-bold">AI DRAFT:</span><p className="text-gray-300 mt-1 bg-black/40 border border-cyan-500/20 rounded p-2">{msg.draft_response}</p></div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => updateMsgMutation.mutate({ id: msg.id, data: { status: 'responded' } })}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark Responded
                    </button>
                    <button
                      onClick={() => deleteMsgMutation.mutate(msg.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-xs font-bold"
                    >
                      <Trash2 className="w-3 h-3 inline mr-1" /> Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* RESPONDED */}
      {responded.length > 0 && (
        <div className="space-y-2 mb-6 opacity-60">
          <h2 className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider">Responded ({responded.length})</h2>
          {responded.map(msg => (
            <div key={msg.id} className="bg-black border border-gray-800 rounded p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-sm truncate">{msg.summary || msg.from_contact}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {messages.length === 0 && (
        <div className="text-center py-12 text-gray-600 font-mono">No messages yet</div>
      )}
    </div>
  );
}