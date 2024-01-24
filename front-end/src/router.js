import { Routes, Route } from "react-router-dom";
import SubmitTest from './pages/test/psSubmitTest'
import CreateTest from './pages/test/psCreateTest'
import Login from './pages/login/Login';
import Board from './pages/board/Board';
import Ps from './pages/problemsolve/ProblemSolve';
import Main from './pages/main/main';
import Arena from "./pages/arena/Arena";

export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/submit" element={<SubmitTest />} />
      <Route path="/create" element={<CreateTest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/board" element={<Board />} />
      <Route path="/problemsolve" element={<Ps />} />
      <Route path="/arena" element={<Arena />} />
    </Routes>
  );
};