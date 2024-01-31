import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import ProblemListItem from "../../components/problem/ProblemListItem"
import "../css/problemsolve.css"
import axios from "axios"

export default function Ps() {
  // 정렬순서   date : 날짜순, submit : 제출자순, accept: 정답자수, percent : 정답률순
  const [orderBy, setOrderBy] = useState('date') 
  // 검색 카테고리   problemId : 문제번호, problemTitle : 문제제목 , userNickname : 작성자 
  const [cate, setCate] = useState('문제 제목')  
  // 검색어 
  const [word, setWord] = useState('')
  const params = useParams()
  const pgno = params.pgno
  const [problemList, setProblemList] = useState([])

  const test = () =>{
    console.log(word)
  }

  useEffect(()=> {
    axios({
      method : 'get',
      url : `http://i10d211.p.ssafy.io:8081/api/problem?orderBy=date&cate=&word=&pgno=${pgno}&spp=15`,
    })
    .then((res)=> {
      console.log(res);
      setProblemList(res.data.data.problemWithSearch)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[pgno])
  
  const onClickHandler = () => {
    axios({
      method : 'get',
      url : `http://192.168.100.208:8080/problem?orderBy=${orderBy}&cate=${cate}&word=${word}&pgno=1&spp=15`,
    })
    .then((res) => {
      console.log(res)
      // setProblemList(res.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }
  

  return(
    <div className="mx-10 flex flex-col">
      <div className="flex justify-between align-middle">
        <div className="flex items-end">
          <button onClick={(e)=>{setOrderBy(e.target.value)}} className={orderBy==='date' ? 'orderBy' : 'orderBy unchoice'} value='date'>최신순</button>
          <button onClick={(e)=>{setOrderBy(e.target.value)}} className={orderBy==='submit' ? 'orderBy' : 'orderBy unchoice'} value='submit'>제출자순</button>
          <button onClick={(e)=>{setOrderBy(e.target.value)}} className={orderBy==='accept' ? 'orderBy' : 'orderBy unchoice'} value='accept'>정답자순</button>
          <button onClick={(e)=>{setOrderBy(e.target.value)}} className={orderBy==='percent' ? 'orderBy' : 'orderBy unchoice'} value='percent'>정답률순</button>
        </div>
        <div className="flex mb-4">
          <select value={cate} onChange={(e)=>{setCate(e.target.value)}} className="select select-sm select-bordered w-28" >
            <option>문제 제목</option>
            <option>문제 번호</option>
            <option>작성자</option>
          </select>
          <input onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="검색어를 입력하세요." className="input input-bordered w-full max-w-xs input-sm" />
          <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm">검색</button>
        </div>
      </div>
      <div>
        {/* 문제 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="problemTable w-full">
            <thead>
              <tr>
                <th className="p-1.5">번호</th>
                <th className="p-1.5 w-1/2">제목</th>
                <th className="p-1.5">출제자</th>
                <th className="p-1.5">정답자수</th>
                <th className="p-1.5">제출자수</th>
                <th className="p-1.5">정답률</th>
              </tr>
            </thead>
            <tbody className="font-normal">
             {problemList.map((problemItem,index)=>{
              return(
             <ProblemListItem 
              key={problemItem.problemId}
              problemItem={problemItem}
              index={index}
             />
             )})}
            </tbody>
          </table>
        </div>
      </div>
      <div class="join flex justify-between my-2">
        <div className="w-40"></div>
        <div>
          <button class="join-item btn btn-sm">1</button>
          <button class="join-item btn btn-sm btn-active">2</button>
          <button class="join-item btn btn-sm">3</button>
          <button class="join-item btn btn-sm">4</button>
        </div>
        <div className="w-40"><Link to="/problem/create" className="btn btn-neutral btn-sm">문제 생성</Link></div>
      </div>
    </div>
  )
}