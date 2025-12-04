import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';

export default function AdminEarlySupportersPage() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSupporter, setNewSupporter] = useState({
        name: '',
        email: '',
        amount_gbp: '',
        date_supported: '',
        choice: 'pending', // pending, fiat, p51
        notes: ''
    });

    const queryClient = useQueryClient();

    // This would connect to an EarlySupporter entity (we'll create it)
    const { data: supporters = [], isLoading } = useQuery({
        queryKey: ['early_supporters'],
        queryFn: () => base44.entities.EarlySupporter?.list() || [],
        initialData: []
    });

    const addSupporterMutation = useMutation({
        mutationFn: (data) => base44.entities.EarlySupporter.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['early_supporters'] });
            setShowAddForm(false);
            setNewSupporter({
                name: '',
                email: '',
                amount_gbp: '',
                date_supported: '',
                choice: 'pending',
                notes: ''
            });
        }
    });

    const updateSupporterMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.EarlySupporter.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['early_supporters'] });
        }
    });

    const handleAddSupporter = (e) => {
        e.preventDefault();
        addSupporterMutation.mutate({
            ...newSupporter,
            amount_gbp: parseFloat(newSupporter.amount_gbp),
            status: 'recorded' // They've been recorded, now awaiting their choice
        });
    };

    const handleUpdateChoice = (supporter, choice) => {
        updateSupporterMutation.mutate({
            id: supporter.id,
            data: { choice, status: choice === 'pending' ? 'recorded' : 'choice_made' }
        });
    };

    const handleMarkCompleted = (supporter) => {
        updateSupporterMutation.mutate({
            id: supporter.id,
            data: { status: 'completed' }
        });
    };

    const totalSupported = supporters.reduce((sum, s) => sum + (s.amount_gbp || 0), 0);
    const pendingChoice = supporters.filter(s => s.choice === 'pending').length;
    const completedCount = supporters.filter(s => s.status === 'completed').length;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* HEADER */}
                <div className="text-center space-y-4">
                    <Heart className="w-16 h-16 text-pink-400 mx-auto" />
                    <h1 className="text-4xl font-black text-white">Early Supporters Vault</h1>
                    <p className="text-gray-400">Fair tracking. No hierarchy. Just honesty.</p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-purple-900/30 border-purple-500/30">
                        <CardContent className="p-6 text-center">
                            <p className="text-3xl font-black text-purple-300">£{totalSupported.toFixed(2)}</p>
                            <p className="text-sm text-gray-400 mt-2">Total Early Support</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-yellow-900/30 border-yellow-500/30">
                        <CardContent className="p-6 text-center">
                            <p className="text-3xl font-black text-yellow-300">{pendingChoice}</p>
                            <p className="text-sm text-gray-400 mt-2">Awaiting Their Choice</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-900/30 border-green-500/30">
                        <CardContent className="p-6 text-center">
                            <p className="text-3xl font-black text-green-300">{completedCount}</p>
                            <p className="text-sm text-gray-400 mt-2">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* ADD SUPPORTER BUTTON */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">All Supporters</h2>
                    <Button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-pink-600 hover:bg-pink-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {showAddForm ? 'Cancel' : 'Add Supporter (Retrospective)'}
                    </Button>
                </div>

                {/* ADD FORM */}
                {showAddForm && (
                    <Card className="bg-gray-900/60 border-pink-500/30">
                        <CardHeader>
                            <CardTitle className="text-pink-300">Add Early Supporter (Catch Missed People)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddSupporter} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-white">Name</Label>
                                        <Input
                                            value={newSupporter.name}
                                            onChange={(e) => setNewSupporter({...newSupporter, name: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-white">Email</Label>
                                        <Input
                                            type="email"
                                            value={newSupporter.email}
                                            onChange={(e) => setNewSupporter({...newSupporter, email: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-white">Amount (£ GBP)</Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={newSupporter.amount_gbp}
                                            onChange={(e) => setNewSupporter({...newSupporter, amount_gbp: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-white">Date Supported (approximate)</Label>
                                        <Input
                                            type="date"
                                            value={newSupporter.date_supported}
                                            onChange={(e) => setNewSupporter({...newSupporter, date_supported: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-white">Notes (How they helped, context, etc.)</Label>
                                    <Input
                                        value={newSupporter.notes}
                                        onChange={(e) => setNewSupporter({...newSupporter, notes: e.target.value})}
                                        className="bg-gray-800 border-gray-600 text-white"
                                        placeholder="e.g., Helped with hosting costs in Oct 2024"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                                    Add to Vault
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* SUPPORTERS LIST */}
                <div className="space-y-4">
                    {supporters.length === 0 ? (
                        <Card className="bg-gray-900/60 border-gray-700">
                            <CardContent className="p-8 text-center">
                                <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                <p className="text-gray-400">No supporters recorded yet. Use the button above to add them.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        supporters.map(supporter => (
                            <Card key={supporter.id} className="bg-gray-900/60 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">{supporter.name}</h3>
                                            <p className="text-sm text-gray-400 mb-2">{supporter.email}</p>
                                            
                                            <div className="flex gap-4 mb-3 text-sm">
                                                <span className="text-green-400 font-bold">£{supporter.amount_gbp?.toFixed(2)}</span>
                                                {supporter.date_supported && (
                                                    <span className="text-gray-500">{new Date(supporter.date_supported).toLocaleDateString()}</span>
                                                )}
                                            </div>

                                            {supporter.notes && (
                                                <p className="text-sm text-gray-400 italic mb-3">{supporter.notes}</p>
                                            )}

                                            {/* STATUS */}
                                            <div className="flex items-center gap-2 mb-3">
                                                {supporter.status === 'completed' ? (
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span className="text-sm font-bold">Completed</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-yellow-400">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="text-sm font-bold">
                                                            {supporter.choice === 'pending' ? 'Awaiting Their Choice' : 'Choice Made - Awaiting Action'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* THEIR CHOICE */}
                                            <div className="flex gap-2 mb-3">
                                                <Button
                                                    variant={supporter.choice === 'fiat' ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => handleUpdateChoice(supporter, 'fiat')}
                                                    className={supporter.choice === 'fiat' ? 'bg-blue-600' : ''}
                                                    disabled={supporter.status === 'completed'}
                                                >
                                                    Fiat Repayment
                                                </Button>
                                                <Button
                                                    variant={supporter.choice === 'p51' ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => handleUpdateChoice(supporter, 'p51')}
                                                    className={supporter.choice === 'p51' ? 'bg-purple-600' : ''}
                                                    disabled={supporter.status === 'completed'}
                                                >
                                                    $P51 Conversion
                                                </Button>
                                                <Button
                                                    variant={supporter.choice === 'pending' ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => handleUpdateChoice(supporter, 'pending')}
                                                    className={supporter.choice === 'pending' ? 'bg-gray-600' : ''}
                                                    disabled={supporter.status === 'completed'}
                                                >
                                                    Not Decided Yet
                                                </Button>
                                            </div>
                                        </div>

                                        {/* MARK COMPLETED */}
                                        {supporter.status !== 'completed' && supporter.choice !== 'pending' && (
                                            <Button
                                                onClick={() => handleMarkCompleted(supporter)}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Mark Complete
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* FOOTER NOTE */}
                <Card className="bg-pink-900/20 border-pink-500/30">
                    <CardContent className="p-6 text-center">
                        <p className="text-pink-300 font-bold mb-2">Zero Hierarchy. Just Honesty.</p>
                        <p className="text-sm text-gray-400">
                            This vault is private. No leaderboards. No badges. Just fair record-keeping so we can honor everyone who helped us survive.
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}