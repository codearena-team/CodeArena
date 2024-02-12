import { Link } from 'react-router-dom'
import SubmitListItem from './groupSubmitItemList'

export default function MiddleConfirm(){
   // const pgno = searchParams.get('pgno') || 1
  // const [pageCount, setPageCount] = useState(1)
  // const [searchParams, setSearchParams] = useSearchParams();

  // const pageNation = () => {
  //   const result = [];
  //   for (let i = 0; i < pageCount; i++) {
  //     result.push(<button onClick={()=>changeParams('pgno',i+1)} key={i} className={(searchParams.get('pgno')===`${i+1}`) ? "btn-active join-item btn btn-sm" : "join-item btn btn-sm"}>{i+1}</button>);
  //   }
  //   return result;
  // };


  // const changeParams = (key, value) => {
  //   searchParams.set(key,value)
  //   setSearchParams(searchParams)
  // }
  const submitListItem = [{
    "submitNo": 22,
    "tid": null,
    "userId": null,
    "userNickname": "오싸피",
    "problemId": "12",
    "submitLang": "cpp",
    "code": null,
    "submitStatus": "틀렸습니다.",
    "timeComplexity": null,
    "memory": null,
    "submitDate": "2024-02-05 05:00:46",
    "testCase": null,
    "tagList": []
},
{
    "submitNo": 21,
    "tid": null,
    "userId": null,
    "userNickname": "오싸피",
    "problemId": "29",
    "submitLang": "cpp",
    "code": null,
    "submitStatus": "틀렸습니다.",
    "timeComplexity": null,
    "memory": null,
    "submitDate": "2024-02-05 04:59:03",
    "testCase": null,
    "tagList": []
},]

  return(
    <div>
      <div className='flex justify-end mr-20'>
        <Link to='/arena'>
          <button className="btn btn-sm btn-active drop-shadow text-md" 
          style={{backgroundColor:'#E2E2E2'}}
          >아레나로 돌아가기</button>
        </Link>
      </div>
      <div className="overflow-x-auto p-20 pt-5">
        <table className="problemTable w-full">
          <thead>
            <tr className="orderBy rounded-tr">
              <th className="p-1.5 font-light rounded-tl-2xl">제출번호</th>
              <th className="p-1.5 font-light">제출자</th>
              <th className="p-1.5 font-light w-3/12">결과</th>
              <th className="p-1.5 font-light">메모리</th>
              <th className="p-1.5 font-light">시간</th>
              <th className="p-1.5 font-light">언어</th>
              <th className="p-1.5 font-light rounded-tr-2xl">제출날짜</th>
            </tr>
          </thead>
          <tbody className="font-normal">
            {submitListItem.map((submit,index)=>{
            return(
            <SubmitListItem 
            key={submit.submitNo}
            submit={submit}
            index={index}
            />
            )})}
          </tbody>
        </table>
      {/* 페이지 네이션 */}
      <div className="flex justify-between my-2">
        <div></div>
        <div className="join">
          <button className="join-item btn btn-sm">{'<<'}</button>
          {/* {pageNation()} */}
        <button className="join-item btn btn-sm">{'>>'}</button>
        </div>
        <div></div>
      </div>
    </div>
  </div>



  )
}