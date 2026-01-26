import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { Sparkles, Loader2, Calendar, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Email Task Scanner
 * Paste emails, AI extracts tasks and adds to to-do/calendar
 */

export default function ScottEmailTaskScanner({ artistId, onTasksExtracted }) {
    const [email, setEmail] = useState('');
    const [parsing, setParsing] = useState(false);
    const [tasks, setTasks] = useState([]);

    const handleParse = async () => {
        if (!email.trim()) return;

        setParsing(true);
        try {
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Parse this email and extract ALL tasks/to-dos. For each task return:
- title (short, clear)
- description (details if any)
- due_date (if mentioned, format YYYY-MM-DD)
- priority (urgent/normal/low based on urgency in email)
- is_calendar_event (true if it's a meeting/deadline that needs calendar entry)

Email:
${email}

Return JSON array of tasks.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        tasks: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    due_date: { type: "string" },
                                    priority: { type: "string", enum: ["urgent", "normal", "low"] },
                                    is_calendar_event: { type: "boolean" }
                                }
                            }
                        }
                    }
                }
            });

            setTasks(result.tasks || []);
        } catch (error) {
            alert('Parse failed: ' + error.message);
        } finally {
            setParsing(false);
        }
    };

    const handleAddTasks = async () => {
        if (tasks.length === 0) return;

        try {
            // Add to-do items
            const todoTasks = tasks.map(t => ({
                artist_id: artistId,
                title: t.title,
                description: t.description,
                due_date: t.due_date,
                priority: t.priority,
                status: 'pending'
            }));

            await Promise.all(
                todoTasks.map(task => base44.entities.ScottTask.create(task))
            );

            // Add calendar events
            const calendarEvents = tasks
                .filter(t => t.is_calendar_event && t.due_date)
                .map(t => ({
                    artist_id: artistId,
                    title: t.title,
                    date: t.due_date,
                    status: 'tbc',
                    notes: t.description
                }));

            await Promise.all(
                calendarEvents.map(event => base44.entities.ScottEvent.create(event))
            );

            onTasksExtracted?.();
            setEmail('');
            setTasks([]);
            alert(`Added ${todoTasks.length} tasks${calendarEvents.length > 0 ? ` and ${calendarEvents.length} calendar events` : ''} ✓`);
        } catch (error) {
            alert('Error adding tasks: ' + error.message);
        }
    };

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-black border border-purple-500/20 rounded-lg p-2">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-1"
            >
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h2 className="text-purple-400 font-black text-xs font-mono">AI EMAIL SCANNER</h2>
                </div>
                <div className="text-purple-400">
                    {expanded ? '−' : '+'}
                </div>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2"
                    >
                        <p className="text-gray-600 text-[9px] font-mono mb-2">
                            Paste an email, AI extracts tasks
                        </p>

                        <Textarea
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Paste email here..."
                            className="bg-gray-950 border-gray-800 text-white font-mono min-h-[80px] mb-2 text-xs"
                        />

                        <Button
                            onClick={handleParse}
                            disabled={parsing || !email.trim()}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold font-mono mb-2 text-xs py-2"
                        >
                            {parsing ? (
                                <>
                                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                    SCANNING...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-3 h-3 mr-2" />
                                    SCAN EMAIL
                                </>
                            )}
                        </Button>

                        {tasks.length > 0 && (
                            <div className="space-y-2">
                                <div className="border-t border-gray-800 pt-2">
                                    <p className="text-cyan-400 font-bold font-mono text-[9px] mb-2">
                                        FOUND {tasks.length} TASK{tasks.length > 1 ? 'S' : ''}
                                    </p>
                                    {tasks.map((task, i) => (
                                        <div key={i} className="bg-black border border-gray-900 rounded p-1.5 mb-1">
                                            <div className="flex items-start gap-2">
                                                {task.is_calendar_event ? (
                                                    <Calendar className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <ClipboardList className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-bold text-[9px] font-mono truncate">
                                                        {task.title}
                                                    </p>
                                                    {task.due_date && (
                                                        <span className="text-[8px] font-mono text-cyan-400">
                                                            {task.due_date}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={handleAddTasks}
                                    className="w-full bg-green-500 hover:bg-green-600 text-black font-bold font-mono text-xs py-2"
                                >
                                    ADD ALL
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}