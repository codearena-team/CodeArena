import { Routes, Route } from "react-router-dom";
import SubmitTest from './pages/test/psSubmitTest'
import CreateTest from './pages/test/psCreateTest'
import Login from './pages/login/index';
import Board from './pages/board/index';
import Ps from './pages/problemsolve/index';
import ProblemDetail from "./pages/problemsolve/problemId/index";
import Main from './pages/main/index';
import Arena from "./pages/arena/index";
import Profile from "./pages/profile/index";
import Edit from "./pages/profile/edit/index";
import ChangePassword from './pages/profile/changepw/index';
import Alarm from "./pages/profile/alarm/index";
import Signup from './pages/login/signup/index';
import SnsSignup from './pages/login/snssignup/index';
import FindPassword from './pages/login/findpassword/index';




export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/submit" element={<SubmitTest />} />
      <Route path="/create" element={<CreateTest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:nickname" element={<Profile />} />
      <Route path="/profile/:nickname/edit" element={<Edit />} />
      <Route path="/profile/changepassword" element={<ChangePassword />} />
      <Route path="/profile/alarm" element={<Alarm />} />
      <Route path="/board" element={<Board />} />
      <Route path="/problem/:pgno" element={<Ps />} />
      <Route path="/problem/detail/:problemId" element={<ProblemDetail />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/login/signup" element={<Signup/>} />
      <Route path="/login/findpassword" element={<FindPassword/>} />
      <Route path="/login/snssignup" element={<SnsSignup/>} /> 
    </Routes>
  );
};