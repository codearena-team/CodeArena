import React from "react";
import { Link } from "react-router-dom";

export default function AbstentionModal() {
    
  return (
    <div>
      <dialog id="abstention" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-center">지금 나가시면 기권으로 처리됩니다 !!</h3>
        <h3 className="font-bold text-lg mb-4 text-center">정말 괜찮으시겠어요?</h3>
        <div className="modal-action flex justify-center">
          <Link to="/game-list/group" method="dialog">
            <button className="btn">기권할래요..</button> {/* 나가면 다시 방 리스트로 이동 */}
          </Link>
          <form method="dialog">
            <button className="btn">아니요</button>
          </form>
        </div>
      </div>
      </dialog>
    </div>
  );
}