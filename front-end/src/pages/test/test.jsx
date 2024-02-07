import axios from "axios";
import { useState } from "react";

export default function Test () {
  const [sessionId,setSessionId ] = useState()
  const create = ()=> {
    axios({
      url : 'https://i10d211.p.ssafy.io/game/vidu/sessions',
      data : {customSessionId:sessionId},
      method : 'post',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const join = ()=> {
    axios({
      url : `https://i10d211.p.ssafy.io/game/vidu/sessions/${sessionId}/connections`,
      data : {},
      method : 'post',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
    <input className="input w-96" type="text" onClick={e=>{setSessionId(e.target.value)}} />
    <button className="btn btn-neutral mx-4" onClick={create}>create</button>
    <button className="btn btn-neutral" onClick={join}>join</button>


    </div>
  )
}