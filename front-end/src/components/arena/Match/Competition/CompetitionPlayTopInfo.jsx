import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import axios from 'axios';
import CompAbstentionModal from '../../modal/Competition/CompabstentionModal';
// import CompGoResultModal from "../../modal/Competition/CompGoResultModal";
import VS from '../../../../images/arena/HotMatch/VS.png'
import Webrtc from '../../../../pages/test/Webrtc'

export default function UserInfo() {
  const params = useParams()
  const Location = useLocation();

  const [panelWidths, setPanelWidths] = useState({
    left: 50,
    middle: 35,
    right: 10,
  });

  // const [userData, setUserData] = useState([]);
  const [userNickname, setUserNickName] = useState("");
  const [userId, setUserId] = useState("");
  const [enemyId, setEnemyId] = useState("");
  const [enemyNickname, setEnemyNickname] = useState("");
  // const [userThumnail, setUserThumnail] = useState([]);

  useEffect(() => {
    console.log("props 받은 로케이션 :", Location.state);
    const { userId, userNickname, enemyId, enemyNickname } = Location.state;
    setUserNickName(userNickname.current);
    setUserId(userId.current);
    setEnemyId(enemyId.current);
    setEnemyNickname(enemyNickname.current);
  }, [])



  return (
    <div className="flex">
      {/* 왼쪽 상단 (유저 정보) */}
      <div
        className="match-header rounded-xl shadow-lg ml-2 mt-2 mr-5 flex justify-center items-center"
        style={{
          width: `${panelWidths.left}%`,
          height: 'auto',
          backgroundColor: '#F5EBDB'
        }}
      >
        {/* [사진]유저1 vs 유저2 [사진] 필요 */}
        {/* 사진 및 유저 정보 추가 필요 */}
        <div className="flex justify-center items-center">
          <span className="mr-20 text-2xl">{userNickname}</span>
          <img
            src={VS} alt="vs" 
            style={{width: "10%", padding: "1%"}}
          />
          <span className="ml-20 text-2xl">{enemyNickname}</span>
        </div>
      </div>

      <div
        className="flex justify-center mt-2 items-center rounded-xl"
        style={{
          width: `${panelWidths.middle}%`,
          height: '30vh',
          border: "solid 1px black",
        }}
      >
        {/* 상대 화면 보여줄 웹RTC 연결 공간 */}
        <Webrtc 
          userNickname={userNickname}
          customSessionId={params.id}
          height= '30vh'
          width='100%'
          isPlayer={true}
        />
      </div>

      {/* 우측 상단 버튼 영역 */}
      
      <div
        className="justify-center items-center ml-6"
        style={{ width: `${panelWidths.right}%`, height: 'auto' }}
      >
        {/* 나가기 버튼 */}
        <button
          className="rounded-lg mt-3 shadow-lg px-4 focus:outline-none text-2xl font-bold hover:scale-105"
          style={{ width: '100%', height:'30%', backgroundColor: '#F5EBDB' }}
          onClick={() => document.getElementById('comp_abstention').showModal()}
        >
          나가기
        </button>
        {<CompAbstentionModal />}

      </div>
    </div>
  );
}