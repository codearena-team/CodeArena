import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearStompClient } from "../../../../features/arena/stompClientSlice";

export default function AbstentionModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sender = useRef(useSelector(state => state.auth.userNickname));
  const {
    problemId,
    gameMode,
    userId,
    gameId
  } = useSelector(state => state.game);
  const stompClient = useSelector(state => state.stompClient.stompClient);
  // 기권할래요 동작 함수
  const clickHandler = () => {
    // console.log('기권했어요', stompClient.send)
    stompClient.send(`/pub/chat/leave`, {}, JSON.stringify({
      gameId: gameId,
      userId: userId,
      sender: sender.current,
      mode : gameMode === 'speed' ? 0 : 1,
      type: 'PLAYER_EXIT',
    }))
    stompClient.unsubscribe('/sub/chat/room/'+`${gameId}`);
    stompClient.unsubscribe('/pub/chat/leave');
    stompClient.disconnect();
    dispatch(clearStompClient());
    navigate('/arena')
    window.location.reload()
  }

  // useEffect(()=> {
  //   console.log("useEffect stompClient :", stompClient)
  //   console.log("넘어온 problemId 번호 확인 :", problemId)
  // },[gameId])

  return (
    <div>
      <dialog id="comp_abstention" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-center">지금 나가시면 기권으로 처리됩니다 !!</h3>
        <h3 className="font-bold text-lg mb-4 text-center">정말 괜찮으시겠어요?</h3>
        <div className="modal-action flex justify-center">
          <button onClick={clickHandler} className="btn">기권할래요..</button> {/* 나가면 다시 방 리스트로 이동 */}
          <form method="dialog">
            <button className="btn">아니요</button>
          </form>
        </div>
      </div>
      </dialog>
    </div>
  );
}