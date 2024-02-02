import '../css/problemsolve.css'
import axios from 'axios'
import { useSearchParams, Link } from "react-router-dom"
import { useEffect,useState } from 'react'
import CommunityListItem from '../../components/community/CommunityListItem'

export default function Community() {
  const [ communityList,setCommunityList ] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  // "질문 타입", example = "1 : 질문, 2 : 시간복잡도, 3 : 공간복잡도, 4 : 반례 요청, 5 : 반례"
  const [ boardType,setBoardType ] = useState('')
  // 정렬기준 time : 최신순 ,hit 조회수순 
  const [lang,setLang] = useState('')
  const [pgno, setPgno] = useState(1)
  const [word, setWord] = useState('')
  const [pageCount, setPageCount] = useState(1)
  
  useEffect(()=> {
    setPgno(searchParams.get('pgno') || 1)
    const pgno = searchParams.get('pgno') || 1
    const lang = searchParams.get('lang') || ''
    const boardType = searchParams.get('boardType') || ''
    const word = searchParams.get('word') || ''
   
    axios({
      method : 'get',
      url : `http://i10d211.p.ssafy.io:8081/api/board/list?lang=${lang}&boardType=${boardType}&word=${word}&pgno=${pgno}&spp=15`,
    })
    .then((res)=> {
      console.log(res);
      setCommunityList(res.data.data.articles)
      setPageCount(res.data.data.totalPageCount)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[searchParams])
  
  const onClickHandler = () => {
    if(lang==='') {
      searchParams.delete('lang')
      setSearchParams(searchParams)
    } else {
      changeParams('lang',lang)
    }
    if(word==='') {
      searchParams.delete('word')
      setSearchParams(searchParams)
    } else {
      changeParams('word',word)
    }
    if(boardType==='') {
      searchParams.delete('boardType')
      setSearchParams(searchParams)
    } else {
      changeParams('boardType',boardType)
    }
    searchParams.delete('pgno')
    setSearchParams(searchParams)
  }
  
  const changeParams = (key, value) => {
    searchParams.set(key,value)
    setSearchParams(searchParams)
  }
  
  const pageNation = () => {
    const result = [];
    for (let i = 0; i < pageCount; i++) {
      result.push(<button onClick={()=>changeParams('pgno',i+1)} key={i} className={(searchParams.get('pgno')===`${i+1}` || (searchParams.get('pgno')===null&&i==0)) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}>{i+1}</button>);
    }
    return result;
  };

  return(
    <div className="mx-10 flex flex-col">
      <div className="flex justify-between align-middle">
        <div className="flex items-end">
          <button onClick={()=>{changeParams('orderBy','date')}} className={searchParams.get('orderBy')===null||searchParams.get('orderBy')==='date' ? 'orderBy' : 'orderBy unchoice'} value='date'>최신순</button>
          <button onClick={()=>{changeParams('orderBy','hit')}} className={searchParams.get('orderBy')==='hit' ? 'orderBy' : 'orderBy unchoice'} value='hit'>조회수순</button>
        </div>
        <div className="flex mb-4 gap-2">
          <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered join-item" >
            <option value="">언어</option>
            <option>java</option>
            <option>python</option>
            <option>cpp</option>
          </select>
          <select value={boardType} onChange={(e)=>{setBoardType(e.target.value)}} className="select select-sm select-bordered join-item" >
            <option value={''}>게시판유형</option>
            <option value={1}>시간복잡도</option>
            <option value={2}>공간복잡도</option>
            <option value={3}>공간복잡도</option>
            <option value={4}>반례요청</option>
            <option value={5}>반례</option>
          </select>
          <div className='flex'>
            <input onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="검색어를 입력하세요." className="input input-bordered w-full max-w-xs input-sm join-item" />
            <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm join-item">검색</button>
          </div>
        </div>

      </div>
      <div>
        {/* 문제 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="problemTable w-full">
            <thead>
              <tr>
                <th className="p-1.5">게시글번호</th>
                <th className="p-1.5">문제번호</th>
                <th className="p-1.5 w-2/5">제목</th>
                <th className="p-1.5">언어</th>
                <th className="p-1.5">작성자</th>
                <th className="p-1.5">조회수</th>
                <th className="p-1.5">제출일</th>
              </tr>
            </thead>
            <tbody className="font-normal">
             {communityList.map((community,index)=>{
              return(
             <CommunityListItem 
              key={community.articleNo}
              communityItem={community}
              index={index}
             />
             )})}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between my-2">
        <div className="w-40"></div>
        <div className="join">
          <button onClick={()=>{changeParams('pgno','1')}} className="join-item btn btn-sm">{'<<'}</button>
          {pageNation()}
          <button onClick={()=>{changeParams('pgno', pageCount)}} className="join-item btn btn-sm">{'>>'}</button>
        </div>
        <div className="w-40 flex justify-end"><Link to="/community/create" className="btn btn-neutral btn-sm rounded-full">게시글 작성</Link></div>
      </div>
    </div>
  )
}