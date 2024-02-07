import '../../css/login.css'
import '../../css/custom.css'
import { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword(){
  const [password,setPassword] = useState('');
  const [passwordconfirm,setPasswordconfirm] = useState('');
  const email = useSelector(state => state.auth.userEmail)
  const navigate = useNavigate()

  // 변경할비밀번호와 비밀번호확인이 일치하는지확인하고
  const handleChange = ()=>{
    if (password === passwordconfirm) {
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
        alert('비밀번호가 변경되었습니다')
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
        alert('비밀번호가 변경실패')
      })
    }else{
      alert('비밀번호가 일치하지 않습니다')
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