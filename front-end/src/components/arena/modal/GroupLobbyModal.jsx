import React from "react";
import { Link } from "react-router-dom";

export default function GroupLobby({ groupId }) {

  const groupViewPath = `/game-list/group/view/${groupId}`;

  return (
    <div>
      <button className="btn" onClick={() => document.getElementById(groupId).showModal()}>참여하기</button>
      <dialog id={groupId} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">단체전에 참여하시겠습니까?</h3>
            <div className="modal-action flex justify-center">
              <Link to={groupViewPath} method="dialog">
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