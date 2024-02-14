import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../../../css/shake.css';
// import CreateModal from '../../modal/Group/CreateModal';
import GroupEnterModal from '../../modal/Group/GroupEnterModal';
import GroupLobbyModal from '../../modal/Group/GroupLobbyModal';
import axios from 'axios';
import '../../../../pages/css/problemsolve.css'

export default function GroupList() {
  const [selectedButton, setSelectedButton] = useState('group'); // 선택된 버튼 타입 -> 단체전
  // const [searchAnimation, setSearchAnimation] = useState(false); // Enter 키 눌러졌을 때 애니메이트
  const [isModalOpen, setIsModalOpen] = useState(false); // 방생성 모달 열고 닫기

  const [pageCount, setPageCount] = useState(1)
  const [searchParams,setSearchParams] = useSearchParams()
  const [key, setKey] = useState('userNickname')
  const [word, setWord] = useState('')

  const changeParams = (key, value) => {
    searchParams.set(key,value)
    setSearchParams(searchParams)
  }
  
  const onClickHandler = () => {
    if(word==='') {
      searchParams.delete('word')
      setSearchParams(searchParams)
    } else {
      changeParams('word',word)
    }
    if(key==='') {
      searchParams.delete('key')
      setSearchParams(searchParams)
    } else {
      changeParams('key',key)
    }
    searchParams.delete('pgno')
    setSearchParams(searchParams)
  }

  const pageNation = () => {
    const result = [];
    for (let i = 0; i < pageCount; i++) {
      result.push(
      <button 
        onClick={()=>changeParams('pgno',i+1)} 
        key={i} 
        className={(searchParams.get('pgno')===`${i+1}` || (searchParams.get('pgno')===null&&i===0)) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}
        >{i+1}</button>
      );
    }
    return result;
  };

  // 가상의 단체전 방 데이터 (일단은 10개정도..)
  const [problemData, setProblemData] = useState([]);


  // 경쟁전, 단체전 버튼 클릭 핸들러
  const handleButtonClick = (btn) => {
      setSelectedButton(btn);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 초기 렌더링 시 데이터 설정
  useEffect(() => {
    const pgno = searchParams.get('pgno') || 1
    const key = searchParams.get('key') || ''
    const word = searchParams.get('word') || ''
    const gameMode = searchParams.get('gameMode') || ''
    const langType = searchParams.get('langType') || ''
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/game/chat/rooms?roomType=1&key=${key}&word=${word}&gameMode=${gameMode}&langType=${langType}&pgno=${pgno}&spp=15`,
    })
    .then((res)=> {
      console.log(res);
      setProblemData(res.data.data.gameRooms);
      console.log(res.data.data.gameRooms);
      setPageCount(res.data.data.totalPageCount)
    }) .catch(err=> {
      console.log(err);
    })
  }, [searchParams]);

  return (
    <div className="pt-5 mx-20">
      {/* 상단 버튼, 검색바, 버튼 영역 */}
      <div className="flex justify-between items-center">
        <div className="flex relative z-0">
          <Link
            to="/game-list/competition"
            className="btn btn-competition relative top-2"
            style={{ backgroundColor: selectedButton === 'competition' ? '#E3E6D9' : '' }}
            onClick={() => handleButtonClick('competition')}
          >
            경쟁전
          </Link>
          <button
            className="btn btn-group relative top-2"
            style={{ backgroundColor: selectedButton === 'group' ? '#E3E6D9' : '' }}
            onClick={() => handleButtonClick('group')}
          >
            단체전
          </button>
        </div>
        <div className="flex space-x-3 items-center">
          <select value={searchParams.get('gameMode') || ''} onChange={(e)=>{changeParams('gameMode',e.target.value)}} className="select select-sm select-bordered join-item" >
            <option value="">전체</option>
            <option value="0">스피드전</option>
            <option value="1">효율전</option>
          </select>
          <select value={searchParams.get('langType') || ''} onChange={(e)=>{changeParams('langType',e.target.value)}} className="select select-sm select-bordered join-item" >
            <option value="">전체</option>
            <option value="java">java</option>
            <option value="python">python</option>
            <option value="cpp">cpp</option>
          </select>
          <div className='flex join'>
            <select value={key} onChange={(e)=>{setKey(e.target.value)}} className="select select-sm select-bordered join-item" >
              <option value={'userNickname'}>유저 닉네임</option>
              <option value={'game_title'}>방 제목</option>
            </select>
              <input onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="검색어를 입력하세요." className="input input-bordered w-full max-w-xs input-sm join-item" />
              <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm join-item">검색</button>
          </div>
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div
          className="grid grid-cols-6 bg-gray-200 text-gray-700 py-2 rounded-tr-md relative z-10"
          style={{ backgroundColor: '#E3E6D9' }}
      >
          <div className="text-center">방장</div>
          <div className="text-center">방 제목</div>
          <div className="text-center">언어</div>
          <div className="text-center">모드</div>
          <div className="text-center">관전자</div>
          <div className="text-center">입장 여부</div>
      </div>

      {/* 데이터 리스트 */}
      {problemData.map((item, index) => (
        <div key={index} className="grid w-full grid-cols-6 border-b py-2 items-center shadow-sm change ">
          <div className="text-center">{item.userRed}</div>
          <div className="text-center">{item.title}</div>
          <div className="text-center">{item.language}</div>
          <div className="text-center">{item.gameMode == 0 ? '스피드전' : '효율전'}</div>
          <div className="text-center">{item.participants}</div>
          <div className="text-center">
            {item.isFull ? (
              <button className="btn btn-disabled" disabled>입장불가</button>
            ) : (
              // 단체전 입장 또는 관전하기
              <div className="flex justify-center">
                <GroupEnterModal groupViewId={item.gameId} problemId={item.problemId}/> {/* 관전하기 */}
                <div className='ml-3'>
                  <GroupLobbyModal groupId={item.gameId}/> {/* 참여하기 */}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className="flex justify-center my-2">
        <div className="join">
          <button onClick={()=>{changeParams('pgno','1')}} className="join-item btn btn-sm">{'<<'}</button>
          {pageNation()}
          <button onClick={()=>{changeParams('pgno', pageCount)}} className="join-item btn btn-sm">{'>>'}</button>
        </div>
      </div>

    </div>
  );
}