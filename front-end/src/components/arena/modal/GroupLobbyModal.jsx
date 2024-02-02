import React from "react";
import { Link } from "react-router-dom";

export default function GroupLobbyModal({ groupId }) {

  const groupLobbyPath = `/game-list/group/lobby/${groupId}`;

  return (
    <div>
      <button className="btn" onClick={() => document.getElementById(`groupLobbyModal_${groupId}`).showModal()}>참여하기</button>
      <dialog id={`groupLobbyModal_${groupId}`} className="modal">
        <div className="modal-box">
          {groupLobbyPath} {/* 경로 확인용 */}
          <h3 className="font-bold text-lg mb-4 text-center">단체전에 참여하시겠습니까?</h3>
          <div className="modal-action flex justify-center">
            <Link to={groupLobbyPath}>
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