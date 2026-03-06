import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function ScottToDo() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showAddTask, setShowAddTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', responsible_name: '', deadline: '' });
    const isMobile = window.innerWidth < 1024;

    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: tasks = [] } = useQuery({
        queryKey: ['scottTasks', artistId],
        queryFn: () => artistId ? base44.entities.ScottTask.filter({ artist_id: artistId }) : [],
        enabled: !!artistId
    });

    const createTaskMutation = useMutation({
        mutationFn: (taskData) => base44.entities.ScottTask.create(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottTasks'] });
            setNewTask({ title: '', responsible_name: '', deadline: '' });
            setShowAddTask(false);
        }
    });

    const toggleTaskMutation = useMutation({
        mutationFn: ({ id, status }) => base44.entities.ScottTask.update(id, { status: status === 'done' ? 'pending' : 'done' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottTasks'] })
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottTask.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scottTasks'] })
    });

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;
        createTaskMutation.mutate({ ...newTask, artist_id: artistId, status: 'pending' });
    };

    const pendingTasks = tasks.filter(t => t.status !== 'done');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-red-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-3xl font-black text-red-400 font-mono mb-4">TASKS</h1>

            {showAddTask && (
                <div className="bg-black border border-gray-800 rounded p-4 mb-4 space-y-3">
                    <Input placeholder="Task?" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="bg-black border-gray-700 text-white font-mono" />
                    <Input placeholder="Who?" value={newTask.responsible_name} onChange={(e) => setNewTask({...newTask, responsible_name: e.target.value})} className="bg-black border-gray-700 text-white font-mono" />
                    <Input type="date" value={newTask.deadline} onChange={(e) => setNewTask({...newTask, deadline: e.target.value})} className="bg-black border-gray-700 text-white font-mono" />
                    <div className="flex gap-2">
                        <Button onClick={() => setShowAddTask(false)} className="flex-1 bg-gray-700">CANCEL</Button>
                        <Button onClick={handleAddTask} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black">SAVE</Button>
                    </div>
                </div>
            )}

            <button onClick={() => setShowAddTask(!showAddTask)} className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-3 rounded mb-4 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> ADD TASK
            </button>

            <div className="space-y-2">
                {pendingTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-600 font-mono">No tasks</div>
                ) : (
                    pendingTasks.map(task => (
                        <motion.div key={task.id} layout className="bg-black border border-gray-800 rounded overflow-hidden">
                            <button 
                                onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)} 
                                className="w-full p-3 flex items-start gap-3 hover:bg-red-500/10 transition-all text-left"
                            >
                                <button onClick={(e) => { e.stopPropagation(); toggleTaskMutation.mutate({ id: task.id, status: task.status }); }}>
                                    <Circle className="w-5 h-5 text-gray-600" />
                                </button>
                                <div className="flex-1">
                                    <p className="text-white font-bold font-mono text-sm">{task.title}</p>
                                    <p className="text-gray-600 text-xs font-mono">{task.responsible_name}</p>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); deleteTaskMutation.mutate(task.id); }}>
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </button>

                            {selectedTask?.id === task.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-gray-800 bg-black/60 p-4 space-y-3 text-sm"
                                >
                                    {task.responsible_name && (
                                        <div>
                                            <p className="text-red-400 font-mono font-bold text-xs">ASSIGNED TO</p>
                                            <p className="text-white font-mono">{task.responsible_name}</p>
                                        </div>
                                    )}
                                    {task.deadline && (
                                        <div>
                                            <p className="text-red-400 font-mono font-bold text-xs">DEADLINE</p>
                                            <p className="text-white font-mono">{new Date(task.deadline).toLocaleDateString()}</p>
                                        </div>
                                    )}
                                    {task.category && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">CATEGORY</p>
                                            <p className="text-white font-mono capitalize">{task.category}</p>
                                        </div>
                                    )}
                                    {task.status && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">STATUS</p>
                                            <p className="text-white font-mono capitalize">{task.status}</p>
                                        </div>
                                    )}
                                    {task.notes && (
                                        <div>
                                            <p className="text-cyan-400 font-mono font-bold text-xs">NOTES</p>
                                            <p className="text-gray-400 text-xs">{task.notes}</p>
                                        </div>
                                    )}

                                    <button onClick={() => { deleteTaskMutation.mutate(task.id); setSelectedTask(null); }} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm mt-2">DELETE</button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {doneTasks.length > 0 && (
                <div className="mt-6 opacity-50">
                    <h2 className="text-gray-600 font-bold mb-2 font-mono text-sm">DONE</h2>
                    <div className="space-y-2">
                        {doneTasks.map(task => (
                            <div key={task.id} className="bg-black border border-gray-800 rounded p-3 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-cyan-500" />
                                <div className="flex-1">
                                    <p className="text-gray-500 line-through font-mono text-sm">{task.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}