import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import * as StompJs from '@stomp/stompjs';
import C_DividingLine from "./C_dividingLine";
import CompTopInfo from "./CompTopInfo";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useDispatch, useSelector } from "react-redux";
import Webrtc from "../../../../pages/test/Webrtc";
import MainVideo from "../../../../pages/test/MainVideo";
import { setStompClients, clearStompClient } from "../../../../features/arena/stompClientSlice";
import { disconectRtc } from "../../../../features/arena/rtcSlice";
import { setUserCoin } from "../../../../features/login/authSlice";
import axios from "axios";
import MaxPerson from '../../../../images/arena/CompView/MaxPerson.png'
import people from '../../../../images/arena/CompView/people.png'
import MaxCoin from '../../../../images/arena/CompView/MaxCoin.png'
import score from '../../../../images/arena/CompView/score.png'
import VS from '../../../../images/arena/HotMatch/VS.png'



export default function CompetitionView() {
  const userId = useSelector(state => state.auth.userId)
  const mycoin = useSelector(state => state.auth.userCoin)
  const [game,setGame] = useState({})
  const [betting,setBetting] = useState({})
  const params = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const [isBetting, setIsBetting] = useState(false)
  const [bettingCoin1, setBettingCoin1] = useState(0)
  const [bettingCoin2, setBettingCoin2] = useState(0)
  const dispatch = useDispatch();
  const stompClient = useSelector(state => state.stompClient.stompClient);
  const [elapsedTime, setElapsedTime] = useState(0);
  // const startTimeRef = useRef(startTime || 0);
  const timerRef = useRef(null);
  const [chatList, setChatList] = useState([]);
  const [chatMessage, setChatMessage] = useState('')
  const [inputMessage, setInputMessage] = useState('');
  const recentMessage = useRef(null);
  const [startTime, setStartTime] = useState();
  const [problemId, setProblemId] = useState();
  const sender = useRef(useSelector(state => state.auth.userNickname));

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=> {
    axios.get(`https://codearena.shop/game/chat/room?gameId=${params.id}`)
    .then(res => {
      console.log(res)
      setGame(res.data.data)
      setStartTime(res.data.data.startTime)
      setProblemId(res.data.data.problemId)
    })
    .catch(err => {
      console.log(err);
    })
    
  },[])

  const calculateElapsedTime = () => {
    console.log(startTime);
    console.log(new Date().getTime())
    const currentTime = new Date().getTime();
    const startTimeMillis = new Date(startTime).getTime();
    const elapsed = Math.floor((currentTime - startTimeMillis) / 1000);
    // 초를 시/분/초 형식으로 변환
    // const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    const formattedTime = `${minutes}분 ${seconds}초`;
    
    if (elapsed > 300) {
      setIsBetting(true)
    }

    if (elapsed % 60 === 0) {

    }

    setElapsedTime(formattedTime);
  };

  useEffect(() => {
    // const { startTime, problemId, gameMode } = location.state;
    // setStartTime(startTime);
    // 경기 시작 시간 확인
    console.log("경기 시작 시간 확인 :", startTime)
      
    const socket = new SockJS('https://codearena.shop/game/ws-stomp');
    const stompClient = Stomp.over(socket)
    dispatch(setStompClients(stompClient));
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
          console.log(msg);
          alert("게임이 종료되었습니다.")
          console.log('game', game.gameMode);
          console.log('game.gameMode', game.gameMode);
          if (!msg.winner) {
            if (game.gameMode === '1') {
              navigate(
                `/game-list/competition/compEffiDraw/${params.id}`,
              );
            } else {
              navigate(
                `/game-list/competition/compSpeedDraw/${params.id}`,
              );
            }
          } else {
            if (game.gameMode === '1') {
              navigate(
                `/game-list/competition/compEffiResult/${params.id}`,
              );
            } else {
              navigate(
                `/game-list/competition/compSpeedResult/${params.id}`,
              );
            }
          }
        }
        else if (msg.type && msg.type === "TERMINATED") {
          alert("경기가 종료되었습니다.")
          if (game.gameMode === '1') {
            navigate(
              `/game-list/competition/compEffiDrow/${params.id}`,
            );
          } else {
            navigate(
              `/game-list/competition/compSpeedDrow/${params.id}`,
            );
          }
        }
      });
    }, error => {
      // 에러
      console.error("경쟁전 채팅 연결에서 에러가 발생했어요.", error)
      alert("연결에 문제가 있습니다. 다시 시도해주세요.")
      // 필요한 경우 여기에서 재연결 로직을 구현
    });
    dispatch(setStompClients(stompClient));
    // startTime 시간 - 진행된 시간 계산

    timerRef.current = setInterval(calculateElapsedTime, 1000);
    return () => {

      clearInterval(timerRef.current)
      console.log("채팅 연결을 종료합니다.")
      stompClient.disconnect();
      dispatch(clearStompClient());
    }
  }, [chatList, params.id]);
  // 입장했을 때 1번만 알림 보내기

  useEffect(()=> {
    setTimeout(() => {
      setChatList([])
    }, 200);
  },[])


