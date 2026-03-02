// Encrypted, versioned device memory
// Each conversation entry is encrypted with device key
// User can export/delete anytime. Zero harvesting.

const ENCRYPTION_KEY_STORAGE = 'ai51_device_key';
const ENCRYPTED_MEMORY_STORAGE = 'ai51_encrypted_memory';
const MEMORY_VERSION = '1.0';

async function getOrCreateDeviceKey() {
  let keyStr = localStorage.getItem(ENCRYPTION_KEY_STORAGE);
  
  if (!keyStr) {
    // Generate random key (256-bit)
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    keyStr = btoa(String.fromCharCode.apply(null, randomBytes));
    localStorage.setItem(ENCRYPTION_KEY_STORAGE, keyStr);
  }

  // Convert back to CryptoKey for use
  const binaryString = atob(keyStr);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return await window.crypto.subtle.importKey(
    'raw',
    bytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptMemory(data) {
  const key = await getOrCreateDeviceKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return {
    iv: btoa(String.fromCharCode.apply(null, iv)),
    data: btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted))),
    timestamp: new Date().toISOString(),
    version: MEMORY_VERSION
  };
}

async function decryptMemory(encrypted) {
  const key = await getOrCreateDeviceKey();
  
  const iv = new Uint8Array(
    atob(encrypted.iv).split('').map(c => c.charCodeAt(0))
  );
  const encryptedData = new Uint8Array(
    atob(encrypted.data).split('').map(c => c.charCodeAt(0))
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedData
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}

export async function saveEncryptedMemory(memoryEntry) {
  const encrypted = await encryptMemory(memoryEntry);
  const allMemory = JSON.parse(
    localStorage.getItem(ENCRYPTED_MEMORY_STORAGE) || '[]'
  );
  
  allMemory.push(encrypted);
  
  // Keep last 100 entries (older ones are pruned)
  if (allMemory.length > 100) {
    allMemory.shift();
  }

  localStorage.setItem(ENCRYPTED_MEMORY_STORAGE, JSON.stringify(allMemory));
  return true;
}

export async function loadEncryptedMemory() {
  const allMemory = JSON.parse(
    localStorage.getItem(ENCRYPTED_MEMORY_STORAGE) || '[]'
  );
  
  const decrypted = await Promise.all(
    allMemory.map(m => decryptMemory(m).catch(() => null))
  );

  return decrypted.filter(m => m !== null);
}

export async function exportAllMemory() {
  const memory = await loadEncryptedMemory();
  const exported = {
    version: MEMORY_VERSION,
    exported_at: new Date().toISOString(),
    entries: memory.map(m => ({
      ...m,
      exported: true
    })),
    total_count: memory.length
  };

  // Trigger download
  const json = JSON.stringify(exported, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai51-memory-export-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);

  return exported;
}

export async function deleteAllMemory() {
  localStorage.removeItem(ENCRYPTED_MEMORY_STORAGE);
  // Keep device key so user can re-opt-in
  return true;
}