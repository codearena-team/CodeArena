import Profile from '../../../images/common/profile.png';
import { Link } from 'react-router-dom'


export default function Edit(){
  return(
    <div className="pt-8 px-60">
      <div className='flex justify-evenly editbox drop-shadow-2xl' style={{borderRadius: '5rem', borderWidth: '3px', borderColor: 'black'}}>
        <div>
          <img src={Profile} alt="" style={{width:180}} className='mt-20 drop-shadow-xl'/>
          <div className='flex justify-center p-10'><button className="btn btn-neutral rounded-full drop-shadow-xl">수정</button></div>
        </div>
        <div className='p-10 space-y-6' style={{width:"50%"}}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md text-bold font-bold">이메일</span>
            </div>
            <input type="text" placeholder="oh@ssafy.com" className="input input-bordered w-full drop-shadow-xl" style={{backgroundColor:'#ffffff'}} disabled/>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md font-bold">닉네임</span>
            </div>
            <input type="text" placeholder="" className="input input-bordered w-full drop-shadow-xl" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md font-bold">소개글</span>
            </div>
            <textarea className="textarea textarea-bordered h-24 drop-shadow-xl" placeholder=""></textarea>
          </label>
          <div className='flex justify-end'>
            <button className="btn btn-neutral w-20 rounded-full mr-7 drop-shadow-xl">저장</button>
            <Link to='/profile/changepassword'>
              <button className="btn btn-neutral w-40 rounded-full drop-shadow-xl">비밀번호 변경하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}