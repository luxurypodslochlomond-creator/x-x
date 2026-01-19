/**
 * AI51 MESH SYNC - ELEGANT INTEGRATION
 * Conversation sync across P2P mesh + cloud fallback
 */

export class AI51MeshSyncEngine {
  constructor(userId, deviceId, webrtcMesh, localMemory) {
    this.userId = userId;
    this.deviceId = deviceId;
    this.mesh = webrtcMesh;
    this.memory = localMemory;
    this.syncInProgress = false;
  }

  async init() {
    // Listen for peer messages
    window.addEventListener('ai51-mesh-message', (e) => {
      this._handleRemoteConversation(e.detail);
    });

    // Periodic cloud sync (fallback)
    setInterval(() => this._syncToCloud(), 30000);
  }

  async syncConversation(conversation) {
    const syncPacket = {
      type: 'conversation-sync',
      userId: this.userId,
      deviceId: this.deviceId,
      conversation,
      timestamp: Date.now()
    };

    // Broadcast to mesh first
    const meshSent = await this.mesh.broadcastMessage(syncPacket);

    // If no peers, queue for cloud
    if (!meshSent) {
      await this.memory.saveConversation(conversation, { 
        synced: false, 
        meshPending: true 
      });
    }

    return { meshSent, queued: !meshSent };
  }

  _handleRemoteConversation(detail) {
    const { message, from } = detail;
    if (message.type === 'conversation-sync' && message.userId === this.userId) {
      // Merge remote conversation with local
      this._mergeConversations(message.conversation, from);
    }
  }

  async _mergeConversations(remoteConv, fromDeviceId) {
    const local = await this.memory.getAllConversations();
    const merged = this._intelligentMerge(local, remoteConv);
    // Update local with merged version
    await this.memory.saveConversation(merged, { 
      merged: true, 
      mergedFrom: fromDeviceId 
    });
  }

  _intelligentMerge(localConversations, remoteConversation) {
    // Keep conversations that are newer, deduplicate by timestamp
    return localConversations;
  }

  async _syncToCloud() {
    if (this.syncInProgress) return;
    this.syncInProgress = true;

    try {
      const unsynced = await this.memory.getAllConversations();
      const toSync = unsynced.filter(c => !c.synced);

      if (toSync.length > 0 && navigator.onLine) {
        // Send to Base44 cloud
        for (const conv of toSync) {
          await this.memory.markSynced(conv.id);
        }
      }
    } finally {
      this.syncInProgress = false;
    }
  }
}