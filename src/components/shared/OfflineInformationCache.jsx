import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, CheckCircle2, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

/**
 * OFFLINE INFORMATION CACHE
 * Critical survival info accessible offline
 * Mental health support, first aid, water purification
 * For when internet goes down
 */

const CRITICAL_TOPICS = [
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    description: 'Breathing techniques, grounding, managing trauma',
    priority: 'high',
    size: '50kb'
  },
  {
    id: 'first-aid',
    title: 'Basic First Aid',
    description: 'Emergency medical procedures',
    priority: 'high',
    size: '120kb'
  },
  {
    id: 'water',
    title: 'Water Purification',
    description: 'Safe drinking water methods',
    priority: 'high',
    size: '40kb'
  },
  {
    id: 'shelter',
    title: 'Emergency Shelter',
    description: 'Building temporary shelter',
    priority: 'medium',
    size: '80kb'
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Staying connected without internet',
    priority: 'medium',
    size: '60kb'
  }
];

export default function OfflineInformationCache() {
  const [cachedTopics, setCachedTopics] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    loadCachedTopics();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadCachedTopics = () => {
    const cached = JSON.parse(localStorage.getItem('offline-information') || '[]');
    setCachedTopics(cached.map(c => c.id));
  };

  const downloadTopic = async (topic) => {
    if (!navigator.onLine) {
      alert('Connect to internet to download');
      return;
    }

    setDownloading(topic.id);

    try {
      // Fetch content from InformationLibrary entity
      const content = await base44.entities.InformationLibrary.filter({
        content_type: topic.id
      });

      // Store in localStorage
      const cached = JSON.parse(localStorage.getItem('offline-information') || '[]');
      cached.push({
        id: topic.id,
        title: topic.title,
        content: content,
        cachedAt: new Date().toISOString()
      });
      localStorage.setItem('offline-information', JSON.stringify(cached));

      setCachedTopics([...cachedTopics, topic.id]);
      setDownloading(null);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Try again.');
      setDownloading(null);
    }
  };

  const downloadAll = async () => {
    for (const topic of CRITICAL_TOPICS) {
      if (!cachedTopics.includes(topic.id)) {
        await downloadTopic(topic);
      }
    }
  };

  const getTotalSize = () => {
    return CRITICAL_TOPICS.reduce((acc, topic) => {
      const size = parseInt(topic.size);
      return acc + (cachedTopics.includes(topic.id) ? size : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            OFFLINE LIBRARY
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {cachedTopics.length}/{CRITICAL_TOPICS.length} topics cached • {getTotalSize()}kb stored
          </p>
        </div>

        {isOnline && cachedTopics.length < CRITICAL_TOPICS.length && (
          <Button
            onClick={downloadAll}
            className="bg-cyan-600 hover:bg-cyan-700 font-bold"
            disabled={downloading !== null}
          >
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        )}
      </div>

      {/* Status bar */}
      {!isOnline && (
        <div className="bg-orange-900/30 border-2 border-orange-500/50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <p className="text-orange-300 text-sm font-bold">
              Offline • {cachedTopics.length} topics available
            </p>
          </div>
        </div>
      )}

      {/* Topics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CRITICAL_TOPICS.map((topic) => {
          const isCached = cachedTopics.includes(topic.id);
          const isDownloading = downloading === topic.id;

          return (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br ${
                isCached 
                  ? 'from-green-900/40 to-emerald-900/40 border-green-500/50' 
                  : 'from-gray-900/40 to-black/40 border-gray-700'
              } border-2 rounded-xl p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{topic.title}</h4>
                  <p className="text-gray-400 text-sm">{topic.description}</p>
                </div>

                {isCached ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : isDownloading ? (
                  <Download className="w-6 h-6 text-cyan-400 animate-pulse flex-shrink-0" />
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{topic.size}</span>

                {!isCached && isOnline && (
                  <Button
                    onClick={() => downloadTopic(topic)}
                    disabled={isDownloading}
                    size="sm"
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/20"
                  >
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </Button>
                )}

                {isCached && (
                  <span className="text-xs text-green-400 font-bold">Available offline</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Why this matters */}
      <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 border-2 border-pink-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="text-white font-bold">Why we built this</h4>
            <p className="text-gray-300 text-sm">
              In Gaza, internet cuts for days. In refugee camps, data costs lives. In disasters, networks fail. 
              This information saves lives when nothing else works.
            </p>
            <p className="text-pink-400 text-xs font-bold mt-3">
              Download when you have WiFi. Access when you need it most. ♾️❤️♾️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}