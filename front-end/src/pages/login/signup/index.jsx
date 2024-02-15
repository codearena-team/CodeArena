import '../../css/custom.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function Signup(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [nickname,setNickname] = useState('');
  const [introduce,setIntroduce] = useState('');
  const [password,setPassword] = useState('');
  const [passwordconfirm,setPasswordconfirm] = useState('');
  const [emailmessage,setEmailmessage] = useState('');
  const [nicknamemessage,setNicknamemessage] = useState('');

  // 이메일 유효성검사
  const checkEmail = () =>{
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return regExp.test(email)
  }

  // 8~20자 영문자 조합 비밀번호 유효성검사(최소한개의 숫자와 최소한개의 영문자포함)
  const checkPassword = () =>{ 
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/
    return regExp.test(password)
  }

  // 닉네임 유효성검사
  const checkNickname = () =>{
    return nickname.length >= 2 && nickname.length <= 10 && nickname.split(' ').length < 2
  }

  // 소개글 유효성검사
  const checkIntroduce = () =>{
    return introduce.length > 0 && introduce.length <= 30
  }

  
  const handleSignup = ()=>{
    if (!checkEmail()) {
      swal("이메일이 형식에 맞지 않습니다","","warning")
      return
    }
    if (!checkNickname()) {
      swal("닉네임이 형식에 맞지 않습니다","2자이상 10자이내, 공백입력불가 ","warning")
      return
    }
    if (!checkIntroduce()) {
      swal("소개글이 형식에 맞지 않습니다","","warning")
      return
    }
    if (!checkPassword()) {
      swal("비밀번호가 형식에 맞지 않습니다","8~20자 영문자,숫자 각1개 포함필수","warning")
      return
    }
    if (password !== passwordconfirm) {
      swal("비밀번호와 비밀번호확인이 일치하지 않습니다","","warning")
      return
    }
    if(checkEmail() && checkPassword() && checkNickname() && checkIntroduce() && password === passwordconfirm) {
      axios({
        url:'https://codearena.shop/api/user/join',
        method:'post',
        data:{
          userEmail : email,
          userPassword : password,
          userNickname : nickname,
          userIntro : introduce
        }
      })
      .then((res)=>{
        console.log(res)
        swal("회원가입되었습니다", "", "success")
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  

  const onEmailChange = (e)=>{
    setEmail(e.target.value)
    // console.log(email)
    // console.log(e.target.value)
    // 이메일 중복 검사 요청보내기
    setTimeout(() => {
      axios({
        url:`https://codearena.shop/api/user/email/duplicate?userEmail=${e.target.value}`,
        method:'get',
      })
      .then((res)=>{
        console.log(res.data.data.result)
        console.log(res.data.data.result === false)
        if (res.data.data.result === false){
          setEmailmessage('중복된 이메일 입니다')
        }else{
          setEmailmessage('')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }, 10);
  }


  const onNicknameChange = (e) =>{
    setNickname(e.target.value)
    // 닉네임 중복 검사 요청보내기
    setTimeout(() => {
      axios({
        url:`https://codearena.shop/api/user/nick/duplicate?userNickname=${e.target.value}`,
        method:'get',
      })
      .then((res)=>{
        console.log(res.data.data.result)
        if (res.data.data.result === false){
          setNicknamemessage('중복된 닉네임 입니다')
        }else{
          setNicknamemessage('')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }, 10);
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
              <input type='text' value={email} onChange={onEmailChange}required />
              <label>이메일</label>
              <h1 className='text-sm text-red-500'>{emailmessage}</h1>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='text' value={nickname} onChange={onNicknameChange} required />
              <label>닉네임</label>
              <h1 className='text-sm text-red-500'>{nicknamemessage}</h1>
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
              <input type='password' value={passwordconfirm} onChange={(e) => setPasswordconfirm(e.target.value)} required />
              <label>비밀번호 확인</label>
            </div>
          </div>
          <button className="btn btn-neutral w-full rounded-full" onClick={handleSignup}>회원가입</button>
        </div>
      </div>
    </div>
  )
}