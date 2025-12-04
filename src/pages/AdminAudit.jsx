
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, AlertTriangle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

export default function AdminAuditPage() {
    const [filterType, setFilterType] = useState('all');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ['auditUser'],
        queryFn: () => base44.auth.me()
    });

    const { data: cleanups = [], isLoading: loadingCleanups } = useQuery({
        queryKey: ['auditCleanups'],
        queryFn: () => base44.entities.Cleanup.list('-created_date', 500)
    });

    const { data: proofsOfLove = [], isLoading: loadingProofs } = useQuery({
        queryKey: ['auditProofs'],
        queryFn: () => base44.entities.ProofOfLove.list('-created_date', 500)
    });

    const { data: transactions = [], isLoading: loadingTransactions } = useQuery({
        queryKey: ['auditTransactions'],
        queryFn: () => base44.entities.Transaction.list('-created_date', 500)
    });

    const deleteCleanupMutation = useMutation({
        mutationFn: (id) => base44.entities.Cleanup.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auditCleanups'] });
            alert('Cleanup deleted. You should manually adjust user tokens.');
        }
    });

    const deleteProofMutation = useMutation({
        mutationFn: (id) => base44.entities.ProofOfLove.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auditProofs'] });
            alert('Proof of Love deleted. You should manually adjust user tokens.');
        }
    });

    const flagSubmissionMutation = useMutation({
        mutationFn: async ({ id, type, reason }) => {
            // Create a flag record instead of deleting
            await base44.entities.FraudFlag.create({
                submission_id: id,
                submission_type: type,
                flagged_by: user.email,
                flag_reason: reason,
                status: 'pending_ai_review'
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auditCleanups'] });
            queryClient.invalidateQueries({ queryKey: ['auditProofs'] });
            alert('Flagged for AI51 review. The oracle will investigate.');
        }
    });

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Card className="bg-red-900/20 border-red-500">
                    <CardContent className="p-12 text-center">
                        <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-red-400">Access Denied</h2>
                        <p className="text-gray-400 mt-2">Admin only.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loadingCleanups || loadingProofs || loadingTransactions) return <QuantumLoader />;

    // Combine all submissions
    const allSubmissions = [
        ...cleanups.map(c => ({ ...c, type: 'cleanup', tokens: c.tokens_awarded })),
        ...proofsOfLove.map(p => ({ ...p, type: 'proof_of_love', tokens: p.p51_awarded }))
    ].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    // Filter
    const filtered = allSubmissions.filter(item => {
        const typeMatch = filterType === 'all' || item.type === filterType;
        const emailMatch = !searchEmail || item.created_by?.toLowerCase().includes(searchEmail.toLowerCase());
        return typeMatch && emailMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <header className="text-center space-y-4">
                    <Shield className="w-20 h-20 text-red-400 mx-auto" />
                    <h1 className="text-5xl font-black text-white">ADMIN AUDIT</h1>
                    <p className="text-xl text-gray-300">The Anti-Fraud Protocol</p>
                </header>

                {/* Filters */}
                <Card className="bg-black/40 border border-red-500/30">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search by user email..."
                                    value={searchEmail}
                                    onChange={(e) => setSearchEmail(e.target.value)}
                                    className="bg-gray-900/50 border-gray-700 text-white"
                                />
                            </div>
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full md:w-[200px] bg-gray-900/50 border-gray-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-gray-700">
                                    <SelectItem value="all">All Submissions</SelectItem>
                                    <SelectItem value="cleanup">Cleanups Only</SelectItem>
                                    <SelectItem value="proof_of_love">Proofs of Love Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <Card className="bg-black/40 border border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-yellow-400" />
                            All Submissions ({filtered.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-800">
                                        <TableHead className="text-white">Date</TableHead>
                                        <TableHead className="text-white">User</TableHead>
                                        <TableHead className="text-white">Type</TableHead>
                                        <TableHead className="text-white">Description</TableHead>
                                        <TableHead className="text-white">Tokens</TableHead>
                                        <TableHead className="text-white">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.map((item) => (
                                        <TableRow key={`${item.type}-${item.id}`} className="border-gray-800">
                                            <TableCell className="text-gray-300 text-sm">
                                                {new Date(item.created_date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-gray-300 font-mono text-sm">
                                                {item.created_by}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                    item.type === 'cleanup' 
                                                        ? 'bg-green-900/30 text-green-400' 
                                                        : 'bg-pink-900/30 text-pink-400'
                                                }`}>
                                                    {item.type === 'cleanup' ? 'Cleanup' : 'Proof of Love'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-gray-300 max-w-xs truncate">
                                                {item.type === 'cleanup' 
                                                    ? `${item.litter_weight}kg - ${item.location}` 
                                                    : `${item.love_type}: ${item.description?.substring(0, 50)}...`
                                                }
                                            </TableCell>
                                            <TableCell className="text-green-400 font-bold font-mono">
                                                {item.tokens?.toLocaleString() || 0} $P51
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setSelectedItem(item)}
                                                        className="text-cyan-400 hover:text-cyan-300"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            const reason = prompt('Why are you flagging this? (e.g., "Suspicious - works at dump")');
                                                            if (reason) {
                                                                flagSubmissionMutation.mutate({
                                                                    id: item.id,
                                                                    type: item.type,
                                                                    reason
                                                                });
                                                            }
                                                        }}
                                                        className="text-yellow-400 hover:text-yellow-300"
                                                    >
                                                        <AlertTriangle className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedItem(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            >
                                <h2 className="text-3xl font-black text-white mb-6">
                                    {selectedItem.type === 'cleanup' ? '🌍 Cleanup Details' : '❤️ Proof of Love Details'}
                                </h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-400">Submitted By:</p>
                                        <p className="text-lg text-white font-mono">{selectedItem.created_by}</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm text-gray-400">Date:</p>
                                        <p className="text-lg text-white">{new Date(selectedItem.created_date).toLocaleString()}</p>
                                    </div>

                                    {selectedItem.type === 'cleanup' && (
                                        <>
                                            <div>
                                                <p className="text-sm text-gray-400">Location:</p>
                                                <p className="text-lg text-white">{selectedItem.location}, {selectedItem.county}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Litter Weight:</p>
                                                <p className="text-lg text-green-400 font-bold">{selectedItem.litter_weight} kg</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Photo Evidence:</p>
                                                {selectedItem.photo_url && (
                                                    <img 
                                                        src={selectedItem.photo_url} 
                                                        alt="Cleanup evidence" 
                                                        className="w-full rounded-lg mt-2 border-2 border-green-500/30"
                                                    />
                                                )}
                                            </div>
                                            {selectedItem.notes && (
                                                <div>
                                                    <p className="text-sm text-gray-400">Notes:</p>
                                                    <p className="text-white">{selectedItem.notes}</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {selectedItem.type === 'proof_of_love' && (
                                        <>
                                            <div>
                                                <p className="text-sm text-gray-400">Love Type:</p>
                                                <p className="text-lg text-pink-400 font-bold">{selectedItem.love_type?.replace(/_/g, ' ')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Description:</p>
                                                <p className="text-white">{selectedItem.description}</p>
                                            </div>
                                            {selectedItem.evidence_url && (
                                                <div>
                                                    <p className="text-sm text-gray-400">Evidence:</p>
                                                    <img 
                                                        src={selectedItem.evidence_url} 
                                                        alt="Proof of love evidence" 
                                                        className="w-full rounded-lg mt-2 border-2 border-pink-500/30"
                                                    />
                                                </div>
                                            )}
                                            {selectedItem.oracle_reasoning && (
                                                <div>
                                                    <p className="text-sm text-gray-400">Oracle Reasoning:</p>
                                                    <p className="text-cyan-300">{selectedItem.oracle_reasoning}</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="pt-4 border-t border-gray-700">
                                        <p className="text-sm text-gray-400">Tokens Awarded:</p>
                                        <p className="text-3xl text-green-400 font-black font-mono">
                                            {selectedItem.tokens?.toLocaleString() || 0} $P51
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <Button
                                        onClick={() => setSelectedItem(null)}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const reason = prompt('Why suspicious? (e.g., "Works at dump, easy to fake")');
                                            if (reason) {
                                                flagSubmissionMutation.mutate({
                                                    id: selectedItem.id,
                                                    type: selectedItem.type,
                                                    reason
                                                });
                                                setSelectedItem(null);
                                            }
                                        }}
                                        className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                                    >
                                        <AlertTriangle className="w-4 h-4 mr-2" />
                                        Flag for AI Review
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
