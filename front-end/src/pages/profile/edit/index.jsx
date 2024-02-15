import Profile from '../../../images/common/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import { useState,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setThumbnail, setUserNickname } from '../../../features/login/authSlice';
import axios from 'axios';
import { useEffect } from 'react';
import swal from 'sweetalert';


export default function Edit(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileUrl,setProfileUrl] = useState('')
  // const [croppedImage, setCroppedImage] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nickname, setNickname] = useState(useSelector(state => state.auth.userNickname))
  const [email, setEmail] = useState(useSelector(state => state.auth.userEmail))
  const [intro, setIntro] = useState('')
  const [nicknamemessage, setNicknamemessage] = useState()
  const userId = useSelector(state => state.auth.userId)



  // 프로필화면시 그프로필 회원정보요청하는 
  useEffect(()=>{
    axios({
      url : `https://codearena.shop/api/user?to=${nickname}&from=${nickname}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res.data.data)
      setIntro(res.data.data.userInfoDto.userIntro)
    })
    .catch((err)=>{
      console.log(err)
    })  
  },[])




  const onNicknameChange = (e) =>{
    setNickname(e.target.value)
    // 닉네임 중복 검사 요청보내기
    axios({
      url:`https://codearena.shop/api/user/nick/duplicate?userNickname=${e.target.value}`,
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


  // 저장버튼 클릭시
  const onSumit = ()=> {
    axios({
      url:`https://codearena.shop/api/user`,
      method:'put',
      data: {
        "userId": userId,
        "userNickname": nickname,
        "userIntro": intro
      }
    })
    .then((res)=>{
      dispatch(setUserNickname(nickname))
      swal("회원정보수정완료","","success")
      navigate(`/profile/${nickname}`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // 유저의 프로필사진 불러오기
  useEffect(()=>{
    axios({
      url : `https://codearena.shop/api/profile/${userId}`,
      method :'get'
    })
    .then((res)=>{
      console.log(res)
      console.log('여기확이이이이인')
      setSelectedFile(res.data.data.profileUrl)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  // 프로필사진변경 로직
  const handleProfileEdit = (e) => {
    e.preventDefault()
    const input = document.createElement('input');
    input.enctype = "multipart/form-data"
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      const formData = new FormData();
      formData.append("file", file);
      axios({
        url : `https://codearena.shop/api/profile/upload/${userId}`,
        data : formData,
        method : 'put',
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res)=>{
        console.log(res)
        setSelectedFile(imageUrl)
        dispatch(setThumbnail(imageUrl))
        swal("프로필사진 변경완료","","success")
      })
      .catch((err)=>{
        console.log(err)
        swal("파일용량을 확인해주세요","","warning")
      })
    };
    input.click()
  }




  // 기본이미지로 변경하기로직
  const goBasicProfile =  ()=>{
    axios({
      url : `https://codearena.shop/api/profile/upload/${userId}/default`,
      method : 'put'
    })
    .then((res)=>{
      console.log(res)
      setSelectedFile(Profile)
      dispatch(setThumbnail(Profile))
      swal("기본이미지로 변경완료","","success")
    })
    .catch((err)=>{
      console.log(err)
    })
  }



  return(
    <div className="pt-8 px-60">
      <div className='flex justify-evenly editbox drop-shadow' style={{borderRadius: '4rem', borderWidth: '2px', borderColor: 'black'}}>
        <div>
          <img src={selectedFile} alt="" style={{width:180}} className='mt-20 mb-10 drop-shadow-xl'/> 
          <div className='flex justify-center'>
            <button className="btn btn-sm btn-active drop-shadow text-md mb-2" 
            style={{backgroundColor:'#E2E2E2'}}
            onClick={handleProfileEdit}
            >프로필사진 변경</button>
          </div>
          <div className='flex justify-center'>
            <button className="btn btn-sm btn-active drop-shadow text-md" 
            style={{backgroundColor:'#E2E2E2'}}
            onClick={goBasicProfile}
            >기본이미지로 변경</button>
          </div>
        </div>
        <div className='p-10 space-y-6' style={{width:"50%"}}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md text-bold font-bold">이메일</span>
            </div>
            <input type="text" placeholder={email} className="input input-bordered w-full drop-shadow font-bold" style={{backgroundColor:'#ffffff'}} disabled/>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md font-bold">닉네임</span>
            </div>
            <input value={nickname} onChange={onNicknameChange} type="text" placeholder="" className="input input-bordered w-full drop-shadow" />
            <p className='text-red-500'>{nicknamemessage}</p>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md font-bold">소개글</span>
            </div>
            <textarea onChange={(e)=>{setIntro(e.target.value)}} className="textarea textarea-bordered h-24 drop-shadow" value={intro}></textarea>
          </label>
          <div className='flex justify-end'>
          <button className="btn btn-sm btn-active drop-shadow text-md mr-2" 
              style={{backgroundColor:'#E2E2E2'}}
              onClick={onSumit}
              >저장</button>
            <Link to='/profile/changepassword'>
            <button className="btn btn-sm btn-active drop-shadow text-md" 
              style={{backgroundColor:'#E2E2E2'}}
              >비밀번호변경하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


