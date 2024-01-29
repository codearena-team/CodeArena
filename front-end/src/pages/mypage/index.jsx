import Profile from '../../images/common/profile.png'
import Message from '../../images/common/message.png'
import Rank from '../../images/common/rank.png'
import '../css/mypage.css'

export default function MyPage() {
  return (
    <div className="flex justify-around p-20">
      <div className="grid grid-cols-1 gap-4">
        <div className='flex justify-center'><img style={{width:130}} src={Profile} alt="" /></div>
        <h1 className='text-2xl text-center'>nickname</h1>
        <h1 className='text-2xl text-center'>소개글</h1>
        <div className='flex justify-center'><button className="btn btn-outline w-20 rounded-full text-xl">follow</button></div>
        <div className='flex justify-evenly'>
          <button className="btn btn-active rounded-full w-21 text-sm pinkbutton drop-shadow-xl">팔로워 10</button>
          <button className="btn btn-active rounded-full w-21 text-sm pinkbutton drop-shadow-xl">팔로잉 35</button>
        </div>
        <button className="btn btn-active w-full rounded-full text-lg pinkbutton drop-shadow-xl">회원정보수정</button>             
        <button className="btn btn-active w-full rounded-full text-lg pinkbutton drop-shadow-xl">
          <img className="w-8" src={Message} alt="" />
          <h1>알림함</h1>
        </button>
      </div>
      <div className='flex justify-between'>
        <div className='yellowbox drop-shadow-xl p-5'>맞힌문제</div>
        <div className='yellowbox drop-shadow-xl p-5'>틀린문제</div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className='pinkbox p-5'>그래프</div>
        <div className='pinkbox p-5'>
          <img style={{width:80}} src={Rank} alt="" />
          <div>Arena Rank</div>
        </div>
      </div>
    </div>
  )
};