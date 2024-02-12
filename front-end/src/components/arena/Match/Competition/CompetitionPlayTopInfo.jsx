import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import axios from 'axios';
import CompAbstentionModal from '../../modal/Competition/CompabstentionModal';
// import CompGoResultModal from "../../modal/Competition/CompGoResultModal";
import VS from '../../../../images/arena/HotMatch/VS.png'

export default function UserInfo() {
  const Location = useLocation();
  const [timer, setTimer] = useState(60 * 60);
  const [timerDisplay, setTimerDisplay] = useState("1:00:00");

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

  // 제한시간 1시간 타이머 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 매 초마다 타이머 업데이트
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          // 타이머 만료 시 처리 (필요한 경우)
        }
        return prevTimer - 1;
      });
    }, 1000);

    // 컴포넌트가 언마운트되면 간격 정리
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // 타이머 값을 HH:MM:SS 형식으로 포맷
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    setTimerDisplay(formattedTime);
  }, [timer]);

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
        <h1>"상대 화면" 웹RTC 공간</h1>
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

        {/* 제한시간 1시간 타이머 띄우기 */}
        <div className="mt-5 text-2xl text-center font-bold">{timerDisplay}</div>
      </div>
    </div>
  );
}