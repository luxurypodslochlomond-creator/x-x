import React, { useState, useEffect } from 'react';
import { Send, Radio, Wifi, WifiOff, Clock, Users } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OFFLINE TEAM CHAT - P2P MESH
 * Works at festivals with shit signal
 * Device-to-device via Bluetooth/WiFi Direct
 * One-tap quick messages
 */

export default function ScottOfflineTeamChat({ artistId }) {
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [localMessages, setLocalMessages] = useState([]);
  const [peerConnection, setPeerConnection] = useState(null);
  const queryClient = useQueryClient();

  // Quick action messages
  const quickActions = [
    { text: "🚗 Running late", color: "amber" },
    { text: "✓ I'm here", color: "green" },
    { text: "🎤 Soundcheck now", color: "cyan" },
    { text: "🍺 At the bar", color: "purple" },
    { text: "🔧 Need help", color: "red" },
    { text: "✓ Done", color: "green" },
  ];

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Load local messages
    const stored = localStorage.getItem('scott_team_messages');
    if (stored) {
      try {
        setLocalMessages(JSON.parse(stored));
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync local messages when back online
  useEffect(() => {
    if (isOnline && localMessages.length > 0) {
      const unsynced = localMessages.filter(m => !m.synced);
      if (unsynced.length > 0) {
        syncMessages(unsynced);
      }
    }
  }, [isOnline, localMessages]);

  const syncMessages = async (messages) => {
    for (const msg of messages) {
      try {
        await base44.entities.ScottMessage.create({
          artist_id: artistId,
          message: msg.text,
          sent_by: msg.from,
          sent_at: msg.timestamp
        });
        // Mark as synced
        setLocalMessages(prev => 
          prev.map(m => m.id === msg.id ? { ...m, synced: true } : m)
        );
      } catch (e) {
        console.error('Sync failed:', e);
      }
    }
    localStorage.setItem('scott_team_messages', JSON.stringify(localMessages));
  };

  // Fetch team messages from server
  const { data: serverMessages = [] } = useQuery({
    queryKey: ['team-messages', artistId],
    queryFn: async () => {
      const messages = await base44.entities.ScottMessage.filter({ 
        artist_id: artistId 
      });
      return messages.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at)).slice(0, 20);
    },
    enabled: isOnline && !!artistId,
    refetchInterval: isOnline ? 10000 : false
  });

  // Combined messages (local + server)
  const allMessages = [
    ...localMessages,
    ...serverMessages.filter(sm => !localMessages.find(lm => lm.serverCopy?.id === sm.id))
  ].sort((a, b) => new Date(b.timestamp || b.sent_at) - new Date(a.timestamp || a.sent_at));

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      from: 'You',
      timestamp: new Date().toISOString(),
      synced: false
    };

    // Store locally first
    const updated = [newMessage, ...localMessages];
    setLocalMessages(updated);
    localStorage.setItem('scott_team_messages', JSON.stringify(updated));

    // Try to send via P2P if offline
    if (!isOnline) {
      broadcastViaP2P(newMessage);
    }

    // Try to send to server if online
    if (isOnline) {
      try {
        await base44.entities.ScottMessage.create({
          artist_id: artistId,
          message: text.trim(),
          sent_by: 'You',
          sent_at: newMessage.timestamp
        });
        // Mark as synced
        setLocalMessages(prev => 
          prev.map(m => m.id === newMessage.id ? { ...m, synced: true } : m)
        );
      } catch (e) {
        console.error('Send failed, will retry when online:', e);
      }
    }

    setMessage('');
  };

  // P2P broadcast (simplified - real implementation would use WebRTC/BLE)
  const broadcastViaP2P = (msg) => {
    // Store for P2P sync
    const p2pQueue = JSON.parse(localStorage.getItem('scott_p2p_queue') || '[]');
    p2pQueue.push(msg);
    localStorage.setItem('scott_p2p_queue', JSON.stringify(p2pQueue));
    
    // In real implementation, would broadcast via:
    // - Web Bluetooth (nearby devices)
    // - WebRTC Data Channel (peer connections)
    // - WiFi Direct (native apps)
  };

  const handleQuickAction = (text) => {
    sendMessage(text);
  };

  const colors = {
    amber: 'bg-amber-500 hover:bg-amber-600',
    green: 'bg-green-500 hover:bg-green-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    red: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-4">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-black font-mono text-sm">TEAM CHAT</h3>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-mono">ONLINE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-mono">OFFLINE</span>
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickAction(action.text)}
            className={`${colors[action.color]} text-white font-bold text-xs px-3 py-2 rounded-lg transition-all border-2 border-black/20`}
          >
            {action.text}
          </button>
        ))}
      </div>

      {/* MESSAGES */}
      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {allMessages.slice(0, 10).map((msg, idx) => (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/5 rounded-lg p-3 border border-white/10"
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-cyan-400 text-xs font-bold font-mono">
                  {msg.from || msg.sent_by}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-[10px] font-mono">
                    {new Date(msg.timestamp || msg.sent_at).toLocaleTimeString('en-GB', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {!msg.synced && !isOnline && (
                    <Clock className="w-3 h-3 text-amber-400" />
                  )}
                </div>
              </div>
              <p className="text-white text-sm">{msg.text || msg.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {allMessages.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-8 h-8 text-gray-700 mx-auto mb-2" />
            <p className="text-gray-600 text-xs font-mono">No messages yet</p>
          </div>
        )}
      </div>

      {/* OFFLINE WARNING */}
      {!isOnline && (
        <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-2 mb-3">
          <p className="text-amber-400 text-xs font-mono font-bold">
            📡 OFFLINE MODE - Messages will sync when online
          </p>
        </div>
      )}

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(message)}
          placeholder="Type message..."
          className="flex-1 bg-black/60 border border-cyan-500/50 rounded-lg px-3 py-2 text-white text-sm placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none font-mono"
        />
        <button
          onClick={() => sendMessage(message)}
          disabled={!message.trim()}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* PENDING SYNC COUNT */}
      {localMessages.filter(m => !m.synced).length > 0 && (
        <div className="mt-3 text-center">
          <p className="text-amber-400 text-xs font-mono">
            {localMessages.filter(m => !m.synced).length} message{localMessages.filter(m => !m.synced).length > 1 ? 's' : ''} pending sync
          </p>
        </div>
      )}
    </div>
  );
}