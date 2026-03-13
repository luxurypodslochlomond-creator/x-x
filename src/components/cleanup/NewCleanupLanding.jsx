import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Loader2, CheckCircle2, Zap, AlertCircle, Shield, Eye, Sparkles, WifiOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';
import P51Symbol from '@/components/shared/P51Symbol';
import CryptoSecurityTooltip from './CryptoSecurityTooltip';
import SecurityDashboard from '@/components/security/SecurityDashboard';

export default function NewCleanupLanding({
  formData,
  isLoading,
  isOffline,
  error,
  recentActivity,
  onPhotoCapture,
  onScanClick,
  onUseDetectedLocation,
  onViewPhoto,
  setError,
  syncNotification
}) {
  const [showGPSExplainer, setShowGPSExplainer] = useState(false);
  const [viewingPhoto, setViewingPhoto] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6 relative overflow-hidden">
      {/* QUANTUM GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-cyan-500"
            style={{ top: `${i * 20}%`, opacity: 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-xl mx-auto space-y-8 relative z-10">
        {/* GPS LOCK STATUS */}
        {formData.coordinates ? (
          <div className="bg-green-900/30 border-4 border-green-500 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-green-400 font-black font-mono text-lg">GPS LOCKED</p>
                    <p className="text-green-300 text-xs font-mono">
                      {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-green-300 text-xs font-mono">
                  🔐 Cryptographically signed • Tamper-proof
                </p>
                <button
                  onClick={() => setShowGPSExplainer(!showGPSExplainer)}
                  className="text-green-400 hover:text-green-300 text-sm font-bold underline"
                >
                  Why?
                </button>
              </div>

              {showGPSExplainer && (
                <div className="bg-black/60 border-2 border-green-500/50 rounded-lg p-4 space-y-2">
                  <p className="text-green-300 font-bold text-sm">💡 WHY GPS?</p>
                  <div className="space-y-2 text-xs text-gray-300">
                    <p>✓ <strong className="text-white">Stops fake cleanups:</strong> GPS proves you're at the actual location</p>
                    <p>✓ <strong className="text-white">Cryptographic proof:</strong> Location gets signed into your submission (tamper-proof)</p>
                    <p>✓ <strong className="text-white">Trust by default:</strong> We trust you. GPS just catches the scammers.</p>
                    <p className="text-green-400 font-bold mt-2">🔐 Your location is ONLY used for verification. Never sold. Never tracked.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-4 border-cyan-500 p-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-10 h-10 text-cyan-400" />
                <div>
                  <p className="text-cyan-400 font-black font-mono text-xl">GPS LOCK REQUESTED</p>
                  <p className="text-cyan-300 text-sm font-mono">
                    Tap "Allow" when browser asks
                  </p>
                </div>
              </div>

              <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-4">
                <p className="text-purple-300 font-bold text-sm mb-2">💡 WHY WE NEED YOUR LOCATION:</p>
                <div className="space-y-2 text-xs text-gray-300">
                  <p>✓ <strong className="text-white">Stops fake cleanups:</strong> GPS proves you're at the actual location</p>
                  <p>✓ <strong className="text-white">Cryptographic proof:</strong> Location gets signed into your submission (tamper-proof)</p>
                  <p>✓ <strong className="text-white">Trust by default:</strong> We trust you. GPS just catches the scammers.</p>
                  <p className="text-green-400 font-bold mt-2">🔐 Your location is ONLY used for verification. Never sold. Never tracked.</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
                <Shield className="w-4 h-4 text-green-400" />
                <span>✓ Works without GPS (for rural areas)</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-black border-4 border-cyan-500 p-6 relative">
          {/* STATIC CORNERS */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-500" />

          <div className="space-y-4">
            <h1 className="text-3xl font-black font-mono text-cyan-400 leading-tight">
              PHOTOGRAPH LITTER
              <br/>
              EARN INSTANTLY
            </h1>

            <SecurityDashboard minimal={true} />
            <CryptoSecurityTooltip />

            {/* SYNC NOTIFICATION */}
            <AnimatePresence>
              {syncNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-cyan-600 border-4 border-cyan-400 text-black px-6 py-3 font-black font-mono shadow-lg"
                >
                  {syncNotification}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-black border-2 border-amber-500/50 p-4 space-y-2">
              <p className="text-amber-400 font-mono text-sm font-black">
                1kg = 1 <P51Symbol showTooltip={true} />
              </p>
              <p className="text-cyan-400 font-mono text-xs">
                No minimum • Even wrapper (1g) counts • Micro-litter bonus +10-20%
              </p>
              <p className="text-pink-400 font-mono text-xs font-black">
                Universe watching ♾️
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {!isOffline && (
            <button
              onClick={onScanClick}
              className="w-full bg-amber-600 hover:bg-amber-500 border-4 border-amber-400 text-black py-6 text-lg font-black font-mono transition-all flex items-center justify-center gap-3"
            >
              <Zap className="w-6 h-6" />
              SCAN WITH AI
            </button>
          )}
          
          {!isOffline && (
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-cyan-500/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-black text-cyan-500/60 text-xs font-mono font-black">OR</span>
              </div>
            </div>
          )}

          <label className="block">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onPhotoCapture}
              className="hidden"
              id="photo-upload"
            />
            <button
              onClick={() => document.getElementById('photo-upload').click()}
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 border-4 border-cyan-400 text-black py-6 text-lg font-black font-mono transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  PROCESSING
                </>
              ) : (
                <>
                  <Camera className="w-6 h-6" />
                  {isOffline ? 'PHOTO (OFFLINE)' : 'UPLOAD PHOTO'}
                </>
              )}
            </button>
          </label>
        </div>

        {!isOffline && recentActivity.length > 0 && (
          <div className="border-2 border-cyan-500 bg-black p-6 space-y-4">
            <div className="flex items-center gap-3">
              <COOLASFUCKSparkle size={20} />
              <p className="text-cyan-400 text-base font-black font-mono tracking-wider">RECENT ACTIVITY</p>
            </div>
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((item, idx) => {
                const hasValidPhoto = item.photo_url && item.photo_url.startsWith('http');
                return (
                  <button
                    key={idx}
                    onClick={() => hasValidPhoto && setViewingPhoto(item)}
                    className="w-full flex items-center gap-4 bg-black hover:bg-cyan-900/20 border-2 border-cyan-500/30 hover:border-cyan-500 p-4 transition-all"
                  >
                    {hasValidPhoto ? (
                      <div className="w-14 h-14 flex-shrink-0 border-2 border-cyan-500">
                        <img 
                          src={item.photo_url} 
                          alt={item.type}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-green-600 to-cyan-600 flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white"><path d="M4 6h2m4 0h4m4 0h2M4 8v8M6 18h4m4 0h4M20 8v8M18 18h2M6 6v2m0 10v2M18 6v2m0 10v2M10 10h4m-4 4h4"/></svg></div>';
                          }}
                        />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 flex items-center justify-center flex-shrink-0 ${
                        item.type === 'cleanup' 
                          ? 'bg-gradient-to-br from-green-600 to-cyan-600' 
                          : 'bg-gradient-to-br from-pink-600 to-purple-600'
                      }`}>
                        <COOLASFUCKHeart size={28} animate={false} />
                      </div>
                    )}
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-white font-mono text-base font-bold truncate">{item.title}</p>
                      <p className="text-cyan-400 font-mono text-sm">{item.subtitle}</p>
                    </div>
                    {hasValidPhoto && (
                      <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PHOTO VIEWER MODAL */}
        {viewingPhoto && (
          <div 
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setViewingPhoto(null)}
          >
            <button
              onClick={() => setViewingPhoto(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="max-w-4xl w-full space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full rounded-xl border-4 border-cyan-500/50 overflow-hidden bg-gradient-to-br from-green-600 to-cyan-600 min-h-[300px] flex items-center justify-center">
                <img 
                  src={viewingPhoto.photo_url} 
                  alt={viewingPhoto.type} 
                  className="w-full rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <COOLASFUCKHeart size={80} />
                </div>
              </div>
              <div className="bg-black/60 border-2 border-cyan-500/50 rounded-xl p-6 space-y-2">
                {viewingPhoto.type === 'cleanup' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cyan-400 font-mono text-sm">LOCATION</p>
                        <p className="text-white font-bold text-xl">{viewingPhoto.data.county || viewingPhoto.data.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400 font-mono text-sm">WEIGHT</p>
                        <p className="text-white font-bold text-3xl">{viewingPhoto.data.litter_weight}kg</p>
                      </div>
                    </div>
                    {viewingPhoto.data.notes && (
                      <div className="pt-3 border-t border-white/20">
                        <p className="text-gray-400 text-sm">{viewingPhoto.data.notes}</p>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}