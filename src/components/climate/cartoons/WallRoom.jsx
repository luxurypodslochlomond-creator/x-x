import React from 'react';
import { Link } from 'react-router-dom';
import CartoonRoomJump from '@/components/climate/cartoons/CartoonRoomJump';
import PressWall from '@/components/climate/cartoons/press/PressWall';
import CartoonGoals from '@/components/climate/cartoons/CartoonGoals';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonRoomNew from '@/components/climate/cartoons/CartoonRoomNew';
import WallMoney from '@/components/climate/cartoons/WallMoney';
import WallAbout from '@/components/climate/cartoons/WallAbout';
import useWallSections from '@/components/climate/cartoons/useWallSections';

export default function WallRoom() {
  const { active, navigate } = useWallSections();
  return <div className="press-room-inner wall-room">
    <CartoonRoomJump active={active} onNavigate={navigate} />
    <p className="wall-event-line">8th CartoonAFRICA Biennial · Benin City · 28–30 November 2026 · <Link to="/ClimateWorkshop">The climate hour: Sunday 29 November, 3pm West Africa / 2pm UK</Link> · <a href="#press-book">Programme & book</a></p>
    <div className="wall-view" hidden={active !== 'drawings'}><PressWall visible={active === 'drawings'} /></div>
    <div className="wall-view" hidden={active !== 'goals'}><CartoonGoals /></div>
    <div className="wall-view" hidden={active !== 'send'}><CartoonRoomNew /><CartoonRoomActions /><WallMoney /></div>
    <div className="wall-view" hidden={active !== 'about'}><WallAbout /></div>
  </div>;
}