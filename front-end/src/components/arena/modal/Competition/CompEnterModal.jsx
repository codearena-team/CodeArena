import React from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameId } from "../../../../features/arena/arenaSlice";
export default function EnterModal({ competitionId, startTime, problemId, gameMode }) {
  const dispatch = useDispatch()
  // const competitionPath = `/game-list/competition/view/${competitionId}`;
  const navigate = useNavigate();
  const handlerYes = (() => {
    navigate(
      `/game-list/competition/view/${competitionId}`,
      { state : { startTime: startTime, problemId: problemId, gameMode:gameMode}}
    );
  });
  dispatch(setGameId(competitionId))
  return (
    <div>
      <button className="btn btn-sm" onClick={() => document.getElementById(competitionId).showModal()}>관전하기</button>
      <dialog id={competitionId} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">경쟁전을 관전하시겠습니까?</h3>
            <div className="modal-action flex justify-center">
              <button onClick={handlerYes} className="btn">예</button>
              <form method="dialog">
                <button className="btn">아니오</button>
              </form>
            </div>
        </div>
      </dialog>
    </div>
  );
}