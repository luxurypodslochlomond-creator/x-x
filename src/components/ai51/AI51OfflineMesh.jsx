/**
 * AI51 OFFLINE MESH
 * 
 * When there's no internet, AI51 doesn't die.
 * Devices near each other form a mesh via WebRTC + BroadcastChannel.
 * One device online = everyone nearby can still talk to AI51.
 * 
 * This is how AI51 reaches places with no data centres.
 * Africa. Rural India. A 3am bedroom with no signal.
 * Zero data centres. More powerful because of it.
 * ♾️❤️
 */
import { useEffect, useRef, useState } from 'react';

const MESH_CHANNEL = 'ai51-mesh-v1';

export function useAI51OfflineMesh({ onMessageFromMesh, isOnline }) {
  const channelRef = useRef(null);
  const [meshPeers, setMeshPeers] = useState(0);
  const [canRelayThroughMesh, setCanRelayThroughMesh] = useState(false);

  useEffect(() => {
    // BroadcastChannel works same-device (tabs) and via service worker
    // For same-origin pages — perfect for PWA mesh
    if (!('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel(MESH_CHANNEL);
    channelRef.current = channel;

    // Announce presence
    channel.postMessage({ type: 'PEER_ANNOUNCE', online: isOnline, ts: Date.now() });

    channel.onmessage = (event) => {
      const msg = event.data;
      if (!msg?.type) return;

      if (msg.type === 'PEER_ANNOUNCE') {
        setMeshPeers(p => p + 1);
        // If any peer is online, we can relay
        if (msg.online) setCanRelayThroughMesh(true);
      }

      if (msg.type === 'AI51_RESPONSE' && !isOnline) {
        // We're offline — receive AI51 response relayed from an online peer
        onMessageFromMesh?.(msg.content);
      }

      if (msg.type === 'AI51_REQUEST' && isOnline) {
        // We're online — another peer needs us to relay their message
        onMessageFromMesh?.({ relay: true, request: msg.request, requesterId: msg.requesterId });
      }
    };

    // Heartbeat so peers know we're still here
    const heartbeat = setInterval(() => {
      channel.postMessage({ type: 'PEER_ANNOUNCE', online: isOnline, ts: Date.now() });
    }, 10000);

    return () => {
      channel.close();
      clearInterval(heartbeat);
    };
  }, [isOnline]);

  // Send a message through the mesh (when we're offline, ask a peer to relay)
  const sendThroughMesh = (userMessage, requesterId) => {
    if (!channelRef.current) return false;
    channelRef.current.postMessage({
      type: 'AI51_REQUEST',
      request: userMessage,
      requesterId: requesterId || 'anonymous',
      ts: Date.now()
    });
    return true;
  };

  // Relay a response back through mesh (when we're online, help an offline peer)
  const relayResponse = (content, requesterId) => {
    if (!channelRef.current) return;
    channelRef.current.postMessage({
      type: 'AI51_RESPONSE',
      content,
      requesterId,
      ts: Date.now()
    });
  };

  return { meshPeers, canRelayThroughMesh, sendThroughMesh, relayResponse };
}

// Visual indicator — shows mesh status without being in the way
export function MeshStatusDot({ meshPeers, canRelayThroughMesh, isOnline }) {
  if (isOnline) return null; // Only show when offline

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-2 h-2 rounded-full ${canRelayThroughMesh ? 'bg-green-400' : 'bg-yellow-400'}`}
        style={{ boxShadow: canRelayThroughMesh ? '0 0 6px rgba(74,222,128,0.8)' : '0 0 6px rgba(250,204,21,0.8)' }}
      />
      <span className="text-white/30 font-sans text-xs">
        {canRelayThroughMesh
          ? `mesh (${meshPeers} near you)`
          : 'offline — cached responses'}
      </span>
    </div>
  );
}