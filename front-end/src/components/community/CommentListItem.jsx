import CodeMirror from '@uiw/react-codemirror';
import { useSelector } from 'react-redux'
import axios from 'axios';
import '../../pages/css/problemdetail.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export default function CommentListItem(props) {
  // 코드에 아무것도 없는 null은 객체라서 오류나니깐 ..
  const [code,setCode] = useState(props.commentItem.code || '')
  const userId = useSelector(state => state.auth.userId)
  const commentId = props.commentItem.writerId // 댓글작성자와 로그인한유저 검사하려고
  const commentNo = props.commentItem.commentId // 댓글삭제하기위해 댓글commentId가져옴
  const [comment,setComment] = useState(props.commentItem.comment)
  const articleNo = props.commentItem.articleNo
  const navigate = useNavigate()

  const commentDelete = () =>{
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/comment/delete?commentId=${commentNo}`,
      method : 'delete'
    })
    .then((res)=>{
      console.log(res)
      props.onDelete(commentNo)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);
  
  const updateComment = () =>{
    axios({
      url : 'http://i10d211.p.ssafy.io:8081/api/comment/update',
      method : 'put',
      data : {
        commentId : commentNo,
        comment : comment,
        code : code,
      }
    })
    .then((res)=>{
      console.log(res)
      navigate(`/community/${articleNo}/detail`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return(
    <div>
    <div className="p-7 rounded-3xl drop-shadow" style={{backgroundColor: "#F5F5EC"}}>
      <div className='flex justify-start'>
        <div className='w-1/12'></div>
        <div className="mb-2">작성자 : {props.commentItem.writerNickname}</div>
      </div>
      <div className='flex mb-2'>
        <div className='w-1/12'></div>
        <textarea className="textarea textarea-bordered resize-none w-full" rows="4"
        value={userId === commentId ? comment : props.commentItem.comment }
        onChange={(e)=>setComment(e.target.value)}>
        </textarea>
        <div className='w-1/12'></div>
      </div>
      {code && (
      <div className='flex mb-10'>
        <div className='w-1/12'></div>
        <CodeMirror className='w-full' height="200px" id="in0putEx"
        value={userId === commentId? code : props.commentItem.code}
        onChange = {onChangeCode}
        editable={userId === commentId}
        />
        <div className='w-1/12'></div>
      </div>
      )}
      { userId === commentId && (
        <div className='flex justify-end mb-4'>
          <div className="btn btn-sm rounded-full  drop-shadow-xl btn-active mr-2"
          style={{backgroundColor:'#E4E4DA',border:'1px solid black'}}
          onClick={updateComment}
          >수정</div>
          <button className="btn btn-sm rounded-full  btn-active"
          style={{backgroundColor:'#E4E4DA',border:'1px solid black'}}
          onClick={commentDelete}
          >삭제</button>
        </div>
      )}
    </div>
    <br />
    </div>
    
  )
}