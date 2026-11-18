import React from 'react';
import { ChevronDown } from 'lucide-react';
import CartoonMaker from '@/components/climate/cartoons/CartoonMaker';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import { HandPencil, PaperPhoto } from '@/components/climate/cartoons/CartoonInkIcons';

export default function CartoonRoomActions() {
  return (
    <section className="comic-workshop" aria-labelledby="cartoon-your-turn">
      <h2 id="cartoon-your-turn" className="comic-section-title">Now it’s your turn.</h2>
      <p className="record-meta comic-workshop-note">Your joke. Your drawing. Your way of seeing it.</p>
      <details className="comic-drawer" id="cartoon-drawing-desk">
        <summary><HandPencil size={25} /><span>Draw a strip</span><ChevronDown size={20} className="comic-chevron" /></summary>
        <div className="comic-drawer-content"><CartoonMaker /></div>
      </details>
      <details className="comic-drawer comic-drawer-paper">
        <summary><PaperPhoto size={25} /><span>Bring a paper drawing</span><ChevronDown size={20} className="comic-chevron" /></summary>
        <div className="comic-drawer-content"><CartoonSendIn /></div>
      </details>
    </section>
  );
}