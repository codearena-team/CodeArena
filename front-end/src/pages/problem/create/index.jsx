import {useState, useCallback, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import swal from 'sweetalert';

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
  const [cateList, setCateList] = useState(["DP","구현","그리디","매개변수 탐색","문자열","수학","시뮬레이션","완전탐색","이분탐색","자료구조"])
  const [selectedList, setSelectedList] = useState([])
  
useEffect(()=>{ axios({
  method : 'get',
  url : `https://i10d211.p.ssafy.io/api/problem/category`,
})
.then((res)=> {
  console.log(res);
  setCateList(res.data.data.map((el)=>el.tagName))
})
.catch((err)=> {
  console.log(err);
})
},[])
  
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
      console.log(res);
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
    if (!title){
      swal("제목은 필수입니다", "", "warning")
      return;
    }
    if (!content){
      swal("내용은 필수입니다", "", "warning")
      return;
    }
    if (!inputDescription){
      swal("입력설명은 필수입니다", "", "warning")
      return;
    }
    if (!outputDescription){
      swal("출력설명은 필수입니다", "", "warning")
      return;
    }
    if (!inputExam){
      swal("입력예제은 필수입니다", "", "warning")
      return;
    }
    if (!outputExam){
      swal("출력예제은 필수입니다", "", "warning")
      return;
    }
    if (!inputFileData){
      swal("입력파일을 선택해주세요", "", "warning")
      return;
    }
    if (!outputFileData){
      swal("출력파일을 선택해주세요", "", "warning")
      return;
    }
    if (selectedList.length === 0) {
      swal("알고리즘을 선택하세요", "", "warning");
      return;
    }

    const testCase = inputFileData.map((input,index) => {
      return {
        input : inputFileData[index].trim(),
        output : outputFileData[index].trim()
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
        problemExInput:inputExam.trim(),
        problemExOutput:outputExam.trim(),
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
     
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  const gongji = `테스트케이스는 메모장 기준으로 첨부파일을 첨부하시면 되며 input과 output 기준으로 하나의 테스트케이스당 공백(엔터)을 주어야 합니다.
아래의 예시는 2개의 테스트케이스를 작성한 예시입니다.
ex) input이 먼저 나오고 다음엔 output입니다.

input.txt                                       output.txt
          
3 4                                                2
0 0 0 0                             
0 0 0 1                                         1
1 0 0 1          

2 4
0 0 0 0
1 1 1 1`;
  return (
    <div className="p-20 pt-0">
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <h1 className='font-bold text-3xl text-center mb-5 '>문제 생성</h1>
        <div className='grid grid-cols-12 mb-4'>
          <div className="col-start-2 col-span-10">
            <p className="font-bold col-span-1 mb-2"htmlFor="title">제목</p>
            <input type="text" placeholder="제목을 입력하세요" id="title" onChange={onChangeTitle} className="input input-bordered w-full" />
          </div>
        </div>
        <div className='grid grid-cols-12 mb-4'>
          <div className="col-start-2 col-span-10">
            <p className=" font-bold mb-2"htmlFor="content">내용</p>
            <textarea class="textarea textarea-bordered w-full resize-none" onChange={onChangeContent} id="content" placeholder="내용을 입력하세요" rows="10"></textarea>
          </div>
        </div>
        <div className='grid grid-cols-12 mb-4'>
          <div className="col-start-2 col-span-10">
            <p className=" font-bold mb-2"htmlFor="input">입력 설명</p>
            <textarea class="textarea textarea-bordered w-full resize-none" onChange={onChangeInputDescription} id="input" placeholder="입력 설명을 입력하세요" rows="10"></textarea>
          </div>
        </div>
        <div className='grid grid-cols-12 mb-4'>
          <div className="col-start-2 col-span-10">
            <p className=" font-bold mb-2"htmlFor="output">출력 설명</p>
            <textarea class="textarea textarea-bordered w-full resize-none" onChange={onChangeOutputDescription} id="output" placeholder="출력 설명을 입력하세요" rows="10"></textarea>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-12'>
          <div className="col-start-2 col-span-5 mb-4 z-10">
            <p className=" col-span-2 font-bold mb-2"htmlFor="inputEx">입력 예제</p>
            <div className='col-span-10'>
              <Editor onChange={onChangeInputExam}id="inputEx"
            options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false}}}
              height={`${inputExam.split('\n').length * 19}px`} />
            </div>
          </div>
          <div className='col-start-7 col-span-5 mb-4 z-10'>
            <p className=" col-span-2 font-bold mb-2"htmlFor="inputEx">출력 예제</p>
            <div className='col-span-10' >
              <Editor onChange={onChangeOutputExam} id="inputEx"
              options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false}}}
              height={`${outputExam.split('\n').length * 19}px`} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mb-4 gap-12">
          <div className='col-start-2 col-span-5 z-10'>
            <p className=" font-bold col-span-2 mb-2"htmlFor="inputFile">입력 파일</p>
            <input onClick={e=>e.target.value=null} onChange={onChangeInputFile} id="inputFile"  type="file" className="file-input file-input-bordered file-input-sm w-full" />
          </div>
          <div className='col-start-7 col-span-5 z-10'>
            <p className=" font-bold mb-2 col-span-2"htmlFor="inputFile">출력 파일</p>
            <input onClick={e=>e.target.value=null} onChange={onChangeOutputFile} id="outputFile"  type="file" className="file-input file-input-bordered file-input-sm w-full" />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-12 mb-4">
          
          <div className='col-start-2 col-span-5 grid grid-cols-3'>
            <div className='col-span-3 text-center z-10'>
              <span>공지사항을 먼저 읽고 입출력을 작성해 주세요.</span><br />
              <div className=' text-blue-700 btn btn-sm mt-2'
              onClick={()=>document.getElementById('modal').showModal()}>입출력 파일 공지사항</div>
            </div>

            <dialog id="modal" className="modal">
              <div className="modal-box" style={{backgroundColor: "#F5F5EC",maxWidth:'900px'}}>
                <div className='grid mb-2'>
                  <textarea className="textarea textarea-bordered w-full resize-none font-bold text-md" rows="18"
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
            {/* <div className='grid grid-cols-12'>
              <label className="font-bold mb-2"htmlFor="rating">문제 등급</label>
              <input value={rating} onChange={(e)=>{setRating(e.target.value)}} className="col-span-8 bg-white rounded-lg bor input input-sm input-bordered" id="rating" type="number" />
            </div> */}

            <div className="flex items-end">
              
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 col-span-5">
            <div className='z-10'>
              <p className="text-sm font-bold col-span-4 mb-2"htmlFor="rating">언어</p>
              <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered w-full" >
                <option>java</option>
                <option>python</option>
                <option>cpp</option>
              </select>
            </div>
            <div className='z-10'>
              <p className="text-sm font-bold mb-2"htmlFor="time">시간제한(ms)</p>
              <input onChange={(e)=>{setTime(e.target.value)}} value={time} type="text" id="time" placeholder="시간제한(ms)" className="input input-sm input-bordered w-full" />
            </div>
            <div className='z-10'>
              <p className="text-sm font-bold mb-2"htmlFor="mem">메모리제한(MB)</p>
              <input onChange={(e)=>{setMem(e.target.value)}} value={mem} type="text" id="mem" placeholder="메로리제한(MB)" className="input input-sm input-bordered w-full" />
            </div>
          </div>
        </div>
        
        <div className='grid grid-cols-12 mb-4'>
          <div className="col-start-2 col-span-10">
            <span className="font-bold mb-2 col-span-1"htmlFor="inputEx">
              검증용 코드
            </span>
            <button className='btn btn-sm btn-neutral ms-4' onClick={onClickComfile}>컴파일</button>
            <button className="btn btn-sm btn-neutral ms-4" onClick={()=>document.getElementById('TagModal').showModal()}>알고리즘 선택</button>
            <dialog id="TagModal" className="modal">
              <div className="modal-box" style={{backgroundColor:'rgb(245, 245, 236)'}}>
                <div className="modal-action flex justify-between mb-4 mt-0">
                  <div className="w-12"></div>
                  <h3 className="font-bold text-lg text-center ms-">문제의 알고리즘 유형을 선택하세요</h3>
                  <form method="dialog">
                    <button className="btn-sm btn rounded-full">X</button>
                  </form>
                </div>
                <div className="text-center">
                  <div>
                    <p className="font-bold ms-4 mt-1 me-2">알고리즘</p>
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
                  <div className="flex justify-end px-4">
                    <form method="dialog">
                      <button className="btn-sm btn rounded-lg mt-5">확인</button>
                    </form>
                  </div>
                </div>
              </div>
            </dialog>


            <div className='w-full mt-2'>
              <Editor language={lang} height="400px"
              onChange={onChangeTestCode} 
              options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false}}}/>
            </div>
          </div>



        </div>
        <div className='flex justify-center z-10'>
          <div className={isValidCode? 'z-10 btn btn-neutral w-60 text-2xl text-center rounded-full' : 'z-10 btn w-60 text-2xl text-center rounded-full btn-disabled' } onClick={onClick}>{isValidCode? '제 출' : '컴파일 후 제출가능' }</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}