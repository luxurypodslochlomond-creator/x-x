import React from 'react';

// One drawing on the print room's contact sheet. The number it carries is the plate number
// it will have in the show, in the order the person chose it — so the sheet in their hand
// and the sheet on the wall agree without anybody writing anything down.
export default function PrintPlate({ cartoon, plate, onToggle }) {
  return (
    <li className={`print-plate${plate ? ' is-chosen' : ''}`}>
      <button type="button" className="print-plate-btn" onClick={onToggle} aria-pressed={!!plate}>
        <span className="print-plate-num">{plate ? String(plate).padStart(2, '0') : '+'}</span>
        <span className="print-plate-pic">
          <img
            src={cartoon.display_image_url}
            alt={cartoon.title ? `${cartoon.title}, by ${cartoon.artist_name}` : `A drawing by ${cartoon.artist_name}`}
            loading="lazy"
          />
        </span>
        <span className="print-plate-name">{cartoon.artist_name}</span>
        {cartoon.title && <span className="print-plate-title">{cartoon.title}</span>}
        <span className="print-plate-cue">{plate ? 'In the show' : 'Add'}</span>
      </button>
    </li>
  );
}