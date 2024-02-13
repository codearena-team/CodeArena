import Tropy from '../../../../images/arena/Result/tropy.png'
import Victory from '../../../../images/arena/Result/victory.png'
import '../../../css/resultpage.css'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubmitItem from './compSubmitItemList'

export default function EffiResult (){
  const location = useLocation();

  const [userGameData, setUserGameData] = useState('');
  const [winnerNickname, setWinnerNickname] = useState('');
  const [winnerRating, setWinnerRating] = useState('');
  const [loserNickname, setLoserNickname] = useState('');
  const [loserRating, setLoserRating] = useState('');
  const [winnerSsumnail, setWinnerSsumnail] = useState('');
  const [loserSsumnail, setLoserSsumnail] = useState('');
  const [submitList, setSubmitList] = useState([]);

  useEffect(() => {
    const { gameId } = location.state;
    setUserGameData(gameId.current)

    axios.get('https://i10d211.p.ssafy.io/game/chat/result?gameId='+`${gameId}`)
      .then(res => {
        console.log('여기 json 받았어요', res.data);
        setWinnerNickname(res.data.data.winnerId);
        setWinnerRating(res.data.data.winnerRating);
        setLoserNickname(res.data.data.loserId);
        setLoserRating(res.data.data.loserRating);
        setWinnerSsumnail(res.data.data.winnerSsumnail);
        setLoserSsumnail(res.data.data.loserSsumnail);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });

    axios.get('https://i10d211.p.ssafy.io/game/rest/effi/list?gameId='+`${gameId}`)
      .then(res => {
        console.log('여기 제출 리스트 받았어요', res.data)
        const newArray = [...res.data.data.list]
        setSubmitList(newArray)
        console.log("서브밋 리스트 확인:", newArray)
      })
  }, []);

  return(
    <div className='flex flex-col mt-10 '>
      <div className='flex justify-end mr-20'>
        <Link to='/arena'>
          <button className="btn btn-sm btn-active drop-shadow text-md" 
          style={{backgroundColor:'#E2E2E2'}}
          >아레나로 돌아가기</button>
        </Link>
      </div>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:180 }}>
        <div className="rounded-xl drop-shadow p-5 mb-2  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ backgroundColor: '#F4F5F1',width:600 ,height:300,
        borderWidth: '10px', borderStyle: 'solid', borderColor: '#E3E6D9'}}>
          <div className='flex justify-between'>
            <img src={Tropy} alt="" className='tropy2' />
            <div className='text-3xl font-bold mt-5'>Winner</div>
            <img src={Tropy} alt="" className='tropy2' />
          </div>
          <div className='flex justify-center items-center mt-10'>
            <div style={{ width: "125px", height: "125px"}} >
              <img
                src={winnerSsumnail}
                alt="본인 이미지"
                className="rounded-full shadow-lg"
                style={{width: "100%", height: "100%"}}
              />
            </div>
            <div className="ml-10">
              <h1 className='text-center text-xl'>{winnerNickname}</h1>
              <h1 className='text-center mt-5'>축하합니다! 당신이 효율전의 우승자입니다 !</h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* 문제제출정보테이블 */}
      <div className="overflow-x-auto p-20">
          <table className="problemTable w-full">
            <thead>
              <tr className="orderBy rounded-tr">
                <th className="p-1.5 font-light rounded-tl-2xl">제출번호</th>
                <th className="p-1.5 font-light">제출자</th>
                <th className="p-1.5 font-light w-3/12">결과</th>
                <th className="p-1.5 font-light">메모리</th>
                <th className="p-1.5 font-light">시간</th>
                <th className="p-1.5 font-light">언어</th>
                <th className="p-1.5 font-light rounded-tr-2xl">제출시각</th>
              </tr>
            </thead>
            <tbody className="font-normal">
             {submitList.map((submit, index)=>{
              console.log(submit)
              return (
             <SubmitItem
                key={index}
                submitItem={submit}
                index={index}
             />
             )})}
            </tbody>
          </table>
        </div>
        {/* 페이지 네이션 */}
        <div className="flex justify-between my-2">
          <div></div>
          <div className="join">
            <button className="join-item btn btn-sm">{'<<'}</button>
            {/* {pageNation()} */}
            <button className="join-item btn btn-sm">{'>>'}</button>
          </div>
          <div></div>
        </div>
    </div>
  )
}