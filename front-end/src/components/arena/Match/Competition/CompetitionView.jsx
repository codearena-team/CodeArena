import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import * as StompJs from '@stomp/stompjs';
import C_DividingLine from "./C_dividingLine";
import CompTopInfo from "./CompTopInfo";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSelector } from "react-redux";
import Webrtc from "../../../../pages/test/Webrtc";

export default function CompetitionView() {
  const params = useParams()
  const navigate = useNavigate();
  const location = useLocation();

  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(location.state?.startTime || 0);
  const timerRef = useRef(null);

  const [chatList, setChatList] = useState([]);
  const [chatMessage, setChatMessage] =useState('')
  const [inputMessage, setInputMessage] = useState('');
  const [currentStompClient, setStompClient] = useState(null);
  const recentMessage = useRef(null);
  const sender = useRef(useSelector(state => state.auth.userNickname));

  useEffect(() => {
    // 경기 시작 시간 확인
    const startTime = location.state?.startTime;
    console.log("경기 시작 시간 확인 :", startTime)

    const socket = new SockJS('https://i10d211.p.ssafy.io/game/ws-stomp');
    const stompClient = Stomp.over(socket);
    console.log("경쟁전 useEffect stompClient :", stompClient)

    stompClient.connect({}, () => {
      // 연결
      console.log('경쟁전 채팅과 연결이 되었어요 !')
    
      // 구독하기 
      stompClient.subscribe('/sub/chat/room/'+`${params.id}`, (message) => {
        // 받은 메시지에 대한 처리
        console.log('채팅을 받았습니다 :', message);
        const msg = JSON.parse(message.body)
        console.log("여기 타입이요", msg.type)
        if (msg.type && msg.type === "TALK") {
          const tmp = [...chatList]  //배열 메모리 주소 변경을 해야 useState 감지가 됨.
          const obj = {sender:msg.sender, message:msg.message}
          tmp.push(obj)
          setChatList(tmp)
          setChatMessage(msg.message)
          scrollToBottom();
        }
        else if (msg.type && msg.type === "CONTINUE") { 
          alert(msg.result)
        }
        else if (msg.type && msg.type === "END") {
          alert("게임이 종료되었습니다.")
          navigate(
            `/game-list/competition/compSpeedResult/${params.id}`,
            { state: { gameId: params.id }
          });
        }
        else if (msg.type && msg.type === "TERMINATED") {
          alert("경기가 종료되었습니다.")
          navigate(
            `/game-list/competition/compSpeedResult/${params.id}`,
            { state: { gameId: params.id }
          });
        }

      });
    }, error => {
      // 에러
      console.error("경쟁전 채팅 연결에서 에러가 발생했어요.", error)
      alert("연결에 문제가 있습니다. 다시 시도해주세요.")
      // 필요한 경우 여기에서 재연결 로직을 구현
    });


    setStompClient(stompClient)

    // startTime 시간 - 진행된 시간 계산
    const calculateElapsedTime = () => {
      const currentTime = new Date().getTime();

      console.log("스타트타임 :", startTimeRef.current)
      const startTimeMillis = new Date(startTimeRef.current).getTime();
      const elapsed = Math.floor((currentTime - startTimeMillis) / 1000);

      // 초를 시/분/초 형식으로 변환
      // const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      const formattedTime = `${minutes}분 ${seconds}초`;
      
      setElapsedTime(formattedTime);
    };

    timerRef.current = setInterval(calculateElapsedTime, 1000);

    return () => {
      clearInterval(timerRef.current)
      console.log("채팅 연결을 종료합니다.")
      stompClient.disconnect();
    }
  }, [chatList, params.id]);

  // 입장했을 때 1번만 알림 보내기
  const handleEnterMessage = () => {
    console.log("입장 메세지를 전달합니다.")
    if (currentStompClient && currentStompClient.connected ) {
      currentStompClient.send(`/pub/chat/message`, {}, JSON.stringify({
        gameId: params.id,
        sender: sender.current,
        message: '경쟁전에 누군가 입장했어요!',
        type: 'ENTER',
    }))
  } else {
    const socket = new SockJS('https://i10d211.p.ssafy.io/game/ws-stomp');
    const stompClient = Stomp.over(socket);
    console.log("useEffect stompClient :", stompClient)

    stompClient.connect({}, () => {
      // 연결
      console.log("손님이 입장하여 stompClient 연결이 시도되었습니다.")
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify({
        gameId: params.id,
        sender: sender.current,
        message: '경쟁전에 누군가 입장했어요!',
        type: 'ENTER',
    }))
    }, error => {
      console.error("경쟁전 입장 연결 에러가 발생했어요.", error)
      alert("입장에 문제가 있습니다. 다시 시도해주세요.")
    });
  }
}

  useEffect(() => {
    handleEnterMessage();
  }, [])

  // 메세지 보내기 조작할 함수
  const handleSendMessage = (event) => {
    if (event) {
      event.preventDefault();
    } // 새로고침 방지

    if (currentStompClient && currentStompClient.connected && inputMessage.trim() !== '') {
      console.log("메시지 채팅 하나를 보냈어요.")
      console.log("gameId를 확인합니다. :", params.id)
      currentStompClient.send(`/pub/chat/message`, {}, JSON.stringify({
        gameId: params.id,
        sender: sender.current,
        message: inputMessage,
        type: 'TALK',
      }));
      
      setInputMessage('');
    } else {
      alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.")
      console.error('STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요');
    }
  };

  // 메시지 input 작동
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // 왼쪽과 오른쪽 패널의 너비를 나타내는 상태 -> 처음 렌더링 되었을 때 6:4 비율 
  const [panelWidths, setPanelWidths] = useState({
      left: 60,
      right: 40,
  });

  // 구분선 이동에 따른 왼쪽과 오른쪽 패널 비율 조정
  const handleDividerMove = (newPosition) => {
      const leftPanelWidth = newPosition;
      const rightPanelWidth = 100 - newPosition;

      // 비율 유지를 위해 스타일에 적용
      setPanelWidths({ left: leftPanelWidth, right: rightPanelWidth });
  };

  const scrollToBottom = () => {
    console.log("최신 메세지 들어옴 -> 스크롤 내려가유~")
    recentMessage.current?.scrollIntoView({ behavior: 'smooth'});
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatList.length])

  return (
    <div>
      <CompTopInfo gameExitId={params.id}/>
      <div className="competition-view">
        {/* 왼쪽(6)에 해당하는 부분 */}
        <div className="left-panel ml-3 mr-3 mt-1" style={{ width: `${panelWidths.left}%`}}>
          <div
            className="user-screens mt-5 rounded-xl shadow-lg flex items-center justify-center"
            style={{ width: '100%', height: '90%', backgroundColor: '#F5EBDB' }}
          >
            <div className="flex justify-center items-center mt-5">
              <p className="text-lg font-bold">{`경과 시간: ${elapsedTime}`}</p>
            </div>
            {/* "유저1의 화면이 보이는 공간 vs 유저2의 화면이 보이는 공간" */}
            {/* 각 유저의 화면 구성 (추가적인 스타일 및 컨텐츠 추가 필요) */}

            {/* <Webrtc 
              userNickname={params.userNickname}
              customSessionId={'qawsed'}
              isPlayer={false}
              width={`${panelWidths.left}%`}
              height={`550px`}
            /> */}
          </div>
        </div>

        {/* 구분선을 기준으로 왼쪽(6):오른쪽(4)로 나누어져있음 */}
        {/* handleDividerMove를 통해 왼쪽 오른쪽 화면 비율 조정 */}
        <C_DividingLine onDividerMove={handleDividerMove} />

        {/* 오른쪽(4)에 해당하는 부분 */}
        <div className="right-panel mr-3 mt-10 relative" style={{ width: `${panelWidths.right}%`, display: 'flex', flexDirection: 'column' }}>
          {/* 채팅 div */}
          <div className="ml-5 flex-grow" style={{ maxHeight: "80%", overflowY: "auto" }}>
            {/* 채팅창 */}
            <div className="chat-list mt-10">
              {chatList.map((message, index) => (
                <div
                  key={index}
                  ref={recentMessage}
                  className={`chat ${message.sender === sender.current ? 'chat-end' : 'chat-start'}`}
                >
                  <div className="chat-bubble">
                    {message.sender !== sender.current && (
                      <strong>{message.sender} : </strong>
                    )}
                    <span>{message.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 입력 폼 */}
          <div className="flex justify-center items-center mt-5">
            <div className="w-full">
              <div className="flex justify-center items-center">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    className="rounded-full border-2 border-gray-300 px-4 py-2 flex-grow focus:outline-none focus:border-blue-400"
                    placeholder=" 메시지를 입력하세요...!"
                    value={inputMessage}
                    onChange={handleInputChange}
                    style={{ width: '400px' }}
                  />
                  <button
                    type="submit"
                    className="bg-blue-300 text-white rounded-full px-4 py-2 ml-2 focus:outline-none"
                  >
                    입력
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 