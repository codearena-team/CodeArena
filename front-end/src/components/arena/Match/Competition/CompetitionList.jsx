import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/shake.css';
import EnterModal from '../../modal/Competition/CompEnterModal';
import axios from 'axios';

export default function CompetitionList() {
  const [searchText, setSearchText] = useState(''); // 검색어 텍스트 입력
  const [selectedButton, setSelectedButton] = useState('competition'); // 선택된 버튼 타입-> 첫 렌더링되었을 때 "경쟁전" 화면부터 보이도록
  const [searchAnimation, setSearchAnimation] = useState(false); // Enter 키 눌러졌을 때 애니메이트

  // 가상의 단체전 방 데이터 (일단은 10개정도..)
  const [problemData, setProblemData] = useState([]);
    

  // 검색어 입력 핸들러
  const handleSearch = () => {
    // 검색을 수행하거나 검색 결과를 업데이트
    console.log('검색어:', searchText);
    setSearchAnimation(true); // 무언가를 입력 후 Enter 누르면 애니메이트 작동

    setTimeout(() => {
        setSearchAnimation(false);
    }, 1000); // 애니메이트 1초
    setSearchText(''); // 검색 후 input창 초기화
  };

  // Enter 키 눌렀을 때 검색 함수 호출
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
  };

  // 경쟁전, 단체전 버튼 클릭 핸들러
  const handleButtonClick = (btn) => {
    setSelectedButton(btn);
  };

  // 초기 렌더링 시 데이터 설정
  useEffect(() => {
    axios.get('https://i10d211.p.ssafy.io/game/chat/rooms')
    .then((res)=> {
      console.log(res);
      setProblemData(res.data.data.gameRooms);
      console.log(res.data.data.gameRooms);
    }) .catch(err=> {
      console.log(err);
    })
  }, []);

  return (
    <div className="mt-5 mx-10">
      {/* 상단 버튼, 검색바, 버튼 영역 */}
      <div className="flex justify-between items-center">
        <div className="flex relative z-0">
          <button
            className="btn btn-competition relative top-2"
            style={{ backgroundColor: selectedButton === 'competition' ? '#E3E6D9' : '' }}
            onClick={() => handleButtonClick('competition')}
          >
            경쟁전
          </button>
          <Link
            to="/game-list/group"
            className="btn btn-group relative top-2"
            style={{ backgroundColor: selectedButton === 'group' ? '#E3E6D9' : '' }}
            onClick={() => handleButtonClick('group')}
          >
            단체전 {/* 단체전 방 리스트로 변경 */}
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="유저, 문제 번호 또는 제목 검색"
            className="input-search hover:scale-110"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 감지
            style={{ width: '300px', padding: '8px', marginRight: '5px' }}
          />
          {/* 검색 버튼 스타일링 -> Enter키 눌려졌을 때 반응 */}
          <button 
            className={`btn btn-search hover:scale-110 transition-transform duration-300 transform ${searchAnimation ? 'shake' : ''}`}
            onClick={handleSearch}
          >
            검색
          </button>
          <button className="btn btn-filter hover:scale-110">필터</button>  
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div
        className="grid grid-cols-7 bg-gray-200 text-gray-700 py-2 rounded-md relative z-10"
        style={{ backgroundColor: '#E3E6D9' }}
      >
        <div className="text-center">문제번호</div>
        <div className="text-center">문제제목</div>
        <div className="text-center">플레이어1</div>
        <div className="text-center">플레이어2</div>
        <div className="text-center">모드</div>
        <div className="text-center">관전자</div>
        <div className="text-center">입장 여부</div>
      </div>

      {/* 데이터 리스트 */}
      {problemData.map((item, index) => (
        <div key={index} className="grid w-full grid-cols-7 border-b py-2 items-center rounded-xl shadow-sm hover:bg-gray-300">
          <div className="text-center">{item.problemId}</div>
          <div className="text-center">{item.title}</div>
          <div className="text-center">{item.userRed}</div>
          <div className="text-center">{item.userBlue} </div>
          <div className="text-center">{item.gameMode ? '효율' : '스피드'}</div>
          <div className="text-center">{item.participants}</div>
          <div className="text-center">
            {item.isFull ? (
            <button className="btn btn-disabled" disabled>입장불가</button>
            ) : (
              // 경쟁전 관전 페이지로 입장하기
              <EnterModal competitionId={item.gameId} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
