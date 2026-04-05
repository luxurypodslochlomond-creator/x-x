// Haptic feedback when buzz cancels - makes relief *real*
export function triggerSuccessHaptic() {
  if (navigator.vibrate) {
    // Three gentle pulses = "relief confirmed"
    navigator.vibrate([50, 100, 50, 100, 50]);
  }
}

export function triggerSearchHaptic() {
  if (navigator.vibrate) {
    // Subtle pulse while scanning
    navigator.vibrate([30, 50, 30]);
  }
}

export function triggerErrorHaptic() {
  if (navigator.vibrate) {
    // One longer buzz = "try again"
    navigator.vibrate([100]);
  }
}

// Use in BuzzStopEngine:
// - triggerSearchHaptic() when user starts frequency scan
// - triggerSuccessHaptic() when destructive interference detected
// - triggerErrorHaptic() if no frequency found