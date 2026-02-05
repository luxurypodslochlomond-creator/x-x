import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CB51PINGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const pinVerified = sessionStorage.getItem('cb51_pin_verified');
    if (!pinVerified) {
      navigate(createPageUrl('CB51Login'), { replace: true });
    }
  }, [navigate]);

  const pinVerified = sessionStorage.getItem('cb51_pin_verified');
  if (!pinVerified) return null;

  return children;
}