import React, { useState } from "react";
import GroupLobbyLine from "./GroupLobbyLine";
import GroupLobbyExitModal from '../../modal/Group/GroupLobbyExitModal'
import StartModal from "../../modal/Group/StartModal";

import cat_one from '../../../../images/arena/GroupView/cat_one.png';
import cat_two from '../../../../images/arena/GroupView/cat_two.png';
import cat_three from '../../../../images/arena/GroupView/cat_three.png';
import cat_four from '../../../../images/arena/GroupView/cat_four.png';
import cat_five from '../../../../images/arena/GroupView/cat_five.png';
import cat_six from '../../../../images/arena/GroupView/cat_six.png';

export default function GroupLobby() {

  // 왼쪽과 오른쪽 패널의 너비를 나타내는 상태 -> 처음 렌더링 되었을 때 6:4 비율 
  const [panelWidths, setPanelWidths] = useState({
    left: 60,
    right: 40,
  });

  // 구분선 이동에 따른 왼쪽과 오른쪽 패널 비율 조정
  const handleDividerMove = (newPosition) => {
      const leftPanelWidth = newPosition;
      const rightPanelWidth = 100 - newPosition;

      // 비율 유지를 위해 스타일에 적용
      setPanelWidths({ left: leftPanelWidth, right: rightPanelWidth });
  };

  // 가상 데이터
  const userData = [
    { name: "유저 화면 1", id: 1, superuser: true },
    { name: "유저 화면 2", id: 2, superuser: false },
    { name: "유저 화면 3", id: 3, superuser: false },
    { name: "유저 화면 4", id: 4, superuser: false },
    { name: "유저 화면 5", id: 5, superuser: false },
    { name: "유저 화면 6", id: 6, superuser: false },
  ];

  // 가상 화면
  const userImages = [cat_one, cat_two, cat_three, cat_four, cat_five, cat_six];

  return (
    <div>
      {/* 단체전 플레이 로비 컴포넌트 */}
      <div className="competition-view" style={{ height: '100vh' }}>
        {/* 왼쪽(6)에 해당하는 부분 */}
        <div className="left-panel ml-3 mr-1" style={{ width: `${panelWidths.left}%`}}>
          <div
            className="user-screens mt-5 rounded-xl shadow-lg flex flex-wrap items-center justify-center"
            style={{ width: '100%', height: '50%', backgroundColor: '#F5EBDB' }}
          >
            {/* 각 유저의 화면 구성 (추가적인 스타일 및 컨텐츠 추가 필요) */}
            {userData.map((user) => (
              <div key={user.id} className="user-screen" style={{ flex: '0 0 33.3333%', maxWidth: '33.3333%' }}>
                {/* 참가 유저 목록 보이는 곳 */}
                <img
                  src={userImages[user.id - 1]} alt={`User ${user.id}`}
                  className="rounded-xl shadow-md ml-3"
                  style={{ width: '80%', height: '100%' }}
                />
              </div>
            ))}
          </div>
          {/* 채팅 div */}
          <div
            className="ml-3 mt-3 flex-grow"
            style={{ maxHeight: "calc(100% - 40px)", overflowY: "auto" }}
          >
            <div className="chat chat-end mt-3">
              <div className="chat-bubble chat-bubble-info">방장님 시작좀요</div>
            </div>
            <div className="chat chat-start mt-3">
              <div className="chat-bubble chat-bubble-primary">방장 뭐함 ㅋㅋ</div>
            </div>
            <div className="chat chat-start mt-3">
              <div className="chat-bubble chat-bubble-secondary">방장님 잠시 화장실가셨어요</div>
            </div>
          </div>
          {/* 입력 폼 */}
          <div className="flex justify-center items-center mb-5 mt-2 relative bottom-0">
            <div className="w-5/6">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  className="rounded-full border-2 border-gray-300 px-4 py-2 flex-grow focus:outline-none focus:border-blue-400"
                  placeholder=" 메시지를 입력하세요...!"
                />
                <button
                  className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2 focus:outline-none"
                  onClick={() => {
                      // 입력 버튼 클릭 시 처리할 기능 필요함
                  }}
                >
                  입력
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 구분선을 기준으로 왼쪽(6):오른쪽(4)로 나누어져있음 */}
        {/* handleDividerMove를 통해 왼쪽 오른쪽 화면 비율 조정 */}
        <GroupLobbyLine onDividerMove={handleDividerMove} />

        {/* 오른쪽(4)에 해당하는 부분 */}
        <div className="right-panel mr-5" style={{ width: `${panelWidths.right}%`, display: 'flex', flexDirection: 'column' }}>
          {/* 상단 (팔로우 목록) */}
          <div
            className="user-follow-list mt-5 ml-7 mb-3 rounded-xl shadow-lg "
            style={{ height: '50%', backgroundColor: '#F5EBDB' }}
          >
            {/* 팔로우 목록 컨텐츠 */}
            <div className="user-follow-item">나의 팔로우 목록</div>
            {/* ... Add more user-follow-item as needed */}
          </div>

          {/* 하단 (스타트, 나가기) */}
          <div
            className="flex mt-10 ml-7"
            style={{ width: `100%`, height: '12.5vh' }}
          >
            {/* 아레나 스타트 버튼 */}
            {userData.map((user) => (
              // 방장인 경우에만 Arena Start 버튼이 보인다.
              user.superuser && (
                <button
                  key={user.id}
                  className="rounded-lg shadow-lg py-2 mr-3 focus:outline-none text-2xl font-bold hover:scale-105"
                  style={{ width: '100%', height: '100%', backgroundColor: '#FFB5A6' }}
                  onClick={() => {
                    document.getElementById(`ArenaStart_${user.id}`).showModal()
                  }}
                >
                  Arena Start !
                  {/* Arena Start 모달 소환 */}
                  <StartModal ArenaGroupId={user.id} />
                </button>
              )
            ))}

            {/* 나가기 버튼 */}
            <button
              className="rounded-lg shadow-lg mr-10 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
              style={{ width: '100%', height:'100%', backgroundColor: '#F5EBDB' }}
              onClick={() => document.getElementById('GroupPlayExitModal').showModal()}
            >
              나가기
            </button>
            {<GroupLobbyExitModal />}
          </div>
        </div>
      </div>
    </div>
  );
}