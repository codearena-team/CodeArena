import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import G_DividingLine from "./G_dividingLine";
import GroupTopInfo from './GroupTopInfo';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import MainVideo from "../../../../pages/test/MainVideo";

export default function GroupView() {
  const params = useParams()
  const [chatList, setChatList] = useState([]);
  const [chatMessage, setChatMessage] =useState('')
  const [inputMessage, setInputMessage] = useState('');
  const [currentStompClient, setStompClient] = useState(null);
  const recentMessage = useRef(null);

  const sender = useRef(useSelector(state => state.auth.userNickname));

  useEffect(() => {
    const socket = new SockJS('https://i10d211.p.ssafy.io/game/ws-stomp');
    const stompClient = Stomp.over(socket);
    console.log("단체전 useEffect stompClient :", stompClient)

    stompClient.connect({}, () => {
      // 연결
      console.log('단체전 채팅과 연결이 되었어요 !')
    
      // 구독하기 
      stompClient.subscribe('/sub/chat/room/'+`${params.id}`, (message) => {
        // 받은 메시지에 대한 처리
        console.log('채팅을 받았습니다 :', message);
        const msg = JSON.parse(message.body)
        const tmp = [...chatList]  // 배열 메모리 주소 변경을 해야 useState 감지가 됨.
        const obj = {sender:msg.sender, message:msg.message}
        tmp.push(obj)
        setChatList(tmp)
        setChatMessage(msg.message)
        scrollToBottom();
      });
    }, error => {
      // 에러
      console.error("단체전 채팅 연결에서 에러가 발생했어요.", error)
      alert("연결에 문제가 있습니다. 다시 시도해주세요.")
      // 필요한 경우 여기에서 재연결 로직을 구현
    });


    setStompClient(stompClient)

    return () => {
      console.log("연결 끊었어요!!")
      stompClient.disconnect();
    }
  }, [chatList, params.id]);

   // 입장했을 때 1번만 알림 보내기
   const handleEnterMessage = () => {
    console.log("입장함!!")
    if (currentStompClient && currentStompClient.connected ) {
      currentStompClient.send(`/pub/chat/message`, {}, JSON.stringify({
        gameId: params.id,
        sender: sender.current,
        message: '단체전에 누군가 입장했어요!',
        type: 'ENTER',
    }))
  } else {
    const socket = new SockJS('https://i10d211.p.ssafy.io/game/ws-stomp');
    const stompClient = Stomp.over(socket);
    console.log("useEffect stompClient :", stompClient)

    stompClient.connect({}, () => {
      // 연결
      console.log("입장 메세지 보냄@@@@@@@@@@@@@@@@")
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify({
        gameId: params.id,
        sender: sender.current,
        message: '단체전에 누군가 입장했어요!',
        type: 'ENTER',
    }))
    }, error => {
      console.error("단체전 입장 연결 에러가 발생했어요.", error)
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
      console.log("메시지 채팅 하나를 보냇어요.")
      console.log("gameId를 확인합니다 :", params.id)
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

  const scrollToBottom = () => {
    console.log("최신 메세지 들어옴 -> 스크롤 내려가유~")
    recentMessage.current?.scrollIntoView({ behavior: 'smooth'});
  }

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

  return (
    <div>
      {/* 단체전 관전실 */}
      <GroupTopInfo />
      {/* 아래 채팅 */}
      <div className="competition-view mt-3" style={{ height: '90vh' }}>
        {/* 왼쪽(6)에 해당하는 부분 */}
        <div className="left-panel ml-3 mr-3 mt-1" style={{ width: `${panelWidths.left}%`}}>
          <div
            className="user-screens p-3 mt-5 rounded-xl shadow-lg"
            style={{ width: '100%', height: '80%', backgroundColor: '#F5EBDB' }}
          >
            {/* "유저1의 화면이 보이는 공간 vs 유저2의 화면이 보이는 공간" */}
            {/* 각 유저의 화면 구성 (추가적인 스타일 및 컨텐츠 추가 필요) */}
            <MainVideo 
            height='500px'
            width={`${panelWidths.left * 3.72}%`}
            />
          </div>
        </div>

        {/* 구분선을 기준으로 왼쪽(6):오른쪽(4)로 나누어져있음 */}
        {/* handleDividerMove를 통해 왼쪽 오른쪽 화면 비율 조정 */}
        <G_DividingLine onDivider={handleDividerMove} />

        {/* 오른쪽(4)에 해당하는 부분 */}
        <div className="right-panel mr-3 mt-1" style={{ width: `${panelWidths.right}%`, display: 'flex', flexDirection: 'column' }}>
          {/* 채팅 div */}
          <div
            className="ml-5 flex-grow mt-5"
            style={{ maxHeight: "calc(100% - 40px)", overflowY: "auto" }}
          >
            {/* 채팅창 */}
            <div className="chat-list mt-5 mb-20">
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
          <div className="flex justify-center items-center mt-1 mb-10">
            <div className="w-5/6">
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