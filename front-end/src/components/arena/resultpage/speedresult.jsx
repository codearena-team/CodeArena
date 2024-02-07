import Tropy from '../../../images/arena/Result/tropy.png'
import Victory from '../../../images/arena/Result/victory.png'
import '../../css/resultpage.css'
import { Link } from 'react-router-dom'


export default function SpeedResult (){
  return(
    <div className='flex flex-col mt-20 '>
      <div className="mt-5 shadow-xl mb-5 relative" style={{ backgroundColor: '#E3E6D9', height:300 }}>
        <div className="rounded-xl drop-shadow p-5 mb-2  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ backgroundColor: '#F4F5F1',width:700 ,height:450,
        borderWidth: '10px', borderStyle: 'solid', borderColor: '#E3E6D9'}}>
          <div className='flex justify-between'>
            <img src={Tropy} alt="" className='tropy' />
            <div className='text-5xl font-bold mt-5'>Winner</div>
            <img src={Tropy} alt="" className='tropy' />
          </div>
          <div className='flex justify-evenly p-32'>
            <div>  
              <h1 className='text-xl'>nickname나오는곳</h1>
              <h1>축하합니다!</h1>
            </div>
            <div className='flex justify-end'><img src={Victory} alt="" className='victory'/></div>
          </div>
        </div>
      </div>
      <div className='mt-32 flex justify-center'>
      <Link to='/arena'>
        <button className="btn btn-md btn-active drop-shadow text-md" 
        style={{backgroundColor:'#E2E2E2'}}
        >아레나로 돌아가기</button>
      </Link>
      </div>
    </div>
  )
}