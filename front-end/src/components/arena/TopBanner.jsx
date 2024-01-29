import React, { useState } from 'react';

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
  // 호버 기능
  const [isFindMatchHovered, setIsFindMatchHovered] = useState(false);
  const [isGameCreateHovered, setIsGameCreateHovered] = useState(false);
  const [isGameSearchHovered, setIsGameSearchHovered] = useState(false);
  const [isSpeedModeHovered, setIsSpeedModeHovered] = useState(false);
  const [isEffiModeHovered, setIsEffiModeHovered] = useState(false);

  // 언어 선택 useState
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  
  // 1. 언어 3가지 중 하나 선택하기
  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
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
    console.log('매칭 중지!!');

    // 모든 모달 닫기
    document.getElementById('matching_modal').close();
    document.getElementById('language_modal').close();

    // 선택된 언어 초기화
    setSelectedLanguage(null);
  };
  

  // 4. 매칭이 돌아가면 타이머 소환
  const startMatchingTimer = () => {
    let seconds = 0;
    const timerElement = document.getElementById('matching_timer');
  
    const updateTimer = () => {
      const minutes = Math.floor(seconds / 60); // 분단위 계산
      const remainingSeconds = seconds % 60; // 초단위 계산
  
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      seconds += 1;
    };
  
    // 1초마다 타이머 업데이트
    timerInterval = setInterval(updateTimer, 1000);
  
    // 원하는 시간까지 진행 후 타이머 중지
    const desiredTimeInSeconds = 300; // 예시로 일단 5분 -> 추후에 수정
    setTimeout(() => {
      clearInterval(timerInterval);
      timerElement.textContent = '매칭 완료!'; // 매칭 완료 문구
    }, desiredTimeInSeconds * 1000);
  };

  return (
    <div className='flex flex-col items-center justify-center relative'>
      {/* 상단 배너 선 */}
      <div
        className="absolute top-5 left-0 right-0 h-1 z-0"
        style={{ backgroundColor: '#E3E6D9'}}>
      </div>  
      {/* 상단 배너 */}
      <div
       className="mt-3 flex justify-center w-3/4 shadow-lg rounded-xl z-10"
       style={{ backgroundColor: '#E3E6D9', height: 'auto' }}
      >
        <button
          className="btn m-2 rounded-xl"
          style={{ width: '35%', height: 'auto' }}
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
                className={`btn mr-5 ${selectedLanguage === 'Python' && 'btn-selected'}`}
                style={{ backgroundColor: selectedLanguage === 'Python' ? '#F9C7C6' : '#E3E6D9' }}
                onClick={() => handleLanguageSelection('Python')}
              >
                Python
              </button>
              <button
                className={`btn mr-5 ${selectedLanguage === 'Java' && 'btn-selected'}`}
                style={{ backgroundColor: selectedLanguage === 'Java' ? '#F9C7C6' : '#E3E6D9' }}
                onClick={() => handleLanguageSelection('Java')}
              >
                Java
              </button>
              <button
                className={`btn mb-5 ${selectedLanguage === 'C++' && 'btn-selected'}`}
                style={{ backgroundColor: selectedLanguage === 'C++' ? '#F9C7C6' : '#E3E6D9' }}
                onClick={() => handleLanguageSelection('C++')}
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
                      document.getElementById('language_modal').close();
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
                      document.getElementById('language_modal').close();
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
        </button>
        {/* 게임 생성 */}
        <button
          className="px-4 py-2 mx-2 rounded-xl"
          style={{ width: '80%', height: 'auto' }}
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
        {/* 게임 찾기 */}
        <button
          className="px-4 py-2 mx-2 rounded-xl"
          style={{ width: '80%', height: 'auto' }}
          onMouseEnter={() => setIsGameSearchHovered(true)} // 마우스 호버 In
          onMouseLeave={() => setIsGameSearchHovered(false)} // 마우스 호버 Out
        >
          <img
            src={isGameSearchHovered ? GameSearch : GameSearchAsset} // 게임 찾기 Hover
            alt="게임찾기 이미지"
            className="mr-2 rounded-xl"
            style={{ width: '100%', height: 'auto' }}
          />
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