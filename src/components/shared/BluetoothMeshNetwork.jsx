import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Zap, Radio, Share2, CheckCircle } from 'lucide-react';

/**
 * BLUETOOTH MESH NETWORK
 * P2P healing frequency sharing - works 100% offline
 * Extensible layer for frequency distribution globally
 * AI51 learns from mesh activity patterns
 * ♾️❤️
 */

export default function BluetoothMeshNetwork() {
  const [isActive, setIsActive] = useState(false);
  const [connectedPeers, setConnectedPeers] = useState([]);
  const [meshStatus, setMeshStatus] = useState('offline');
  const [sharedFrequencies, setSharedFrequencies] = useState([]);
  const characteristicRef = useRef(null);
  const deviceRef = useRef(null);
  const localPeerIdRef = useRef(null);

  // Initialize peer ID
  useEffect(() => {
    if (!localPeerIdRef.current) {
      localPeerIdRef.current = `peer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }, []);

  // Start Bluetooth mesh
  const startMesh = async () => {
    try {
      // Request Bluetooth device (platform dependent)
      if (!navigator.bluetooth) {
        console.warn('Bluetooth not supported on this device');
        setMeshStatus('unavailable');
        return;
      }

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'UF51-Mesh' }],
        optionalServices: ['battery_service', '0000181a-0000-1000-8000-00805f9b34fb']
      });

      deviceRef.current = device;
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('0000181a-0000-1000-8000-00805f9b34fb');
      characteristicRef.current = await service.getCharacteristic('00002a19-0000-1000-8000-00805f9b34fb');

      // Listen for incoming frequency data
      await characteristicRef.current.startNotifications();
      characteristicRef.current.addEventListener('characteristicvaluechanged', handleFrequencyData);

      setIsActive(true);
      setMeshStatus('online');
      broadcastPresence();
    } catch (error) {
      console.error('Bluetooth mesh error:', error);
      setMeshStatus('error');
    }
  };

  const stopMesh = async () => {
    try {
      if (characteristicRef.current) {
        await characteristicRef.current.stopNotifications();
      }
      if (deviceRef.current) {
        await deviceRef.current.gatt.disconnect();
      }
      setIsActive(false);
      setMeshStatus('offline');
      setConnectedPeers([]);
    } catch (error) {
      console.error('Mesh stop error:', error);
    }
  };

  // Broadcast this device's presence
  const broadcastPresence = async () => {
    const presence = {
      peerId: localPeerIdRef.current,
      timestamp: Date.now(),
      isHealer: true,
      capabilities: ['frequency_share', 'offline_sync', 'learning_enabled']
    };

    if (characteristicRef.current) {
      try {
        await characteristicRef.current.writeValue(
          new TextEncoder().encode(JSON.stringify(presence))
        );
      } catch (error) {
        console.error('Broadcast error:', error);
      }
    }
  };

  // Handle incoming frequency data
  const handleFrequencyData = (event) => {
    try {
      const data = new TextDecoder().decode(event.target.value);
      const message = JSON.parse(data);

      if (message.type === 'frequency') {
        setSharedFrequencies(prev => {
          const exists = prev.find(f => f.id === message.frequency.id);
          return exists ? prev : [...prev, message.frequency];
        });

        // Notify AI51 of new frequency for learning
        window.dispatchEvent(new CustomEvent('frequencyMeshReceived', {
          detail: { frequency: message.frequency, from: message.peerId }
        }));
      } else if (message.type === 'peer') {
        setConnectedPeers(prev => {
          const exists = prev.find(p => p.peerId === message.peerId);
          return exists ? prev : [...prev, message];
        });
      }
    } catch (error) {
      console.error('Data parse error:', error);
    }
  };

  // Share frequency to mesh
  const shareFrequency = async (frequency) => {
    const message = {
      type: 'frequency',
      frequency,
      peerId: localPeerIdRef.current,
      timestamp: Date.now()
    };

    if (characteristicRef.current) {
      try {
        await characteristicRef.current.writeValue(
          new TextEncoder().encode(JSON.stringify(message))
        );

        // Log for AI51 learning
        window.dispatchEvent(new CustomEvent('frequencySharedMesh', {
          detail: { frequency, peers: connectedPeers.length }
        }));
      } catch (error) {
        console.error('Share error:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* STATUS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`border-4 p-4 rounded-lg ${
          isActive
            ? 'bg-green-900/30 border-green-500'
            : 'bg-cyan-900/30 border-cyan-500'
        }`}
      >
        <div className="flex items-center gap-3">
          <Bluetooth className={`w-6 h-6 ${isActive ? 'text-green-400 animate-pulse' : 'text-cyan-400'}`} />
          <div>
            <p className="font-bold text-sm font-mono">
              {isActive ? '✓ BLUETOOTH MESH ACTIVE' : '○ OFFLINE READY'}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {connectedPeers.length} peers • {sharedFrequencies.length} frequencies available
            </p>
          </div>
        </div>
      </motion.div>

      {/* PEERS */}
      {connectedPeers.length > 0 && (
        <div className="bg-black/60 border-2 border-green-500 p-4 rounded-lg">
          <p className="text-green-400 font-bold text-xs font-mono mb-3">CONNECTED PEERS:</p>
          <div className="space-y-2">
            {connectedPeers.map((peer) => (
              <motion.div
                key={peer.peerId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-2 bg-green-900/20 border border-green-500/50 rounded text-xs font-mono"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300">{peer.peerId.slice(0, 12)}...</span>
                <CheckCircle className="w-3 h-3 text-green-400 ml-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CONTROL */}
      <button
        onClick={isActive ? stopMesh : startMesh}
        className={`w-full py-3 font-black font-mono text-sm rounded-lg flex items-center justify-center gap-2 transition-all ${
          isActive
            ? 'bg-red-600 hover:bg-red-500 text-white'
            : 'bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white'
        }`}
      >
        <Bluetooth className="w-4 h-4" />
        {isActive ? 'STOP MESH' : 'START BLUETOOTH MESH'}
      </button>
    </div>
  );
}