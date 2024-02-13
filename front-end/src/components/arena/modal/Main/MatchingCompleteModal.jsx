import React, { useState, useEffect } from 'react';
import VS from '../../../../images/arena/HotMatch/VS.png'

export default function MatchingCompleteModal({ matchingState, onAccept, onCancel }) {
  const [userImgSrcs, setUserImgSrcs] = useState('');
  const [enemyImgSrcs, setEnemyImgSrcs] = useState('');
  const [userNicknames, setUserNicknames] = useState('');
  const [enemyNicknames, setEnemyNicknames] = useState('');

  useEffect(() => {
    console.log('내려받은 유저 닉네임, 이미지 확인 :', matchingState);
    setUserImgSrcs(matchingState.userImgSrc);
    setEnemyImgSrcs(matchingState.enemyImgSrc);
    setUserNicknames(matchingState.userNickname);
    setEnemyNicknames(matchingState.enemyNickname);
  }, [matchingState]);

  return (
    <div className="matching-complete-modal rounded-xl">
      {/* 상단 코드아레나 문구 */}
      <h1 className="font-bold text-3xl mb-5">CODE ARENA</h1>
      
      {/* 매칭 잡힌 유저 정보 2개 (가상 데이터) */}
      <div className="flex justify-center mb-5">
        <img src={userImgSrcs} alt="User 1" className="mr-2 rounded-xl w-1/4" />
        <img src={VS} alt="VS" className="w-1/5 h-100 rounded-lg" />
        <img src={enemyImgSrcs} alt="User 2" className="ml-2 rounded-xl w-1/4" />
      </div>

      {/* 구분선 */}
      <hr
        className="mt-2"
        style={{ border: '2px solid #E3E6D9' }}
      />

      {/* 유저 정보 : 닉네임, 레이팅 점수 */}
      <div className="mt-5 flex items-center justify-between ml-5 mr-5">    
          <div className="text-center">
            <div>{userNicknames}</div>
          </div>
          <div className="text-center">
            <div>{enemyNicknames}</div>
          </div>
      </div>

      <div className="flex justify-center">
        <button onClick={onAccept} className="btn mx-2">
          수락
        </button>
        <button onClick={onCancel} className="btn mx-2">
          거절
        </button>
      </div>
    </div>
  );
}