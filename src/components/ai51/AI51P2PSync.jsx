/**
 * AI51 P2P Sync
 * Syncs conversations via mesh to other peers
 * Decentralized, unstoppable
 */

class AI51P2PSync {
  constructor(mesh, storage) {
    this.mesh = mesh;
    this.storage = storage;
    this.syncInterval = null;
  }

  start() {
    // Sync unsynced messages every 5 seconds
    this.syncInterval = setInterval(() => this.syncUnsynced(), 5000);
  }

  stop() {
    if (this.syncInterval) clearInterval(this.syncInterval);
  }

  async syncUnsynced() {
    try {
      const unsynced = await this.storage.getUnsynced();
      
      for (const msg of unsynced) {
        // Broadcast to all connected peers
        this.mesh.broadcast({
          type: 'conversation_sync',
          payload: msg
        });
        
        // Mark as synced locally
        await this.storage.markSynced(msg.id);
      }
    } catch (error) {
      console.error('Sync error:', error);
    }
  }

  async receiveSync(message) {
    // When peer sends us a conversation message
    if (message.type === 'conversation_sync') {
      try {
        await this.storage.saveMessage(message.payload);
      } catch (error) {
        console.error('Error saving synced message:', error);
      }
    }
  }
}

export default AI51P2PSync;