import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSelector } from "react-redux";

export default function AbstentionModal() {
  const navigate = useNavigate();
  const sender = useRef(useSelector(state => state.auth.userNickname));
  const Location = useLocation();
  const [stompClient, setStompClient] = useState(null);
  const [problem, setProblem] = useState({})
  const [gameMode, setGameMode] = useState("");
  const [problemId, setProblemId] = useState(""); 
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState(""); 
  useEffect(()=> {
    const socket = new SockJS('https://i10d211.p.ssafy.io/game/ws-stomp');
    const stompClient = Stomp.over(socket);
    console.log("useEffect stompClient :", stompClient)
    
    const { problemId, gameMode, lang, userId, gameId } = Location.state;
    console.log("여기서 진짜 넘어와야함 :", problemId)
    // setGameMode
    setGameMode(gameMode);
    setProblemId(problemId);
    setUserId(userId);
    setGameId(gameId);
    stompClient.connect({}, () => {
      // 연결
      console.log('채팅과 연결이 되었어요 !')
      stompClient.subscribe('/sub/chat/room/'+`${gameId.current}`, (message) => {
        // 받은 메시지에 대한 처리
        const data = JSON.parse(message.body);
        console.log(data);
        
      });
      }, error => {
      // 에러

      console.error("채팅 연결 에러났음", error)
      alert("연결에 문제가 있습니다. 다시 시도해주세요.")
      // 필요한 경우 여기에서 재연결 로직을 구현
    });
    setStompClient(stompClient);
  },[])
  const clickHandler = () => {
    console.log('기권했어요', stompClient.send)
    stompClient.send(`/pub/chat/leave`, {}, JSON.stringify({
      gameId: gameId,
      userId: userId,
      sender: sender.current,
      mode : gameMode === 'speed' ? 0 : 1,
      type: 'PLAYER_EXIT',
    }))
    navigate('/arena')
    window.location.reload()
  }
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