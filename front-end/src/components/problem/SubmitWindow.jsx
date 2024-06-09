import { useEffect, useState } from "react"
import { useSearchParams, useParams } from "react-router-dom"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import WindowSubmitItem from "./WindowSubmitItem";
import javaImg from "../../images/problem/java.png"
import pythonImg from "../../images/problem/python.png"
import cppImg from "../../images/problem/cpp.png"
import reload from "../../images/problem/reload.png"
import { useSelector } from "react-redux";
import axios from "axios"



export default function SubmitWindow(props) {
  const params = useParams()
  const accessToken = useSelector(state => state.access.accessToken)
  const userId = useSelector(state => state.auth.userId)
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
  const [graphData, setGraphData] = useState([])
  const [isAnimetion, setIsAnimetion] = useState(false)

  useEffect(()=> {
    const problemId = params.problemId
    const pgno = searchParams.get('pgno') || 1
    const orderBy = searchParams.get('orderBy') || 'submitDate'
    const lang = searchParams.get('lang') || ''
    const nickname = searchParams.get('nickname') || ''
    if (problemId) {
      axios({
        method : 'get',
        url : `https://codearena.shop/api/problem/${problemId}/submit/statistics?userId=${userId}`,
      })
      .then((res)=> {
        console.log(res)
        setIsvisible(true)
        setStatistics(res.data.data)
        setGraphData(res.data.data.ratioOfAlgo.map((obj)=> {
          return {name:obj.tagName,value:parseInt(obj.count)}
        }))
      })
      .catch((err)=> {
        console.log(err);
        setIsvisible(false)
      })
    }
    axios({
      method : 'get',
      url : `https://codearena.shop/api/problem/submit?problemId=${problemId}&userNickname=${nickname}&lang=${lang}&spp=10&pgno=${pgno}&orderBy=${orderBy}`,
      headers : {
        Authorization : accessToken
      }
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
  
  const onClickReload = () => {
    const problemId = params.problemId
    const pgno = searchParams.get('pgno') || 1
    const orderBy = searchParams.get('orderBy') || 'submitDate'
    const lang = searchParams.get('lang') || ''
    const nickname = searchParams.get('nickname') || ''
    axios({
      method : 'get',
      url : `https://codearena.shop/api/problem/submit?problemId=${problemId}&userNickname=${nickname}&lang=${lang}&spp=10&pgno=${pgno}&orderBy=${orderBy}`,
      headers : {
        Authorization : accessToken
      }
    })
    .then((res)=> {
      console.log(res);
      setSubmitList(res.data.data.submitList)
      setPageCount(res.data.data.pageCount)
    })
    .catch((err)=> {
      console.log(err);
    })
    axios({
      method : 'get',
      url : `https://codearena.shop/api/problem/${problemId}/submit/statistics?userId=${userId}`,
    })
    .then((res)=> {
      console.log(res)
      setIsvisible(true)
      setStatistics(res.data.data)
      setGraphData(res.data.data.ratioOfAlgo.map((obj)=> {
        return {name:obj.tagName,value:parseInt(obj.count)}
      }))
    })
    .catch((err)=> {
      console.log(err);
      setIsvisible(false)
    })
    
    setIsAnimetion(true)
    setTimeout(() => {
      setIsAnimetion(false)
    }, 50);
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

  
const colors = ['#778899', '#DB7093', '#87CEFA','#DEB887','#FF7F50',
'BC8F8F','#8FBC8F','#20B2AA','#A9A9A9','#EEE8AA'];
  const formatPercent = (value) => `${(value * 100).toFixed(0)}%`;


  
  return(
    <div className="mx-4 flex flex-col">
        {isvisible && statistics.avgByLang !==null ? (
        <div className="flex align-middle justify-around">
          <div className="flex flex-col justify-center">
            <div className="stats shadow ">
              <div className="stat p-2 ps-2">
                <div className="stat-figure text-secondary ">
                  <img src={javaImg} alt="java"className="w-10" />
                </div>
                <div className="stat-title  text-sm">java</div>
                <div className="stat-value text-sm mt-1">{statistics.avgByLang.java===0 ? '데이터없음' : statistics.avgByLang.java+'ms'}</div>
              </div>
              <div className="stat p-2">
                <div className="stat-figure text-secondary">
                  <img src={pythonImg} alt="python" className="w-10" />
                </div>
                <div className="stat-title  text-sm">python</div>
                <div className="stat-value text-sm">{statistics.avgByLang.python===0 ? '데이터없음' : statistics.avgByLang.python+'ms'}</div>
              </div>
              <div className="stat p-2 pe-2">
                <div className="stat-figure text-secondary">
                  <img src={cppImg} alt="cpp" className="w-10"/>
                </div>
                <div className="stat-title  text-sm">cpp</div>
                <div className="stat-value text-sm">{statistics.avgByLang.cpp===0 ? '데이터없음' : statistics.avgByLang.cpp+'ms'}</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <span className="absolute font-bold left-4">알고리즘 유형 그래프</span>
            <ResponsiveContainer height={150} width={150} style={{}} className='mt-1'> {/* 차트를 반응형으로 감싸는 컨테이너 */}
              {/* PieChart : 원형 차트 모양으로 변환 */}
              <PieChart className="z-10">
                {/* Tooltip : 마우스를 데이터 포인트 위로 올리면 정보 보여주기 */}
                <Tooltip />
                {/* Pie : 실제 원형 차트 데이터 삽입 */}
                <Pie
                  className="z-10"
                  data={graphData} // 데이터 전달
                  innerRadius={35} // 내부 반지름
                  outerRadius={48} // 외부 반지름
                  paddingAngle={5} // 각 섹션 사이 간격
                  dataKey="value" // 데이터에서 값에 해당하는 키 지정
                >
                  {graphData.map((entry, index) => (
                    // Cell : 각 섹션의 스타일을 설정하기 위함 -> key는 index값, fill은 컬러 채우기
                    <Cell className="z-10" key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        )
        :
        (<div></div>)
        }
        <div></div>
      
      <div className="flex items-end justify-between ">
        <div className="flex items-end">
          <button onClick={()=>{changeParams('orderBy','submitDate')}} className={searchParams.get('orderBy')===null||searchParams.get('orderBy')==='submitDate' ? 'orderBy' : 'orderBy unchoice'} value='date'>최신순</button>
          <button onClick={()=>{changeParams('orderBy','timeComplexity')}} className={searchParams.get('orderBy')==='timeComplexity' ? 'orderBy' : 'orderBy unchoice'} value='time'>시간복잡도순</button>
          <div className="ms-2 w-8 p-1" onClick={onClickReload}>
            <img style={{cursor:"pointer"}} src={reload} alt="reload" className={`w-full ${isAnimetion ? 'scale-110' : ''}`} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
        <div className="z-50">
          <div className="flex join align-middle">
            <select value={lang} onChange={(e)=>{setLang(e.target.value)}} className="select select-sm select-bordered w-28 join-item" >
              <option value={'전체'}>전체</option>
              <option value={'java'}>java</option>
              <option value={'python'}>python</option>
              <option value={'cpp'}>cpp</option>
            </select>
            <input onChange={(e)=>{setNickname(e.target.value)}} type="text" placeholder="닉네임" className="input input-bordered input-sm join-item w-32" />
            <button onClick={onClickHandler} className="btn btn-active btn-neutral btn-sm join-item">검색</button>
          </div>
        </div>
      </div>
      </div>
      <div>
        {/* 문제 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="problemTable w-full rounded-xl rounded-tr-none">
            <thead>
              <tr className="orderBy w-full">
                <th className="p-1.5 font-light">닉네임</th>
                <th className="p-1.5 font-light w-3/12">결과</th>
                <th className="p-1.5 font-light">메모리(MB)</th>
                <th className="p-1.5 font-light">시간(ms)</th>
                <th className="p-1.5 font-light">언어</th>
                <th className={`p-1.5 font-light ${props.isSolve ? '' : 'hidden'}`}>코드</th>
                <th className="p-1.5 font-light">제출날짜</th>
              </tr>
            </thead>
            <tbody className="font-normal">
             {submitList.map((submit,index)=>{
              return(
             <WindowSubmitItem 
              key={submit.submitNo}
              submitItem={submit}
              index={index}
              isSolve={props.isSolve}
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