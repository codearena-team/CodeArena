import Profile from '../../images/common/profile.png'
import Finger from '../../images/common/finger.png'
import Message from '../../images/common/message.png'
import Rank from '../../images/common/rank.png'
import '../css/profile.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import SolvedItem from '../../components/profile/SolveList';
import UnsolvedItem from '../../components/profile/UnsolveList';
import { useNavigate } from 'react-router-dom'

// to 프로필주인 , from 로그인한유저 ,
// isFollow가 0이면 from뒤의 사람이 to뒤의사람을 팔로우안한거, 1이면 팔로우 한거
export default function MyPage() {
  const params = useParams()
  const profileNickname = params.nickname // 프로필 주인인사람
  const loginNickname = useSelector(state => (state.auth.userNickname)) // 로그인한 유저
  const loginId = useSelector(state => state.auth.userId)
  const [profileId,setProfileId] = useState('')
  const [profileUser,setProfileUser] = useState('')
  const [profileIntro,setProfileIntro] = useState('')
  const [effi,setEffi] = useState('')
  const [speed,setSpeed] = useState('')
  const [isFollow,setIsFollow] = useState('')
  const [solveList,setSolveList] = useState([])
  const [unsolveList,setUnsolveList] = useState([])
  const [word,setWord] = useState('')
  const navigate = useNavigate()
  const [followingList,setFollowingList] = useState([])
  const [followerList,setFollowerList] = useState([])
  const [firstRender,setFirstRender] = useState(true)
  const [modalList,setModalList] = useState([])
  const [loginFollowinglist,setLoginFollowingList] = useState([])
  const [loginFollowerlist,setLoginFollwerList] = useState([])


  // 프로필화면시 그프로필 회원정보요청하는 axios
  useEffect(()=>{
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/user?to=${profileNickname}&from=${loginNickname}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res.data.data)
      setProfileIntro(res.data.data.userInfoDto.userIntro)
      setProfileUser(res.data.data.userInfoDto.userNickname)
      setEffi(res.data.data.userInfoDto.effiRating)
      setSpeed(res.data.data.userInfoDto.speedRating)
      setIsFollow(res.data.data.userInfoDto.isFollow)
      setSolveList(res.data.data.solvedProblem)
      setUnsolveList(res.data.data.unsolvedProblem)
      setProfileId(res.data.data.userInfoDto.userId)
    })
    .catch((err)=>{
      console.log(err)
    })  
  },[profileNickname])

  useEffect(()=>{
    if (firstRender) {
      setFirstRender(false);
      return
    }
     //자기가 팔로우하는사람 = 팔로잉조회
    axios({
      url: `http://i10d211.p.ssafy.io:8081/api/user/follow/${profileId} `,
      method : 'get'
    })
    .then((res)=>{
      console.log(res)
      setFollowingList(res.data.data || [])
    })
    .catch((err)=>{
      console.log(err)
    })
    axios({
      url: `http://i10d211.p.ssafy.io:8081/api/user/follow/${loginId} `,
      method : 'get'
    })
    .then((res)=>{
      console.log(res)
      setLoginFollowingList(res.data.data || [])
    })
    .catch((err)=>{
      console.log(err)
    })
  

    // 자기를 팔로우하는사람 = 팔로워 조회
    axios({
      url :`http://i10d211.p.ssafy.io:8081/api/user/following/${profileId} `, 
      method : 'get'
    })
    .then((res)=>{
      console.log(res)
      setFollowerList(res.data.data || [])
    })
    .catch((err)=>{
      console.log(err)
    })
    axios({
      url :`http://i10d211.p.ssafy.io:8081/api/user/following/${loginId} `, 
      method : 'get'
    })
    .then((res)=>{
      console.log(res)
      setLoginFollwerList(res.data.data || [])
    })
    .catch((err)=>{
      console.log(err)
    })
  },[profileId])

const goEdit = () =>{
  navigate('/profile/edit')
}

