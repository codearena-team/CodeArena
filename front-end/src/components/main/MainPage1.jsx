import React from 'react';
import 'tailwindcss/tailwind.css';
import Logo from '../../images/main/MainPage1/Logo.png';

export default function MainPage1({ scrollToPage2 }) {
  // const Page2Ref = useRef(null);

  const handleLogoClick = () => {
    if (scrollToPage2) {
      scrollToPage2();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={Logo}
        alt="메인 로고"
        className='w-100 h-auto hover:scale-125 transition-transform duration-300 cursor-pointer'
        onClick={handleLogoClick}
      />
      <br />
      <br />
      <h1 className="text-2xl font-bold text-gray-400">지금 배틀에 참여하세요!</h1>
    </div>
  );
}