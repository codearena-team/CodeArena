import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ProblemSolve from '../../images/main/FourElement/ProblemSolve.gif';
import ProblemSolveAsset from '../../images/main/FourElement/ProblemSolve.png';
import CodeArena from '../../images/main/FourElement/CodeArena.gif';
import CodeArenaAsset from '../../images/main/FourElement/CodeArena.png';
import Community from '../../images/main/FourElement/Community.gif';
import CommunityAsset from '../../images/main/FourElement/Community.png';
import AboutUs from '../../images/main/FourElement/AboutUs.gif';
import AboutUsAsset from '../../images/main/FourElement/AboutUs.png';

// 스크롤 애니메이트 이벤트 1
const frameInAnimation_PS = keyframes`
  0% {opacity: 0; transform: translateX(-100%);}
  100%{opacity: 1; transform: translateX(0%);}
`;
const AnimateContainer_PS = styled.div`
  &.ease-in {
    animation: ${frameInAnimation_PS} 1.2s forwards;
  }
`;

// 스크롤 애니메이트 이벤트 2
const frameInAnimation_CA = keyframes`
  0% {opacity: 0; transform: translateX(100%);}
  100%{opacity: 1; transform: translateX(0%);}
`;
const AnimateContainer_CA = styled.div`
  &.ease-in {
    animation: ${frameInAnimation_CA} 1.2s forwards;
  }
`;

// 스크롤 애니메이트 이벤트 3
const frameInAnimation_CM = keyframes`
  0% {opacity: 0; transform: translateX(-100%);}
  100%{opacity: 1; transform: translateX(0%);}
`;
const AnimateContainer_CM = styled.div`
  &.ease-in {
    animation: ${frameInAnimation_CM} 1.2s forwards;
  }
`;

// 스크롤 애니메이트 이벤트 4
const frameInAnimation_AU = keyframes`
  0% {opacity: 0; transform: translateX(100%);}
  100%{opacity: 1; transform: translateX(0%);}
`;

const AnimateContainer_AU = styled.div`
  &.ease-in {
    animation: ${frameInAnimation_AU} 1.2s forwards;
  }
`;


