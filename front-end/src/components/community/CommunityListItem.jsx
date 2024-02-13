import { useNavigate } from "react-router-dom";
import "../css/ProblemListItem.css";



export default function CommunityListItem(probs) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate((`/community/${probs.communityItem.articleNo}/detail`))
  }
  return(

    <tr onClick={onClick} className="cell-height2 border-b-2 border-gray"
    style={{cursor:"pointer"}}>
      <th className="p-1 font-thin" >{probs.communityItem.articleNo}</th>
      <th className="p-1 font-thin">{probs.communityItem.problemId}</th>
      <th className="p-1 font-thin">{probs.communityItem.title}</th>
      {/* <th className="p-1">{probs.communityItem.title} {probs.communityItem.spoiler===1 && <span className="text-red-500">(코드 포함)</span>}</th> */}
      <th className="p-1 font-thin">{probs.communityItem.lang}</th>
      <th className="p-1 font-thin">{probs.communityItem.nickName}</th>
      <th className="p-1 font-thin">{probs.communityItem.hit}</th>
      {/* <th className="p-1">{probs.communityItem.spoiler}</th> */}
      <th className="p-1 font-thin">{probs.communityItem.date.split(' ')[0]}</th> 
      <hr  />
    </tr>

  )
}