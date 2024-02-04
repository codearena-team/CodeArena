import React from "react";
import CompetitionPlayTopInfo from './CompetitionPlayTopInfo';
import CompPlayProblem from "./CompPlayProblem";

export default function CompetitionPlay() {

  return (
    <div>
      {/* 경쟁전 플레이 페이지 */}

      {/* 상단 : 단체 플레이어들의 화면 */}
      <div>
        <CompetitionPlayTopInfo />
      </div>

      {/* 해당 문제 불러오기 */}
      <div className="mt-10">
        <CompPlayProblem />
      </div>
    </div>
  );
}