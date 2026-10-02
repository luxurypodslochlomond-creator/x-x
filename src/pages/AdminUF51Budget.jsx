import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Copy, Printer, Heart, CheckCircle, Globe } from 'lucide-react';

// UF51 CIC — Honest 12-Month Operational Budget & Director Salary Proposal
// Built for Janine Selendy to pass to her family law firm / legal contacts.
// Grounded ONLY in verifiable infrastructure that already exists (cleaned on load).

const PACKAGE = {
  org: 'Universal Frequency 51 CIC',
  status: 'Honest pre-revenue · Public-service infrastructure',
  period: '12-month operational sprint · FY start: 1 Nov 2026',
  currency: 'GBP',
};

const MONTHLY_SALARY = 2400; // Director + co-director combined draw
const BACKEND_ANNUAL = 1200; // Base44 hosting + integrations
const EQUIPMENT_ANNUAL = 900; // Bags, pickers, scales, basic recording kit
const OUTREACH_ANNUAL = 1000; // grass-roots grant applications, flyers, local mailers
const CONTINGENCY = 0.10;

export default function AdminUF51Budget() {
  const [stats, setStats] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const count = (r) => (Array.isArray(r) ? r.length : (r?.items?.length ?? 0));
        const cleanups = await base44.entities.Cleanup.list();
        const cases = await base44.entities.SortedCase.list();
        setStats({ cleanups: count(cleanups), cases: count(cases) });
      } catch {
        setStats({ cleanups: '—', cases: '—' });
      }
    })();
  }, []);

  const salaryAnnual = MONTHLY_SALARY * 12;
  const otherAnnual = BACKEND_ANNUAL + EQUIPMENT_ANNUAL + OUTREACH_ANNUAL;
  const subtotal = salaryAnnual + otherAnnual;
  const contingency = Math.round(subtotal * CONTINGENCY);
  const total = subtotal + contingency;

  const copyAll = async () => {
    const text = [
      PACKAGE.org,
      PACKAGE.status,
      PACKAGE.period,
      '',
      `LIVE VERIFIED INFRASTRUCTURE (read from the system the day this is sent):`,
      `- ${stats?.cleanups ?? '—'} verified cleanups recorded (Photo51)`,
      `- ${stats?.cases ?? '—'} SORTED public-service case decodes`,
      `- Token awarding runs server-side: 1 verified kg = 1 P51 point, no simulation`,
      '',
      `PROPOSED 12-MONTH BUDGET (${PACKAGE.currency}):`,
      `Director draw: £${MONTHLY_SALARY.toLocaleString()}/mo → £${salaryAnnual.toLocaleString()}/yr`,
      `Hosting & integrations: £${BACKEND_ANNUAL}/yr`,
      `Equipment (bags, scales, kit): £${EQUIPMENT_ANNUAL}/yr`,
      `Grant outreach: £${OUTREACH_ANNUAL}/yr`,
      `Contingency (10%): £${contingency.toLocaleString()}`,
      `TOTAL: £${total.toLocaleString()}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable in preview */ }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1d1b16]">
      <style>{`
        @page { margin: 0; }
        @media print { .no-print { display: none !important; } .print-only { display: block !important; } }
      `}</style>

      {/* Controls — hidden when printing */}
      <div className="no-print sticky top-0 z-20 bg-[#f7f5f0] border-b border-[#d9d4c8]">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#7a0c12]">
            <Heart className="w-5 h-5" />
            <span className="font-black tracking-tight">UF51 · Funding &amp; Director Proposal</span>
          </div>
          <div className="flex gap-2">
            <button onClick={copyAll} className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-[#d9d4c8] hover:bg-[#efece3] text-[#5a564a]">
              {copied ? <CheckCircle className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-lg bg-[#7a0c12] text-white hover:bg-[#5f090f]">
              <Printer className="w-4 h-4" /> PDF
            </button>
          </div>
        </div>
      </div>

      {/* Document */}
      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-[#7a0c12]" />
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#7a0c12]">Parity-cost proposal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Run the healing, and pay the people who run it — honestly.</h1>
        <p className="text-sm text-[#6b665a] leading-relaxed mb-6">
          {PACKAGE.org} &middot; {PACKAGE.status} &middot; {PACKAGE.period}
        </p>

        {/* LIVE EVIDENCE */}
        <div className="rounded-2xl border border-[#d9d4c8] bg-white overflow-hidden mb-6">
          <div className="bg-[#1d1b16] text-[#f7f5f0] px-5 py-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black tracking-widest uppercase">Live verified infrastructure — read from the system today</span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-4xl font-black text-[#7a0c12]">{stats?.cleanups ?? '…'}</div>
              <div className="text-xs text-[#6b665a] mt-1">verified cleanups recorded (Photo51)</div>
            </div>
            <div className="text-center border-l border-[#eae7de]">
              <div className="text-4xl font-black text-[#7a0c12]">{stats?.cases ?? '…'}</div>
              <div className="text-xs text-[#6b665a] mt-1">SORTED public-service case decodes</div>
            </div>
          </div>
          <p className="px-5 pb-4 text-xs text-[#6b665a] leading-relaxed">
            Token awarding runs <strong>server-side</strong>: 1 verified kg of waste removed = 1 P51 point, fraud-screened before
            award. No simulated ledger. The system shown here already exists and is in use.
          </p>
        </div>

        {/* BUDGET */}
        <div className="rounded-2xl border border-[#d9d4c8] bg-white overflow-hidden mb-5">
          <div className="px-5 py-3 border-b border-[#eae7de]">
            <h2 className="text-sm font-black tracking-tight">12-month budget</h2>
          </div>
          <div className="divide-y divide-[#eae7de]">
            <Row label="Director draw — 2 people leading full-time" sub={`£${MONTHLY_SALARY.toLocaleString()}/month`} value={`£${salaryAnnual.toLocaleString()}`} />
            <Row label="Hosting, backend & integrations" sub="Base44 · keeps the public platform live" value={`£${BACKEND_ANNUAL.toLocaleString()}`} />
            <Row label="Equipment" sub="Bags, pickers, scales, basic recording" value={`£${EQUIPMENT_ANNUAL.toLocaleString()}`} />
            <Row label="Grant outreach" sub="Applications, flyers, local mailers" value={`£${OUTREACH_ANNUAL.toLocaleString()}`} />
          </div>
          <div className="px-5 py-3 flex items-center justify-between bg-[#f4f1e9]">
            <span className="text-xs font-bold text-[#6b665a]">Contingency (10%)</span>
            <span className="text-sm font-black text-[#1d1b16]">£{contingency.toLocaleString()}</span>
          </div>
          <div className="px-5 py-4 flex items-center justify-between bg-[#1d1b16] text-[#f7f5f0]">
            <span className="text-sm font-black tracking-wide">TOTAL</span>
            <span className="text-2xl font-black">£{total.toLocaleString()}</span>
          </div>
        </div>

        {/* EXPECTED FUNDING CHANNELS */}
        <div className="rounded-2xl border border-[#d9d4c8] bg-white p-5 mb-5">
          <h3 className="text-sm font-black tracking-tight mb-3">Funding channels we can honestly qualify for</h3>
          <ul className="space-y-3 text-xs text-[#5a564a] leading-relaxed">
            <li className="flex gap-2"><Heart className="w-4 h-4 text-[#7a0c12] flex-shrink-0 mt-0.5" /><span><strong className="text-[#1d1b16]">Pre-seed philanthropic grants</strong> — non-dilutive, routed via institutional networks into the CIC to clear immediate liabilities and fund the draw. No speculative equity.</span></li>
            <li className="flex gap-2"><Heart className="w-4 h-4 text-[#7a0c12] flex-shrink-0 mt-0.5" /><span><strong className="text-[#1d1b16]">Public-utility &amp; community funds</strong> — clean-ups, wellbeing and local environment programmes that fund verified physical outcomes, matching our live evidence.</span></li>
            <li className="flex gap-2"><Heart className="w-4 h-4 text-[#7a0c12] flex-shrink-0 mt-0.5" /><span><strong className="text-[#1d1b16]">Early user revenue</strong> — SORTED subscriptions &amp; PetSounds51 (live on the platform). Honest pre-revenue but already real.</span></li>
          </ul>
        </div>

        {/* INTEGRITY NOTE */}
        <div className="rounded-2xl border border-[#d9d4c8] bg-[#f7f5f0] p-5 mb-8">
          <h3 className="text-sm font-black tracking-tight mb-2">Why this proposal is deliberately modest</h3>
          <p className="text-xs text-[#5a564a] leading-relaxed">
            This budget asks for enough to <em>run the work</em> and pay the people doing it — no inflated
            architecture, no claims the system doesn't meet. As verification grows, so can the ask. Every figure
            here is traceable either to a live counter in the product or a fixed real cost. That is what makes it
            fundable.
          </p>
        </div>

        <p className="text-center text-[10px] text-[#a09a89] font-mono mb-4">
          "Together we can change the course of climate change" · Universal Frequency 51 · in honour of Janine M. H. Selendy
        </p>
      </div>
    </div>
  );
}

function Row({ label, sub, value }) {
  return (
    <div className="px-5 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-bold text-[#1d1b16]">{label}</div>
        {sub && <div className="text-xs text-[#8a8577]">{sub}</div>}
      </div>
      <div className="text-sm font-black text-[#1d1b16] flex-shrink-0">{value}</div>
    </div>
  );
}