import "../css/ProblemListItem.css"
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
    
    <tr className={((probs.index%2)===0) ? 'even ' : ''} >
      <th className="p-1 font-light">{probs.submitItem.submitNo}</th>
      <th className="p-1 font-light">{probs.submitItem.userNickname}</th>
      <th className="p-1 font-light">{probs.submitItem.problemId}</th>
      
      <div className="flex justify-center">
        <th className="p-1 font-light">{probs.submitItem.submitStatus}</th>
        {probs.submitItem.testCase ? 
        <div>
          <button className="btn btn-xs btn-neutral rounded-full  font-light" 
          onClick={()=>document.getElementById(`testCaseModal${probs.submitItem.submitNo}`).showModal()}>
          테케보기</button>
          <TestCaseModal 
          testcase={[probs.submitItem.testCase]}
          submitNo={probs.submitItem.submitNo}/>
        </div> : <div></div>}
      </div>
      
      <th className="p-1 font-light">{probs.submitItem.memory}</th>
      <th className="p-1 font-light">{probs.submitItem.timeComplexity}</th>
      <th className="p-1 font-light">{probs.submitItem.submitLang}</th>
      <th className="p-1 font-light">
        <button className="btn btn-xs btn-neutral rounded-full"
          onClick={()=>document.getElementById(`codeModal${probs.submitItem.submitNo}`).showModal()}>
          코드보기
        </button>
        <dialog id={`codeModal${probs.submitItem.submitNo}`} className="modal">
          <div className="modal-box p-0 scrollBar" style={{maxWidth:"1000px", width:"60%"}}>
            <div className='z-50 sticky p-2' style={{backgroundColor:"#F4ECE4", top:"0px"}}>
              <form method="dialog" className='flex justify-between' >
                <div className='w-36'>
                </div>
                <div>
                  <h3 className="font-bold text-2xl">제출 코드</h3>
                </div>
                <div className='flex justify-end w-36'>
                  <button className="btn btn-sm btn-circle btn-ghost text-2xl">✕</button>
                </div>
              </form>
            </div>
            <CodeMirror value={probs.submitItem.code || ''}  extensions={[java(),python(),cpp()]} editable={false}/>
          </div>
        </dialog>
      </th>
      <th className="p-1 font-light">{probs.submitItem.submitDate}</th>
      {/* <th className="p-1">{probs.submitItem.problemRating}</th> */}
    </tr>
  )
}