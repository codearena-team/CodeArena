import { useNavigate } from "react-router-dom";
import "../css/ProblemListItem.css"

export default function ProblemListItem(probs) {
  const navigate = useNavigate();
  const onClick = () => {
    console.log(probs.problemItem.problemId);
    navigate((`/problem/${probs.problemItem.problemId}/detail`))
  }
  return(
    <tr onClick={onClick} className="font-sulight" >
      <th className="p-1">{probs.problemItem.problemId}</th>
      <th className="p-1">{probs.problemItem.problemTitle}</th>
      <th className="p-1">{probs.problemItem.userNickname}</th>
      <th className="p-1">{probs.problemItem.acceptCount}</th>
      <th className="p-1">{probs.problemItem.submitCount}</th>
      <th className="p-1">{probs.problemItem.percentage}</th>
    </tr>
  )
}