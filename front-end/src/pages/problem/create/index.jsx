import CodeMirror from '@uiw/react-codemirror';
import {useState, useCallback, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthCheck } from '../../../features/useAuthCheck';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import axios from 'axios';

export default function ProblemCreate() {
  const params = useParams()
  const navigate = useNavigate()
  const userId = useSelector(state => state.auth.userId)
  const userNickname = useSelector(state => state.auth.userNickname)
  const [title, setTitle] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const [content, setContent] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [outputDescription, setOutputDescription] = useState("");
  const [outputExam, setOutputExam] = useState("");
  const [inputExam, setInputExam] = useState("");
  const [inputFileData, setInputFileData] = useState([]);
  const [outputFileData, setOutputFileData] = useState([]);
  const [lang, setLang] = useState("java");
  const [testCode, setTestCode] = useState("");
  const [time, setTime] = useState("1000");
  const [mem, setMem] = useState("256");
  const [rating, setRating] = useState(1)
  const [cateList, setCateList] = useState(["PD","구현","그리디","매개변수 탐색","문자열","수학","시뮬레이션","완전탐색","이분탐색","자료구조"])
  const [selectedList, setSelectedList] = useState([])
  
  const onChangeInputFile = (event) => {
    if (event.target.files[0].type === "text/plain") {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
    console.log(event);
      let text = event.target.result;
      text = text.replaceAll("\r", "");
      let data = text.split("\n\n");
      setInputFileData(data);
    };
    reader.readAsText(file);
    } else {
      alert(".txt 파일만 업로드 가능합니다.")
      event.target.value = null;
    }
  };
  const onChangeOutputFile = (event) => {
    if (event.target.files[0].type === "text/plain") {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
    console.log(event);
    let text = event.target.result;
    text = text.replaceAll("\r", "");
    let data = text.split("\n\n");
    setOutputFileData(data);
    };
    reader.readAsText(file);
    } else {
      alert(".txt 파일만 업로드 가능합니다.")
      event.target.value = null;
    }
  };
  
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

  const onClickComfile = () => {
    const data = {
        problemValidationCode : testCode,
        problemExInput : inputExam,
        problemExOutput :outputExam,
        problemTime : time,
        testCase : inputFileData.map((el,index) => {
          return {input : el, output: outputFileData[index]}
        })
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


  const onChangeTestCode = useCallback((code, viewUpdate) => {
    setTestCode(code);
  }, []);

  const onClick = () => {
    const testCase = inputFileData.map((input,index) => {
      return {
        input : inputFileData[index],
        output : outputFileData[index]
      }
    })
    const tagList = selectedList.map((selected)=>{
      return {tagName : selected}
    })
    axios({
      url : `https://i10d211.p.ssafy.io/api/problem`,
      method : "post",
      data : {
        userId:userId,
        problemTitle:title,
        problemContent:content,
        problemInputDesc:inputDescription,
        problemOutputDesc:outputDescription,
        problemExInput:inputExam,
        problemExOutput:outputExam,
        testCase:testCase,
        problemTime:time,
        problemMem:mem,
        problemValidationCode:testCode,
        problemValidationLang:lang,
        tagList:tagList
      },
    })
    .then((res) => {
      console.log(res);
      navigate(`/problem`)
      axios.post('https://i10d211.p.ssafy.io/api/alarm/send',
      {
        alarmType : 1,
        fromId : userId,
        toId : 1,
        alarmMsg : `${userNickname}님(userId:${userId})이 문제를 생성을 요청하였습니다.(prblemId:${params.problemId}) `,
      }
      )
      .then(res=> {
        console.log(res);
        navigate('/problem')
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const gongji = `테스트케이스는 메모장 기준으로 첨부파일을 첨부하시면 되며 input과 output 기준으로 하나의 테스트케이스당 공백(엔터)을 주어야 합니다.
아래의 예시는 2개의 테스트케이스를 작성한 예시입니다.
ex) input이 먼저 나오고 다음엔 output입니다.

input.txt                   output.txt

3 4                            2
0 0 0 0                   
0 0 0 1                     1
1 0 0 1

2 4
0 0 0 0
1 1 1 1`;
  return (
    <div className="p-20 pt-0">
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <h1 className='font-bold text-3xl text-center mb-5'>문제 생성</h1>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3"htmlFor="title">제목</label>
          <input type="text" placeholder="제목을 입력하세요" id="title" onChange={onChangeTitle} class="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="content">내용</label>
          <textarea class="textarea textarea-bordered w-11/12 resize-none" onChange={onChangeContent} id="content" placeholder="내용을 입력하세요" rows="10"></textarea>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="input">입력 설명</label>
          <textarea class="textarea textarea-bordered w-11/12 resize-none" onChange={onChangeInputDescription} id="input" placeholder="입력 설명을 입력하세요" rows="10"></textarea>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="output">출력 설명</label> <br />
          <textarea class="textarea textarea-bordered w-11/12 resize-none" onChange={onChangeOutputDescription} id="output" placeholder="출력 설명을 입력하세요" rows="10"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputEx">입력 예제</label>
            <CodeMirror onChange={onChangeInputExam} className='w-10/12' height="100%" id="inputEx"/>
          </div>
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputEx">출력 예제</label>
            <CodeMirror onChange={onChangeOutputExam} className='w-10/12' height="100%" id="inputEx"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div  className='flex justify-end'>
            <label abel className="font-bold me-1"htmlFor="inputFile">입력 파일</label>
            <input onClick={e=>e.target.value=null} onChange={onChangeInputFile} id="inputFile"  type="file" className="file-input file-input-bordered file-input-sm w-10/12" />
          </div>
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputFile">출력 파일</label>
            <input onClick={e=>e.target.value=null} onChange={onChangeOutputFile} id="outputFile"  type="file" className="file-input file-input-bordered file-input-sm w-10/12" />
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
            <div className='text-center'>
              <span>공지사항을 먼저 읽고 입출력을 작성해 주세요.</span><br />
              <div className=' text-blue-700 btn btn-sm mt-2'
              onClick={()=>document.getElementById('modal').showModal()}>입출력 파일 공지사항</div>
            </div>

            <dialog id="modal" className="modal">
              <div className="modal-box" style={{backgroundColor: "#F5F5EC",maxWidth:'900px'}}>
                <div className='flex justify-end mb-2'>
                  <textarea className="textarea textarea-bordered w-full resize-none font-bold text-lg" rows="15"
                    value={gongji}
                    style={{outline:'none'}}
                    readOnly
                    >
                  </textarea>
                </div>
                  <div className="modal-action ">   
                    <form method="dialog">
                      <button className="btn btn-sm btn-active drop-shadow text-md mt-0" 
                      style={{backgroundColor:'#E2E2E2'}}
                      >닫기</button>
                    </form>
                  </div>           
              </div>
            </dialog>
            {/* <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="rating">문제 등급</label>
              <input value={rating} onChange={(e)=>{setRating(e.target.value)}} className="w-8/12 bg-white rounded-lg bor input input-sm input-bordered" id="rating" type="number" />
            </div> */}
            
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
              <input onChange={(e)=>{setTime(e.target.value)}} value={time} type="text" id="time" placeholder="시간제한(ms)" className="input input-sm input-bordered w-5/12" />
            </div>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="mem">메모리제한</label>
              <input onChange={(e)=>{setMem(e.target.value)}} value={mem} type="text" id="mem" placeholder="메로리제한(MB)" className="input input-sm input-bordered w-5/12" />
            </div>
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="inputEx">
            검증용 코드
            <div>
            <button className='btn btn-sm btn-neutral' onClick={onClickComfile}>컴파일</button>
            </div>
          </label>
          <CodeMirror extensions={[java(),python(),cpp()]} onChange={onChangeTestCode} className='w-11/12' height="400px" id="inputEx"/>
        </div>
        <div className='flex justify-center'>
          <button className={isValidCode? 'btn btn-neutral w-60 text-2xl text-center rounded-full' : 'btn w-60 text-2xl text-center rounded-full btn-disabled' } onClick={onClick}>{isValidCode? '제 출' : '컴파일 후 제출가능' }</button>
          <div></div>
        </div>
      </div>
    </div>
  )
}