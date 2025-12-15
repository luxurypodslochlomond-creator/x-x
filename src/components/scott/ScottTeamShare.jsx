import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Send, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

/**
 * SCOTT TEAM SHARE - Send YES/NO to band members
 * 
 * Scott's problem: 5900 WhatsApp messages = mental
 * Solution: One notification → All 4 band members → YES or NO
 * 
 * Process:
 * 1. Scott gets gig offer or session request
 * 2. Sends YES/NO notification to team
 * 3. Each member responds (YES/NO + optional reason)
 * 4. Scott sees all responses in one place
 * 5. Makes final decision
 * 
 * NO WHATSAPP HELL ♾️❤️♾️
 */

export default function ScottTeamShare({ item, type, onClose }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const queryClient = useQueryClient();

  // Fetch team members
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['scottTeamMembers'],
    queryFn: async () => {
      return await base44.entities.ScottTeamMember.filter({ active: true });
    }
  });

  // Fetch responses if already sent
  const { data: responses = [] } = useQuery({
    queryKey: ['teamResponses', type, item.id],
    queryFn: async () => {
      // Would fetch from ScottTeamResponse entity
      // For now returning empty - you'd create this entity
      return [];
    },
    enabled: sent
  });

  const sendToTeam = useMutation({
    mutationFn: async () => {
      // Create notification for each team member
      const promises = teamMembers.map(member => 
        base44.entities.ScottMessage.create({
          artist_id: null,
          team_member_id: member.id,
          message_text: type === 'gig' 
            ? `GIG OFFER: ${item.venue_name} on ${item.offer_date} - £${item.guarantee || 0}. YES or NO?`
            : `SESSION REQUEST: ${item.title}. YES or NO?`,
          priority: 'urgent',
          category: 'team_decision',
          status: 'pending_response',
          decision_type: type,
          decision_item_id: item.id
        })
      );
      
      await Promise.all(promises);
    },
    onSuccess: () => {
      setSent(true);
      queryClient.invalidateQueries({ queryKey: ['teamResponses'] });
    }
  });

  const handleSend = () => {
    setSending(true);
    sendToTeam.mutate();
  };

  const getResponseSummary = () => {
    const yesCount = responses.filter(r => r.response === 'yes').length;
    const noCount = responses.filter(r => r.response === 'no').length;
    const pending = teamMembers.length - responses.length;
    return { yesCount, noCount, pending };
  };

  const summary = sent ? getResponseSummary() : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-4 border-purple-500 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        
        {!sent ? (
          <>
            {/* SEND TO TEAM */}
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <div>
                <h2 className="text-2xl font-black text-white font-mono">SEND TO TEAM</h2>
                <p className="text-purple-300 text-sm font-mono">All {teamMembers.length} members get YES/NO notification</p>
              </div>
            </div>

            {/* ITEM DETAILS */}
            <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 mb-4">
              {type === 'gig' ? (
                <>
                  <h3 className="text-white text-xl font-bold mb-2">{item.venue_name}</h3>
                  <p className="text-cyan-400 text-sm">📅 {item.offer_date}</p>
                  {item.guarantee && <p className="text-green-400 text-sm">💰 £{item.guarantee}</p>}
                  {item.notes && <p className="text-gray-400 text-sm mt-2">{item.notes}</p>}
                </>
              ) : (
                <>
                  <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                  {item.notes && <p className="text-gray-400 text-sm">{item.notes}</p>}
                </>
              )}
            </div>

            {/* TEAM MEMBERS */}
            <div className="bg-black/60 border-2 border-purple-500 rounded-xl p-4 mb-4">
              <p className="text-purple-400 font-bold mb-3 text-sm">SENDING TO:</p>
              <div className="space-y-2">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-2 text-white text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{member.name}</span>
                    <span className="text-gray-500 text-xs">({member.role})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEND BUTTON */}
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 font-bold"
              >
                CANCEL
              </Button>
              <Button
                onClick={handleSend}
                disabled={sending || teamMembers.length === 0}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-black"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    SEND YES/NO TO ALL
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* RESPONSES */}
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-cyan-400" />
              <div>
                <h2 className="text-2xl font-black text-white font-mono">TEAM RESPONSES</h2>
                <p className="text-cyan-300 text-sm font-mono">
                  {summary.yesCount} YES • {summary.noCount} NO • {summary.pending} Pending
                </p>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-4 text-center">
                <p className="text-green-400 text-3xl font-black">{summary.yesCount}</p>
                <p className="text-green-300 text-xs font-mono">YES</p>
              </div>
              <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4 text-center">
                <p className="text-red-400 text-3xl font-black">{summary.noCount}</p>
                <p className="text-red-300 text-xs font-mono">NO</p>
              </div>
              <div className="bg-amber-900/40 border-2 border-amber-500 rounded-lg p-4 text-center">
                <p className="text-amber-400 text-3xl font-black">{summary.pending}</p>
                <p className="text-amber-300 text-xs font-mono">WAITING</p>
              </div>
            </div>

            {/* INDIVIDUAL RESPONSES */}
            <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 mb-4 space-y-2">
              {teamMembers.map(member => {
                const response = responses.find(r => r.team_member_id === member.id);
                return (
                  <div key={member.id} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                    <span className="text-white text-sm font-mono">{member.name}</span>
                    {response ? (
                      <div className="flex items-center gap-2">
                        {response.response === 'yes' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className={`font-bold text-sm ${response.response === 'yes' ? 'text-green-400' : 'text-red-400'}`}>
                          {response.response.toUpperCase()}
                        </span>
                        {response.reason && (
                          <span className="text-gray-400 text-xs ml-2">({response.reason})</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-mono">Waiting...</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CLOSE */}
            <Button
              onClick={onClose}
              className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold"
            >
              CLOSE
            </Button>
          </>
        )}

      </motion.div>
    </div>
  );
}