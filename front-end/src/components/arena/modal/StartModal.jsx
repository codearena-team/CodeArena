import React from "react";
import { Link } from "react-router-dom";

export default function GameStart({ArenaGroupId}) {

  const ArenaStartPath = `/game-list/group/play/${ArenaGroupId}`

  return (
    <div>
      <button className="btn" onClick={() => document.getElementById(`ArenaStart_${ArenaGroupId}`).showModal()}>Arena Start !</button>
      <dialog id={`ArenaStart_${ArenaGroupId}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">게임을 시작할까요?</h3>
            <div className="modal-action flex justify-center">
              <Link to={ArenaStartPath} method="dialog">
                <button className="btn">START !</button>
              </Link>
              <form method="dialog">
                <button className="btn">앗.. 잠깐만요 !</button>
              </form>
            </div>
        </div>
      </dialog>
    </div>
  );
}