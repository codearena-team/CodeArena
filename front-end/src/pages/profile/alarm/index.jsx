import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AlarmListItem from "../../../components/community/AlarmListItem.jsx"
import "../../css/problemsolve.css"
import axios from "axios"

export default function Alarm() {
  // 알림 종류(받은알림, 보낸알림)
  const [alarmtype, setAlarmtype] = useState('received') 
  // 처리여부 드롭다운 
  const [process, setProcess] = useState('처리중')  
  const params = useParams()
  const pgno = params.pgno
  const [alarmList, setAlarmList] = useState([])

  // 알림 목록 요청보내기 AlarmList 에 추가
  // useEffect(()=> {
  //   axios({
  //     method : 'get',
  //     url : '',
  //   })
  //   .then((res)=> {
  //     console.log(res);
  //     setAlarmList(res.data.data.problemWithSearch)
  //   })
  //   .catch((err)=> {
  //     console.log(err);
  //   })
  // },[pgno])
  

  return(
    <div className="mx-10 flex flex-col">
      <div className="flex justify-between align-middle">
        <div className="flex items-end">
          {/* 클릭시에 받은알림 , 보낸알림 목록 axios요청하는 함수 */}
          <button onClick={(e)=>{setAlarmtype(e.target.value)}} className={alarmtype==='received' ? 'orderBy' : 'orderBy unchoice'} value='received'>받은알림</button>  
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
                <th className="p-1.5">작성자</th>
                <th className="p-1.5">날짜</th>
              </tr>
            </thead>
            {/* <tbody className="font-normal">
             {alarmList.map((alarmItem,index)=>{
              return(
             <AlarmListItem 
              key={alarmItem.alarmId}
              alarmItem={alarmItem}
              index={index}
             />
             )})}
            </tbody> */}
            
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