import CodeMirror from '@uiw/react-codemirror';
import { useState,useCallback } from "react";
import axios from 'axios';
import '../../css/community.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function CommunityCreate() {
  const userId = useSelector(state => state.auth.userId)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [problemId,setProblemId] = useState('');
  const [lang,setLang] = useState('Java');
  // 1 : 질문, 2: 시간복잡도 ,3:공간복잡도 ,4:반례요청 ,5:반례
  const [type,setType] = useState('질문');
  const [spoiler,setSpoiler] = useState(0)
  // 스포방지버튼 0은 전체공개 1은 스포방지
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

  const createArticle = ()=>{
    axios({
      url : 'http://i10d211.p.ssafy.io:8081/api/board/write',
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
      navigate('/community')
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return(
    <div className="p-20 pt-0">
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">제목</label>
          <input type="text" placeholder="제목을 입력하세요" id="title" onChange={(e)=>{setTitle(e.target.value)}} className="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">문제번호</label>
          <input type="text" placeholder="문제번호를 입력하세요" id="title" onChange={(e)=>{setProblemId(e.target.value)}} className="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">언어</label>
            <select value={lang} onChange={(e)=>{setLang(e.target.value)}}  className="select select-sm select-bordered w-2/12" >
              <option>Java</option>
              <option>Python</option>
              <option>cpp</option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">카테고리</label>
            <select value={type} onChange={(e)=>{setType(e.target.value)}} className="select select-sm select-bordered w-2/12" >
              <option value={1}>질문</option>
              <option value={2}>시간복잡도</option>
              <option value={3}>공간복잡도</option>
              <option value={4}>반례요청</option>
              <option value={5}>반례</option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className="flex mb-4">
          <label className="cursor-pointer label font-bold me-1">스포방지여부</label>
            <div className='flex items-center'><input type="checkbox" className="checkbox checkbox-warning" style={{borderColor:'black'}} onClick={onClickCheckbox}/></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="content">내용</label>
          <textarea className="textarea textarea-bordered w-11/12 resize-none" onChange={(e)=>{setContent(e.target.value)}} id="content" placeholder="내용을 입력하세요" rows="10"></textarea>
        </div>
        <div className='flex justify-end mb-4'>
          <button className="btn btn-sm rounded-full drop-shadow-xl" 
          style={{backgroundColor:bgcolor,border:'1px solid black'}}
          onClick={colorChange}>코드블럭 추가하기
          </button>
        </div>
        { showCodeMirror && (
          <div className='flex justify-end mb-4'>
            <label className="font-bold me-1"htmlFor="inputEx">검증용 코드</label>
            <CodeMirror onChange={onChangeTestCode} className='w-11/12' height="400px" id="inputEx"/>
          </div>
        )}
        <div className='flex justify-end mb-4'>
          <button className="btn btn-sm rounded-full drop-shadow-xl" 
            style={{backgroundColor:'#F4F2CA',border:'1px solid black'}}
            onClick={createArticle}
            >글쓰기
          </button>
        </div>
      </div>
    </div>
  )
}