import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"
import "../../css/problemdetail.css"
import CodeMirror from '@uiw/react-codemirror';



export default function CommunityDetail(){
  const [bgcolor,setBgcolor] = useState('#F4F2CA');
  const [showCodeMirror, setShowCodeMirror] = useState(false)
  const params = useParams();
  const boardId = params.communityId
  const [board,setBoard] = useState({})
  const navigate = useNavigate()
  const [cate,setCate] = useState('')
  const catedic = {'1':'질문','2':'시간복잡도','3':'공간복잡도','4':'반례 요청','5':'반례',}

  const colorChange = () =>{
    if (bgcolor === '#F4F2CA'){
      setBgcolor('#ffffff')
      setShowCodeMirror(true)
    }else {
      setBgcolor('#F4F2CA')
      setShowCodeMirror(false)
    }
  }
  useEffect(()=>{
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/board/detail/${boardId}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res.data.data)
      setBoard(res.data.data)
      setCate(catedic[res.data.data.type])
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const boardDelete = ()=>{
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/board/delete/${boardId}`,
      method : 'delete'
    })
    .then((res)=>{
      console.log(res)
      alert('게시글이 삭제되었습니다')
      navigate('/community')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const createComment = () =>{
    axios({
      
    })
  }


  return (
    <div className="p-20 pt-0"> 
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <h1>조회수 : {board.hit}</h1>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">제목</label>
          <input type="text" id="title" className="input input-bordered w-11/12" value={board.title} />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">문제번호</label>
          <input type="text" id="title" className="input input-bordered w-11/12" value={board.problemId} />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">언어</label>
            <select className="select select-sm select-bordered w-2/12" >
              <option>{board.lang}</option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">카테고리</label>
            <span>{cate}</span>
            <div className='w-9/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="content">내용</label>
          <textarea className="textarea textarea-bordered w-11/12 resize-none" rows="10" 
          value={board.content}>
          </textarea>
        </div>
        <div className='flex justify-between mb-4'>
          <div className="w-1/12"></div>
          <div className="w-11/12 flex justify-between">
            <button className="btn btn-sm rounded-full drop-shadow-xl" 
            style={{backgroundColor:bgcolor,border:'1px solid black'}}
            onClick={colorChange}>코드보기
            </button>
            <button className="btn btn-sm rounded-full drop-shadow-xl" 
            style={{backgroundColor:'#F4F2CA',border:'1px solid black'}}
            onClick={()=>document.getElementById('modal').showModal()}
            >댓글쓰기
            </button>
            {/* 댓글 모달창 */}
            <dialog id="modal" className="modal">
              <div className="modal-box" style={{backgroundColor: "#F5F5EC"}}>
                <div className='flex justify-end mb-4'>
                  <label className="font-bold me-1"htmlFor="content">내용</label>
                  <textarea className="textarea textarea-bordered w-11/12 resize-none" rows="5" >
                  </textarea>
                </div>
                <div className='flex justify-end mb-4'>
                  <label className="font-bold me-1"htmlFor="inputEx">코드</label>
                  <CodeMirror className='w-11/12' height="300px" id="inputEx"/>
                </div>
                <div className="flex">
                  <div className="w-1/12"></div>
                  <div className="flex justify-between w-11/12">
                    <div className="mt-6"><button className="btn btn-sm rounded-full" 
                    style={{border:'1px solid black'}}
                    onClick={createComment}
                    >댓글작성</button></div>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn btn-sm rounded-full" style={{border:'1px solid black'}}>닫기</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        { showCodeMirror && (
          <div className='flex justify-end mb-4'>
            <label className="font-bold me-1"htmlFor="inputEx"></label>
            <CodeMirror className='w-11/12' height="400px" id="inputEx" value={board.code}/>
          </div>
        )}
        <div className='flex justify-end mb-4'>
          <button className="btn btn-sm rounded-full drop-shadow-xl btn-active mr-2"
          style={{backgroundColor:'#E4E4DA',border:'1px solid black'}}>수정</button>
          <button className="btn btn-sm rounded-full drop-shadow-xl btn-active"
          style={{backgroundColor:'#E4E4DA',border:'1px solid black'}}
          onClick={boardDelete}>삭제</button>
        </div>

      </div>
    </div>
  )
}