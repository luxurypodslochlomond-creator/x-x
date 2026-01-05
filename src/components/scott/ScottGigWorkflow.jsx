import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, XCircle, Loader2, Users } from 'lucide-react';

/**
 * CB51 GIG WORKFLOW - Scott's main use case
 * 1. Email comes in
 * 2. AI scans → extracts gig details
 * 3. Band/crew get YES/NO notification
 * 4. Scott sees results → responds
 */

export default function ScottGigWorkflow() {
    const [emailText, setEmailText] = useState('');
    const [parsedGig, setParsedGig] = useState(null);
    const [sentToTeam, setSentToTeam] = useState(false);
    const queryClient = useQueryClient();

    // Fetch team for YES/NO voting
    const { data: team = [] } = useQuery({
        queryKey: ['scottTeam'],
        queryFn: () => base44.entities.ScottTeamMember.filter({ active: true })
    });

    // Parse email with AI
    const parseEmailMutation = useMutation({
        mutationFn: async (email) => {
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Scott pasted this - extract ANY gig/session/event details:

${email}

Extract whatever you can find:
- Venue/studio name (or "TBC" if not clear)
- Date (YYYY-MM-DD format, or approximate if not exact)
- Fee/guarantee (£ amount, or 0 if not mentioned)
- Artist/band name (or "TBC" if not clear)
- Any other details

ALWAYS extract something - don't say it's not a gig. Scott needs this to work.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        venue_name: { type: "string" },
                        offer_date: { type: "string" },
                        guarantee: { type: "number" },
                        artist_name: { type: "string" },
                        notes: { type: "string" }
                    }
                }
            });
            return result;
        },
        onSuccess: (data) => {
            setParsedGig(data);
        }
    });

    // Send YES/NO to team
    const sendToTeamMutation = useMutation({
        mutationFn: async () => {
            // Create gig offer first
            const gigOffer = await base44.entities.ScottGigOffer.create({
                venue_name: parsedGig.venue_name,
                offer_date: parsedGig.offer_date,
                guarantee: parsedGig.guarantee,
                artist_name: parsedGig.artist_name,
                notes: parsedGig.notes,
                status: 'pending_team_decision',
                decision_due: parsedGig.offer_date
            });

            // Create message for each team member
            const promises = team.map(member =>
                base44.entities.ScottMessage.create({
                    team_member_id: member.id,
                    message_text: `GIG OFFER: ${parsedGig.venue_name} on ${parsedGig.offer_date}${parsedGig.guarantee ? ` - £${parsedGig.guarantee}` : ''}. YES or NO?`,
                    priority: 'urgent',
                    category: 'gig_decision',
                    status: 'pending_response',
                    related_gig_id: gigOffer.id
                })
            );
            await Promise.all(promises);
        },
        onSuccess: () => {
            setSentToTeam(true);
            queryClient.invalidateQueries(['scottMessages']);
            queryClient.invalidateQueries(['scottGigOffers']);
        }
    });

    const handleReset = () => {
        setEmailText('');
        setParsedGig(null);
        setSentToTeam(false);
    };

    return (
        <div className="bg-black border-2 border-amber-500 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Mail className="w-8 h-8 text-amber-400" />
                <div>
                    <h2 className="text-amber-400 font-black text-xl font-mono">GIG WORKFLOW</h2>
                    <p className="text-gray-500 text-xs font-mono">Email → AI → YES/NO → Done</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!parsedGig ? (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <Textarea
                            value={emailText}
                            onChange={(e) => setEmailText(e.target.value)}
                            placeholder="Paste gig offer email here..."
                            rows={8}
                            className="bg-black/60 border-2 border-gray-700 text-white font-mono text-sm focus:border-amber-500"
                        />
                        <Button
                            onClick={() => parseEmailMutation.mutate(emailText)}
                            disabled={!emailText.trim() || parseEmailMutation.isPending}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black"
                        >
                            {parseEmailMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    AI SCANNING...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    SCAN EMAIL
                                </>
                            )}
                        </Button>
                    </motion.div>
                ) : !sentToTeam ? (
                    <motion.div
                        key="confirm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-3 text-sm">✓ GIG DETAILS EXTRACTED:</p>
                            <div className="space-y-2 text-sm font-mono">
                                <p className="text-white"><strong>Venue:</strong> {parsedGig.venue_name}</p>
                                <p className="text-white"><strong>Date:</strong> {parsedGig.offer_date}</p>
                                {parsedGig.guarantee && <p className="text-white"><strong>Guarantee:</strong> £{parsedGig.guarantee}</p>}
                                {parsedGig.artist_name && <p className="text-white"><strong>Artist:</strong> {parsedGig.artist_name}</p>}
                                {parsedGig.notes && <p className="text-gray-400 text-xs mt-2">{parsedGig.notes}</p>}
                            </div>
                        </div>

                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold mb-2 text-sm">SEND YES/NO TO:</p>
                            <div className="space-y-1">
                                {team.map(member => (
                                    <p key={member.id} className="text-white text-xs font-mono flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3 text-green-400" />
                                        {member.name} ({member.role})
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={handleReset}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 font-bold"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={() => sendToTeamMutation.mutate()}
                                disabled={sendToTeamMutation.isPending || team.length === 0}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-black"
                            >
                                {sendToTeamMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        SENDING...
                                    </>
                                ) : (
                                    <>
                                        <Users className="w-4 h-4 mr-2" />
                                        SEND TO {team.length} PEOPLE
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-green-900/40 border-4 border-green-500 rounded-lg p-6 text-center">
                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
                            <p className="text-green-400 font-black text-xl font-mono mb-2">SENT ✓</p>
                            <p className="text-white text-sm font-mono">
                                {team.length} people notified
                            </p>
                            <p className="text-gray-400 text-xs font-mono mt-2">
                                You'll see YES/NO responses as they come in
                            </p>
                        </div>

                        <Button
                            onClick={handleReset}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black"
                        >
                            NEW GIG
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}