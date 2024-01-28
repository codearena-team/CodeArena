import { useState } from 'react'
import '../../css/custom.css'

export default function SnsSignup(){
  const [nickname,setNickname] = useState('');
  const [introduce,setIntroduce] = useState('');

  const checkNickname = () =>{
    return nickname.length > 0 && nickname.length <= 10
  }

  const checkIntroduce = () =>{
    return introduce.length > 0 && introduce.length <= 30
  }

  const handleSignup = ()=>{
    if (!checkNickname()) {
      alert('닉네임이 형식에 맞지 않습니다')
    }
    if (!checkIntroduce()) {
      alert('소개글이 형식에 맞지 않습니다')
    }
  }

  return (
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
        Create Account :)
        </div>
        <div style={{marginTop:40}}>
          <div className="container">
            <div className="inputs">
              <input type='text' required />
              <label>이메일</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='password' required />
              <label>비밀번호</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='text' value={nickname} onChange={ (e) => setNickname(e.target.value)} required />
              <label>닉네임</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='text' value={introduce} onChange={ (e) => setIntroduce(e.target.value)} required />
              <label>소개글</label>
            </div>
          </div>
          <button className="btn btn-neutral w-full rounded-full" onClick={handleSignup}>회원가입</button>
        </div>
      </div>
    </div>
  )
}