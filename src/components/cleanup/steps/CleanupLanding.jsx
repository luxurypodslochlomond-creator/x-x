import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Loader2, CheckCircle2, Zap, Eye, X, Shield } from 'lucide-react';
import { COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';
import P51Symbol from '@/components/shared/P51Symbol';
import SecurityDashboard from '@/components/security/SecurityDashboard';
import CryptoSecurityTooltip from '@/components/cleanup/CryptoSecurityTooltip';
import RealtimeScanningOverlay from '@/components/shared/RealtimeScanningOverlay';
import CleanupImage from '@/components/cleanup/CleanupImage';

const headStyle = { fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', letterSpacing: '-0.02em' };

export default function CleanupLanding({
  formData, isOffline, isLoading, recentActivity,
  viewingPhoto, setViewingPhoto,
  showScanner, setShowScanner,
  handlePhotoCapture, handleScannerPhoto, syncNotification,
  showGPSExplainer, setShowGPSExplainer,
  setError
}) {
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-6 pt-24 lg:pt-6 relative overflow-hidden" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>

      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        {/* GPS STATUS */}
        {formData.coordinates ? (
          <div className="bg-[#1e3a2b] border-2 border-[#141210] border-l-8 border-l-[#1e3a2b] p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-[#efe7d6]" />
                  <div>
                    <p className="text-[#efe7d6] font-black font-mono text-base uppercase tracking-wider">GPS Locked</p>
                    <p className="text-[#efe7d6]/70 text-xs font-mono">
                      {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-7 h-7 text-[#efe7d6]" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#efe7d6]/70 text-[11px] font-mono">🔐 Cryptographically signed · tamper-proof</p>
                <button onClick={() => setShowGPSExplainer(!showGPSExplainer)}
                  className="text-[#e2602a] hover:text-[#efe7d6] text-xs font-black font-mono uppercase underline">Why?</button>
              </div>
              {showGPSExplainer && (
                <div className="bg-[#efe7d6] border border-[#141210] p-4 space-y-2">
                  <p className="text-[#1e3a2b] font-black font-mono text-xs uppercase">💡 Why GPS?</p>
                  <div className="space-y-2 text-[11px] font-mono text-[#141210]">
                    <p>✓ <strong>Stops fake cleanups:</strong> GPS proves you're at the actual location</p>
                    <p>✓ <strong>Cryptographic proof:</strong> location gets signed into your submission</p>
                    <p>✓ <strong>Trust by default:</strong> we trust you — GPS just catches the scammers</p>
                    <p className="text-[#1e3a2b] font-black mt-2">🔐 Your location is ONLY used for verification. Never sold. Never tracked.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#f7f1e5] border-2 border-[#141210] border-l-8 border-l-[#e2602a] p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-9 h-9 text-[#e2602a]" />
                <div>
                  <p className="text-[#141210] font-black font-mono text-lg uppercase tracking-wider">GPS Lock Requested</p>
                  <p className="text-[#5a5246] text-xs font-mono">Tap "Allow" when the browser asks</p>
                </div>
              </div>
              <div className="bg-[#efe7d6] border border-[#141210] p-4">
                <p className="text-[#141210] font-black font-mono text-xs uppercase mb-2">💡 Why we need your location:</p>
                <div className="space-y-2 text-[11px] font-mono text-[#141210]">
                  <p>✓ <strong>Stops fake cleanups:</strong> GPS proves you're at the actual location</p>
                  <p>✓ <strong>Cryptographic proof:</strong> location gets signed into your submission</p>
                  <p>✓ <strong>Trust by default:</strong> we trust you — GPS just catches the scammers</p>
                  <p className="text-[#1e3a2b] font-black mt-2">🔐 Your location is ONLY used for verification. Never sold. Never tracked.</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#5a5246]">
                <Shield className="w-4 h-4 text-[#1e3a2b]" />
                <span>✓ Works without GPS (rural areas)</span>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CARD */}
        <div className="bg-[#f7f1e5] border-2 border-[#141210] p-5 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#e2602a]" />
          <div className="space-y-4 pt-1">
            <h1 className="font-black uppercase text-[#141210] leading-[0.95]" style={{ ...headStyle, fontSize: 'clamp(28px, 8vw, 40px)' }}>
              Photograph Litter<br /><span className="text-[#e2602a]">Earn Instantly</span>
            </h1>
            <SecurityDashboard minimal={true} />
            <CryptoSecurityTooltip />

            <AnimatePresence>
              {syncNotification && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#e2602a] border-2 border-[#141210] text-[#141210] px-6 py-3 font-black font-mono uppercase text-sm">
                  {syncNotification}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-[#efe7d6] border border-[#141210] p-4 space-y-1">
              <p className="text-[#141210] font-mono text-sm font-black uppercase">1kg = 1 <P51Symbol showTooltip={true} /></p>
              <p className="text-[#5a5246] font-mono text-xs">No minimum · even a wrapper (5g) counts</p>
              <p className="text-[#1e3a2b] font-mono text-xs font-black">Universe watching ♾️</p>
            </div>
          </div>
        </div>

        {/* CAMERA BUTTONS */}
        <div className="space-y-4">
          {!isOffline && (
            <button
              onClick={async () => {
                try {
                  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                  stream.getTracks().forEach(track => track.stop());
                  setShowScanner(true);
                } catch (err) {
                  setError('Camera denied. Use photo upload below instead.');
                  setTimeout(() => setError(null), 3000);
                }
              }}
              className="w-full bg-[#e2602a] hover:bg-[#141210] hover:text-[#efe7d6] border-2 border-[#141210] text-[#141210] py-5 text-base font-black font-mono uppercase transition-colors flex items-center justify-center gap-3"
            >
              <Zap className="w-5 h-5" /> Scan With AI
            </button>
          )}

          {!isOffline && (
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[#141210]/30"></div></div>
              <div className="relative flex justify-center"><span className="px-3 bg-[#efe7d6] text-[#5a5246] text-[10px] font-mono font-black uppercase tracking-widest">or</span></div>
            </div>
          )}

          <label className="block">
            <input type="file" accept="image/*" capture="environment" onChange={handlePhotoCapture} className="hidden" id="photo-upload" />
            <button onClick={() => document.getElementById('photo-upload').click()} disabled={isLoading}
              className="w-full bg-[#1e3a2b] hover:bg-[#141210] border-2 border-[#141210] text-[#efe7d6] py-5 text-base font-black font-mono uppercase transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" />Processing</>) : (<><Camera className="w-5 h-5" />{isOffline ? 'Photo (offline)' : 'Upload Photo'}</>)}
            </button>
          </label>
        </div>

        {/* RECENT ACTIVITY */}
        {!isOffline && recentActivity.length > 0 && (
          <div className="border-2 border-[#141210] bg-[#f7f1e5] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <COOLASFUCKSparkle size={18} />
              <p className="text-[#141210] text-sm font-black font-mono uppercase tracking-widest">Recent Activity</p>
            </div>
            <div className="space-y-2">
              {recentActivity.slice(0, 5).map((item, idx) => {
                const hasValidPhoto = item.photo_url && item.photo_url.startsWith('http');
                return (
                  <button key={idx} onClick={() => hasValidPhoto && setViewingPhoto(item)}
                    className="w-full flex items-center gap-3 bg-[#efe7d6] hover:bg-[#e2602a]/10 border border-[#141210] p-3 transition-colors">
                    <div className="w-12 h-12 flex-shrink-0 border border-[#141210] overflow-hidden">
                      <CleanupImage src={hasValidPhoto ? item.photo_url : null} alt={item.type} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-[#141210] font-mono text-sm font-bold truncate">{item.title}</p>
                      <p className="text-[#5a5246] font-mono text-xs">{item.subtitle}</p>
                    </div>
                    {hasValidPhoto && <Eye className="w-4 h-4 text-[#e2602a] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PHOTO VIEWER MODAL */}
        {viewingPhoto && (
          <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-5" onClick={() => setViewingPhoto(null)}>
            <button onClick={() => setViewingPhoto(null)}
              className="absolute top-5 right-5 w-11 h-11 bg-[#efe7d6] border border-[#141210] flex items-center justify-center">
              <X className="w-5 h-5 text-[#141210]" />
            </button>
            <div className="max-w-4xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full border-2 border-[#141210] overflow-hidden min-h-[280px]">
                <CleanupImage src={viewingPhoto.photo_url} alt="Cleanup" className="w-full h-64 object-cover" />
              </div>
              <div className="bg-[#efe7d6] border-2 border-[#141210] p-5 space-y-2">
                {viewingPhoto.type === 'cleanup' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#5a5246] font-mono text-[10px] uppercase tracking-widest">Location</p>
                        <p className="text-[#141210] font-black text-lg">{viewingPhoto.data.county || viewingPhoto.data.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#e2602a] font-mono text-[10px] uppercase tracking-widest">Weight</p>
                        <p className="text-[#141210] font-black text-3xl">{viewingPhoto.data.litter_weight}kg</p>
                      </div>
                    </div>
                    {viewingPhoto.data.notes && (
                      <div className="pt-3 border-t border-[#141210]/20"><p className="text-[#5a5246] font-mono text-sm">{viewingPhoto.data.notes}</p></div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-[#e2602a] font-mono text-[10px] uppercase tracking-widest">Mission Funded</p>
                      <p className="text-[#141210] font-black text-xl">{viewingPhoto.data.mission?.title}</p>
                    </div>
                    <div className="pt-3 border-t border-[#141210]/20">
                      <p className="text-[#5a5246] font-mono text-[10px] uppercase tracking-widest">Contribution</p>
                      <p className="text-[#141210] font-black text-3xl">{viewingPhoto.data.amount_contributed} P51</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showScanner && (
        <RealtimeScanningOverlay onPhotoCapture={handleScannerPhoto} onCancel={() => setShowScanner(false)} />
      )}
    </div>
  );
}