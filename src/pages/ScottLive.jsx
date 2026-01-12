import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Mail, DollarSign, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * LIVE - Scott's sketch
 * 3 sections: Bookings, Admin, Logistics
 */

export default function ScottLive() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const { data: artist } = useQuery({
        queryKey: ['scottArtist', artistId],
        queryFn: () => base44.entities.ScottArtist.filter({ id: artistId }).then(r => r[0]),
        enabled: !!artistId
    });

    const sections = [
        {
            title: 'BOOKINGS',
            subtitle: '99 overview of App, pick up from Email',
            icon: Mail,
            color: 'pink',
            link: createPageUrl('ScottLiveBookings') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'CONTRACTS & DOCS',
            subtitle: 'Contracts • Legal • Insurance',
            icon: DollarSign,
            color: 'amber',
            link: createPageUrl('ScottLiveAdmin') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'LOGISTICS',
            subtitle: 'On tour',
            icon: MapPin,
            color: 'cyan',
            link: createPageUrl('ScottLiveLogistics') + (artistId ? `?id=${artistId}` : '')
        }
    ];

    const colorMap = {
        pink: { bg: 'from-pink-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        amber: { bg: 'from-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
        cyan: { bg: 'from-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-black text-cyan-400 font-mono mb-2">LIVE</h1>
                <p className="text-gray-600 text-sm font-mono">Gigs · Shows · Events</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colors = colorMap[section.color];
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.96 }}
                                className={`bg-black border-4 ${colors.border} rounded-xl p-6 transition-all h-32 flex items-center gap-4`}
                            >
                                <Icon className={`w-10 h-10 ${colors.text}`} />
                                <div className="flex-1">
                                    <p className={`${colors.text} font-black text-xl font-mono mb-1`}>
                                        {section.title}
                                    </p>
                                    <p className="text-gray-600 text-xs font-mono">
                                        {section.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Live Performance</p>
            </div>
        </div>
    );
}