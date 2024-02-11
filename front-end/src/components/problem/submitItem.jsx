
import TestCaseModal from "./TestcaseModal";
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';

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
        {/* {props.submitItem.testCase ? 
        <div>
          <button className="btn btn-xs btn-neutral rounded-full  font-light" 
          onClick={()=>document.getElementById(`testCaseModal${props.submitItem.submitNo}`).showModal()}>
          테케보기</button>
          <TestCaseModal 
          testcase={[props.submitItem.testCase]}
          submitNo={props.submitItem.submitNo}/>
        </div> : <div></div>} */}
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