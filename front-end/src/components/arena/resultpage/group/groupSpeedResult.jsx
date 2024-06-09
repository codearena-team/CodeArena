import React, { useEffect, useState } from 'react';
import Tropy from '../../../../images/arena/Result/tropy.png'
import Victory from '../../../../images/arena/Result/victory.png'
import '../../../css/resultpage.css'
import { Link, useLocation } from 'react-router-dom'

export default function SpeedResult (){
  const location = useLocation();

  // 승자와 패자 관리 스테이트
  const [winner, setWinner] = useState({});
  const [loser, setLoser] = useState({});

  useEffect(() => {
    const { winnerInfo, loserInfo } = location.state;
    console.log(winnerInfo)
    console.log(loserInfo)

    if (winnerInfo) {
      setWinner(winnerInfo);
    }
    if (loserInfo) {
      setLoser(loserInfo);
    }
  }, [location.state]);

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
          <div className='flex justify-evenly p-32'>
            <div>  
              <h1 className='text-xl'>nickname나오는곳</h1>
              <h1>축하합니다! 먼저 문제를 풀어내셨어요 !</h1>
            <div className='flext justify-center'><img src={Victory} alt="" className='victory'/></div>
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
          <div className='flex justify-evenly p-32'>
            <div>  
              <h1 className='text-xl'>nickname나오는곳</h1>
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