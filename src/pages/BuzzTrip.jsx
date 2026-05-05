import React, { useEffect } from 'react';
import BuzzTripEngine from '../components/buzztrip/BuzzTripEngine';

export default function BuzzTrip() {
  useEffect(() => {
    document.title = 'BuzzTrip — Vagal Reset Engine';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
    metaDesc.content = 'Reset your nervous system in minutes. Free. No device. No login. Breathing + sound therapy backed by peer-reviewed science.';
  }, []);

  return <BuzzTripEngine />;
}