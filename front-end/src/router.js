import { Routes, Route } from "react-router-dom";
import SubmitTest from './pages/test/psSubmitTest'
import CreateTest from './pages/test/psCreateTest'
import Login from './pages/login/index';
import Board from './pages/board/index';
import Ps from './pages/problemsolve/index';
import ProblemDetail from "./pages/problemsolve/problemId/index";
import Main from './pages/main/index';
import Arena from "./pages/arena/index";
import MyPage from "./pages/mypage/index";


export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/submit" element={<SubmitTest />} />
      <Route path="/create" element={<CreateTest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/board" element={<Board />} />
      <Route path="/problem/:pgno" element={<Ps />} />
      <Route path="/problem/detail/:problemId" element={<ProblemDetail />} />
      <Route path="/arena" element={<Arena />} />
    </Routes>
  );
};