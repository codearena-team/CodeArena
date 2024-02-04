import React from "react";
import GroupPlayProblem from './GroupPlayProblem'
import GroupPlayTopInfo from "./GroupPlayTopInfo";

export default function GroupPlay() {
    
  return (
    <div>
      {/* 단체전 플레이 방 로직 */}
    
      {/* 상단 : 단체 플레이어들의 화면 */}
      <div>
        <GroupPlayTopInfo />
      </div>

      {/* 해당 문제 불러오기 */}
      <div className="mt-10">
        <GroupPlayProblem />
      </div>
    </div>
  );
}