import React, { useState } from "react";
import C_ExitModal from "../../modal/Competition/C_ExitModal";

export default function TopInfo({ gameExitId }) {
  const [panelWidths, setPanelWidths] = useState({
    left: 60,
    right: 40,
  });

  return (
    <div className="flex">
      {/* 왼쪽 상단 (유저 정보) */}
      <div className="match-header rounded-xl shadow-lg ml-2 mt-2 mr-5"
      style={{
        width: `${panelWidths.left}%`,
        height: 'auto',
        backgroundColor: '#F5EBDB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start' }}
      >
        {/* [사진]유저1 vs 유저2 [사진] 필요 */}
        {/* 사진 및 유저 정보 추가 필요 */}
        <span style={{ margin: '0 auto' }}>(사진) 유저1 vs 유저2 (사진)</span>
      </div>

      {/* 우측 상단 버튼 영역 */}
      <div
        className="flex justify-center items-center mt-2"
        style={{ width: `${panelWidths.right}%`, height: '7.5vh' }}
      >
        {/* 문제보기 버튼 */}
        <button
          className="rounded-lg shadow-lg px-4 py-2 focus:outline-none text-2xl font-bold hover:scale-105"
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
          onClick={() => document.getElementById('compPlay_Exit').showModal()}
        >
          나가기
        </button>
        <C_ExitModal gameExitId={gameExitId}/>
      </div>
    </div>
  );
}