import React from 'react';
import { Link } from 'react-router-dom';

// The bar that stays under the thumb while the wall of plates scrolls: how many are chosen,
// what the show is called, and the one way out of the room — onto paper.
export default function PrintBar({ chosen, showName, onShowName, exhibition, onAll, onNone }) {
  return (
    <div className="print-bar">
      <p className="print-bar-count">{chosen ? `${chosen} chosen` : 'Nothing chosen'}</p>

      <label className="print-bar-name">
        <span>The show’s name, if it has one</span>
        <input
          value={showName}
          onChange={(event) => onShowName(event.target.value)}
          placeholder="Room 3, Thursday"
          maxLength={90}
        />
      </label>

      <div className="print-bar-actions">
        <button type="button" className="print-bar-mini" onClick={onAll}>All</button>
        <button type="button" className="print-bar-mini" onClick={onNone}>None</button>
        {exhibition ? (
          <Link className="print-bar-go" to={exhibition}>Make the exhibition ↗</Link>
        ) : (
          <span className="print-bar-go" aria-disabled="true">Make the exhibition</span>
        )}
      </div>
    </div>
  );
}