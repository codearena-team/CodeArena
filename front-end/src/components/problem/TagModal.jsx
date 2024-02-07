import axios from "axios"
import { useEffect, useState } from "react"

export default function TagModal (props) {
  const [cateList, setCateList] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const [cate, setCate] = useState('선택')
  const code = props.code
  const userId = props.userId
  const problemId = props.problemId
  useEffect(()=> {
    axios({
      method : 'get',
      url : `https://i10d211.p.ssafy.io/api/problem/category`,
    })
    .then((res)=> {
      console.log(res);
      setCateList(res.data.data.map(cate=>{return cate.tagName}))
    })
    .catch((err)=> {
      console.log(err);
    })
  },[])

  const onClickCate = (e)=>{
    const arr = cateList
    const filtered = arr.filter((element) => element !== e.target.value);
    setCateList(filtered)
    const tmp = selectedList
    tmp.push(e.target.value)
    setSelectedList(tmp)
    setCate('선택')
  }

  const onClickSelected = (e)=>{
    const text = e.target.innerText.split(" X")[0]
    const arr = selectedList
    const filtered = arr.filter((element) => element !== text);
    setSelectedList(filtered)
    const tmp = cateList
    tmp.push(text)
    setCateList(tmp)
  }
  
  const onClickHandler = (e) => {
    const taglist = cateList.map((el)=> {return {'tagName' : el}})
    axios.post(`https://i10d211.p.ssafy.io/api/problem/${problemId}/submit`,{code:code, taglist:taglist, userId:userId}).then((res)=>console.log(res))
  }
  
  return (
  // <button className="btn" onClick={()=>document.getElementById('tagmodal').showModal()}>open modal</button>
  <dialog id="TagModal" className="modal">
    <div className="modal-box">
      <div className="modal-action flex justify-between mb-4 mt-0">
        <div className="w-12"></div>
        <h3 className="font-bold text-lg text-center ms-">어떤 알고리즘으로 풀었나요?</h3>
        <form method="dialog">
          <button className="btn-sm btn rounded-full">X</button>
        </form>
      </div>
      <div className="text-center">
        <div>
          <label className="font-bold ms-4 mt-1 me-2">알고리즘</label>
          <select value={cate} onChange={onClickCate} className="select select-sm select-bordered w-20" >
            <option disabled='true'>선택</option>
            {cateList.map((cate)=>{
              return(
                <option key={cate} onClick={onClickCate}>{cate}</option>
              )
            })}
          </select>
        </div>
        <div className="px-4 mt-4 grid grid-cols-3 gap-4" >
          {selectedList.map((selected)=>{
            return(
              <div className='m-2 bg-gray-300 p-2 rounded-lg w-full' onClick={onClickSelected}>{selected} X</div>
            )
          })}
        </div>
      </div>
      <div className="modal-action">
        <form method="dialog">
          <button onClick={onClickHandler} className="btn">제출</button>
        </form>
      </div>
    </div>
  </dialog>
  )
}