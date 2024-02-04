import Profile from '../../images/common/profile.png'
import Message from '../../images/common/message.png'
import Rank from '../../images/common/rank.png'
import '../css/profile.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';


export default function MyPage() {
  const params = useParams()

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

  
  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-12 p-20 pb-0">
        <div className="col-span-2 gap-4 mt-5">
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-center'><img style={{width:130}} src={Profile} alt="" /></div>
            <h1 className='text-2xl text-center'>{params.nickname}</h1>
            <h1 className='text-2xl text-center'>소개글</h1>
            <div className='flex justify-center'><button className="btn btn-outline w-20 rounded-full text-xl drop-shadow-xl">follow</button></div>
            <div className='flex justify-evenly'>
              <button className="btn btn-active rounded-full w-21 text-sm pinkbutton drop-shadow-xl">팔로워 10</button>
              <button className="btn btn-active rounded-full w-21 text-sm pinkbutton drop-shadow-xl">팔로잉 35</button>
            </div>
            <Link to="/profile/:nickname/edit">
              <button className="btn btn-active w-full rounded-full text-lg pinkbutton drop-shadow-xl">회원정보수정</button>             
            </Link>
            <Link to="/profile/alarm">
              <button className="btn btn-active w-full rounded-full text-lg pinkbutton drop-shadow-xl">
                <img className="w-8" src={Message} alt="" />
                <h1>알림함</h1>
              </button>
            </Link>
          </div>
        </div>
        <div className="col-span-6 ml-10">
          <div className='yellowbox drop-shadow-xl p-5 mb-5 font-bold' style={{width:'100%'}}>맞힌문제</div>
          <div className='yellowbox  drop-shadow-xl p-5 font-bold'>틀린문제</div>
        </div>
        <div className="col-span-4 gap-4 ml-10">
          <div className='pinkbox drop-shadow-xl mb-5'>
            {/* 그래프 위치 */}
            
            <RadarChart cx={200} cy={175} outerRadius={130} width={400} height={400} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="aa" dataKey="A" stroke="#ffffff" fill="#8884d8" fillOpacity={0.7} />
            </RadarChart>
        
          </div>
          <div className='pinkbox drop-shadow-xl flex'>
            <img style={{width:40,height:40}} src={Rank} alt="" className='ml-2 mt-5'/>
            <div>
              <div className='text-sm p-3 font-bold'>speed score :</div>
              <div className='text-sm p-3 font-bold'>efficiency score :</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};