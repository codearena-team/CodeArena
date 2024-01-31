import React, { useEffect } from 'react';

import TopBanner from "../../components/arena/TopBanner";
import HotMatch from "../../components/arena/HotMatch";
import Rank from "../../components/arena/Rank";
import Statsistics from "../../components/arena/Statsistics";
// import RoomList from "../../components/arena/Match/RoomList";
// import ChatRoom from "../../components/arena/Match/Observe";

export default function Arena() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <TopBanner />
      <HotMatch />
      <Rank />
      <Statsistics />
      {/* <RoomList /> */}
    </div>
  );
}
  