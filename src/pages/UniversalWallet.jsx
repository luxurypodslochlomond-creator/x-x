import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet, Send, Loader2, CheckCircle, AlertTriangle, ArrowRight, TrendingUp, TrendingDown, Gift, Leaf, Heart, ShoppingCart, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import QuantumLoader from '@/components/shared/QuantumLoader';
import PushNotifications from '@/components/shared/PushNotifications';
import P2PTransfer from '@/components/shared/P2PTransfer';

const UseCase = ({ icon: Icon, title, description, action, color, to }) => (
    <Link to={to}>
        <Card className={`bg-black/40 border-2 ${color} hover:scale-105 transition-transform cursor-pointer h-full`}>
            <CardContent className="p-6">
                <Icon className="w-10 h-10 mb-3" style={{ color: color.replace('border-', '').replace('/50', '') }} />
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 mb-4">{description}</p>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    {action} <ArrowRight className="w-4 h-4" />
                </div>
            </CardContent>
        </Card>
    </Link>
);

const SendForm = ({ user, onSuccess }) => {
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
            setSuccess(true);
            setIsProcessing(false);
            setTimeout(() => {
                setSuccess(false);
                setRecipient('');
                setAmount('');
                setMessage('');
                onSuccess();
            }, 2000);
        },
        onError: (err) => {
            setError(err.response?.data?.error || 'Failed to send');
            setIsProcessing(false);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const p51Amount = parseFloat(amount);
        if (!recipient || !p51Amount || p51Amount <= 0) {
            setError('Please fill in all fields');
            return;
        }
        if (p51Amount > (user.p51_balance || 0)) { // Changed from user.love_balance to user.p51_balance
            setError("You don't have enough P51");
            return;
        }
        
        setIsProcessing(true);
        setError('');

        mutation.mutate({
            mode: 'family',
            recipient: recipient,
            amount: p51Amount,
            message: message
        });
    };

    if (success) {
        return (
            <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
                <h3 className="text-2xl font-bold">P51 Sent!</h3>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="recipient">Recipient's Email</Label>
                <Input 
                    id="recipient" 
                    type="email" 
                    value={recipient} 
                    onChange={e => setRecipient(e.target.value)} 
                    placeholder="soul@example.com" 
                    className="bg-gray-900/50 border-gray-600 mt-1" 
                />
            </div>
            <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                    <Input 
                        id="amount" 
                        type="number" 
                        step="0.1"
                        value={amount} 
                        onChange={e => setAmount(e.target.value)} 
                        placeholder="0" 
                        className="bg-gray-900/50 border-gray-600 pr-20 mt-1" 
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none font-mono text-gray-400">
                        P51
                    </div>
                </div>
                <Button 
                    type="button" 
                    variant="link" 
                    onClick={() => setAmount(user.p51_balance || 0)} // Changed from user.love_balance to user.p51_balance
                    className="text-xs text-cyan-400 p-0 h-auto mt-1"
                >
                    Send all
                </Button>
            </div>
            <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea 
                    id="message" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Share your heart..." 
                    className="bg-gray-900/50 border-gray-600 mt-1" 
                />
            </div>
            {error && (
                <p className="text-red-500 flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4" />{error}
                </p>
            )}
            <Button 
                type="submit" 
                disabled={isProcessing} 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold h-12 text-lg"
            >
                {isProcessing ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" />Sending...</>
                ) : (
                    <><Send className="w-5 h-5 mr-2" />Send P51</>
                )}
            </Button>
        </form>
    );
};

const TransactionRow = ({ tx }) => {
    const isCredit = tx.transaction_type === 'earned' || tx.transaction_type === 'received';
    const Icon = tx.reason?.toLowerCase().includes('cleanup') ? Leaf : 
                 tx.reason?.toLowerCase().includes('love') ? Heart : 
                 tx.transaction_type === 'received' ? Gift :
                 isCredit ? TrendingUp : TrendingDown;
    const color = isCredit ? 'text-green-400' : 'text-red-400';

    return (
        <TableRow className="border-gray-800">
            <TableCell className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(tx.created_date), { addSuffix: true })}
            </TableCell>
            <TableCell className="text-gray-300 text-sm flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                {tx.reason}
            </TableCell>
            <TableCell className={`text-right font-bold ${color} font-mono`}>
                {isCredit ? '+' : '-'}{tx.p51_amount?.toLocaleString() ?? 0}
            </TableCell>
        </TableRow>
    );
};

