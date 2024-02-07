import { useState } from "react"
import CodeMirror from '@uiw/react-codemirror';

export default function AlarmModal({alarmId}) {
  const [content, setContent] = useState()
  const [code, setCode] = useState()
  return (
    <dialog id={alarmId} className="modal">
      <div className="modal-box" style={{backgroundColor:'#F7F6E4'}}>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-3xl text-center">수정 요청 보내기</h3>
        <div className='flex justify-end '>
          <label className="font-bold me-1 text-base"htmlFor="input">내용</label>
          <textarea value={content} class="textarea textarea-bordered w-11/12 resize-none" onChange={e=>setContent(e.target.value)} id="input" placeholder="입력 설명을 입력하세요" rows="5"></textarea>
        </div>
        <div className="flex justify-end">
         <button class="btn btn-neutral btn-sm rounded-full mt-2">요청 보내기</button>
        </div>
      </div>
    </dialog>
  )
}