import { useSelector } from "react-redux";
import TestCaseModal from "./TestcaseModal";
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';

export default function WindowSubmitItem(props) {
  const userNickname = useSelector(state => state.auth.userNickname)
  let code = ''
  if (props.submitItem.code === null) {
    code = ""
  } else {
    code = props.submitItem.code
  }
  return(
    
    <tr className=" border-b-2" >
      <th className="p-1 font-light">{props.submitItem.userNickname}</th>
      
      <th className="p-1 flex justify-center pt-4">
        <span className=" font-light">{props.submitItem.submitStatus}</span>
        {props.submitItem.testCase ? 
        <div>
          <button className={`btn btn-xs btn-neutral rounded-full font-light ${userNickname===props.submitItem.userNickname ? '' : 'hidden'}`}
          onClick={()=>document.getElementById(`testCaseModal${props.submitItem.submitNo}`).showModal()}
          >
          테케보기</button>
          <TestCaseModal 
          testcase={[props.submitItem.testCase]}
          submitNo={props.submitItem.submitNo}/>
        </div> : <div></div>}
      </th>
      
      <th className="p-1 font-light">{props.submitItem.memory}</th>
      <th className="p-1 font-light">{props.submitItem.timeComplexity}</th>
      <th className="p-1 font-light">{props.submitItem.submitLang}</th>
      <th className={`p-1 font-light ${props.isSolve ? '' : 'hidden'}`}>
        <button className={`btn btn-xs btn-neutral rounded-full `}
          onClick={()=>document.getElementById(`codeModal${props.submitItem.submitNo}`).showModal()}>
          코드보기
        </button>
        <dialog id={`codeModal${props.submitItem.submitNo}`} className="modal">
          <div className="modal-box p-0 scrollBar" style={{minWidth:"600px"}}>
            <div className='z-50 sticky p-2' style={{backgroundColor:"#F4ECE4", top:"0px"}}>
              <form method="dialog" className='flex justify-between' >
                <div className='w-36'>
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-left">제출 코드</h3>
                </div>
                <div className='flex justify-end w-36'>
                  <button className="btn btn-sm btn-circle btn-ghost text-2xl">✕</button>
                </div>
              </form>
            </div>
            <div style={{textAlign:'left'}}>
            <CodeMirror value={props.submitItem.code || ''}  extensions={[java(),python(),cpp()]}
            editable={false}/>
            </div>          </div>
        </dialog>
      </th>
      <th className="p-1 font-light">
      {props.submitItem.submitDate.split(' ')[0]}<br />
      {props.submitItem.submitDate.split(' ')[1]}
      </th>
      {/* <th className="p-1">{props.submitItem.problemRating}</th> */}
    </tr>
  )
}