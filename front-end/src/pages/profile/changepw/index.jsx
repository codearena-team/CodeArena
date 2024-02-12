import '../../css/login.css'
import '../../css/custom.css'
import { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function ChangePassword(){
  const [password,setPassword] = useState('');
  const [passwordconfirm,setPasswordconfirm] = useState('');
  const email = useSelector(state => state.auth.userEmail)
  const navigate = useNavigate()

  // 8~20자 영문자 조합 비밀번호 유효성검사(최소한개의 숫자와 최소한개의 영문자포함)
  const checkPassword = () =>{ 
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/
    return regExp.test(password)
  }


  // 변경할비밀번호 유효성검사하고 , 변경할비밀번호와 비밀번호확인이 일치하는지확인하고
  const handleChange = ()=>{
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
        url : 'https://i10d211.p.ssafy.io/api/user/password',
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
        Change Password :)
        </div>
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
          <button className="btn btn-neutral w-full rounded-full" onClick={handleChange}>비밀번호 변경하기</button>
        </div>
      </div>
    </div>
  )
}