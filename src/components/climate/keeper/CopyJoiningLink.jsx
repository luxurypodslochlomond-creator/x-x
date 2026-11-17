import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { recordAddress } from '@/components/climate/recordAddress';

export default function CopyJoiningLink({ keeper }) {
  const [state, setState] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(recordAddress(keeper ? '/ClimateKeeperRoom' : '/ClimateChecking'));
      setState('copied');
    } catch {
      setState('failed');
    }
  };
  return (
    <div>
      <button type="button" onClick={copy} className="inline-flex min-h-10 items-center gap-1.5 text-xs text-record-muted underline underline-offset-4">
        {state === 'copied' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{state === 'copied' ? 'Joining link copied' : 'Copy joining link'}
      </button>
      {state === 'copied' && <div role="status" className="text-xs text-record-muted">They sign in with the email on this list. The link alone gives nobody access.</div>}
      {state === 'failed' && <div role="alert" className="text-xs text-record-red">Copying was blocked. The joining address is <span className="break-all select-all">{recordAddress(keeper ? '/ClimateKeeperRoom' : '/ClimateChecking')}</span></div>}
    </div>
  );
}