//   const handleEnterMessage = () => {
//     console.log("입장 메세지를 전달합니다.")
//     if (stompClient && stompClient.connected ) {
//       stompClient.send(`/pub/chat/message`, {}, JSON.stringify({
//         gameId: params.id,
//         sender: sender.current,
//         message: '경쟁전에 누군가 입장했어요!',
//         type: 'ENTER',
//     }))
//   } else {
//     const socket = new SockJS('https://codearena.shop/game/ws-stomp');
//     const stompClient = Stomp.over(socket);
//     dispatch(setStompClients(stompClient));
//     console.log("useEffect stompClient :", stompClient)
//     stompClient.connect({}, () => {
//       // 연결
//       console.log("손님이 입장하여 stompClient 연결이 시도되었습니다.")
//       stompClient.send(`/pub/chat/message`, {}, JSON.stringify({
//         gameId: params.id,
//         sender: sender.current,
//         message: '경쟁전에 누군가 입장했어요!',
//         type: 'ENTER',
//     }))
//     }, error => {
//       console.error("경쟁전 입장 연결 에러가 발생했어요.", error)
//       alert("입장에 문제가 있습니다. 다시 시도해주세요.")
//     });
//   }
// }
//   useEffect(() => {
//     handleEnterMessage();
//   }, [])
  // 메세지 보내기 조작할 함수
  const handleSendMessage = (event) => {
    if (event) {
      event.preventDefault();
    } // 새로고침 방지
    if (stompClient && stompClient.connected && inputMessage.trim() !== '') {
      console.log("메시지 채팅 하나를 보냈어요.")
      console.log("gameId를 확인합니다. :", params.id)
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify({
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
  
  
  const onChangeBetting1 = (e) => {
    const num = parseInt(e.target.value)
    if  (num < 1) {
      setBettingCoin1(0)
    } else if (num > mycoin){
      setBettingCoin1(mycoin)
    } else if (num <= mycoin) {
      setBettingCoin1(num)
    } else {
      setBettingCoin1(0)
    }
    console.log(bettingCoin1);
  } 

  const onChangeBetting2 = (e) => {
    const num = parseInt(e.target.value)
    if (num <= mycoin) {
      setBettingCoin2(num)
    } else if (num > mycoin){
      setBettingCoin2(mycoin)
    } else if (num < 1) {
      setBettingCoin2(0)
    } else {
      setBettingCoin2(0)
    }
    console.log(bettingCoin2);
  } 


  const clickBetting1 = () => {
    const data = {
      gameId : params.id,
      userId : userId,
      playerId : game.userRed,
      batCoin : bettingCoin1,
    }
    axios.post('https://codearena.shop/game/batting/player',data)
    .then(res => {
      console.log(res)
      dispatch(setUserCoin(mycoin-bettingCoin1))
    })
    .catch(err => {
      console.log(err);
    })
    
    axios.get(`https://codearena.shop/game/batting/status?gameId=${params.id}&player1Id=${game.userRed}&player2Id=${game.userBlue}`)
    .then(res => {
      console.log(res)
      setBetting(res.data.data)
    })
    .catch(err => {
      console.log(err);
    })
    document.getElementById('bettingModal').close()

    setIsBetting(true)  

  }

  const clickBetting2 = () => {
    const data = {
      gameId : params.id,
      userId : userId,
      playerId : game.userBlue,
      batCoin : bettingCoin2,
    }
    axios.post('https://codearena.shop/game/batting/player',data)
    .then(res => {
      console.log(res)
      dispatch(setUserCoin(mycoin-bettingCoin2))
    })
    .catch(err => {
      console.log(err);
    })
    
    axios.get(`https://codearena.shop/game/batting/status?gameId=${params.id}&player1Id=${game.userRed}&player2Id=${game.userBlue}`)
    .then(res => {
      console.log(res)
      setBetting(res.data.data)
    })
    .catch(err => {
      console.log(err);
    })
    document.getElementById('bettingModal').close()

    setIsBetting(true)  

  }

  const onClickBettingStatus = () => {
    
    axios.get(`https://codearena.shop/game/batting/status?gameId=${params.id}&player1Id=${game.userRed}&player2Id=${game.userBlue}`)
    .then(res => {
      console.log(res)
      setBetting(res.data.data)
    })
    .catch(err => {
      console.log(err);
    })
    document.getElementById('bettingModal').showModal()
  }


  return (
    <div>
      <CompTopInfo game={game} gameExitId={params.id} problemId={problemId}/>
      <div className="competition-view">
        {/* 왼쪽(6)에 해당하는 부분 */}
        <div className="left-panel ml-3 mr-3 mt-1" style={{ width: `${panelWidths.left}%`}}>
          <div
            className="p-4"
            style={{ width: '100%', height: '90%', backgroundColor: '#F5EBDB' }}
          >
            
            {/* "유저1의 화면이 보이는 공간 vs 유저2의 화면이 보이는 공간" */}
            {/* 각 유저의 화면 구성 (추가적인 스타일 및 컨텐츠 추가 필요) */}
            <div>
              <div className=" rounded-lg flex justify-between items-end">
                <Webrtc 
                  userNickname={sender.current}
                  customSessionId={params.id}
                  isPlayer={false}
                  width={`200px`}
                  height={`100px`}
                />
                <div className="">
                  <p className="text-lg font-bold">{`경과 시간: ${elapsedTime}`}</p>
                  <button  onClick={onClickBettingStatus}
                  className="btn bg-rose-200 w-full text-lg">배팅현황</button>
                </div>
              </div>
              <div className=" rounded-lg mt-4 w-full" >
                <MainVideo height={`500px`} width={`${panelWidths.left * 3.75}%`} />
              </div>
            </div>
          </div>
        </div>
        {/* 구분선을 기준으로 왼쪽(6):오른쪽(4)로 나누어져있음 */}
        {/* handleDividerMove를 통해 왼쪽 오른쪽 화면 비율 조정 */}
        <C_DividingLine onDividerMove={handleDividerMove} />
        {/* 오른쪽(4)에 해당하는 부분 */}
        <div className="right-panel mr-3 relative" style={{ width: `${panelWidths.right}%`, display: 'flex', flexDirection: 'column' }}>
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
          <form onSubmit={handleSendMessage} className="grid grid-cols-12">
            <input
              type="text"
              className="rounded-full border-2 border-gray-300 px-4 py-2 flex-grow focus:outline-none focus:border-blue-400 col-span-9" 
              placeholder=" 메시지를 입력하세요...!"
              value={inputMessage}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
            <button
              type="submit"
              className="bg-blue-300 text-white rounded-full px-4 py-2 ml-2 focus:outline-none col-span-3"
            >
              입력
            </button>
          </form>
        </div>
      
      
      
      
      <dialog id="bettingModal" className="modal">
        <div style={{backgroundColor: '#F5EBDB'}} className="modal-box text-black p-10 w-8/12 max-w-3xl ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center">배팅</h3>
          <div className="flex justify-around items-center">
            <div>
              <div className="w-36 h-36">
                <img className="h-full w-full" src={game?.userRedSsumnail} alt="플레이어1 이미지" />
              </div>
              <p className="text-2xl mb-2 text-center">{game?.userRedNickname}</p>
            </div>
            <div>
              <img src={VS} alt="vs" className="w-12"/>
            </div>
            <div>
              <div className=" w-36 h-36">
                <img className="h-full w-full" src={game?.userBlueSsumnail} alt="플레이어2 이미지" />
              </div>
              <p className="text-2xl mb-2 text-center">{game?.userBlueNickname}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center border-r border-gray-400">
             
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center mb-2 tooltip" data-tip="레이팅">
                    <img src={score} alt="people" className="h-6"/>
                    {
                    game?.gameMode === '1' ?
                    <p className="ms-2">{game?.userRedEffiRating}</p>
                    :
                    <p className="ms-2">{game?.userRedSpeedRating}</p>
                    }
                  </div>
                  <div className="flex items-center mb-2 tooltip" data-tip="배팅한 사람수">
                    <img src={people} alt="people" className="h-6"/>
                    <p className="ms-2">{betting.player1BatPeople}</p>
                  </div>
                  <div className="flex items-center mb-2 tooltip" data-tip="최대 배팅 닉네임">
                    <img src={MaxPerson} alt="people" className="h-6"/>
                    <p className="ms-2">{betting.player1MaxUserNickname || '-'}</p>
                  </div>
                  <div className="flex items-center mb-2 tooltip" data-tip="최대 배팅 코인">
                    <img src={MaxCoin} alt="people" className="h-6"/>
                    <p className="ms-2">{betting.player1MaxCoin || '-'}</p>
                  </div>
                </div> 
                <div className="flex justify-center items-center">
                  <p className="text-5xl font-bold text-red-500">{betting.player1Ratio}%</p>
                </div>
              </div>


              
              {!isBetting ?
              <div className="flex join justify-center">
                <input value={bettingCoin1} onChange={onChangeBetting1} step="100" type="number" className="input input-sm input-bordered w-24 join-item"></input>
                <button onClick={clickBetting1} className="btn join-item btn-sm" value={1}>배팅</button>
              </div>
              :
              null
              }
            </div>
            <div className="flex flex-col items-center">
              
              <div className="grid grid-cols-2">
                <div className="flex justify-center items-center">
                  <p className="text-5xl font-bold text-blue-500">{betting.player2Ratio}%</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-2 tooltip" data-tip="레이팅">
                    {
                    game?.gameMode === '1' ?
                    <p className="me-2">{game?.userBlueEffiRating}</p>
                    :
                    <p className="me-2">{game?.userBlueSpeedRating}</p>
                    }
                    <img src={score} alt="people" className="h-6"/>
                  </div>
                  <div className="flex items-center mb-2 tooltip" data-tip="배팅한 사람수">
                    <p className="me-2">{betting.player2BatPeople}</p>
                    <img src={people} alt="people" className="h-6"/>
                  </div>
                  <div className="flex items-center mb-2 tooltip" data-tip="최대 배팅 닉네임">
                    <p className="me-2">{betting.player2MaxUserNickname || '-'}</p>
                    <img src={MaxPerson} alt="people" className="h-6"/>
                  </div>
                  <div className="flex items-center mb-2 tooltip" data-tip="최대 배팅 코인">
                    <p className="me-2">{betting.player2MaxCoin || '-'}</p>
                    <img src={MaxCoin} alt="people" className="h-6"/>
                  </div>
                </div> 
              </div>
              
              {!isBetting ?
              <div className="flex join justify-center">
                <input value={bettingCoin2} onChange={onChangeBetting2} step="100" type="number" className="input input-sm input-bordered w-24 join-item"></input>
                <button onClick={clickBetting2} className="btn join-item btn-sm" value={2}>배팅</button>
              </div>
              :
              null
              }
            </div>
          </div>
        </div>
      </dialog>
      
      </div>
      
        
    </div>
  );
} 