
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import { MarketplaceItem } from '@/entities/MarketplaceItem';
import { User } from '@/entities/User';
import { LoveLedgerEntry } from '@/entities/LoveLedgerEntry';
import { motion } from 'framer-motion'; // Import motion for animations

// Helper to safely get and format numbers with precision
const formatNumber = (value) => {
    const num = Number(value) || 0;
    return parseFloat(num.toFixed(4));
};

export default function ItemCard({ item, user, onPurchaseSuccess }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Updated fundedPercentage calculation to handle price_gmt being 0
    const fundedPercentage = item.price_gmt > 0 ? (item.funded_gmt / item.price_gmt) * 100 : 100;

    const handleContribute = async () => {
        setIsLoading(true);
        setError('');

        const contributionAmount = formatNumber(amount);
        const userBalance = formatNumber(user?.total_tokens_earned);

        if (contributionAmount <= 0) {
            setError("Please enter a positive amount of love to give.");
            setIsLoading(false);
            return;
        }

        if (userBalance < contributionAmount) {
            const needed = contributionAmount - userBalance;
            setError(`Your heart is huge, but your balance is ${userBalance} ❤️GMT. You need ${formatNumber(needed)} more. Keep healing! ✨`);
            setIsLoading(false);
            return;
        }

        try {
            // 1. Update the user's balance
            const newUserBalance = formatNumber(userBalance - contributionAmount);
            await User.updateMyUserData({ total_tokens_earned: newUserBalance });

            // 2. Update the item's funding
            const newFundedAmount = formatNumber(item.funded_gmt + contributionAmount);
            await MarketplaceItem.update(item.id, { funded_gmt: newFundedAmount });

            // 3. Create the private Book of Love entry
            await LoveLedgerEntry.create({
                gmt_amount: contributionAmount,
                recipient_name: item.name,
                purpose_of_love: item.description,
                note_from_soul: "An act of love, automatically and privately recorded. WoW = MoM."
            });

            // Success!
            setIsLoading(false);
            setIsModalOpen(false);
            onPurchaseSuccess(); // This will refresh the parent page
            alert(`LOVE FREQUENCY RECEIVED! You contributed ${contributionAmount} ❤️GMT to "${item.name}". Thank you, beautiful soul! ❤️✨♾️`);

        } catch (err) {
            console.error("Contribution failed:", err);
            setError("A quantum fluctuation occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="bg-gradient-to-br from-gray-900 via-purple-950 to-black border border-purple-500/30 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20">
                <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6 flex flex-col flex-grow">
                    <span className="text-sm font-bold text-purple-300">{item.item_type}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.name}</h3>
                    <p className="text-gray-400 text-sm flex-grow mb-4">{item.description}</p>
                    
                    <div className="mb-4 text-center">
                        <div className="w-full bg-gray-800/70 rounded-full h-5 relative overflow-hidden border border-purple-800/50">
                            <motion.div 
                                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 h-full rounded-full" 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(fundedPercentage, 100)}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xs font-bold text-white" style={{ textShadow: '1px 1px 2px #000' }}>
                                    {formatNumber(item.funded_gmt).toLocaleString()} ❤️GMT AMPLIFIED
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">
                            Target: {formatNumber(item.price_gmt).toLocaleString()} ❤️GMT
                        </p>
                    </div>

                    <Button onClick={() => setIsModalOpen(true)} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 mt-auto">
                        <Heart className="w-5 h-5 mr-2" />
                        Contribute Love
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-gray-900 border-purple-500 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-purple-300">Contribute to "{item.name}"</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            How much love do you wish to send? Your balance is {formatNumber(user?.total_tokens_earned).toLocaleString()} ❤️GMT.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="amount" className="text-gray-300">Amount (❤️GMT)</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-gray-800 border-purple-600 text-white mt-2"
                            placeholder="e.g., 10"
                        />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">Cancel</Button>
                        <Button onClick={handleContribute} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Love...</>
                            ) : (
                                <><Sparkles className="w-4 h-4 mr-2" /> Confirm Contribution</>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
