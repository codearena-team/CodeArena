import '../../css/custom.css'
import { useState } from 'react'

export default function Signup(){
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [nickname,setNickname] = useState('');
  const [introduce,setIntroduce] = useState('');

  const checkEmail = () =>{
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    return regExp.test(email)
  }

  const checkPassword = () =>{
    // 8~10자 영문자 조합
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    return regExp.test(password)
  }

  const checkNickname = () =>{
    return nickname.length > 0 && nickname.length <= 10
  }

  const checkIntroduce = () =>{
    return introduce.length > 0 && introduce.length <= 30
  }

  const handleSignup = ()=>{
    if (!checkEmail()) {
      alert('이메일이 형식에 맞지 않습니다')
    }
    if (!checkPassword()) {
      alert('비밀번호가 형식에 맞지 않습니다')
    }
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
        <div style={{marginTop:15}}>
          <div className="container">
            <div className="inputs">
              <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}required />
              <label>이메일</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} required />
              <label>닉네임</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='text' value={introduce} onChange={(e) => setIntroduce(e.target.value)}required />
              <label>소개글</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>비밀번호</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='password' required />
              <label>비밀번호 확인</label>
            </div>
          </div>
          <button className="btn btn-neutral w-full rounded-full" onClick={handleSignup}>회원가입</button>
        </div>
      </div>
    </div>
  )
}