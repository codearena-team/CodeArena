//받은 알림함 리스트
import "../css/ProblemListItem.css"
import { useState } from "react"

export default function ReceiveListItem(probs) {
  const cate = probs.receiveItem.alarmType
  const [alarmStatus,setAlarmStatus] = useState(probs.receiveItem.alarmStatus)
  let word = ""

  if (cate === 1){
    word = "문제생성요청";
  } else if (cate === 2){
    word = "문제수정요청"
  } else if (cate === 3){
    word = "게임초대"
  } else if (cate === 4){
    word = "공지사항"
  }


  return(
    <tr className={((probs.isRead)===1) ? 'even' : ''} >
      <th className="p-1 font-thin">{probs.receiveItem.alarmId}</th>
      <th className="p-1 font-thin">{word}</th>
      {/* 처리여부는 드롭다운박스 */}
      <th> 
        <select value={alarmStatus} onChange={(e)=>{setAlarmStatus(e.target.value)}} className="select select-sm font-thin select-bordered w-28" >
          <option>처리중</option>
          <option>처리완료</option>
          <option>거절</option>
        </select>
      </th>
      <th className="p-1 font-thin">{probs.receiveItem.alarmMsg}</th>
      <th className="p-1 font-thin">{probs.receiveItem.fromNickname}</th>
      <th className="p-1 font-thin">{probs.receiveItem.alarmDate}</th>
    </tr>
  )
}