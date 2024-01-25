import CustomInput from '../../components/common/CustomInput'
import Button from '../../components/common/Button'
import '../css/login.css'
import KaKao from '../../images/login/kakao.png'
import Google from '../../images/login/google.png'
import Naver from '../../images/login/naver.png'
import { Link } from 'react-router-dom'

export default function Login() {
  // const [email, setEmail] = useState()
  // function onclick () {
  //   const payload ={
  //     email : email,
  //     password : password
  //   }
  //   requestLogin(payload)
  // }
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
          <CustomInput 
          label="이메일"
          // setEmail={setEmail}
          />
          <CustomInput 
          label="비밀번호"
          type="password"
          />
          <div className='flex justify-between'>
            <Link to='/login/findpassword'><p className='text-sm'>비밀번호를 잊으셨나요?</p></Link>
            <Link to='/login/signup'><p className='text-sm'>회원가입</p></Link>
          </div>
          <br />
          <Button
          name="로그인"/>
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
  