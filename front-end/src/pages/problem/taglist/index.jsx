import { useEffect, useState } from "react"
import axios from "axios"
import "../../css/problemsolve.css"

export default function TagList() {
  const [tagList, setTagList] = useState(["제목1", "제목1","제목1","제목1","제목1", "제목1","제목1","제목1","제목1"])
  useEffect(()=> {
    axios({
      method : 'get',
      url : `http://i10d211.p.ssafy.io:8081/api/problem/category`,
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
      <div>
        {/* 문제 목록 테이블 */}
        <div className="overflow-x-auto">
          <table className="problemTable w-full">
            <thead>
              <tr>
                <th className="p-1.5">알고리즘 유형 명</th>
              </tr>
            </thead>
            <tbody className="font-normal">
            
              {tagList.map((tag, index)=> {
                return(
                  <tr onClick={onClick} className={((index%2)===0) ? 'even ' : ''} >
                    <th className="p-1">{tag.tagName}</th>
                  </tr>
                )
              })}
              
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}