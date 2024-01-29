import React from 'react';

export default function RankPage() {
  // 스피드모드 랭킹 데이터 (가상)
  const speedModeRanking = [
    { rank: 1, username: 'User1', rating: 1500 },
    { rank: 2, username: 'User2', rating: 1450 },
    { rank: 3, username: 'User3', rating: 1420 },
    { rank: 4, username: 'User4', rating: 1370 },
    { rank: 5, username: 'User5', rating: 1330 },
  ];

  // 효율모드 랭킹 데이터 (가상)
  const efficiencyModeRanking = [
    { rank: 1, username: 'UserA', rating: 1600 },
    { rank: 2, username: 'UserB', rating: 1550 },
    { rank: 3, username: 'UserC', rating: 1500 },
    { rank: 4, username: 'UserD', rating: 1480 },
    { rank: 5, username: 'UserE', rating: 1410 },
  ];

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
        {rankingList.map((user, index) => renderRankingItem(user, index))}
      </div>
    </div>
  );

  // 각 모드별 랭킹 리스트 아이템
  const renderRankingItem = (user, index) => (
    <div
      key={index}
      className="flex justify-between hover:scale-125 items-center h-16 mb-5 rounded-lg shadow-lg bg-yellow-100"
      style={{ backgroundColor: '#F8E6D0' }}
    >
      <span className='font-bold ml-4' style={{color:'#FE4582'}}>{user.rank}st</span>
      <span className='font-bold ml-4'>{user.username}</span>
      <span className='font-bold mr-4'>{user.rating}점</span>
    </div>
  );

  return (
    <div className="flex flex-col mt-5">
      <br />
      <h1 className='ml-5 font-bold'>실시간 랭킹</h1>
      <div className="flex justify-center mt-5 w-full shadow-xl relative" style={{backgroundColor:'#E3E6D9'}}>
        {renderRankingList('Speed', speedModeRanking)}
        <div className="w-40"></div> {/* 사이에 여백 */}
        {renderRankingList('Efficiency', efficiencyModeRanking)}
      </div>
    </div>
  );
}