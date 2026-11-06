import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Reading controls only, held in this tab's memory. No visitor tracking or saved drafts.
const views = new Map();
export default function useRecordViewState(name, initial) {
  const { key } = useLocation();
  const id = `${key}:${name}`;
  const [value, setValue] = useState(() => views.has(id) ? views.get(id) : initial);
  useEffect(() => { views.set(id, value); }, [id, value]);
  return [value, setValue];
}