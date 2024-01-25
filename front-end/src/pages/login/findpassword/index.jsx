import CustomInput from '../../../components/common/CustomInput'
import Button from '../../../components/common/Button'

export default function FindPassword(){
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
            <CustomInput 
            label="가입한 이메일"
            type="email"
            />
            <br />
            <br />
            <Button
            name="임시 비밀번호발급"/>
          </div>
      </div>
    </div>

  )
}