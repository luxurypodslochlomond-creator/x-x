import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DOOR_GROUPS, WORKING_PAPERS } from '@/components/climate/work/workDoors';

// One band per person who might need the thing, then the papers for whoever asks how we
// know. Every row is a door: the page never describes something the reader cannot open.
export default function WorkDoors() {
  return (
    <section className="work-band">
      <p className="work-band-head"><span>04</span>Every door, and who opens it</p>
      <p className="work-band-note">
        Grouped by the person on the other side rather than by the technology, because that is
        what decides whether a thing is any use. Every row opens a page that exists.
      </p>

      {DOOR_GROUPS.map((group) => (
        <div className="work-door-group" key={group.head}>
          <p className="work-door-head">{group.head}</p>
          {group.note && <p className="work-door-note">{group.note}</p>}
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
        </div>
      ))}

      <div className="work-door-group">
        <p className="work-door-head">If it is somebody asking how we know</p>
        <p className="work-door-note">The argument rather than the tools. Each one can be read without trusting us.</p>
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
      </div>
    </section>
  );
}