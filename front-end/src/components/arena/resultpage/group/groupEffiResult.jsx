import Tropy from '../../../../images/arena/Result/tropy.png'
import Victory from '../../../../images/arena/Result/victory.png'
import '../../../css/resultpage.css'
import { Link } from 'react-router-dom'
import { useSearchParams } from "react-router-dom"



export default function EffiResult (){
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

  return(
    <div className='flex flex-col mt-10 '>
      <div className='flex justify-end mr-20'>
        <Link to='/arena'>
          <button className="btn btn-sm btn-active drop-shadow text-md" 
          style={{backgroundColor:'#E2E2E2'}}
          >아레나로 돌아가기</button>
        </Link>
      </div>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:180 }}>
        <div className="rounded-xl drop-shadow p-5 mb-2  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ backgroundColor: '#F4F5F1',width:600 ,height:300,
        borderWidth: '10px', borderStyle: 'solid', borderColor: '#E3E6D9'}}>
          <div className='flex justify-between'>
            <img src={Tropy} alt="" className='tropy2' />
            <div className='text-3xl font-bold mt-5'>Winner</div>
            <img src={Tropy} alt="" className='tropy2' />
          </div>
          <div className='flex justify-evenly p-10'>
            <div>  
              <h1 className='text-xl'>nickname나오는곳</h1>
              <h1>축하합니다!</h1>
            </div>
            <div className='flex justify-end'><img src={Victory} alt="" style={{width:'70px',height:'70px'}}/></div>
          </div>
        </div>
      </div>
      
      {/* 문제제출정보테이블 */}
      <div className="overflow-x-auto p-20">
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
             {/* {submitList.map((submit,index)=>{
              return(
             <SubmitItem 
              key={submit.submitNo}
              submitItem={submit}
              index={index}
             />
             )})} */}
            </tbody>
          </table>
        </div>
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
  )
}