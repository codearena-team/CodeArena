import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 'tailwindcss/tailwind.css';
import Logo from '../../images/main/LogoHome/Logo.png';
import '../css/BlinkingElement.css';

export default function LogoHome({ scrollToFourElement }) {
  const [animate, setAnimate] = useState(false); // 스크롤 애니메이트 상태 관리

  // 최초 렌더링 시에 대표 로고 나타나는 애니메이트
  const initialFadeInAnimation = keyframes`
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  `;

  // 로고 스크롤 애니메이트 이벤트
  const frameInAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(1%);
    }

    100%{
      opacity: 1;
      transform: translateY(0%);
    }
  `;

  const AnimateContainer = styled.div`
    &.frame-in {
      animation: ${frameInAnimation} 1.3s forwards;
    }
  `;

  const handleLogoClick = () => {
    if (scrollToFourElement) {
      scrollToFourElement();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldAnimate = window.scrollY < 700;
      setAnimate(shouldAnimate);
    };

    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 등록

    return () => {
      window.removeEventListener('scroll', handleScroll); // 클린업 함수에서 이벤트 리스너 제거
    };
  }, []);

  // 최초 렌더링 시 initial fade-in 애니메이션 적용
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <AnimateContainer
      className={`flex flex-col items-center justify-center h-screen
        ${animate ? 'frame-in' : ''
      }`}
    >
      <img
        src={Logo}
        alt="메인 로고"
        className='w-100 h-auto transition-transform duration-300 cursor-pointer'
        onClick={handleLogoClick}
      />
      <br />
      <br />
      <h1 className="text-xl font-bold text-gray-400 pb-40">지금 배틀에 참여하세요!</h1>
    </AnimateContainer>
  );
}