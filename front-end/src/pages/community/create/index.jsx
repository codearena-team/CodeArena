
import { useState,useCallback } from "react";
import axios from 'axios';
import '../../css/community.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react'
import swal from 'sweetalert'

export default function CommunityCreate() {
  const userId = useSelector(state => state.auth.userId)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [problemId,setProblemId] = useState('');
  const [lang,setLang] = useState('java');
  // 1 : 질문, 2: 시간복잡도 ,3:공간복잡도 ,4:반례요청 ,5:반례
  const [type,setType] = useState(1);
  const [spoiler,setSpoiler] = useState(0)
  // 스포방지버튼:  0은 전체공개 1은 스포방지
  const [code, setCode] = useState("");
  const [bgcolor,setBgcolor] = useState('#F4F2CA');
  const [showCodeMirror, setShowCodeMirror] = useState(false)

  const navigate = useNavigate()

  const onChangeTestCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);

  

  const onClickCheckbox = () => {
    if (spoiler === 0) {
      setSpoiler(1)
    } else {
      setSpoiler(0)
    }
  }

  const colorChange = () =>{
    if (bgcolor === '#F4F2CA'){
      setBgcolor('#ffffff')
      setShowCodeMirror(true)
    }else {
      setBgcolor('#F4F2CA')
      setShowCodeMirror(false)
    }
  }

  // 게시글 작성
  const createArticle = ()=>{
    const parsedProblemId = parseInt(problemId);
    if (isNaN(parsedProblemId)) {
        swal("문제번호는 숫자로 입력되어야 합니다", "", "warning");
        return;
    }
    
    if (!title || !content || !problemId) {
      swal("제목,문제번호,내용은 필수입니다", "", "warning")
      return;
    }
    axios({
      url : 'https://codearena.shop/api/board/write',
      method : 'post',
      data : {
        userId : userId,
        problemId : problemId,
        title : title,
        content : content,
        type : type,
        lang : lang,
        code : code,
        spoiler : spoiler
      }
    })
    .then((res)=>{
      console.log(res)
      swal("게시글작성완료","","success")
      navigate('/community')
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return(
    <div className="ml-64 mr-64 mt-10">
      <div className="p-4 rounded-3xl drop-shadow mb-7" style={{backgroundColor: "#F5F5EC"}}>
        <div className="flex">
          <div className="w-1/12"></div>
          <label className="me-1 py-3 font-bold" htmlFor="title">제목</label>
        </div>
        <div className='flex justify-end'>
          <input type="text" placeholder="제목을 입력하세요" id="title" onChange={(e)=>{setTitle(e.target.value)}} className="input input-bordered w-10/12" />
          <div className='w-1/12'></div>        
        </div>
        <div className="flex">
          <div className="w-1/12"></div>
          <label className="me-1 py-3 font-bold" htmlFor="title">문제번호</label>
        </div>
        <div className='flex justify-end mb-4'> 
          <input type="text" placeholder="문제번호를 입력하세요" id="title" onChange={(e)=>{setProblemId(e.target.value)}} className="input input-bordered w-10/12" />
          <div className='w-1/12'></div>  
        </div>
        <div className='flex justify-start mb-4'>
          <div className="w-1/12"></div>
          <div className='flex justify-center items-center'>
          <label className="me-3 py-3 font-bold" htmlFor="rating">카테고리</label>
            <select value={type} onChange={(e)=>{setType(e.target.value)}} className="select select-sm select-bordered mr-6" >
              <option value={1}>질문</option>
              <option value={2}>시간복잡도</option>
              <option value={3}>공간복잡도</option>
              <option value={4}>반례요청</option>
              <option value={5}>반례</option>
            </select>
          </div>
          <div className="flex justify-center items-center">
          <label className="me-3 py-3 font-bold" htmlFor="rating">언어</label>
            <select value={lang} onChange={(e)=>{setLang(e.target.value)}}  className="select select-sm select-bordered mr-6" >
              <option>java</option>
              <option>python</option>
              <option>cpp</option>
            </select>
          </div>
          <div className='flex justify-center items-center'>  
            <label className="cursor-pointer label me-1 font-bold">스포방지여부</label>
            <div className='flex items-center'><input type="checkbox" className="checkbox checkbox-warning" style={{borderColor:'black'}} onClick={onClickCheckbox}/></div>
          </div>
        </div>        
        <div className="flex mb-3">
          <div className="w-1/12"></div>
          <label className="me-1 font-bold" htmlFor="content">내용</label>
        </div>
        <div className='flex justify-end mb-4'>
          <textarea className="textarea textarea-bordered w-10/12 resize-none" onChange={(e)=>{setContent(e.target.value)}} id="content" placeholder="내용을 입력하세요" rows="10"></textarea>
          <div className='w-1/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <button className="btn btn-sm btn-active drop-shadow text-md" 
          style={{backgroundColor:bgcolor}}
          onClick={colorChange}>코드블럭 추가하기
          </button>
          <div className='w-1/12'></div>
        </div>
        { showCodeMirror && (
          <div className='grid grid-cols-12 mb-4'>
            <label className="col-span-1 me-1"htmlFor="inputEx"></label>
            <div className='col-span-10'>
              <Editor onChange={onChangeTestCode} height="400px" id="inputEx" language={lang}
              options={{'scrollBeyondLastLine':false,'minimap':{enabled:false}}}
              theme="vs-dark"
              />
            </div>
            <div className='col-span-1'></div>
          </div>
        )}
        <div className='flex justify-end mb-4'>
          <button className="btn btn-sm btn-active drop-shadow text-md"
          style={{backgroundColor:'#F4F2CA'}}
          onClick={createArticle}
          >글쓰기
          </button>
          <div className='w-1/12'></div>
        </div>
      </div>
    </div>
  )
}