import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import CompAbstentionModal from '../../modal/Competition/CompabstentionModal';
import CompGoResultModal from "../../modal/Competition/CompGoResultModal";
import VS from '../../../../images/arena/HotMatch/VS.png'

export default function UserInfo() {
  const Location = useLocation();

  const [panelWidths, setPanelWidths] = useState({
    left: 75,
    right: 20,
  });

  const [userData, setUserData] = useState([]);
  // const [userNickname, setUserNickName] = useState([]);
  // const [userThumnail, setUserThumnail] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    console.log(Location.state);
    const { userId, userNickname } = Location.state;

    // setUserNickName(userNickname.current);
    // setUserThumnail(userThumnail.current);
    setUserId(userId.current);

    axios.get('https://i10d211.p.ssafy.io/game/')
    .then((res)=> {
      setUserData(res.data)
      console.log(res.data);
    })
  }, [])

  return (
    <div className="flex">
      <div>
        {/* Group 관전 상단에 유저 정보를 제공할 페이지 */}
        {userData.map((user) => (
          <div
            key={userId}
            className="carousel-item flex items-center justify-center"
            style={{ width:'100%' }}
          >
            <div className="rounded-xl ml-2 w-1/3 shadow-xl p-5 mb-2" style={{ backgroundColor: '#F4F5F1' }}>
              {/* 유저1 vs 유저2 사진 */}
              <div className="mt-5 flex items-center justify-between">
                <img src={userId?.player1Ssumnail} alt={user.id} className="w-1/3 h-100 rounded-2xl shadow-xl" />
                <span>{userId.player1Nickname}</span>
                <img src={VS} alt="VS" className="w-1/4 h-100 rounded-lg" />
                <img src={userId?.player2Ssumnail} alt={user.id} className="w-1/3 h-100 rounded-2xl shadow-xl" />
                <span>{userId.player2Nickname}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* 상대 화면 보여줄 웹RTC 연결 공간 */}
      </div>

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

        {/* 결과창 이동 버튼 */}
        <button
          className="rounded-lg mt-3 shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
          style={{ width: '100%', height:'100%', backgroundColor: '#F5EBDB' }}
        >
          결과창 이동(임시)
        </button>
        <CompGoResultModal />

      </div>
    </div>
  );
}