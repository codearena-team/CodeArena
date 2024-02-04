import CodeMirror from '@uiw/react-codemirror';
import Testcase from './Testcase';
import "../css/testcasemodal.css"
import { useState } from 'react';


export default function TestCaseModal() {
  const [isVisible, setIsVisible] = useState(false)


  const testCaseList = [
    {
      input:"0 1 1 0\n0 0 0 0\n0 1 1 0\n0 0 0 0",
      output:"10"
    },
    {
      input:"0 1 1 0\n0 0 0 0\n0 1 1 0\n0 0 0 0",
      output:"10"
    },
    {
      input:"0 1 1 0\n0 0 0 0\n0 1 1 0\n0 0 0 0",
      output:"10"
    },
    {
      input:"0 1 1 0\n0 0 0 0\n0 1 1 0\n0 0 0 0",
      output:"10"
    },
    {
      input:"0 1 1 0\n0 0 0 0\n0 1 1 0\n0 0 0 0",
      output:"10"
    },
    {
      input:"0 1 1 0\n0 0 0 0\n0 1 1 0\n0 0 0 0",
      output:"10"
    },
  ]
  const onClick = (e) => {
    e.preventDefault();
    if (isVisible) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }
  const onClickReset = (e) => {

  }
  return(
    <div className="modal-box p-0 scrollBar" style={{maxWidth:"1000px", width:"80%"}}>
      <div className='z-50 sticky p-2' style={{backgroundColor:"#F4ECE4", top:"0px"}}>
        <form method="dialog" className='flex justify-between' >
          <div>
            <button onClick={onClick} class="btn drop-shadow-lg btn-neutral btn-sm rounded-full me-3">TC 추가</button>
            <button onClick={onClickReset} class="btn drop-shadow-lg btn-neutral btn-sm rounded-full">초기화</button>
          </div>
          <div>
            <h3 className="font-bold text-2xl">테스트 케이스</h3>
          </div>
          <div className='flex justify-end w-36'>
            <button className="btn btn-sm btn-circle btn-ghost text-2xl">✕</button>
          </div>
          
        </form>
        <div>
          <div style={isVisible ? {} : {display:'none'}} className='grid grid-cols-2 gap-4 mb-4'>
            <div><p>input</p><CodeMirror/></div>
            <div><p>output</p><CodeMirror/></div>
          </div>
        </div>
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
  )
}