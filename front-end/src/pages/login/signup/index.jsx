import CustomInput from '../../../components/common/CustomInput'
import Button from '../../../components/common/Button'

export default function Signup(){
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
        <div style={{marginTop:10}}>
          <CustomInput 
          label="이메일"
          type="email"
          />
          <CustomInput 
          label="닉네임"
          type="text"
          />
          <CustomInput 
          label="소개글"
          type="text"
          />
          <CustomInput 
          label="비밀번호"
          type="password"
          />
          <CustomInput 
          label="비밀번호 확인"
          type="password"
          />
          <Button
          name="회원가입"/>
        </div>
      </div>
    </div>
  )
}