
import TestCaseModal from "./TestcaseModal";
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';

export default function SubmitItem(probs) {
  let code = ''
  if (probs.submitItem.code === null) {
    code = ""
  } else {
    code = probs.submitItem.code
  }
  return(
    
    <tr className=" border-b-2" >
      <th className="p-1 font-light">{probs.submitItem.submitNo}</th>
      <th className="p-1 font-light">{probs.submitItem.userNickname}</th>
      <th className="p-1 font-light">{probs.submitItem.problemId}</th>
      
      <div className="flex justify-center">
        <th className="p-1 font-light">{probs.submitItem.submitStatus}</th>
        {/* {probs.submitItem.testCase ? 
        <div>
          <button className="btn btn-xs btn-neutral rounded-full  font-light" 
          onClick={()=>document.getElementById(`testCaseModal${probs.submitItem.submitNo}`).showModal()}>
          테케보기</button>
          <TestCaseModal 
          testcase={[probs.submitItem.testCase]}
          submitNo={probs.submitItem.submitNo}/>
        </div> : <div></div>} */}
      </div>
      
      <th className="p-1 font-light">{probs.submitItem.memory}</th>
      <th className="p-1 font-light">{probs.submitItem.timeComplexity}</th>
      <th className="p-1 font-light">{probs.submitItem.submitLang}</th>
      <th className="p-1 font-light">{probs.submitItem.code?.length}</th>
      <th className="p-1 font-light">{probs.submitItem.submitDate}</th>
      {/* <th className="p-1">{probs.submitItem.problemRating}</th> */}
    </tr>
  )
}