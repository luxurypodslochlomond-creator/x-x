import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Gift, Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';
// This import will be unused but kept as per original file structure

const SendToUser = ({ user, onFinish }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => base44.functions.invoke('passItOn', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['walletUser'] });
            queryClient.invalidateQueries({ queryKey: ['walletTransactions'] });
            queryClient.invalidateQueries({ queryKey: ['profileMe'] });
             queryClient.invalidateQueries({ queryKey: ['portalUser'] });
            setSuccess(true);
            setIsProcessing(false);
            setTimeout(() => {
                setSuccess(false);
                setRecipient('');
                setAmount('');
                setMessage('');
                onFinish();
            }, 3000);
        },
        onError: (err) => {
            setError(err.response?.data?.error || 'An unknown error occurred.');
            setIsProcessing(false);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const p51Amount = parseFloat(amount);
        if (!recipient || !p51Amount || p51Amount <= 0) {
            setError('Please fill in all fields with valid values.');
            return;
        }
        if (p51Amount > (user.love_balance || 0)) {
            setError("You don't have enough P51 to send.");
            return;
        }
        
        setIsProcessing(true);
        setError('');

        mutation.mutate({
            recipientEmail: recipient,
            amount: p51Amount,
            message: message,
            senderName: user.full_name || 'A Beautiful Soul'
        });
    };

    if (success) {
        return (
            <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 mx-auto text-green-400" />
                <h3 className="text-2xl font-bold mt-4">P51 Transmitted!</h3>
                <p className="text-gray-400">Your gift is on its way through the cosmos.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="recipient" className="text-lg">Recipient's Email</Label>
                <Input id="recipient" type="email" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="soul@example.com" className="bg-gray-900/50 border-gray-600 mt-1" />
            </div>
            <div>
                <Label htmlFor="amount" className="text-lg">Amount to Send</Label>
                <div className="relative">
                    <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" className="bg-gray-900/50 border-gray-600 pr-20 mt-1" />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none font-mono">P51</div>
                </div>
                 <Button type="button" variant="link" onClick={() => setAmount(user.love_balance || 0)} className="text-xs text-cyan-400 p-0 h-auto mt-1">Send all</Button>
            </div>
            <div>
                <Label htmlFor="message" className="text-lg">Message of Love (Optional)</Label>
                <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Share your heart..." className="bg-gray-900/50 border-gray-600 mt-1" />
            </div>
            {error && <p className="text-red-500 flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4" />{error}</p>}
            <Button type="submit" disabled={isProcessing} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold h-12 text-lg">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                Transmit P51
            </Button>
        </form>
    );
};

export default function PassItOnPage() {
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useQuery({
        queryKey: ['walletUser'],
        queryFn: () => base44.auth.me(),
    });

    useEffect(() => {
        document.title = 'Forging the Sacred Name: P51 is Our Currency';
    }, []);

    if (isLoading) return <QuantumLoader />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-pink-950/30 to-black text-white p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-8">
                    <Gift className="w-16 h-16 mx-auto text-pink-400 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Pass It On</h1>
                    <p className="text-lg text-gray-400">Send your earned P51 to another soul.</p>
                </header>

                <Card className="bg-black/40 border border-gray-700 rounded-2xl">
                    <CardHeader className="text-center">
                        <p className="text-gray-400">Your Current P51 Balance</p>
                        <CardTitle className="text-4xl font-bold flex items-center justify-center gap-2">
                            {(user?.love_balance || 0).toLocaleString()} <span className="font-mono">P51</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <SendToUser user={user} onFinish={() => queryClient.invalidateQueries({ queryKey: ['walletUser'] })} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}