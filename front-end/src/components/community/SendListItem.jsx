// 보낸 알림함 리스트
import "../css/ProblemListItem.css"
// import { useState } from "react";

export default function SendListItem(probs) {
  const cate = probs.sendItem.alarmType
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
    <tr className={((probs.isRead)===1) ? 'even ' : ''} >
      <th className="p-1">{probs.sendItem.alarmId}</th>
      <th className="p-1">{word}</th>
      {/* 처리여부는 드롭다운박스 */}
      <th className="p-1">{probs.sendItem.alarmStatus}</th>
      <th className="p-1">{probs.sendItem.alarmMsg}</th>
      <th className="p-1">{probs.sendItem.toNickname}</th>
      <th className="p-1">{probs.sendItem.alarmDate}</th>
    </tr>
  )
}