import "../css/ProblemListItem.css"

export default function SubmitItem(probs) {
  const onClick = () => {
  }

  return(
    
    <tr onClick={onClick} className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1">{probs.submitItem.submitNo}1</th>
      <th className="p-1">{probs.submitItem.userNickname}</th>
      <th className="p-1">{probs.submitItem.problemId}</th>
      <th className="p-1">{probs.submitItem.submitStatus}
      {probs.submitItem.testCase ? <button className="btn btn-xs btn-neutral rounded-full">코드보기</button> : <div></div>}
      </th>
      <th className="p-1">{probs.submitItem.memory}</th>
      <th className="p-1">{probs.submitItem.timeComplexity}</th>
      <th className="p-1">{probs.submitItem.submitLang}</th>
      <th className="p-1"><button className="btn btn-xs btn-neutral rounded-full">코드보기</button></th>
      <th className="p-1">{probs.submitItem.submitDate}</th>
      {/* <th className="p-1">{probs.submitItem.problemRating}</th> */}
    </tr>
  )
}