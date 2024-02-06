import Profile from '../../../images/common/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from 'axios';


export default function Edit(){
  const navigate = useNavigate()
  const [nickname, setNickname] = useState()
  const [email, setEmail] = useState(useSelector(state => state.auth.userEmail))
  const [intro, setIntro] = useState()
  const [nicknamemessage, setNicknamemessage] = useState()
  const userId = useSelector(state => state.auth.userId)
  const onNicknameChange = (e) =>{
    setNickname(e.target.value)
    // 닉네임 중복 검사 요청보내기
    axios({
      url:`https://i10d211.p.ssafy.io/api/user/nick/duplicate?userNickname=${e.target.value}`,
      method:'get',
    })
    .then((res)=>{
      console.log(res.data.data.result)
      if (res.data.data.result === false){
        setNicknamemessage('중복된 닉네임 입니다')
      }else{
        setNicknamemessage('')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const onSumit = ()=> {
    axios({
      url:`https://i10d211.p.ssafy.io/api/user`,
      method:'put',
      data: {
        "userId": userId,
        "userNickname": nickname,
        "userIntro": intro
      }
    })
    .then((res)=>{
      navigate(`/profile/${nickname}`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return(
    <div className="pt-8 px-60">
      <div className='flex justify-evenly editbox drop-shadow-2xl' style={{borderRadius: '5rem', borderWidth: '3px', borderColor: 'black'}}>
        <div>
          <img src={Profile} alt="" style={{width:180}} className='mt-20 drop-shadow-xl'/>
          <div className='flex justify-center p-10'><button className="btn btn-neutral rounded-full drop-shadow-xl">수정</button></div>
        </div>
        <div className='p-10 space-y-6' style={{width:"50%"}}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md text-bold font-bold">이메일</span>
            </div>
            <input type="text" placeholder={email} className="input input-bordered w-full drop-shadow-xl" style={{backgroundColor:'#ffffff'}} disabled/>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md font-bold">닉네임</span>
            </div>
            <input onChange={onNicknameChange} type="text" placeholder="" className="input input-bordered w-full drop-shadow-xl" />
            <p className='text-red-500'>{nicknamemessage}</p>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md font-bold">소개글</span>
            </div>
            <textarea onChange={(e)=>{setIntro(e.target.value)}} className="textarea textarea-bordered h-24 drop-shadow-xl" placeholder=""></textarea>
          </label>
          <div className='flex justify-end'>
            <button onClick={onSumit} className="btn btn-neutral w-20 rounded-full mr-7 drop-shadow-xl">저장</button>
            <Link to='/profile/changepassword'>
              <button className="btn btn-neutral w-40 rounded-full drop-shadow-xl">비밀번호 변경하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}