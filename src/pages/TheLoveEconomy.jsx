import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Heart, Leaf, Users, Banknote, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import P51Symbol from '@/components/shared/P51Symbol';

const Pillar = ({ icon: Icon, title, text, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-black/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 h-full"
    >
        <div className="flex items-center gap-3 mb-3">
            <Icon className="w-8 h-8 text-purple-30a00" />
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{text}</p>
    </motion.div>
);

export default function TheLoveEconomy() {
    React.useEffect(() => {
        document.title = "The Love Economy | UF51";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-16">
                <header className="text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
                        <Banknote className="w-24 h-24 text-green-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #4ade80)' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-green-400 via-white to-cyan-400 bg-clip-text text-transparent">
                        The Pure Love Economy
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        This is not a new currency. This is a new economic physics. We have proven that love, healing, and creation have measurable, undeniable value. Welcome to the UF51 reality.
                    </p>
                </header>

                <Card className="bg-black/70 border-2 border-green-500/50 rounded-3xl shadow-2xl shadow-green-500/20 p-8 text-center">
                    <CardTitle className="text-3xl font-bold text-white mb-3">
                        Our Currency is PHOTO51 (<P51Symbol />)
                    </CardTitle>
                    <CardContent className="p-0">
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            <P51Symbol /> is a new asset class backed by the only thing that matters: a healed planet and a thriving family. Every single token is generated from a verified act of love—healing the planet, creating beauty, or helping another soul. We use the '$' symbol not to mimic the old system, but to reclaim it. It is a bridge for souls to cross into our reality.
                        </p>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-4xl font-bold text-center mb-10 text-white">The Three Pillars of Value</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Pillar
                            icon={Leaf}
                            title="Planetary Healing"
                            text="The primary way to mint new P51. Every verified cleanup of our home, from a single piece of litter to a full-scale mission, generates new Love Currency into the system."
                            delay={0.2}
                        />
                        <Pillar
                            icon={Heart}
                            title="Acts of Love"
                            text="Non-physical healing also has value. Submitting a verified 'Proof of Love'—an act of kindness, compassion, or community support—is rewarded with P51 from the Family Fund."
                            delay={0.3}
                        />
                        <Pillar
                            icon={Users}
                            title="Soul Support"
                            text="Allies can provide liquidity by purchasing existing P51 from Healers via the Love Bridge. This provides instant cash for our Healers and strengthens the entire ecosystem without inflating supply."
                            delay={0.4}
                        />
                    </div>
                </section>

                <section className="text-center">
                    <Link to={createPageUrl('HowYouEarn')}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 text-xl rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold shadow-lg"
                        >
                            <Coins className="inline-block w-6 h-6 mr-3"/>
                            Learn How You Earn
                        </motion.button>
                    </Link>
                </section>

                 <div className="text-center text-gray-500 pt-8 border-t border-gray-800">
                    <p className="font-mono">UF51.LOVE PROTOCOL: PURE.LOVE.ECONOMY.GMT</p>
                </div>
            </div>
        </div>
    );
}