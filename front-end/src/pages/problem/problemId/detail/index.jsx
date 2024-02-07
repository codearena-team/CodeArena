import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { useState, useCallback, useEffect } from "react";
import { useAuthCheck } from "../../../../features/useAuthCheck";
import AlarmModal from "../../../../components/problem/AlramModal";
import TagModal from "../../../../components/problem/TagModal";
import axios from "axios";
import "../../../css/problemdetail.css"

export default function ProblemDetail() {
  const [authCheck] = useAuthCheck()
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.access.accessToken)
  const userId = useSelector(state => state.auth.userId)
  const [isAuthor, setIsAuthor] = useState()
  const params = useParams();
  const problemId = params.problemId
  const [code, setCode] = useState('public class Solution {\n    public static void main(String[] args) {\n        // 여기에 코드를 작성해주세요.\n    }\n}')
  const [lang, setLang] = useState('java')
  const [problem, setProblem] = useState({})
  
  useEffect(()=> {
    
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/problem/${problemId}`,
      headers : {
        Authorization : accessToken 
      }
    })
    .then((res)=> {
      if (res.data.status === '403') {
        navigate('/notfound')
      }
      setIsAuthor(userId === res.data.data.userId)
      setProblem(res.data.data)
      console.log(res.data);
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])



  const inpustClipboard = () => {
    navigator.clipboard.writeText(problem.problemExInput);
  }

  const outpustClipboard = () => {
    navigator.clipboard.writeText(problem.problemExOutput);
  }

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);


  
  const onChangeLang = (e) => {
    setLang(e.target.value)
    if (e.target.value==='java') {
      setCode('public class Solution {\n    public static void main(String[] args) {\n        // 여기에 코드를 작성해주세요.\n    }\n}')
    } else if (e.target.value==='cpp') {
      setCode('code":"#include <iostream>\n\nint main() {\n    // 여기에 코드를 작성해주세요.\n    return 0;\n}')
    } else (
      setCode('')
    )
  }

  const onClickApprove = () => {
    authCheck()
    const headers = {
      Authorization : accessToken 
    }
    axios.put(`https://i10d211.p.ssafy.io/api/problem/${problemId}/status`,{change:1},{headers})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return(
    <div className="grid grid-cols-2 p-8 h-full pt-0">
      <div>
        <div className="leftUp drop-shadow p-5">
          <div className="flex">
            <h1 className="text-3xl mb-2 ">{problem.problemTitle}</h1>
          </div>
          { problem.problemVisibility === '1' ?
            <div className="flex">
              <Link to={`/community?word=${problem.problemId}&key=problem_id`} className="btn btn-sm bg-rose-200 me-2 rounded-xl drop-shadow-sm">질문게시판</Link>
              <Link to={`/problem/submit?problemId=${problem.problemId}`} className="btn btn-sm bg-rose-200 rounded-xl drop-shadow-sm">제출현황</Link>
              {isAuthor ?
                <Link to={`/problem/${problem.problemId}/edit`} className="btn btn-sm bg-rose-200 rounded-xl ms-2 py-1 px-2 drop-shadow-sm">문제 수정</Link>
              :
                <div>
                  <div className="btn btn-sm bg-rose-200 rounded-xl ms-2 py-1 px-2 drop-shadow-sm" onClick={()=>document.getElementById(`alarmModal`).showModal()}>문제 수정 요청</div>
                  <AlarmModal alarmId={'alarmModal'}/>
                </div>
              }
            </div>
          :
            <div>
              <button onClick={onClickApprove} className="btn btn-sm bg-rose-200 rounded-xl ms-2 py-1 px-2 drop-shadow-sm">승인</button>
            </div>
          }
        </div>
        <div className="leftDown drop-shadow p-5 ">
          <div className="flex justify-center gap-2 drop-shadow-xl text-center mb-4">
            <div className="bg-rose-200 rounded-lg p-2">
              <p>시간제한</p>
              <p>{problem.problemTime}ms</p>
            </div>
            <div className="bg-rose-200 rounded-lg p-2">
              <p>메모리제한</p>
              <p>{problem.problemMem}MB</p>
            </div>
            <div className="join bg-rose-200">
              <div className="join-item p-2 border-r-2">
                <p>제출자</p>
                <p>{problem.submitCount}</p>
              </div>
              <div className="join-item p-2 border-r-2">
                <p>정답자</p>
                <p>{problem.acceptCount}</p>
              </div>
              <div className="join-item p-2">
                <p>정답률</p>
                <p>{problem.percentage}</p>
              </div>
            </div>
          </div>
          <p className="text-xl">내용</p>
          <p>{problem.problemContent}</p>
          <hr className="my-2" />
          <p className="text-xl">입력</p>
          <p>{problem.problemInputDesc}</p>
          <hr className="my-2"  />
          <p className="text-xl">출력</p>
          <p>{problem.problemOutputDesc}</p>
          <hr className="my-2"  />
          <div className="grid grid-cols-2 w-full gap-4">
            <div>
              <div className="flex">
                <p className="text-xl">입력예제 </p>
                <button className="btn btn-xs bg-rose-200 ms-2" onClick={inpustClipboard}>복사</button>
              </div>
              <CodeMirror height="100%" value={problem.problemExInput} onChange={onChangeCode} editable={false} />
            </div>
            <div>
              <div className="flex">
                <p className="text-xl">출력예제</p>
                <button className="btn btn-xs bg-rose-200 ms-2" onClick={outpustClipboard}>복사</button>
              </div>
              <CodeMirror height="100%" value={problem.problemExOutput} onChange={onChangeCode} editable={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="right drop-shadow p-5 sticky">
        <div className="flex ">
          <label className="font-bold ms-1 mt-1 me-2">언어</label>
          <select value={lang} onChange={onChangeLang} className=" mb-2 select select-sm select-bordered" >
            <option>java</option>
            <option>python</option>
            <option>cpp</option>
          </select>
          
        </div>
        
        <CodeMirror value={code} height="77vh" extensions={[java(),python(),cpp()]} onChange={onChangeCode} />
        <div className="flex justify-end">
          <button onClick={()=>document.getElementById('TagModal').showModal()} className="mt-2 btn bg-rose-200 rounded-xl">제 출</button>
          <TagModal 
          code={code}
          userId={userId}
          problemId={problem.problemId}
          />
        </div>
      </div>
    </div>
  )
}