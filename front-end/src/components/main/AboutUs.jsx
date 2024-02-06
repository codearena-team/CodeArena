import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 'tailwindcss/tailwind.css';

import Introduce from '../../images/main/AboutUs/Introduce.gif';
import We from '../../images/main/AboutUs/We.gif';

const frameInAnimation_gif = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100%{
    opacity: 1;
    transform: translateX(0%);
  }
`;

const AnimateContainer_gif = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.frame-in {
    animation: ${frameInAnimation_gif} 1s forwards;
  }
`;

const frameInAnimation_font = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100%{
    opacity: 1;
    transform: translateX(0%);
  }
`;

const AnimateContainer_font = styled.div`
  display: flex;


  &.frame-in {
    animation: ${frameInAnimation_font} 1s forwards;
  }
`;

export default function AboutUs({ fromRefFourElement }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 특정 조건을 확인하여 animate 상태 토글
      const shouldAnimate = window.scrollY > 1500;
      setAnimate(shouldAnimate);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 마운트될 때 애니메이션을 트리거
    setAnimate(true);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={fromRefFourElement} className="flex items-center justify-center h-screen relative">
      {/* 위쪽과 아래쪽만 보일 div */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 flex flex-col">
        {/* 위쪽의 선 */}
        <div className='w-full'>
            <div className="mx-5 border-t-2 border-gray-300 my-2"></div>
        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div className="flex-shrink-0 w-1/2 flex flex-col items-center">
          {/* 왼쪽 - Introduce GIF */}
          <AnimateContainer_gif
            className={`absolute top-0 left-0 flex-shrink-0 w-full h-full md:w-2/3 lg:w-2/3 xl:w-1/2 p-6 z-20
              ${animate ? 'frame-in' : ''
            }`}
          >      
            <img
              src={Introduce}
              alt="Introduce"
              className="w-full h-4/5 object-cover rounded-lg shadow-lg" />
          </AnimateContainer_gif>

          {/* 오른쪽 - About Us 문구 */}
          <AnimateContainer_font
            className={`absolute top-44 right-0 mt-2 flex flex-col w-full md:w-1/3 lg:w-1/3 xl:w-1/2 z-10 mb-72
              ${animate ? 'frame-in' : ''
            }`}>
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-lg">
              새로운 코딩의 세계 코드 아레나에 오신 것을 환영합니다!
            </p>
            <p className="text-lg">
              실시간 코딩 배틀의 특별함을 더해 코딩에 흥미를 느껴보세요!
            </p>
            <p className="text-lg">
              개발자들은 여기에서 서로의 실력을 겨루며, 문제 해결 능력을 향상시키고 새로운 아이디어를 찾아갈 수 있습니다.
            </p>
            <p className="text-lg">
              함께 성장하고 발전하는 코딩 커뮤니티, 코드 아레나!
            </p>
            <img src={We} alt="We have.." className='mt-5 z-0 w-3/4'/>
          </AnimateContainer_font>
        </div>
      </div>
    </div>
  );
}