import React from "react";
import { Link } from "react-router-dom";

export default function EnterModal({ groupId }) {
  return (
    <div>
      <button className="btn" onClick={() => document.getElementById('Enter').showModal()}>입장하기</button>
      <dialog id="Enter" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">단체전에 입장하시겠습니까?</h3>
            <div className="modal-action flex justify-center">
              <Link to={`/game-list/group/view/${groupId}`} method="dialog">
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