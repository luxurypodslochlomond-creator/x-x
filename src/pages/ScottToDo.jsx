import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Radio, ArrowLeft, Plus, Trash2, CheckCircle, Circle, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * TO-DO LIST - AI scans emails for tasks
 * Clutter-free, simplified, easy to read
 * Shows: Task, Who's responsible, Added by, Deadline, Progress
 */

export default function ScottToDo() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showEmailScan, setShowEmailScan] = useState(false);
    const [emailText, setEmailText] = useState('');
    const [scanning, setScanning] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        responsible: '',
        deadline: '',
        status: 'pending'
    });

    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    const emailParam = urlParams.get('email');

    useEffect(() => {
        base44.auth.me().then(setUser);
        if (emailParam) {
            setEmailText(decodeURIComponent(emailParam));
            setShowEmailScan(true);
        }
    }, [emailParam]);

    const { data: tasks = [] } = useQuery({
        queryKey: ['scottTasks', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottTask.filter({ artist_id: artistId })
            : base44.entities.ScottTask.filter({}),
        enabled: !!user
    });

    const createTaskMutation = useMutation({
        mutationFn: (taskData) => base44.entities.ScottTask.create(taskData),
        onSuccess: (newTaskData) => {
            queryClient.setQueryData(['scottTasks', artistId], (old = []) => [...old, newTaskData]);
            setNewTask({ title: '', responsible: '', deadline: '', status: 'pending' });
            setShowAddTask(false);
        }
    });

    const toggleTaskMutation = useMutation({
        mutationFn: ({ id, currentStatus }) => 
            base44.entities.ScottTask.update(id, { 
                status: currentStatus === 'done' ? 'pending' : 'done' 
            }),
        onSuccess: (updated) => {
            queryClient.setQueryData(['scottTasks', artistId], (old = []) =>
                old.map(t => t.id === updated.id ? updated : t)
            );
        }
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottTask.delete(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(['scottTasks', artistId], (old = []) =>
                old.filter(t => t.id !== deletedId)
            );
        }
    });

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;
        createTaskMutation.mutate({
            ...newTask,
            artist_id: artistId || null
        });
    };

    const scanEmailForTasks = async () => {
        if (!emailText.trim()) return;
        
        setScanning(true);
        try {
            const result = await base44.integrations.Core.InvokeLLM({
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
    "responsible": "who needs to do it",
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
                                    responsible: { type: "string" },
                                    deadline: { type: "string" },
                                    priority: { type: "string" }
                                }
                            }
                        }
                    }
                }
            });

            if (result.tasks && result.tasks.length > 0) {
                for (const task of result.tasks) {
                    await createTaskMutation.mutateAsync({
                        ...task,
                        artist_id: artistId || null,
                        status: 'pending'
                    });
                }
                alert(`✅ Created ${result.tasks.length} task${result.tasks.length > 1 ? 's' : ''}`);
                setEmailText('');
                setShowEmailScan(false);
            } else {
                alert('No tasks found in email');
            }
        } catch (error) {
            alert('Scan failed: ' + error.message);
        }
        setScanning(false);
    };

    const pendingTasks = tasks.filter(t => t.status !== 'done');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-8">
                <h1 className="text-4xl font-black text-white font-mono mb-2">TASKS</h1>
                <p className="text-gray-600 text-xs font-mono mb-4">Deadlines • Progress</p>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(createPageUrl('ScottMessageInbox'))}
                        className="flex-1 bg-black border-2 border-gray-800 hover:border-cyan-500 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
                    >
                        <Mail className="w-4 h-4" />
                        INBOX
                    </button>
                    <button
                        onClick={() => { setShowEmailScan(!showEmailScan); setShowAddTask(false); }}
                        className="flex-1 bg-black border-2 border-gray-800 hover:border-cyan-500 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
                    >
                        <Mail className="w-4 h-4" />
                        EMAIL
                    </button>
                    <button
                        onClick={() => { setShowAddTask(!showAddTask); setShowEmailScan(false); }}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        ADD
                    </button>
                </div>
            </div>

            {/* EMAIL SCAN FORM */}
            <AnimatePresence>
                {showEmailScan && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-black border border-gray-800 rounded p-4 space-y-3"
                    >
                        <h3 className="text-white font-black font-mono text-sm">SCAN EMAIL FOR TASKS</h3>
                        <Textarea
                            placeholder="Paste PR/Label/Plugger/Publisher email..."
                            value={emailText}
                            onChange={(e) => setEmailText(e.target.value)}
                            className="bg-black border-gray-700 text-white font-mono min-h-[150px]"
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={() => { setShowEmailScan(false); setEmailText(''); }}
                                className="flex-1 bg-gray-700 hover:bg-gray-600"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={scanEmailForTasks}
                                disabled={!emailText.trim() || scanning}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black flex items-center justify-center gap-2"
                            >
                                {scanning ? 'SCANNING...' : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        EXTRACT
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ADD TASK FORM */}
            <AnimatePresence>
                {showAddTask && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-black border border-gray-800 rounded p-4 space-y-3"
                    )
                        <Input
                            placeholder="What's the task?"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            className="bg-black border-gray-700 text-white font-mono"
                        />
                        <Input
                            placeholder="Who's responsible?"
                            value={newTask.responsible}
                            onChange={(e) => setNewTask({...newTask, responsible: e.target.value})}
                            className="bg-black border-gray-700 text-white font-mono"
                        />
                        <Input
                            type="date"
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                            className="bg-black border-gray-700 text-white font-mono"
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setShowAddTask(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={handleAddTask}
                                disabled={!newTask.title.trim() || createTaskMutation.isPending}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                            >
                                SAVE
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PENDING TASKS */}
            <div className="mb-6">
                <h2 className="text-white font-bold mb-3 font-mono text-sm">
                    PENDING ({pendingTasks.length})
                </h2>
                {pendingTasks.length === 0 ? (
                    <div className="bg-black border-2 border-gray-900 rounded-lg p-8 text-center">
                        <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-mono text-sm">All clear ✓</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {pendingTasks.map(task => (
                            <motion.div
                                key={task.id}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black border-2 border-gray-900 hover:border-cyan-500/50 rounded-lg p-4 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleTaskMutation.mutate({ id: task.id, currentStatus: task.status })}
                                        className="mt-1"
                                    >
                                        <Circle className="w-5 h-5 text-gray-600 hover:text-cyan-400" />
                                    </button>
                                    <div className="flex-1">
                                        <p className="text-white font-bold mb-2 font-mono">{task.title}</p>
                                        <div className="flex flex-wrap gap-4 text-xs">
                                           {task.responsible && (
                                               <span className="text-cyan-400 font-mono">
                                                   {task.responsible}
                                               </span>
                                           )}
                                           {task.deadline && (
                                               <span className="text-amber-400 font-mono">
                                                   {new Date(task.deadline).toLocaleDateString('en-GB')}
                                               </span>
                                           )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteTaskMutation.mutate(task.id)}
                                        className="text-gray-600 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* DONE TASKS */}
            {doneTasks.length > 0 && (
            <div>
                <h2 className="text-gray-600 font-bold mb-3 font-mono text-sm">
                    DONE ({doneTasks.length})
                </h2>
                <div className="space-y-2 opacity-50">
                    {doneTasks.map(task => (
                        <div
                            key={task.id}
                            className="bg-black border-2 border-gray-900 rounded-lg p-4"
                        >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleTaskMutation.mutate({ id: task.id, currentStatus: task.status })}
                                    >
                                        <CheckCircle className="w-5 h-5 text-cyan-500" />
                                    </button>
                                    <div className="flex-1">
                                        <p className="text-gray-500 font-bold line-through font-mono">{task.title}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteTaskMutation.mutate(task.id)}
                                        className="text-gray-700 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • To-Do List</p>
            </div>
        </div>
    );
}