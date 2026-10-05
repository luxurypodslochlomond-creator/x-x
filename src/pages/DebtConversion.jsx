import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader2, Shield, Plus, ArrowRightLeft } from 'lucide-react';
import QuantumButton from '@/components/shared/QuantumButton';
import P51Symbol from '@/components/shared/P51Symbol';

const PledgeCard = ({ pledge, onSelect }) => {
    const fulfilled = pledge.p51_fulfilled_amount || 0;
    const total = pledge.p51_pledge_amount || 0;
    const percentage = total > 0 ? (fulfilled / total) * 100 : 0;

    return (
        <Card className="bg-black/50 border border-gray-800 hover:border-yellow-500/50 transition-colors cursor-pointer" onClick={() => onSelect(pledge)}>
            <CardHeader>
                <CardTitle className="text-white">{pledge.debt_type}</CardTitle>
                <CardDescription className="text-gray-400 flex items-center gap-1">
                    Pledge: {total.toLocaleString()} <P51Symbol />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={percentage} className="w-full" />
                <p className="text-sm text-gray-300 mt-2 text-right flex items-center justify-end gap-1">
                    {fulfilled.toLocaleString()} / {total.toLocaleString()} <P51Symbol /> fulfilled
                </p>
            </CardContent>
        </Card>
    );
};

export default function DebtConversion() {
    const [showCreate, setShowCreate] = useState(false);
    const [selectedPledge, setSelectedPledge] = useState(null);
    const [newPledge, setNewPledge] = useState({
        original_debt_amount: '',
        debt_type: '',
        public_story: ''
    });

    const queryClient = useQueryClient();
    const P51_RATE = 0.10; // 1 P51 = £0.10

    // Set document title
    useEffect(() => {
        document.title = "Quantum Field Recalibration";
    }, []);

    const { data: pledges, isLoading } = useQuery({
        queryKey: ['debtPledges'],
        queryFn: () => base44.entities.DebtConversionPledge.list()
    });

    const createMutation = useMutation({
        mutationFn: (pledgeData) => base44.entities.DebtConversionPledge.create(pledgeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debtPledges'] });
            setShowCreate(false);
            setNewPledge({ original_debt_amount: '', debt_type: '', public_story: '' });
        }
    });

    const handleCreatePledge = () => {
        const debtAmount = parseFloat(newPledge.original_debt_amount);
        if (!debtAmount || !newPledge.debt_type) {
            alert('Please fill in all required fields.');
            return;
        }

        const p51PledgeAmount = Math.ceil(debtAmount / P51_RATE);

        createMutation.mutate({
            ...newPledge,
            original_debt_amount: debtAmount,
            p51_pledge_amount: p51PledgeAmount,
            original_debt_currency: 'GBP', // Assuming GBP for now
        });
    };

    if (isLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-12 h-12 text-purple-400 animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-yellow-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-6">
                    <Shield className="w-24 h-24 text-yellow-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #fde047)' }} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-yellow-400 via-white to-amber-400 bg-clip-text text-transparent">
                        Debt Liberation
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Transmute old-world energetic chains (debt) into freedom through healing action. Your work heals the planet and liberates you.
                    </p>
                </header>

                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-white">Your Pledges</h2>
                        <QuantumButton onClick={() => setShowCreate(true)} className="!bg-yellow-500 !text-black">
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Pledge
                        </QuantumButton>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {pledges.map(pledge => (
                            <PledgeCard key={pledge.id} pledge={pledge} onSelect={setSelectedPledge} />
                        ))}
                    </div>
                    {pledges.length === 0 && (
                        <Card className="bg-black/50 border border-dashed border-gray-700 text-center py-12">
                            <CardContent>
                                <p className="text-gray-400">You have no active pledges. Create one to begin your liberation journey.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Create Pledge Dialog */}
                <Dialog open={showCreate} onOpenChange={setShowCreate}>
                    <DialogContent className="bg-gray-900 border-yellow-500 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">Create a New Liberation Pledge</DialogTitle>
                            <DialogDescription className="flex items-center gap-1">Define the energetic chain you wish to transmute into <strong className="text-pink-400 flex items-center gap-1"><P51Symbol /></strong>.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="debt_type">Debt Name (e.g., Credit Card, Student Loan)</Label>
                                <Input id="debt_type" value={newPledge.debt_type} onChange={e => setNewPledge({...newPledge, debt_type: e.target.value})} className="bg-gray-800 border-gray-700 mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="debt_amount">Debt Amount (£)</Label>
                                <Input id="debt_amount" type="number" value={newPledge.original_debt_amount} onChange={e => setNewPledge({...newPledge, original_debt_amount: e.target.value})} className="bg-gray-800 border-gray-700 mt-1" />
                                {newPledge.original_debt_amount > 0 && (
                                    <p className="text-sm text-yellow-300 mt-2 flex items-center gap-2">
                                        <ArrowRightLeft className="w-4 h-4" /> This will require a pledge of <strong className="text-white flex items-center gap-1">~{(parseFloat(newPledge.original_debt_amount) / P51_RATE).toLocaleString()} <P51Symbol /></strong> to transmute.
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="story">Your Story (Optional)</Label>
                                <Input id="story" value={newPledge.public_story} onChange={e => setNewPledge({...newPledge, public_story: e.target.value})} className="bg-gray-800 border-gray-700 mt-1" placeholder="How you will turn this into a positive."/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
                            <Button onClick={handleCreatePledge} disabled={createMutation.isPending} className="bg-yellow-500 hover:bg-yellow-400 text-black">
                                {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Create Pledge
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* View Pledge Dialog */}
                {selectedPledge && (
                    <Dialog open={!!selectedPledge} onOpenChange={() => setSelectedPledge(null)}>
                         <DialogContent className="bg-gray-900 border-yellow-500 text-white">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">{selectedPledge.debt_type}</DialogTitle>
                                <DialogDescription className="flex items-center gap-1">
                                    Pledge of <strong className="text-white flex items-center gap-1">{(selectedPledge.p51_pledge_amount || 0).toLocaleString()} <P51Symbol /></strong> to transmute a £{(selectedPledge.original_debt_amount || 0).toLocaleString()} energetic chain.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <Progress value={((selectedPledge.p51_fulfilled_amount || 0) / (selectedPledge.p51_pledge_amount || 1)) * 100} className="w-full" />
                                <p className="text-lg text-white text-center flex items-center justify-center gap-1">
                                    {(selectedPledge.p51_fulfilled_amount || 0).toLocaleString()} / {(selectedPledge.p51_pledge_amount || 0).toLocaleString()} <P51Symbol />
                                </p>
                                <p className="text-gray-400">{selectedPledge.public_story}</p>
                                <p className="text-sm text-yellow-400 bg-yellow-900/50 p-3 rounded-lg flex items-center gap-2">
                                    A portion of all <P51Symbol /> you generate from healing actions is automatically used to fulfill your active pledges. Keep healing, keep liberating.
                                </p>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setSelectedPledge(null)}>Close</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}