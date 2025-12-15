import React, { useState } from 'react';
import { Coffee, Phone, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RestaurantDirectory() {
    // MOCK DATA - Edinburgh campus restaurants
    const restaurants = [
        { name: 'Pizza Paradise', phone: '0131 555 0101', address: '12 Nicholson St', cuisine: 'Italian', avgOrder: '£20', youSave: '£5.60' },
        { name: 'Curry Kingdom', phone: '0131 555 0202', address: '45 South Bridge', cuisine: 'Indian', avgOrder: '£18', youSave: '£5.04' },
        { name: 'Burger Station', phone: '0131 555 0303', address: '8 Bristo Pl', cuisine: 'American', avgOrder: '£15', youSave: '£4.20' },
        { name: 'Noodle Bar', phone: '0131 555 0404', address: '22 Potterrow', cuisine: 'Chinese', avgOrder: '£16', youSave: '£4.48' },
        { name: 'Sushi Express', phone: '0131 555 0505', address: '31 Clerk St', cuisine: 'Japanese', avgOrder: '£25', youSave: '£7.00' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-4 border-amber-500 rounded-xl p-4 text-center mb-6" style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.5)' }}>
                <Coffee className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                <h2 className="text-amber-400 font-black text-xl font-mono mb-1">FOOD DIRECT</h2>
                <p className="text-white text-xs font-mono mb-2">Call restaurant → They keep full money → You save £5.64</p>
                <p className="text-green-400 text-sm font-black font-mono">FUCK JUST EAT ♾️❤️♾️</p>
            </div>

            {/* SAVINGS BANNER */}
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-3 text-center">
                <p className="text-green-400 font-black text-sm font-mono">Students saved £12,480 this week 💚</p>
            </div>

            {/* RESTAURANTS */}
            <div className="space-y-3">
                {restaurants.map((r, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-4 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-white font-black font-mono mb-1">{r.name}</h3>
                                <p className="text-gray-400 text-xs font-mono flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {r.address}
                                </p>
                                <p className="text-cyan-400 text-xs font-mono">{r.cuisine}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400 font-black text-sm font-mono">SAVE {r.youSave}</p>
                                <p className="text-gray-500 text-[10px] font-mono">vs Just Eat</p>
                            </div>
                        </div>

                        <a
                            href={`tel:${r.phone}`}
                            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-black py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                            <Phone className="w-5 h-5" />
                            CALL {r.phone}
                        </a>

                        <p className="text-gray-600 text-[10px] font-mono text-center mt-2">
                            Restaurant keeps full {r.avgOrder} • Zero extraction ♾️
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-4 text-center">
                <p className="text-pink-400 font-bold text-sm font-mono mb-1">YOUR RESTAURANT?</p>
                <p className="text-gray-400 text-xs font-mono">Pay £200/year → Reach 1,000+ students</p>
                <p className="text-green-400 text-xs font-mono font-bold mt-1">prof51.io/restaurants</p>
            </div>
        </div>
    );
}