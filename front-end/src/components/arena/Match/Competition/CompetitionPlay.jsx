import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CompetitionPlayTopInfo from './CompetitionPlayTopInfo';
import CompPlayProblem from "./CompPlayProblem";

export default function CompetitionPlay() {
  const Location = useLocation()

  const [problemId, setProblemId] = useState();

  useEffect(() => {
    console.log("여긴 로케이션 : ", Location.state.current)
    setProblemId(Location.state.current);
  }, [])

  return (
    <div>
      {/* 경쟁전 플레이 페이지 */}

      {/* 상단 : 단체 플레이어들의 화면 */}
      <div>
        <CompetitionPlayTopInfo />
      </div>

      {/* 해당 문제 불러오기 */}
      <div className="mt-10">
        <CompPlayProblem problemId={problemId}/>
      </div>
    </div>
  );
}