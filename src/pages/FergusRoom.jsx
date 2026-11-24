import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import useFergusRoom from '@/components/fergus/useFergusRoom';
import FergusGate from '@/components/fergus/FergusGate';
import FergusRoomRail from '@/components/fergus/FergusRoomRail';
import FergusWorkspace from '@/components/fergus/FergusWorkspace';
import { FERGUS_SECTIONS } from '@/components/fergus/fergusSections';
import '@/components/fergus/fergus-room.css';
export default function FergusRoom() {
  const room = useFergusRoom();
  const [params, setParams] = useSearchParams();
  const requested = params.get('view') || 'home';
  const selected = FERGUS_SECTIONS.some(item => item.id === requested) ? requested : 'home';
  const select = id => setParams(id === 'home' ? {} : { view: id });
  useEffect(() => {
    const meta = document.createElement('meta'); meta.name = 'robots'; meta.content = 'noindex, nofollow'; document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [selected]);
  return <div className="fergus-room">
    {!room.open ? <FergusGate {...room} /> : <>
      <header className="fergus-top"><div className="fergus-top-name"><span className="fergus-monogram" aria-hidden="true">FH<span /></span><span><strong>Fergus’s room</strong><small>Everything, together.</small></span></div><button type="button" onClick={room.lock}><LockKeyhole size={18} /><span>Lock</span></button></header>
      <div className="fergus-room-layout"><FergusRoomRail selected={selected} onSelect={select} /><main className="fergus-workspace" id="fergus-workspace" aria-label={FERGUS_SECTIONS.find(item => item.id === selected)?.label}><FergusWorkspace selected={selected} onSelect={select} room={room} /></main></div>
    </>}
  </div>;
}