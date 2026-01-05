import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, CheckCircle, Circle } from 'lucide-react';

/**
 * SCOTT TO-DO LIST
 * Simple, clutter-free task list
 * Task | Who's doing it | Added by | Deadline | Status
 */

export default function ScottToDo() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistId = searchParams.get('artist');
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    who_task: '',
    deadline: '',
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['scottTasks', artistId],
    queryFn: () => base44.entities.ScottTask.filter({ artist_id: artistId }),
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.ScottTask.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['scottTasks']);
      setShowAdd(false);
      setNewTask({ title: '', who_task: '', deadline: '' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ScottTask.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(['scottTasks']),
  });

  const handleAdd = () => {
    createMutation.mutate({
      ...newTask,
      artist_id: artistId,
      status: 'todo',
    });
  };

  const toggleStatus = (task) => {
    updateMutation.mutate({
      id: task.id,
      data: { status: task.status === 'done' ? 'todo' : 'done' },
    });
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artistId}`)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-4xl font-black text-white">TO-DO LIST</h1>
          </div>
          <Button
            onClick={() => setShowAdd(!showAdd)}
            className="bg-amber-600 hover:bg-amber-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Add Task Form */}
        {showAdd && (
          <Card className="bg-black border-2 border-amber-500 mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Input
                  placeholder="Task"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-black border-amber-500 text-white"
                />
                <Input
                  placeholder="Who's responsible?"
                  value={newTask.who_task}
                  onChange={(e) => setNewTask({ ...newTask, who_task: e.target.value })}
                  className="bg-black border-amber-500 text-white"
                />
                <Input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  className="bg-black border-amber-500 text-white"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAdd} className="bg-amber-600 hover:bg-amber-700">
                    Add
                  </Button>
                  <Button variant="outline" onClick={() => setShowAdd(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="bg-black border border-gray-700 hover:border-amber-500 transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === 'done' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <span className={`text-white font-bold ${task.status === 'done' ? 'line-through opacity-50' : ''}`}>
                      {task.title}
                    </span>
                    <span className="text-cyan-400 text-sm">{task.who_task}</span>
                    <span className="text-gray-400 text-sm">Added by {task.created_by}</span>
                    <span className="text-amber-400 text-sm">
                      {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No tasks yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}