import { useState } from 'react'
import CustomInput from '../../components/common/CustomInput'
import './login.css'

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
      {/* <img src={pink} alt="" 
      style={{width:350, height:400, marginTop:-100, marginLeft:'25%'}}
       />
       */}
       
       
       <div className='whitebox' style={{backgroundColor:'white',marginTop:-100, padding:50}}>
       <div style={{width:400,height:800,backgroundColor: '#E6BAA3', marginTop: -350,marginLeft:-450, borderBottomLeftRadius:50}}></div>
       <div className='whitebox' style={{ backgroundColor: '#F4ECE4', marginTop: -980,marginLeft:-300}}></div>
        <div>
          <CustomInput 
          label="Email Id"
          // setEmail={setEmail}
          />
          <CustomInput 
          label="Password"
          type="password"
          />
        </div>


       </div>
    </div>
     
  
  );
}
  