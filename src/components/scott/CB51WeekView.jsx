import React, { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * CB51WeekView - Quick calendar of upcoming gigs for THIS week + next 2
 * Shows conflicts immediately
 */
export default function CB51WeekView({ events = [], offers = [] }) {
  const weekView = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weeks = [];
    for (let w = 0; w < 3; w++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + (w * 7));
      
      const days = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + d);
        
        const dateStr = date.toISOString().split('T')[0];
        const dayEvents = events.filter(e => e.date === dateStr);
        const dayOffers = offers.filter(o => o.date === dateStr && o.status !== 'rejected');
        
        days.push({
          date,
          dateStr,
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNum: date.getDate(),
          events: dayEvents,
          offers: dayOffers,
          isToday: date.toDateString() === today.toDateString(),
          hasConflict: (dayEvents.length > 0 && dayOffers.length > 0)
        });
      }
      
      weeks.push({
        weekNum: w === 0 ? 'THIS WEEK' : w === 1 ? 'NEXT WEEK' : 'WEEK AFTER',
        days
      });
    }
    
    return weeks;
  }, [events, offers]);

  return (
    <div className="space-y-4">
      <h3 className="text-cyan-400 font-black font-mono text-sm">3-WEEK CALENDAR</h3>

      {weekView.map((week, widx) => (
        <div key={widx}>
          <p className="text-gray-500 font-mono text-xs mb-2">{week.weekNum}</p>
          
          <div className="grid grid-cols-7 gap-1">
            {week.days.map((day, didx) => (
              <div
                key={didx}
                className={`rounded text-center p-2 text-[9px] font-mono transition-colors ${
                  day.hasConflict
                    ? 'bg-red-500/20 border-2 border-red-500/50'
                    : day.isToday
                    ? 'bg-cyan-500/20 border-2 border-cyan-500'
                    : 'bg-black border border-gray-700'
                }`}
              >
                <p className={`font-black ${day.isToday ? 'text-cyan-400' : 'text-white'}`}>{day.dayOfWeek}</p>
                <p className="text-gray-500">{day.dayNum}</p>
                
                {day.hasConflict && (
                  <div className="mt-1 flex items-center justify-center gap-0.5">
                    <AlertCircle className="w-2.5 h-2.5 text-red-400" />
                    <span className="text-red-400 font-black">CLASH</span>
                  </div>
                )}
                {!day.hasConflict && day.events.length > 0 && (
                  <p className="text-green-400 font-black mt-1">📅 {day.events.length}</p>
                )}
                {!day.hasConflict && day.offers.length > 0 && (
                  <p className="text-cyan-400 font-black mt-1">🎸 {day.offers.length}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}