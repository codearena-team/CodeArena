import React, { useEffect } from "react";
import CompetitionPlayTopInfo from './CompetitionPlayTopInfo';
import CompPlayProblem from "./CompPlayProblem";
import { useSelector } from 'react-redux';

export default function CompetitionPlay() {
  const problemId = useSelector(state => state.game.problemId);
  const gameMode = useSelector(state => state.game.gameMode);
  const lang = useSelector(state => state.game.lang);
  const gameId = useSelector(state => state.game.gameId);
  const userId = useSelector(state => state.game.userId);
  const userNickname = useSelector(state => state.game.userNickname);
  const enemyId = useSelector(state => state.game.enemyId);
  const enemyNickname = useSelector(state => state.game.enemyNickname);
  const userImgSrc = useSelector(state => state.game.userImgSrc);
  const enemyImgSrc = useSelector(state => state.game.enemyImgSrc);
  
  useEffect(() => {
    console.log("problemId:", problemId);
    console.log("gameMode:", gameMode);
    console.log("lang:", lang);
    console.log("gameId:", gameId);
    console.log("userId:", userId);
    console.log("userNickname:", userNickname);
    console.log("enemyId:", enemyId);
    console.log("enemyNickname:", enemyNickname);
    console.log("userImgSrc:", userImgSrc);
    console.log("enemyImgSrc:", enemyImgSrc);
  }, [problemId])

  return (
    <div>
      {/* 경쟁전 플레이 페이지 */}

      {/* 상단 : 단체 플레이어들의 화면 */}
      <div>
        <CompetitionPlayTopInfo />
      </div>

      {/* 해당 문제 불러오기 */}
      <div className="mt-10">
        {/* <CompPlayProblem problemId={problemId}/> */}
        <CompPlayProblem/>
      </div>
    </div>
  );
}