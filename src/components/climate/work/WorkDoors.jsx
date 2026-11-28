import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DOOR_GROUPS, WORKING_PAPERS } from '@/components/climate/work/workDoors';

// One band per person who might need the thing, then the papers for whoever asks how we
// know. Every row is a door: the page never describes something the reader cannot open.
export default function WorkDoors() {
  return (
    <>
      {DOOR_GROUPS.map((group) => (
        <section className="work-band" key={group.n}>
          <p className="work-band-head"><span>{group.n}</span>{group.head}</p>
          {group.note && <p className="work-band-note">{group.note}</p>}
          <ul className="work-doors">
            {group.doors.map((door) => (
              <li key={door.name}>
                <Link to={door.to}>
                  <b>{door.name}</b>
                  <em>{door.line}</em>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="work-band">
        <p className="work-band-head"><span>07</span>The pages for whoever asks how we know</p>
        <p className="work-band-note">The argument rather than the tools. Each one can be read without trusting us.</p>
        <ul className="work-doors work-doors--papers">
          {WORKING_PAPERS.map((paper) => (
            <li key={paper.name}>
              <Link to={paper.to}>
                <b>{paper.name}</b>
                <em>{paper.line}</em>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}