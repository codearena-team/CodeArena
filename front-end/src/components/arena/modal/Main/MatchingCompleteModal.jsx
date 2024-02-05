import React from 'react';
import { Link } from 'react-router-dom';
// 가상데이터 3개
import Hae from '../../../../images/arena/HotMatch/hae.png'
import Kim from '../../../../images/arena/HotMatch/kim.png'
import VS from '../../../../images/arena/HotMatch/VS.png'

export default function MatchingCompleteModal({ onAccept, onCancel }) {
  // 매칭 완료되면 나타날 가상 데이터 (추후 삭제)
  const userData = [
    { id: 1, profileImage: Hae, username: '회창일타강사', profileImage2: Kim, username2: 'Beemo99', rating: 1100, rating2: 1105 },
  ]


  return (
    <div className="matching-complete-modal rounded-xl">
      {/* 상단 코드아레나 문구 */}
      <h1 className="font-bold text-3xl mb-5">CODE ARENA</h1>
      
      {/* 매칭 잡힌 유저 정보 2개 (가상 데이터) */}
      <div className="flex justify-center mb-5">
        <img src={userData[0].profileImage} alt="User 1" className="mr-2 rounded-xl w-1/4" />
        <img src={VS} alt="VS" className="w-1/5 h-100 rounded-lg" />
        <img src={userData[0].profileImage2} alt="User 2" className="ml-2 rounded-xl w-1/4" />
      </div>

      {/* 구분선 */}
      <hr
        className="mt-2"
        style={{ border: '2px solid #E3E6D9' }}
      />

      {/* 유저 정보 : 닉네임, 레이팅 점수 */}
      <div className="mt-5 flex items-center justify-between ml-5 mr-5">
        {userData.map((user, index) => (
          <div key={index} className="text-center">
            <div>{user.username}</div>
            <div>{user.rating}</div>
          </div>
        ))}
        {userData.map((user, index) => (
          <div key={index} className="text-center">
            <div>{user.username2}</div>
            <div>{user.rating2}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        {userData.map((user) => (
          <Link key={user.id} to={`/game-list/competition/play/${user.id}`} className="btn mx-2">
            수락
          </Link>
        ))}
        <button className="btn mx-2" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}