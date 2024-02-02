import CodeMirror from '@uiw/react-codemirror';
import {useState, useCallback, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TestCaseModal from '../../../../components/problem/TestcaseModal';

export default function ProblemEdit() {
  const params = useParams()
  const [title, setTitle] = useState("");
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


  useEffect(() => {
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/problem/${params.problemId}/modify`,
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
      setSelectedList(res.data.data.tagList.map((tag)=>{return tag.tagName}))
      let tmp = cateList
      res.data.data.tagList.map((tag)=>{tmp = tmp.filter((el)=>{return el != tag.tagName})})
      setCateList(tmp)
    })

  },[]) 

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
    const text = e.target.innerText.split("(")[0]
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
      url : "",
      method : "post",
      data : {
        userId:1,
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
        tagList:tagList
      },
    })
    .then((res) => {
      console.log(res);
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
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputEx">입력 예제</label>
            <CodeMirror value={inputExam} onChange={onChangeInputExam} className='w-10/12' height="100%" id="inputEx"/>
          </div>
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputEx">출력 예제</label>
            <CodeMirror value={outputExam} onChange={onChangeOutputExam} className='w-10/12' height="100%" id="inputEx"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="rating">검증코드언어</label>
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
          <div className="grid grid-cols-2 gap-5">
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="time">시간제한</label>
              <input value={time} onChange={(e)=>{setTime(e.target.value)}} type="text" id="time" placeholder="시간제한(ms)" className="input input-sm input-bordered w-8/12" />
            </div>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="mem">메모리제한</label>
              <input value={mem} onChange={(e)=>{setMem(e.target.value)}} type="text" id="mem" placeholder="메로리제한(MB)" className="input input-sm input-bordered w-8/12" />
            </div>
          </div>
        </div>
        <div className='flex justify-end mb-4'>
        <label className="font-bold me-1"htmlFor="time">알고리즘</label>
          <select onChange={onClickCate} className="select select-sm select-bordered" style={{width:"15.5%"}} >
            {cateList.map((cate)=>{
              return(
                <option onClick={onClickCate}>{cate}</option>
              )
            })}
          </select>
          <div className="w-9/12 ms-5" >
            {selectedList.map((selected)=>{
              return(
                <span className='mx-2' onClick={onClickSelected}>{selected}(삭제)</span>
              )
            })}
          </div> 
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="inputEx">검증용 코드</label>
          <CodeMirror value={testCode} onChange={onChangeTestCode} className='w-11/12' height="400px" id="inputEx"/>
        </div>
        <div className='flex justify-center mb-4'>
        <button className="btn btn-sm w-60 text-lg text-center rounded-full drop-shadow" onClick={()=>document.getElementById('my_modal_3').showModal()}>테스트케이스 보기</button>
        <dialog id="my_modal_3" className="modal">
          <TestCaseModal />
        </dialog>
        </div>
        <div className='flex justify-between'>
          <div className=' w-40'></div>
          <div><button className='btn btn-neutral w-60 text-2xl text-center rounded-full drop-shadow-lg' onClick={onClick} >수 정</button></div>
          <div><button className='btn w-40 text-xl text-center rounded-full drop-shadow-lg'>삭제</button></div>
        </div>
      </div>
    </div>
  )
}