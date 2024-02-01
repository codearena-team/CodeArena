import React, { useState } from "react";
import G_DividingLine from "./G_dividingLine";
import GroupTopInfo from './GroupTopInfo';

export default function GroupView() {

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

  return (
    <div>
      {/* 단체전 관전실 */}
      <GroupTopInfo />
      {/* 아래 채팅 */}
      <div className="competition-view mt-3" style={{ height: '85vh' }}>
        {/* 왼쪽(6)에 해당하는 부분 */}
        <div className="left-panel ml-3 mr-3 mt-1" style={{ width: `${panelWidths.left}%`}}>
          <div
            className="user-screens mt-5 rounded-xl shadow-lg flex items-center justify-center"
            style={{ width: '100%', height: '80%', backgroundColor: '#F5EBDB' }}
          >
            {/* "유저1의 화면이 보이는 공간 vs 유저2의 화면이 보이는 공간" */}
            {/* 각 유저의 화면 구성 (추가적인 스타일 및 컨텐츠 추가 필요) */}
            <div className="user-screen">관전자가 보는 플레이어의 화면</div>
          </div>
        </div>

        {/* 구분선을 기준으로 왼쪽(6):오른쪽(4)로 나누어져있음 */}
        {/* handleDividerMove를 통해 왼쪽 오른쪽 화면 비율 조정 */}
        <G_DividingLine onDividerMove={handleDividerMove} />

        {/* 오른쪽(4)에 해당하는 부분 */}
        <div className="right-panel mr-3 mt-1" style={{ width: `${panelWidths.right}%`, display: 'flex', flexDirection: 'column' }}>
          {/* 채팅 div */}
          <div
            className="ml-5 flex-grow"
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
            <div className="chat chat-start mt-3">
              <div className="chat-bubble chat-bubble-accent">좀만 ㄱㄷ</div>
            </div>
            <div className="chat chat-end mt-3">
              <div className="chat-bubble chat-bubble-success">ㅋㅋㅋㅋㅋ</div>
            </div>
            <div className="chat chat-start mt-3">
              <div className="chat-bubble chat-bubble-warning">나도 화장실 좀</div>
            </div>
          </div>
          {/* 입력 폼 */}
          <div className="flex justify-center items-center mb-5 relative bottom-20">
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
      </div>
    </div>
  );
}