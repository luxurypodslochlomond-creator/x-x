import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Vote, Clock, CheckCircle, XCircle, Flame, Shield, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import QuantumLoader from '@/components/shared/QuantumLoader';

const ProposalCard = ({ proposal, user, onVote }) => {
    const [isVoting, setIsVoting] = useState(false);
    const totalVotes = (proposal.votes_for || 0) + (proposal.votes_against || 0);
    const percentFor = totalVotes > 0 ? Math.round((proposal.votes_for / totalVotes) * 100) : 0;
    const percentAgainst = totalVotes > 0 ? Math.round((proposal.votes_against / totalVotes) * 100) : 0;

    const typeColors = {
        'protocol': 'border-purple-500/50 bg-purple-900/20',
        'funding': 'border-green-500/50 bg-green-900/20',
        'token_burn': 'border-red-500/50 bg-red-900/20',
        'community': 'border-cyan-500/50 bg-cyan-900/20',
        'other': 'border-gray-500/50 bg-gray-900/20'
    };

    const typeIcons = {
        'protocol': Shield,
        'funding': Users,
        'token_burn': Flame,
        'community': Vote,
        'other': Vote
    };

    const Icon = typeIcons[proposal.type] || Vote;

    const handleVote = async (voteType) => {
        setIsVoting(true);
        await onVote(proposal.id, voteType);
        setIsVoting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Card className={`${typeColors[proposal.type]} border-2`}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                            <Icon className="w-6 h-6 text-white mt-1" />
                            <div className="flex-1">
                                <CardTitle className="text-xl text-white mb-2">{proposal.title}</CardTitle>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant="outline" className="text-xs">
                                        {proposal.type.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDistanceToNow(new Date(proposal.created_date), { addSuffix: true })}
                                    </Badge>
                                </div>
                                <p className="text-gray-300 text-sm mb-4">{proposal.description}</p>
                                <p className="text-xs text-gray-500">Proposed by: {proposal.proposer}</p>
                            </div>
                        </div>
                        {proposal.status === 'passed' && (
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        )}
                        {proposal.status === 'rejected' && (
                            <XCircle className="w-8 h-8 text-red-400" />
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {/* VOTE BARS */}
                    <div className="space-y-3 mb-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-green-400 font-bold">YES ({proposal.votes_for || 0})</span>
                                <span className="text-green-400">{percentFor}%</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentFor}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-red-400 font-bold">NO ({proposal.votes_against || 0})</span>
                                <span className="text-red-400">{percentAgainst}%</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-red-500 to-red-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentAgainst}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* VOTE BUTTONS */}
                    {proposal.status === 'voting' && (
                        <div className="flex gap-3">
                            <Button
                                onClick={() => handleVote('for')}
                                disabled={isVoting}
                                className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                            >
                                <ThumbsUp className="w-5 h-5 mr-2" />
                                Vote YES
                            </Button>
                            <Button
                                onClick={() => handleVote('against')}
                                disabled={isVoting}
                                className="flex-1 bg-red-600 hover:bg-red-700 h-12"
                            >
                                <ThumbsDown className="w-5 h-5 mr-2" />
                                Vote NO
                            </Button>
                        </div>
                    )}

                    {proposal.status === 'passed' && (
                        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 text-center">
                            <p className="text-green-400 font-bold">✓ PASSED - Action will be taken</p>
                        </div>
                    )}

                    {proposal.status === 'rejected' && (
                        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-center">
                            <p className="text-red-400 font-bold">✗ REJECTED - No action</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

const CreateProposal = ({ user, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'community'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const queryClient = useQueryClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            setError('Title and description required');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await base44.entities.GovernanceProposal.create({
                title: formData.title,
                description: formData.description,
                type: formData.type,
                proposer: user.full_name || user.email,
                status: 'voting',
                votes_for: 0,
                votes_against: 0
            });

            queryClient.invalidateQueries({ queryKey: ['governanceProposals'] });
            setFormData({ title: '', description: '', type: 'community' });
            onSuccess();
        } catch (err) {
            setError('Failed to create proposal');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="bg-black/60 border-2 border-cyan-500/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Vote className="w-6 h-6 text-cyan-400" />
                    Create New Proposal
                </CardTitle>
                <p className="text-sm text-gray-400">Let the family decide together</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white"
                        >
                            <option value="community">Community Decision</option>
                            <option value="funding">Fund a Mission</option>
                            <option value="token_burn">Burn Tokens (Punishment)</option>
                            <option value="protocol">Protocol Change</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Title</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="What are we voting on?"
                            className="bg-gray-900 border-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Description</label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Explain the proposal..."
                            className="bg-gray-900 border-gray-700 text-white h-32"
                        />
                    </div>
                    {error && (
                        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 h-12 text-lg font-bold"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Proposal'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default function GovernancePage() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['governanceUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: proposals, isLoading: proposalsLoading } = useQuery({
        queryKey: ['governanceProposals'],
        queryFn: () => base44.entities.GovernanceProposal.list('-created_date', 50),
    });

    const queryClient = useQueryClient();

    const voteMutation = useMutation({
        mutationFn: async ({ proposalId, voteType }) => {
            const proposal = proposals.find(p => p.id === proposalId);
            if (!proposal) throw new Error('Proposal not found');

            const newVotesFor = voteType === 'for' ? (proposal.votes_for || 0) + 1 : (proposal.votes_for || 0);
            const newVotesAgainst = voteType === 'against' ? (proposal.votes_against || 0) + 1 : (proposal.votes_against || 0);

            // Simple majority rule: if more than 10 votes and > 66% agree, pass it
            const totalVotes = newVotesFor + newVotesAgainst;
            let newStatus = proposal.status;
            if (totalVotes >= 10) {
                const percentFor = (newVotesFor / totalVotes) * 100;
                if (percentFor > 66) {
                    newStatus = 'passed';
                } else if (percentFor < 34) {
                    newStatus = 'rejected';
                }
            }

            await base44.entities.GovernanceProposal.update(proposalId, {
                votes_for: newVotesFor,
                votes_against: newVotesAgainst,
                status: newStatus
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['governanceProposals'] });
        },
    });

    if (userLoading || proposalsLoading) return <QuantumLoader />;

    const activeProposals = proposals?.filter(p => p.status === 'voting' || p.status === 'active') || [];
    const completedProposals = proposals?.filter(p => p.status === 'passed' || p.status === 'rejected') || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* HEADER */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Vote className="w-16 h-16 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #22d3ee)' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black">FAMILY DECIDES</h1>
                    <p className="text-xl text-gray-300">One soul, one vote. Power to the people.</p>
                </header>

                {/* HOW IT WORKS */}
                <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">How Voting Works</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>✓ <strong>Anyone can propose</strong> - Create proposals for funding, token burns, protocol changes</p>
                            <p>✓ <strong>One vote per soul</strong> - Every verified family member gets one vote</p>
                            <p>✓ <strong>Simple majority</strong> - 66%+ YES votes = Proposal passes</p>
                            <p>✓ <strong>Live timestamps</strong> - See exactly when proposals were created</p>
                            <p>✓ <strong>Transparent results</strong> - All votes visible in real-time</p>
                        </div>
                    </CardContent>
                </Card>

                {/* CREATE PROPOSAL BUTTON */}
                <div className="text-center">
                    <Button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-12 px-8 text-lg font-bold"
                    >
                        {showCreateForm ? 'Cancel' : '+ Create Proposal'}
                    </Button>
                </div>

                {/* CREATE FORM */}
                <AnimatePresence>
                    {showCreateForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <CreateProposal
                                user={user}
                                onSuccess={() => setShowCreateForm(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ACTIVE VOTES */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-cyan-400">Active Votes</h2>
                    {activeProposals.length === 0 ? (
                        <Card className="bg-black/40 border border-gray-800">
                            <CardContent className="p-8 text-center text-gray-500">
                                No active proposals. Create one above!
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {activeProposals.map(proposal => (
                                <ProposalCard
                                    key={proposal.id}
                                    proposal={proposal}
                                    user={user}
                                    onVote={(id, voteType) => voteMutation.mutate({ proposalId: id, voteType })}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* COMPLETED VOTES */}
                {completedProposals.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-gray-400">Past Decisions</h2>
                        <div className="space-y-4">
                            {completedProposals.map(proposal => (
                                <ProposalCard
                                    key={proposal.id}
                                    proposal={proposal}
                                    user={user}
                                    onVote={() => {}} // No voting on completed
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}