import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../../css/problemsolve.css"

export default function TagList() {
  const navigate = useNavigate()
  const [tagList, setTagList] = useState([])
  useEffect(()=> {
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/problem/category`,
    })
    .then((res)=> {
      console.log(res);
      setTagList(res.data.data)
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])

  const onClick = () => {
    
  }

  return(
    <div className="mx-10 flex flex-col">
      <div className="text-center">
        {/* 문제 목록 테이블 */}
      <div
        className=" bg-gray-200 text-gray-700 py-2 rounded-md relative z-10"
        style={{ backgroundColor: '#E3E6D9' }}
      >
        <div className="text-center">알고지즘 카테고리</div>
      </div>

      {/* 데이터 리스트 */}
      {tagList.map((item, index) => (
        <div key={index} className="w-full border-b items-center rounded-xl shadow-sm hover:bg-gray-300">
          <div style={{cursor:"pointer"}} className="py-4" onClick={()=>navigate(`/problem?orderBy=percent&tag=${item.tagName}`, { replace: true })}>
            <div className="text-center w-full">{item.tagName}</div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}