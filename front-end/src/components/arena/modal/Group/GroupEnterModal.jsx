import React from "react";
import { Link } from "react-router-dom";

export default function GroupEnterModal({ groupViewId }) {

  const groupViewPath = `/game-list/group/view/${groupViewId}`;

  return (
    <div>
      <button className="btn" onClick={() => document.getElementById(`groupViewModal_${groupViewId}`).showModal()}>관전하기</button>
      <dialog id={`groupViewModal_${groupViewId}`} className="modal">
        <div className="modal-box">
          {groupViewPath}{/* 경로 확인용 */}
          <h3 className="font-bold text-lg mb-4 text-center">단체전을 관전하시겠습니까?</h3>
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