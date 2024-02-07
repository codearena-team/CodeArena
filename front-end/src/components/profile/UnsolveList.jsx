import { useNavigate } from "react-router-dom"

export default function UnsolveList(props) {
  const problemId = props.UnsolveItem.problemId
  const navigate = useNavigate()

  const goProblem = () =>{
    navigate(`/problem/${problemId}/detail`)
  }


  return(
    <button className="btn mr-2 drop-shadow"
    onClick={goProblem}>#{problemId}</button>
  )
}