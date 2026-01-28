import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Target, Archive, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * MESSAGE INBOX - AI SORTS CHAOS
 * Paste email → AI decides:
 * - Gig offer → bookings
 * - Task (PR/label/plugger) → to-do
 * - General → archive
 */

export default function ScottMessageInbox() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    const [emailText, setEmailText] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeEmail = async () => {
        if (!emailText.trim()) return;
        
        setAnalyzing(true);
        try {
            // AI categorizes email
            const analysis = await base44.integrations.Core.InvokeLLM({
                prompt: `Analyze this email. Is it:
1. GIG_OFFER - booking inquiry with venue/date/fee
2. TASK - action needed (PR request, label task, plugger follow-up, publishing, sample clearance, etc)
3. GENERAL - everything else (spam, newsletters, casual chat)

Return JSON:
{
  "category": "GIG_OFFER" | "TASK" | "GENERAL",
  "confidence": 0-100,
  "reason": "why you chose this category",
  "subject": "email subject/summary",
  "from": "sender name/company",
  "action_needed": "what needs to be done (if task)",
  "priority": "urgent" | "normal" | "low"
}

Email:
${emailText}`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        category: { type: "string", enum: ["GIG_OFFER", "TASK", "GENERAL"] },
                        confidence: { type: "number" },
                        reason: { type: "string" },
                        subject: { type: "string" },
                        from: { type: "string" },
                        action_needed: { type: "string" },
                        priority: { type: "string", enum: ["urgent", "normal", "low"] }
                    }
                }
            });

            setResult(analysis);
        } catch (error) {
            alert('Analysis failed: ' + error.message);
        }
        setAnalyzing(false);
    };

    const [creatingGig, setCreatingGig] = useState(false);
    const [creatingTask, setCreatingTask] = useState(false);

    const handleCreateGigOffer = async () => {
        setCreatingGig(true);
        try {
            const response = await base44.functions.invoke('scanGigOffers', { 
                emailText, 
                artistId 
            });
            if (response?.data?.success) {
                alert('✅ Gig offer created!');
                setResult(null);
                setEmailText('');
            } else {
                throw new Error('Failed to extract gig details');
            }
        } catch (error) {
            alert('❌ Error: ' + error.message);
        }
        setCreatingGig(false);
    };

    const handleCreateTask = async () => {
        setCreatingTask(true);
        try {
            const taskResult = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract task/action items from this email. Look for:
- PR requests (social posts, interviews, content)
- Label tasks (deliverables, marketing)
- Plugger follow-ups (radio, playlists)
- Publisher admin (splits, registrations)
- Sample clearance needs
- General action items

Return JSON array of tasks:
{
  "tasks": [{
    "title": "clear task title",
    "responsible_name": "who needs to do it",
    "deadline": "YYYY-MM-DD or null",
    "priority": "urgent/normal/low"
  }]
}

If no clear tasks, return empty array.

Email:
${emailText}`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        tasks: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    responsible_name: { type: "string" },
                                    deadline: { type: "string" },
                                    priority: { type: "string" }
                                }
                            }
                        }
                    }
                }
            });

            if (taskResult.tasks && taskResult.tasks.length > 0) {
                for (const task of taskResult.tasks) {
                    await base44.entities.ScottTask.create({
                        ...task,
                        artist_id: artistId || null,
                        status: 'pending'
                    });
                }
                queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
                alert(`✅ Created ${taskResult.tasks.length} task${taskResult.tasks.length > 1 ? 's' : ''}`);
                setResult(null);
                setEmailText('');
            } else {
                alert('No tasks found in email');
            }
        } catch (error) {
            alert('❌ Error: ' + error.message);
        }
        setCreatingTask(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6">
                <h1 className="text-4xl font-black text-white font-mono mb-2">MESSAGE INBOX</h1>
                <p className="text-gray-600 text-xs font-mono">AI sorts your chaos</p>
            </div>

            {/* PASTE EMAIL */}
            <div className="bg-black border-2 border-cyan-500 rounded p-4 mb-6" style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}>
                <h2 className="text-cyan-400 font-black font-mono text-lg mb-4">PASTE EMAIL</h2>
                <Textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    className="bg-black border-2 border-gray-900 text-white min-h-[200px] font-mono text-sm mb-3"
                    placeholder="Paste any email here - gig offers, tasks, whatever..."
                />

                <Button
                    onClick={analyzeEmail}
                    disabled={analyzing || !emailText.trim()}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 font-mono flex items-center justify-center gap-2"
                >
                    {analyzing ? 'AI ANALYZING...' : (
                        <>
                            <Sparkles className="w-4 h-4" />
                            ANALYZE
                        </>
                    )}
                </Button>
            </div>

            {/* ANALYSIS RESULT */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {/* CATEGORY CARD */}
                        <div className="bg-black border border-gray-800 rounded p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1">
                                    <p className="text-white font-black font-mono text-lg">
                                        {result.category.replace('_', ' ')}
                                    </p>
                                    <p className="text-white text-xs font-mono">{result.confidence}% confident</p>
                                </div>
                                {result.priority === 'urgent' && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded font-mono">
                                        URGENT
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 text-sm font-mono">
                                <p className="text-white"><span className="text-gray-600">From:</span> {result.from}</p>
                                <p className="text-white"><span className="text-gray-600">Subject:</span> {result.subject}</p>
                                {result.action_needed && (
                                    <p className="text-white"><span className="text-gray-600">Action:</span> {result.action_needed}</p>
                                )}
                                <p className="text-gray-400 text-xs italic">{result.reason}</p>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="space-y-3">
                            {result.category === 'GIG_OFFER' && (
                                <Button
                                    onClick={handleCreateGigOffer}
                                    disabled={creatingGig}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 font-mono"
                                >
                                    {creatingGig ? 'CREATING...' : 'CREATE GIG OFFER'}
                                </Button>
                            )}

                            {result.category === 'TASK' && (
                                <Button
                                    onClick={handleCreateTask}
                                    disabled={creatingTask}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 font-mono"
                                >
                                    {creatingTask ? 'CREATING...' : 'ADD TO TO-DO'}
                                </Button>
                            )}

                            {result.category === 'GENERAL' && (
                                <Button
                                    onClick={() => { setResult(null); setEmailText(''); }}
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-black py-4 font-mono"
                                >
                                    ARCHIVE (IGNORE)
                                </Button>
                            )}

                            <Button
                                onClick={() => setResult(null)}
                                variant="outline"
                                className="w-full border-2 border-gray-700 text-gray-400 font-mono"
                            >
                                ANALYZE ANOTHER
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Message Inbox</p>
            </div>
        </div>
    );
}