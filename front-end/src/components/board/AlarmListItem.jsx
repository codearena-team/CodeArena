import "../css/ProblemListItem.css"

export default function AlarmListItem(probs) {

  return(
    <tr className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      <th className="p-1">{probs.alarmItem.alarmId}</th>
      {/* <th className="p-1">{probs.problemItem.problemRating}</th> */}
    </tr>
  )
}