import React, { useState, useEffect, useRef } from 'react';
import VS from '../../../../images/arena/HotMatch/VS.png'
import { useSelector } from 'react-redux/es/hooks/useSelector';

export default function MatchingCompleteModal({ matchingState, onAccept, onCancel, type, socket}) {
  const [userImgSrcs, setUserImgSrcs] = useState('');
  const [enemyImgSrcs, setEnemyImgSrcs] = useState('');
  const [userNicknames, setUserNicknames] = useState('');
  const [enemyNicknames, setEnemyNicknames] = useState('');
  const [waitingText, setWaitingText] = useState("");
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const queueKey = useSelector(state => state.game.queueKey);
  const userId = useSelector(state => state.game.userId);
  const userNickname = useSelector(state => state.game.userNickname);
  const rating = useSelector(state => state.game.rating);

  const handleAccept = () => {
    onAccept();
    changeText("상대방의 수락을 기다리고 있어요!");
    setButtonsVisible(false);
  };

  useEffect(()=>{
    // 거절당하면 다시 우선순위 큐에 진입
    if (type == 'CONTINUE') {
      changeText("상대가 매칭을 거절하여 새로운 매칭을 시도하겠습니다...");
      setButtonsVisible(false);
    }
    // 상대방과 매칭 잡혔을 때 : QUERY
    else if (type == 'QUERY') {
      changeText('');
      setButtonsVisible(true);
    } 
  }, [type])

  // 텍스트 문구 동적으로 변환
  const changeText = (text) => {
    setWaitingText(text);
  }

  const onHandleCancle = () => {
    socket.send(
      JSON.stringify ({
        type : "POP",
        queueKey: queueKey,
        userId : userId,
        rating : rating,
        gameMode : "speed",
        lang: "cpp",
        userNickname: userNickname,
      })
    );
    socket.close();
    socket = null;
  }

  useEffect(() => {
    // console.log('내려받은 유저 닉네임, 이미지 확인 :', matchingState);
    setUserImgSrcs(matchingState.userImgSrc);
    setEnemyImgSrcs(matchingState.enemyImgSrc);
    setUserNicknames(matchingState.userNickname);
    setEnemyNicknames(matchingState.enemyNickname);
  }, [matchingState]);

  return (
    <div className="matching-complete-modal rounded-xl" onClick={e=>e.stopPropagation()}>
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
        {buttonsVisible && (
          <>
            <button onClick={handleAccept} className="btn mx-2">
              수락
            </button>
            <button onClick={onCancel} className="btn mx-2">
              거절
            </button>
          </>
        )}
      </div>

      {/* 수락 후 대기 중 문구 */}
      {waitingText && (
        <div className="text-center mt-4 text-gray-500 relative">
          <div>
            {waitingText}
          </div>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost mt-2"
              style={{ width: '10%' }}
              onClick={onHandleCancle}
            > 취 소
            </button>
          </form>
        </div>
      )}
    </div>
  );
}