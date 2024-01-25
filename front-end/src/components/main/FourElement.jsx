import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import ProblemSolve from '../../images/main/FourElement/ProblemSolve.gif';
import ProblemSolve2 from '../../images/main/FourElement/ProblemSolve.png';
import CodeArena from '../../images/main/FourElement/CodeArena.gif';
import CodeArena2 from '../../images/main/FourElement/CodeArena.png';
import Community from '../../images/main/FourElement/Community.gif';
import Community2 from '../../images/main/FourElement/Community.png';
import AboutUs from '../../images/main/FourElement/AboutUs.gif';
import AboutUs2 from '../../images/main/FourElement/AboutUs.png';

export default function FourElement({ fromRefLogoHome, scrollToAboutUs }) {
  const [isProblemSolveHovered, setIsProblemSolveHovered] = useState(false);
  const [isCodeArenaHovered, setIsCodeArenaHovered] = useState(false);
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isAboutUsHovered, setIsAboutUsHovered] = useState(false);

  const handleLogoClick = () => {
    if (scrollToAboutUs) {
      scrollToAboutUs();
    }
  };

  return (
    <div ref={fromRefLogoHome} className="flex items-center justify-center h-screen relative">
      {/* 왼쪽위 - 프라블럼솔브 gif*/}
      <div
        className="absolute top-20 left-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden"
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
        <Link to="/problemsolve">
        <img
          // 마우스 올리면 gif, 마우스 나가면 png
          src={isProblemSolveHovered ? ProblemSolve : ProblemSolve2}
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
      </div>

      {/* 우측위 - 코드아레나 gif */}
      <div
        className="absolute top-20 right-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden"
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
          src={isCodeArenaHovered ? CodeArena : CodeArena2}
          alt="Code_Arena"
          className="w-full h-full object-cover"
          style={{ mask: 'url(#trapezoidMask2)' }}
          />
        </Link>
        <svg height="0" width="0">
          <mask id="trapezoidMask2" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          <polygon points="0,0 1,0 1,1 0,1 0.3,0" fill="white" />
          </mask>
        </svg>
      </div>

      {/* 왼쪽아래 - 커뮤니티 gif */}
      <div
        className="absolute bottom-12 left-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden"
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
      > <Link to="/board">
        <img
          src={isCommunityHovered ? Community : Community2}
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
      </div>

      {/* 오른쪽아래 - 어바웃어스 gif */}
      <div
        className="absolute bottom-12 right-0 w-3/5 h-2/5 clip-path-pentagon overflow-hidden"
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
          src={isAboutUsHovered ? AboutUs : AboutUs2}
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
      </div>
    </div>
  );
}