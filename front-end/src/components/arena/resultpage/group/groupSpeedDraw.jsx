import Silvertropy from '../../../../images/arena/Result/silvertropy.png'
import Friend from '../../../../images/arena/Result/friend.png'
import '../../../css/resultpage.css'
import { Link } from 'react-router-dom'


export default function SpeedDraw (){
  return(
    <div className='flex flex-col mt-20 '>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:300 }}>
        <div className="rounded-xl drop-shadow p-5 mb-2 mr-10 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ backgroundColor: '#F4F5F1',width:500 ,height:450,
        borderWidth: '10px', borderStyle: 'solid', borderColor: '#E3E6D9'}}>
          {/* 그림 */}
          <div className='flex justify-between'>
            <img src={Silvertropy} alt="" className='silvertropy' />
            <div className='text-5xl font-bold mt-5'>Draw</div>
            <img src={Silvertropy} alt="" className='silvertropy' />
          </div>
          <div className='flex justify-evenly p-16 mt-20'>
            <div>  
              <h1 className='text-xl'>nickname나오는곳</h1>
              <h1>축하합니다!</h1>
            </div>
            <div className='flex justify-end'><img src={Friend} alt="" className='friend'/></div>
          </div>
        </div>
        <div className="rounded-xl drop-shadow p-5 mb-2 ml-10 absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ backgroundColor: '#F4F5F1',width:500 ,height:450,
        borderWidth: '10px', borderStyle: 'solid', borderColor: '#E3E6D9'}}>
          {/* 그림 */}
          <div className='flex justify-between'>
            <img src={Silvertropy} alt="" className='silvertropy' />
            <div className='text-5xl font-bold mt-5'>Draw</div>
            <img src={Silvertropy} alt="" className='silvertropy' />
          </div>
          <div className='flex justify-evenly p-16 mt-20'>
            <div>  
              <h1 className='text-xl'>nickname나오는곳</h1>
              <h1>축하합니다!</h1>
            </div>
            <div className='flex justify-end'><img src={Friend} alt="" className='friend'/></div>
          </div>
        </div>
      </div>
      <div className='mt-32 flex justify-center ml-10'>
      <Link to='/arena'>
        <button className="btn btn-md btn-active drop-shadow text-md" 
        style={{backgroundColor:'#E2E2E2'}}
        >아레나로 돌아가기</button>
      </Link>
      </div>
    </div>
  )
}