import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, CheckCircle, XCircle, Edit, Send, Brain } from 'lucide-react';

/**
 * SCOTT EMAIL DRAFTER - AI writes → Scott approves → Auto-sends
 * 
 * Use cases:
 * - Session requests (find producer contact → draft email)
 * - Gig confirmations
 * - Follow-ups
 * - General outreach
 * 
 * YES = Send it / NO = Edit first
 * 
 * Scott's vision: Notification with drafted email → YES or NO ♾️❤️♾️
 */

export default function ScottEmailDrafter() {
  const [purpose, setPurpose] = useState('');
  const [recipient, setRecipient] = useState('');
  const [context, setContext] = useState('');
  const [draftedEmail, setDraftedEmail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const queryClient = useQueryClient();

  const draftEmail = useMutation({
    mutationFn: async ({ purpose, recipient, context }) => {
      const draft = await base44.integrations.Core.InvokeLLM({
        prompt: `Draft a professional music industry email for Scott (manager):

PURPOSE: ${purpose}
TO: ${recipient}
CONTEXT: ${context || 'None provided'}

Write a SHORT, professional email (2-3 paragraphs max).
- Clear subject line
- Friendly but professional tone
- Get to the point quickly
- Scott's tone: direct, no bullshit, respectful

Return JSON with 'subject' and 'body'.`,
        response_json_schema: {
          type: "object",
          properties: {
            subject: { type: "string" },
            body: { type: "string" }
          }
        }
      });

      return draft;
    },
    onSuccess: (data) => {
      setDraftedEmail(data);
      setEditedSubject(data.subject);
      setEditedBody(data.body);
    }
  });

  const sendEmail = useMutation({
    mutationFn: async ({ to, subject, body }) => {
      await base44.integrations.Core.SendEmail({
        to,
        subject,
        body,
        from_name: 'Scott (Co-Manager51)'
      });
    },
    onSuccess: () => {
      // Reset
      setPurpose('');
      setRecipient('');
      setContext('');
      setDraftedEmail(null);
      setIsEditing(false);
    }
  });

  const handleDraft = () => {
    if (!purpose || !recipient) return;
    draftEmail.mutate({ purpose, recipient, context });
  };

  const handleYes = () => {
    sendEmail.mutate({
      to: recipient,
      subject: isEditing ? editedSubject : draftedEmail.subject,
      body: isEditing ? editedBody : draftedEmail.body
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftedEmail(null);
    setIsEditing(false);
  };

  if (sendEmail.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <p className="text-green-400 text-2xl font-black font-mono mb-2">EMAIL SENT ✓</p>
        <p className="text-gray-300 text-sm font-mono mb-6">To: {recipient}</p>
        <Button
          onClick={() => sendEmail.reset()}
          className="bg-cyan-600 hover:bg-cyan-700 font-bold"
        >
          DRAFT ANOTHER
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-black text-white font-mono">EMAIL DRAFTER</h2>
            <p className="text-purple-300 text-sm font-mono">AI writes → You approve</p>
          </div>
        </div>
      </div>

      {!draftedEmail ? (
        <>
          {/* INPUT FORM */}
          <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 space-y-4">
            
            <div>
              <label className="text-cyan-400 text-sm font-bold font-mono mb-2 block">PURPOSE:</label>
              <Input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Book studio session / Confirm gig / Follow up on meeting"
                className="bg-gray-900 border-cyan-500/30 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-cyan-400 text-sm font-bold font-mono mb-2 block">TO:</label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="producer@email.com / manager@label.com"
                className="bg-gray-900 border-cyan-500/30 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm font-bold font-mono mb-2 block">CONTEXT (optional):</label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Artist name, date preferences, budget, previous contact, etc"
                className="bg-gray-900 border-gray-500/30 text-white font-mono"
                rows={3}
              />
            </div>

            <Button
              onClick={handleDraft}
              disabled={!purpose || !recipient || draftEmail.isPending}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black py-6 text-lg"
            >
              {draftEmail.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  AI51 WRITING...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  DRAFT EMAIL
                </>
              )}
            </Button>
          </div>

          {/* EXAMPLES */}
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-400 text-xs font-bold mb-2">QUICK EXAMPLES:</p>
            <div className="space-y-2">
              <Button
                onClick={() => {
                  setPurpose('Book studio session');
                  setContext('Artist needs producer for 3 days, budget £1500');
                }}
                className="w-full text-left bg-black/40 border border-amber-500/30 text-amber-300 text-xs font-mono hover:bg-amber-900/20"
              >
                Book studio session
              </Button>
              <Button
                onClick={() => {
                  setPurpose('Confirm gig offer');
                  setContext('Glasgow O2 Academy, March 15th, £2k guarantee');
                }}
                className="w-full text-left bg-black/40 border border-green-500/30 text-green-300 text-xs font-mono hover:bg-green-900/20"
              >
                Confirm gig
              </Button>
              <Button
                onClick={() => {
                  setPurpose('Follow up on meeting');
                  setContext('Met last week about signing, checking interest');
                }}
                className="w-full text-left bg-black/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono hover:bg-cyan-900/20"
              >
                Follow up
              </Button>
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
            {/* DRAFTED EMAIL */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border-4 border-cyan-500 rounded-xl p-6">
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-bold text-sm font-mono">DRAFTED EMAIL</span>
                </div>
                {!isEditing && (
                  <Button
                    onClick={handleEdit}
                    className="bg-amber-600 hover:bg-amber-700 text-xs font-bold"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    EDIT
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-cyan-400 text-xs font-bold font-mono mb-1 block">SUBJECT:</label>
                    <Input
                      value={editedSubject}
                      onChange={(e) => setEditedSubject(e.target.value)}
                      className="bg-black/60 border-cyan-500/50 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-400 text-xs font-bold font-mono mb-1 block">BODY:</label>
                    <Textarea
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      className="bg-black/60 border-cyan-500/50 text-white font-mono"
                      rows={12}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4">
                  <p className="text-cyan-400 text-sm font-bold font-mono mb-2">Subject:</p>
                  <p className="text-white font-mono mb-4">{draftedEmail.subject}</p>
                  
                  <p className="text-cyan-400 text-sm font-bold font-mono mb-2">Body:</p>
                  <pre className="text-white font-mono text-sm whitespace-pre-wrap">{draftedEmail.body}</pre>
                </div>
              )}

            </div>

            {/* BIG YES/NO */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleYes}
                disabled={sendEmail.isPending}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-xl py-12 rounded-xl"
                style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
              >
                {sendEmail.isPending ? (
                  <Loader2 className="w-10 h-10 animate-spin mb-2" />
                ) : (
                  <>
                    <Send className="w-10 h-10 mb-2" />
                    <span className="block">SEND IT</span>
                  </>
                )}
              </Button>

              <Button
                onClick={handleCancel}
                disabled={sendEmail.isPending}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-black text-xl py-12 rounded-xl"
              >
                <XCircle className="w-10 h-10 mb-2" />
                <span className="block">CANCEL</span>
              </Button>
            </div>

          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
}