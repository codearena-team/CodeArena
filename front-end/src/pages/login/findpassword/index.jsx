import '../../css/custom.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function FindPassword(){
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const checkEmail = () =>{
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    return regExp.test(email)
  }

  const handleFindpassword = ()=>{
    if (!checkEmail()) {
      alert('이메일이 형식에 맞지 않습니다')
    }else{
      axios({
        url : 'http://i10d211.p.ssafy.io:8081/api/user/password/reissue',
        method : 'post',
        data : {
          userEmail : email
        }
      })
      .then((res)=>{
        console.log(res)
        alert('임시비밀번호발급완료')
        navigate('/login')
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  return(
    <div className='flex justify-center'>  
      <div 
        className='whitebox' 
        style={{backgroundColor:'white',marginTop:-90, padding:50}}>
          <div 
          style={{width:300,height:700,backgroundColor: '#E6BAA3', 
          marginTop: -350,marginLeft:-350, borderBottomLeftRadius:50}}>
          </div>
          <div 
          className='beigebox flex flex-col justify-end items-end font-bold text-2xl' 
          style={{ backgroundColor: '#F4ECE4', marginTop: -500 ,marginLeft:-240, padding:50}}>
          Find Password :)
          </div>
          <div style={{marginTop:70}}>
            <div className="container">
              <div className="inputs">
                <input type='text' input={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>가입한 이메일</label>
              </div>
            </div>
            <br />
            <br />
            <button className="btn btn-neutral w-full rounded-full" onClick={handleFindpassword}>임시 비밀번호발급</button>
          </div>
      </div>
    </div>

  )
}