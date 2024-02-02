import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"
import "../../css/problemdetail.css"
import CodeMirror from '@uiw/react-codemirror';



export default function CommunityDetail(){
  // const params = useParams();
  // const boardId = params.boardId

  // useEffect(()=>{
  //   axios({
  //     url : `http://i10d211.p.ssafy.io:8081/api/board/detail/${boardId}`,
  //     method : 'get'
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // },[])

  return (
    <div className="p-20 pt-0">
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">제목</label>
          <input type="text" id="title" className="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">문제번호</label>
          <input type="text" id="title" className="input input-bordered w-11/12" />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">언어</label>
            <select className="select select-sm select-bordered w-2/12" >
              <option></option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">카테고리</label>
            <select className="select select-sm select-bordered w-2/12" >
              <option>질문</option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className="flex mb-4">
          <label className="cursor-pointer label font-bold me-1">스포방지여부</label>
            <div className='flex items-center'><input type="checkbox" className="checkbox checkbox-warning" style={{borderColor:'black'}}/></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="content">내용</label>
          <textarea className="textarea textarea-bordered w-11/12 resize-none" rows="10"></textarea>
        </div>    
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="inputEx">검증용 코드</label>
          <CodeMirror className='w-11/12' height="400px" id="inputEx"/>
        </div>
      </div>
    </div>
  )
}