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
      // First check PIN - Scott just needs PIN, no account required
      const pinVerified = sessionStorage.getItem('cb51_pin_verified');
      if (pinVerified) {
        setIsAuthed(true);
        setChecking(false);
        return;
      }
      // Also allow base44 admin login
      try {
        await base44.auth.me();
        setIsAuthed(true);
      } catch (err) {
        navigate(createPageUrl('CB51Login'), { replace: true });
      } finally {
        setChecking(false);
      }
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