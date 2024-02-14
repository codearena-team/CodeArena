import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import SubmitListItem from './compSubmitItemList'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Reload from '../../../../images/problem/reload.png';

export default function MiddleConfirm(){
  const navigate = useNavigate();
  const problemId = useSelector(state => state.game.problemId);
  const gameId = useSelector(state => state.game.gameId);
  const startTime = useSelector(state => state.game.startTime)
  const [pgno, setPgno] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitList, setSubmitList] = useState([]);
  

  const changeParams = (key, value) => {
    searchParams.set(key,value)
    setSearchParams(searchParams)
  }
  
  useEffect(() => {
    const pgno = searchParams.get('pgno') || 1
    const spp = searchParams.get('spp') || 15
    console.log("gameId 확인 :", gameId)
    console.log("problemId 확인 :", problemId)
    console.log("startTime 확인 :", startTime)
    axios.get('https://i10d211.p.ssafy.io/game/rest/effi/list?gameId='+`${gameId}&pgno=${pgno}&spp=${spp}`)
      .then(res => {
        console.log(res.data)
        const { currentPage, list, totalPageCount } = res.data.data
        setPageCount(parseInt(totalPageCount));
        changeParams('pgno', parseInt(currentPage));
        setSubmitList(list);
      })

  }, [])


  const onClickReload = () =>{
    window.location.reload();
  }

  const pageNation = () => {
    const result = [];
    for (let i = 0; i < pageCount; i++) {
      result.push(<button onClick={()=>changeParams('pgno',i+1)} key={i} className={(pgno ==`${i+1}`) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}>{i+1}</button>);
    }
    return result;
  }

  const returnGoPlayhandler = () => {
    console.log("다시 문제 풀러 GOGO")
    navigate(
      `/game-list/competition/play/${gameId}`,
    )
  }

  return(
    <div>
      <div className='flex justify-end mr-20 '>
          <button
            className="btn btn-sm btn-active drop-shadow text-md" 
            style={{backgroundColor:'#E2E2E2'}}
            onClick={returnGoPlayhandler}
          >
            되돌아가기
          </button>
      </div>
      <div className='flex justify-end mr-28 mt-2' onClick={onClickReload}>
        <img src={Reload} alt="새로고침" style={{width:30,cursor:'pointer'}}/>
      </div>
      <div className="overflow-x-auto p-20 pt-5">
        <table className="problemTable w-full">
          <thead>
            <tr className="orderBy rounded-tr">
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
            {submitList.map((submit,index)=>{
            return(
            <SubmitListItem 
            key={index}
            submitItem={submit}
            index={index}
            />
            )})}
          </tbody>
        </table>
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
  </div>



  )
}