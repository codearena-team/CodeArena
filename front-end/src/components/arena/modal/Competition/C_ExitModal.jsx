import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearStompClient } from "../../../../features/arena/stompClientSlice";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function CompetitionExitModal({ gameExitId }) {
  const navigate = useNavigate();
  const gameId = gameExitId
  const dispatch = useDispatch();
  const stompClient = useSelector(state => state.stompClient.stompClient)
  
  // 퇴장했을 때 1번 알림 알리기
  const handleExitMessage = () => {
    if (stompClient) {
      stompClient.unsubscribe('/sub/chat/room/'+`${gameId}`);
      stompClient.disconnect();
    }
    dispatch(clearStompClient());
    navigate('/arena')
    // window.location.href = '/arena';

    axios.get('https://i10d211.p.ssafy.io/game/chat/exit?gameId=' + `${gameId}`)
      .then((res)=> {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
    window.location.reload();
  }

  return (
    <div>
      <dialog id="compPlay_Exit" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-center">정말로 나가시겠습니까?</h3>
        <div className="modal-action flex justify-center">
          <button onClick={handleExitMessage} className="btn">예</button> {/* 나가면 다시 방 리스트로 이동 */}
          <form method="dialog">
              <button className="btn">아니오</button>
          </form>
        </div>
      </div>
      </dialog>
    </div>
  );
}