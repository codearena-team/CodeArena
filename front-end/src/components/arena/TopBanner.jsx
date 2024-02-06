import React, { useState, useEffect, useRef, } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BannerCreateModal from './modal/Main/BannerCreateModal';
import MatchingCompleteModal  from './modal/Main/MatchingCompleteModal';

import FindMatch from '../../images/arena/TopBanner/FindMatch.gif';
import FindMatchAsset from '../../images/arena/TopBanner/FindMatch.png';
import GameCreate from '../../images/arena/TopBanner/GameCreate.gif';
import GameCreateAsset from '../../images/arena/TopBanner/GameCreate.png';
import GameSearch from '../../images/arena/TopBanner/GameSearch.gif';
import GameSearchAsset from '../../images/arena/TopBanner/GameSearch.png';
import SpeedMode from '../../images/arena/TopBanner/SpeedMode.gif';
import SpeedModeAsset from '../../images/arena/TopBanner/SpeedMode.png';
import EffiMode from '../../images/arena/TopBanner/EfficiencyMode.gif';
import EffiModeAsset from '../../images/arena/TopBanner/EfficiencyMode.png';

export default function TopBanner() {
  const navigate = useNavigate();
  // 호버 기능
  const [isFindMatchHovered, setIsFindMatchHovered] = useState(false);
  const [isGameCreateHovered, setIsGameCreateHovered] = useState(false);
  const [isGameSearchHovered, setIsGameSearchHovered] = useState(false);
  const [isSpeedModeHovered, setIsSpeedModeHovered] = useState(false);
  const [isEffiModeHovered, setIsEffiModeHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatchingComplete, setIsMatchingComplete] = useState(false);
  
  // 언어 선택 useState
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  
  // const [type, setType] = useState('');
  // 모드 선택 useState
  // const [selectedMode, setSelectedMode] = useState(null);
  const socket = useRef(null);
  const type = useRef();
  const matchId = useRef('');
  const userId = useRef('');
  const rating = useRef('');
  const gameMode = useRef('');
  const lang = useRef('');
  const content = useRef('');
  const problemId = useRef('');
  const queueKey = useRef('');
  const userNickname = useRef('');
  const gameId = useRef('');
  const viduSession = useRef('');
  // const [matchData, setmatchData] = useState({
  //   matchId: '',
  //   userId: '',
  //   rating: '',
  //   gameMode: '',
  //   lang: '',
  //   content: '',
  //   problemId: '',
  //   queueKey: '',
  //   userNickname: '',
  // });

  useEffect(() => {
    socket.current = new WebSocket('ws://192.168.0.20:8080/matching');

    socket.current.addEventListener("open", function (event) {
      console.log(event)
    })

    socket.current.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
  
      const object = JSON.parse(event.data)
      
      type.current = object.type;
      
      if (object.type && object.type !== 'RESPONSE') {
        matchId.current = object.matchId;
        userId.current = object.userId;
        rating.current = object.rating;
        gameMode.current = object.gameMode;
        lang.current = object.lang;
        content.current = object.content;
        problemId.current = object.problemId;
        queueKey.current = object.queueKey;
        userNickname.current = object.userNickname;
        gameId.current = object.gameId;
        viduSession.current = object.viduSession;
        // console.log("new obj 데이타!! :", new_obj)
        // console.log("현재 타입 :", object.type)
      }
  
      if (object.type && object.type === 'INGAME') {
        // problemId를 props로 내려주기 -> navigate 활용
        navigate(
          {pathname: `/game-list/competition/play/${object.matchId}`},
          {state: problemId},
        )
      }
      
      if (object.type && object.type === 'CONTINUE') {
        console.log('')
      }
  
      if (socket.current.readyState === WebSocket.OPEN && type.current) {
        startMatchingTimer();
      }
  
    });

    return () => {
      socket.current.close();
    };
  }, []);


  
  ////////////////// 위에서 websocket 통신 연결 //////////////////////////

  // 1. 언어 3가지 중 하나 선택하기
  const handleLanguageSelection = (lang) => {
    setSelectedLanguage(lang);
  };


  // 2. 언어 선택 모달 활성화
  const openLanguageModal = () => {
    console.log('언어 선택 모달 호출함!!');
    const languageModal = document.getElementById('language_modal');
    const matchingModal = document.getElementById('matching_modal');

    // 언어 모달이 열려 있다면 닫기
    if (languageModal.open) {
      languageModal.close();
    }

    // 매칭 진행할 모달이 열려 있지 않을 때만 언어 선택 모달 열기
    if (!matchingModal.open) {
      languageModal.style.left = '50%';
      languageModal.style.top = '50%';
      languageModal.style.transform = 'translate(-50%, -50%)';
      languageModal.style.zIndex = '1';
      languageModal.showModal();
    }
  };

  // 3. 매칭 진행 모달
  const openMatchingModal = () => {
    console.log('매칭 진행 모달 호출함!!');
    const languageModal = document.getElementById('language_modal');
    const matchingModal = document.getElementById('matching_modal');

    // 매칭 진행할 모달을 열기 전에 이미 열려 있다면 닫기
    if (matchingModal.open) {
      matchingModal.close();
    }

    // 매칭 진행할 모달 활성화
    languageModal.close(); // 언어 선택 모달 닫기
    matchingModal.style.left = '50%';
    matchingModal.style.top = '50%';
    matchingModal.style.transform = 'translate(-50%, -50%)';
    matchingModal.style.zIndex = '2';
    matchingModal.showModal();

    // 매칭 모달이 열리면 타이머 시작
    startMatchingTimer();

    // 매칭 모달이 닫힐 때 타이머 중지
    matchingModal.addEventListener('close', () => {
      closeMatchingModalHandler(); // 타이머 중지
      // languageModal.close();
    });
  };

  // 타이머 중지
  let timerInterval
  const closeMatchingModalHandler = () => {
    clearInterval(timerInterval);
    console.log('타이머 중지!!');
    
    // 모든 모달 닫기
    // document.getElementById('matching_modal').close();
    // document.getElementById('language_modal').close();

    // 선택된 언어 초기화
    setSelectedLanguage(null);
  };
  
  const startQueryTimer = () => {
    let seconds = 60;
    const timerElements = document.getElementById('matching_timer');
  
    const updateTimer = () => {
      const minutes = Math.floor(seconds / 60); // 분단위 계산
      const remainingSeconds = seconds % 60; // 초단위 계산
  
      // 타이머 초마다 상승하고 문자열로 표기
      timerElements.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      
      if (type && type === 'CONTINUE') {
        clearInterval(timerInterval); // 초기화
      }

      if (seconds === 0) {
        // console.log("startQueryTimer의 matchData: ", )
        socket.current.send(
          JSON.stringify({
            matchId: matchId.current,
            userId: userId.current,
            rating: rating.current,
            gameMode: gameMode.current,
            lang: lang.current,
            content: content.current,
            problemId: problemId.current,
            queueKey: queueKey.current,
            userNickname: userNickname.current,
            gameId: gameId.current,
            viduSession: viduSession.current,
            type: 'NO',
          })
        )
        closeMatchingModalHandler();
      }

      seconds -= 1;
    };
    
    // 1초마다 타이머 업데이트
    timerInterval = setInterval(updateTimer, 1000);
  }

  // 4. 매칭이 돌아가면 타이머 소환
  const startMatchingTimer = () => {
    let seconds = 0;
    const timerElement = document.getElementById('matching_timer');
  
    const updateTimer = () => {
      const minutes = Math.floor(seconds / 60); // 분단위 계산
      const remainingSeconds = seconds % 60; // 초단위 계산
  
      // 타이머 초마다 상승하고 문자열로 표기
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      seconds += 1;
    };
  
    // 1초마다 타이머 업데이트
    timerInterval = setInterval(updateTimer, 1000);
  
    // 원하는 시간까지 진행 후 타이머 중지
    // const desiredTimeInSeconds = 10;
    
    console.log('Start Matching Timer type : ', type.current)
    if (type.current && type.current === "QUERY") {
      clearInterval(timerInterval);
      handleMatchingComplete(); // 수락&취소 모달 함수 호출
    }


  };

  // 5. "매칭 완료!" 문구와 동시에 "수락", "취소" 모달 띄우기
  const handleMatchingComplete = () => {
    setIsMatchingComplete(true);

    // 1.5초 뒤에 MatchingCompleteModal 띄우기
    setTimeout(() => {
      openMatchingCompleteModal();
    }, 1500);
  };

  // 5-1. 매칭 완료 후 띄워질 "수락", "취소" 마지막 모달
  const openMatchingCompleteModal = () => {
    // MatchingCompleteModal 열기
    const matchingCompleteModal = document.getElementById('matching_complete_modal');
    matchingCompleteModal.style.left = '50%';
    matchingCompleteModal.style.top = '50%';
    matchingCompleteModal.style.transform = 'translate(-50%, -50%)';
    matchingCompleteModal.style.zIndex = '3'; // 더 높은 z-index로 설정
    matchingCompleteModal.showModal();

    startQueryTimer();

    // MatchingCompleteModal이 닫힐 때 languageModal 닫도록 이벤트 리스너 추가
    matchingCompleteModal.addEventListener('close', () => {
      const languageModal = document.getElementById('language_modal');
      if (languageModal && languageModal.open) {
        languageModal.close();
      }
    });
  };

  // 마지막 모달에서 "취소" 모든 모달 닫기 (중복 호출 방지)
  const handleCancel = () => {
    const send_obj = {
      matchId: matchId.current,
      userId: userId.current,
      rating: rating.current,
      gameMode: gameMode.current,
      lang: lang.current,
      content: content.current,
      problemId: problemId.current,
      queueKey: queueKey.current,
      userNickname: userNickname.current,
      gameId: gameId.current,
      viduSession: viduSession.current,
      type: 'NO',
    };
    // console.log(send_obj)
    socket.current.send (
      JSON.stringify (send_obj)
    );
    
    clearInterval(timerInterval)

    const matchingCompleteModal = document.getElementById('matching_complete_modal');
    const languageModal = document.getElementById('language_modal');
    const matchingModal = document.getElementById('matching_modal');
    
    if (matchingCompleteModal && matchingCompleteModal.open) {
      matchingCompleteModal.close();
    }

    if (languageModal && languageModal.open) {
      languageModal.close();
    }
  
    if (matchingModal && matchingModal.open) {
      matchingModal.close();
    }
  };

  // 마지막 "수락" 버튼을 눌렀을 때 호출될 함수
  const handleAccept = () => {
    const send_obj = {
      matchId: matchId.current,
      userId: userId.current,
      rating: rating.current,
      gameMode: gameMode.current,
      lang: lang.current,
      content: content.current,
      problemId: problemId.current,
      queueKey: queueKey.current,
      userNickname: userNickname.current,
      gameId: gameId.current,
      viduSession: viduSession.current,
      type: 'YES',
    };

    socket.current.send (
      JSON.stringify (send_obj)
    );

    const matchingCompleteModal = document.getElementById('matching_complete_modal');
    const languageModal = document.getElementById('language_modal');
    const matchingModal = document.getElementById('matching_modal');
    
    if (matchingCompleteModal && matchingCompleteModal.open) {
      matchingCompleteModal.close();
    }

    if (languageModal && languageModal.open) {
      languageModal.close();
    }
  
    if (matchingModal && matchingModal.open) {
      matchingModal.close();
    }
  };

  // 게임 생성 모달 닫기
  const closeModal = () => {
      setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div
        className="absolute top-5 left-0 right-0 h-1 z-0"
        style={{ backgroundColor: '#E3E6D9'}}>
      </div>  
      {/* 상단 배너 */}
      <div
       className="mt-3 flex justify-center w-3/4 shadow-lg rounded-xl z-10"
       style={{ backgroundColor: '#E3E6D9', height: 'auto' }}
       
      >
        {/* 경쟁 매칭 버튼*/}
        <button
          className="px-4 py-2 mx-2 rounded-xl hover:scale-110"
          style={{ width: '80%', height: 'auto' }}
          onClick={openLanguageModal} // 클릭하면 모달 띄우기
          onMouseEnter={() => setIsFindMatchHovered(true)} // 마우스 호버 In
          onMouseLeave={() => setIsFindMatchHovered(false)} // 마우스 호버 Out
        >
          {/* 경쟁 매칭 png, gif */}
          <img
            src={isFindMatchHovered ? FindMatch : FindMatchAsset} // 경쟁 매칭 Hover
            alt="경쟁매칭 이미지"
            className="mr-2 rounded-xl"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* 언어 선택 모달 */}
          <dialog id="language_modal" className="modal">
            <div className="modal-box flex-row justify-center">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute bottom-0"
                  style={{ width: '10%', left: '50%', transform: 'translateX(-50%)' }}
                >취 소</button>
              </form>
              <h3 className="font-bold text-2xl mb-5">언어를 선택하세요 !</h3>
              {/* 언어 선택 옵션 3가지 */}
              <button
                className={`btn mr-5 ${selectedLanguage === 'Python' ? 'btn-selected' : ''}`}
                style={{ backgroundColor: selectedLanguage === 'Python' ? '#F9C7C6' : '#E3E6D9' }}
                onClick={() => handleLanguageSelection('python')}
              >
                Python
              </button>
              <button
                className={`btn mr-5 ${selectedLanguage === 'Java' ? 'btn-selected' : ''}`}
                style={{ backgroundColor: selectedLanguage === 'Java' ? '#F9C7C6' : '#E3E6D9' }}
                onClick={() => handleLanguageSelection('java')}
              >
                Java
              </button>
              <button
                className={`btn mb-5 ${selectedLanguage === 'C++' ? 'btn-selected' : ''}`}
                style={{ backgroundColor: selectedLanguage === 'C++' ? '#F9C7C6' : '#E3E6D9' }}
                onClick={() => handleLanguageSelection('cpp')}
              >
                C++
              </button>
              {/* 언어 선택 후 모드 선택 */}
              {selectedLanguage && (
                <div>
                  <h3 className="font-bold text-2xl mb-5">모드를 선택하세요 !</h3>
                  {/* 스피드모드 */}                  
                  <img
                    src={isSpeedModeHovered ? SpeedMode : SpeedModeAsset}
                    alt="스피드전"
                    className="float-left rounded-2xl"
                    style={{ width: '49%', height: 'auto' }}
                    onMouseEnter={() => setIsSpeedModeHovered(true)}
                    onMouseLeave={() => setIsSpeedModeHovered(false)}
                    onClick={() => {
                      socket.current.send(
                        JSON.stringify ({
                          type : "ENQUEUE",
                          userId : "123123123",
                          rating : "1250",
                          gameMode : 'speed',
                          lang: selectedLanguage,
                          userNickname: "트런들",
                        })
                      );
                      // document.getElementById('language_modal').close(); // 클릭 시 언어 선택 모달 닫고,
                      openMatchingModal(); // 매칭 진행 모달 열기

                    }}
                  />
                  {/* 효율전모드 */}
                  <img
                    src={isEffiModeHovered ? EffiMode : EffiModeAsset}
                    alt="효율전"
                    className="float-right rounded-2xl mb-5"
                    style={{ width: '48%', height: 'auto' }}
                    onMouseEnter={() => setIsEffiModeHovered(true)}
                    onMouseLeave={() => setIsEffiModeHovered(false)}
                    onClick={() => {
                      socket.current.send(
                        JSON.stringify ({
                          type : "ENQUEUE",
                          userId : "123123123",
                          rating: "1250",
                          gameMode: 'eff',
                          lang : selectedLanguage,
                          userNickname: "트런들",
                        })
                      );
                      // document.getElementById('language_modal').close(); // 클릭 시 언어 선택 모달 닫고,
                      openMatchingModal(); // 매칭 진행 모달 열기
                    }}
                  />
                </div>
              )}
            </div>
          </dialog>

          {/* 매칭 진행 모달 */}
          <dialog id="matching_modal" className="modal">
            <div className="modal-box flex-row justify-center">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute bottom-0"
                  style={{ width: '10%', left: '50%', transform: 'translateX(-50%)' }}
                  onClick={() => {
                    socket.current.send(
                      JSON.stringify ({
                        "type" : "NO",
                        "userId" : "123123123",
                        "rating" : "1250",
                        "gameMode" : "speed",
                        "lang" : "cpp",
                        "userNickname": "트런들",
                      })
                    );
                    document.getElementById('language_modal').close(); // 언어&모드 선택 모달 닫기
                    setSelectedLanguage(null); // 닫을 때 선택된 언어 초기화
                  }}
                >
                  취 소
                </button>
              </form>
              <h3 className="font-bold text-2xl mb-5">매칭 중입니다...</h3>
              <h3 className="font-bold text-lg mb-5">잠시만 기다려주세요</h3>
              {/* 타이머 00:00부터 1초씩 상승하기 */}
              <div id="matching_timer" className="font-bold text-lg mb-5"></div>
            </div>
          </dialog>

          {/* 매칭 완료 모달 후 "수락", "취소" 모달 소환 */}
          <dialog id="matching_complete_modal" className="modal">
            <div className="modal-box flex-row justify-center">
              <MatchingCompleteModal
                // 수락
                onAccept={handleAccept} problemId={problemId}
                // 취소
                onCancel={handleCancel}
              />
            </div>
          </dialog>
        </button>

        {/* 게임 생성 */}
        <button
            className="px-4 py-2 mx-2 rounded-xl hover:scale-110"
            style={{ width: '80%', height: 'auto' }}
            onClick={() => document.getElementById('my_modal_1').showModal()}
            onMouseEnter={() => setIsGameCreateHovered(true)} // 마우스 호버 In
            onMouseLeave={() => setIsGameCreateHovered(false)} // 마우스 호버 Out
        >
            <img
            src={isGameCreateHovered ? GameCreate : GameCreateAsset} // 게임 생성 Hover
            alt="게임생성 이미지"
            className="mr-2 rounded-xl"
            style={{ width: '100%', height: 'auto' }}
            />
        </button>
        {<BannerCreateModal closeModal={closeModal} />}

        {/* 게임 찾기 */}
        <button
          className="px-4 py-2 mx-2 rounded-xl hover:scale-110"
          style={{ width: '80%', height: 'auto' }}
          onMouseEnter={() => setIsGameSearchHovered(true)} // 마우스 호버 In
          onMouseLeave={() => setIsGameSearchHovered(false)} // 마우스 호버 Out
        >
          <Link to="/game-list/competition"> {/* 들어갔을 때 경쟁전 방 리스트 먼저 보이도록 */}
            <img
              src={isGameSearchHovered ? GameSearch : GameSearchAsset} // 게임 찾기 Hover
              alt="게임찾기 이미지"
              className="mr-2 rounded-xl"
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
        </button>
      </div>
      {/* 상단 배너 선 */}
      <div
        className="absolute bottom-2 left-0 right-0 h-1 z-0"
        style={{ backgroundColor: '#E3E6D9'}}>
      </div>  
    </div>
  );
}