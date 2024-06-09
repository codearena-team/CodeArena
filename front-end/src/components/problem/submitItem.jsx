
export default function SubmitItem(props) {
  let code = ''
  if (props.submitItem.code === null) {
    code = ""
  } else {
    code = props.submitItem.code
  }
  return(
    
    <tr className=" border-b-2" >
      <th className="p-1 font-light">{props.submitItem.submitNo}</th>
      <th className="p-1 font-light">{props.submitItem.userNickname}</th>
      <th className="p-1 font-light">{props.submitItem.problemId}</th>
      
      <div className="flex justify-center">
        <th className="p-1 font-light">{props.submitItem.submitStatus}</th>
      </div>
      
      <th className="p-1 font-light">{props.submitItem.memory}</th>
      <th className="p-1 font-light">{props.submitItem.timeComplexity}</th>
      <th className="p-1 font-light">{props.submitItem.submitLang}</th>
      <th className="p-1 font-light">{props.submitItem.code?.length}</th>
      <th className="p-1 font-light">{props.submitItem.submitDate}</th>
      {/* <th className="p-1">{props.submitItem.problemRating}</th> */}
    </tr>
  )
}