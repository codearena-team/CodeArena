import "../../pages/css/ProblemListItem.css";


export default function ProblemListItem(probs) {

  return(
    <tr className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1">{probs.problemItem.problemId}</th>
      <th className="p-1">{probs.problemItem.problemTitle}</th>
      <th className="p-1">{probs.problemItem.userNickname}</th>
      <th className="p-1">{probs.problemItem.acceptCount}</th>
      <th className="p-1">{probs.problemItem.submitCount}</th>
      <th className="p-1">{probs.problemItem.percentage}</th>
      {/* <th className="p-1">{probs.problemItem.problemRating}</th> */}
    </tr>
  )
}