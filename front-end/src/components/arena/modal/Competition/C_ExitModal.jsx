import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function CompetitionExitModal({ gameExitId }) {
    
  // console.log("게임ExitId 여깄어요 :", gameExitId)
  // const gameId = gameExitId
  // // 퇴장했을 때 1번 알림 알리기

  // const params = new URLSearchParams();
  // params.append("gameId", gameId);
  // const handleExitMessage = () => {
  //   axios.get('https://i10d211.p.ssafy.io/game/chat/exit', params)
  //     .then(
  //       console.log("params 보냈음")
  //     ).catch (
  //       console.log('못보냈음')
  //     )
  // }

  return (
      <div>
          <dialog id="compPlay_Exit" className="modal">
          <div className="modal-box">
              <h3 className="font-bold text-lg mb-4 text-center">정말로 나가시겠습니까?</h3>
              <div className="modal-action flex justify-center">
                  <Link to="/game-list/competition" method="dialog">
                      <button  className="btn">예</button> {/* 나가면 다시 방 리스트로 이동 */}
                  </Link>
                  <form method="dialog">
                      <button className="btn">아니오</button>
                  </form>
              </div>
          </div>
          </dialog>
      </div>
  );
}