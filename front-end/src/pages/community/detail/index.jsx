import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from "react"
import axios from "axios"
import "../../css/problemdetail.css"
import Editor from "@monaco-editor/react"
import { useMonaco } from "@monaco-editor/react"
import { useSelector } from 'react-redux'
import CommentListItem from '../../../components/community/CommentListItem'
import swal from "sweetalert"
import Pencil from '../../../images/common/pencil.png'



export default function CommunityDetail() {
  const monaco = useMonaco()
  const accessToken = useSelector(state => state.access.accessToken)
  const [bgcolor, setBgcolor] = useState('#F4F2CA');
  const [showCodeMirror, setShowCodeMirror] = useState(false)
  const [bgcolor2, setBgcolor2] = useState('#F4F2CA');
  const [showCodeMirrorComment, setShowCodeMirrorComment] = useState(false)
  const params = useParams();
  const boardId = params.communityId
  const userId = useSelector(state => state.auth.userId)
  const [articleId, setArticleId] = useState('')
  const [board, setBoard] = useState({})
  const navigate = useNavigate()
  const [cate, setCate] = useState('')
  const catedic = { '1': '질문', '2': '시간복잡도', '3': '공간복잡도', '4': '반례 요청', '5': '반례', }
  const [comment, setComment] = useState('')
  const [commentcode, setCommentCode] = useState('')
  const [commentlist, setCommentList] = useState([])
  const [articleNickname, setArticleNickname] = useState('')


  const colorChange = () => {
    if (bgcolor === '#F4F2CA') {
      setBgcolor('#ffffff')
      setShowCodeMirror(true)
    } else {
      setBgcolor('#F4F2CA')
      setShowCodeMirror(false)
    }
  }

  const colorChange2 = () => {
    if (bgcolor2 === '#F4F2CA') {
      setBgcolor2('#ffffff')
      setShowCodeMirrorComment(true)
    } else {
      setBgcolor2('#F4F2CA')
      setShowCodeMirrorComment(false)
    }
  }

  // 게시글상세조회
  useEffect(() => {
    axios({
      url: `https://codearena.shop/api/board/detail/${boardId}`,
      method: 'get',
      headers: {
        Authorization: accessToken
      }
    })
      .then((res) => {
        console.log(res.data.data)
        console.log(res.data.data.spoiler)
        console.log(res.data.data.isSolved)

        if (res.data.data.spoiler === 1) {
          setShowCodeMirror(false)
          if (res.data.data.isSolved === '1') {
            setShowCodeMirror(true)
          } else {
            setShowCodeMirror(false)
          }
        }

        setBoard(res.data.data)
        setCate(catedic[res.data.data.type])
        setArticleId(res.data.data.userId)
        setArticleNickname(res.data.data.nickName)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])

  // 게시글삭제
  const boardDelete = () => {
    axios({
      url: `https://codearena.shop/api/board/delete/${boardId}`,
      method: 'delete'
    })
      .then((res) => {
        console.log(res)
        swal("게시글이 삭제완료", "", "success")
        navigate('/community')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //댓글작성 (댓글작성 후 새로고침되야함)
  const createComment = () => {
    axios({
      url: 'https://codearena.shop/api/comment/write',
      method: 'post',
      data: {
        articleNo: boardId,
        userId: userId,
        comment: comment,
        code: commentcode
      }
    })
      .then((res) => {
        console.log(res)
        window.location.reload();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //댓글 목록조회
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://codearena.shop/api/comment/list?articleNo=${boardId}`,
    })
      .then((res) => {
        console.log(res)
        // console.log(res.data.data);
        setCommentList(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const onDelete = (id) => {
    const tmpArr = commentlist.filter((el) => el.commentId !== id)
    setCommentList(tmpArr) // tmpArr에는 각요소들의 commentId와 id가 다른 요소들로만 이루어진 배열이됨
  }

  const goEdit = () => {
    navigate((`/community/${boardId}/edit`));
    window.scrollTo(0, 0);
  }

  const onChangeCode = useCallback((code, viewUpdate) => {
    setCommentCode(code);
  }, []);

  const goUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    // Monaco Editor의 테마를 설정합니다.
    if (monaco) {
      monaco.editor.defineTheme('myCustomTheme', {
        base: 'vs-dark', // 원하는 테마로 설정합니다. 예시로 'vs-dark'를 사용했습니다.
        inherit: true,
        rules: [{ background: bgcolor }],
      });
    }
  }, [monaco, bgcolor]); // monaco와 bgcolor가 변경될 때마다 테마를 다시 설정합니다.



  return (
    <div className="ml-64 mr-64 mt-10 relative">
      <button
        style={{ position: 'fixed', right: '100px', bottom: '150px', border: '1px solid black' }}
        onClick={() => document.getElementById('modal').showModal()} className="btn btn-md"
      >
        <img src={Pencil} style={{ width: 20 }} alt="" />
        댓글쓰기
      </button>
      <p
        style={{ position: 'fixed', right: '120px', bottom: '110px', border: '1px solid black' }}
        className="btn btn-sm"
        onClick={goUp}
      >
        맨위로
      </p>
      <div className="p-4 rounded-3xl drop-shadow mb-7" style={{ backgroundColor: "#F5F5EC" }}>
        <div className='flex justify-end mb-3 pr-2'>
          <h1 className="mr-3 font-bold">
            조회수 : {board.hit}
          </h1>
          <h1 className="font-bold">
            작성자 : &nbsp;
          </h1>
          <a
            onClick={() => { navigate(`/profile/${articleNickname}`) }}
            className="font-bold cursor-pointer">
            {articleNickname}
          </a>
        </div>

        {/* 제목 */}
        <div className="flex pl-2">
          <label className="font-bold" htmlFor="title">제목</label>
        </div>

        {/* 제목 input */}
        <div className='w-full flex pl-2 p-2'>
          <input type="text" id="title" className="input input-bordered noc w-full p-2" value={board.title} />
        </div>

        <div className='mb-3 grid grid-cols-12'>
          <div className="flex items-center pl-2">
            <div>
              <label className="pr-1 pb-2 font-bold" htmlFor="title">문제번호</label>
              <input type="text" id="title" className="input input-bordered noc"
                style={{ width: '100px', height: '28px' }} value={board.problemId} />
            </div>
            <div className="ml-6">
              <label className="pr-1 pb-2 font-bold" htmlFor="rating">언어</label>
              <input id="rating" className="input input-bordered  noc"
                style={{ width: '100px', height: '30px' }} type="text" value={board.lang} />
            </div>
            <div className="ml-6">
              <label className="pr-1 pb-2 font-bold" htmlFor="rating">카테고리</label>
              <input id="rating" className="input input-bordered noc"
                style={{ width: '100px', height: '30px' }} type="text" value={cate} />
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="flex w-full pl-2">
          <label className="me-1 font-bold" htmlFor="content">내용</label>
        </div>

        <div className='w-full flex p-2'>
          <textarea className="textarea textarea-bordered w-full resize-none noc" rows="10"
            value={board.content}>
          </textarea>
        </div>
        <div className='flex justify-end py-2'>
          <div className="w-full flex justify-end pr-2">
            <button className="btn btn-sm btn-active drop-shadow text-md"
              style={{ backgroundColor: bgcolor }}
              onClick={colorChange}>코드보기
            </button>
          </div>


          {/* 댓글 모달창 */}
          <dialog id="modal" className="modal">
            <div className="modal-box" style={{ backgroundColor: "#F5F5EC" }}>
              <div className='flex justify-end mb-4'>
                <textarea className="textarea textarea-bordered w-full resize-none" rows="5"
                  onChange={(e) => { setComment(e.target.value) }} >
                </textarea>
              </div>
              <div className="flex justify-end mb-4">
                <button
                  className="btn btn-sm btn-active drop-shadow text-md mr-2"
                  style={{ backgroundColor: bgcolor2 }}
                  onClick={colorChange2}
                >
                  코드작성하기
                </button>
              </div>
              {showCodeMirrorComment && (
                <div className='flex justify-end mb-4'>
                  <div className='w-full'>
                    <Editor
                      height="200px"
                      id="inputEx"
                      onChange={onChangeCode} language=""
                      options={{ 'scrollBeyondLastLine': false, 'minimap': { enabled: false } }}
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <div className="modal-action ">
                  <form method="dialog" className="mt-0">
                    <div className=""><button className="btn btn-sm btn-active drop-shadow text-md"
                      style={{ backgroundColor: '#F4F2CA' }}
                      onClick={createComment}
                    >댓글작성</button></div>
                  </form>
                  <form method="dialog">
                    <button className="btn btn-sm btn-active drop-shadow text-md"
                      style={{ backgroundColor: '#E4E4DA' }}>닫기</button>
                  </form>
                </div>
              </div>
            </div>
          </dialog>
        </div>
        {showCodeMirror && (
          <div className='mb-4'>
            <div className="p-2">
              <Editor
                height="400px"
                id="inputEx"
                value={board.code}
                options={{
                  'scrollBeyondLastLine': false,
                  'readOnly': true,
                  'minimap': { enabled: false }
                }}
              />
            </div>
          </div>
        )}
        {articleId === userId && (
          <div className='flex justify-end pb-2 pr-2'>
            <button
              className="btn btn-sm btn-active drop-shadow text-md mr-2"
              style={{ backgroundColor: '#E4E4DA' }}
              onClick={goEdit}
            >
               수정
            </button>
            <button
              className="btn btn-sm btn-active drop-shadow text-md"
              style={{ backgroundColor: '#E4E4DA' }}
              onClick={boardDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {/* 댓글 */}

      {commentlist.length > 0 && (
        commentlist.map((comment, index) => {
          return (
            <CommentListItem
              key={comment}
              commentItem={comment}
              index={index}
              onDelete={onDelete} />
          )
        })
      )}
      {commentlist.length === 0 && (
        <div className="flex p-10 rounded-3xl drop-shadow-2xl" style={{ backgroundColor: "#F5F5EC" }}>
          <div className="w-1/12"></div>
          <h1 className="font-bold">댓글이 없습니다</h1>
        </div>
      )}
    </div>
  )



}

