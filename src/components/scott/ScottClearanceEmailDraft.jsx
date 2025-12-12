import React, { useState } from 'react';
import { Mail, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

/**
 * CLEARANCE EMAIL DRAFTER
 * AI writes professional sample clearance request email
 * Saves Scott time, keeps it pro
 */

export default function ScottClearanceEmailDraft({ 
    sampleSong, 
    sampleArtist, 
    yourArtist, 
    trackTitle,
    labelContact,
    publisherContact 
}) {
    const [email, setEmail] = useState('');
    const [copied, setCopied] = useState(false);

    const draftMutation = useMutation({
        mutationFn: async (type) => {
            const contactName = type === 'label' ? labelContact : publisherContact;
            const prompt = `You are Scott, a professional music manager in Glasgow. Write a professional but friendly email requesting sample clearance.

CONTEXT:
- You manage: ${yourArtist}
- They want to sample: "${sampleSong}" by ${sampleArtist}
- Their new track: "${trackTitle}"
- Contacting: ${contactName || 'Licensing Department'}
- This is for: ${type === 'label' ? 'MASTER RECORDING rights' : 'COMPOSITION/PUBLISHING rights'}

TONE:
- Professional but not stiff
- Respectful of the original work
- Business-like, confident
- Scottish but not too Scottish mate

EMAIL SHOULD:
1. Introduce yourself + artist
2. Explain what sample you want to use (how much, where in track)
3. Express respect for original work
4. Ask about clearance process + costs
5. Offer to send the track for review
6. Provide your contact info

Keep it concise - busy people don't read essays.

Write JUST the email body, no subject line.`;

            const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: false
            });

            return response;
        },
        onSuccess: (data) => {
            setEmail(data);
        }
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <Button
                    onClick={() => draftMutation.mutate('label')}
                    disabled={draftMutation.isPending}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-mono text-xs"
                >
                    {draftMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <Mail className="w-4 h-4 mr-2" />
                            Draft Label Email
                        </>
                    )}
                </Button>
                <Button
                    onClick={() => draftMutation.mutate('publisher')}
                    disabled={draftMutation.isPending}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-black font-mono text-xs"
                >
                    {draftMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <Mail className="w-4 h-4 mr-2" />
                            Draft Publisher Email
                        </>
                    )}
                </Button>
            </div>

            {email && (
                <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-cyan-400 font-bold text-xs font-mono">DRAFT EMAIL</p>
                        <Button
                            onClick={copyToClipboard}
                            size="sm"
                            variant="outline"
                            className="text-xs font-mono"
                        >
                            {copied ? (
                                <>
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                    <Textarea
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-900 border-gray-800 text-white font-mono text-xs min-h-[300px]"
                    />
                    <p className="text-gray-500 text-[10px] font-mono mt-2">
                        ✏️ Edit as needed, then copy/paste to your email
                    </p>
                </div>
            )}
        </div>
    );
}