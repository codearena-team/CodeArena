import { useEffect, useState } from "react"
import ReceiveListItem from "../../../components/community/ReceiveListItem.jsx"
import SendListItem from "../../../components/community/SendListItem.jsx"
import "../../css/problemsolve.css"
import axios from "axios"
import { useSelector } from 'react-redux'

export default function Alarm() {
  // 알림 종류(받은알림, 보낸알림)
  const userId = useSelector(state => state.auth.userId)
  const [alarmtype, setAlarmtype] = useState('receive') 
  // 처리여부 드롭다운 
  const [process, setProcess] = useState('처리중')  
  const [sendList, setSendList] = useState([])
  const [receiveList, setReceiveList] = useState([])


  // 알림 목록 요청보내기 렌더링 될때는 기본이 받는알림함보기
  useEffect(()=> {
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/alarm/receive?userId=${userId}`,
      method : 'get',
    })
    .then((res)=>{
      console.log(res)
      setReceiveList(res.data.data) //[{},{},{}....이런식]
      // alarmDate : 날짜 , alarmId : 알림글번호 , alarmMsg :알림내용, 
      // alarmType: 알림종류 *(알림 타입 = 1 : 문제 생성 요청, 2 : 문제 수정 요청, 3 : 게임 초대, 4 : 공지사항 *)
      // fromId 보낸사람
      // isRead : 알림읽음 여부
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])

  useEffect(()=>{
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/alarm/send/list?userId=${userId}`,
      method : 'get',
    })
    .then((res)=>{
      console.log(res)
      setSendList(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  return(
    <div className="mx-10 flex flex-col">
      <div className="flex justify-between align-middle">
        <div className="flex items-end">
          {/* 클릭시에 받은알림 , 보낸알림 목록 axios요청하는 함수 */}
          <button onClick={(e)=>{setAlarmtype(e.target.value)}} className={alarmtype==='receive' ? 'orderBy' : 'orderBy unchoice'} value='receive'>받은알림</button>  
          <button onClick={(e)=>{setAlarmtype(e.target.value)}} className={alarmtype==='send' ? 'orderBy' : 'orderBy unchoice'} value='send'>보낸알림</button>
        </div>
      </div>
      <div>
        {/* 알림 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="problemTable w-full">
            <thead>
              <tr>
                <th className="p-1.5">번호</th>
                <th className="p-1.5">카테고리</th>
                <th className="p-1.5">처리여부</th>
                <th className="p-1.5 w-1/2">내용</th>
                <th className="p-1.5">{(alarmtype==='send') ?'받은사람' : '보낸사람'}</th>
                <th className="p-1.5">날짜</th>
              </tr>
            </thead>

            <tbody className="font-normal">
              {alarmtype === 'receive'?(
                receiveList.map((receiveItem,index) => (
                  <ReceiveListItem 
                  key={receiveItem.receiveId}
                  receiveItem={receiveItem}
                  index={index}
                  />
                ))
                ) :( 
                  sendList.map((sendItem,index) => (
                    <SendListItem 
                    key={sendItem.sendId}
                    sendItem={sendItem}
                    index={index}
                    />
                  ))
                )}
                        
           </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div class="join flex justify-center my-2">
        <button class="join-item btn btn-sm">1</button>
        <button class="join-item btn btn-sm btn-active">2</button>
        <button class="join-item btn btn-sm">3</button>
        <button class="join-item btn btn-sm">4</button>
      </div>
    </div>
  )
}