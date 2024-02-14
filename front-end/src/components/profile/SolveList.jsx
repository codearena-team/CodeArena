import { useNavigate } from "react-router-dom"
export default function SolveList(props) {
  const problemId = props.SolveItem.problemId
  const problemTitle = props.SolveItem.problemTitle
  const navigate = useNavigate()

  const goProblem = () =>{
    navigate(`/problem/${problemId}/detail`)
  }

  return(
    <button className="btn mr-2 drop-shadow text-xs"
    onClick={goProblem}>#{problemId}<span className="text-sm">{problemTitle}</span></button>
  )
}
