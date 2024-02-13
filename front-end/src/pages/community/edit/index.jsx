import { Editor } from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
// import { useCallback } from 'react';
import { useEffect,useState,useCallback} from 'react';
import axios from 'axios';
import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function CommunityEdit(){
  // const onChangeTestCode = useCallback((code, viewUpdate) => {
  //   ;
  // }, []);
  const accessToken = useSelector(state => state.access.accessToken)
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
      url : `https://i10d211.p.ssafy.io/api/board/detail/${boardId}`,
      method : 'get',
      headers : {
        Authorization : accessToken 
      }
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
      url : 'https://i10d211.p.ssafy.io/api/board/update',
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
      swal("게시글수정완료","","success")
      navigate(`/community/${boardId}/detail`)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return(
    <div className="ml-64 mr-64 mt-10">
      <div className="p-4 rounded-3xl drop-shadow mb-7" style={{backgroundColor: "#F5F5EC"}}>
        <div className='flex justify-end mb-4'>
          <label className="me-1 py-3" htmlFor="title">제목</label>
          <input type="text" id="title" className="input input-bordered w-10/12" value={title} 
          onChange={(e)=>{setTitle(e.target.value)}} />
          <div className='w-1/12'></div>
        </div>
        <div className='flex justify-end mb-4'>
          <label className="me-1 py-3" htmlFor="title">문제번호</label>
          <input type="text" id="title" className="input input-bordered w-10/12" value={problemId}/>
          <div className='w-1/12'></div>  
        </div>

        <div className='flex justify-start mb-4'>
          <div className='ml-6'>
            <label className="me-1 py-3" htmlFor="rating">카테고리</label>
            <input id="rating" value={cate} className="input input-bordered w-6/12" type="text" />     
          </div>
        </div>

        <div className='flex justify-start mb-4'>
          <div className='flex justify-center items-center ml-3'>
            <label className="me-1 py-3 ml-10" htmlFor="rating">언어</label>
              <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered mr-6" >
                <option>java</option>
                <option>python</option>
                <option>cpp</option>
              </select>
          </div>
          <div className="flex mr-5">
            <label className="cursor-pointer label me-1">스포방지여부</label>
              <div className='flex items-center'><input type="checkbox" 
              className="checkbox checkbox-warning" style={{borderColor:'black'}}
              checked={spoiler === 1} onClick={onClickCheckbox}/></div>
          </div>
        </div>
 
        <div className='flex justify-end mb-4'>
          <label className=" me-1"htmlFor="content">내용</label>
          <textarea className="textarea textarea-bordered w-10/12 resize-none" 
          id="content" rows="10" value={content} 
          onChange={(e)=>{setContent(e.target.value)}}></textarea>
          <div className='w-1/12'></div>
        </div>    
        <div className='grid grid-cols-12 mb-4'>
          <label className="me-1 col-span-1 text-end"htmlFor="inputEx">코드</label>
          <div className=' col-span-10'>
            <Editor height="400px" id="inputEx" language={lang}
            value={code} onChange={onChangeTestCode}
            options={{'scrollBeyondLastLine':false, 'minimap':{enabled:false}}}
            />
          </div>
        </div>
 
        <div className='flex justify-end mb-4'>
          <div className="btn btn-sm btn-active drop-shadow text-md" 
          style={{backgroundColor:'#F4F2CA'}}
          onClick={updateArticle}
          >수정하기
          </div>
          <div className='w-1/12'></div>  
        </div>
      </div>
    </div>
  )
}