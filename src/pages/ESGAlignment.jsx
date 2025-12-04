import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Droplet, Handshake, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const esgData = [
  {
    category: 'Environmental',
    icon: Droplet,
    color: 'text-blue-400',
    points: [
      "Directly incentivizes the removal of waste from natural ecosystems (land & water).",
      "Provides verifiable, geolocated data on pollution removal for impact reporting.",
      "Promotes a circular economy mindset by valuing reclamation over consumption.",
      "Creates a tangible metric for corporate partners to fund direct, grassroots climate action."
    ]
  },
  {
    category: 'Social',
    icon: Users,
    color: 'text-pink-400',
    points: [
      "Creates a new, accessible income stream for individuals globally, based on positive action.",
      "Fosters community engagement and a sense of shared purpose.",
      "Provides a transparent, auditable system for distributing aid and funding social projects.",
      "The Universal Design Protocol ensures radical inclusivity for all users, regardless of ability."
    ]
  },
  {
    category: 'Governance',
    icon: ShieldCheck,
    color: 'text-green-400',
    points: [
      "Built on an immutable ledger, ensuring 100% transparency and preventing corruption.",
      "All transactions and impacts are publicly verifiable, creating radical accountability.",
      "A decentralized model empowers individuals, reducing reliance on top-down, opaque institutions.",
      "Future on-chain governance will allow the community to direct the flow of resources."
    ]
  }
];

const ESGCard = ({ item, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
    >
        <Card className="h-full bg-black/50 border-gray-800 rounded-2xl">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <item.icon className={`w-10 h-10 ${item.color}`} />
                    <CardTitle className={`text-3xl font-black ${item.color}`}>{item.category}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-gray-300">
                    {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <Handshake className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ESGAlignmentPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="text-center space-y-4 mb-16">
                    <Globe className="w-20 h-20 text-green-400 mx-auto" style={{ filter: 'drop-shadow(0 0 15px #4ade80)'}} />
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                        The New Standard for Impact
                    </h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Environmental, Social, and Governance (ESG) is the old world's language for 'doing good'. We speak that language, but our actions are the translation. We are the verifiable proof they've been searching for.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {esgData.map((item, index) => (
                        <ESGCard key={item.category} item={item} index={index} />
                    ))}
                </div>
                 <footer className="text-center mt-20 text-gray-600">
                    <p className="font-bold text-lg text-gray-400">This is not a pledge. It is a live report.</p>
                    <p>UniversalFrequency51 is the world's first verifiable impact-to-value engine.</p>
                </footer>
            </div>
        </div>
    );
}