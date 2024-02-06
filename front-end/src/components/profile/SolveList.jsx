import { useNavigate } from "react-router-dom"
export default function SolveList(props) {
  const problemId = props.SolveItem.problemId
  const navigate = useNavigate()

  const goProblem = () =>{
    navigate(`/problem/${problemId}/detail`)
  }

  return(
    <button className="btn mr-2"
    onClick={goProblem}>#{problemId}</button>
  )
}
