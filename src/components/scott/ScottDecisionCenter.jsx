import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Calendar, DollarSign, MessageSquare } from 'lucide-react';

/**
 * SCOTT DECISION CENTER - YES/NO Everything
 * 
 * Big green YES / Big red NO for all decisions
 * - Gig offers
 * - Session requests
 * - Tasks
 * - Email approvals
 * 
 * Scott's original vision: Notifications → Check diary → YES or NO
 * Simple. Fast. Stress-free ♾️❤️♾️
 */

export default function ScottDecisionCenter() {
  const [reasonInput, setReasonInput] = React.useState('');
  const [currentDecision, setCurrentDecision] = React.useState(null);
  const queryClient = useQueryClient();

  // Fetch pending decisions
  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigDecisions'],
    queryFn: async () => {
      const offers = await base44.entities.ScottGigOffer.filter({ status: 'pending' });
      return offers.map(g => ({ ...g, type: 'gig', id: g.id }));
    }
  });

  const { data: pendingTasks = [] } = useQuery({
    queryKey: ['pendingTaskDecisions'],
    queryFn: async () => {
      const tasks = await base44.entities.ScottTask.filter({ status: 'needs_approval' });
      return tasks.map(t => ({ ...t, type: 'task', id: t.id }));
    }
  });

  const allDecisions = [...pendingGigs, ...pendingTasks];

  const handleDecision = useMutation({
    mutationFn: async ({ decision, type, id, reason }) => {
      if (type === 'gig') {
        await base44.entities.ScottGigOffer.update(id, {
          status: decision === 'yes' ? 'confirmed' : 'declined',
          notes: reason || null
        });
      } else if (type === 'task') {
        await base44.entities.ScottTask.update(id, {
          status: decision === 'yes' ? 'in_progress' : 'cancelled',
          notes: reason || null
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigDecisions'] });
      queryClient.invalidateQueries({ queryKey: ['pendingTaskDecisions'] });
      setCurrentDecision(null);
      setReasonInput('');
    }
  });

  const handleYes = (item) => {
    handleDecision.mutate({ decision: 'yes', type: item.type, id: item.id });
  };

  const handleNo = (item) => {
    setCurrentDecision(item);
  };

  const submitNo = () => {
    if (!currentDecision) return;
    handleDecision.mutate({
      decision: 'no',
      type: currentDecision.type,
      id: currentDecision.id,
      reason: reasonInput
    });
  };

  if (allDecisions.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border-2 border-green-500/50 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <p className="text-green-400 font-bold text-lg font-mono">NO DECISIONS PENDING ✓</p>
        <p className="text-gray-400 text-sm font-mono mt-2">All clear bro</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-4 border-amber-500 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-amber-400" />
          <div>
            <h2 className="text-2xl font-black text-white font-mono">DECISION CENTER</h2>
            <p className="text-amber-300 text-sm font-mono">{allDecisions.length} decisions pending</p>
          </div>
        </div>
      </div>

      {/* NO REASON MODAL */}
      <AnimatePresence>
        {currentDecision && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCurrentDecision(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-red-900/80 to-gray-900/80 border-4 border-red-500 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-black text-white font-mono">WHY NOT?</h3>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 font-mono">
                Quick sentence so your team knows:
              </p>

              <Textarea
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder="Already booked that day / Don't like the venue / Need more money / etc"
                className="bg-black/60 border-red-500/50 text-white mb-4 font-mono"
                rows={3}
              />

              <div className="flex gap-3">
                <Button
                  onClick={() => setCurrentDecision(null)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 font-mono font-bold"
                >
                  CANCEL
                </Button>
                <Button
                  onClick={submitNo}
                  className="flex-1 bg-red-600 hover:bg-red-700 font-mono font-bold"
                >
                  DECLINE
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DECISIONS */}
      <div className="space-y-4">
        {allDecisions.map((item) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 border-2 border-cyan-500 rounded-xl p-6"
          >
            
            {/* TYPE BADGE */}
            <div className="flex items-center gap-2 mb-4">
              {item.type === 'gig' ? (
                <>
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-bold text-sm font-mono">GIG OFFER</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-bold text-sm font-mono">TASK</span>
                </>
              )}
            </div>

            {/* CONTENT */}
            <div className="mb-6">
              {item.type === 'gig' ? (
                <>
                  <h3 className="text-white text-xl font-bold mb-2">{item.venue_name}</h3>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>📅 {item.offer_date}</p>
                    {item.guarantee && <p>💰 £{item.guarantee}</p>}
                    {item.notes && <p className="text-gray-400">{item.notes}</p>}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                  {item.notes && <p className="text-gray-400 text-sm">{item.notes}</p>}
                </>
              )}
            </div>

            {/* BIG YES/NO BUTTONS */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleYes(item)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-2xl py-12 rounded-xl"
                style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
              >
                <CheckCircle className="w-12 h-12 mb-2" />
                <span className="block">YES</span>
              </Button>

              <Button
                onClick={() => handleNo(item)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-2xl py-12 rounded-xl"
                style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
              >
                <XCircle className="w-12 h-12 mb-2" />
                <span className="block">NO</span>
              </Button>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}