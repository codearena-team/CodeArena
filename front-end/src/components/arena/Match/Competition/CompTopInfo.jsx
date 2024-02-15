import React, { useState } from "react";
import C_ExitModal from "../../modal/Competition/C_ExitModal";
import DetailWindow from '../../../problem/DetailWindow';
import { useEffect } from "react";
import axios from "axios";
import './../../../css/testcasemodal.css'
import VS from '../../../../images/arena/HotMatch/VS.png'

export default function CompTopInfo({ gameExitId, problemId, game}) {
  const [panelWidths, setPanelWidths] = useState({
    left: 60,
    right: 40,
  });
  const [problem,setProblem] = useState([])
  const [problemTitle,setProblemTitle] = useState('')

  const onClick = ()=> {
    axios({
      method : 'get',
      url : `https://codearena.shop/api/problem/${game.problemId}`,
    })
    .then((res)=> {
      console.log(res);
      setProblem(res.data.data);
      setProblemTitle(res.data.data.problemTitle);
    })
    .catch((err)=> {
      console.log(err);
    })
    document.getElementById('openProblem').showModal()
  }


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
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col mr-20">
            <div style={{ width: "125px", height: "125px"}} >
              <img
                src={game?.userRedSsumnail}
                alt="플레이어1 이미지"
                className="rounded-full shadow-lg"
                style={{width: "100%", height: "100%"}}
              />
            </div>
            <span className="text-center mt-3 text-2xl">{game?.userRedNickname}</span>
          </div>
          <img
            src={VS} alt="vs" 
            style={{width: "10%", padding: "1%"}}
          />
          <div className="flex flex-col ml-20">
            <div style={{ width: "125px", height: "125px"}} >
              <img
                src={game?.userBlueSsumnail}
                alt="상대 이미지"
                className="rounded-full shadow-lg"
                style={{width: "100%", height: "100%"}}
              />
            </div>
            <span className="text-center mt-3 text-2xl">{game?.userBlueNickname}</span>
          </div>
        </div>
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
          onClick={onClick}
        >
          문제보기
        </button>
        {/* 문제모달창 */}
        <dialog id="openProblem" className="modal">
          <div style={{backgroundColor: '#F7F6E4'}} className="modal-box w-11/12 max-w-5xl scrollBar" >
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