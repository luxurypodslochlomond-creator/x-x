import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import FilingFacts from '@/components/companieshouse/FilingFacts';
import FilingStep from '@/components/companieshouse/FilingStep';
import FilingSave from '@/components/companieshouse/FilingSave';
import useVaultFacts from '@/components/companieshouse/useVaultFacts';
import { STEPS, STUCK, DIRECTOR_LINK } from '@/components/companieshouse/FilingSteps';

const DEADLINE = Date.UTC(2026, 11, 2);
const STORAGE_KEY = 'ch-confirmation-statement-2026-11';

function readDone() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function daysLeft() {
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((DEADLINE - today) / 86400000);
}

// ── ONE FILING, ONE PAGE ───────────────────────────────────────────────────────
// The reminder from Companies House arrived while an estate dispute, a woodlands claim,
// Octopus, NatWest and Walker Love were all already on the table. Everything about that
// email is designed to alarm, and none of it says what to actually do first.
//
// So this page does one job: it puts the filing in order, with the facts we already hold
// beside the step that needs them. It says what the statement is and what it is not, so the
// size of the thing is honest — it is a check of the register, not the accounts, and it
// costs nothing. Nothing here pretends the other letters are not real; it just does not put
// them on this page.
export default function AdminCompaniesHouseFiling() {
  const navigate = useNavigate();
  const [facts, reload] = useVaultFacts();
  const [done, setDone] = useState(readDone);
  const days = daysLeft();

  const toggle = (n) => {
    const next = done.includes(n) ? done.filter((item) => item !== n) : [...done, n];
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // A private window still shows the list; it simply will not remember it.
    }
  };

  const when = days > 1 ? `${days} days left` : days === 1 ? 'Due tomorrow' : days === 0 ? 'Due today' : `Overdue by ${Math.abs(days)} days`;

  return (
    <div className="min-h-screen bg-[#f4efe4] pb-16 text-[#1a1612]">
      <div className="border-b border-[#1a1612]/15">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6258]">Companies House</span>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <header className="border-b-2 border-[#1a1612] py-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#b3261e]">
            UNIVERSAL FREQUENCY51 CIC · SC870603
          </p>
          <h1 className="mt-2 text-[30px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[38px]">
            The confirmation statement, due 2 December.
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#b3261e] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#f4efe4]">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              {when}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6b6258]">
              Period ending 18 November 2026
            </span>
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-[#3d362e]">
            About fifteen minutes at a keyboard. Nothing else in front of you has to be solved tonight.
          </p>
        </header>

        <section className="border-b border-[#1a1612]/15 py-6">
          <h2 className="text-[20px] font-bold leading-snug">What this actually is</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-[#3d362e]">
            A yearly check that the details Companies House holds about the company are still right: the registered
            office, the directors, the people with significant control, and the SIC codes.
          </p>
          <p className="mt-2 text-[15.5px] leading-relaxed text-[#3d362e]">
            It is not the annual accounts and it is not a tax return. Those are separate filings with their own dates,
            and the company’s page on Companies House shows them. Filing the confirmation statement costs nothing.
          </p>
        </section>

        <section className="border-b border-[#1a1612]/15 py-6">
          <h2 className="text-[20px] font-bold leading-snug">Why it is worth doing tonight</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-[#3d362e]">
            If it is late, Companies House can issue a penalty, add a note to the public record saying the statement is
            overdue, and eventually move to remove the company from the register. As a director you are personally
            responsible for filing it, even if someone else was asked to.
          </p>
          <p className="mt-2 text-[15.5px] leading-relaxed text-[#3d362e]">
            None of that has happened. The date has not passed yet, and this is the whole of what is being asked of you
            this week:{' '}
            <a
              href={DIRECTOR_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="font-bold underline decoration-[#b3261e] underline-offset-4"
            >
              what the law expects of a director
            </a>
            .
          </p>
        </section>

        <section className="border-b border-[#1a1612]/15 py-6">
          <h2 className="text-[20px] font-bold leading-snug">What to have open</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-[#6b6258]">
            Read from the admin vault. Tap to copy anything you need.
          </p>
          <div className="mt-3">
            <FilingFacts facts={facts} />
          </div>
        </section>

        <section className="border-b border-[#1a1612]/15 py-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[20px] font-bold leading-snug">Seven steps</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6b6258]">
              {done.length} of {STEPS.length} done
            </span>
          </div>
          <ol className="mt-2 list-none p-0">
            {STEPS.map((step) => (
              <FilingStep key={step.n} step={step} done={done.includes(step.n)} onToggle={() => toggle(step.n)} />
            ))}
          </ol>
        </section>

        <section className="border-b border-[#1a1612]/15 py-6">
          <h2 className="text-[20px] font-bold leading-snug">If you get stuck</h2>
          <dl className="mt-3 space-y-3">
            {STUCK.map(({ title, body }) => (
              <div key={title}>
                <dt className="text-[15px] font-bold">{title}</dt>
                <dd className="mt-0.5 text-[15px] leading-relaxed text-[#3d362e]">{body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6b6258]">
            Companies House enquiries: 0303 1234 500, Monday to Friday.
          </p>
        </section>

        <section className="py-6">
          <h2 className="text-[20px] font-bold leading-snug">Keep it, once it is done</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-[#6b6258]">
            Both go into the admin vault, so this never has to be worked out from an email again.
          </p>
          <div className="mt-4">
            <FilingSave facts={facts} onSaved={reload} />
          </div>
        </section>

        <section className="border-t-2 border-[#1a1612] pt-6">
          <p className="text-[15px] leading-relaxed text-[#3d362e]">
            The estate, the woodlands, Octopus, NatWest and Walker Love are real, and they are not on this page. This
            page is only the filing. When it is done, the next thing gets its own page and its own hour.
          </p>
          <Link
            to="/AdminCompaniesHouseDetails"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 border-2 border-[#1a1612] px-4 text-sm font-bold uppercase tracking-wide"
          >
            Company details <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}