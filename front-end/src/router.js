import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useTransition, useLayoutEffect } from "react";
import { logout } from "./features/login/authSlice";
import { useDispatch } from "react-redux";
import Login from './pages/login/index';
import Community from './pages/community/index';
import CommunityCreate from './pages/community/create/index';
import CommunityDetail from './pages/community/detail/index';
import CommunityEdit from './pages/community/edit/index';
import Problem from './pages/problem/index';
import ProblemDetail from "./pages/problem/problemId/detail/index";
import ProblemEdit from "./pages/problem/problemId/edit/index";
import ProblemCreate from "./pages/problem/create";
import ProblemSubmit from "./pages/problem/submit/index";
import TagList from "./pages/problem/taglist";
import Main from './pages/main/index';
import Arena from "./pages/arena/index";
import Profile from "./pages/profile/index";
import Edit from "./pages/profile/edit/index";
import ChangePassword from './pages/profile/changepw/index';
import Alarm from "./pages/profile/alarm/index";
import Signup from './pages/login/signup/index';
import SnsSignup from './pages/login/snssignup/index';
import FindPassword from './pages/login/findpassword/index';
import { useAuthCheck } from "./features/useAuthCheck";
import { useLocation } from 'react-router-dom';
import CompetitionList from "./components/arena/Match/Competition/CompetitionList";
import CompetitionView from './components/arena/Match/Competition/CompetitionView';
import GroupList from "./components/arena/Match/Group/GroupList";
import GroupView from './components/arena/Match/Group/GroupView';
import GroupLobby from './components/arena/Match/Group/GroupLobby';
import CompetitionPlay from './components/arena/Match/Competition/CompetitionPlay';
import GroupPlay from './components/arena/Match/Group/GroupPlay';
import NotFound from './pages/notfound/index'
import Test from './pages/test/test'
import CompSpeedResult from './components/arena/resultpage/competition/compSpeedResult';
import CompSpeedDraw from './components/arena/resultpage/competition/compSpeedDraw';
import CompEffiResult from './components/arena/resultpage/competition/compEffiResult';
import CompEffiDraw from './components/arena/resultpage/competition/compEffiDraw';
import CompMiddleConfirm from './components/arena/resultpage/competition/compMiddleConfirm';

import GroupSpeedResult from './components/arena/resultpage/group/groupSpeedResult';
import GroupSpeedDraw from './components/arena/resultpage/group/groupSpeedDraw';
import GroupEffiResult from './components/arena/resultpage/group/groupEffiResult';
import GroupEffiDraw from './components/arena/resultpage/group/groupEffiDraw';
import GroupMiddleConfirm from './components/arena/resultpage/group/groupMiddleConfirm';

const ProtectedRoute = ({ user, children }) => {
  const dispatch = useDispatch()
  const [authCheck] = useAuthCheck()
  const [component, setComponent] = useState(<div></div>);
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    authCheck().then((res)=> {
      if(res) {
        setComponent(children)
      } else {
        dispatch(logout())
        navigate('/login', { replace: true })
      }
    })
  },[children])
  
  return (
    <div>
      {component}
    </div>
  );
}

