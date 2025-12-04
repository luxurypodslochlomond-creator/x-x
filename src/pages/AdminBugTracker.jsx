import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Loader2, Wrench, Eye, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function AdminBugTrackerPage() {
  const queryClient = useQueryClient();
  const [fixingBugId, setFixingBugId] = useState(null);
  const [viewingBug, setViewingBug] = useState(null);

  const { data: bugs = [], isLoading } = useQuery({
    queryKey: ['bugReports'],
    queryFn: async () => {
      const allFeedback = await base44.entities.AI51Feedback.list('-created_date', 100);
      return allFeedback.filter(f => f.feedback_type === 'bug');
    }
  });

  const updateBugMutation = useMutation({
    mutationFn: async ({ id, status, ai_fix_notes }) => {
      return await base44.entities.AI51Feedback.update(id, { status, ai_fix_notes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bugReports'] });
    }
  });

  const deleteBugMutation = useMutation({
    mutationFn: async (id) => {
      return await base44.entities.AI51Feedback.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bugReports'] });
    }
  });

  const autoFixBug = async (bug) => {
    setFixingBugId(bug.id);
    
    try {
      const fixSuggestion = await base44.integrations.Core.InvokeLLM({
        prompt: `You're AI51, fixing bugs in the UF51 codebase.

User reported: "${bug.user_message}"
AI's response was: "${bug.ai_response}"

Analyze this bug:
1. Is this a simple fix I can guide Brian through?
2. What file(s) need changing?
3. Exact code changes needed?
4. Is this critical or minor?

If it's simple (CSS, text, logic tweak), provide EXACT fix instructions.
If complex (new features, major refactors), explain what needs doing.

Keep response under 200 words, zero bullshit.`,
        response_json_schema: {
          type: 'object',
          properties: {
            severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
            complexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
            files_affected: { type: 'array', items: { type: 'string' } },
            fix_instructions: { type: 'string' },
            can_auto_fix: { type: 'boolean' }
          }
        }
      });

      await updateBugMutation.mutateAsync({
        id: bug.id,
        status: fixSuggestion.can_auto_fix && fixSuggestion.complexity === 'simple' ? 'resolved' : 'needs_review',
        ai_fix_notes: JSON.stringify(fixSuggestion, null, 2)
      });

      if (fixSuggestion.can_auto_fix && fixSuggestion.complexity === 'simple') {
        // Auto-resolved, don't show modal
        return;
      }

      setViewingBug({ ...bug, fix_suggestion: fixSuggestion });
    } catch (error) {
      console.error('Auto-fix failed:', error);
    } finally {
      setFixingBugId(null);
    }
  };

  const markResolved = async (bugId) => {
    await updateBugMutation.mutateAsync({
      id: bugId,
      status: 'resolved'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const newBugs = bugs.filter(b => b.status === 'new');
  const investigating = bugs.filter(b => b.status === 'investigating');
  const needsReview = bugs.filter(b => b.status === 'needs_review');
  const resolved = bugs.filter(b => b.status === 'resolved');

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-cyan-400 font-mono">BUG TRACKER</h1>
            <p className="text-gray-400 text-sm font-mono mt-1">AI51 auto-logs + suggests fixes</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-3xl font-black text-red-400">{newBugs.length}</p>
              <p className="text-xs text-gray-500 font-mono">NEW</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-amber-400">{investigating.length}</p>
              <p className="text-xs text-gray-500 font-mono">INVESTIGATING</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-green-400">{resolved.length}</p>
              <p className="text-xs text-gray-500 font-mono">RESOLVED</p>
            </div>
          </div>
        </div>

        {/* NEW BUGS */}
        {newBugs.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-black text-red-400 font-mono">🔴 NEW BUGS</h2>
            {newBugs.map(bug => (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-xs text-gray-500 font-mono">
                        {bug.user_name} • {format(new Date(bug.created_date), 'MMM d, HH:mm')}
                      </span>
                    </div>
                    <p className="text-white font-mono text-sm mb-2">{bug.user_message}</p>
                    {bug.ai_response && (
                      <p className="text-gray-400 text-xs font-mono">{bug.ai_response.slice(0, 150)}...</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => autoFixBug(bug)}
                      disabled={fixingBugId === bug.id}
                      className="bg-amber-600 hover:bg-amber-700 px-3 py-2"
                    >
                      {fixingBugId === bug.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Wrench className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => setViewingBug(bug)}
                      className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => markResolved(bug.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* INVESTIGATING */}
        {investigating.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-black text-amber-400 font-mono">🔧 INVESTIGATING</h2>
            {investigating.map(bug => (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-900/20 border-2 border-amber-500/50 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm mb-2">{bug.user_message}</p>
                    {bug.ai_fix_notes && (
                      <div className="bg-black/60 rounded-lg p-3 mt-2">
                        <pre className="text-xs text-cyan-300 font-mono whitespace-pre-wrap">
                          {bug.ai_fix_notes}
                        </pre>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => markResolved(bug.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => deleteBugMutation.mutate(bug.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* NEEDS REVIEW */}
        {needsReview.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-black text-purple-400 font-mono">👀 NEEDS REVIEW</h2>
            {needsReview.map(bug => (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-900/20 border-2 border-purple-500/50 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm mb-2">{bug.user_message}</p>
                    {bug.ai_fix_notes && (
                      <div className="bg-black/60 rounded-lg p-3 mt-2">
                        <pre className="text-xs text-cyan-300 font-mono whitespace-pre-wrap">
                          {bug.ai_fix_notes}
                        </pre>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => markResolved(bug.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => deleteBugMutation.mutate(bug.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* RESOLVED */}
        {resolved.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-black text-green-400 font-mono">✅ RESOLVED</h2>
            {resolved.slice(0, 10).map(bug => (
              <div
                key={bug.id}
                className="bg-green-900/10 border border-green-500/30 rounded-xl p-4 opacity-50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white font-mono text-sm">{bug.user_message}</p>
                  <Button
                    onClick={() => deleteBugMutation.mutate(bug.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {bugs.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-2xl font-black text-green-400 font-mono">NO BUGS!</p>
            <p className="text-gray-500 text-sm font-mono mt-2">Clean as fuck ❤️</p>
          </div>
        )}

        {/* DETAIL MODAL */}
        <AnimatePresence>
          {viewingBug && (
            <div 
              className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-6"
              onClick={() => setViewingBug(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-black text-cyan-400 font-mono">BUG DETAILS</h2>
                  <Button onClick={() => setViewingBug(null)} className="bg-red-600 hover:bg-red-700">
                    Close
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 font-mono mb-1">REPORTER</p>
                    <p className="text-white font-mono">{viewingBug.user_name} ({viewingBug.user_email})</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-mono mb-1">REPORTED</p>
                    <p className="text-white font-mono">{format(new Date(viewingBug.created_date), 'PPpp')}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-mono mb-1">USER MESSAGE</p>
                    <p className="text-white font-mono text-sm">{viewingBug.user_message}</p>
                  </div>

                  {viewingBug.ai_response && (
                    <div>
                      <p className="text-xs text-gray-500 font-mono mb-1">AI51 RESPONSE</p>
                      <p className="text-gray-300 font-mono text-sm">{viewingBug.ai_response}</p>
                    </div>
                  )}

                  {viewingBug.fix_suggestion && (
                    <div className="bg-black/60 rounded-lg p-4">
                      <p className="text-xs text-cyan-400 font-mono mb-2">AI FIX ANALYSIS</p>
                      <div className="space-y-2">
                        <p className="text-white text-sm font-mono">
                          <span className="text-gray-500">Severity:</span> {viewingBug.fix_suggestion.severity}
                        </p>
                        <p className="text-white text-sm font-mono">
                          <span className="text-gray-500">Complexity:</span> {viewingBug.fix_suggestion.complexity}
                        </p>
                        {viewingBug.fix_suggestion.files_affected && (
                          <div>
                            <p className="text-gray-500 text-xs font-mono mb-1">Files affected:</p>
                            {viewingBug.fix_suggestion.files_affected.map((file, idx) => (
                              <p key={idx} className="text-cyan-300 text-xs font-mono">• {file}</p>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <p className="text-white text-sm font-mono whitespace-pre-wrap">
                            {viewingBug.fix_suggestion.fix_instructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => {
                      markResolved(viewingBug.id);
                      setViewingBug(null);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 font-mono font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Mark Resolved
                  </Button>
                  <Button
                    onClick={() => {
                      deleteBugMutation.mutate(viewingBug.id);
                      setViewingBug(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 font-mono font-bold"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}