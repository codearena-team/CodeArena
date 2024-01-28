import { Routes, Route } from "react-router-dom";
import SubmitTest from './pages/test/psSubmitTest'
import CreateTest from './pages/test/psCreateTest'
import Login from './pages/login/index';
import Board from './pages/board/index';
import Ps from './pages/problemsolve/index';
import Main from './pages/main/index';
import Arena from "./pages/arena/index";
import MyPage from "./pages/mypage/index";
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
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/board" element={<Board />} />
      <Route path="/problemsolve" element={<Ps />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/login/signup" element={<Signup/>} />
      <Route path="/login/findpassword" element={<FindPassword/>} />
      <Route path="/login/snssignup" element={<SnsSignup/>} /> 
    </Routes>
  );
};