import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import CompAbstentionModal from '../../modal/Competition/CompabstentionModal';
import VS from '../../../../images/arena/HotMatch/VS.png'
import Webrtc from '../../../../pages/test/Webrtc'


export default function UserInfo() {
  const params = useParams()
  const navigate = useNavigate();
  const sender = useRef(useSelector(state => state.auth.userNickname));
  const [timer, setTimer] = useState(3600);
  const [timerDisplay, setTimerDisplay] = useState("1:00:00");
  const [timerExpired, setTimerExpired] = useState(false);
  
  const {
    gameId,
    gameMode,
    userNickname,
    enemyNickname,
    userImgSrc,
    enemyImgSrc,
    problemId,
    startTime,
  } = useSelector(state => state.game);
  const stompClient = useSelector(state => state.stompClient.stompClient);
  
  // console.log("현재 선택된 게임 모드 확인 :", gameMode)

  const [panelWidths, setPanelWidths] = useState({
    left: 50,
    middle: 35,
    right: 10,
  });

  useEffect(() => {
    const currentTime = new Date().getTime();
    const startTimeMillis = new Date(startTime).getTime()
    const elapsed = Math.floor((currentTime - startTimeMillis) / 1000);
    console.log("남은시간 확인 :", 3600 - elapsed)
    setTimer(3600 - elapsed)
  }, [])

  // 제한시간 1시간 타이머 useEffect
  useEffect(() => {
    console.log("startTime 확인:", startTime)

    const intervalId = setInterval(() => {
      // 매 초마다 타이머 업데이트
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalId); // 0초가 되면 타이머 중지
          // 타이머 만료 시 처리하는 useState
          setTimerExpired(true);
          stompClient.send(`/pub/chat/leave`, {}, JSON.stringify({
            gameId: gameId,
            userId: '',
            mode: gameMode == 'speed' ? '0' : '1',
            message: '시간 초과',
            sender: sender.current,
            type: 'TERMINATED',
          }));

          return 0;
        }
        return prevTimer -1;
      });
    }, 1000);

    // 컴포넌트가 언마운트되면 간격 정리
    return () => clearInterval(intervalId);
  }, [stompClient, gameMode]);

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

  const checkSubmithandler = () => {
    console.log("중간 채점 현황 페이지로 이동")
    navigate(
      `/game-list/competition/compMiddleConfirm/${gameId}?pgno=1&spp=15`
    )
  }

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
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col mr-20">
            <div style={{ width: "125px", height: "125px"}} >
              <img
                src={userImgSrc}
                alt="본인 이미지"
                className="rounded-full shadow-lg"
                style={{width: "100%", height: "100%"}}
              />
            </div>
            <span className="text-center mt-3 text-2xl">{userNickname}</span>
          </div>
          <img
            src={VS} alt="vs" 
            style={{width: "10%", padding: "1%"}}
          />
          <div className="flex flex-col ml-20">
            <div style={{ width: "125px", height: "125px"}} >
              <img
                src={enemyImgSrc}
                alt="상대 이미지"
                className="rounded-full shadow-lg"
                style={{width: "100%", height: "100%"}}
              />
            </div>
            <span className="text-center mt-3 text-2xl">{enemyNickname}</span>
          </div>
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

        {/* 중간채점 페이지 이동 */}
        {gameMode !== 'speed' && (
          <button
            className="rounded-lg mt-3 shadow-lg px-4 focus:outline-none text-2xl font-bold hover:scale-105"
            style={{ width: '100%', height:'30%', backgroundColor: '#F5EBDB' }}
            onClick={checkSubmithandler}
          >
            채점 현황
          </button>
        )}

        {/* 남은 시간 보여주는 div */}
        <div
          className="mt-5 px-4 focus:outline-none text-2xl font-bold hover:scale-105"
        >
          <div className="text-2xl mr-2 mb-1 text-center font-bold">{timerDisplay}</div>
        </div>


      </div>
    </div>
  );
}