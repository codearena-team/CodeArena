import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect,useCallback } from "react"
import axios from "axios"
import "../../css/problemdetail.css"
import CodeMirror from '@uiw/react-codemirror';
import { useSelector } from 'react-redux'
import CommentListItem from '../../../components/community/CommentListItem'


export default function CommunityDetail(){
  const [bgcolor,setBgcolor] = useState('#F4F2CA');
  const [showCodeMirror, setShowCodeMirror] = useState(false)
  const params = useParams();
  const boardId = params.communityId
  const userId = useSelector(state => state.auth.userId)
  const [articleId,setArticleId] = useState('')
  const [board,setBoard] = useState({})
  const navigate = useNavigate()
  const [cate,setCate] = useState('')
  const catedic = {'1':'질문','2':'시간복잡도','3':'공간복잡도','4':'반례 요청','5':'반례',}
  const [comment,setComment] = useState('')
  const [commentcode,setCommentCode] = useState('')
  const [commentlist,setCommentList] = useState([])
  const [articleNickname,setArticleNickname] = useState('')


  const colorChange = () =>{
    if (bgcolor === '#F4F2CA'){
      setBgcolor('#ffffff')
      setShowCodeMirror(true)
    }else {
      setBgcolor('#F4F2CA')
      setShowCodeMirror(false)
    }
  }

  // 게시글상세조회
  useEffect(()=>{
    axios({
      url : `https://i10d211.p.ssafy.io/api/board/detail/${boardId}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res.data.data)
      setBoard(res.data.data)
      setCate(catedic[res.data.data.type])
      setArticleId(res.data.data.userId)
      setArticleNickname(res.data.data.nickName)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  // 게시글삭제
  const boardDelete = ()=>{
    axios({
      url : `https://i10d211.p.ssafy.io/api/board/delete/${boardId}`,
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

  //댓글작성
  const createComment = () =>{
    axios({
      url : 'https://i10d211.p.ssafy.io/api/comment/write',
      method : 'post',
      data : {
        articleNo : boardId,
        userId : userId,
        comment : comment,
        code : commentcode
      }
    })
    .then((res)=>{
      console.log(res)
      // navigate(`/community/${boardId}/detail`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  //댓글 목록조회
  useEffect(()=>{
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/comment/list?articleNo=${boardId}`,
    })
    .then((res)=> {
      console.log(res)
      // console.log(res.data.data);
      setCommentList(res.data.data)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])
  
  const onDelete = (id) => {
    const tmpArr = commentlist.filter((el)=>el.commentId !== id)
    setCommentList(tmpArr) // tmpArr에는 각요소들의 commentId와 id가 다른 요소들로만 이루어진 배열이됨
  }

  const goEdit = () =>{
    navigate((`/community/${boardId}/edit`))
  }

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCommentCode(code);
  }, []);
  
  return (
    <div className="ml-64 mr-64 mt-10"> 
      <div className="p-4 rounded-3xl drop-shadow mb-7" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <h1 className="mr-3">조회수 : {board.hit}</h1>
          <h1 onClick={()=>{navigate(`/profile/${articleNickname}`)}} 
          style={{ textDecoration: 'underline'}}>작성자 : {articleNickname}
          </h1>
          <div className="w-1/12"></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="me-1 py-3" htmlFor="title">제목</label>
          <input type="text" id="title" className="input input-bordered noc w-10/12" value={board.title} />
          <div className="w-1/12"></div>
        </div>
        <div className='flex mb-4'>
          <div className="flex">
            <div className="ml-1">
              <label className="me-1 py-3 ml-5" htmlFor="title">문제번호</label>
              <input type="text" id="title" className="input input-bordered w-5/12 noc mr-6" value={board.problemId} />
            </div>
            
              <label className="me-1 py-3" htmlFor="rating">언어</label>
              <input id="rating" className="input input-bordered w-2/12 noc mr-6" type="text" value={board.lang}/>
            <div className="ml-10">
              <label className="me-1 py-3 ml-5" htmlFor="rating">카테고리</label>
              <input id="rating" className="input input-bordered noc" type="text" value={cate}/>     
            </div>
          </div>
          <div className="w-1/12"></div>
        </div>
          <div className='flex justify-end mb-4'>
          <label className="me-1"htmlFor="content">내용</label>
          <textarea className="textarea textarea-bordered w-10/12 resize-none noc" rows="10" 
          value={board.content}>
          </textarea>
          <div className="w-1/12"></div>
        </div>
        <div className='flex justify-between mb-4'>
          <div className="w-1/12"></div>
          <div className="w-10/12 flex justify-between">
            <button className="btn btn-sm btn-active drop-shadow text-md" 
            style={{backgroundColor:bgcolor}}
            onClick={colorChange}>코드보기
            </button>
            <button className="btn btn-sm btn-active drop-shadow text-md" 
            style={{backgroundColor:'#F4F2CA'}}
            onClick={()=>document.getElementById('modal').showModal()}
            >댓글쓰기
            </button>
            
            {/* 댓글 모달창 */}
            <dialog id="modal" className="modal">
              <div className="modal-box" style={{backgroundColor: "#F5F5EC"}}>
                <div className='flex justify-end mb-4'>
                  <textarea className="textarea textarea-bordered w-full resize-none" rows="5"
                  onChange={(e)=>{setComment(e.target.value)}} >
                  </textarea>
                </div>
                <div className='flex justify-end mb-4'>
                  <CodeMirror className='w-full' height="200px" id="inputEx"
                  onChange={onChangeCode}/>
                </div>
                <div className="flex justify-between">   
                  <div className="modal-action ">
                    <form method="dialog" className="mt-0">
                      <div className=""><button className="btn btn-sm btn-active drop-shadow text-md" 
                      style={{backgroundColor:'#F4F2CA'}}
                      onClick={createComment}
                      >댓글작성</button></div>
                    </form>    
                    <form method="dialog">
                      <button className="btn btn-sm btn-active drop-shadow text-md" 
                      style={{backgroundColor:'#E4E4DA'}}>닫기</button>
                    </form>
                  </div>                  
                </div>
              </div>
            </dialog>
          </div>
          <div className="w-1/12"></div>
        </div>
        { showCodeMirror && (
          <div className='flex mb-4'>
            <div className="w-1/12"></div>
            <CodeMirror className='w-11/12 ' height="400px" id="inputEx" value={board.code} readOnly/>
            <div className="w-1/12"></div>
          </div>
        )}
        { articleId === userId &&(
        <div className='flex justify-end mb-4'>
          <button className="btn btn-sm btn-active drop-shadow text-md mr-2"
          style={{backgroundColor:'#E4E4DA'}}
          onClick={goEdit}>수정</button>
          <button className="btn btn-sm btn-active drop-shadow text-md"
          style={{backgroundColor:'#E4E4DA'}}
          onClick={boardDelete}>삭제</button>
          <div className="w-1/12"></div>
        </div>
        )}
      </div>
      {/* 댓글공간 */}
      {commentlist.length > 0 && (
        commentlist.map((comment,index)=>{
          return( 
            <CommentListItem 
            key={comment}
            commentItem={comment}
            index={index}
            onDelete={onDelete}/>
          )})
      )}
      {commentlist.length === 0 && (
        <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
          <h1>댓글이 없습니다</h1>
        </div>
      )}
    </div>
  )
}