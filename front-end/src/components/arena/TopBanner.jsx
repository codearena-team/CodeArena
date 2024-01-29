import React, { useState } from 'react';

import FindMatch from '../../images/arena/TopBanner/FindMatch.gif';
import FindMatchAsset from '../../images/arena/TopBanner/FindMatch.png';
import GameCreate from '../../images/arena/TopBanner/GameCreate.gif';
import GameCreateAsset from '../../images/arena/TopBanner/GameCreate.png';
import GameSearch from '../../images/arena/TopBanner/GameSearch.gif';
import GameSearchAsset from '../../images/arena/TopBanner/GameSearch.png';


export default function TopBanner() {
  const [isFindMatchHovered, setIsFindMatchHovered] = useState(false);
  const [isGameCreateHovered, setIsGameCreateHovered] = useState(false);
  const [isGameSearchHovered, setIsGameSearchHovered] = useState(false);

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
          className="px-4 py-2 mx-2 rounded-xl"
          style={{ width: '80%', height: 'auto' }}
          onMouseEnter={() => setIsFindMatchHovered(true)} // 마우스 호버 In
          onMouseLeave={() => setIsFindMatchHovered(false)} // 마우스 호버 Out
        >
          <img
            src={isFindMatchHovered ? FindMatch : FindMatchAsset} // 경쟁 매칭 Hover
            alt="경쟁매칭 이미지"
            className="mr-2 rounded-xl"
            style={{ width: '100%', height: 'auto' }}
          />
        </button>
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