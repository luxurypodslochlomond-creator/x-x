export default function CleanupIntegrationGuide() {
  return (
    <div className="p-6 bg-black text-white font-mono text-sm space-y-4">
      <h2 className="text-cyan-400 font-black text-xl">GPS + AI + IPFS + ECDSA Integration Guide</h2>
      <p className="text-gray-300">Three backend functions handle the proof-of-cleanup stack:</p>
      <ul className="space-y-2 text-gray-400">
        <li>• <strong className="text-white">analyzeCleanupPhoto.js</strong> — AI vision liveness + weight estimation</li>
        <li>• <strong className="text-white">signCleanupVerification.js</strong> — ECDSA P-256 cryptographic signing</li>
        <li>• <strong className="text-white">uploadCleanupProofToIPFS.js</strong> — Permanent decentralized storage</li>
      </ul>
      <p className="text-green-400 font-bold">Result: GPS-locked, AI-verified, cryptographically signed, IPFS-permanent cleanup proof. ♾️</p>
    </div>
  );
}