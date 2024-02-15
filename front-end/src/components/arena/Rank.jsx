import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

export default function RankPage() {
  const fadeIn = keyframes`from {opacity: 0; transform: translateX(-50px);} to {opacity: 1;}`;
  const AnimatedHeader = styled.h1`animation: ${fadeIn} 0.5s ease-in-out forwards;`;

  const [CoinRanks, setCoinRanks] = useState([])
  const [speedRanks, setSpeedRanks] = useState([])
  const [effRanks, setEffRanks] = useState([])

  useEffect(()=> {
    axios.get('https://i10d211.p.ssafy.io/game/rest/rank')
    .then((res)=> {
      console.log(res);
      setSpeedRanks(res.data.data.speedRank)
      setEffRanks(res.data.data.effRank)
      setCoinRanks(res.data.data.pointRank)
    })
  },[])


  // 각 모드별 전체 랭킹 리스트
  const renderRankingList = (mode, rankingList) => (
    <div
      className="flex flex-col w-1/4 mr-6 ml-6 mt-3 mb-3 items-center rounded-xl"
      style={{backgroundColor:'#FBF9F1'}}
    >
      {/* Speed Mode, Efficiency Mode 헤더 */}
      <h2 className={`text-3xl font-bold mt-3`}>
        <span className={mode === 'Speed' ? 'text-red-400' : 'text-green-400'}>
          {mode}
        </span>{' '}
        Mode
      </h2>
      {/* 랭크, 닉네임, 레이팅 점수 */}
      <div
        className="flex justify-between items-center h-16 mb-5 rounded-lg shadow-lg p-3 text-white"
        style={{ backgroundColor: '#C4B299', width: '80%'}}
      >
        <span className="font-bold ml-2">랭크</span>
        <span className="font-bold">닉네임</span>
        <span className="font-bold mr-3">점수</span>
      </div>
      <div style={{ width: '80%' }}>
        { mode === 'Speed' ?
        rankingList.map((user, index) => renderRankingItem(user, index))
        :
        rankingList.map((user, index) => renderRankingItem2(user, index))
        }
      </div>
    </div>
  );

  // 각 모드별 랭킹 리스트 아이템
  const renderRankingItem = (user, index) => (
    <div>
      <Link
        to={`/profile/${user.userNickname}`}
        key={index}
        className="flex justify-between hover:scale-125 items-center h-16 mb-5 rounded-lg shadow-lg bg-yellow-100"
        style={{ backgroundColor: '#F8E6D0' }}
      >
        <span className='font-bold ml-4' style={{color:'#FE4582'}}>{index + 1}st</span>
        <span className='font-bold ml-4'>{user.userNickname}</span>
        <span className='font-bold mr-4'>{user.speedRating}점</span>
      </Link>
    </div>
  );

  const renderRankingItem2 = (user, index) => (
    <div>
      <Link
        to={`/profile/${user.userNickname}`}
        key={index}
        className="flex justify-between hover:scale-125 items-center h-16 mb-5 rounded-lg shadow-lg bg-yellow-100"
        style={{ backgroundColor: '#F8E6D0' }}
      >
        <span className='font-bold ml-4' style={{color:'#FE4582'}}>{index + 1}st</span>
        <span className='font-bold ml-4'>{user.userNickname}</span>
        <span className='font-bold mr-4'>{user.effRating}점</span>
      </Link>
    </div>
  );



  const BattingKingList = (mode, rankingList) => (
    <div
      className="flex flex-col w-1/4 mr-6 ml-6 mt-3 mb-3 items-center rounded-xl"
      style={{backgroundColor:'#FBF9F1'}}
    >
      {/* Speed Mode, Efficiency Mode 헤더 */}
      <h2 className={`text-3xl font-bold mt-3`}>
        <span className='text-blue-400'>
          {mode}
        </span>
      </h2>
      {/* 랭크, 닉네임, 레이팅 점수 */}
      <div
        className="flex justify-between items-center h-16 mb-5 rounded-lg shadow-lg p-3 text-white"
        style={{ backgroundColor: '#C4B299', width: '80%'}}
      >
        <span className="font-bold ml-2">랭크</span>
        <span className="font-bold">닉네임</span>
        <span className="font-bold mr-3">코인</span>
      </div>
      <div style={{ width: '80%' }}>
        {rankingList.map((user, index) => BattingKingItem(user, index))}
      </div>
    </div>
  );

  const BattingKingItem = (user, index) => (
    <div>
      <Link
        to={`/profile/${user.userNickname}`}
        key={index}
        className="flex justify-between hover:scale-125 items-center h-16 mb-5 rounded-lg shadow-lg bg-yellow-100"
        style={{ backgroundColor: '#F8E6D0' }}
      >
        <span className='font-bold ml-4' style={{color:'#FE4582'}}>{index + 1}st</span>
        <span className='font-bold ml-4'>{user.userNickname}</span>
        <span className='font-bold mr-4'>{user.point}</span>
      </Link>
    </div>
  );



  
  return (
    <div className="flex flex-col mt-5">
      <br />
      <AnimatedHeader className='ml-5 font-bold'>현재 랭킹</AnimatedHeader>
      <div className="flex justify-center mt-5 w-full shadow-xl relative" style={{backgroundColor:'#E3E6D9'}}>
        {renderRankingList('Speed', speedRanks)}
        <div className="w-10"></div> {/* 사이에 여백 */}
        {renderRankingList('Efficiency', effRanks)}
        <div className="w-10"></div> {/* 사이에 여백 */}
        {BattingKingList('Rich', CoinRanks)}



      </div>
    </div>
  );
}