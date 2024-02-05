import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import styled, { keyframes } from 'styled-components';
import Rank from '../../images/main/Summary/Rank.png';
import Hand from '../../images/main/Summary/hand.png';
import Plus from '../../images/main/Summary/Plus.png';

// 스크롤 애니메이트 이벤트 1
const frameInAnimation_text = keyframes`
  0% {opacity: 0; transform: translateX(-100%);}
  100%{opacity: 1; transform: translateX(0%);}
`;
const AnimateContainer_text = styled.div`
  &.ease-out {
    animation: ${frameInAnimation_text} 1s forwards;
  }
`;

// 스크롤 애니메이트 이벤트 2
// const frameInAnimation_rank = keyframes`
//   0% {opacity: 0; transform: translateY(50%);}
//   100%{opacity: 1; transform: translateY(0%);}
// `;
// const AnimateContainer_rank = styled.div`
//   &.ease-out {
//     animation: ${frameInAnimation_rank} 1.2s forwards;
//   }
// `;

// 스크롤 애니메이트 이벤트 3
const frameInAnimation_que = keyframes`
  0% {opacity: 0; transform: translateY(50%);}
  100%{opacity: 1; transform: translateY(0%);}
`;
const AnimateContainer_que = styled.div`
  &.ease-out {
    animation: ${frameInAnimation_que} 1.1s forwards;
  }
`;

// 스크롤 애니메이트 이벤트 4
const frameInAnimation_add = keyframes`
  0% {opacity: 0; transform: translateY(50%);}
  100%{opacity: 1; transform: translateY(0%);}
`;
const AnimateContainer_add = styled.div`
  &.ease-out {
    animation: ${frameInAnimation_add} 1.1s forwards;
  }
`;

export default function Summary() {
  const [animate_text, setAnimate_text] = useState(false);
  // const [animate_rank, setAnimate_rank] = useState(false);
  const [animate_que, setAnimate_que] = useState(false);
  const [animate_add, setAnimate_add] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log('스크롤 애니메이트 이벤트 발생 확인');
      // 특정 조건을 확인하여 animate 상태 토글
      const shouldAnimate = window.scrollY < 2000 && window.scrollY > 1000;
      setAnimate_text(shouldAnimate);
      // setAnimate_rank(shouldAnimate);
      setAnimate_que(shouldAnimate);
      setAnimate_add(shouldAnimate);
    };
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 인기 질문 카드
  const QuestionCard = ({ question }) => (
    <AnimateContainer_que
      className={`bg-gray-100 p-4 mb-4 rounded-md shadow-lg mr-5 w-64
        ${animate_que ? 'ease-out' : ''
      }`}
      >
      <p className="text-lg font-semibold mb-2">{question.title}</p>
      <p className="text-gray-500">{question.description}</p>
    </AnimateContainer_que>
  );

  // 추가된 문제 카드
  const ProblemCard = ({ problem }) => (
    <AnimateContainer_add
      className={`bg-gray-100 p-4 mb-4 rounded-md shadow-lg mr-5 w-52
        ${animate_add ? 'ease-out' : ''
      }`}
    >
        <p className="text-lg font-semibold mb-2">{problem.title}</p>
      <p className="text-gray-500">{problem.description}</p>
    </AnimateContainer_add>
  );

  // 이미지+제목
  const ImageAndText = ({ image, title, children }) => (
    <AnimateContainer_text
      className={`w-full text-start mb-6 flex items-center
        ${animate_text ? 'ease-out' : ''
      }`}
    >
      <img src={image} alt={title} className="w-10 h-10 object-cover ml-5 mr-3" />
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="flex mt-3">{children}</div>
    </AnimateContainer_text>
  );

  // 아레나 랭크 연동하여 수정필요
  // const ArenaRank = [
  //   { title : '1', description: 'Username1'},
  //   { title : '2', description: 'Username2'},
  //   { title : '3', description: 'Username3'},
  //   { title : '4', description: 'Username4'},
  //   { title : '5', description: 'Username5'},
  // ]

  // 질문게시판과 연동하여 수정필요
  const popularQuestions = [
      { title: '1524 코드', description: '코드 질문이요~' },
      { title: '반례', description: '반례 좀 찾아주실분?' },
      { title: '아레나', description: '팀 구합니다' },
      { title: '아레나', description: '관련 질문이요' },
    ];
  // 문제페이지와 연동하여 수정 필요
  const addProblemSolve = [
      { title: '#6152', description: '별찍기 정복 8' },
      { title: '#6153', description: '별찍기 정복 9' },
      { title: '#6154', description: '별찍기 정복 10' },
      { title: '#6155', description: '별찍기 정복 11' },
      { title: '#6156', description: '별찍기 정복 12' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Arena Rank */}
      <ImageAndText image={Rank} title="아레나 순위"></ImageAndText>
      {/* 구분선 */}
      <div className='w-full mt-3'>
        <div className="mx-5 border-t-2 border-gray-300 my-2"></div>
      </div>
    
      {/* Popular Question */}
      <ImageAndText image={Hand} title="인기 질문"></ImageAndText>
      <div className="flex mt-3">
        {popularQuestions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))}
      </div>
      {/* 구분선 */}
      <div className='w-full mt-3'>
        <div className="mx-5 border-t-2 border-gray-300 my-2"></div>
      </div>

      {/* The Last Addtion */}
      <ImageAndText image={Plus} title="추가된 문제"></ImageAndText>
      <div className="flex mt-3">
        {addProblemSolve.map((problem, index) => (
        <ProblemCard key={index} problem={problem} />
        ))}
      </div>
    </div>
  );
}