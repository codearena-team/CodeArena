import '../../css/custom.css'
import { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function FindPassword(){

  const [password,setPassword] = useState('');
  const [passwordconfirm,setPasswordconfirm] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const [pageChange,setPageChange] = useState(false)
  const [tempCode,setTempCode] = useState('')

  const checkEmail = () =>{
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    return regExp.test(email)
  }

  
  // 8~20자 영문자 조합 비밀번호 유효성검사(최소한개의 숫자와 최소한개의 영문자포함)
  const checkPassword = () =>{ 
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/
    return regExp.test(password)
  }

  // 인증번호발송하기
  const sendNumber = () =>{
    if (!checkEmail()) {
      swal("이메일이 형식에 맞지 않습니다","","warning");
      return
    }
    axios({
      url : 'https://codearena.shop/api/user/password/reissue',
      method : 'post',
      data : {
        userEmail : email
      }
    })
    .then((res)=>{
      console.log(res)
      swal("인증번호가 발송되었습니다","","success")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  //인증번호 확인 로직
  const confirmCode = () =>{
    if (!tempCode) {
      swal("인증번호를 입력하세요","","warning");
      return
    }
    axios({
      url : 'https://codearena.shop/api/user/password/verification',
      method : 'post',
      data : {
        userEmail : email,
        tempCode : tempCode
      }
    })
    .then((res)=>{
      console.log(res)
      if (res.data.status === '200') {
        swal("인증완료","","success")
        setPageChange(true)
      }else {
        swal("인증번호미일치","","error")
      }
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }

  // 비밀번호변경로직
  const changePassword = () =>{
    if (!checkPassword()){
      swal("비밀번호가 형식에 맞지 않습니다","8~20자 영문자,숫자 각1개 포함필수","warning");
      return
    }
    if (password !== passwordconfirm) {
      swal("","비밀번호와 비밀번호확인이 일치하지 않습니다","warning")
      return
    }
    if (checkPassword() && password === passwordconfirm) {
      axios({
        url : 'https://codearena.shop/api/user/password',
        method : 'put',
        data : {
          userEmail : email,
          userPassword : password
        }
      })
      .then((res)=>{
        console.log(res)
        swal("비밀번호가 변경되었습니다","","success")
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
        swal("비밀번호가 변경실패","","error")
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
            {!pageChange && (
            <div>
              <div className="container">
                <div className="inputs">
                  <input type='text' input={email} onChange={(e) => setEmail(e.target.value)} required />
                  <label>가입한 이메일</label>
                </div>
              </div>
              <button className="btn btn-sm btn-neutral w-full rounded-full text-md mb-12"
              onClick={sendNumber} 
              >인증번호발송
              </button>
              <div className="container">
                <div className="inputs">
                  <input type='text' input={tempCode} onChange={(e) => setTempCode(e.target.value)} required />
                  <label>인증번호</label>
                </div>
              </div>
              <button className="btn btn-sm btn-neutral w-full rounded-full text-md" 
                onClick={confirmCode}
                >확인
              </button>
            </div>
            )}

            {pageChange && (
              <div style={{marginTop:50}}>
                <div className="container">
                  <div className="inputs">
                    <input type='password' onChange={(e) => {setPassword(e.target.value)}} required />
                    <label>변경할 비밀번호</label>
                  </div>
                </div>
                <div className="container">
                  <div className="inputs">
                    <input type='password' onChange={(e) => {setPasswordconfirm(e.target.value)}} required />
                    <label>비밀번호 확인</label>
                  </div>
                </div>
                <button className="btn btn-neutral w-full rounded-full"
                onClick={changePassword}>비밀번호 변경하기</button>
              </div>
            )}
          </div>
      </div>
    </div>

  )
}