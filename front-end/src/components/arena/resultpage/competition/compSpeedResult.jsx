import React, { useEffect, useState } from 'react';
import Tropy from '../../../../images/arena/Result/tropy.png'
import Victory from '../../../../images/arena/Result/victory.png'
import '../../../css/resultpage.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios';

export default function SpeedResult (){
  const location = useLocation();

  const [userGameData, setUserGameData] = useState('');
  const [winnerNickname, setWinnerNickname] = useState('');
  const [winnerRating, setWinnerRating] = useState('');
  const [loserNickname, setLoserNickname] = useState('');
  const [loserRating, setLoserRating] = useState('');
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
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });

  }, []);

  return(
    <div className='flex flex-col mt-20 '>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:300 }}>
        {/* 승자 출력*/}
        <div
          className="rounded-xl drop-shadow p-5 mb-2 mr-2 absolute top-1/2 left-20 -translate-y-1/2" 
          style={{ backgroundColor: '#F4F5F1', width:'40%', height:'150%', borderWidth: 'auto', borderStyle: 'solid', borderColor: '#E3E6D9'}}
        >
          <div className='flex justify-between'>
            <img src={Tropy} alt="" className='tropy' />
              <div className='text-5xl font-bold mt-5'>Winner</div>
            <img src={Tropy} alt="" className='tropy' />
          </div>
          <div className='flex justify-center mt-20'>
            <div className="text-center">
              <h1 className='text-4xl font-bold mb-5'>{winnerNickname}</h1>
              <h1 className="text-2xl mb-5" style={{color:"blue"}}>{winnerRating}</h1>
              <h1>축하합니다! 먼저 문제를 풀어내셨어요 !</h1>
            {/* <div className='flext justify-center'><img src={Victory} alt="" className='victory'/></div> */}
            </div>
          </div>
        </div>

        {/* 패자 출력 */}
        <div
          className="rounded-xl drop-shadow p-5 mb-2 absolute top-1/2 right-20 -translate-y-1/2" 
          style={{ backgroundColor: '#F4F5F1', width:'40%', height:'150%', borderWidth: 'auto', borderStyle: 'solid', borderColor: '#E3E6D9'}}>
          <div className='flex justify-center'>
            <div className='text-5xl font-bold mt-5'>Loser</div>
          </div>
          <div className='flex justify-center p-32'>
            <div className="text-center">  
              <h1 className='text-4xl font-bold mb-5'>{loserNickname}</h1>
              <h1 className="text-2xl mb-5" style={{color:"red"}}>{loserRating}</h1>
              <h1>아쉽네요! 상대보다 조금 늦었어요!</h1>
            </div>
          </div>
        </div>
      </div>

      {/* 아레나 돌아가기 */}
      <div className='mt-32 flex justify-center'>
        <Link to='/arena'>
          <button
            className="btn btn-md btn-active drop-shadow text-md" 
            style={{backgroundColor:'#E2E2E2'}}
          >
            아레나로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  )
}