import CodeMirror from '@uiw/react-codemirror';
import {useState, useCallback} from "react";
import axios from 'axios';

export default function ProblemCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [outputDescription, setOutputDescription] = useState("");
  const [outputExam, setOutputExam] = useState("");
  const [inputExam, setInputExam] = useState("");
  const [inputFileData, setInputFileData] = useState("");
  const [outputFileData, setOutputFileData] = useState("");
  const [lang, setLang] = useState("Java");
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
  // const onChangeInputFile = (e) => {
  //   if (e.target.files[0].type === "text/plain") {
  //     console.log(e.target.files[0]);
  //     setInputFile(e.target.files[0])
  //   } else {
  //     alert(".txt 파일만 업로드 가능합니다.")
  //     e.target.value = null;
  //   }
  // }
  // const onChangeOutputFile = (e) => {
  //   if (e.target.files[0].type === "text/plain") {
  //     console.log(e.target.files[0]);
  //     setOutputFile(e.target.files[0])
  //   } else {
  //     alert(".txt 파일만 업로드 가능합니다.")
  //     e.target.value = null;
  //   }
  // }
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
      url : `http://i10d211.p.ssafy.io:8081/api/problem`,
      method : "post",
      data : {
        userId:1,
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
    })
    .catch((err) => {
      console.log(err);
    })
  }


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
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputFile">입력 파일</label>
            <input onChange={onChangeInputFile} id="inputFile"  type="file" className="file-input file-input-bordered file-input-sm w-10/12" />
          </div>
          <div className='flex justify-end'>
            <label className="font-bold me-1"htmlFor="inputFile">출력 파일</label>
            <input onChange={onChangeOutputFile} id="outputFile"  type="file" className="file-input file-input-bordered file-input-sm w-10/12" />
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
              <input onChange={(e)=>{setTime(e.target.value)}} value={time} type="text" id="time" placeholder="시간제한(ms)" className="input input-sm input-bordered w-8/12" />
            </div>
            <div className='flex justify-end'>
              <label className="font-bold me-1"htmlFor="mem">메모리제한</label>
              <input onChange={(e)=>{setMem(e.target.value)}} value={mem} type="text" id="mem" placeholder="메로리제한(MB)" className="input input-sm input-bordered w-8/12" />
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
          <CodeMirror onChange={onChangeTestCode} className='w-11/12' height="400px" id="inputEx"/>
        </div>
        <div className='flex justify-center'>
          <button className='btn btn-neutral w-60 text-2xl text-center rounded-full' onClick={onClick} >제 출</button>
        </div>
      </div>
    </div>
  )
}