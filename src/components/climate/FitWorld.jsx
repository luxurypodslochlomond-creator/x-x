import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// The record is global — the whole world belongs on the map, both poles included.
// Bounds kept inside the Mercator edge so Antarctica and the Arctic stay visible.
export const WORLD_BOUNDS = [[-85, -180], [85, 180]];

// Fits the whole world into the frame on load, and again whenever the frame changes.
// Paired with noWrap on the tiles and maxBounds on the map, the world never repeats.
export default function FitWorld() {
  const map = useMap();

  useEffect(() => {
    const fit = () => {
      map.invalidateSize();
      map.fitBounds(WORLD_BOUNDS, { animate: false });
    };
    fit();
    map.on('resize', fit);
    return () => { map.off('resize', fit); };
  }, [map]);

  return null;
}