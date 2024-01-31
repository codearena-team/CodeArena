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

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);
  const onClickHandler = (e) => {
    console.log(code);
  }
  // setProblem({
  //   problemId : 1,
  //   userNickname : "양건우",
  //   problemTime : "1000",
  //   problemMem : "64",
  //   submitCnt : "2345",
  //   solveCnt : "1234",
  //   solveCntPeople : "2345",
  //   solvePercent :"23" ,
  //   problemTitle : "제곱수 찾기",
  //   problemContent : "N행 M열의 표 A가 있고, 표의 각 칸에는 숫자가 하나씩 적혀있다.\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   연두는 서로 다른 1개 이상의 칸을 선택하려고 하는데, 행의 번호가 선택한 순서대로 등차\
  //   수열을 이루고 있어야 하고, 열의 번호도 선택한 순서대로 등차수열을 이루고 있어야 한다.\
  //   이렇게 선택한 칸에 적힌 수를 순서대로 이어붙이면 정수를 하나 만들 수 있다.연두가 만들\
  //   수 있는 정수 중에서 가장 큰 완전 제곱수를 구해보자. 완전 제곱수란 어떤 정수를 제곱한 수이다.",
  //   problemInputDesc : "첫째 줄에 N, M이 주어진다. 둘째 줄부터 N개의 줄에는 표에 적힌 숫자가 1번\
  //    행부터 N번 행까지 순서대로 한 줄에 한 행씩 주어진다. 한 행에 적힌 숫자는 1번 열부터 M번 열까지\
  //     순서대로 주어지고, 공백없이 모두 붙여져 있다.",
  //   problemOutputDesc : "첫째 줄에 연두가 만들 수 있는 가장 큰 완전 제곱수를 출력한다. 만약, 완전 \
  //                       제곱수를 만들 수 없는 경우에는 -1을 출력한다.",
  //   problemExInput : "2 3\n123\n456",
  //   problemExOutput : "64",
  //   })
  return(
    <div className="grid grid-cols-2 p-8 h-full">
      <div>
        <div className="leftUp drop-shadow-xl p-5">
          <h1 className="text-3xl mb-2">{problem.problemTitle}
           <Link to={`/problem/${problem.problemId}/edit`} className="btn btn-neutral btn-sm rounded-full ms-2">문제 수정</Link>
           <Link to="/problem/create" className="btn btn-neutral btn-sm rounded-full ms-2">문제 수정 요청</Link>

           </h1>
          <Link className="btn btn-xs btn-neutral me-2 rounded-full">질문게시판</Link>
          <Link className="btn btn-xs btn-neutral rounded-full">제출현황</Link>
        </div>
        <div className="leftDown drop-shadow-xl p-5">
          <p>내용</p>
          <p>{problem.problemContent}</p>
          <hr />
          <p>입력</p>
          <p>{problem.problemInputDesc}</p>
          <hr />
          <p>출력</p>
          <p>{problem.problemOutputDesc}</p>
          <hr />
          <div className="grid grid-cols-2 w-full gap-4">
            <div>
              <p>입력예제</p>
              <CodeMirror height="100%" value={problem.problemExInput} onChange={onChangeCode} editable={false} />
            </div>
            <div>
              <p>출력예제</p>
              <CodeMirror height="100%" value={problem.problemExOutput} onChange={onChangeCode} editable={false} />
            </div>
          </div>

        </div>
      </div>
      <div className="right drop-shadow-xl p-5 sticky">
        제출
        <CodeMirror value={code} height="80vh" extensions={[java(),python(),cpp()]} onChange={onChangeCode} />
        <button onClick={onClickHandler} className="btn btn-sm btn-neutral rounded-full">제 출</button>
      </div>
    </div>
  )
}