import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { useAuthCheck } from "../../../../features/useAuthCheck";
import DetailWindow from "../../../../components/problem/DetailWindow";
import SubmitWindow from "../../../../components/problem/SubmitWindow";
import AlarmModal from "../../../../components/problem/AlramModal";
import TagModal from "../../../../components/problem/TagModal";
import Editor from '@monaco-editor/react'
import axios from "axios";
import "../../../css/problemdetail.css"

export default function ProblemDetail() {
  const location = useLocation()
  const [authCheck] = useAuthCheck()
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.access.accessToken)
  const userId = useSelector(state => state.auth.userId)
  const [isAuthor, setIsAuthor] = useState()
  const params = useParams();
  const problemId = params.problemId
  const [code, setCode] = useState('import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // 여기에 코드를 작성해주세요.\n    }\n}')
  const [lang, setLang] = useState('java')
  const [problem, setProblem] = useState({})
  const [window, setWindow] = useState(true)
  
  useEffect(()=> {
    authCheck()
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
      console.log(res);
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])




  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);


  
  const onChangeLang = (e) => {
    setLang(e.target.value)
    if (e.target.value==='java') {
      setCode('import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // 여기에 코드를 작성해주세요.\n    }\n}')
    } else if (e.target.value==='cpp') {
      setCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    // 여기에 코드를 작성해주세요.\n    return 0;\n}')
    } else (
      setCode('')
    )
  }

  const onClickApprove = () => {
    authCheck()
    setTimeout(() => {
      const headers = {
        Authorization : accessToken 
      }
      axios.put(`https://i10d211.p.ssafy.io/api/problem/${problemId}/status`,{change:1},{headers})
      .then(setTimeout((res) => {
        console.log(res)
        navigate(-1);
      }, 100))
      .catch(err => {
        console.log(err)
      })
    }, 100);
  }

  const onClickWindow = () => {
    if (window) {
      setWindow(false)
    } else {
      setWindow(true)
    }
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
              <button onClick={onClickWindow} className={`btn btn-sm bg-rose-200 rounded-xl drop-shadow-sm `}>{window ? '제출현황' :'문제내용'}</button>
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
          {window ? <DetailWindow problem={problem} /> : <SubmitWindow isSolve={problem.isSolve}/>}
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
        
        <Editor options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false},}}
        value={code} height="77vh" language={lang} onChange={onChangeCode} 
        />
        <div className="flex justify-end">
          <button onClick={()=>document.getElementById('TagModal').showModal()} className="mt-2 btn bg-rose-200 rounded-xl">제 출</button>
          <TagModal 
          code={code}
          userId={userId}
          problemId={problem.problemId}
          lang={lang}
          setWindow={setWindow}
          />
        </div>
      </div>
    </div>
  )
}