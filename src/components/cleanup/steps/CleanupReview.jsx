import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

const headStyle = { fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', letterSpacing: '-0.02em' };

export default function CleanupReview({
  formData, supportAmount, setSupportAmount,
  isLoading, isOffline, error, setStep, handleSubmit
}) {
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-6 pt-24 lg:pt-6" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="max-w-xl mx-auto space-y-6">
        <Button onClick={() => setStep('analysis')} variant="ghost" className="text-[#5a5246] hover:text-[#141210] font-mono uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <h2 className="font-black uppercase text-[#141210]" style={{ ...headStyle, fontSize: 'clamp(28px, 8vw, 38px)' }}>Review</h2>

        <div className="space-y-3">
          <div className="border border-[#141210] bg-[#f7f1e5] p-4">
            <p className="text-[#5a5246] text-[10px] font-mono uppercase tracking-widest mb-1">Weight</p>
            <p className="text-[#141210] text-3xl font-black font-mono">{formData.litter_weight}kg</p>
          </div>

          <div className="border border-[#141210] bg-[#f7f1e5] p-4">
            <p className="text-[#5a5246] text-[10px] font-mono uppercase tracking-widest mb-1">Location</p>
            <p className="text-[#141210] text-lg font-mono">{formData.location || formData.county || 'Not specified'}</p>
          </div>

          <div className="border-2 border-[#141210] border-l-8 border-l-[#e2602a] bg-[#f7f1e5] p-4">
            <p className="text-[#e2602a] text-[10px] font-mono font-black uppercase tracking-widest mb-1">Payment</p>
            <p className="text-[#141210] text-4xl font-black font-mono">{formData.tokens_awarded.toFixed(1)} <P51Symbol showTooltip={true} /></p>
            {isOffline && <p className="text-[#5a5246] text-xs font-mono mt-2">Will sync when online</p>}
          </div>

          {!isOffline && (
            <div className="border border-[#141210] bg-[#f7f1e5] p-4">
              <p className="text-[#141210] text-sm font-mono mb-3">Support artists? (optional)</p>
              <Input type="number" value={supportAmount}
                onChange={(e) => setSupportAmount(parseFloat(e.target.value) || 0)}
                placeholder="0" max={formData.tokens_awarded}
                className="bg-[#efe7d6] border-[#141210] text-[#141210] text-lg font-mono" />
            </div>
          )}

          {error && (
            <div className="bg-[#e2602a]/10 border-2 border-[#e2602a] p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#e2602a]" />
                <p className="text-[#141210] font-mono text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Button onClick={() => setStep('analysis')} variant="outline"
              className="flex-1 border-2 border-[#141210] text-[#141210] py-6 font-black font-mono uppercase hover:bg-[#141210] hover:text-[#efe7d6]" disabled={isLoading}>
              Edit
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}
              className="flex-1 bg-[#e2602a] hover:bg-[#141210] hover:text-[#efe7d6] border-2 border-[#141210] text-[#141210] py-6 font-black font-mono uppercase">
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