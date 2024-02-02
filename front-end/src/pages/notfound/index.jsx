import { useNavigate, Link } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return(
    <div className="flex flex-col items-center mt-20">
      <h1 className=" text-9xl">404</h1>
      <p>요청한 페이지를 찾을 수 없습니다.</p>
      <div className="mt-4">
        <Link onClick={()=>{navigate(-1)}} className="btn btn-neutral rounded-full me-4">이전페이지</Link>
        <Link to="" className="btn btn-neutral rounded-full">메인페이지</Link>
      </div>
    </div>
  )
}