import '../css/login.css'
import '../css/custom.css'
import KaKao from '../../images/login/kakao.png'
import Google from '../../images/login/google.png'
import Naver from '../../images/login/naver.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'; 
import { setToken } from '../../features/login/authSlice';


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
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    return regExp.test(password)
  }

  const handleLogin = ()=>{
    if (!checkEmail()) {
      alert('이메일이 형식에 맞지 않습니다')
    } 
    // if (!checkPassword()) {
    //   alert('비밀번호가 형식에 맞지 않습니다')
    // }
    if (checkEmail()) {
      
      axios({
        url: 'http://192.168.100.207:8080/api/user/login',
        method:'post',
        data: {
          userEmail : email,
          
          userPassword : password
        },
        withCredentials : true,
        headers: {
                    
          'Access-Control-Allow-Origin': '192.168.100.129' ,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Max-Age': '3600',
          'Access-Control-Allow-Headers': 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'

        }
      })
      .then((res)=>{
        console.log(res)
        if (res.data.status == "404"){
          alert('이메일,패스워드가 일치하지 않습니다')
        }else{
          dispatch(setToken(res.data.data))
          alert('로그인성공')
          navigate('/')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      }
    }

    const test = () => {
      dispatch((setToken(true)))
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
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>비밀번호</label>
            </div>
          </div>
  
          <div className='flex justify-between'>
            <Link to='/login/findpassword'><p className='text-sm'>비밀번호를 잊으셨나요?</p></Link>
            <Link to='/login/signup'><p className='text-sm'>회원가입</p></Link>
          </div>
          <br />
          <button className="btn btn-neutral w-full rounded-full" onClick={handleLogin}>로그인</button>
          <br />
          <br />    
          <div className='flex justify-evenly'>
            <Link to="/login/snssignup"><img  className='snsphoto' src={KaKao} alt="kakao" /></Link>
            <Link to="/login/snssignup"><img  className='snsphoto' src={Naver} alt="naver" /></Link>
            <Link to="/login/snssignup"><img  className='googlelogo' src={Google} alt="google" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
  