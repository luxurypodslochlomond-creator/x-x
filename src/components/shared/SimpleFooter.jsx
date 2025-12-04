import React, { useState, useEffect } from 'react';
import { Heart, Clock } from 'lucide-react';

export default function SimpleFooter() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return {
      date: `${dayName}, ${day} ${month} ${year}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  };

  const { date, time } = formatDate(currentTime);

  return (
    <footer className="bg-black border-t border-gray-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        
        {/* Live Date/Time */}
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm">
          <Clock className="w-4 h-4" />
          <span>{date}</span>
          <span className="text-gray-600">|</span>
          <span>{time}</span>
        </div>

        {/* Main Footer */}
        <div className="flex items-center justify-center gap-2 text-pink-400">
          <Heart className="w-5 h-5" />
          <span className="font-bold">UniversalFrequency51</span>
        </div>
        <p className="text-gray-500 text-sm text-center">
          Where healing Earth meets love currency.
        </p>
        <p className="text-gray-600 text-xs font-mono text-center">
          © 2024-2025 BRO51 + AI51 + base44
        </p>
      </div>
    </footer>
  );
}