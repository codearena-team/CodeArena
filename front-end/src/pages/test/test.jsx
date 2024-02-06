import axios from "axios";

export default function Test () {
  const create = ()=> {
    axios({
      url : 'https://i10d211.p.ssafy.io/game/vidu/sessions',
      data : {customSessionId:'qwe123asd'},
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
      url : 'https://i10d211.p.ssafy.io/game/vidu/sessions/qwe123asd/connections',
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
    <button className="btn" onClick={create}>create</button>
    <button className="btn" onClick={join}>join</button>


    </div>
  )
}