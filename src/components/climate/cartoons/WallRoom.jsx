import React from 'react';
import CartoonRoomJump from '@/components/climate/cartoons/CartoonRoomJump';
import PressWall from '@/components/climate/cartoons/press/PressWall';
import CartoonGoals from '@/components/climate/cartoons/CartoonGoals';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import WallMoney from '@/components/climate/cartoons/WallMoney';
import WallAbout from '@/components/climate/cartoons/WallAbout';
import WallEventNotice from '@/components/climate/cartoons/WallEventNotice';
import useWallSections from '@/components/climate/cartoons/useWallSections';

export default function WallRoom() {
  const { active, navigate } = useWallSections();
  return <div className="press-room-inner wall-room wall-continuous">
    <CartoonRoomJump active={active} onNavigate={navigate} />
    <WallEventNotice />
    <div className="wall-view" hidden={active !== 'drawings'}><PressWall visible={active === 'drawings'} /><WallMoney /></div>
    <div className="wall-view" hidden={active !== 'send'}><CartoonRoomActions /></div>
    <div className="wall-view" hidden={active !== 'goals'}><CartoonGoals visible={active === 'goals'} /></div>
    <div className="wall-view" hidden={active !== 'about'}><WallAbout /></div>
  </div>;
}