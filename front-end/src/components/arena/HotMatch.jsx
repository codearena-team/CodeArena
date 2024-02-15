import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// npm install styled-components 애니메이트 기능 구현 설치 라이브러리
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
// import Oh from '../../images/arena/HotMatch/oh.png'
// import Gwi from '../../images/arena/HotMatch/gwi.png'
// import Hae from '../../images/arena/HotMatch/hae.png'
// import Kim from '../../images/arena/HotMatch/kim.png'
import View from '../../images/arena/HotMatch/View.png'
import VS from '../../images/arena/HotMatch/VS.png'
import Fighting from '../../images/arena/HotMatch/Fighting.gif'


export default function HotMatch() {
  // Hot Match 애니메이트
  const fadeIn = keyframes`from {opacity: 0; transform: translateX(-50px);} to {opacity: 1;}`;
  const AnimatedHeader = styled.h1`animation: ${fadeIn} 0.5s ease-in-out forwards;`;

  const [hotMatchs, setHotMatchs] = useState([])

  useEffect(()=> {
    axios.get('https://codearena.shop/game/chat/hotmatch')
    .then((res)=> {
      setHotMatchs(res.data)
      console.log("Hot Match 확인 :", res.data);
    })
  },[])









  return (
    <div className='flex flex-col mt-5 relative'>
      <br />
      {/* Hot Match 문구 */}
      <AnimatedHeader className='ml-5 font-bold'>Hot Match !</AnimatedHeader>
      {/* Hot Match 배너 */}
      <div className="mt-5 shadow-xl mb-5" style={{ backgroundColor: '#E3E6D9', height: '100%' }}>
        {/* 캐러셀 */}
        <div className='flex justify-center mt-2'>
          <div className="carousel w-full p-1 rounded-box"> 
            {/* 아이템 요소 */}
            {hotMatchs.map((match, index) => (
              <div
                key={match.gameId}
                id={`slide${index + 1}`}
                className="carousel-item  w-full flex items-center justify-center"
                style={{ width:'100%'}}
              >
                <a  href={`#slide${index === 0 ? hotMatchs.length : index}`} 
                className="btn btn-circle mr-3">❮</a> 
                <div className="rounded-xl ml-2 w-1/3 shadow-xl p-5 mb-2" style={{ backgroundColor: '#F4F5F1' }}>
                  {/* 지금 경쟁 중! + 시청자 수 */}
                  <div className="flex items-center justify-end">
                    <img src={Fighting} alt="지금 경쟁 중!" className='w-1/3 rounded-xl mr-16' />
                    <img src={View} alt="시청자 수" className="w-8 h-8 rounded-full" />
                    <span className="ml-2">{match.participants} View</span>
                  </div>
                  {/* 유저1 vs 유저2 사진 */}
                  <div className="mt-5 flex items-center justify-between">
                    <img src={match?.player1Ssumnail} alt={match.id} className="w-1/3 h-100 rounded-2xl shadow-xl" />
                    <img src={VS} alt="VS" className="w-1/4 h-100 rounded-lg" />
                    <img src={match?.player2Ssumnail} alt={match.id} className="w-1/3 h-100 rounded-2xl shadow-xl" />
                  </div>
                  {/* 구분선 */}
                  <hr
                    className="mt-2"
                    style={{ border: '2px solid #E3E6D9' }}
                  />
                  {/* 유저1 vs 유저2 정보 */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className='text-center'>
                      <div>{match.player1Nickname}</div>
                      <div>{match.player1Rating}</div>
                    </div>
                    <Link to={`/game-list/competition/view/${match.gameId}`} className='btn bg-red-300 text-base'>관전하기</Link>
                    <div className='text-center'>
                      <div>{match.player2Nickname}</div>
                      <div>{match.player2Rating}</div>
                    </div>
                  </div>
                </div>
                <a href={`#slide${index === hotMatchs.length - 1 ? 1 : index + 2}`} className="btn btn-circle ml-5">❯</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}