import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, FileText, Plus, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

export default function ScottLegalDocs() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const [showForm, setShowForm] = useState(false);
    const [newDoc, setNewDoc] = useState({
        title: '',
        doc_type: 'nda',
        date_signed: '',
        expiry_date: '',
        parties: '',
        notes: ''
    });

    const { data: docs = [] } = useQuery({
        queryKey: ['scottLegalDocs', artistId],
        queryFn: () => artistId 
            ? base44.entities.ScottLegalDoc.filter({ artist_id: artistId })
            : base44.entities.ScottLegalDoc.filter({})
    });

    const { data: artists = [] } = useQuery({
        queryKey: ['scottArtists'],
        queryFn: () => base44.entities.ScottArtist.filter({})
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.ScottLegalDoc.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottLegalDocs'] });
            setShowForm(false);
            setNewDoc({ title: '', doc_type: 'nda', date_signed: '', expiry_date: '', parties: '', notes: '' });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.ScottLegalDoc.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scottLegalDocs'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const parties = newDoc.parties ? newDoc.parties.split(',').map(p => p.trim()) : [];
        createMutation.mutate({
            ...newDoc,
            artist_id: artistId || undefined,
            parties
        });
    };

    const docTypeColors = {
        nda: 'text-purple-400',
        contract: 'text-amber-400',
        terms: 'text-cyan-400',
        rider: 'text-green-400',
        waiver: 'text-pink-400',
        permission: 'text-blue-400',
        other: 'text-gray-400'
    };

    return (
        <div className="min-h-screen bg-black text-white">
            
            {/* HEADER */}
            <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(createPageUrl(`ScottLiveAdmin${artistId ? `?id=${artistId}` : ''}`))}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono">Back</span>
                    </button>
                    <h1 className="text-base font-semibold text-white">Legal Docs</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* ADD FORM */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg p-6 border border-white/10 mb-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">Document Title</label>
                                <Input
                                    value={newDoc.title}
                                    onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                                    placeholder="e.g. NDA - Glastonbury 2026"
                                    className="bg-white/5 border-white/10"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">Type</label>
                                <select
                                    value={newDoc.doc_type}
                                    onChange={(e) => setNewDoc({...newDoc, doc_type: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                                >
                                    <option value="nda">NDA</option>
                                    <option value="contract">Contract</option>
                                    <option value="terms">Terms</option>
                                    <option value="rider">Rider</option>
                                    <option value="waiver">Waiver</option>
                                    <option value="permission">Permission</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Date Signed</label>
                                    <Input
                                        type="date"
                                        value={newDoc.date_signed}
                                        onChange={(e) => setNewDoc({...newDoc, date_signed: e.target.value})}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Expiry Date</label>
                                    <Input
                                        type="date"
                                        value={newDoc.expiry_date}
                                        onChange={(e) => setNewDoc({...newDoc, expiry_date: e.target.value})}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">Parties (comma separated)</label>
                                <Input
                                    value={newDoc.parties}
                                    onChange={(e) => setNewDoc({...newDoc, parties: e.target.value})}
                                    placeholder="Artist Name, Venue, Promoter"
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">Notes</label>
                                <Textarea
                                    value={newDoc.notes}
                                    onChange={(e) => setNewDoc({...newDoc, notes: e.target.value})}
                                    placeholder="Additional details..."
                                    className="bg-white/5 border-white/10"
                                    rows={3}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                                Add Document
                            </Button>
                        </div>
                    </form>
                )}

                {/* DOCS LIST */}
                <div className="space-y-2">
                    {docs.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">No legal documents yet</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="text-cyan-400 text-sm mt-2 hover:text-cyan-300"
                            >
                                Add your first document
                            </button>
                        </div>
                    ) : (
                        docs
                            .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
                            .map(doc => (
                                <div key={doc.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className={`w-4 h-4 ${docTypeColors[doc.doc_type]}`} />
                                                <p className="text-sm font-medium text-white">{doc.title}</p>
                                            </div>
                                            <div className="space-y-1">
                                                {doc.date_signed && (
                                                    <p className="text-xs text-gray-500">
                                                        Signed: {format(new Date(doc.date_signed), 'dd MMM yyyy')}
                                                    </p>
                                                )}
                                                {doc.expiry_date && (
                                                    <p className="text-xs text-gray-500">
                                                        Expires: {format(new Date(doc.expiry_date), 'dd MMM yyyy')}
                                                    </p>
                                                )}
                                                {doc.parties && doc.parties.length > 0 && (
                                                    <p className="text-xs text-gray-500">
                                                        Parties: {doc.parties.join(', ')}
                                                    </p>
                                                )}
                                                {doc.notes && (
                                                    <p className="text-xs text-gray-600 mt-2">{doc.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (confirm('Delete this document?')) {
                                                    deleteMutation.mutate(doc.id);
                                                }
                                            }}
                                            className="text-gray-600 hover:text-red-400 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}