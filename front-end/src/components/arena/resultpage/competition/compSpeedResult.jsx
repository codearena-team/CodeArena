import React, { useEffect, useState } from 'react';
import Tropy from '../../../../images/arena/Result/tropy.png'
import Victory from '../../../../images/arena/Result/victory.png'
import '../../../css/resultpage.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { updateArenadata } from '../../../../features/login/authSlice';

export default function SpeedResult (){
  const params = useParams();
  const userNickname = useSelector(state => state.auth.userNickname);
  const speed = useSelector(state => state.auth.speed);
  const gameId = useSelector(state => state.game.gameId);
  const navigate = useNavigate()
  // const [userGameData, setUserGameData] = useState('');
  const [winnerNickname, setWinnerNickname] = useState('');
  const [winnerRating, setWinnerRating] = useState('');
  const [loserNickname, setLoserNickname] = useState('');
  const [loserRating, setLoserRating] = useState('');
  const [winnerSsumnail, setWinnerSsumnail] = useState('');
  const [loserSsumnail, setLoserSsumnail] = useState('');
  const dispatch = useDispatch()

  const onClickexit = () => {
    navigate('/arena')
    window.location.reload()
  }

  useEffect(() => {
    // setUserGameData(gameId)
    console.log('넘어와야하는 gameId :', gameId)
    axios.get('https://codearena.shop/game/chat/result?gameId='+`${params.id}`)
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
    <div className='flex flex-col mt-32 '>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:300 }}>
        {/* 승자 출력*/}
        <div
          className="rounded-xl drop-shadow p-5 mb-2 mr-2 absolute top-1/2 left-20 -translate-y-1/2" 
          style={{ backgroundColor: '#F4F5F1', width:'40%', height:'150%', borderWidth: 'auto', borderStyle: 'solid', borderColor: '#E3E6D9'}}
        >
          <div className='flex justify-between'>
            <img src={Tropy} alt="" className='tropy' style={{width:"67.5px", height:"67.5px"}} />
              <div className='text-5xl font-bold mt-5'>Winner</div>
            <img src={Tropy} alt="" className='tropy' style={{width:"67.5px", height:"67.5px"}}/>
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
              <div className="text-2xl mb-5 font-bold flex">
                <h1 className='me-2'>{winnerRating}</h1>
                {winnerNickname === userNickname ?
                  
                  winnerRating === speed ?
                    <span>( - )</span>
                  :
                    winnerRating > speed ?
                      <span className='text-blue-500'>(+{winnerRating - speed})</span>
                    :
                      <span className='text-red-500'>({winnerRating - speed})</span>
                :
                  null
                }
              </div>
              <h1>축하합니다 ! 먼저 문제를 풀어내셨어요 !</h1>
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
          <div className='mt-10'>
            <div className="text-center items-center flex flex-col justify-center">
              <div style={{ width: "125px", height: "125px"}} >
                <img
                  src={loserSsumnail}
                  alt="본인 이미지"
                  className="rounded-full shadow-lg"
                  style={{width: "100%", height: "100%"}}
                />
              </div>
              <h1 className='text-3xl font-bold mb-5 mt-5'>{loserNickname}</h1>

              <div className="text-2xl mb-5 font-bold flex">
                <h1 className='me-2'>{loserRating}</h1>
                {loserNickname === userNickname ?
                  
                  loserRating === speed ?
                    <span>( - )</span>
                  :
                  loserRating > speed ?
                      <span className='text-blue-500'>(+{loserRating - speed})</span>
                    :
                      <span className='text-red-500'>({loserRating - speed})</span>
                :
                  null
                }
              </div>


              <h1>아쉽네요 ! 상대보다 조금 늦었어요 !</h1>
            </div>
          </div>
        </div>
      </div>

      {/* 아레나 돌아가기 */}
      <div className='mt-32 flex justify-center'>
          <button onClick={onClickexit}
            className="btn btn-md btn-active drop-shadow text-md" 
            style={{backgroundColor:'#E2E2E2'}}
          >
            아레나로 돌아가기
          </button>
      </div>
    </div>
  )
}