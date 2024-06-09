import Tropy from '../../../../images/arena/Result/tropy.png'
import '../../../css/resultpage.css'
import { Link, useSearchParams, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SubmitItem from './compSubmitItemList'

export default function EffiResult (){
  const gameId = useSelector(state => state.game.gameId);
  const userNickname = useSelector(state => state.auth.userNickname);
  const navigate = useNavigate()
  const params = useParams()
  const [userGameData, setUserGameData] = useState('');
  const [winnerNickname, setWinnerNickname] = useState('');
  const [winnerRating, setWinnerRating] = useState('');
  const [loserNickname, setLoserNickname] = useState('');
  const [loserRating, setLoserRating] = useState('');
  const [winnerSsumnail, setWinnerSsumnail] = useState('');
  const [loserSsumnail, setLoserSsumnail] = useState('');
  const [pgno, setPgno] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitList, setSubmitList] = useState([]);

  const changeParams = (key, value) => {
    searchParams.set(key,value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    setUserGameData(gameId)
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

  
    
    axios.get('https://codearena.shop/game/rest/effi/list?gameId='+`${params.id}`)
      .then(res => {
        console.log('여기 제출 리스트 받았어요', res.data)
        const newArray = [...res.data.data.list]
        setSubmitList(newArray)
        console.log("서브밋 리스트 확인:", newArray)
      })
  }, []);
  
  const onClickexit = () => {
    navigate('/arena')
    window.location.reload()
  }

  const pageNation = () => {
    const result = [];
    for (let i = 0; i < pageCount; i++) {
      result.push(<button onClick={()=>changeParams('pgno',i+1)} key={i} className={(pgno ==`${i+1}`) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}>{i+1}</button>);
    }
    return result;
  }

  return(
    <div className='flex flex-col mt-10 '>
      <div className='flex justify-end mr-20'>
          <button className="btn btn-sm btn-active drop-shadow text-md" 
          style={{backgroundColor:'#E2E2E2'}} onClick={onClickexit}
          >아레나로 돌아가기</button>
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
            {pageNation()}
            <button className="join-item btn btn-sm">{'>>'}</button>
          </div>
          <div></div>
        </div>
    </div>
  )
}