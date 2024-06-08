import React, { useRef } from 'react';
import 'tailwindcss/tailwind.css';
import LogoHome from '../../components/main/LogoHome';
import FourElement from '../../components/main/FourElement';
import Summary from '../../components/main/Summary';
import AboutUs from '../../components/main/AboutUs';
import Policy from '../../components/main/Policy';

export default function Main() {
  const fromRefLogoHome = useRef(null);
  const fromRefFourElement = useRef(null);

  // FourElement 페이지로 부드럽게 스크롤
  const scrollToFourElement = () => {
    if (fromRefLogoHome.current) {
      fromRefLogoHome.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // AboutUs 페이지로 부드럽게 스크롤
  const scrollToAboutUs = () => {
    if (fromRefFourElement.current) {
      fromRefFourElement.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <LogoHome scrollToFourElement={scrollToFourElement} />
      <FourElement fromRefLogoHome={fromRefLogoHome} scrollToAboutUs={scrollToAboutUs} />
      <Summary />
      <AboutUs fromRefFourElement={fromRefFourElement}/>
      <Policy />
    </div>
  );
}