import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, BellOff } from 'lucide-react';
import { registerWorker } from '@/lib/previewWorkers';

// ── NOT THE INBOX. THE PHONE. ────────────────────────────────────────────────
// Brian, 15 November: "email updates are boring… why am I fighting emails bro?"
//
// No good reason, it turned out. The record already installs as an app and the app can be
// woken by a push, so a keeper can be told in the place they actually look. One rule on the
// server: the phone is told first, and a letter is only written when nobody's phone answered.
// Turn this on and the letters about work you can already see stop arriving.
//
// Kept deliberately small and quiet: one line, one button, and it disappears once the phone
// is on. A keeper should never have to read a paragraph about notifications to do the work.
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
  return out;
};

export default function KeeperPhone() {
  const [state, setState] = useState('checking');
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [how, setHow] = useState(false);

  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);
  const standalone = typeof window !== 'undefined'
    && (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
  const supported = typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window;

  const reading = { fontFamily: 'var(--font-reading)' };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await base44.auth.me();
        if (!alive) return;
        if (!me?.email) { setState('anon'); return; }
        setEmail(me.email);
      } catch {
        if (alive) setState('anon');
        return;
      }
      if (!supported) { setState(isIOS && !standalone ? 'ios' : 'unsupported'); return; }
      if (Notification.permission === 'denied') { setState('blocked'); return; }
      try {
        const reg = await navigator.serviceWorker.getRegistration('/');
        const sub = reg ? await reg.pushManager.getSubscription() : null;
        if (alive) setState(sub ? 'on' : 'off');
      } catch {
        if (alive) setState('off');
      }
    })();
    return () => { alive = false; };
  }, [supported, isIOS, standalone]);

  const wake = async () => {
    setBusy(true);
    try {
      const permission = Notification.permission === 'granted'
        ? 'granted'
        : await Notification.requestPermission();
      if (permission !== 'granted') { setState('blocked'); return; }

      const reg = await navigator.serviceWorker.getRegistration('/')
        || await registerWorker('/api/functions/serveClimateServiceWorker', { scope: '/' });
      await navigator.serviceWorker.ready;

      let vapid = localStorage.getItem('VAPID_PUBLIC_KEY');
      if (!vapid) {
        const res = await fetch('/api/functions/getVapidPublicKey');
        const data = await res.json();
        vapid = data?.vapidPublicKey;
        if (vapid) localStorage.setItem('VAPID_PUBLIC_KEY', vapid);
      }
      if (!vapid) { setState('off'); return; }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapid),
      });

      const existing = await base44.entities.UserPushSubscription.filter({ user_email: email });
      const row = {
        user_email: email,
        subscription_data: JSON.stringify(sub),
        is_active: true,
        last_active: new Date().toISOString(),
      };
      if (existing?.length) await base44.entities.UserPushSubscription.update(existing[0].id, row);
      else await base44.entities.UserPushSubscription.create(row);

      setState('on');
      if ('vibrate' in navigator) navigator.vibrate([80, 40, 80]);
    } catch (e) {
      console.error('KeeperPhone: could not turn the phone on', e?.message);
      setState('off');
    } finally {
      setBusy(false);
    }
  };

  const hush = async () => {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.getRegistration('/');
      const sub = reg ? await reg.pushManager.getSubscription() : null;
      if (sub) await sub.unsubscribe();
      const existing = await base44.entities.UserPushSubscription.filter({ user_email: email });
      await Promise.all((existing || []).map((r) =>
        base44.entities.UserPushSubscription.update(r.id, { is_active: false })
      ));
      setState('off');
    } catch (e) {
      console.error('KeeperPhone: could not turn the phone off', e?.message);
    } finally {
      setBusy(false);
    }
  };

  if (state === 'checking' || state === 'anon') return null;

  if (state === 'on') {
    return (
      <p className="text-[12px] text-[#1e3a2b] mb-5 flex items-center gap-1.5" style={reading}>
        <Bell className="w-3.5 h-3.5" /> This screen is on — tapped when something needs you, never emailed about it.
        <button onClick={hush} disabled={busy} className="text-[11.5px] text-[#6b5f4f] underline ml-1 disabled:opacity-40">
          turn off
        </button>
      </p>
    );
  }

  // ── AN APPLE RULE, NOT OURS ────────────────────────────────────────────────
  // Brian, 16 November: "why does it have to be on home screen bro? It feels weird getting
  // overly complex." He is right that it read as homework. It is not our condition: an
  // iPhone only delivers a web push to a site that has been put on the home screen, and no
  // amount of building changes that. So the fact stays — told plainly, in one line — and the
  // chore goes behind a tap, for whoever actually wants the phone to work.
  if (state === 'ios') {
    return (
      <div className="border border-[#141210]/20 p-2.5 mb-5" style={reading}>
        <p className="text-[12.5px] leading-[1.55] text-[#6b5f4f]">
          <BellOff className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
          On an iPhone the record can&rsquo;t tap you yet — Apple only allows that once the record is on the home screen. Until then, letters keep coming.
          <button
            onClick={() => setHow(!how)}
            className="underline ml-1 text-[11.5px] text-[#6b5f4f]"
          >
            {how ? 'close' : 'how'}
          </button>
        </p>
        {how && (
          <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-1.5">
            In Safari, tap Share at the bottom of the screen, then Add to Home Screen. Open the record from the icon, then come back to this line.
          </p>
        )}
      </div>
    );
  }

  if (state === 'blocked') {
    return (
      <p className="text-[12.5px] leading-[1.55] text-[#6b5f4f] border border-[#141210]/20 p-2.5 mb-5" style={reading}>
        <BellOff className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
        Notifications are blocked for the record, so letters will keep coming. Allow them in your device settings and this line changes.
      </p>
    );
  }

  if (state === 'unsupported') return null;

  return (
    <div className="border border-[#141210]/20 p-2.5 mb-5 flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold text-[#141210] leading-tight" style={reading}>Tell this screen, not my inbox</p>
        <p className="text-[11.5px] leading-[1.5] text-[#6b5f4f]" style={reading}>
          Phone or laptop, whichever you keep the record open on. It says one thing — something is waiting for you — and never anything else. Off by default, and yours to switch off.
        </p>
      </div>
      <button
        onClick={wake}
        disabled={busy}
        className="flex-shrink-0 min-h-[42px] px-3 bg-[#1a1612] text-[#f4efe4] text-[13px] font-semibold inline-flex items-center gap-1.5 disabled:opacity-40"
        style={reading}
      >
        <Bell className="w-3.5 h-3.5" /> {busy ? '…' : 'Turn on'}
      </button>
    </div>
  );
}