export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:nickname" element={<Profile />} />
      <Route path="/profile/edit" element={<Edit />} />
      <Route path="/profile/changepassword" element={<ChangePassword />} />
      <Route path="/profile/alarm" element={<Alarm />} />


      <Route path="/community" element={<Community />} />
      <Route path="/community/create" element={<ProtectedRoute><CommunityCreate /></ProtectedRoute>} />
      <Route path="/community/:communityId/detail" element={<ProtectedRoute><CommunityDetail /></ProtectedRoute>} />
      <Route path="/community/:communityId/edit" element={<ProtectedRoute><CommunityEdit /></ProtectedRoute>} />

      <Route path="/problem" element={<Problem />} />
      <Route path="/problem/create" element={<ProtectedRoute><ProblemCreate /></ProtectedRoute>} />
      <Route path="/problem/:problemId/edit" element={<ProtectedRoute><ProblemEdit /></ProtectedRoute>} />
      <Route path="/problem/:problemId/detail" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />
      <Route path="/problem/tagList" element={<TagList />} />
      <Route path="/problem/submit" element={<ProblemSubmit />} />


      <Route path="/arena" element={<ProtectedRoute><Arena /></ProtectedRoute>} />
      <Route path="/game-list/competition" element={<CompetitionList />} /> {/* 경쟁전 방리스트 페이지 */}
      <Route path="/game-list/competition/view/:id" element={<CompetitionView />} /> {/* 경쟁전 관전 페이지 */}
      <Route path="/game-list/group" element={<GroupList />} /> {/* 단체전 방 페이지 */}

      <Route path="/game-list/group/lobby/:id" element={<GroupLobby />} /> {/* 단체전 플레이 로비 페이지 */}
      <Route path="/game-list/group/view/:id" element={<GroupView />} /> {/* 단체전 관전 페이지 */}
      
      <Route path="/game-list/competition/play/:id" element={<CompetitionPlay />} /> {/* 경쟁전 플레이 페이지 */}
      <Route path="/game-list/group/play/:id" element={<GroupPlay />} /> {/* 단체전 플레이 페이지 */}
      
      <Route path="/game-list/competition/compSpeedResult/:id" element={<CompSpeedResult />} /> {/* 경쟁전 스피드 결과 페이지 */}
      <Route path="/game-list/competition/compSpeedDraw/:id" element={<CompSpeedDraw />} /> {/* 경쟁전 스피드 무승부결과 페이지 */}
      <Route path="/game-list/competition/compEffiResult/:id" element={<CompEffiResult />} /> {/* 경쟁전 효율 결과 페이지 */}
      <Route path="/game-list/competition/compEffiDraw/:id" element={<CompEffiDraw />} /> {/* 경쟁전 효율 무승부결과 페이지 */}
      <Route path="/game-list/competition/compMiddleConfirm/:id" element={<CompMiddleConfirm/>} /> {/* 경쟁전 효율전 중간채점 페이지 */}
      {/* <Route path="/game-list/group/result/:id" element={<GroupResult />} /> */}

      <Route path="/game-list/group/groupSpeedResult/:id" element={<GroupSpeedResult />} /> {/* 단체전 스피드 결과 페이지 */}
      <Route path="/game-list/group/groupSpeedDraw/:id" element={<GroupSpeedDraw />} /> {/* 단체전 스피드 무승부결과 페이지 */}
      <Route path="/game-list/group/groupEffiResult/:id" element={<GroupEffiResult />} /> {/* 단체전 효율 결과 페이지 */}
      <Route path="/game-list/group/groupEffiDraw/:id" element={<GroupEffiDraw />} /> {/* 단체전 효율 무승부결과 페이지 */}
      <Route path="/game-list/group/groupMiddleConfirm/:id" element={<GroupMiddleConfirm/>} /> {/* 단체전 효율전 중간채점 페이지 */}

      <Route path="/login/signup" element={<Signup/>} />
      <Route path="/login/findpassword" element={<FindPassword/>} />
      <Route path="/login/snssignup" element={<SnsSignup/>} /> 
      <Route path="*" element={<NotFound/>} replace={true} /> 
      
      
      {/* 라우터수정필요구간 (효율전결과,스피드전결과,중간결과확인페이지) */}
      {/* <Route path="/speedresult" element={<SpeedResult/>} />
      <Route path="/speeddraw" element={<SpeedDraw/>} />
      <Route path="/effiresult" element={<EffiResult/>} />
      <Route path="/effidraw" element={<EffiDraw/>} />
      <Route path="/middleconfirm" element={<MiddleConfirm/>} /> */}




      <Route
        path="/test"
        element={
          <Test />
        }
      />
    </Routes>
  );
};