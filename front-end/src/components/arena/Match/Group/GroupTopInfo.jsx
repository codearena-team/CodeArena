import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import G_ExitModal from "../../modal/Group/G_ExitModal";
import Webrtc from "../../../../pages/test/Webrtc";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DetailWindow from '../../../problem/DetailWindow';
import axios from "axios";
import { useEffect } from "react";

import cat_one from '../../../../images/arena/GroupView/cat_one.png';
import cat_two from '../../../../images/arena/GroupView/cat_two.png';
import cat_three from '../../../../images/arena/GroupView/cat_three.png';
import cat_four from '../../../../images/arena/GroupView/cat_four.png';
import cat_five from '../../../../images/arena/GroupView/cat_five.png';
import cat_six from '../../../../images/arena/GroupView/cat_six.png';
import cat_seven from '../../../../images/arena/GroupView/cat_seven.png';
import cat_eight from '../../../../images/arena/GroupView/cat_eight.png';
import cat_nine from '../../../../images/arena/GroupView/cat_nine.png';

export default function UserInfo({problemId}) {
  const [problem,setProblem] = useState([])
  const [problemTitle,setProblemTitle] = useState('')
  const params = useParams()
  const userNickname = useSelector(state=> state.auth.userNickname)
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
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0', 
    prevArrow: false,
    nextArrow: false,
  };


  
  useEffect(()=> {
    console.log(`여기여기여기여기여기 ${problemId}`)
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/problem/${problemId}`,
    })
    .then((res)=> {
      console.log(res);
      setProblem(res.data.data);
      setProblemTitle(res.data.data.problemTitle);
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])



  return (
    <div className="flex">
      {/* Group 관전 상단에 유저 정보를 제공할 페이지 */}
      {/* <Slider {...settings} style={{ width: `${panelWidths.left}%` }}> */}
        <div style={{ width: `${panelWidths.left}%`, height:'25vh'}}>
          <Webrtc 
            userNickname={userNickname}
            customSessionId={params.id}
            // width='300px'
            height='200px'
            isPlayer={false}
          />
        </div>
      {/* </Slider> */}

      {/* 우측 상단 버튼 영역 */}
      <div
        className="justify-center items-center mt-2 ml-10"
        style={{ width: `${panelWidths.right}%`, height: '12.5vh' }}
      >
        {/* 문제보기 버튼 */}
        <button
          className="rounded-lg shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
          style={{ width: '100%', height:'100%', backgroundColor: '#F5EBDB' }}
          onClick={()=>document.getElementById('openProblem').showModal()}
        >
          문제보기
        </button>
         {/* 문제모달창 */}
         <dialog id="openProblem" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="rounded-lg p-5 mb-5" style={{backgroundColor: '#F4ECE4'}}>
              <div className="flex items-center">
                <p className="mr-2">#{problemId}</p>
                <h3 className="font-bold text-2xl">{problemTitle}</h3>
              </div>
            </div>
            <div className="rounded-lg p-5 " style={{backgroundColor: '#F4ECE4'}}>
              <DetailWindow problem={problem}/>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm"
                style={{backgroundColor:'#FECDD3'}}>닫기</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* 나가기 버튼 */}
        <button
          className="rounded-lg mt-3 shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
          style={{ width: '100%', height:'100%', backgroundColor: '#F5EBDB' }}
          onClick={() => document.getElementById('Exit').showModal()}
        >
          나가기
        </button>
        {<G_ExitModal />}
      </div>
    </div>
  );
}