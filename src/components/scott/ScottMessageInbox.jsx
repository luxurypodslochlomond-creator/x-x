import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Loader2, AlertCircle, CheckCircle, Send, Brain, Calendar, User, DollarSign, X } from 'lucide-react';

/**
 * SCOTT MESSAGE INBOX - Unified communication handler
 * 
 * Paste/forward from ANY platform:
 * - WhatsApp (UK/everywhere)
 * - iMessage (USA)
 * - SMS, DMs, emails
 * 
 * AI51 reads → categorizes → creates tasks/gigs/contacts → drafts replies
 * 
 * Stops soul-crushing message overload ♾️❤️♾️
 */

export default function ScottMessageInbox() {
  const [messageInput, setMessageInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const queryClient = useQueryClient();

  const processMessage = useMutation({
    mutationFn: async (rawMessage) => {
      // AI51 analyzes message
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this message for Scott (music manager):

"${rawMessage}"

Categorize and extract:
1. PRIORITY: 🔥 URGENT (gig offers, family, payment issues) / 📋 IMPORTANT (band coordination, deadlines) / 💬 NOISE (memes, banter, FYI)
2. ACTION NEEDED: What does Scott need to do?
3. EXTRACT DATA: Any gig details, dates, money, contacts?
4. DRAFT REPLY: Quick professional response Scott can send (1-2 sentences max)

Be concise. Scott's drowning in messages.`,
        response_json_schema: {
          type: "object",
          properties: {
            priority: { type: "string", enum: ["urgent", "important", "noise"] },
            category: { type: "string" },
            action_needed: { type: "string" },
            gig_offer: { type: "object", properties: {
              venue: { type: "string" },
              date: { type: "string" },
              payment: { type: "number" }
            }},
            contact_info: { type: "object", properties: {
              name: { type: "string" },
              role: { type: "string" }
            }},
            task: { type: "string" },
            draft_reply: { type: "string" },
            summary: { type: "string" }
          }
        }
      });

      // Save to ScottMessage entity
      await base44.entities.ScottMessage.create({
        artist_id: null,
        message_text: rawMessage,
        priority: analysis.priority,
        category: analysis.category,
        ai_summary: analysis.summary,
        action_needed: analysis.action_needed,
        draft_reply: analysis.draft_reply,
        status: 'new'
      });

      // Auto-create gig offer if detected
      if (analysis.gig_offer && analysis.gig_offer.venue) {
        await base44.entities.ScottGigOffer.create({
          artist_id: null,
          venue_name: analysis.gig_offer.venue,
          offer_date: analysis.gig_offer.date || new Date().toISOString().split('T')[0],
          guarantee: analysis.gig_offer.payment || 0,
          notes: `From message: ${analysis.summary}`
        });
      }

      // Auto-create task if action needed
      if (analysis.task) {
        await base44.entities.ScottTask.create({
          artist_id: null,
          title: analysis.task,
          priority: analysis.priority === 'urgent' ? 'urgent' : 'normal',
          status: 'todo',
          notes: `From message: ${rawMessage.slice(0, 100)}...`
        });
      }

      return analysis;
    },
    onSuccess: (data) => {
      setResult(data);
      setIsProcessing(false);
      queryClient.invalidateQueries({ queryKey: ['scottMessages'] });
      queryClient.invalidateQueries({ queryKey: ['scottGigOffers'] });
      queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
    },
    onError: () => {
      setIsProcessing(false);
    }
  });

  const handleProcess = () => {
    if (!messageInput.trim()) return;
    setIsProcessing(true);
    setResult(null);
    processMessage.mutate(messageInput);
  };

  const handleCopyReply = () => {
    if (result?.draft_reply) {
      navigator.clipboard.writeText(result.draft_reply);
    }
  };

  const handleNew = () => {
    setMessageInput('');
    setResult(null);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return { bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500', text: 'text-red-400', emoji: '🔥' };
      case 'important': return { bg: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500', text: 'text-amber-400', emoji: '📋' };
      case 'noise': return { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-500', text: 'text-gray-400', emoji: '💬' };
      default: return { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400', emoji: '📨' };
    }
  };

  return (
    <div className="space-y-4">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-black text-white font-mono">MESSAGE INBOX</h2>
        </div>
        <p className="text-purple-300 text-sm font-mono">Paste from WhatsApp/iMessage/SMS → AI51 handles it</p>
      </div>

      {!result ? (
        <>
          {/* INPUT */}
          <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4">
            <p className="text-cyan-400 text-sm font-bold mb-3 font-mono">Paste message from ANY platform:</p>
            <Textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Paste WhatsApp/iMessage/DM here...

Example:
'Yo Scott, we got an offer for Glasgow O2 Academy on March 15th, £2k guarantee + bar split. You in?'"
              className="bg-gray-900 border-cyan-500/30 text-white min-h-[200px] font-mono text-sm"
            />
            
            <Button
              onClick={handleProcess}
              disabled={!messageInput.trim() || isProcessing}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-black py-6 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  AI51 READING...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  PROCESS MESSAGE
                </>
              )}
            </Button>
          </div>

          {/* HELP */}
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-400 text-xs font-bold mb-2">HOW TO USE:</p>
            <div className="space-y-1 text-xs text-gray-300">
              <p>1. Get message on WhatsApp/iMessage/SMS</p>
              <p>2. Copy or screenshot → paste here</p>
              <p>3. AI51 categorizes + creates gig/task if needed</p>
              <p>4. Copy draft reply → send back</p>
              <p className="text-green-400 font-bold mt-2">Stops message overload. Scott only sees priority ✓</p>
            </div>
          </div>
        </>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* PRIORITY BADGE */}
            <div className={`bg-gradient-to-r ${getPriorityColor(result.priority).bg} border-4 ${getPriorityColor(result.priority).border} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{getPriorityColor(result.priority).emoji}</span>
                  <div>
                    <p className={`text-2xl font-black font-mono ${getPriorityColor(result.priority).text}`}>
                      {result.priority.toUpperCase()}
                    </p>
                    <p className="text-white text-sm font-mono">{result.category}</p>
                  </div>
                </div>
                <Button onClick={handleNew} variant="ghost" className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* SUMMARY */}
              <div className="bg-black/60 border-2 border-white/20 rounded-lg p-4 mb-4">
                <p className="text-white font-bold mb-2 text-sm">AI51 Summary:</p>
                <p className="text-gray-300 text-sm">{result.summary}</p>
              </div>

              {/* ACTION NEEDED */}
              {result.action_needed && (
                <div className="bg-amber-900/40 border-2 border-amber-500 rounded-lg p-4 mb-4">
                  <p className="text-amber-400 font-bold mb-2 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Action Needed:
                  </p>
                  <p className="text-white text-sm">{result.action_needed}</p>
                </div>
              )}

              {/* AUTO-CREATED ITEMS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {result.gig_offer?.venue && (
                  <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <p className="text-green-400 font-bold text-xs">Gig Created ✓</p>
                    </div>
                    <p className="text-white text-xs font-mono">{result.gig_offer.venue}</p>
                    {result.gig_offer.date && (
                      <p className="text-gray-400 text-xs">{result.gig_offer.date}</p>
                    )}
                    {result.gig_offer.payment && (
                      <p className="text-green-400 text-xs font-bold">£{result.gig_offer.payment}</p>
                    )}
                  </div>
                )}

                {result.task && (
                  <div className="bg-cyan-900/40 border-2 border-cyan-500 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <p className="text-cyan-400 font-bold text-xs">Task Created ✓</p>
                    </div>
                    <p className="text-white text-xs">{result.task}</p>
                  </div>
                )}

                {result.contact_info?.name && (
                  <div className="bg-purple-900/40 border-2 border-purple-500 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <p className="text-purple-400 font-bold text-xs">Contact Noted ✓</p>
                    </div>
                    <p className="text-white text-xs font-mono">{result.contact_info.name}</p>
                    {result.contact_info.role && (
                      <p className="text-gray-400 text-xs">{result.contact_info.role}</p>
                    )}
                  </div>
                )}
              </div>

              {/* DRAFT REPLY */}
              {result.draft_reply && (
                <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-4 border-pink-500 rounded-xl p-4">
                  <p className="text-pink-400 font-black mb-3 text-sm flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Draft Reply (Copy & Send):
                  </p>
                  <div className="bg-black/60 border-2 border-pink-500/50 rounded-lg p-3 mb-3">
                    <p className="text-white text-sm font-mono">{result.draft_reply}</p>
                  </div>
                  <Button
                    onClick={handleCopyReply}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold"
                  >
                    COPY REPLY
                  </Button>
                </div>
              )}

              {/* NEW MESSAGE BUTTON */}
              <Button
                onClick={handleNew}
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white font-bold"
              >
                PROCESS ANOTHER MESSAGE
              </Button>
            </div>

          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
}