import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

/* ── THE WAY IN, WORKED OUT ─────────────────────────────────────────────────────
   Not a journey planner bolted on. A machine that knows this specific hill — that
   Balloch is the end of the line, that the last mile and a half climbs, that a late
   train should not be met with a walk up a road with no pavement — and that can look
   up today's trains and flights rather than repeating a timetable printed in 2019.

   Two boxes and one button. Where you are coming from, and when. It does the rest and
   tells you what to check itself, because a machine that never admits doubt about a
   timetable is a machine that will strand somebody at Balloch at ten at night. */

const SERIF = { fontFamily: 'var(--record-display)' };
const READING = { fontFamily: 'var(--font-record-reading)' };

function Field({ label, value, onChange, placeholder, inputMode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-ink/80">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1.5 block w-full border border-record-ink/35 bg-record-paper px-3 py-2.5 text-[16px] text-record-ink placeholder:text-record-ink/40 focus:border-record-ink focus:outline-none"
        style={READING}
      />
    </label>
  );
}

export default function WayInMachine() {
  const [from, setFrom] = useState('');
  const [when, setWhen] = useState('');
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');

  const workItOut = async () => {
    if (!from.trim() || busy) return;
    setBusy(true);
    setError('');
    setAnswer(null);
    try {
      const res = await base44.functions.invoke('stoneymollanWayIn', {
        from: from.trim(),
        when: when.trim(),
      });
      const data = res?.data ?? res;
      if (!data || data.error) throw new Error(data?.error || 'Nothing came back.');
      setAnswer(data);
    } catch (e) {
      setError(e?.message || 'That did not come back. Try it again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[38rem] text-left">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">
        Work it out
      </p>
      <h3 className="mt-1.5 text-[22px] leading-tight text-record-ink" style={SERIF}>
        Tell it where you are coming from.
      </h3>
      <p className="mt-1.5 text-[15px] leading-[1.6] text-record-ink/85" style={READING}>
        A city, an airport, a station, a postcode — and when. It will give you the ways in,
        the honest times, and what to check before you set off.
      </p>

      <div className="mt-4 space-y-3">
        <Field
          label="Coming from"
          value={from}
          onChange={setFrom}
          placeholder="Glasgow airport, landing 14:20"
        />
        <Field
          label="When"
          value={when}
          onChange={setWhen}
          placeholder="Friday, after dark"
        />
      </div>

      <button
        type="button"
        onClick={workItOut}
        disabled={busy || !from.trim()}
        className="mt-4 flex min-h-[48px] w-full items-center justify-center border-2 border-record-ink px-4 font-mono text-[11.5px] uppercase tracking-[0.13em] text-record-ink transition-colors active:bg-record-ink active:text-record-paper disabled:border-record-ink/25 disabled:text-record-ink/40"
      >
        {busy ? 'Working it out…' : 'Work it out'}
      </button>

      {error && (
        <p className="mt-4 border-l-2 border-record-red pl-3 font-mono text-[11px] uppercase leading-[1.8] tracking-[0.08em] text-record-red">
          {error}
        </p>
      )}

      {answer && (
        <div className="mt-5 border-t border-record-ink/25 pt-4">
          {answer.headline && (
            <p className="text-[17px] leading-[1.55] text-record-ink" style={READING}>
              {answer.headline}
            </p>
          )}

          <ul className="mt-4 space-y-4">
            {(answer.options || []).map((option) => (
              <li key={option.mode} className="border-t border-record-ink/15 pt-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[17px] leading-tight text-record-ink" style={SERIF}>
                    {option.mode}
                  </p>
                  {option.total_time && (
                    <p className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-record-red">
                      {option.total_time}
                    </p>
                  )}
                </div>
                {option.summary && (
                  <p className="mt-1 text-[15px] leading-[1.6] text-record-ink/90" style={READING}>
                    {option.summary}
                  </p>
                )}
                {!!option.steps?.length && (
                  <ol className="mt-2 space-y-1">
                    {option.steps.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-2 text-[14.5px] leading-[1.55] text-record-ink/90"
                        style={READING}
                      >
                        <span className="font-mono text-[10.5px] text-record-ink/50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {(option.cost_note || option.scenic || option.check) && (
                  <dl className="mt-2 space-y-1 border-l border-record-ink/20 pl-3">
                    {option.cost_note && (
                      <div className="flex gap-2">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-record-ink/60">Cost</dt>
                        <dd className="text-[14px] leading-snug text-record-ink/85" style={READING}>{option.cost_note}</dd>
                      </div>
                    )}
                    {option.scenic && (
                      <div className="flex gap-2">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-record-ink/60">Scenic</dt>
                        <dd className="text-[14px] leading-snug text-record-ink/85" style={READING}>{option.scenic}</dd>
                      </div>
                    )}
                    {option.check && (
                      <div className="flex gap-2">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-record-ink/60">Check</dt>
                        <dd className="text-[14px] leading-snug text-record-ink/85" style={READING}>{option.check}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </li>
            ))}
          </ul>

          {answer.cautions && (
            <p className="mt-4 border-l-2 border-record-red pl-3 text-[15px] leading-[1.6] text-record-ink" style={READING}>
              {answer.cautions}
            </p>
          )}

          <p className="mt-4 font-mono text-[10px] uppercase leading-[1.9] tracking-[0.1em] text-record-ink/75">
            A machine worked this out and read the web to do it. Times and fares move — check
            them yourself before you travel.
            {!!answer.sources?.length && (
              <span className="mt-1 block normal-case tracking-[0.04em]">
                {answer.sources.slice(0, 4).join(' · ')}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}