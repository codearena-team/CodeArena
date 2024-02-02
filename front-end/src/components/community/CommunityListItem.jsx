import { useNavigate } from "react-router-dom";
import "../css/ProblemListItem.css";



export default function CommunityListItem(probs) {
  const navigate = useNavigate();
  const onClick = () => {
    console.log(probs.communityItem.communityId);
    // navigate((`/community/${probs.communityItem.communityId}/detail`))
  }
  return(
    <tr onClick={onClick} className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1">{probs.communityItem.articleNo}</th>
      <th className="p-1">{probs.communityItem.problemId}</th>
      <th className="p-1">{probs.communityItem.title}</th>
      <th className="p-1">{probs.communityItem.lang}</th>
      <th className="p-1">{probs.communityItem.userId}</th>
      <th className="p-1">{probs.communityItem.hit}</th>
      <th className="p-1">{probs.communityItem.spoiler}</th>
      <th className="p-1">{probs.communityItem.date}</th>
    </tr>
  )
}