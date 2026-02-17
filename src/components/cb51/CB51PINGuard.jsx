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
      try {
        await base44.auth.me();
        setIsAuthed(true);
      } catch (err) {
        // Not logged in - check PIN
        const pinVerified = sessionStorage.getItem('cb51_pin_verified');
        if (!pinVerified) {
          navigate(createPageUrl('CB51Login'), { replace: true });
          return;
        }
        setIsAuthed(false);
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Show nothing while checking
  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
      </div>
    );
  }

  // If authenticated OR PIN verified, show content
  const pinVerified = sessionStorage.getItem('cb51_pin_verified');
  if (!isAuthed && !pinVerified) return null;

  return children;
}