import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateArenadata } from '../../features/login/authSlice';

import TopBanner from "../../components/arena/TopBanner";
import HotMatch from "../../components/arena/HotMatch";
import Rank from "../../components/arena/Rank";
import Statsistics from "../../components/arena/Statsistics";
import axios from 'axios';
// import RoomList from "../../components/arena/Match/RoomList";
// import ChatRoom from "../../components/arena/Match/Observe";

export default function Arena() {
  const dispatch = useDispatch()
  const userNickname = useSelector(state => state.auth.userNickname)
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`https://codearena.shop/api/user?to=${userNickname}&from=${userNickname}`)
    .then(res => dispatch(updateArenadata(res.data.data)))
    .catch(err => console.log(err))
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
  