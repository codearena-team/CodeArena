import '../css/problemsolve.css'
import axios from 'axios'
import { useSearchParams, Link } from "react-router-dom"
import { useEffect,useState } from 'react'
import CommunityListItem from '../../components/community/CommunityListItem'
import { useSelector } from 'react-redux'

export default function Community() {
  const [ communityList,setCommunityList ] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  // "질문 타입", example = "1 : 질문, 2 : 시간복잡도, 3 : 공간복잡도, 4 : 반례 요청, 5 : 반례"
  const [key,setKey ] = useState('board_title')
  // 정렬기준 time : 최신순 ,hit 조회수순 
  const [word, setWord] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const isLogin = useSelector(state => state.auth.isLogin);
  
  useEffect(()=> {
    const pgno = searchParams.get('pgno') || 1
    const langType = searchParams.get('lang') || ''
    const key = searchParams.get('key') || ''
    const word = searchParams.get('word') || ''
    const sortType = searchParams.get('sortType') || ''
   
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/board/list?sortType=${sortType}&key=${key}&word=${word}&langType=${langType}&pgno=${pgno}&spp=15`,
    })
    .then((res)=> {
      setCommunityList(res.data.data.articles)
      setPageCount(res.data.data.totalPageCount)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[searchParams])
  
  const onClickHandler = () => {
    if(word==='') {
      searchParams.delete('word')
      setSearchParams(searchParams)
    } else {
      changeParams('word',word)
    }
    if(key==='') {
      searchParams.delete('key')
      setSearchParams(searchParams)
    } else {
      changeParams('key',key)
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
      result.push(<button onClick={()=>changeParams('pgno',i+1)} key={i} className={(searchParams.get('pgno')===`${i+1}` || (searchParams.get('pgno')===null&&i===0)) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}>{i+1}</button>);
    }
    return result;
  };

  return(
    <div className="ml-20 mr-20 flex flex-col">
      { isLogin && (
      <div className='flex justify-end mb-1'>
        <div className="w-40 flex justify-end"><Link to="/community/create" className="btn btn-neutral btn-sm rounded-xl">글쓰기</Link></div>
      </div>
      )}
      <div className="flex justify-between align-middle">
        <div className="flex items-end">
          <button onClick={()=>{changeParams('sortType','date')}} className={searchParams.get('sortType')===null||searchParams.get('sortType')==='date' ? 'orderBy' : 'orderBy unchoice'} value='date'>최신순</button>
          <button onClick={()=>{changeParams('sortType','hit')}} className={searchParams.get('sortType')==='hit' ? 'orderBy' : 'orderBy unchoice'} value='hit'>조회수순</button>
        </div>
        <div className="flex mb-4 gap-2">
          <select value={searchParams.get('lang') || ''} onChange={(e)=>{changeParams('lang',e.target.value)}} className="select select-sm select-bordered join-item" >
            <option value="">전체</option>
            <option value="java">java</option>
            <option value="python">python</option>
            <option value="cpp">cpp</option>
          </select>
          
          <div className='flex join'>
          <select value={key} onChange={(e)=>{setKey(e.target.value)}} className="select select-sm select-bordered join-item" >
            <option value={'board_title'}>문제제목</option>
            <option value={'problem_id'}>문제번호</option>
          </select>
            <input onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="검색어를 입력하세요." className="input input-bordered w-full max-w-xs input-sm join-item" />
            <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm join-item">검색</button>
          </div>
        </div>

      </div>
      <div>
        {/* 문제 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className=" w-full" style={{backgroundColor:'rgb(227, 230, 217)'}}>
            <thead>
              <tr>
                <th className="p-1.5 font-thin">게시글번호</th>
                <th className="p-1.5 font-thin">문제번호</th>
                <th className="p-1.5 w-2/5 font-thin">제목</th>
                <th className="p-1.5 font-thin">언어</th>
                <th className="p-1.5 font-thin">작성자</th>
                <th className="p-1.5 font-thin">조회수</th>
                <th className="p-1.5 font-thin">제출일</th>
              </tr>
            </thead>
            <tbody className="problemTable font-normal">
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
      <div className="flex justify-center my-2">
          <div className="join">
          <button onClick={()=>{changeParams('pgno','1')}} className="join-item btn btn-sm">{'<<'}</button>
          {pageNation()}
          <button onClick={()=>{changeParams('pgno', pageCount)}} className="join-item btn btn-sm">{'>>'}</button>
        </div>
        
      </div>
    </div>
  )
}