import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Truck, FileText, ArrowLeft } from 'lucide-react';

/**
 * SCOTT LIVE
 * Bookings, Logistics, Admin
 */

export default function ScottLive() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistId = searchParams.get('artist');

  const sections = [
    { title: 'BOOKINGS', icon: Calendar, url: createPageUrl('ScottCalendar') + `?artist=${artistId}` },
    { title: 'LOGISTICS', icon: Truck, url: createPageUrl('ScottAccommodation') + `?artist=${artistId}` },
    { title: 'ADMIN', icon: FileText, url: createPageUrl('ScottGigPacks') + `?artist=${artistId}` },
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artistId}`)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-black text-white">LIVE</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.title}
                className="bg-black border-2 border-pink-500 hover:bg-pink-500/10 transition-all cursor-pointer"
                onClick={() => navigate(section.url)}
              >
                <CardContent className="p-8 text-center">
                  <Icon className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white">{section.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}