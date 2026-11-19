import React from 'react';
import { Globe } from 'lucide-react';

export default function FounderSignature() {
  return (
    <section aria-labelledby="founder-signature" className="record-founder-plate mx-auto my-10 max-w-4xl border-t-4 border-record-red p-5 lg:my-16 lg:p-8">
      <div className="mb-5 flex items-start gap-3">
        <Globe aria-hidden="true" className="h-5 w-5 shrink-0 text-record-red" />
        <h2 id="founder-signature" className="font-display text-xl font-bold leading-[1.1] text-record-ink lg:text-2xl" style={{ letterSpacing: '-0.01em' }}>The Signature</h2>
      </div>
      <p className="font-bold text-record-ink">Janine M. H. Selendy</p>
      <p className="mt-1 text-record-muted">Founder</p>
      <div className="mt-6 grid gap-3">
        <a href="https://www.solutions-site.org" target="_blank" rel="noopener noreferrer" className="block border border-record-ink/40 bg-record-bone p-4 text-record-ink hover:border-record-red">
          <span className="record-header-type mb-2 block text-xs text-record-muted">Horizon International Solutions Site</span>
          <span className="break-words text-sm">solutions-site.org</span>
        </a>
        <a href="https://www.youtube.com/user/jselendy" target="_blank" rel="noopener noreferrer" className="block border border-record-ink/40 bg-record-bone p-4 text-record-ink hover:border-record-red">
          <span className="record-header-type mb-2 block text-xs text-record-muted">Documentaries &amp; Film Clips</span>
          <span className="break-words text-sm">youtube.com/user/jselendy</span>
        </a>
      </div>
      <p className="mt-6 text-record-muted">Selendy FN'96 Explorers Club. Fellow Emeritus.</p>
      <p className="mt-4 text-record-muted">The Solutions Site was created by Horizon International with UNEP, UNDP, UNFPA, UNICEF, the IDRC of Canada, Yale University and colleagues at Harvard — a forum where every accepted entry has been reviewed before publication.</p>
    </section>
  );
}