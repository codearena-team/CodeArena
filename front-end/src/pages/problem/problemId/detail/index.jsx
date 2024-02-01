import { Link, useParams } from "react-router-dom"
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "../../../css/problemdetail.css"

export default function ProblemDetail() {
  
  const params = useParams();
  const problemId = params.problemId
  const [code, setCode] = useState('')
  const [lang, setLang] = useState('java')
  const [cateList, setCateList] = useState(["PD","구현","그리디","매개변수 탐색","문자열","수학","시뮬레이션","완전탐색","이분탐색","자료구조"])
  const [selectedList, setSelectedList] = useState([])
  const [cate, setCate] = useState('선택')
  const [problem, setProblem] = useState({})
  useEffect(()=> {
    axios({
      method : 'get',
      url : `http://i10d211.p.ssafy.io:8081/api/problem/${problemId}`,
    })
    .then((res)=> {
      console.log(res);
      setProblem(res.data.data)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])

  const onClickCate = (e)=>{
    const arr = cateList
    const filtered = arr.filter((element) => element !== e.target.value);
    setCateList(filtered)
    const tmp = selectedList
    tmp.push(e.target.value)
    setSelectedList(tmp)
    setCate('선택')
  }
  const onClickSelected = (e)=>{
    const text = e.target.innerText.split("(")[0]
    const arr = selectedList
    const filtered = arr.filter((element) => element !== text);
    setSelectedList(filtered)
    const tmp = cateList
    tmp.push(text)
    setCateList(tmp)
  }


  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);
  const onClickHandler = (e) => {
    console.log(code);
  }
  return(
    <div className="grid grid-cols-2 p-8 h-full pt-0">
      <div>
        <div className="leftUp drop-shadow-xl p-5">
          <h1 className="text-3xl mb-2 ">{problem.problemTitle}
           <Link to={`/problem/${problem.problemId}/edit`} className="btn btn-neutral btn-sm rounded-full ms-2">문제 수정</Link>
           <Link to="/problem/create" className="btn btn-neutral btn-sm rounded-full ms-2">문제 수정 요청</Link>

           </h1>
          <Link className="btn btn-xs btn-neutral me-2 rounded-full">질문게시판</Link>
          <Link className="btn btn-xs btn-neutral rounded-full">제출현황</Link>
        </div>
        <div className="leftDown drop-shadow-xl p-5 ">
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
                <p>제출률</p>
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
              <p className="text-xl">입력예제</p>
              <CodeMirror height="100%" value={problem.problemExInput} onChange={onChangeCode} editable={false} />
            </div>
            <div>
              <p className="text-xl">출력예제</p>
              <CodeMirror height="100%" value={problem.problemExOutput} onChange={onChangeCode} editable={false} />
            </div>
          </div>
          
        </div>
      </div>
      <div className="right drop-shadow-xl p-5 sticky">
        <div className="flex ">
          <label className="font-bold ms-1 mt-1">언어</label>
          <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className=" mb-2 select select-sm select-bordered" >
            <option>java</option>
            <option>python</option>
            <option>cpp</option>
          </select>
          <label className="font-bold ms-4 mt-1">알고리즘</label>
          <select value={cate} onChange={onClickCate} className="select select-sm select-bordered w-20" >
            <option isabled selected>선택</option>
            {cateList.map((cate)=>{
              return(
                <option onClick={onClickCate}>{cate}</option>
              )
            })}
          </select>
          <div className="" >
            {selectedList.map((selected)=>{
              return(
                <span className='mx-2' onClick={onClickSelected}>{selected}</span>
              )
            })}
          </div>

        </div>
        
        <CodeMirror value={code} height="75vh" extensions={[java(),python(),cpp()]} onChange={onChangeCode} />
        <div className="flex justify-end">
          <button onClick={onClickHandler} className="mt-1 btn btn-sm btn-neutral rounded-full">제 출</button>
        </div>
      </div>
    </div>
  )
}