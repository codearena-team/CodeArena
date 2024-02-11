import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import registerServiceWorker from './../../registerServiceWorker';
import Webrtc from "./Webrtc";


export default function Test () {
  const [sessionId,setSessionId ] = useState('')
  const [a,seta ] = useState(500)
  const [b,setb ] = useState(500)
  const [isPlayer, setIsPlayer] = useState(false)
  const userNickname = useSelector(state => state.auth.userNickname)
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
    <input className="input w-96" type="text" onChange={e=>{setSessionId(e.target.value)}} />
    <button className="btn btn-neutral mx-4" onClick={create}>create</button>
    <button className="btn btn-neutral" onClick={join}>join</button>
    <input className="input" type="number" onChange={e=>seta(e.target.value)}/>
    <input className="input" type="number" onChange={e=>setb(e.target.value)}/>

    <Webrtc 
    userNickname={userNickname}
    customSessionId={'asdqwe123'}
    isPlayer={false}
    width={`500px`}
    height={`500px`}
    />

    </div>
  )
}
registerServiceWorker();