import "../css/ProblemListItem.css"

export default function AlarmListItem(probs) {

  return(
    <tr className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      {/* 처리여부는 드롭다운박스 */}
      {/* <th> 
        <select value={} onChange={} className="select select-sm select-bordered w-28" >
          <option>처리중</option>
          <option>승인</option>
          <option>거절</option>
        </select>
      </th> */}
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
    </tr>
  )
}