import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function RankPage() {

  const [speedRanks, setSpeedRanks] = useState([])
  const [effRanks, setEffRanks] = useState([])

  useEffect(()=> {
    axios.get('https://i10d211.p.ssafy.io/game/rest/rank')
    .then((res)=> {
      setSpeedRanks(res.data.data.speedRank)
      setEffRanks(res.data.data.effRank)
    })
  },[])


  // 각 모드별 전체 랭킹 리스트
  const renderRankingList = (mode, rankingList) => (
    <div
      className="flex flex-col w-1/3 mr-6 ml-6 mt-3 mb-3  items-center rounded-xl"
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
      <div className="mt-3">
        <div
          className="flex justify-between items-center w-96 h-16 mb-5 rounded-lg shadow-lg p-3 text-white"
          style={{ backgroundColor: '#C4B299'}}
        >
          <span className="font-bold ml-2">랭크</span>
          <span className="font-bold">닉네임</span>
          <span className="font-bold mr-3">점수</span>
        </div>
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
  );

  const renderRankingItem2 = (user, index) => (
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
  );

  return (
    <div className="flex flex-col mt-5">
      <br />
      <h1 className='ml-5 font-bold'>실시간 랭킹</h1>
      <div className="flex justify-center mt-5 w-full shadow-xl relative" style={{backgroundColor:'#E3E6D9'}}>
        {renderRankingList('Speed', speedRanks)}
        <div className="w-40"></div> {/* 사이에 여백 */}
        {renderRankingList('Efficiency', effRanks)}
      </div>
    </div>
  );
}