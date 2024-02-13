import '../css/login.css'
import '../css/custom.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'; 
import { setRefreshToken } from '../../features/login/authSlice';
import { setAccessToken } from '../../features/login/accessSlice';
import swal from 'sweetalert'
import { setRecord } from '../../features/login/authSlice'

axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // 이메일 유효성 검사
  const checkEmail = () =>{
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    return regExp.test(email)
  }

  // 8~10자 영문자 조합 비밀번호 유효성 검사
  const checkPassword = () =>{
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/
    return regExp.test(password)
  }

  const handleLogin = ()=>{
    if (!checkEmail()) {
      swal("이메일이 형식에 맞지 않습니다","","warning");
      return
    }
    if (!checkPassword()) {
      swal("비밀번호가 형식에 맞지 않습니다","8~20자 영문자,숫자 각1개 포함필수","warning")
      return
    }
    if (checkEmail() && checkPassword()) {
      axios({
        url: 'https://i10d211.p.ssafy.io/api/user/login',
        method:'post',
        data: {
          userEmail : email, 
          userPassword : password
        },      
      })
      .then((res)=>{
        if (res.data.status === "404"){
          swal('로그인 실패', "이메일,비밀번호가 맞지않습니다", 'error');
        }else{
         
          dispatch(setRefreshToken(res.data.data))
          dispatch(setAccessToken(res.headers.authorization)) 
          dispatch(setRecord(res.headers.authorization))
          // console.log(res.headers.authorization);
          navigate('/')
          swal("로그인되었습니다", "", "success")
        }
      })
      .catch((err)=>{
        console.log(err)
        swal("로그인실패","","error")
      })
      }
    }

    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        handleLogin()
      }
    };

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
        Welcome CodeArena!
        </div>
        <div style={{marginTop:40}}>
          <div className="container">
            <div className="inputs">
              <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>이메일</label>
            </div>
          </div>
          <div className="container">
            <div className="inputs">
              <input type='password' value={password} 
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)} required />
              <label>비밀번호</label>
            </div>
          </div>
  
          <div className='flex justify-between'>
            <Link to='/login/findpassword'><p className='text-sm'>비밀번호를 잊으셨나요?</p></Link>
            <Link to='/login/signup'><p className='text-sm'>회원가입</p></Link>
          </div>
          <br />
          <button className="btn btn-neutral w-full rounded-full" onClick={handleLogin} onKeyDown={handleKeyDown}>로그인</button>
             
        </div>
      </div>
    </div>
  );
}
