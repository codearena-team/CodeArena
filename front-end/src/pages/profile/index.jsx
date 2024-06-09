import Profile from '../../images/common/profile.png'
import Money from '../../images/common/money.png'
import Finger from '../../images/common/finger.png'
import Bell from '../../images/common/bell.png'
import Rank from '../../images/common/rank.png'
import Speed from '../../images/common/speed.png'
import Effi from '../../images/common/effi.png'
import '../css/profile.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { useSelector } from 'react-redux';
import { useEffect,useRef} from 'react';
import axios from 'axios';
import SolvedItem from '../../components/profile/SolveList';
import UnsolvedItem from '../../components/profile/UnsolveList';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'


// to 프로필주인 , from 로그인한유저 ,
// isFollow가 0이면 from뒤의 사람이 to뒤의사람을 팔로우안한거, 1이면 팔로우 한거
export default function MyPage() {
  const inputRef = useRef(null)
  const params = useParams()
  const profileNickname = params.nickname // 프로필 주인인사람
  const loginNickname = useSelector(state => (state.auth.userNickname)) // 로그인한 유저
  const loginId = useSelector(state => state.auth.userId)
  const loginEmail = useSelector(state=>state.auth.userEmail)
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
  const [graphData, setGraphData] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [money,setMoney] = useState('')


  useEffect(() => {
    // document 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // 클릭된 요소가 인풋란 외의 요소인 경우 초기화
      setWord('');
      setModalList([]);
    }
  };



  // 프로필화면시 그프로필 회원정보요청하는 axios
  useEffect(()=>{
    axios({
      url : `https://codearena.shop/api/user?to=${profileNickname}&from=${loginNickname}`,
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
      setSelectedFile(res.data.data.userInfoDto.userThumbnail)
      setMoney(res.data.data.userInfoDto.userCoin)
      setGraphData(res.data.data.problemCateList.map((item)=>{
        return {name:item.problemCate,value:parseInt(item.problemCateCnt)}
      }))
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
      url: `https://codearena.shop/api/user/follow/${profileId} `,
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
      url: `https://codearena.shop/api/user/follow/${loginId} `,
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
      url :`https://codearena.shop/api/user/following/${profileId} `, 
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
      url :`https://codearena.shop/api/user/following/${loginId} `, 
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
    url : 'https://codearena.shop/api/user/follow',
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
    newFollowerList.push({userId:loginId,userNickname:loginNickname,userEmail:loginEmail})
    // newFollowerList.length += 1
    setFollowerList(newFollowerList)
    setIsFollow(1)
  })
  .catch((err)=>{
    console.log(err)
  })
}

const goUnfollow = () =>{
  axios({
    url : 'https://codearena.shop/api/user/follow',
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



const formatPercent = (value) => `${(value * 100).toFixed(0)}%`;
const colors = ['#778899', '#DB7093', '#87CEFA','#DEB887','#FF7F50',
'BC8F8F','#8FBC8F','#20B2AA','#A9A9A9','#EEE8AA'];

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
    console.log('dkdkdkdkdkd')
    navigate(`/profile/${word}`)
  }
  // 닉네임 검색 인풋창변화시
  const searchInput = (e) =>{
    setWord(e.target.value.trim());
    if (!e.target.value.trim()) {
      return
    }
    axios({
      url :`https://codearena.shop/api/user/list?fromId=${loginId}&toNickname=${e.target.value}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res)
      console.log(res.data.data)
      setModalList(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchNickname();
    }
  };

  const inputClick = (e)=>{
    e.stopPropagation()
    const value = e.target.value;
    const newValue = value.replace('팔로우중','').trim();
    const newValue2 = newValue.replace('(','').trim();
    const newValue3 = newValue2.replace(')','').trim();
    setWord(newValue3);
    setModalList([]);
  }  

  const closeFollowingModal = () => {
    document.getElementById('my_modal_3').close();
  };

  const closeFollowerModal = () => {
    document.getElementById('my_modal_4').close();
  };


  const goFollowingProfile = (userNickname) =>{
    closeFollowingModal();
    navigate(`/profile/${userNickname}`)
  }


  const goFollowerProfile = (userNickname) =>{
    closeFollowerModal();
    navigate(`/profile/${userNickname}`)
  }



  return (
    <div className=''>
      <div className='flex p-36 pt-0 pb-0 justify-end  mb-5 ml-10'>
        <div>
          <input ref={inputRef} type="text" placeholder="닉네임을 입력하세요" className="input input-bordered w-xl h-8 max-w-xs mb-2" 
          style={{outline:'none',borderBottomRightRadius: '0',borderTopRightRadius: '0'}}
          value={word}
          onChange={searchInput}
          onKeyDown={handleKeyDown}/>
          {/* 인풋밑에 자동생성창 */}
          {modalList.length > 0 &&  word.length > 0  &&(
          <div className="dropdown" >
          <ul className="dropdown-menu" style={{ display: 'block', position: 'absolute', zIndex: '1',right:'0px', top:'10px'}}>
            {modalList.map((item, index) => (
              <li key={index}>
                <input type="text" className="input input-bordered w-xl h-8 max-w-xs" 
                style={{outline:'none',cursor: 'pointer'}}
                value={item.userNickname + (item.isFollow === '1' ? ' (팔로우중)' : '')}
                onClick={inputClick}
                />
              </li>
            ))}
            </ul>
            </div>
          )}
        </div> 
        <button className="btn btn-active btn-sm text-md" style={{backgroundColor:'#E2E2E2',borderBottomLeftRadius: '0',borderTopLeftRadius: '0'}}
        onClick={searchNickname}>검색</button>  
      </div>
    
      <div className="grid grid-cols-12 pl-24 pb-0 pt-0">
        <div className="col-span-2 gap-4 ">
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-center mt-5'><img style={{width:130}} src={selectedFile} alt="" /></div>
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
                <div className="modal-box" style={{ width: '200px',backgroundColor: '#F7F6E4'}}> 
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg mb-2">팔로잉 목록</h3>
                  </form>

                  { followingList.length === 0  && (
                    <h1>팔로잉목록이 없습니다</h1>
                  )}
                  { followingList.length > 0 && (
                    <ul>
                    {followingList.map((user)=>{
                      return <li key={user.userId}
                      className="text-md mb-2 " 
                      style={{textDecoration: 'underline',cursor:'pointer'}}
                      onClick={()=>{goFollowingProfile(user.userNickname)}}>
                      {user.userNickname}</li>
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
                <div className="modal-box" style={{ width: '200px',backgroundColor: '#F7F6E4' }}>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg mb-2">팔로워 목록</h3>
                  </form>
                  { followerList.length === 0  && (
                    <h1>팔로워목록이 없습니다</h1>
                  )}
                  { followerList.length > 0 && (
                  <ul>
                    {followerList.map((user)=>{
                      return <li key={user.userId}
                      className="text-md mb-2" 
                      style={{textDecoration: 'underline',cursor:'pointer' }}
                      onClick={()=>{goFollowerProfile(user.userNickname)}}>
                      {user.userNickname}</li>
                    })}
                  </ul>
                  )}
                </div>
              </dialog>
            </div>
          
     
        
            <button className="btn btn-active w-full rounded-xl py-1 text-md pinkbutton drop-shadow"
            style={{backgroundColor:'#E2E2E2'}}
            >
            <div className='flex justify-center items-center'>
              <div className='flex justify-center items-center mr-4 mb-2'>
                <img src={Money} alt="" style={{width:'40px'}} className='me-2'/>
                <p>포인트</p>
              </div>
              <p className='mb-2'>{money}</p>
            </div>
            </button>             
     
            
            { profileUser === loginNickname &&  (
              <div>
                <button className="btn btn-active w-full rounded-xl text-md pinkbutton drop-shadow mb-3"
                onClick={goEdit}>회원정보수정</button>             
                <Link to="/profile/alarm">
                <button className="btn btn-active w-full rounded-xl text-md pinkbutton drop-shadow">
                  <img className="w-8" src={Bell} alt="" />
                  <h1>알림함</h1>
                </button>
              </Link>
            </div>
            )}

          </div>
        </div>
        <div className="col-span-6 ml-10">
       
          <div className='yellowbox drop-shadow p-5 mb-5 font-bold'>
            <div className='mb-2'>맞힌문제</div>
            {solveList.slice(0,14).map((solve,index)=>{
              return(
                <SolvedItem 
                key={solve.solveNo}
                SolveItem={solve}
                index={index}/>
              )
            })}
          </div>
          <div className='yellowbox  drop-shadow p-5 font-bold'>
            <div className='mb-2'>틀린문제</div>
            {unsolveList.slice(0,14).map((unsolve,index)=>{
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
          <div className='pinkbox drop-shadow mb-5 relative'>
            <div className='font-bold absolute top-3 left-1/2 transform -translate-x-1/2'><p>알고리즘 유형 그래프</p></div>
            <ResponsiveContainer height={300} style={{fontSize:'11px'}}> {/* 차트를 반응형으로 감싸는 컨테이너 */}
              {/* PieChart : 원형 차트 모양으로 변환 */}
              <PieChart>
                {/* Tooltip : 마우스를 데이터 포인트 위로 올리면 정보 보여주기 */}
                <Tooltip />
                {/* Pie : 실제 원형 차트 데이터 삽입 */}
                <Pie
                  data={graphData} // 데이터 전달
                  innerRadius={70} // 내부 반지름
                  outerRadius={100} // 외부 반지름
                  paddingAngle={1} // 각 섹션 사이 간격

                  dataKey="value" // 데이터에서 값에 해당하는 키 지정
                >
                  {graphData.map((entry, index) => (
                    // Cell : 각 섹션의 스타일을 설정하기 위함 -> key는 index값, fill은 컬러 채우기
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
       
          </div>
          <div className='pinkbox drop-shadow flex mb-5 P-2'>
            <img style={{width:50,height:50}} src={Speed} alt="" className='ml-4 w-3/12 mt-2'/>
            <div className='w-9/12'>
              <div className='text-center font-bold p-2'>SPEED SCORE</div>
              <div className='text-center pb-2'>{speed}</div>
            </div>
          </div>
          <div className='pinkbox drop-shadow flex mb-5 P-2'>  
            <div className='w-9/12'>
              <div className='text-center font-bold p-2'>EFFICIENCY SCORE</div>
              <div className='text-center pb-2'>{effi}</div>
            </div>
            <img style={{width:50,height:50}} src={Effi} alt="" className='ml-4 w-3/12 mt-2'/>
          </div>
        </div>
      </div>
    </div>
  )
};