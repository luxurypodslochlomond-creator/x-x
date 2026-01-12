import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { Sparkles, Loader2, Calendar, ClipboardList } from 'lucide-react';

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

    return (
        <div className="bg-black border-2 border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-purple-400 font-black text-lg font-mono">EMAIL TASK SCANNER</h2>
            </div>

            <p className="text-gray-600 text-xs font-mono mb-4">
                Paste an email, AI extracts tasks and adds them to your to-do list + calendar
            </p>

            <Textarea
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Paste email here..."
                className="bg-gray-950 border-gray-800 text-white font-mono min-h-[120px] mb-3"
            />

            <Button
                onClick={handleParse}
                disabled={parsing || !email.trim()}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold font-mono mb-4"
            >
                {parsing ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        SCANNING...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        SCAN EMAIL
                    </>
                )}
            </Button>

            {tasks.length > 0 && (
                <div className="space-y-3">
                    <div className="border-t border-gray-800 pt-4">
                        <p className="text-cyan-400 font-bold font-mono text-sm mb-3">
                            FOUND {tasks.length} TASK{tasks.length > 1 ? 'S' : ''}
                        </p>
                        {tasks.map((task, i) => (
                            <div key={i} className="bg-black border-2 border-gray-900 rounded-lg p-3 mb-2">
                                <div className="flex items-start gap-2">
                                    {task.is_calendar_event ? (
                                        <Calendar className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    ) : (
                                        <ClipboardList className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-white font-bold text-sm font-mono">
                                            {task.title}
                                        </p>
                                        {task.description && (
                                            <p className="text-gray-600 text-xs font-mono mt-1">
                                                {task.description}
                                            </p>
                                        )}
                                        <div className="flex gap-2 mt-2">
                                            {task.due_date && (
                                                <span className="text-xs font-mono text-cyan-400">
                                                    {task.due_date}
                                                </span>
                                            )}
                                            <span className={`text-xs font-mono ${
                                                task.priority === 'urgent' ? 'text-red-400' :
                                                task.priority === 'normal' ? 'text-amber-400' :
                                                'text-gray-600'
                                            }`}>
                                                {task.priority.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={handleAddTasks}
                        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold font-mono"
                    >
                        ADD ALL TO CB51
                    </Button>
                </div>
            )}
        </div>
    );
}