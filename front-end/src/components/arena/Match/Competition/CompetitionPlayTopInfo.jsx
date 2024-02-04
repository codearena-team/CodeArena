import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompAbstentionModal from '../../modal/Competition/CompabstentionModal';

import cat_one from '../../../../images/arena/GroupView/cat_one.png';
import cat_two from '../../../../images/arena/GroupView/cat_two.png';
import cat_three from '../../../../images/arena/GroupView/cat_three.png';
import cat_four from '../../../../images/arena/GroupView/cat_four.png';
import cat_five from '../../../../images/arena/GroupView/cat_five.png';
import cat_six from '../../../../images/arena/GroupView/cat_six.png';
import cat_seven from '../../../../images/arena/GroupView/cat_seven.png';
import cat_eight from '../../../../images/arena/GroupView/cat_eight.png';
import cat_nine from '../../../../images/arena/GroupView/cat_nine.png';

export default function UserInfo() {
  const [panelWidths, setPanelWidths] = useState({
    left: 75,
    right: 20,
  });
  // 가상 데이터
  const userData = [
    { name: "유저 화면 1", id: 1 },
    { name: "유저 화면 2", id: 2 },
    { name: "유저 화면 3", id: 3 },
    { name: "유저 화면 4", id: 4 },
    { name: "유저 화면 5", id: 5 },
    { name: "유저 화면 6", id: 6 },
    { name: "유저 화면 7", id: 7 },
    { name: "유저 화면 8", id: 8 },
    { name: "유저 화면 9", id: 9 },
  ];

  // 가상 화면
  const catImages = [cat_one, cat_two, cat_three, cat_four, cat_five, cat_six, cat_seven, cat_eight, cat_nine];

  // 캐러셀 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0', 
    prevArrow: false,
    nextArrow: false,
  };

  return (
    <div className="flex">
      {/* Group 관전 상단에 유저 정보를 제공할 페이지 */}
      <Slider {...settings} style={{ width: `${panelWidths.left}%` }}>
        {userData.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-center ml-5 text-center"
            style={{ width: 'auto', height: 'auto', backgroundColor: '#E3E6D9' }}
          >
            <div
              className="mx-auto flex items-center justify-center rounded-xl shadow-lg mb-2"
              style={{ width: "80%", height: '200px', backgroundColor: '#F5EBDB' }}
            >
              {/* User의 각 화면 띄울 곳 (지금은 고양이) */}
              <img src={catImages[user.id - 1]} alt={`User ${user.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </Slider>

      {/* 우측 상단 버튼 영역 */}
      <div
        className="justify-center items-center mt-2 ml-10"
        style={{ width: `${panelWidths.right}%`, height: '12.5vh' }}
      >
        {/* 나가기 버튼 */}
        <button
          className="rounded-lg mt-3 shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
          style={{ width: '100%', height:'100%', backgroundColor: '#F5EBDB' }}
          onClick={() => document.getElementById('comp_abstention').showModal()}
        >
          나가기
        </button>
        {<CompAbstentionModal />}
      </div>
    </div>
  );
}