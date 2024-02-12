import {useState, useCallback, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import TestCaseModal from '../../../../components/problem/TestcaseModal';

export default function ProblemEdit() {
  const userId = useSelector(state => state.auth.userId)
  const navigate = useNavigate()
  const params = useParams()
  const accessToken = useSelector(state => state.access.accessToken)
  const [title, setTitle] = useState("");
  const [isValidCode, setIsValidCode] = useState("");
  const [content, setContent] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [outputDescription, setOutputDescription] = useState("");
  const [outputExam, setOutputExam] = useState("");
  const [inputExam, setInputExam] = useState("");
  const [lang, setLang] = useState("Java");
  const [testCode, setTestCode] = useState("");
  const [time, setTime] = useState("");
  const [mem, setMem] = useState("");
  const [rating, setRating] = useState(1)
  const [cateList, setCateList] = useState(["PD","구현","그리디","매개변수 탐색","문자열","수학","시뮬레이션","완전탐색","이분탐색","자료구조"])
  const [selectedList, setSelectedList] = useState([])
  const [testcase, setTestcase] = useState([])
  const problemId = params.problemId
  useEffect(() => {
    axios({
      url : `https://i10d211.p.ssafy.io/api/problem/${problemId}/modify`,
      method : "get",
    })
    .then((res) => {
      console.log(res);
      setTitle(res.data.data.problemTitle)
      setContent(res.data.data.problemContent)
      setInputDescription(res.data.data.problemInputDesc)
      setOutputDescription(res.data.data.problemOutputDesc)
      setInputExam(res.data.data.problemExInput)
      setOutputExam(res.data.data.problemExOutput)
      setLang(res.data.data.problemValidationLang)
      setTestCode(res.data.data.problemValidationCode)
      setTime(res.data.data.problemTime)
      setMem(res.data.data.problemMem)
      setTestcase(res.data.data.testCase)
      setSelectedList(res.data.data.tagList.map((tag)=>{return tag.tagName}))
      let tmp = cateList
      res.data.data.tagList.map((tag)=>{
        tmp = tmp.filter((el)=>{return el !== tag.tagName})
        return 0
      })
      setCateList(tmp)
    })

  },[problemId,]) 

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }
  const onChangeInputDescription = (e) => {
    setInputDescription(e.target.value)
  }
  const onChangeOutputDescription = (e) => {
    setOutputDescription(e.target.value)
  }
  const onChangeInputExam = useCallback((code, viewUpdate) => {
    setInputExam(code);
  }, []);
  const onChangeOutputExam = useCallback((code, viewUpdate) => {
    setOutputExam(code);
  }, []);


  const onClickCate = (e)=>{
    const arr = cateList
    const filtered = arr.filter((element) => element !== e.target.value);
    setCateList(filtered)
    const tmp = selectedList
    tmp.push(e.target.value)
    setSelectedList(tmp)
  }
  
  const onClickSelected = (e)=>{
    const text = e.target.innerText.split(" X")[0]
    const arr = selectedList
    const filtered = arr.filter((element) => element !== text);
    setSelectedList(filtered)
    const tmp = cateList
    tmp.push(text)
    setCateList(tmp)
  }

  const onChangeTestCode = useCallback((code, viewUpdate) => {
    setTestCode(code);
  }, []);

  const onClick = () => {
    
    const tagList = selectedList.map((selected)=>{
      return {tagName : selected}
    })
    axios({
      url : `https://i10d211.p.ssafy.io/api/problem/${problemId}`,
      method : "put",
      data : {
        userId:userId,
        problemId:problemId,
        problemTitle:title,
        problemContent:content,
        problemInputDesc:inputDescription,
        problemOutputDesc:outputDescription,
        problemExInput:inputExam,
        problemExOutput:outputExam,
        problemTime:time,
        problemMem:mem,
        problemValidationCode:testCode,
        problemValidationLang:lang,
        tagList:tagList,
        testcase:testcase
      },
    })
    .then((res) => {
      console.log(res);
      navigate(`/problem/${problemId}/detail`)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const onClickComfile = () => {
    const data = {
        problemValidationCode : testCode,
        problemExInput : inputExam,
        problemExOutput :outputExam,
        problemTime : time,
        testCase : testcase
    }
    axios.post(`https://i10d211.p.ssafy.io/${lang}/judge/validation`,data)
    .then(res=> {
      if (res.data.data.solve) {
        alert('코드 검증 성공하였습니다.')
        setIsValidCode(true)
      } else {
        alert('코드 검증 실패하였습니다.')
        setIsValidCode(false)
      }
    })
    .catch(err=>console.log(err))
  }

  const onDelete = () => {
    axios({
      url : `https://i10d211.p.ssafy.io/api/problem/${problemId}`,
      method : "delete",
      headers : {
        Authorization : accessToken 
      }
    })
    .then((res) => {
      console.log(res);
      navigate(`/problem`)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="p-20 pt-0">
      
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <h1 className='font-bold text-4xl mb-5 text-center'>문제 수정</h1>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3"htmlFor="title">제목</label>
          <input value={title} type="text" placeholder="제목을 입력하세요" id="title" onChange={onChangeTitle} class="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="content">내용</label>
          <textarea value={content} class="textarea textarea-bordered w-11/12 resize-none" onChange={onChangeContent} id="content" placeholder="내용을 입력하세요" rows="10"></textarea>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="input">입력 설명</label>
          <textarea value={inputDescription} class="textarea textarea-bordered w-11/12 resize-none" onChange={onChangeInputDescription} id="input" placeholder="입력 설명을 입력하세요" rows="10"></textarea>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="output">출력 설명</label> <br />
          <textarea value={outputDescription} class="textarea textarea-bordered w-11/12 resize-none" onChange={onChangeOutputDescription} id="output" placeholder="출력 설명을 입력하세요" rows="10"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
        <div className="grid grid-cols-12 mb-4">
            <label className="text-end col-span-2 font-bold me-1"htmlFor="inputEx">입력 예제</label>
            <div className='col-span-10'>
              <Editor onChange={onChangeInputExam}id="inputEx" value={inputExam}
                options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false}}}
                height={`${inputExam.split('\n').length * 19}px`} 
              />
            </div>
          </div>
          <div className='grid grid-cols-12 mb-4'>
            <label className="text-end col-span-2 font-bold me-1"htmlFor="inputEx">출력 예제</label>
            <div className='col-span-10' >
              <Editor onChange={onChangeOutputExam} id="inputEx" value={outputExam}
                options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false}}}
                height={`${outputExam.split('\n').length * 19}px`} 
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="rating">언어</label>
              <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered w-8/12" >
                <option>java</option>
                <option>python</option>
                <option>cpp</option>
              </select>
            </div>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="rating">문제 등급</label>
              <input value={rating} onChange={(e)=>{setRating(e.target.value)}} className="w-8/12 bg-white rounded-lg bor input input-sm input-bordered" id="rating" type="number" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className='flex justify-end'>
              <button className="btn btn-sm btn-neutral" onClick={()=>document.getElementById('TagModal').showModal()}>알고리즘 선택</button>
              <dialog id="TagModal" className="modal">
                <div className="modal-box">
                  <div className="modal-action flex justify-between mb-4 mt-0">
                    <div className="w-12"></div>
                    <h3 className="font-bold text-lg text-center ms-">문제의 알고리즘 유형을 선택하세요</h3>
                    <form method="dialog">
                      <button className="btn-sm btn rounded-full">X</button>
                    </form>
                  </div>
                  <div className="text-center">
                    <div>
                      <label className="font-bold ms-4 mt-1 me-2">알고리즘</label>
                      <select value={'선택'} onChange={onClickCate} className="select select-sm select-bordered w-20" >
                        <option disabled='true'>선택</option>
                        {cateList.map((cate)=>{
                          return(
                            <option key={cate} onClick={onClickCate}>{cate}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="px-4 mt-4 grid grid-cols-3 gap-4" >
                      {selectedList.map((selected)=>{
                        return(
                          <div className='m-2 bg-gray-300 p-2 rounded-lg w-full' onClick={onClickSelected}>{selected} X</div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="time">시간제한</label>
              <input value={time} onChange={(e)=>{setTime(e.target.value)}} type="text" id="time" placeholder="시간제한(ms)" className="input input-sm input-bordered w-5/12" />
            </div>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="mem">메모리제한</label>
              <input value={mem} onChange={(e)=>{setMem(e.target.value)}} type="text" id="mem" placeholder="메로리제한(MB)" className="input input-sm input-bordered w-5/12" />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 mb-4'>
          <label className="font-bold me-1 col-span-1 text-end"htmlFor="inputEx">
            검증용 코드
            <div>
            <button className='btn btn-sm btn-neutral' onClick={onClickComfile}>컴파일</button>
            </div>
          </label>
          <div className='col-span-11'>
            <Editor value={testCode} onChange={onChangeTestCode} language={lang} height="400px" id="inputEx"
            options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false},}}
            
            />
          </div>    
        </div>
        <div className='flex justify-center mb-4'>
          <div className="btn w-60 btn-sm text-lg text-center rounded-full drop-shadow" onClick={()=>document.getElementById('testCaseModal').showModal()}>테스트케이스 보기</div>
          
          <dialog id='testCaseModal' className="modal">
          <TestCaseModal 
          testcase={testcase}
          />
          </dialog>
        </div>
        <div className='flex justify-between'>
          <div className=' w-40'></div>
          <div><button className={isValidCode? 'btn btn-neutral w-60 text-2xl text-center rounded-full' : 'btn w-60 text-2xl text-center rounded-full btn-disabled' } onClick={onClick}>{isValidCode? '수 정' : '컴파일 후 수정가능' }</button></div>
          <div><button className='btn w-40 text-xl text-center rounded-full drop-shadow-lg' onClick={onDelete}>삭제</button></div>
        </div>
      </div>
    </div>
  )
}