export default function FourElement({ fromRefLogoHome, scrollToAboutUs }) {
  const navigate = useNavigate();
  const [isProblemSolveHovered, setIsProblemSolveHovered] = useState(false);
  const [isCodeArenaHovered, setIsCodeArenaHovered] = useState(false);
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isAboutUsHovered, setIsAboutUsHovered] = useState(false);
  const [animate_PS, setAnimate_PS] = useState(false);
  const [animate_CA, setAnimate_CA] = useState(false);
  const [animate_CM, setAnimate_CM] = useState(false);
  const [animate_AU, setAnimate_AU] = useState(false);

  const handleLogoClick = () => {
    if (scrollToAboutUs) {
      scrollToAboutUs();
    }
  };

  const handleCodeArenaClick = () => {
    navigate('/arena');
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldAnimate = window.scrollY < 1550 && window.scrollY > 450;
      setAnimate_PS(shouldAnimate);
      setAnimate_CA(shouldAnimate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldAnimate = window.scrollY < 1550 && window.scrollY > 450;
      setAnimate_CM(shouldAnimate);
      setAnimate_AU(shouldAnimate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={fromRefLogoHome}
      className="flex items-center justify-center h-screen relative"
    > 
      {/* 왼쪽위 - 프라블럼솔브 gif*/}
      <AnimateContainer_PS
        className={`absolute top-20 left-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden
          ${animate_PS ? 'ease-in' : ''
        }`}
        style={{
          left: '-20px',
          // 마우스 hover 확대 기능
          transform: isProblemSolveHovered ? 'scale(1.15)' : 'scale(1)',
          // 애니메이션 (0.3초 부드럽게)
          transition: 'transform 0.3s ease-in-out',
          zIndex: isProblemSolveHovered ? 1 : 'auto',
        }}
        // 마우스 커서 hover 작동시키기
        onMouseEnter={() => setIsProblemSolveHovered(true)}
        onMouseLeave={() => setIsProblemSolveHovered(false)}
      > 
        <Link to="/problem">
        <img
          // 마우스 올리면 gif, 마우스 나가면 png
          src={isProblemSolveHovered ? ProblemSolve : ProblemSolveAsset}
          alt="Problem_Solve"
          className="w-full h-full object-cover"
          style={{ mask: 'url(#trapezoidMask)' }}
        />
        </Link>
        <svg height="0" width="0">
          <mask id="trapezoidMask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <polygon points="0,0 0,1 1,1 0.7,1 1,0" fill="white" />
          </mask>
        </svg>
      </AnimateContainer_PS>

      {/* 우측위 - 코드아레나 gif */}
      <AnimateContainer_CA
        className={`absolute top-20 right-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden
          ${animate_CA ? 'ease-in' : ''
        }`}
        style={{
          right: '-20px',
          transform: isCodeArenaHovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: isCodeArenaHovered ? 1 : 'auto',
        }}
        onMouseEnter={() => setIsCodeArenaHovered(true)}
        onMouseLeave={() => setIsCodeArenaHovered(false)}
      > <Link to="/arena">
        <img
          src={isCodeArenaHovered ? CodeArena : CodeArenaAsset}
          alt="Code_Arena"
          className="w-full h-full object-cover"
          style={{ mask: 'url(#trapezoidMask2)' }}
          onClick={handleCodeArenaClick}
        />
        </Link>
        <svg height="0" width="0">
          <mask id="trapezoidMask2" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          <polygon points="0,0 1,0 1,1 0,1 0.3,0" fill="white" />
          </mask>
        </svg>
      </AnimateContainer_CA>

      {/* 왼쪽아래 - 커뮤니티 gif */}
      <AnimateContainer_CM
        className={`absolute bottom-12 left-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden
          ${animate_CM ? 'ease-in' : ''
        }`}
        style={{
          left: '-20px',
          // 마우스 hover 기능 작용
          transform: isCommunityHovered ? 'scale(1.15)' : 'scale(1)',
          // 애니메이션 입히기
          transition: 'transform 0.3s ease-in-out',
          zIndex: isCommunityHovered ? 1 : 'auto',
        }}
        onMouseEnter={() => setIsCommunityHovered(true)}
        onMouseLeave={() => setIsCommunityHovered(false)}
      > <Link to="/community">
        <img
          src={isCommunityHovered ? Community : CommunityAsset}
          alt="Community"
          className="w-full h-full object-cover"
          style={{ mask: 'url(#trapezoidMask3)' }}
          />
        </Link>
        <svg height="0" width="0">
          <mask id="trapezoidMask3" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          <polygon points="0,0 0.7,0 1,1 0,1 0,0" fill="white" />
          </mask>
        </svg>
      </AnimateContainer_CM>

      {/* 오른쪽아래 - 어바웃어스 gif */}
      <AnimateContainer_AU
        className={`absolute bottom-12 right-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden cursor-pointer
          ${animate_AU ? 'ease-in' : ''
        }`}
        style={{
          right: '-20px',
          // 마우스 hover 기능 작용
          transform: isAboutUsHovered ? 'scale(1.15)' : 'scale(1)',
          // 애니메이션 입히기
          transition: 'transform 0.3s ease-in-out',
          zIndex: isAboutUsHovered ? 1 : 'auto',
        }}
        onMouseEnter={() => setIsAboutUsHovered(true)}
        onMouseLeave={() => setIsAboutUsHovered(false)}
      > 
        <img
          src={isAboutUsHovered ? AboutUs : AboutUsAsset}
          alt="About_Us"
          className="w-full h-full object-cover"
          style={{ mask: 'url(#trapezoidMask4)' }}
          onClick={handleLogoClick}
          />
        <svg height="0" width="0">
          <mask id="trapezoidMask4" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          <polygon points="0,0 1,0 1,1 0.3,1 0,0" fill="white" />
          </mask>
        </svg>
      </AnimateContainer_AU>
    </div>
  );
}