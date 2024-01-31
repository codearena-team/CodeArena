import Profile from '../../../images/common/profile.png';
import { Link } from 'react-router-dom'


export default function Edit(){
  return(
    <div className="pt-8 px-60">
      <div className='flex justify-evenly editbox' style={{borderRadius: '5rem', borderWidth: '3px', borderColor: 'black'}}>
        <div>
          <img src={Profile} alt="" style={{width:180}} className='mt-20'/>
          <div className='flex justify-center p-10'><button className="btn btn-neutral rounded-full">수정</button></div>
        </div>
        <div className='p-10 space-y-6' style={{width:"50%"}}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md">이메일</span>
            </div>
            <input type="text" placeholder="oh@ssafy.com" className="input input-bordered w-full" style={{backgroundColor:'#ffffff'}} disabled/>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md">닉네임</span>
            </div>
            <input type="text" placeholder="" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-md">소개글</span>
            </div>
            <textarea className="textarea textarea-bordered h-24" placeholder=""></textarea>
          </label>
          <div className='flex justify-end'>
            <button className="btn btn-neutral w-20 rounded-full mr-7">저장</button>
            <Link to='/profile/changepassword'>
              <button className="btn btn-neutral w-40 rounded-full">비밀번호 변경하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}