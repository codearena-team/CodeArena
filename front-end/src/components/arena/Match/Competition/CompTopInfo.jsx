import React, { useState } from "react";
import C_ExitModal from "../../modal/Competition/C_ExitModal";
import DetailWindow from '../../../problem/DetailWindow';
import { useEffect } from "react";
import axios from "axios";
import './../../../css/testcasemodal.css'

export default function TopInfo({ gameExitId,problemId}) {
  const [panelWidths, setPanelWidths] = useState({
    left: 60,
    right: 40,
  });
  const [problem,setProblem] = useState([])
  const [problemTitle,setProblemTitle] = useState('')

  useEffect(()=> {
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
          onClick={()=>document.getElementById('openProblem').showModal()}
        >
          문제보기
        </button>
        {/* 문제모달창 */}
        <dialog id="openProblem" className="modal">
          <div style={{backgroundColor: '#F5EBDB'}} className="modal-box w-11/12 max-w-5xl scrollBar" >
            <div className="rounded-lg p-5 mb-3" style={{backgroundColor: '#F4ECE4'}}>
              <div className="flex items-center">
                <p className="mr-2">#{problemId}</p>
                <h3 className="font-bold text-2xl">{problemTitle}</h3>
              </div>
            </div>
            <div className="rounded-lg p-4 " style={{backgroundColor: '#F4ECE4'}}>
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