export default function UniversalWalletPage() {
    const [showSendForm, setShowSendForm] = useState(false);

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['walletUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: transactions, isLoading: txLoading } = useQuery({
        queryKey: ['walletTransactions', user?.email],
        queryFn: async () => {
            if (!user) return [];
            const [txs, cleanups, proofsOfLove] = await Promise.all([
                base44.entities.Transaction.filter({
                    $or: [ { from_user: user.email }, { to_user: user.email } ]
                }, '-created_date', 50),
                base44.entities.Cleanup.filter({ created_by: user.email }, '-created_date', 50),
                base44.entities.ProofOfLove.filter({ created_by: user.email }, '-created_date', 50)
            ]);

            const cleanupTxs = cleanups.map(c => ({
                id: `cleanup-${c.id}`,
                created_date: c.created_date,
                transaction_type: 'earned',
                p51_amount: c.tokens_awarded,
                reason: 'Planetary Healing'
            }));

            const proofTxs = proofsOfLove.map(p => ({
                id: `proof-${p.id}`,
                created_date: p.created_date,
                transaction_type: 'earned',
                p51_amount: p.p51_awarded || 0,
                reason: `Act of Love: ${p.love_type}`
            }));

            const allTx = [...txs, ...cleanupTxs, ...proofTxs];
            return allTx.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        },
        enabled: !!user?.email,
    });

    if (userLoading) return <QuantumLoader />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <header className="text-center">
                    <Wallet className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-black">Your Wallet</h1>
                    <p className="text-gray-400 mt-2">P51 = Real value. Real power.</p>
                </header>

                {/* Balance */}
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
                    <CardContent className="p-8 text-center space-y-4">
                        <p className="text-gray-400 mb-2">Current Balance</p>
                        <p className="text-6xl font-black text-white">
                            {(user?.p51_balance || 0).toLocaleString()} <span className="font-mono text-4xl">P51</span>
                        </p>
                        
                        <PushNotifications />
                        
                        <div className="flex gap-4 justify-center flex-wrap pt-4">
                            <Link to={createPageUrl('NewCleanup')}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <Leaf className="w-5 h-5 mr-2" />
                                    Earn More
                                </Button>
                            </Link>
                            <Button 
                                onClick={() => setShowSendForm(!showSendForm)}
                                className="bg-pink-600 hover:bg-pink-700"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Send P51
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* P2P Transfer Form */}
                {showSendForm && (
                    <P2PTransfer 
                        userBalance={user?.p51_balance || 0} 
                        onSuccess={() => setShowSendForm(false)} 
                    />
                )}

                {/* What Can You Do With P51? */}
                <div>
                    <h2 className="text-2xl font-black text-white mb-4 text-center">What Can You Do With P51?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <UseCase
                            icon={Gift}
                            title="Send To Family"
                            description="Share love with souls around the world"
                            action="Pass It On"
                            color="border-pink-500/50"
                            to={createPageUrl('PassItOn')}
                        />
                        <UseCase
                            icon={Globe}
                            title="Fund Missions"
                            description="Support real-world healing projects"
                            action="View Missions"
                            color="border-cyan-500/50"
                            to={createPageUrl('Missions')}
                        />
                        <UseCase
                            icon={ShoppingCart}
                            title="Help Souls"
                            description="Buy groceries, bills, essentials for family"
                            action="Marketplace"
                            color="border-green-500/50"
                            to={createPageUrl('FundTheFamily')}
                        />
                        <UseCase
                            icon={Heart}
                            title="Acts of Love"
                            description="Fund beautiful acts of kindness"
                            action="Create Love"
                            color="border-purple-500/50"
                            to={createPageUrl('CreateBeauty')}
                        />
                    </div>
                </div>

                {/* Value Proposition */}
                <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-2 border-cyan-500/50">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 text-center">Why P51 Has Value</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🌍</div>
                                <p className="font-bold text-green-300">Earned Through Action</p>
                                <p className="text-gray-400 text-xs">Every P51 = real work healing Earth</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">💚</div>
                                <p className="font-bold text-pink-300">Backed By Love</p>
                                <p className="text-gray-400 text-xs">Community trust + verified proof</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">🔄</div>
                                <p className="font-bold text-cyan-300">Real Utility</p>
                                <p className="text-gray-400 text-xs">Send, fund, help, create</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="bg-black/60 border border-gray-700">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-800">
                                        <TableHead>Time</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {txLoading && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8">
                                                <Loader2 className="w-6 h-6 mx-auto animate-spin text-purple-400" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {transactions?.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
                                    {!txLoading && transactions?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                                No activity yet. Start healing to earn P51.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Full Statement Link */}
                <div className="text-center">
                    <Link to={createPageUrl('Profile')}>
                        <Button variant="outline" className="border-gray-700">
                            View Full Statement <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}