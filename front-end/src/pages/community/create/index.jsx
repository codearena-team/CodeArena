import CodeMirror from '@uiw/react-codemirror';
import { useState,useCallback } from "react";
import axios from 'axios';
import '../../css/community.css';

export default function CommunityCreate(){
  const [title, setTitle] = useState('');
  const [pbnumber,setPbnumber] = useState('');
  const [lang,setLang] = useState('Java');
  const [cate,setCate] = useState('질문');
  const [spo,setSpo] = useState(2)
  const [content, setContent] = useState('');
  const [testCode, setTestCode] = useState("");
  const [bgcolor,setBgcolor] = useState('#F4F2CA');
  const [showCodeMirror, setShowCodeMirror] = useState(false)

  const onChangeTestCode = useCallback((code, viewUpdate) => {
    setTestCode(code);
  }, []);


  const onClickCheckbox = () => {
    if (spo === 2) {
      setSpo(1)
    } else {
      setSpo(2)
    }
    console.log(spo)
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

  return(
    <div className="p-20 pt-0">
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">제목</label>
          <input type="text" placeholder="제목을 입력하세요" id="title" onChange={(e)=>{setTitle(e.target.value)}} className="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">문제번호</label>
          <input type="text" placeholder="문제번호를 입력하세요" id="title" onChange={(e)=>{setPbnumber(e.target.value)}} className="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">언어</label>
            <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered w-2/12" >
              <option>Java</option>
              <option>Python</option>
              <option>cpp</option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">카테고리</label>
            <select value={cate} onChange={(e)=>{setCate(e.target.value)}} className="select select-sm select-bordered w-2/12" >
              <option>질문</option>
              <option>시간복잡도</option>
              <option>공간복잡도</option>
              <option>반례요청</option>
              <option>반례</option>
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
          <button className="btn rounded-full drop-shadow-xl" 
            style={{backgroundColor:'#F4F2CA',border:'1px solid black'}}
            >글쓰기
            </button>
        </div>
      </div>
    </div>
  )
}