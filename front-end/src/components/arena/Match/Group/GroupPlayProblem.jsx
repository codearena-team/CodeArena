import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "../../../css/GroupPlay.css";
import G_playDividingLine from "./G_playDividingLine";
import Editor from '@monaco-editor/react'

export default function GroupPlay() {
  // const params = useParams();
  // const problemId = params.problemId
  const [code, setCode] = useState('')
  const [lang, setLang] = useState('')
  const [cateList, setCateList] = useState(["PD", "구현", "그리디", "매개변수 탐색", "문자열","수학", "시뮬레이션", "완전탐색", "이분탐색", "자료구조"])
  const [selectedList, setSelectedList] = useState([])
  const [cate, setCate] = useState('선택')
  const [problem, setProblem] = useState({})
  
  // 구분선에 따른 화면 비율 조정 -> 초기는 5:5 비율로 문제와 코드블럭 보기
  const [panelWidths, setPanelWidths] = useState({
    left: 50,
    right: 50,
  });

  // 구분선 이동에 따른 왼쪽과 오른쪽 패널 비율 조정
  const handleDividerMoving = (newPosition) => {
      const leftPanelWidth = Math.min(Math.max(newPosition, 5), 95);
      const rightPanelWidth = 100 - leftPanelWidth;

      // 비율 유지를 위해 스타일에 적용
      setPanelWidths({ left: leftPanelWidth, right: rightPanelWidth });
  };

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);
  
  useEffect(()=> {
    axios({
      method : 'get',
      url : `http://i10d211.p.ssafy.io:8081/api/problem/29`,
    })
    .then((res)=> {
      console.log(res);
      setProblem(res.data.data)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[]);

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

  const onClickHandler = (e) => {
    console.log(code);
  }

  return (
    <div className="flex w-full">
      <div className="left-panel ml-3 relative" style={{ width: `${panelWidths.left}%` }}>
        {/* 좌측 비율 */}
        <div className="leftUp drop-shadow-xl p-5">
          {/* 문제 제목 */}
          <h1 className="text-3xl mb-2 ">{problem.problemTitle}</h1>
        </div>
        {/* 해당 문제 내용들 */}
        <div className="leftDown drop-shadow-xl p-5 ">
          <div className="flex justify-center gap-5 drop-shadow-xl text-center mb-4">
            <div className="bg-rose-200 rounded-md p-2">
              <p>시간제한</p>
              <p>{problem.problemTime}ms</p>
            </div>
            <div className="bg-rose-200 rounded-md p-2">
              <p>메모리제한</p>
              <p>{problem.problemMem}MB</p>
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
              <Editor
                options={{'readOnly':true}}
                value={problem.problemExInput}
                onChange={onChangeCode}
                height={`${problem?.problemExInput?.split('\n').length * 19}px`}
              />
            </div>
            <div>
              <p className="text-xl">출력예제</p>
              <Editor
                options={{'readOnly':true}}
                value={problem.problemExOutput}
                onChange={onChangeCode}
                height={`${problem?.problemExOutput?.split('\n').length * 19}px`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 구분선을 기준으로 왼쪽(5):오른쪽(5)로 나누어져있음 */}
      {/* handleDividerMoving 함수를 통해 왼쪽과 오른쪽 화면 비율 조정 */}
      <div className="relative">
        <G_playDividingLine onDividerMoving={handleDividerMoving}/>
      </div>

      {/* 우측 비율 */}
      <div
        className="right-panel right drop-shadow-xl p-5 sticky mr-3"
        style={{ width: `${panelWidths.right}%` }}
      >
        <div className="flex ">
          <label className="font-bold mt-1">언어</label>
          <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className=" mb-2 select select-sm select-bordered" >
            <option>{lang}</option>
          </select>
          <label className="font-bold ms-4 mt-1">알고리즘</label>
          <select value={cate} onChange={onClickCate} className="select select-sm select-bordered w-20" >
            <option isabled="true">선택</option>
            {cateList.map((cate)=>{
              return(
                <option key={cate} onClick={onClickCate}>{cate}</option>
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
        
        <Editor options={{'scrollBeyondLastLine': false}} value={code} height="75vh" language={lang} onChange={onChangeCode} />
        <div className="flex justify-end">
          <button onClick={onClickHandler} className="mt-1 btn btn-sm btn-neutral rounded-full">제 출</button>
        </div>
      </div>
    </div>
  );
}