import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Radio, ArrowLeft, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * TO-DO LIST - Scott's sketch
 * Clutter-free, simplified, easy to read
 * Shows: Task, Who's responsible, Added by, Deadline, Progress
 */

export default function ScottToDo() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        responsible: '',
        deadline: '',
        status: 'pending'
    });

    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    useEffect(() => {
        base44.auth.me().then(setUser);
    }, []);

    const { data: tasks = [] } = useQuery({
        queryKey: ['scottTasks', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottTask.filter({ artist_id: artistId })
            : base44.entities.ScottTask.filter({}),
        enabled: !!user
    });

    const createTaskMutation = useMutation({
        mutationFn: (taskData) => base44.entities.ScottTask.create(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
            setNewTask({ title: '', responsible: '', deadline: '', status: 'pending' });
            setShowAddTask(false);
        }
    });

    const toggleTaskMutation = useMutation({
        mutationFn: ({ id, currentStatus }) => 
            base44.entities.ScottTask.update(id, { 
                status: currentStatus === 'done' ? 'pending' : 'done' 
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottTasks'] })
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottTask.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottTasks'] })
    });

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;
        createTaskMutation.mutate({
            ...newTask,
            artist_id: artistId || null
        });
    };

    const pendingTasks = tasks.filter(t => t.status !== 'done');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-green-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Radio className="w-10 h-10 text-green-400" />
                        <div>
                            <h1 className="text-3xl font-black text-green-400 font-mono">TO-DO</h1>
                            <p className="text-gray-500 text-xs font-mono">Tasks • Deadlines • Progress</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddTask(!showAddTask)}
                        className="bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        ADD
                    </button>
                </div>
            </div>

            {/* ADD TASK FORM */}
            <AnimatePresence>
                {showAddTask && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-gray-900 border-2 border-green-500 rounded-lg p-4 space-y-3"
                    >
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
                                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-black"
                            >
                                SAVE
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PENDING TASKS */}
            <div className="mb-6">
                <h2 className="text-green-400 font-bold mb-3 font-mono text-sm">
                    PENDING ({pendingTasks.length})
                </h2>
                {pendingTasks.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono text-sm">All clear ✓</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {pendingTasks.map(task => (
                            <motion.div
                                key={task.id}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gray-900 border border-gray-700 hover:border-green-500 rounded-lg p-4 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleTaskMutation.mutate({ id: task.id, currentStatus: task.status })}
                                        className="mt-1"
                                    >
                                        <Circle className="w-5 h-5 text-gray-500 hover:text-green-400" />
                                    </button>
                                    <div className="flex-1">
                                        <p className="text-white font-bold mb-2 font-mono">{task.title}</p>
                                        <div className="flex flex-wrap gap-3 text-xs">
                                            {task.responsible && (
                                                <span className="text-cyan-400 font-mono">
                                                    👤 {task.responsible}
                                                </span>
                                            )}
                                            {task.deadline && (
                                                <span className="text-amber-400 font-mono">
                                                    📅 {new Date(task.deadline).toLocaleDateString('en-GB')}
                                                </span>
                                            )}
                                            {task.created_by && (
                                                <span className="text-gray-500 font-mono">
                                                    Added by {task.created_by}
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
                    <h2 className="text-gray-500 font-bold mb-3 font-mono text-sm">
                        DONE ({doneTasks.length})
                    </h2>
                    <div className="space-y-2 opacity-50">
                        {doneTasks.map(task => (
                            <div
                                key={task.id}
                                className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                            >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleTaskMutation.mutate({ id: task.id, currentStatus: task.status })}
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500" />
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