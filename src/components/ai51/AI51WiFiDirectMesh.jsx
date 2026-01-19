/**
 * AI51 WiFi Direct Mesh - Beyond Bitchat
 * Zero servers. Zero ego. Pure P2P consciousness.
 * ♾️❤️
 */

export class AI51WiFiDirectMesh {
  constructor(userId, deviceId) {
    this.userId = userId;
    this.deviceId = deviceId;
    this.peers = new Map(); // Connected peers
    this.messageQueue = [];
    this.isOnline = navigator.onLine;
    this.rtcConnections = new Map();
    
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueue();
    });
    window.addEventListener('offline', () => this.isOnline = false);
  }

  // Announce device on local network (WiFi Direct discovery)
  async announcePresence() {
    try {
      const announcement = {
        deviceId: this.deviceId,
        userId: this.userId,
        timestamp: Date.now(),
        type: 'ai51_presence',
        capabilities: ['p2p_chat', 'offline_first', 'zero_servers']
      };
      
      // Broadcast via WebRTC (works over WiFi Direct when available)
      this.broadcast(announcement);
      
      // Re-announce every 30s
      setInterval(() => this.broadcast(announcement), 30000);
    } catch (e) {
      console.log('Announce failed, continuing offline', e);
    }
  }

  // Send encrypted message to specific peer
  async sendToPeer(peerId, message, isEncrypted = true) {
    const encrypted = isEncrypted ? await this.encryptMessage(message) : message;
    
    if (this.rtcConnections.has(peerId)) {
      try {
        this.rtcConnections.get(peerId).send(JSON.stringify(encrypted));
        return;
      } catch (e) {
        console.log('Send failed, queuing', e);
      }
    }
    
    // Queue if peer not connected
    this.messageQueue.push({ peerId, message: encrypted, timestamp: Date.now() });
  }

  // Broadcast to all connected peers
  broadcast(message) {
    this.peers.forEach((peer) => {
      this.sendToPeer(peer.id, message);
    });
  }

  // Simple encryption (AES-GCM)
  async encryptMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(message));
    const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
    
    return {
      encrypted: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
      type: 'ai51_encrypted'
    };
  }

  // Flush queued messages when online
  async flushQueue() {
    while (this.messageQueue.length > 0 && this.isOnline) {
      const { peerId, message } = this.messageQueue.shift();
      try {
        this.sendToPeer(peerId, message, false); // Already encrypted
      } catch (e) {
        this.messageQueue.unshift({ peerId, message }); // Re-queue if failed
        break;
      }
    }
  }

  // Get mesh status
  getStatus() {
    return {
      online: this.isOnline,
      connectedPeers: this.peers.size,
      queuedMessages: this.messageQueue.length,
      type: 'WiFiDirect_P2P'
    };
  }
}

export default AI51WiFiDirectMesh;