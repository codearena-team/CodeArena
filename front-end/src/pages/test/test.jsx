import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import registerServiceWorker from './../../registerServiceWorker';
import MainVideo from "./MainVideo";
import Webrtc from "./Webrtc";


export default function Test () {
  const c = useSelector(state=>state.rtc.streamManager)
  const [sessionId,setSessionId ] = useState('')
  const [a,seta ] = useState(500)
  const [b,setb ] = useState(500)
  const [isPlayer, setIsPlayer] = useState(false)
  const userNickname = useSelector(state => state.auth.userNickname)
  const test = () => {
    console.log(c);
  }
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

  const test2 = () => {
    axios({
      url : `https://i10d211.p.ssafy.io/api/auth/renew`,
      data : {refreshToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWZyZXNoLXRva2VuIiwiaWF0IjoxNzA3ODM1NzAyLCJleHAiOjE3MDg2OTk3MDIsInVzZXJFbWFpbCI6Im15d2VAZ21haWwuY29tIiwidXNlcklkIjoiNDUiLCJ1c2VyTmlja25hbWUiOiLslpHqsbTsmrAiLCJzcGVlZCI6Ijk4NSIsImVmZiI6IjEwMDAifQ.2eKS5VbjwXbpkjXU0la7boaHECz292vvSrY6MG4dN6I"},
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
    <button onClick={test2}>asdqwgfragaeg</button>
    <input className="input w-96" type="text" onChange={e=>{setSessionId(e.target.value)}} />
    <button className="btn btn-neutral mx-4" onClick={create}>create</button>
    <button className="btn btn-neutral" onClick={join}>join</button>
    <input className="input" type="number" onChange={e=>seta(e.target.value)}/>
    <input className="input" type="number" onChange={e=>setb(e.target.value)}/>
    <button onClick={test}>nseorgno;adgsjldfb</button>
    <MainVideo />
    <Webrtc 
    userNickname={userNickname}
    customSessionId={'qawsed'}
    isPlayer={false}
    width={`500px`}
    height={`500px`}
    />
    </div>
  )
}
registerServiceWorker();