import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, User, GitBranch, Hand, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const typeIcons = {
  protocol: GitBranch,
  funding: Sparkles,
  community: Hand,
  other: User
};

const statusColors = {
    active: 'border-blue-500/30 hover:border-blue-500/80',
    voting: 'border-yellow-500/30 hover:border-yellow-500/80 shadow-yellow-500/10',
    passed: 'border-green-500/30 hover:border-green-500/80',
    rejected: 'border-red-500/30 hover:border-red-500/80',
};

export default function ProposalCard({ proposal, onVote }) {
  const Icon = typeIcons[proposal.type] || User;
  const totalVotes = proposal.votes_for + proposal.votes_against;
  const forPercentage = totalVotes > 0 ? (proposal.votes_for / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.votes_against / totalVotes) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Card className={`bg-gray-900/50 text-gray-200 backdrop-blur-xl shadow-lg transition-all duration-300 ${statusColors[proposal.status]}`}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-white">{proposal.title}</CardTitle>
            <CardDescription className="text-xs text-purple-300">
              Proposed by {proposal.proposer}
            </CardDescription>
          </div>
           <Badge variant="outline" className="border-purple-400/50 text-purple-300 capitalize flex items-center gap-2">
              <Icon className="w-3 h-3" />
              {proposal.type}
           </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300 line-clamp-3">{proposal.description}</p>
          {proposal.status === 'voting' && (
            <div className="mt-4">
                <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                    <div 
                        className="bg-green-500 h-2.5 rounded-l-full" 
                        style={{ width: `${forPercentage}%` }}
                    ></div>
                </div>
                 <div className="flex justify-between text-xs mt-1">
                    <span className="text-green-400">{proposal.votes_for} For</span>
                    <span className="text-red-400">{proposal.votes_against} Against</span>
                </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Badge className="capitalize" variant={proposal.status === 'passed' ? 'default' : 'secondary'}>
                {proposal.status}
            </Badge>
          {proposal.status === 'voting' && (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="text-green-400 border-green-400/50 hover:bg-green-500/20" onClick={() => onVote(proposal.id, 'for')}>
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="text-red-400 border-red-400/50 hover:bg-red-500/20" onClick={() => onVote(proposal.id, 'against')}>
                <ThumbsDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}