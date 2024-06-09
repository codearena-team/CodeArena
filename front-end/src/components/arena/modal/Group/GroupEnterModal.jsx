import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GroupEnterModal({ groupViewId,problemId }) {
  const navigate = useNavigate()
  // const groupViewPath = `/game-list/group/view/${groupViewId}`;


    const handlerYes = (() => {
      navigate(
        {pathname: `/game-list/group/view/${groupViewId}`},
        {state: {
          problemId
        }},
      )
    })



  return (
    <div>
      <button className="btn btn-sm" onClick={() => document.getElementById(`groupViewModal_${groupViewId}`).showModal()}>관전하기</button>
      <dialog id={`groupViewModal_${groupViewId}`} className="modal">
        <div className="modal-box">
          {/* 경로 확인용 */}
          {/* {groupViewPath} */}
          <h3 className="font-bold text-lg mb-4 text-center">단체전을 관전하시겠습니까?</h3>
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