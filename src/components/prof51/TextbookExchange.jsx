import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Search, MessageCircle, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TextbookExchange() {
    const [searchQuery, setSearchQuery] = useState('');

    // MOCK DATA - P2P textbook listings
    const listings = [
        { id: 1, book: 'Principles of Economics', author: 'Mankiw', condition: 'Like New', price: 35, seller: 'Sophie', location: 'Edinburgh', distance: '0.2km' },
        { id: 2, book: 'Advanced Microeconomics', author: 'Varian', condition: 'Good', price: 28, seller: 'James', location: 'Edinburgh', distance: '0.5km' },
        { id: 3, book: 'Game Theory', author: 'Osborne', condition: 'Fair', price: 20, seller: 'Emma', location: 'Edinburgh', distance: '1.2km' },
        { id: 4, book: 'Statistics for Business', author: 'Anderson', condition: 'Like New', price: 32, seller: 'Alex', location: 'Edinburgh', distance: '0.8km' },
    ];

    const filtered = listings.filter(l => 
        l.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-4 border-amber-500 rounded-xl p-4" style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <Book className="w-10 h-10 text-amber-400" />
                    <div>
                        <h2 className="text-amber-400 font-black text-xl font-mono">TEXTBOOK SWAP</h2>
                        <p className="text-gray-400 text-xs font-mono">Buy/sell P2P • Global network</p>
                    </div>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <Input
                        placeholder="Search textbooks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-black border-amber-500/30 text-white font-mono"
                    />
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-3 mb-4 text-center">
                    <p className="text-green-400 font-bold text-sm font-mono">Students saved £45,280 this term 💚</p>
                    <p className="text-gray-400 text-xs font-mono">vs university bookshop prices</p>
                </div>
            </div>

            {/* LISTINGS */}
            <div className="space-y-3">
                {filtered.map((listing) => (
                    <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-4 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-white font-black font-mono text-sm mb-1">{listing.book}</h3>
                                <p className="text-gray-400 text-xs font-mono mb-2">{listing.author}</p>
                                <div className="flex items-center gap-3 text-xs font-mono">
                                    <span className={`${listing.condition === 'Like New' ? 'text-green-400' : listing.condition === 'Good' ? 'text-cyan-400' : 'text-amber-400'}`}>
                                        {listing.condition}
                                    </span>
                                    <span className="text-purple-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {listing.distance}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400 font-black text-xl font-mono">£{listing.price}</p>
                                <p className="text-gray-500 text-[10px] font-mono line-through">£60 new</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-black py-2 text-sm">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                MESSAGE {listing.seller.toUpperCase()}
                            </Button>
                        </div>

                        <p className="text-gray-600 text-[10px] font-mono text-center mt-2">
                            P2P encrypted • Meet on campus • Pay cash ♾️
                        </p>
                    </motion.div>
                ))}

                {filtered.length === 0 && (
                    <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
                        <p className="text-gray-600 text-sm font-mono">No results</p>
                        <p className="text-gray-700 text-xs font-mono mt-1">Try different search</p>
                    </div>
                )}
            </div>

            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-4 text-center">
                <p className="text-pink-400 font-bold text-sm font-mono mb-1">WANT TO SELL?</p>
                <p className="text-gray-400 text-xs font-mono mb-2">List your textbooks • Reach students globally</p>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white font-black text-sm">
                    LIST TEXTBOOK
                </Button>
            </div>
        </div>
    );
}