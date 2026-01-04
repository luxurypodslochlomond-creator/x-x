import React from 'react';
import { Music, Calendar, DollarSign, Users, FileText, TrendingUp, Briefcase, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * MANAGEMENT WHEEL - Scott's sketch brought to life
 * Shows managers INSTANTLY what we handle
 * Perfect for demos to Paul Quinn, Alan Magee, etc
 */

export default function ScottManagementWheel({ artistId, artistName }) {
  const wheel = [
    { title: 'Music', icon: Music, page: 'ScottDemos', color: 'cyan', desc: 'Demos • Publishing' },
    { title: 'Touring', icon: Calendar, page: 'ScottCalendar', color: 'green', desc: 'Gigs • Travel' },
    { title: 'Online', icon: TrendingUp, page: 'ScottMedia', color: 'pink', desc: 'Social • Press' },
    { title: 'Publicity', icon: Users, page: 'ScottMedia', color: 'purple', desc: 'PR • Media' },
    { title: 'Rights', icon: Shield, page: 'ScottPublishing', color: 'amber', desc: 'Copyright • Admin' },
    { title: 'Merch', icon: Briefcase, page: 'ScottMerch', color: 'blue', desc: 'Stock • Sales' },
    { title: 'Finance', icon: DollarSign, page: 'ScottInvoices', color: 'green', desc: 'Money • Tax' },
    { title: 'Contacts', icon: Users, page: 'ScottLabelContacts', color: 'cyan', desc: 'Industry • Team' },
  ];

  const colors = {
    cyan: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:border-cyan-400',
    green: 'border-green-500/50 bg-green-500/10 text-green-400 hover:border-green-400',
    pink: 'border-pink-500/50 bg-pink-500/10 text-pink-400 hover:border-pink-400',
    purple: 'border-purple-500/50 bg-purple-500/10 text-purple-400 hover:border-purple-400',
    amber: 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:border-amber-400',
    blue: 'border-blue-500/50 bg-blue-500/10 text-blue-400 hover:border-blue-400',
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
      
      {/* TITLE */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-2">FULL MANAGEMENT</h2>
        <p className="text-gray-400 font-mono text-sm">Everything an artist needs ⚡</p>
      </div>

      {/* THE WHEEL */}
      <div className="relative">
        
        {/* CENTER - ARTIST */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-full p-8 border-4 border-white/20">
            <div className="text-center">
              <p className="text-white font-black text-lg">ARTIST</p>
              {artistName && <p className="text-white/80 text-xs mt-1">{artistName}</p>}
            </div>
          </div>
        </div>

        {/* OUTER RING - ALL SERVICES */}
        <div className="grid grid-cols-4 gap-4 pt-32 pb-8">
          {wheel.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={createPageUrl(item.page)}
                className={`${colors[item.color]} border-2 rounded-2xl p-6 transition-all hover:scale-105 text-center`}
              >
                <Icon className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-black text-lg mb-1">{item.title}</h3>
                <p className="text-xs opacity-70">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-6 pt-6 border-t border-white/10">
        <p className="text-gray-500 text-sm font-mono">
          Built for real managers • Zero headache ♾️❤️
        </p>
      </div>
    </div>
  );
}