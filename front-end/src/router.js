import { Routes, Route } from "react-router-dom";
import Login from './pages/login/index';
import Board from './pages/board/index';
import Problem from './pages/problem/index';
import ProblemDetail from "./pages/problem/problemId/detail/index";
import ProblemEdit from "./pages/problem/problemId/edit/index";
import ProblemCreate from "./pages/problem/create";
import Main from './pages/main/index';
import Arena from "./pages/arena/index";
import Profile from "./pages/profile/index";
import Edit from "./pages/profile/edit/index";
import ChangePassword from './pages/profile/changepw/index';
import Alarm from "./pages/profile/alarm/index";
import Signup from './pages/login/signup/index';
import SnsSignup from './pages/login/snssignup/index';
import FindPassword from './pages/login/findpassword/index';
import CompetitionList from "./components/arena/Match/CompetitionList";
import CompetitionView from './components/arena/Match/CompetitionView';
import GroupList from "./components/arena/Match/GroupList";
import GroupView from './components/arena/Match/GroupView'

export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:nickname" element={<Profile />} />
      <Route path="/profile/:nickname/edit" element={<Edit />} />
      <Route path="/profile/changepassword" element={<ChangePassword />} />
      <Route path="/profile/alarm" element={<Alarm />} />
      <Route path="/board" element={<Board />} />
      
      <Route path="/problem/:pgno" element={<Problem />} />
      <Route path="/problem/create" element={<ProblemCreate />} />
      <Route path="/problem/:problemId/edit" element={<ProblemEdit />} />
      <Route path="/problem/:problemId/detail" element={<ProblemDetail />} />

      <Route path="/arena" element={<Arena />} />
      <Route path="/game-list/competition" element={<CompetitionList />} /> {/* 경쟁전 방리스트 페이지 */}
      <Route path="/game-list/competition/view/:id" element={<CompetitionView />} /> {/* 경쟁전 관전 페이지 */}
      <Route path="/game-list/group" element={<GroupList />} /> {/* 단체전 방 페이지 */}
      <Route path="/game-list/group/view/:id" element={<GroupView />} /> {/* 단체전 관전 페이지 */}
      <Route path="/login/signup" element={<Signup/>} />
      <Route path="/login/findpassword" element={<FindPassword/>} />
      <Route path="/login/snssignup" element={<SnsSignup/>} /> 
    </Routes>
  );
};