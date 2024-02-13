// 보낸 알림함 리스트
import "../css/ProblemListItem.css"
// import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function SendListItem(probs) {
  const cate = probs.sendItem.alarmType
  const navigate = useNavigate()
  let word = ""
  const alarmMsg = probs.sendItem.alarmMsg

  if (cate === 1){
    word = "문제생성요청";
  } else if (cate === 2){
    word = "문제수정요청"
  } else if (cate === 3){
    word = "게임초대"
  } else if (cate === 4){
    word = "공지사항"
  }

  const onClick = ()=>{
    const match = alarmMsg.match(/\d+$/);
    const problemNumber = match ? match[0] : null;
    console.log(problemNumber); 
    navigate(`/problem/${problemNumber}/detail`)
  }

  return(
    <tr >
      <th className="p-1 font-thin">{probs.sendItem.alarmId}</th>
      <th className="p-1 font-thin">{word}</th>
      {/* 처리여부는 드롭다운박스 */}
      <th className="p-1 font-thin" onClick={onClick}>{probs.sendItem.alarmStatus}</th>
      <th className="p-1 font-thin">{probs.sendItem.alarmMsg}</th>
      <th className="p-1 font-thin">{probs.sendItem.toNickname}</th>
      <th className="p-1 font-thin">{probs.sendItem.alarmDate}</th>
    </tr>
  )
}