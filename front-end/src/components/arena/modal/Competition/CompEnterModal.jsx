import React from "react";
import { Link, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameId } from "../../../../features/arena/arenaSlice";

export default function EnterModal({ competitionId }) {
  const dispatch = useDispatch()
  const competitionPath = `/game-list/competition/view/${competitionId}`;
  dispatch(setGameId(competitionId))
  return (
    <div>
      <button className="btn" onClick={() => document.getElementById(competitionId).showModal()}>관전하기</button>
      <dialog id={competitionId} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">경쟁전을 관전하시겠습니까?</h3>
            <div className="modal-action flex justify-center">
            <Link to={competitionPath} method="dialog">
              <button className="btn">예</button>
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