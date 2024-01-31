import { Routes, Route } from "react-router-dom";
import Login from './pages/login/index';
import Board from './pages/board/index';
import Problem from './pages/problem/index';
import ProblemDetail from "./pages/problem/problemId/detail/index";
import ProblemEdit from "./pages/problem/problemId/edit/index";
import ProblemCreate from "./pages/problem/create";
import Main from './pages/main/index';
import Arena from "./pages/arena/index";
import MyPage from "./pages/mypage/index";


export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage/:nickname" element={<MyPage />} />
      <Route path="/board" element={<Board />} />
      
      <Route path="/problem/:pgno" element={<Problem />} />
      <Route path="/problem/create" element={<ProblemCreate />} />
      <Route path="/problem/:problemId/edit" element={<ProblemEdit />} />
      <Route path="/problem/:problemId/detail" element={<ProblemDetail />} />

      <Route path="/arena" element={<Arena />} />
    </Routes>
  );
};