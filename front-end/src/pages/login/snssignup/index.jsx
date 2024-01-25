import CustomInput from '../../../components/common/CustomInput'
import Button from '../../../components/common/Button'
import { useState } from 'react'

export default function SnsSignup(){
  const [email,setEmail] = useState("example@codearena.com")
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
          <CustomInput 
          value={email}
          label="이메일"
          type="email"
          />
          <CustomInput 
          label="비밀번호"
          type="password"
          />
          <CustomInput 
          label="닉네임"
          type="text"
          />
          <CustomInput 
          label="소개글"
          type="text"
          />
          <Button
          name="회원가입"/>
        </div>
      </div>
    </div>
  )
}