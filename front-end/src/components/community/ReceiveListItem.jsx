//받은 알림함 리스트
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function ReceiveListItem(probs) {
  const navigate = useNavigate()
  const cate = probs.receiveItem.alarmType
  const alarmId = probs.receiveItem.alarmId
  const [alarmStatus,setAlarmStatus] = useState(probs.receiveItem.alarmStatus.trim())
  let word = ""
  const alarmMsg = probs.receiveItem.alarmMsg

  if (cate === 1){
    word = "문제생성요청";
  } else if (cate === 2){
    word = "문제수정요청"
  } else if (cate === 3){
    word = "게임초대"
  } else if (cate === 4){
    word = "공지사항"
  }
  // 받은알림 처리여부 저장하기
  const changeAlarmStatus = (e)=>{
     setAlarmStatus(e.target.value)

    axios({
      url : `https://i10d211.p.ssafy.io/api/alarm/statusChange?alarmId=${alarmId}&alarmStatus=${e.target.value}`,
      method : 'put',
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const [split ,split2] = probs.receiveItem.alarmMsg.split(".")

  const onClick = ()=>{
    const match = alarmMsg.match(/\d+$/);
    const problemNumber = match ? match[0] : null;
    console.log(problemNumber); 
    navigate(`/problem/${problemNumber}/detail`)
  }

  return(
    <tr>
      <th className="p-1 font-thin">{probs.receiveItem.alarmId}</th>
      <th className="p-1 font-thin">{word}</th>
      {/* 처리여부는 드롭다운박스 */}
      <th> 
        <select onChange={changeAlarmStatus} 
        value={alarmStatus}
        className="select select-sm font-thin select-bordered w-28"
        style={{outline:'none'}}>
          <option value="요청 대기">요청 대기</option>
          <option value="처리완료">처리완료</option>
          <option value="거절">거절</option>
        </select>
      </th>
      <th className="p-1 font-thin" onClick={onClick}>{split}
        <span style={{textDecoration: "underline",cursor:'pointer' }}>{split2}</span>
      </th>
      <th className="p-1 font-thin">{probs.receiveItem.fromNickname}</th>
      <th className="p-1 font-thin">{probs.receiveItem.alarmDate}</th>
    </tr>
  )
}