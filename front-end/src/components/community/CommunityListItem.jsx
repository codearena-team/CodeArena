import { useNavigate } from "react-router-dom";
import "../css/ProblemListItem.css";



export default function CommunityListItem(probs) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate((`/community/${probs.communityItem.articleNo}/detail`))
  }
  return(
    <tr onClick={onClick} className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1">{probs.communityItem.articleNo}</th>
      <th className="p-1">{probs.communityItem.problemId}</th>
      <th className="p-1">{probs.communityItem.title}</th>
      {/* <th className="p-1">{probs.communityItem.title} {probs.communityItem.spoiler===1 && <span className="text-red-500">(코드 포함)</span>}</th> */}
      <th className="p-1">{probs.communityItem.lang}</th>
      <th className="p-1">{probs.communityItem.userId}</th>
      <th className="p-1">{probs.communityItem.hit}</th>
      {/* <th className="p-1">{probs.communityItem.spoiler}</th> */}
      <th className="p-1">{probs.communityItem.date.split(' ')[0]}</th>
    </tr>
  )
}