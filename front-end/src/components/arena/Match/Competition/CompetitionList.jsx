import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/shake.css';
import EnterModal from '../../modal/Competition/CompEnterModal';

export default function CompetitionList() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 표시 데이터
  const [paginatedData, setPaginatedData] = useState([]); // 페이지네이션 데이터
  const [searchText, setSearchText] = useState(''); // 검색어 텍스트 입력
  const [selectedButton, setSelectedButton] = useState('competition'); // 선택된 버튼 타입-> 첫 렌더링되었을 때 "경쟁전" 화면부터 보이도록
  const [searchAnimation, setSearchAnimation] = useState(false); // Enter 키 눌러졌을 때 애니메이트

  // 가상의 단체전 방 데이터 (일단은 10개정도..)
  const [problemData, setProblemData] = useState([
    { id: 1, problemNumber: '#1000', problemTitle: '두 정수 더하기', participants: ['user1', 'user2'], mode: '스피드전', spectators: 5, isFull: false },
    { id: 2, problemNumber: '#1001', problemTitle: '두 정수 빼기', participants: ['user3', 'user4'], mode: '스피드전', spectators: 8, isFull: false },
    { id: 3, problemNumber: '#1002', problemTitle: '두 정수 곱하기', participants: ['user5', 'user6'], mode: '효율전', spectators: 2, isFull: true },
    { id: 4, problemNumber: '#1003', problemTitle: '두 정수 나누기', participants: ['user7', 'user8'], mode: '효율전', spectators: 10, isFull: false },
    { id: 5, problemNumber: '#1004', problemTitle: '짝수와 홀수', participants: ['user9', 'user10'], mode: '스피드전', spectators: 3, isFull: true },
    { id: 6, problemNumber: '#1005', problemTitle: '평균 구하기', participants: ['user11', 'user12'], mode: '스피드전', spectators: 4, isFull: false },
    { id: 7, problemNumber: '#1006', problemTitle: '최댓값과 최솟값', participants: ['user13', 'user14'], mode: '효율전', spectators: 6, isFull: true },
    { id: 8, problemNumber: '#1007', problemTitle: '최소공배수와 최대공약수', participants: ['user15', 'user16'], mode: '효율전', spectators: 7, isFull: false },
    { id: 9, problemNumber: '#1008', problemTitle: 'A/B', participants: ['user17', 'user18'], mode: '스피드전', spectators: 9, isFull: true },
    { id: 10, problemNumber: '#1009', problemTitle: '분산처리', participants: ['user19', 'user20'], mode: '스피드전', spectators: 2, isFull: false },
  ]);
    
  const PAGE_SIZE = 10; // 한 페이지에 보여줄 방 개수

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return problemData.slice(startIndex, endIndex);
  };

  const updatePaginatedData = () => {
    const newData = getPaginatedData();
    setPaginatedData(newData);
  };

  // 페이지네이션 이전 페이지로 이동
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    updatePaginatedData();
  };

  // 페이지네이션 다음 페이지로 이동
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(problemData.length / PAGE_SIZE)));
    updatePaginatedData();
  };

  // 검색어 입력 핸들러
  const handleSearch = () => {
    // 검색을 수행하거나 검색 결과를 업데이트
    console.log('검색어:', searchText);
    setSearchAnimation(true); // 무언가를 입력 후 Enter 누르면 애니메이트 작동

    setTimeout(() => {
        setSearchAnimation(false);
    }, 1000); // 애니메이트 1초
    setSearchText(''); // 검색 후 input창 초기화
    updatePaginatedData();
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
    updatePaginatedData();
  };

  // 초기 렌더링 시 데이터 설정
  useEffect(() => {
    updatePaginatedData();
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
        className="grid grid-cols-6 bg-gray-200 text-gray-700 py-2 rounded-md relative z-10"
        style={{ backgroundColor: '#E3E6D9' }}
      >
        <div className="text-center">문제번호</div>
        <div className="text-center">문제제목</div>
        <div className="text-center">참여자</div>
        <div className="text-center">모드</div>
        <div className="text-center">관전자</div>
        <div className="text-center">입장 여부</div>
      </div>

      {/* 데이터 리스트 */}
      {paginatedData.map((item, index) => (
        <div key={index} className="grid w-full grid-cols-6 border-b py-2 items-center rounded-xl shadow-sm hover:bg-gray-300">
          <div className="text-center">{item.problemNumber}</div>
          <div className="text-center">{item.problemTitle}</div>
          <div className="text-center">{item.participants ? item.participants.join(', ') : ''}</div>
          <div className="text-center">{item.mode}</div>
          <div className="text-center">{item.spectators}</div>
          <div className="text-center">
            {item.isFull ? (
            <button className="btn btn-disabled" disabled>입장불가</button>
            ) : (
              // 경쟁전 관전 페이지로 입장하기
              <EnterModal competitionId={item.id} />
            )}
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-5">
        <div className='relative bottom-0 mb-5'>
          <button
            className="btn btn-pagination"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {Array.from({ length: Math.min(5, Math.ceil(problemData.length / PAGE_SIZE)) }, (_, index) => (
            <button
              key={index + 1}
              className={`btn btn-pagination hover:scale-125 ${currentPage === index + 1 ? 'active' : ''}`}
              style={{ backgroundColor: currentPage === index + 1 ? '#E3E6D9' : 'white' }}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-pagination"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(problemData.length / PAGE_SIZE)}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
