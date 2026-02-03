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
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-3xl font-black text-white font-mono mb-4">TASKS</h1>

            {showAddTask && (
                <div className="bg-black border border-gray-800 rounded p-4 mb-4 space-y-3">
                    <Input placeholder="Task?" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="bg-black border-gray-700 text-white font-mono" />
                    <Input placeholder="Who?" value={newTask.responsible_name} onChange={(e) => setNewTask({...newTask, responsible_name: e.target.value})} className="bg-black border-gray-700 text-white font-mono" />
                    <Input type="date" value={newTask.deadline} onChange={(e) => setNewTask({...newTask, deadline: e.target.value})} className="bg-black border-gray-700 text-white font-mono" />
                    <div className="flex gap-2">
                        <Button onClick={() => setShowAddTask(false)} className="flex-1 bg-gray-700">CANCEL</Button>
                        <Button onClick={handleAddTask} className="flex-1 bg-cyan-500 text-black font-black">SAVE</Button>
                    </div>
                </div>
            )}

            <button onClick={() => setShowAddTask(!showAddTask)} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded mb-4 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> ADD TASK
            </button>

            <div className="space-y-2">
                {pendingTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-600 font-mono">No tasks</div>
                ) : (
                    pendingTasks.map(task => (
                        <button key={task.id} onClick={() => setSelectedTask(task)} className="w-full bg-black border border-gray-800 hover:border-cyan-500/50 rounded p-3 flex items-start gap-3 transition-all text-left">
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
                    ))
                )}
            </div>

            {/* TASK DETAIL MODAL */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-black border-2 border-cyan-500 rounded-lg p-6 max-w-sm w-full space-y-4">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-white font-black font-mono text-lg flex-1">{selectedTask.title}</h2>
                            <button onClick={() => setSelectedTask(null)} className="text-cyan-400 hover:text-cyan-300 text-xl">✕</button>
                        </div>

                        <div className="space-y-3 text-sm">
                            {selectedTask.responsible_name && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">ASSIGNED TO</p>
                                    <p className="text-white font-mono">{selectedTask.responsible_name}</p>
                                </div>
                            )}
                            {selectedTask.deadline && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">DEADLINE</p>
                                    <p className="text-white font-mono">{new Date(selectedTask.deadline).toLocaleDateString()}</p>
                                </div>
                            )}
                            {selectedTask.category && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">CATEGORY</p>
                                    <p className="text-white font-mono capitalize">{selectedTask.category}</p>
                                </div>
                            )}
                            {selectedTask.status && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">STATUS</p>
                                    <p className="text-white font-mono capitalize">{selectedTask.status}</p>
                                </div>
                            )}
                            {selectedTask.notes && (
                                <div>
                                    <p className="text-cyan-400 font-mono font-bold text-xs">NOTES</p>
                                    <p className="text-gray-400 text-xs">{selectedTask.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setSelectedTask(null)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded text-sm">CLOSE</button>
                            <button onClick={() => { deleteTaskMutation.mutate(selectedTask.id); setSelectedTask(null); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm">DELETE</button>
                        </div>
                    </div>
                </div>
            )}

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