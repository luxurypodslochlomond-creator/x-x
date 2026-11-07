import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

// The record is global — the whole world belongs on the map, both poles included.
// Bounds kept inside the Mercator edge so Antarctica and the Arctic stay visible.
export const WORLD_BOUNDS = [[-85, -180], [85, 180]];

// ── THE FRAME IS WHAT THE WORLD HAS TO FILL ──────────────────────────────────
// This used to fit the world's *bounds* into the frame. On a phone that is right: the whole
// world sits in the glass. On a desktop it was the bug — a 1200-pixel-wide frame fitted to a
// world that only needs 640 of them, so Leaflet, held still by maxBounds, laid the world down
// one side and left a dead grey panel beside it. The map looked broken because it was.
//
// So the frame decides the floor instead: the world is never allowed to be smaller than the
// frame in either direction. Wide screen, the world fills the width and you pan north and
// south through it; tall screen, it fills the height and you pan east and west. Nobody ever
// sees the grey, and there is no grey to see.
export default function FitWorld() {
  const map = useMap();
  const firstFit = useRef(true);

  useEffect(() => {
    const fit = () => {
      map.invalidateSize();
      const { x, y } = map.getSize();
      // Zoom at which a 256-pixel world has grown to cover the frame's longer side.
      const cover = Math.max(0, Math.log(Math.max(x, y) / 256) / Math.LN2);
      map.setMinZoom(cover);

      if (firstFit.current) {
        map.setView([12, 0], cover, { animate: false });
        firstFit.current = false;
      } else if (map.getZoom() < cover) {
        // A window narrowed into portrait: lift the zoom just enough to keep the frame full,
        // and leave wherever the reader had travelled to alone.
        map.setZoom(cover, { animate: false });
      }
    };

    fit();
    map.on('resize', fit);
    return () => { map.off('resize', fit); };
  }, [map]);

  return null;
}