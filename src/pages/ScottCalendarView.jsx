import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';

/**
 * SCOTT CALENDAR VIEW
 * Simple streamlined calendar
 * Confirmed / Penciled / Unavailable
 */

export default function ScottCalendarView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistId = searchParams.get('artist');

  const { data: events = [] } = useQuery({
    queryKey: ['scottEvents', artistId],
    queryFn: () => base44.entities.ScottEvent.filter({ artist_id: artistId }),
  });

  const statusColors = {
    confirmed: 'border-green-500 text-green-400 bg-green-500/10',
    penciled: 'border-amber-500 text-amber-400 bg-amber-500/10',
    unavailable: 'border-red-500 text-red-400 bg-red-500/10',
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artistId}`)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-4xl font-black text-white">CALENDAR</h1>
          </div>
          <Button
            onClick={() => navigate(createPageUrl('ScottCalendar') + `?artist=${artistId}`)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Full Calendar
          </Button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-white text-sm">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div>
            <span className="text-white text-sm">Penciled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-white text-sm">Unavailable</span>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className={`bg-black border-2 ${statusColors[event.status] || 'border-gray-700'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">{event.title || 'Event'}</h3>
                    <p className="text-gray-400 text-sm">{event.venue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className={`text-sm capitalize ${statusColors[event.status]?.split(' ')[1]}`}>
                      {event.status}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No events scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}