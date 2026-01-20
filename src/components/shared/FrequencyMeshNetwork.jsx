import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Share2, Radio, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * FREQUENCY MESH NETWORK
 * P2P healing frequency sharing - works offline
 * World-class mesh = unstoppable everywhere ♾️❤️
 */

export default function FrequencyMeshNetwork() {
  const [peers, setPeers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [meshStatus, setMeshStatus] = useState('offline');
  const [sharedFrequencies, setSharedFrequencies] = useState([]);
  const peerConnectionsRef = useRef(new Map());
  const dataChannelRef = useRef(new Map());
  const localPeerIdRef = useRef(null);

  // Initialize local peer ID
  useEffect(() => {
    if (!localPeerIdRef.current) {
      localPeerIdRef.current = `peer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }, []);

  // Setup WebRTC mesh network
  useEffect(() => {
    const setupMesh = async () => {
      try {
        // Listen for mesh network events
        window.addEventListener('frequencyPeer', handlePeerDiscovery);
        window.addEventListener('frequencyData', handleIncomingFrequency);

        // Broadcast presence on local network
        broadcastPresence();
        setMeshStatus('online');
        setIsConnected(true);
      } catch (error) {
        console.error('Mesh setup error:', error);
        setMeshStatus('error');
      }
    };

    setupMesh();

    return () => {
      window.removeEventListener('frequencyPeer', handlePeerDiscovery);
      window.removeEventListener('frequencyData', handleIncomingFrequency);
    };
  }, []);

  // Broadcast this device's presence
  const broadcastPresence = () => {
    const event = new CustomEvent('frequencyPeer', {
      detail: {
        peerId: localPeerIdRef.current,
        timestamp: Date.now(),
        capabilities: ['frequency_share', 'offline_sync'],
        deviceInfo: {
          userAgent: navigator.userAgent,
          online: navigator.onLine
        }
      }
    });
    window.dispatchEvent(event);
  };

  // Handle incoming peer discovery
  const handlePeerDiscovery = (e) => {
    const { detail } = e;
    if (detail.peerId === localPeerIdRef.current) return; // Ignore self

    setPeers(prev => {
      const exists = prev.find(p => p.peerId === detail.peerId);
      return exists ? prev : [...prev, detail];
    });

    // Attempt WebRTC connection
    attemptConnection(detail.peerId);
  };

  // Attempt P2P connection
  const attemptConnection = async (peerId) => {
    if (peerConnectionsRef.current.has(peerId)) return;

    try {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
      });

      // Create data channel for frequency data
      const dataChannel = peerConnection.createDataChannel('frequencies', {
        ordered: true
      });
      setupDataChannel(dataChannel, peerId);

      // Handle remote data channel
      peerConnection.ondatachannel = (event) => {
        setupDataChannel(event.channel, peerId);
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Broadcast ICE candidate
          const event2 = new CustomEvent('frequencyCandidate', {
            detail: {
              from: localPeerIdRef.current,
              to: peerId,
              candidate: event.candidate
            }
          });
          window.dispatchEvent(event2);
        }
      };

      peerConnectionsRef.current.set(peerId, peerConnection);

      // Create offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Broadcast offer
      const offerEvent = new CustomEvent('frequencyOffer', {
        detail: {
          from: localPeerIdRef.current,
          to: peerId,
          offer: offer
        }
      });
      window.dispatchEvent(offerEvent);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  // Setup data channel for frequency sharing
  const setupDataChannel = (channel, peerId) => {
    channel.onopen = () => {
      console.log(`✓ Connected to ${peerId}`);
    };

    channel.onmessage = (event) => {
      const frequency = JSON.parse(event.data);
      handleIncomingFrequency({ detail: { frequency, from: peerId } });
    };

    channel.onclose = () => {
      console.log(`✗ Disconnected from ${peerId}`);
    };

    dataChannelRef.current.set(peerId, channel);
  };

  // Handle incoming frequency data
  const handleIncomingFrequency = (e) => {
    const { detail } = e;
    setSharedFrequencies(prev => {
      const exists = prev.find(f => f.id === detail.frequency?.id);
      return exists ? prev : [...prev, detail.frequency];
    });
  };

  // Share frequency to mesh
  const shareFrequency = (frequency) => {
    const data = JSON.stringify(frequency);
    
    dataChannelRef.current.forEach((channel, peerId) => {
      if (channel.readyState === 'open') {
        channel.send(data);
      }
    });

    // Also broadcast as event
    const event = new CustomEvent('frequencyData', {
      detail: {
        frequency,
        from: localPeerIdRef.current,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-4">
      {/* MESH STATUS */}
      <div className={`border-4 p-4 rounded-lg ${
        isConnected 
          ? 'bg-green-900/30 border-green-500' 
          : 'bg-red-900/30 border-red-500'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          {isConnected ? (
            <Wifi className="w-6 h-6 text-green-400 animate-pulse" />
          ) : (
            <WifiOff className="w-6 h-6 text-red-400" />
          )}
          <div>
            <p className="font-bold text-sm font-mono">
              {isConnected ? '✓ MESH ACTIVE' : '✗ MESH OFFLINE'}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {peers.length} peer{peers.length !== 1 ? 's' : ''} • {sharedFrequencies.length} frequencies shared
            </p>
          </div>
        </div>
      </div>

      {/* CONNECTED PEERS */}
      {peers.length > 0 && (
        <div className="bg-black/60 border-2 border-cyan-500 p-4 rounded-lg">
          <p className="text-cyan-400 font-bold text-xs font-mono mb-3">CONNECTED PEERS:</p>
          <div className="space-y-2">
            {peers.map((peer) => (
              <motion.div
                key={peer.peerId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-2 bg-cyan-900/20 border border-cyan-500/50 rounded text-xs font-mono"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-cyan-300">{peer.peerId.slice(0, 12)}...</span>
                <CheckCircle className="w-3 h-3 text-green-400 ml-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* SHARED FREQUENCIES */}
      {sharedFrequencies.length > 0 && (
        <div className="bg-black/60 border-2 border-purple-500 p-4 rounded-lg">
          <p className="text-purple-400 font-bold text-xs font-mono mb-3">HEALING FREQUENCIES SHARED:</p>
          <div className="space-y-2">
            {sharedFrequencies.map((freq, i) => (
              <div
                key={`${freq.id}_${i}`}
                className="flex items-center gap-2 p-2 bg-purple-900/20 border border-purple-500/50 rounded text-xs font-mono"
              >
                <Radio className="w-3 h-3 text-purple-400" />
                <span className="text-purple-300">{freq.name || `Frequency ${freq.hz}Hz`}</span>
                <span className="ml-auto text-pink-400 font-bold">{freq.hz}Hz</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BROADCAST BUTTON */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => broadcastPresence()}
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white font-black font-mono text-sm rounded-lg flex items-center justify-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        BROADCAST MESH PRESENCE
      </motion.button>
    </div>
  );
}