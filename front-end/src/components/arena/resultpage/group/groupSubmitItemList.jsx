// 효율전 결과페이지에 나올 문제제출목록의 아이템이될 페이지
// 지금은더미데이터

export default function SubmitListItem (probs){
  //axios요청받아서 list만들기
  return(
    <tr className="cell-height2 border-b-2 border-gray">
    <th className="p-1 font-thin">{probs.submit.submitNo}</th>
    <th className="p-1 font-thin">{probs.submit.userNickname}</th>
    <th className="p-1 font-thin">{probs.submit.submitStatus}</th>
    {/* <th className="p-1">{probs.communityItem.title} {probs.communityItem.spoiler===1 && <span className="text-red-500">(코드 포함)</span>}</th> */}
    <th className="p-1 font-thin">{probs.submit.memory}</th>
    <th className="p-1 font-thin">{probs.submit.timeComplexity}</th>
    <th className="p-1 font-thin">{probs.submit.submitLang}</th>
    {/* <th className="p-1">{probs.communityItem.spoiler}</th> */}
    <th className="p-1 font-thin">{probs.submit.submitDate.split(' ')[0]}</th> 
    <hr  />
  </tr>
  )
}