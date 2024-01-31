import React, { useState } from "react";
import DividingLine from "./dividingLine";
import ExitModal from "../modal/ExitModal";

export default function CompetitionView() {
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
        <div className="competition-view" style={{ height: '950px'}}>
            {/* 왼쪽(6)에 해당하는 부분 */}
            <div className="left-panel mt-5 ml-3 mr-3" style={{ width: `${panelWidths.left}%` }}>
                {/* 왼쪽 상단 (유저 정보) */}
                <div
                    className="match-header rounded-xl shadow-lg"
                    style={{ width: '100%', height: '10%', backgroundColor: '#F5EBDB' }}
                >
                    {/* [사진]유저1 vs 유저2 [사진] 필요 */}
                    {/* 사진 및 유저 정보 추가 필요 */}
                    유저1 vs 유저2zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                </div>
                <div
                    className="user-screens mt-5 rounded-xl shadow-lg"
                    style={{ width: '100%', height: '75%', backgroundColor: '#F5EBDB' }}
                >
                    {/* "유저1의 화면이 보이는 공간 vs 유저2의 화면이 보이는 공간" */}
                    {/* 각 유저의 화면 구성 (추가적인 스타일 및 컨텐츠 추가 필요) */}
                    <div className="user-screen">유저1의 화면</div>
                    <div className="user-screen">vs</div>
                    <div className="user-screen">유저2의 화면</div>
                </div>
            </div>

            {/* 구분선을 기준으로 왼쪽(6):오른쪽(4)로 나누어져있음 */}
            {/* handleDividerMove를 통해 왼쪽 오른쪽 화면 비율 조정 */}
            <DividingLine onDividerMove={handleDividerMove} />

            {/* 오른쪽(4)에 해당하는 부분 (추가할 내용) */}
            <div className="right-panel mr-3 mt-5" style={{ width: `${panelWidths.right}%` }}>
                {/* 상단 버튼 영역 */}
                <div
                    className="flex justify-center items-center mb-3 ml-1"
                    style={{ width: '100%', height: '10%'}}
                >
                    {/* 문제보기 버튼 */}
                    <button
                        className="rounded-lg ml-5 shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
                        style={{ width: '100%', height: '100%', backgroundColor: '#F5EBDB' }}
                        onClick={() => {
                            // 버튼 클릭 시 처리할 기능 필요함
                        }}
                    >
                        문제보기
                    </button>
                    
                    {/* 나가기 버튼 */}
                    <button
                        className="rounded-lg ml-3 mr-3 shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
                        style={{ width: '100%', height: '100%', backgroundColor: '#F5EBDB' }}
                        onClick={() => document.getElementById('Exit').showModal()}
                    >
                        나가기
                    </button>
                    {<ExitModal />}
                </div>

                {/* 채팅 div */}
                <div
                    className="ml-5"
                    style={{ maxHeight: "calc(100% - 40px)", overflowY: "auto" }}
                >
                    <div className="chat chat-end mt-3">
                        <div className="chat-bubble chat-bubble-info">저거 저렇게 접근하는게 맞나요?</div>
                    </div>
                    <div className="chat chat-start mt-3">
                        <div className="chat-bubble chat-bubble-primary">저렇게하면 시간 초과 뜨던데 ㅋㅋ</div>
                    </div>
                    <div className="chat chat-start mt-3">
                        <div className="chat-bubble chat-bubble-secondary">아하 자바로 작성하면 저렇게 접근하는구나?</div>
                    </div>
                    <div className="chat chat-start mt-3">
                        <div className="chat-bubble chat-bubble-accent">이녀석 코딩 좀 하는녀석인가?</div>
                    </div>
                    <div className="chat chat-end mt-3">
                        <div className="chat-bubble chat-bubble-success">ㅋㅋㅋㅋㅋ</div>
                    </div>
                    <div className="chat chat-start mt-3">
                        <div className="chat-bubble chat-bubble-warning">아 꿀잼 ㅋㅋ</div>
                    </div>
                </div>
                {/* 입력 폼 */}
                <div className="flex justify-center items-center mb-3">
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
    );
} 