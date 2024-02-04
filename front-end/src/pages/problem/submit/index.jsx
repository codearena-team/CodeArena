import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import SubmitItem from "../../../components/problem/submitItem"
import javaImg from "../../../images/problem/java.png"
import pythonImg from "../../../images/problem/python.png"
import cppImg from "../../../images/problem/cpp.png"
import "../../css/problemsolve.css"
import axios from "axios"

export default function Submit() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 검색 카테고리   problemId : 문제번호, problemTitle : 문제제목 , userNickname : 작성자 
  const [lang, setLang] = useState('전체')  
  // 검색어 
  const [nickname, setNickname] = useState('')
  const [problemId, setproblemId] =useState('')
  const [pageCount, setPageCount] = useState(1)
  const [submitList, setSubmitList] = useState([])
  const [isvisible, setIsvisible] = useState(false)
  const [statistics, setStatistics] = useState([])
  
  useEffect(()=> {
    const problemId = searchParams.get('problemId') || ''
    const pgno = searchParams.get('pgno') || 1
    const orderBy = searchParams.get('orderBy') || 'submitDate'
    const lang = searchParams.get('lang') || ''
    const nickname = searchParams.get('nickname') || ''
    if (problemId) {
      axios({
        method : 'get',
        url : `http://i10d211.p.ssafy.io:8081/api/problem/${problemId}/submit/statistics?userId=6`,
      })
      .then((res)=> {
        console.log(res);
        setIsvisible(true)
        setStatistics(res.data.data)
      })
      .catch((err)=> {
        console.log(err);
        setIsvisible(false)
      })
    }
    axios({
      method : 'get',
      url : `http://i10d211.p.ssafy.io:8081/api/problem/submit?problemId=${problemId}&userNickname=${nickname}&lang=${lang}&spp=15&pgno=${pgno}&orderBy=${orderBy}`,
    })
    .then((res)=> {
      console.log(res);
      setSubmitList(res.data.data.submitList)
      setPageCount(res.data.data.pageCount)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[searchParams])
  
  const onClickHandler = () => {
    if(problemId==='') {
      searchParams.delete('problemId')
      setSearchParams(searchParams)
    } else {
      changeParams('problemId',problemId)
    }
    if(nickname==='') {
      searchParams.delete('nickname')
      setSearchParams(searchParams)
    } else {
      changeParams('nickname',nickname)
    }
    if(lang==='전체') {
      searchParams.delete('lang')
      setSearchParams(searchParams)
    } else {
      changeParams('lang',lang)
    }
  }
  
  const changeParams = (key, value) => {
    searchParams.set(key,value)
    setSearchParams(searchParams)
  }

  const pageNation = () => {
    const result = [];
    for (let i = 0; i < pageCount; i++) {
      result.push(<button onClick={()=>changeParams('pgno',i+1)} key={i} className={(searchParams.get('pgno')===`${i+1}`) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}>{i+1}</button>);
    }
    return result;
  };

  return(
    <div className="mx-10 flex flex-col">
     
      <div className="flex justify-between align-middle">
        {isvisible && 
        <div className="lg:flex gap-2">
          <div>
            <div className="stats shadow ">
              <div className="stat p-3">
                <div className="stat-figure text-secondary ">
                  <img src={javaImg} alt="java"className="w-12" />
                </div>
                <div className="stat-title font-bold text-sm">java</div>
                <div className="stat-value text-base mt-1">{statistics.avgByLang.java===0 ? '데이터없음' : statistics.avgByLang.java+'ms'}</div>
              </div>
              <div className="stat p-3">
                <div className="stat-figure text-secondary">
                  <img src={pythonImg} alt="python" className="w-12" />
                </div>
                <div className="stat-title font-bold text-sm">python</div>
                <div className="stat-value text-base">{statistics.avgByLang.python===0 ? '데이터없음' : statistics.avgByLang.python+'ms'}</div>
              </div>
              <div className="stat p-3">
                <div className="stat-figure text-secondary">
                  <img src={cppImg} alt="cpp" className="w-12"/>
                </div>
                <div className="stat-title font-bold text-sm">cpp</div>
                <div className="stat-value text-base">{statistics.avgByLang.cpp===0 ? '데이터없음' : statistics.avgByLang.cpp+'ms'}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="stats shadow">
              <div className="stat place-items-center px-4">
                <div className="stat-title font-bold text-sm">DP</div>
                <div className="stat-value text-base">31ms</div>
              </div>
              <div className="stat place-items-center px-4">
                <div className="stat-title font-bold text-sm">수학</div>
                <div className="stat-value text-base">420ms</div>
              </div>
              <div className="stat place-items-center px-4">
                <div className="stat-title font-bold text-sm">이분탐색</div>
                <div className="stat-value text-base">120ms</div>
              </div>
              <div className="stat place-items-center px-4">
                <div className="stat-title font-bold text-sm">완전탐색</div>
                <div className="stat-value text-base">120ms</div>
              </div>
            </div>
          </div>
        </div>
        }
        <div></div>
        <div className="flex join">
          <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered w-28 join-item" >
            <option value={'전체'}>전체</option>
            <option value={'java'}>java</option>
            <option value={'python'}>python</option>
            <option value={'cpp'}>cpp</option>
          </select>
          <input onChange={(e)=>{setproblemId(e.target.value)}} type="number" placeholder="문제번호" className="input input-bordered input-sm join-item w-24" />
          <input onChange={(e)=>{setNickname(e.target.value)}} type="text" placeholder="닉네임" className="input input-bordered input-sm join-item w-32" />
          <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm join-item">검색</button>
        </div>
        
      </div>
      <div className="flex items-end justify-end">
        <button onClick={()=>{changeParams('orderBy','submitDate')}} className={searchParams.get('orderBy')===null||searchParams.get('orderBy')==='submitDate' ? 'orderBy' : 'orderBy unchoice'} value='date'>최신순</button>
        <button onClick={()=>{changeParams('orderBy','timeComplexity')}} className={searchParams.get('orderBy')==='timeComplexity' ? 'orderBy' : 'orderBy unchoice'} value='time'>시간복잡도순</button>
      </div>
      <div>
        {/* 문제 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="problemTable w-full rounded-xl rounded-tr-none">
            <thead>
              <tr>
                <th className="p-1.5">제출번호</th>
                <th className="p-1.5">제출자</th>
                <th className="p-1.5">문제번호</th>
                <th className="p-1.5 w-3/12">결과</th>
                <th className="p-1.5">메모리</th>
                <th className="p-1.5">시간</th>
                <th className="p-1.5">언어</th>
                <th className="p-1.5">코드길이</th>
                <th className="p-1.5">제출날짜</th>
              </tr>
            </thead>
            <tbody className="font-normal">
             {submitList.map((submit,index)=>{
              return(
             <SubmitItem 
              key={submit.submitNo}
              submitItem={submit}
              index={index}
             />
             )})}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between my-2">
        <div></div>
        <div className="join">
          <button onClick={()=>{changeParams('pgno','1')}} className="join-item btn btn-sm">{'<<'}</button>
          {pageNation()}
          <button onClick={()=>{changeParams('pgno', pageCount)}} className="join-item btn btn-sm">{'>>'}</button>
        </div>
        <div></div>
      </div>
    </div>
  )
}