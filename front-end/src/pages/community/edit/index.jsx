import CodeMirror from '@uiw/react-codemirror';
import { useParams } from 'react-router-dom';
// import { useCallback } from 'react';
import { useEffect,useState,useCallback} from 'react';
import axios from 'axios';
import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CommunityEdit(){
  // const onChangeTestCode = useCallback((code, viewUpdate) => {
  //   ;
  // }, []);
  const userId = useSelector(state => state.auth.userId)
  const params = useParams();
  const boardId = params.communityId
  const [title,setTitle] = useState('')
  const [content, setContent] = useState('');
  const [problemId,setProblemId] = useState('');
  const [lang,setLang] = useState('');
  // 1 : 질문, 2: 시간복잡도 ,3:공간복잡도 ,4:반례요청 ,5:반례
  const [type,setType] = useState('');
  const [spoiler,setSpoiler] = useState('')
  // 스포방지버튼:  0은 전체공개 1은 스포방지
  const [code, setCode] = useState('');
  const [cate,setCate] = useState('')
  const catedic = {'1':'질문','2':'시간복잡도','3':'공간복잡도','4':'반례 요청','5':'반례',}
  const navigate = useNavigate()

  const onChangeTestCode = useCallback((code, viewUpdate) => {
    setCode(code);
  }, []);


  useEffect(()=>{
    axios({
      url : `http://i10d211.p.ssafy.io:8081/api/board/detail/${boardId}`,
      method : 'get'
    })
    .then((res)=>{
      console.log(res.data.data)
      setTitle(res.data.data.title)
      setContent(res.data.data.content)
      setProblemId(res.data.data.problemId)
      setLang(res.data.data.lang)
      setCate(catedic[res.data.data.type])
      setSpoiler(res.data.data.spoiler)
      setCode(res.data.data.code)

    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const onClickCheckbox = () => {
    if (spoiler === 0) {
      setSpoiler(1)
    } else {
      setSpoiler(0)
    }
  }
 
  //게시글 수정
  const updateArticle = ()=>{
    axios({
      url : 'http://i10d211.p.ssafy.io:8081/api/board/update',
      method : 'patch',
      data : {
        articleNo : boardId,
        userId : userId,
        title : title,
        content : content,
        problemId : problemId,
        lang : lang,
        spoiler : spoiler,
        code : code
      }
    })
    .then((res)=>{
      console.log(res)
      navigate(`/community/${boardId}/detail`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return(
    <div className="p-20 pt-0">
      <div className="p-10 rounded-3xl drop-shadow-2xl" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3 light" htmlFor="title">제목</label>
          <input type="text" id="title" className="input input-bordered w-11/12" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1 py-3" htmlFor="title">문제번호</label>
          <input type="text" id="title" className="input input-bordered w-11/12" value={problemId} onChange={(e)=>{setProblemId(e.target.value)}}/>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">언어</label>
            <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered w-2/12" >
              <option>java</option>
              <option>python</option>
              <option>cpp</option>
            </select>
            <div className='w-9/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1" htmlFor="rating">카테고리</label>
          <input id="rating" className="input input-bordered w-2/12" type="text" value={cate}/>     
          <div className='w-9/12'></div>
        </div>
        <div className="flex mb-4">
          <label className="cursor-pointer label font-bold me-1">스포방지여부</label>
            <div className='flex items-center'><input type="checkbox" 
            className="checkbox checkbox-warning" style={{borderColor:'black'}}
            checked={spoiler === 1} onClick={onClickCheckbox}/></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="content">내용</label>
          <textarea className="textarea textarea-bordered w-11/12 resize-none" id="content" rows="10" value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
        </div>    
        <div className='flex justify-end mb-4'>
          <label className="font-bold me-1"htmlFor="inputEx">코드</label>
          <CodeMirror className='w-11/12' height="400px" id="inputEx"
          value={code} onChange={onChangeTestCode}/>
        </div>
 
        <div className='flex justify-end mb-4'>
          <div className="btn btn-sm rounded-full drop-shadow-xl" 
            style={{backgroundColor:'#F4F2CA',border:'1px solid black'}}
            onClick={updateArticle}
            >수정하기
          </div>
        </div>
      </div>
    </div>
  )
}