const goFollow = () =>{
  axios({
    url : 'http://i10d211.p.ssafy.io:8081/api/user/follow',
    method : 'post',
    data : {
      fromId : loginId,
      toId : profileId
    }
  })
  .then((res)=>{
    console.log(res)
    // 팔로우하면 내 팔로잉은 +1
    // 그화면의 팔로워는 +1
    const newLoginFollwinglist = [...loginFollowinglist]
    newLoginFollwinglist.length += 1
    setLoginFollowingList(newLoginFollwinglist)
    const newFollowerList = [...followerList]
    newFollowerList.length += 1
    setFollowerList(newFollowerList)
    setIsFollow(1)
  })
  .catch((err)=>{
    console.log(err)
  })
}

const goUnfollow = () =>{
  axios({
    url : 'http://i10d211.p.ssafy.io:8081/api/user/follow',
    method : 'delete',
    data : {
      fromId : loginId,
      toId : profileId
    }
  })
  .then((res)=>{
    // 나의 팔로잉 리스트는 -1
    // 프로필 팔로워 리스트도 -1
    console.log(res)
    const newLoginFollwinglist = [...loginFollowinglist]
    newLoginFollwinglist.lenghth -= 1
    setLoginFollowingList(newLoginFollwinglist)
    const newFollowerList = [...followerList]
    newFollowerList.length -= 1
    setFollowerList(newFollowerList)
    setIsFollow(0)
  })
  .catch((err)=>{
    console.log(err)
  })
}






  const getFollowing = () =>{
    //팔로잉목록모달열기
    document.getElementById('my_modal_3').showModal()
  }
 
  const getFollwer = ()=>{
     // 팔로워목록모달열기
     document.getElementById('my_modal_4').showModal()
  }
 
  // 닉네임 검색버튼클릭시
  const searchNickname = () =>{
    navigate(`/profile/${word}`)
  }
  // 닉네임 검색 인풋창변화시
  const searchInput = (e) =>{
    setWord(e.target.value)
    axios({
      url :`http://i10d211.p.ssafy.io:8081/api/user/list?fromId=${loginId}&toNickname=${e.target.value}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res)
      setModalList(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // 그래프 그릴 데이터
  const data = [
    {
      subject: 'a', A: 120, B: 110, fullMark: 150,
    },
    {
      subject: 'b', A: 98, B: 130, fullMark: 150,
    },
    {
      subject: 'c', A: 86, B: 130, fullMark: 150,
    },
    {
      subject: 'd', A: 99, B: 100, fullMark: 150,
    },
    {
      subject: 'e', A: 85, B: 90, fullMark: 150,
    },
    {
      subject: 'f', A: 65, B: 85, fullMark: 150,
    },
  ];

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchNickname();
    }
  };

  const handleAutocompleteClick = (item) =>{
    setWord(item.userNickname)
  }
  
  
  return (
    <div className='container mx-auto'>
      <div className='flex p-40 pt-0 pb-0 justify-end mr-3'>
        
        <input type="text" placeholder="닉네임을 입력하세요" className="input input-bordered w-xl h-8 max-w-xs mb-2" 
        style={{outline:'none',borderBottomRightRadius: '0',borderTopRightRadius: '0'}}
        onChange={searchInput}
        onKeyDown={handleKeyDown}/>
        {/* {modalList.length > 0 && (
        <div className="dropdown" >
        <ul className="dropdown-menu" style={{ display: 'block', position: 'absolute', zIndex: '1' }}>
          {modalList.map((item, index) => (
            <li key={index}>
              <button className="btn btn-sm">
                {item.userNickname}
              </button>
            </li>
          ))}
        </ul>
      </div>
      )} */}
    
        <button className="btn btn-active btn-sm text-md" style={{backgroundColor:'#E2E2E2',borderBottomLeftRadius: '0',borderTopLeftRadius: '0'}}
        onClick={searchNickname}>검색</button>  
      </div>
      
      <div className="grid grid-cols-12 p-20 pb-0 pt-0">
        <div className="col-span-2 gap-4 mt-5">
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-center'><img style={{width:130}} src={Profile} alt="" /></div>
            <h1 className='text-3xl text-center'>{profileUser}</h1>
            <h1 className='text-md text-center'>{profileIntro}</h1>
            {profileId !== loginId && (
            <>
           { isFollow == 0 && ( 
            <div className='flex justify-center'>
              <button className="btn btn-outline  w-full rounded-xl text-xl drop-shadow-xl"
              onClick={goFollow}>
                <img src={Finger} alt="" style={{width:30}}/>
                <h1>follow</h1>
              </button>
            </div>
            )}
            { isFollow == 1 && ( 
            <div className='flex justify-center'>
              <button className="btn btn-outline w-full rounded-xl text-xl drop-shadow-xl"
              onClick={goUnfollow}>
                <h1>unfollow</h1>
              </button>
            </div>
            )}
            </>
            )}

            <div className='flex justify-between'>      
              <button className="btn btn-active drop-shadow text-md" 
              style={{backgroundColor:'#E2E2E2'}}
              onClick={getFollowing}
              >팔로잉 {followingList.length}</button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box" style={{ width: '400px' }}> 
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">팔로잉 목록</h3>
                  </form>
                  { followingList.length === 0  && (
                    <h1>팔로잉목록이 없습니다</h1>
                  )}
                  { followingList.length > 0 && (
                    <ul>
                    {followingList.map((user)=>{
                      return <li key={user.userId}>{user.userNickname}</li>
                    })}
                  </ul>
                  )}
                </div>
              </dialog>

              <button className="btn btn-active drop-shadow text-md" 
              style={{backgroundColor:'#E2E2E2'}}
              onClick={getFollwer}
              >팔로워 {followerList.length}</button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box" style={{ width: '400px' }}>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">팔로워 목록</h3>
                  </form>
                  { followerList.length === 0  && (
                    <h1>팔로워목록이 없습니다</h1>
                  )}
                  { followerList.length > 0 && (
                    <ul>
                    {followerList.map((user)=>{
                      return <li key={user.userId}>{user.userNickname}</li>
                    })}
                  </ul>
                  )}
                </div>
              </dialog>
            </div>

            { profileUser === loginNickname &&  (
              <div>
                <button className="btn btn-active w-full rounded-xl text-md pinkbutton drop-shadow mb-5"
                onClick={goEdit}>회원정보수정</button>             
                <Link to="/profile/alarm">
                <button className="btn btn-active w-full rounded-xl text-md pinkbutton drop-shadow">
                  <img className="w-8" src={Message} alt="" />
                  <h1>알림함</h1>
                </button>
              </Link>
            </div>
            )}

          </div>
        </div>
        <div className="col-span-6 ml-10">
       
          <div className='yellowbox drop-shadow-xl p-5 mb-5 font-bold'>
            <div className='mb-2'>맞힌문제</div>
            {solveList.map((solve,index)=>{
              return(
                <SolvedItem 
                key={solve.solveNo}
                SolveItem={solve}
                index={index}/>
              )
            })}
          </div>
          <div className='yellowbox  drop-shadow-xl p-5 font-bold'>
            <div className='mb-2'>틀린문제</div>
            {unsolveList.map((unsolve,index)=>{
              return(
                <UnsolvedItem 
                key={unsolve.unsolveNo}
                UnsolveItem={unsolve}
                index={index}/>
              )
            })}
          </div>
        </div>
        <div className="col-span-4 ml-10">
          <div className='pinkbox drop-shadow-xl mb-5'>
            {/* 그래프 위치 */} 
            <RadarChart cx={200} cy={175} outerRadius={120} width={400} height={400} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="aa" dataKey="A" stroke="#ffffff" fill="#8884d8" fillOpacity={0.7} />
            </RadarChart>  
          </div>
          <div className='pinkbox drop-shadow-xl flex justify-between'>
            <img style={{width:40,height:40}} src={Rank} alt="" className='ml-4 mt-3'/>
              <div>
                <div className='text-sm p-3 font-bold'>SPEED SCORE</div>
                <div className='text-center'>{speed}</div>
              </div>
              <div>
                <div className='text-sm p-3 font-bold'>EFFICIENCY SCORE</div>
                <div className='text-center'>{effi}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
};