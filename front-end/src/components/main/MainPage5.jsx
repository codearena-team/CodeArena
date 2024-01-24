import React from 'react';
import 'tailwindcss/tailwind.css';

import ssafy from '../../images/main/MainPage4/ssafy.png';

const ImageAndText = ({ image, title, children }) => (
    <div className="w-full text-start mb-6 flex items-center">
      <img src={image} alt={title} className="w-1/4 object-cover ml-5 mr-3" />
      <div>
        <h1 className="text-md ml-4 font-bold">{title}</h1>
      </div>
      <div className="flex mt-3">{children}</div>
    </div>
  );

export default function MainPage5() {
  return (
    <div className="flex items-center">
      <div className="ml-6">
        <p className="text-lg">
          삼성전자한마음프라자
        </p>
        <p className="text-lg">
          경북 구미시 3공단3로 302 (임수동)
        </p>
        <ImageAndText image={ssafy} title="약관 | 개인정보 처리방침 | 오픈 소스 | 업데이트 노트"></ImageAndText>
      </div>
    </div>
  );
}
