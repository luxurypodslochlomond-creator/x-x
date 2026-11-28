import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import CartoonMaker from '@/components/climate/cartoons/CartoonMaker';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import CartoonRoomNew from '@/components/climate/cartoons/CartoonRoomNew';

export default function CartoonRoomActions() {
  return <section className="comic-workshop" aria-labelledby="cartoon-your-turn">
    <h2 id="cartoon-your-turn" className="comic-section-title">Put your drawing on the record.</h2>
    <p className="record-meta comic-workshop-note">Bring the file, photograph a drawing, or draw here. Your work. Your name. Your rights.</p>
    <CartoonRoomNew />
    <details className="comic-drawer comic-drawer-paper" open>
      <summary><span>Send a drawing you have made</span><ChevronDown size={20} className="comic-chevron" aria-hidden="true" /></summary>
      <div className="comic-drawer-content"><CartoonSendIn /></div>
    </details>
    <details className="comic-drawer" id="cartoon-drawing-desk">
      <summary><span>Draw here instead</span><ChevronDown size={20} className="comic-chevron" aria-hidden="true" /></summary>
      <div className="comic-drawer-content"><CartoonMaker /></div>
    </details>
    <p className="record-meta comic-workshop-note"><a href="#wall-about">People, purpose and sources</a> · <Link to="/ClimateWorkshopAnswers">The workshop questions, answered</Link></p>
  </section>;
}