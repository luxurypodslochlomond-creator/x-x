import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Lightbulb, Plus, ThumbsUp, CheckCircle, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * FEATURE REQUESTS - TEAM COLLABORATION
 * Scott + Rosie + artists can suggest features
 * Upvote what matters
 * See what's being built
 */

export default function ScottFeatureRequests() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState(false);
    const [requests, setRequests] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRequest, setNewRequest] = useState({
        requested_by: '',
        title: '',
        description: '',
        why: '',
        priority: 'nice_to_have',
        category: 'other'
    });

    useEffect(() => {
        const storedPin = localStorage.getItem('scott_access_pin');
        if (storedPin === '1888') {
            setPinEntered(true);
            loadData();
        } else {
            navigate(createPageUrl('ScottManager'));
        }
    }, []);

    const loadData = async () => {
        try {
            const allRequests = await base44.entities.ScottFeatureRequest.list('-votes');
            setRequests(allRequests);
        } catch (error) {
            console.error('Load error:', error);
        }
    };

    const handleAddRequest = async () => {
        if (!newRequest.title) return;

        try {
            await base44.entities.ScottFeatureRequest.create(newRequest);
            setShowAddForm(false);
            setNewRequest({
                requested_by: '',
                title: '',
                description: '',
                why: '',
                priority: 'nice_to_have',
                category: 'other'
            });
            loadData();
        } catch (error) {
            console.error('Add error:', error);
            alert('Failed to add request');
        }
    };

    const handleUpvote = async (id) => {
        try {
            const request = requests.find(r => r.id === id);
            await base44.entities.ScottFeatureRequest.update(id, {
                votes: (request.votes || 0) + 1
            });
            loadData();
        } catch (error) {
            console.error('Upvote error:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'done': return { bg: 'bg-green-900/40', border: 'border-green-500', text: 'text-green-400' };
            case 'building': return { bg: 'bg-cyan-900/40', border: 'border-cyan-500', text: 'text-cyan-400' };
            case 'planned': return { bg: 'bg-purple-900/40', border: 'border-purple-500', text: 'text-purple-400' };
            case 'idea': return { bg: 'bg-gray-900/40', border: 'border-gray-700', text: 'text-gray-400' };
            default: return { bg: 'bg-red-900/40', border: 'border-red-500', text: 'text-red-400' };
        }
    };

    if (!pinEntered) return null;

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-amber-400" />
                        <div>
                            <h1 className="text-3xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>IDEAS</h1>
                            <p className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>What the team wants</p>
                        </div>
                    </div>
                    <KingdomCrown8Bit size={32} animate={true} />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {['idea', 'planned', 'building', 'done'].map(status => (
                        <div key={status} className={`bg-black border ${getStatusColor(status).border}/30 p-3 text-center`}>
                            <p className={`text-3xl font-black ${getStatusColor(status).text} mb-1`} style={{ fontFamily: 'monospace' }}>
                                {requests.filter(r => r.status === status).length}
                            </p>
                            <p className={`text-xs ${getStatusColor(status).text} uppercase tracking-wider`} style={{ fontFamily: 'monospace' }}>
                                {status}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ADD BUTTON */}
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full mb-6 py-3 bg-amber-600 hover:bg-amber-700 text-black font-mono flex items-center justify-center gap-2 font-bold"
                    >
                        <Plus className="w-5 h-5" />
                        SUGGEST FEATURE
                    </button>
                )}

                {/* ADD FORM */}
                {showAddForm && (
                    <div className="bg-black border-2 border-amber-500 p-4 mb-6">
                        <h3 className="text-amber-400 font-mono font-bold mb-3">NEW IDEA</h3>
                        
                        <input
                            type="text"
                            placeholder="Your name"
                            value={newRequest.requested_by}
                            onChange={(e) => setNewRequest({...newRequest, requested_by: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <input
                            type="text"
                            placeholder="Feature title"
                            value={newRequest.title}
                            onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        />

                        <textarea
                            placeholder="What do you want?"
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm h-24"
                        />

                        <textarea
                            placeholder="Why do you need it?"
                            value={newRequest.why}
                            onChange={(e) => setNewRequest({...newRequest, why: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm h-20"
                        />

                        <select
                            value={newRequest.category}
                            onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                            className="w-full bg-black border border-gray-800 text-white px-3 py-2 mb-2 font-mono text-sm"
                        >
                            <option value="calendar">Calendar</option>
                            <option value="contracts">Contracts</option>
                            <option value="money">Money</option>
                            <option value="communication">Communication</option>
                            <option value="visas">Visas</option>
                            <option value="publishing">Publishing</option>
                            <option value="other">Other</option>
                        </select>

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddRequest}
                                className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-black font-mono text-sm font-bold"
                            >
                                SUBMIT
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-mono text-sm"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )}

                {/* REQUESTS LIST */}
                <div className="space-y-3">
                    {requests.length === 0 ? (
                        <div className="bg-black border border-gray-800 p-8 text-center">
                            <Lightbulb className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-600 font-mono text-sm">No ideas yet</p>
                        </div>
                    ) : (
                        requests.map(request => {
                            const colors = getStatusColor(request.status);
                            return (
                                <div key={request.id} className={`${colors.bg} border-2 ${colors.border} p-4`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-white font-mono font-bold mb-1">{request.title}</p>
                                            <p className="text-gray-400 text-sm font-mono mb-2">{request.description}</p>
                                            {request.why && (
                                                <p className="text-gray-500 text-xs font-mono italic mb-2">Why: {request.why}</p>
                                            )}
                                            <div className="flex items-center gap-3 text-xs font-mono">
                                                <span className="text-gray-600">By: {request.requested_by}</span>
                                                <span className={`${colors.text} uppercase`}>{request.category}</span>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <div className={`${colors.text} text-xs font-mono uppercase px-2 py-1 border ${colors.border}`}>
                                                {request.status}
                                            </div>
                                            <button
                                                onClick={() => handleUpvote(request.id)}
                                                className="flex items-center gap-1 bg-black/60 hover:bg-black/80 px-3 py-1 border border-cyan-500/50 hover:border-cyan-500"
                                            >
                                                <ThumbsUp className="w-3 h-3 text-cyan-400" />
                                                <span className="text-cyan-400 font-mono text-xs font-bold">{request.votes || 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to={createPageUrl('ScottManager')} className="text-gray-600 text-sm font-mono hover:text-gray-400">
                        ← Back to Kingdom
                    </Link>
                </div>

            </div>
        </div>
    );
}