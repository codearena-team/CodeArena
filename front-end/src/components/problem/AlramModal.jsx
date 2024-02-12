import { useState } from "react"
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export default function AlarmModal({alarmId}) {
  const [content, setContent] = useState()
  const fromId = useSelector(state=>state.auth.userId)
  const params = useParams();
  const problemId = params.problemId
  const [toId,setToId] = useState('')

  useEffect(()=>{
    axios({
      url : `https://i10d211.p.ssafy.io/api/problem/${problemId}`,
      method : 'get',
    })
    .then((res)=>{
      console.log(res.data.data.userId)
      setToId(res.data.data.userId)
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  
  // 문제수정요청보내기
  const sendProblemEdit = ()=>{
    axios({
      url : `https://i10d211.p.ssafy.io/api/alarm/send`,
      method : 'post',
      data :{
        alarmType : '2',
        toId  : toId,
        fromId : fromId,
        alarmMsg : content,
      }
    })
    .then((res)=>{
      console.log(res)
      swal("문제수정요청되었습니다","","success")
    })
    .catch((err)=>{
      console.log(err)
    })

  }

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
        <form method="dialog">
          <button class="btn btn-neutral btn-sm rounded-full mt-2"
          onClick={sendProblemEdit}>요청 보내기</button>
        </form>
        </div>
      </div>
    </dialog>
  )
}