import React from "react";
import { Link } from "react-router-dom";

export default function CompGoResultModal({ compResultId }) {

  const CompResultPath = `/game-list/competition/result/${compResultId}`

  return (
    <div>
      {/* 결과창으로 이동하는 모달 */}
      <button className="btn" onClick={() => document.getElementById(`GoResult_${compResultId}`).showModal()}>결과창 이동 (임시)</button>
      <dialog id={`GoResult_${compResultId}`} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">Competition 결과 페이지 이동 (임시)</h3>
            <div className="modal-action flex justify-center">
            <Link to={CompResultPath} method="dialog">
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