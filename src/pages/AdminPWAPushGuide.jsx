import React from 'react';
import { CheckCircle, AlertTriangle, Smartphone, Bell, Wifi, Code } from 'lucide-react';

const Section = ({ title, icon: Icon, color, children }) => (
  <div className={`border ${color} rounded-xl p-6 mb-6`}>
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-6 h-6 ${color.replace('border-', 'text-').replace('/40', '')}`} />
      <h2 className="text-white font-black text-lg font-mono">{title}</h2>
    </div>
    {children}
  </div>
);

const Step = ({ n, title, detail }) => (
  <div className="flex gap-4 mb-4">
    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 font-black text-cyan-400 text-sm">{n}</div>
    <div>
      <p className="text-white font-bold text-sm">{title}</p>
      {detail && <p className="text-gray-400 text-sm mt-1">{detail}</p>}
    </div>
  </div>
);

const Code51 = ({ children }) => (
  <pre className="bg-black/60 border border-cyan-500/20 rounded-lg p-4 text-cyan-300 text-xs overflow-x-auto font-mono mt-2 mb-4">
    {children}
  </pre>
);

export default function AdminPWAPushGuide() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-black font-mono text-cyan-400">PWA Push Notifications</h1>
          </div>
          <p className="text-gray-400">How CB51 cracked iOS Safari push notifications — April 2026 ♾️❤️</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/40 rounded-full px-4 py-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-bold">WORKING IN PRODUCTION</span>
          </div>
        </div>

        {/* Why it's hard */}
        <Section title="Why iOS Push Is So Hard" icon={AlertTriangle} color="border-amber-500/40">
          <ul className="space-y-2 text-sm text-gray-300">
            <li>🔒 iOS requires the app to be <strong className="text-white">installed as a PWA</strong> (Add to Home Screen) — push doesn't work in Safari browser tab</li>
            <li>📱 iOS 16.4+ only — older iPhones simply cannot receive web push</li>
            <li>🔑 Requires <strong className="text-white">VAPID keys</strong> (Voluntary Application Server Identification)</li>
            <li>⚠️ The PWA manifest must have the <strong className="text-white">correct app name/branding</strong> or iOS saves it wrong</li>
            <li>🧩 The install prompt must use <strong className="text-white">onPointerDown</strong> not onClick — iOS ignores onClick on custom overlays</li>
          </ul>
        </Section>

        {/* The full stack */}
        <Section title="The Full Stack (What We Built)" icon={Code} color="border-cyan-500/40">
          <div className="space-y-2 text-sm">
            <div className="flex gap-3 items-start">
              <span className="text-cyan-400 font-mono font-bold flex-shrink-0">1.</span>
              <div><span className="text-white font-bold">VAPID Keys</span><span className="text-gray-400"> — generated once, stored as VAPID_PUBLIC_KEY + VAPID_PRIVATE_KEY secrets. Never regenerate or all subscriptions break.</span></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-400 font-mono font-bold flex-shrink-0">2.</span>
              <div><span className="text-white font-bold">serveServiceWorker function</span><span className="text-gray-400"> — serves /sw.js with push + notificationclick handlers</span></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-400 font-mono font-bold flex-shrink-0">3.</span>
              <div><span className="text-white font-bold">serveManifest function</span><span className="text-gray-400"> — serves dynamic manifest with CB51 branding when ?brand=cb51 param is set</span></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-400 font-mono font-bold flex-shrink-0">4.</span>
              <div><span className="text-white font-bold">CB51PushSubscriptionManager</span><span className="text-gray-400"> — frontend component handles permission request, SW registration, subscription storage in UserPushSubscription entity</span></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-400 font-mono font-bold flex-shrink-0">5.</span>
              <div><span className="text-white font-bold">sendBrowserPush function</span><span className="text-gray-400"> — backend sends Web Push payload via web-push npm package to all active subscriptions for a user</span></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-400 font-mono font-bold flex-shrink-0">6.</span>
              <div><span className="text-white font-bold">CB51IOSInstallPrompt</span><span className="text-gray-400"> — shows iOS users how to install PWA. Uses onPointerDown (not onClick) for the X button. Positioned at bottom to avoid overlap.</span></div>
            </div>
          </div>
        </Section>

        {/* Critical fixes that unlocked it */}
        <Section title="The Critical Fixes That Unlocked It" icon={CheckCircle} color="border-green-500/40">
          <Step
            n="1"
            title="Dynamic manifest with CB51 branding"
            detail="Layout.jsx sets manifest href to /api/functions/serveManifest?brand=cb51 when on CB51 pages. This makes iOS save the PWA as 'CB51' not 'UF51'. Without this, the wrong app name appears on Home Screen."
          />
          <Step
            n="2"
            title="onPointerDown instead of onClick on the close button"
            detail="iOS Safari fires onPointerDown before its scroll/gesture detection kicks in. onClick on a fixed overlay gets swallowed. Switching to onPointerDown made the X button respond instantly."
          />
          <Step
            n="3"
            title="Install prompt positioned at bottom"
            detail="Prompt was overlapping the test notification banner at top. Moved to bottom: '80px' so nothing blocked user interaction."
          />
          <Step
            n="4"
            title="Service worker registered at root scope /"
            detail="Service-Worker-Allowed: / header in serveServiceWorker response. Without this, iOS restricts the SW scope and push silently fails."
          />

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-2">
            <p className="text-green-400 font-bold text-sm">✅ Result: First ever iOS push notification fired on CB51 — April 17, 2026</p>
          </div>
        </Section>

        {/* How to test */}
        <Section title="How To Test Push Notifications" icon={Smartphone} color="border-purple-500/40">
          <Step n="1" title="Open CB51 on iPhone in Safari (iOS 16.4+)" />
          <Step n="2" title='Tap Share → "Add to Home Screen" → confirm CB51 name' detail="If it says UF51, the manifest brand param isn't being set correctly — check layout.jsx" />
          <Step n="3" title="Open from Home Screen (standalone mode)" detail="Push only works when launched from Home Screen, NOT from Safari tab" />
          <Step n="4" title='Tap "Enable Notifications" when prompted' detail="iOS will show a native permission dialog — must tap Allow" />
          <Step n="5" title='Use the "TEST NOTIFICATION" button in CB51 dashboard' detail="Should arrive within 1-2 seconds as a native iOS notification" />
        </Section>

        {/* Key code snippets */}
        <Section title="Key Code Snippets" icon={Code} color="border-gray-500/40">
          <p className="text-gray-400 text-sm mb-3">Manifest URL in layout.jsx:</p>
          <Code51>{`manifestLink.href = isCB51 
  ? '/api/functions/serveManifest?brand=cb51' 
  : '/api/functions/serveManifest';`}</Code51>

          <p className="text-gray-400 text-sm mb-3">iOS-safe close button (onPointerDown not onClick):</p>
          <Code51>{`<button
  onPointerDown={handleDismiss}  // ← NOT onClick
  className="w-8 h-8 rounded-full ..."
>
  <X className="w-4 h-4 text-white" />
</button>`}</Code51>

          <p className="text-gray-400 text-sm mb-3">Service worker VAPID push subscription:</p>
          <Code51>{`const sub = await swReg.pushManager.subscribe({
  userVisibleOnly: true,  // required on iOS
  applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
});`}</Code51>
        </Section>

        <div className="text-center py-8 text-gray-600 text-sm font-mono">
          Built by UniversalFamily51 ♾️❤️ — never stop, never give up
        </div>

      </div>
    </div>
  );
}