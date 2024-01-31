import React from "react";
import { Link } from "react-router-dom";

export default function ExitModal() {
    
    return (
        <div>
            <dialog id="Exit" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4 text-center">정말로 나가시겠습니까?</h3>
                <div className="modal-action flex justify-center">
                    <Link to="/game-list/competition" method="dialog">
                        <button className="btn">예</button> {/* 나가면 다시 방 리스트로 이동 */}
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