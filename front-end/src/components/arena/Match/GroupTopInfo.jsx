import React from "react";

export default function UserInfo() {

  return (
    <div className="flex">
      {/* Group 관전 상단에 유저 정보를 제공할 페이지 */}
      <div className="flex flex-row mt-5">
        <div className="ml-5 mr-5">
          유저 화면 1
        </div>
        <div className="mr-5">
          유저 화면 2
        </div>
        <div className="mr-5">
          유저 화면 3
        </div>
        <div className="mr-5">
          유저 화면 4
        </div>
        <div className="mr-5">
          유저 화면 5
        </div>
      </div>
    </div>
  );
}