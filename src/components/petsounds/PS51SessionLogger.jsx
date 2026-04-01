// PS51 Session Logger — fires anonymously when a protocol session starts/ends
// No PII. No tracking. Just: which protocol, which species, how long, what device.
// This dataset is the moat.

import { base44 } from '@/api/base44Client';

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua).test) return 'mobile';
  if (window.innerWidth <= 768) return 'mobile';
  if (window.innerWidth <= 1024) return 'tablet';
  return 'desktop';
};

export const logPS51SessionStart = ({ protocol, species, isSubscribed, isSmartFinder }) => {
  const startTime = Date.now();
  const returnVisit = !!localStorage.getItem('ps51_visited_before');
  
  // Mark as visited
  localStorage.setItem('ps51_visited_before', '1');

  // Return a "stop" function to call when session ends
  return () => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    
    base44.entities.PS51SessionLog.create({
      protocol,
      species,
      session_duration_seconds: duration,
      is_subscribed: !!isSubscribed,
      is_smart_finder: !!isSmartFinder,
      country_hint: navigator.language || 'unknown',
      device_type: getDeviceType(),
      return_visit: returnVisit,
      session_date: new Date().toISOString().split('T')[0],
    }).catch(() => {}); // Silent fail — never block the user experience
  };
};