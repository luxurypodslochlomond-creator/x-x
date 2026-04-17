import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

export default function CB51PINGuard({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // PIN check first (instant, no network) — covers PIN users AND previously authed base44 users
      const pinVerified = localStorage.getItem('cb51_pin_verified');
      const cookieVerified = document.cookie.split(';').some(c => c.trim().startsWith('cb51_pin_verified=true'));
      if (pinVerified === 'true' || cookieVerified) {
        // Sync both stores so iOS doesn't log out after clearing localStorage
        localStorage.setItem('cb51_pin_verified', 'true');
        document.cookie = 'cb51_pin_verified=true; path=/; max-age=31536000; SameSite=Lax';
        setIsAuthed(true);
        setChecking(false);
        return;
      }

      // Check base44 login — logged in users always get through
      // Retry a couple of times in case OAuth token is still settling
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const user = await base44.auth.me();
          if (user) {
            // Set PIN verified so future checks are instant
            localStorage.setItem('cb51_pin_verified', 'true');
            document.cookie = 'cb51_pin_verified=true; path=/; max-age=31536000; SameSite=Lax';
            setIsAuthed(true);
            setChecking(false);
            return;
          }
        } catch (err) {
          // not logged in yet, wait a moment and retry
          if (attempt < 2) await new Promise(r => setTimeout(r, 800));
        }
      }

      // No auth at all — send to login
      setChecking(false);
      navigate(createPageUrl('CB51Login'), { replace: true });
    };
    checkAuth();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthed) return null;

  return children;
}