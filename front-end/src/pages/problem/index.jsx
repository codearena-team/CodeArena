import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import ProblemListItem from "../../components/problem/ProblemListItem"
import "../css/problemsolve.css"
import axios from "axios"

export default function Ps() {
  const [problemList, setProblemList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  // 검색 카테고리   problemId : 문제번호, problemTitle : 문제제목 , userNickname : 작성자 
  const [cate, setCate] = useState('problemTitle')  
  // 검색어 
  const [word, setWord] = useState('')
  const [cateList, setCateList] = useState(["전체","DP","구현","그리디","매개변수 탐색","문자열","수학","시뮬레이션","완전탐색","이분탐색","자료구조"])
  const [tag, setTag] =useState('전체')
  const [pageCount, setPageCount] = useState(1)

  useEffect(()=> {
    const pgno = searchParams.get('pgno') || 1
    const orderBy = searchParams.get('orderBy') || 'date'
    const cate = searchParams.get('cate') || ''
    const tag = searchParams.get('tag') || ''
    const word = searchParams.get('word') || ''
    if (!word) {
      searchParams.delete('cate')
      searchParams.delete('word')
      setSearchParams(searchParams)
    }
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/problem/category`,
    })
    .then((res)=> {
      const tmp = res.data.data
      tmp.splice(0, 0, {'tagName':'전체'})
      setCateList(tmp)
    })
    .catch((err)=> {
      console.log(err);
    })
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/problem?orderBy=${orderBy}&cate=${cate}&word=${word}&pgno=${pgno}&spp=15&tag=${tag}`,
    })
    .then((res)=> {
      console.log(res);
      setProblemList(res.data.data.problemWithSearch)
      setPageCount(res.data.data.pageCount)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[searchParams])
  
  const onClickHandler = () => {
    if(tag==='전체') {
      searchParams.delete('tag')
      setSearchParams(searchParams)
    } else {
      changeParams('tag',tag)
    }
    if(word==='') {
      searchParams.delete('word')
      setSearchParams(searchParams)
    } else {
      changeParams('word',word)
    }
    if(cate==='') {
      searchParams.delete('cate')
      setSearchParams(searchParams)
    } else {
      changeParams('cate',cate)
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
    <div className="mx-10 flex flex-col">
      <div className="flex justify-between align-middle">
        <div className="flex items-end">
          <button onClick={()=>{changeParams('orderBy','date')}} className={searchParams.get('orderBy')===null||searchParams.get('orderBy')==='date' ? 'orderBy' : 'orderBy unchoice'} value='date'>최신순</button>
          <button onClick={()=>{changeParams('orderBy','submit')}} className={searchParams.get('orderBy')==='submit' ? 'orderBy' : 'orderBy unchoice'} value='submit'>제출자순</button>
          <button onClick={()=>{changeParams('orderBy','accept')}} className={searchParams.get('orderBy')==='accept' ? 'orderBy' : 'orderBy unchoice'} value='accept'>정답자순</button>
          <button onClick={()=>{changeParams('orderBy','percent')}} className={searchParams.get('orderBy')==='percent' ? 'orderBy' : 'orderBy unchoice'} value='percent'>정답률순</button>
        </div>
        <div className="flex">
          <Link to="/problem/create" className="btn btn-neutral me-2 btn-sm rounded-xl">문제 생성</Link>
          <div className="flex mb-4 join">
            <select onChange={(e)=> {setTag(e.target.value)}} className="select select-sm select-bordered join-item">
              {cateList.map((cate)=>{
                return(
                  <option key={cate.tagName}>{cate.tagName}</option>
                )
              })}
            </select>
            <select value={cate} onChange={(e)=>{setCate(e.target.value)}} className="select select-sm select-bordered w-28 join-item" >
              <option value={'problemTitle'}>문제 제목</option>
              <option value={'problemId'}>문제 번호</option>
              <option value={'userNickname'}>작성자</option>
            </select>
            <input onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="검색어를 입력하세요." className="input input-bordered w-full max-w-xs input-sm join-item" />
            <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm join-item">검색</button>
          </div>
        </div>
      </div>
      <div>
        {/* 테이블 헤더 */}
        <div
          className="grid grid-cols-12 bg-gray-200 text-gray-700 py-2 rounded-md relative z-10"
          style={{ backgroundColor: '#E3E6D9' }}
        >
          <div className="text-center">문제번호</div>
          <div className="text-center col-span-6">제목</div>
          <div className="text-center col-span-2">출제자</div>
          <div className="text-center">정답자수</div>
          <div className="text-center">제출자수</div>
          <div className="text-center">정답률</div>
        </div>
        
        {/* 데이터 리스트 */}
        {problemList.map((item, index) => (
          <Link to={`${item.problemId}/detail`}>
            <div key={index} className="grid w-full grid-cols-12 border-b py-4 items-center rounded-xl shadow-sm hover:bg-gray-300 font-sulight">
              <div className="text-center">{item.problemId}</div>
              <div className="text-center col-span-6">{item.problemTitle}</div>
              <div className="text-center col-span-2">{item.userNickname}</div>
              <div className="text-center">{item.acceptCount}</div>
              <div className="text-center">{item.submitCount}</div>
              <div className="text-center">{item.percentage}</div>
            </div>
          </Link>
        ))}

      </div>
      <div className="flex justify-between my-2">
        <div className="w-40"></div>
        <div className="join">
          <button onClick={()=>{changeParams('pgno','1')}} className="join-item btn btn-sm">{'<<'}</button>
          {pageNation()}
          <button onClick={()=>{changeParams('pgno', pageCount)}} className="join-item btn btn-sm">{'>>'}</button>
        </div>
        <div className="w-40 flex justify-end"></div>
      </div>
    </div>
  )
}