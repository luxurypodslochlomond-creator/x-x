import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

export default function CleanupReview({
  formData, supportAmount, setSupportAmount,
  isLoading, isOffline, error, setStep, handleSubmit
}) {
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
      <div className="max-w-xl mx-auto space-y-6">
        <Button onClick={() => setStep('analysis')} variant="ghost" className="text-white/60 hover:text-white font-mono">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="space-y-4">
          <div className="border border-white/20 p-4">
            <p className="text-white/60 text-xs font-mono mb-1">WEIGHT</p>
            <p className="text-white text-3xl font-mono">{formData.litter_weight}kg</p>
          </div>

          <div className="border border-white/20 p-4">
            <p className="text-white/60 text-xs font-mono mb-1">LOCATION</p>
            <p className="text-white text-lg font-mono">{formData.location || formData.county || 'Not specified'}</p>
          </div>

          <div className="border-2 border-amber-500 bg-amber-500/10 p-4">
            <p className="text-amber-500 text-xs font-mono mb-1">PAYMENT</p>
            <p className="text-white text-4xl font-mono">{formData.tokens_awarded.toFixed(1)} <P51Symbol showTooltip={true} /></p>
            {isOffline && <p className="text-amber-400 text-xs font-mono mt-2">Will sync when online</p>}
          </div>

          {!isOffline && (
            <div className="border border-white/20 p-4">
              <p className="text-white text-sm font-mono mb-3">Support artists? (optional)</p>
              <Input type="number" value={supportAmount}
                onChange={(e) => setSupportAmount(parseFloat(e.target.value) || 0)}
                placeholder="0" max={formData.tokens_awarded}
                className="bg-white/10 border-white/20 text-white text-lg font-mono" />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 font-mono text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button onClick={() => setStep('analysis')} variant="outline"
              className="flex-1 border-white/20 text-white py-6 font-bold hover:bg-white/10" disabled={isLoading}>
              Edit
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-6 font-bold">
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{isOffline ? 'Saving' : 'Submitting'}</>
              ) : (
                <><CheckCircle2 className="w-5 h-5 mr-2" />{isOffline ? 'Save offline' : 'Submit'}</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}