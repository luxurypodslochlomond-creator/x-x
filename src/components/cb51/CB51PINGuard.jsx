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
      // Check base44 login FIRST — logged in users always get through
      try {
        const user = await base44.auth.me();
        if (user) {
          // Also set PIN verified so future checks are instant
          localStorage.setItem('cb51_pin_verified', 'true');
          document.cookie = 'cb51_pin_verified=true; path=/; max-age=31536000';
          setIsAuthed(true);
          setChecking(false);
          return;
        }
      } catch (err) {
        // not logged in via base44, fall through to PIN check
      }

      // PIN check - check both localStorage AND cookie (iOS PWA needs cookie)
      const pinVerified = localStorage.getItem('cb51_pin_verified');
      const cookieVerified = document.cookie.split(';').some(c => c.trim() === 'cb51_pin_verified=true');
      if (pinVerified === 'true' || cookieVerified) {
        setIsAuthed(true);
      } else {
        navigate(createPageUrl('CB51Login'), { replace: true });
      }
      setChecking(false);
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