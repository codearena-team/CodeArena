import { useNavigate } from "react-router-dom"

export default function UnsolveList(props) {
  const problemId = props.UnsolveItem.problemId
  const problemTitle = props.UnsolveItem.problemTitle
  const navigate = useNavigate()

  const goProblem = () =>{
    navigate(`/problem/${problemId}/detail`)
  }


  return(
    <button className="btn mr-2 mb-2 drop-shadow text-xs"
    onClick={goProblem}>#{problemId}<span className="text-sm">{problemTitle}</span></button>
  )
}