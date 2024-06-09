import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import swal from 'sweetalert';

export default function CommentListItem(props) {
  // 코드에 아무것도 없는 null은 객체라서 오류나니깐 ..
  const [code, setCode] = useState(props.commentItem.code || '')
  const userId = useSelector(state => state.auth.userId)
  const commentId = props.commentItem.writerId // 댓글작성자와 로그인한유저 검사하려고
  const commentNo = props.commentItem.commentId // 댓글삭제하기위해 댓글commentId가져옴
  const [comment, setComment] = useState(props.commentItem.comment)
  const articleNo = props.commentItem.articleNo
  const navigate = useNavigate()
  const [bgcolor, setBgcolor] = useState('#F4ECE4');
  const [showCodeMirror, setShowCodeMirror] = useState(false)


  const colorChange = () => {
    if (bgcolor === '#F4ECE4') {
      setBgcolor('#ffffff')
      setShowCodeMirror(true)
    } else {
      setBgcolor('#F4ECE4')
      setShowCodeMirror(false)
    }
  }

  const commentDelete = () => {
    axios({
      url: `https://codearena.shop/api/comment/delete?commentId=${commentNo}`,
      method: 'delete'
    })
      .then((res) => {
        console.log(res)
        props.onDelete(commentNo)
        swal("댓글삭제완료", "", "success")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);

  const updateComment = () => {
    axios({
      url: 'https://codearena.shop/api/comment/update',
      method: 'put',
      data: {
        commentId: commentNo,
        comment: comment,
        code: code,
      }
    })
      .then((res) => {
        console.log(res)
        swal("댓글수정완료", "", "success")
        navigate(`/community/${articleNo}/detail`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className="p-5 rounded-2xl shadow-md" style={{ backgroundColor: "#F4ECE4" }}>
        <div className='w-[90%] flex justify-start p-1'>
          <div className="pb-2">{props.commentItem.writerNickname}</div>
        </div>
        <div className='flex justify-center mb-2 px-auto'>
          <textarea
            className="w-full textarea resize-none w-full focus:outline-none"
            value={userId === commentId ? comment : props.commentItem.comment}
            onChange={(e) => setComment(e.target.value)}>
          </textarea>
        </div>
        {code && (
          <div className='flex justify-end p-1'>
            <div className="flex">
              <button className="btn btn-sm btn-active drop-shadow text-md"
                style={{ backgroundColor: bgcolor }}
                onClick={colorChange}>코드보기
              </button>
            </div>
          </div>
        )}
        {showCodeMirror && (
          <div className='w-full p-2 mb-10'>
            <div>
              <Editor height="200px" id="in0putEx"
                value={userId === commentId ? code : props.commentItem.code}
                onChange={onChangeCode}
                options={{ 'scrollBeyondLastLine': false, 'readOnly': userId !== commentId, 'minimap': { enabled: false } }}
              />
            </div>
          </div>
        )}
        {userId === commentId && (
          <div className='flex justify-end p-1'>
            <div className="btn btn-sm btn-active drop-shadow text-md mr-2"
              style={{ backgroundColor: '#E4E4DA' }}
              onClick={updateComment}
            >
              수정
            </div>
            <button
              className="btn btn-sm btn-active drop-shadow text-md"
              style={{ backgroundColor: '#E4E4DA' }}
              onClick={commentDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <br />
    </div>

  )
}

