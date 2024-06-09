import React from 'react';
import 'tailwindcss/tailwind.css';
import ssafy from '../../images/main/Policy/ssafy.png';

export default function Policy() {
  const ImageAndText = ({ image, title }) => (
    <div className="w-full text-start pb-5 flex items-end">
      <img src={image} alt={title} className="w-1/2 object-center object-cover pl-5 pr-2" />
        <div className='w-full flex-col items-center'>
          <p className="font-bold text-lg">삼성 전자 한마음프라자</p>
          <p className="text-sm">경북 구미시 3공단3로 302 (임수동)</p>
        <h1 className="text-md text-gray-400">{title}</h1>
        </div>
    </div>
  );

  return (
    <div className="flex items-center">
      <div className="pl-6">
        <ImageAndText image={ssafy} title="약관 | 개인정보 처리방침 | 오픈 소스 | 업데이트 노트"></ImageAndText>
      </div>
    </div>
  );
}
