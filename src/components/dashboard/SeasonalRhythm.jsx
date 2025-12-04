import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Sun, Snowflake, Sprout } from 'lucide-react';
import { formatDuration, intervalToDuration } from 'date-fns';

const seasonIcons = {
    Spring: { icon: Sprout, color: 'text-green-400', border: 'border-green-500/50' },
    Summer: { icon: Sun, color: 'text-yellow-400', border: 'border-yellow-500/50' },
    Autumn: { icon: Leaf, color: 'text-orange-400', border: 'border-orange-500/50' },
    Winter: { icon: Snowflake, color: 'text-blue-400', border: 'border-blue-500/50' },
};

const getSeasons = (year) => ({
    Spring: new Date(year, 2, 20), // Mar 20
    Summer: new Date(year, 5, 21), // Jun 21
    Autumn: new Date(year, 8, 22), // Sep 22
    Winter: new Date(year, 11, 21), // Dec 21
});

const getCurrentSeason = (now, year) => {
    const seasons = getSeasons(year);
    if (now >= seasons.Winter || now < seasons.Spring) return 'Winter';
    if (now >= seasons.Autumn) return 'Autumn';
    if (now >= seasons.Summer) return 'Summer';
    return 'Spring';
};

const Countdown = ({ to }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const duration = intervalToDuration({ start: now, end: to });
    const formatted = formatDuration(duration, {
        format: ['days', 'hours', 'minutes', 'seconds'],
        zero: false,
    });

    return <span className="font-mono text-sm">{formatted}</span>;
};

const SeasonCard = ({ season, nextSeasonDate, isCurrent }) => {
    const { icon: Icon, color, border } = seasonIcons[season];
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-black/40 backdrop-blur-sm rounded-2xl p-4 border-2 ${isCurrent ? `${border} shadow-lg ${color.replace('text-', 'shadow-')}/30` : 'border-gray-800'}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <h4 className={`text-lg font-bold ${isCurrent ? 'text-white' : 'text-gray-400'}`}>{season}</h4>
                </div>
                {isCurrent && <div className="px-2 py-1 text-xs font-bold bg-purple-500/80 text-white rounded-full">Current</div>}
            </div>
            <div className="mt-2 text-right">
                <p className={`text-xs ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
                    {isCurrent ? 'Ends in:' : 'Starts in:'} <Countdown to={nextSeasonDate} />
                </p>
            </div>
        </motion.div>
    );
};

export default function SeasonalRhythm() {
    const [now, setNow] = useState(new Date());
    const year = now.getFullYear();
    const seasons = getSeasons(year);
    const seasonsNextYear = getSeasons(year + 1);

    const currentSeason = getCurrentSeason(now, year);

    const seasonOrder = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const currentSeasonIndex = seasonOrder.indexOf(currentSeason);
    const upcomingSeasons = [
        ...seasonOrder.slice(currentSeasonIndex),
        ...seasonOrder.slice(0, currentSeasonIndex)
    ];

    const getNextDate = (season) => {
        const seasonDate = seasons[season];
        if (now < seasonDate) return seasonDate;
        return seasonsNextYear[season];
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-12"
        >
            <Card className="bg-gradient-to-br from-black via-gray-900 to-indigo-950 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10 rounded-3xl">
                <CardContent className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-center text-white mb-6 font-mono tracking-wider">
                        PLANETARY RHYTHM
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingSeasons.map((season, index) => (
                            <SeasonCard 
                                key={season}
                                season={season}
                                nextSeasonDate={getNextDate(seasonOrder[(currentSeasonIndex + index) % 4])}
                                isCurrent={index === 0}
                            />
                        ))}
                    </div>
                     <p className="text-center text-xs text-cyan-400/70 mt-6 font-mono">PROTOCOL: EARTH.BEAT.GMT</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}