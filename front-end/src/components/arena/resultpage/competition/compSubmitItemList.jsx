// 효율전 결과페이지에 나올 문제제출목록의 아이템이될 페이지
// 지금은더미데이터

export default function SubmitListItem (probs){
  //axios요청받아서 list만들기
  return(
    <tr className="cell-height2 border-b-2 border-gray">
    <th className="p-1 font-thin">{probs.submitItem.submitNo}</th>
    <th className="p-1 font-thin">{probs.submitItem.userNickname}</th>
    <th className="p-1 font-thin">{probs.submitItem.submitStatus}</th>
    {/* <th className="p-1">{probs.communityItem.title} {probs.communityItem.spoiler===1 && <span className="text-red-500">(코드 포함)</span>}</th> */}
    <th className="p-1 font-thin">{probs.submitItem.memory}</th>
    <th className="p-1 font-thin">{!probs.submitItem.timeComplexity ? '' : probs.submitItem.timeComplexity + ' ms' }</th>
    <th className="p-1 font-thin">{probs.submitItem.submitLang}</th>
    {/* <th className="p-1">{probs.communityItem.spoiler}</th> */}
    <th className="p-1 font-thin">{probs.submitItem.submitDate.split(' ')[1]}</th> 
    <hr  />
  </tr>



  )
}