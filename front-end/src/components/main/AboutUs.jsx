import React from 'react';
import 'tailwindcss/tailwind.css';

import Introduce from '../../images/main/AboutUs/Introduce.gif';
import We from '../../images/main/AboutUs/We.gif';

export default function AboutUs({ fromRefFourElement }) {
  return (
    <div ref={fromRefFourElement} className="flex items-center justify-center h-screen relative">
      {/* 회색 선 - 위쪽 */}
      <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 z-0"></div>
      
      {/* 왼쪽 - Introduce GIF */}
      <div className="absolute top-10 left-0 flex-shrink-0 w-1/2 h-full md:w-2/3 lg:w-2/3 xl:w-1/2 p-6 z-20">      
        <img src={Introduce} alt="Introduce" className="w-full h-3/4 object-cover rounded-lg shadow-lg" />
      </div>

      {/* 오른쪽 - About Us 문구 */}
      <div className="absolute top-20 right-0 mt-2 flex flex-col w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/2 z-10 mb-72">
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
          <br />
          <br />
          <img src={We} alt="위~" className='z-0' />
      </div>

      {/* 회색 선 - 아래쪽 */}
      <div className="absolute bottom-56 left-0 right-0 h-1 bg-gray-200 z-10"></div>
    </div>
  );
}