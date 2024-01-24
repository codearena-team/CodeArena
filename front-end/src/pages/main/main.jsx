import React, { useRef } from 'react';
import 'tailwindcss/tailwind.css';
import MainPage1 from '../../components/main/MainPage1';
import MainPage2 from '../../components/main/MainPage2';
import MainPage3 from '../../components/main/MainPage3';
import MainPage4 from '../../components/main/MainPage4';
import MainPage5 from '../../components/main/MainPage5';

export default function Main() {
  const Page2Ref = useRef(null);
  const Page4Ref = useRef(null);

  const scrollToPage2 = () => {
    if (Page2Ref.current) {
      Page2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPage4 = () => {
    if (Page4Ref.current) {
      Page4Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <MainPage1 scrollToPage2={scrollToPage2} />
      <MainPage2 Page2Ref={Page2Ref} scrollToPage4={scrollToPage4} />
      <MainPage3 />
      <MainPage4 Page4Ref={Page4Ref}/>
      <MainPage5 />
    </div>
  );
}