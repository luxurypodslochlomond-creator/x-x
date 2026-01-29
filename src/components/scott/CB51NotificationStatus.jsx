import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Radio, Smartphone, Monitor, AlertTriangle } from 'lucide-react';

/**
 * CB51 NOTIFICATION STATUS - Device detection + capability check
 * Shows user exactly what's possible on their device
 * COOLASFUCK design with CB51 consistency
 */

export default function CB51NotificationStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    detectCapabilities();
  }, []);

  const detectCapabilities = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const isDesktop = !isIOS && !isAndroid;
    
    // Check if PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                  window.navigator.standalone === true;
    
    // Check iOS version
    let iosVersion = null;
    if (isIOS) {
      const match = navigator.userAgent.match(/OS (\d+)_(\d+)/);
      if (match) {
        iosVersion = parseFloat(`${match[1]}.${match[2]}`);
      }
    }
    
    // Check push support
    const pushSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    
    // Determine status
    let deviceStatus = {
      device: isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop',
      icon: isIOS ? Smartphone : isAndroid ? Smartphone : Monitor,
      pushWorks: false,
      reason: '',
      action: '',
      color: 'red'
    };

    if (isIOS) {
      if (!iosVersion || iosVersion < 16.4) {
        deviceStatus.reason = 'iOS 16.4+ required';
        deviceStatus.action = 'Update iOS to get notifications';
        deviceStatus.color = 'amber';
      } else if (!isPWA) {
        deviceStatus.reason = 'Add to Home Screen required';
        deviceStatus.action = 'Tap Share → Add to Home Screen';
        deviceStatus.color = 'cyan';
        deviceStatus.pushWorks = 'partial'; // works after install
      } else if (!pushSupported) {
        deviceStatus.reason = 'Push not available';
        deviceStatus.action = 'Email fallback active';
        deviceStatus.color = 'amber';
      } else {
        deviceStatus.pushWorks = true;
        deviceStatus.reason = 'Push notifications ready';
        deviceStatus.action = 'Enable notifications below';
        deviceStatus.color = 'green';
      }
    } else if (isAndroid) {
      if (!pushSupported) {
        deviceStatus.reason = 'Push not supported';
        deviceStatus.action = 'Email fallback active';
        deviceStatus.color = 'amber';
      } else {
        deviceStatus.pushWorks = true;
        deviceStatus.reason = 'Push notifications ready';
        deviceStatus.action = 'Enable notifications below';
        deviceStatus.color = 'green';
      }
    } else {
      // Desktop
      if (!pushSupported) {
        deviceStatus.reason = 'Push not supported';
        deviceStatus.action = 'Use Chrome, Firefox, or Edge';
        deviceStatus.color = 'amber';
      } else {
        deviceStatus.pushWorks = true;
        deviceStatus.reason = 'Push notifications ready';
        deviceStatus.action = 'Enable notifications below';
        deviceStatus.color = 'green';
      }
    }

    setStatus(deviceStatus);
  };

  if (!status) return null;

  const IconComponent = status.icon;
  const colorMap = {
    green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-400', icon: Check },
    amber: { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-400', icon: AlertTriangle },
    cyan: { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-cyan-400', icon: Bell },
    red: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-400', icon: X }
  };

  const colors = colorMap[status.color];
  const StatusIcon = colors.icon;

  return (
    <div className="bg-black border-2 border-cyan-500 rounded p-4 mb-4" style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded ${colors.bg}/20`}>
          <IconComponent className={`w-5 h-5 ${colors.text}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <StatusIcon className={`w-4 h-4 ${colors.text}`} />
            <h3 className="text-white font-black font-mono text-sm">{status.device}</h3>
          </div>
          
          <p className={`${colors.text} font-bold font-mono text-xs mb-1`}>
            {status.reason}
          </p>
          
          <p className="text-gray-400 font-mono text-xs">
            {status.action}
          </p>
        </div>

        <Radio className="w-6 h-6 text-cyan-400 opacity-50" />
      </div>
    </div>
  );
}