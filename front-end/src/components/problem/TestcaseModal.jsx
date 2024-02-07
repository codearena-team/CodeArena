import Testcase from './Testcase';
import "../css/testcasemodal.css"


export default function TestCaseModal(props) {
  const testCaseList = props.testcase
  return(
    <div>
      <dialog id={`testCaseModal${props.submitNo || ''}`} className="modal">
        <div className="modal-box p-0 scrollBar" style={{maxWidth:"1000px"}}>
          <div className='z-50 sticky p-2' style={{backgroundColor:"#F4ECE4", top:"0px"}}>
            <form method="dialog" className='flex justify-between' >
              <div className='w-36'>
              </div>
              <div>
                <h3 className="font-bold text-2xl">테스트 케이스</h3>
              </div>
              <div className='flex justify-end w-36'>
                <button className="btn btn-sm btn-circle btn-ghost text-2xl">✕</button>
              </div>
              
            </form>
          </div>
          
          <div className='p-2' style={{backgroundColor:"#F7F6E4"}}>
            {testCaseList.map((tc, index)=> {
              return(
                <Testcase 
                key={tc}
                tc={tc}
                index={index}
                />
              )
            })}
          </div>
        </div>
      </dialog>
    </div>
  )
}