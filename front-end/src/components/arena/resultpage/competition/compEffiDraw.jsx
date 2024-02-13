import React, { useEffect, useState } from 'react';
import '../../../css/resultpage.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

export default function EffiDraw (){
  const location = useLocation();

  const [userGameData, setUserGameData] = useState('');
  const [winnerNickname, setWinnerNickname] = useState('');
  const [winnerRating, setWinnerRating] = useState('');
  const [loserNickname, setLoserNickname] = useState('');
  const [loserRating, setLoserRating] = useState('');
  const [winnerSsumnail, setWinnerSsumnail] = useState('');
  const [loserSsumnail, setLoserSsumnail] = useState('');

  useEffect(() => {
    const { gameId } = location.state;
    setUserGameData(gameId.current)
    console.log('넘어와야하는 gameId :', gameId)
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

  }, []);

  return(
    <div className='flex flex-col mt-20'>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:300 }}>
        <div
          className="rounded-xl drop-shadow p-5 mb-2 mr-2 absolute top-1/2 left-20 -translate-y-1/2" 
          style={{ backgroundColor: '#F4F5F1', width:'40%', height:'150%', borderWidth: 'auto', borderStyle: 'solid', borderColor: '#E3E6D9'}}
        >
          <div className='flex justify-center'>
            <div className='text-3xl font-bold mt-3'>Draw</div>
          </div>
          <div className='mt-10'>
            <div className="text-center items-center flex flex-col justify-center">
              <div style={{ width: "125px", height: "125px"}} >
                <img
                  src={winnerSsumnail}
                  alt="본인 이미지"
                  className="rounded-full shadow-lg"
                  style={{width: "100%", height: "100%"}}
                />
              </div>
              <h1 className='text-3xl font-bold mb-5 mt-5'>{winnerNickname}</h1>
              <h1 className="text-2xl mb-5" style={{color:"skyblue"}}>{winnerRating}</h1>
              <h1>아쉽게도 비기고 말았어요 !</h1>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl drop-shadow p-5 mb-2 absolute top-1/2 right-20 -translate-y-1/2" 
          style={{ backgroundColor: '#F4F5F1', width:'40%', height:'150%', borderWidth: 'auto', borderStyle: 'solid', borderColor: '#E3E6D9'}}
        >
          <div className='flex justify-center'>
            <div className='text-3xl font-bold mt-3'>Draw</div>
          </div>
          <div className='mt-10'>
            <div className="text-center items-center flex flex-col justify-center">
              <div style={{ width: "125px", height: "125px"}} >
                <img
                  src={loserSsumnail}
                  alt="상대 이미지"
                  className="rounded-full shadow-lg"
                  style={{width: "100%", height: "100%"}}
                />
              </div>
              <h1 className='text-3xl font-bold mb-5 mt-5'>{loserNickname}</h1>
              <h1 className="text-2xl mb-5" style={{color:"skyblue"}}>{loserRating}</h1>
              <h1>아쉽게도 비기고 말았어요 !</h1>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center '>
        <Link to='/arena'>
          <button
            className="btn btn-sm btn-active drop-shadow text-md" 
            style={{backgroundColor:'#E2E2E2'}}
          >
            아레나로 돌아가기
          </button>
        </Link>
      </div>
      
      {/* 문제제출정보테이블 */}
      <div className="overflow-x-auto p-20">
          <table className="problemTable w-full">
            <thead>
              <tr className="orderBy rounded-tr rounded-tl">
                <th className="p-1.5 font-light rounded-tl-2xl">제출번호</th>
                <th className="p-1.5 font-light">제출자</th>
                <th className="p-1.5 font-light w-3/12">결과</th>
                <th className="p-1.5 font-light">메모리</th>
                <th className="p-1.5 font-light">시간</th>
                <th className="p-1.5 font-light">언어</th>
                <th className="p-1.5 font-light rounded-tr-2xl">제출날짜</th>
              </tr>
            </thead>
            <tbody className="font-normal">
             {/* {submitList.map((submit,index)=>{
              return(
             <SubmitItem 
              key={submit.submitNo}
              submitItem={submit}
              index={index}
             />
             )})} */}
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