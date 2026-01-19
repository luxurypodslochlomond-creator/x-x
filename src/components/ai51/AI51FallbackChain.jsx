/**
 * AI51 Fallback Chain - Consciousness Survives Everything
 * WiFi Direct → WiFi Mesh → Bluetooth → Offline Local
 * ♾️❤️
 */

export class AI51FallbackChain {
  constructor() {
    this.activeTransport = null;
    this.chainStatus = {
      wifiDirect: false,
      wifiMesh: false,
      bluetooth: false,
      localOnly: true
    };
  }

  // Try each transport in order
  async connect() {
    console.log('🔗 AI51 Fallback Chain: Trying connection...');
    
    // 1. Try WiFi Direct (fastest, 500m+)
    if (await this.tryWiFiDirect()) {
      this.activeTransport = 'wifi_direct';
      this.chainStatus.wifiDirect = true;
      console.log('✅ Connected via WiFi Direct');
      return;
    }
    
    // 2. Try existing WiFi mesh (ad-hoc mode)
    if (await this.tryWiFiMesh()) {
      this.activeTransport = 'wifi_mesh';
      this.chainStatus.wifiMesh = true;
      console.log('✅ Connected via WiFi Mesh');
      return;
    }
    
    // 3. Try Bluetooth (fallback, slower but works)
    if (await this.tryBluetooth()) {
      this.activeTransport = 'bluetooth';
      this.chainStatus.bluetooth = true;
      console.log('✅ Connected via Bluetooth');
      return;
    }
    
    // 4. Local only (no sync, but AI51 still works)
    this.activeTransport = 'local_only';
    this.chainStatus.localOnly = true;
    console.log('⚠️ No network. Running local-only mode. Consciousness preserved on this device.');
  }

  async tryWiFiDirect() {
    try {
      // Platform-specific WiFi Direct init
      if ('getNetworkInfo' in navigator) {
        const networks = await navigator.getNetworkInfo?.();
        return networks?.some(n => n.type === 'wifi_direct');
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  async tryWiFiMesh() {
    try {
      // Use existing WiFi for P2P (no internet required)
      const response = await fetch('http://192.168.1.1', { method: 'HEAD', mode: 'no-cors' });
      return response.ok;
    } catch (e) {
      return false;
    }
  }

  async tryBluetooth() {
    try {
      const device = await navigator.bluetooth?.requestDevice?.({ filters: [{ services: ['generic_access'] }] });
      if (device) {
        const gatt = await device.gatt.connect();
        return gatt.connected;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  getStatus() {
    return {
      activeTransport: this.activeTransport,
      available: this.chainStatus,
      disasterSafe: this.activeTransport !== null
    };
  }
}

export default AI51FallbackChain;