import Editor from '@monaco-editor/react';

export default function DetailWindow (props) {
  const problem = props.problem

  const inpustClipboard = () => {
    navigator.clipboard.writeText(problem?.problemExInput);
  }

  const outpustClipboard = () => {
    navigator.clipboard.writeText(problem?.problemExOutput);
  }

  return (
    <div>
      <div className="flex justify-center gap-2 drop-shadow text-center mb-4">
        <div className="bg-rose-200 rounded-lg p-2">
          <p>시간제한</p>
          <p>{problem?.problemTime}ms</p>
        </div>
        <div className="bg-rose-200 rounded-lg p-2">
          <p>메모리제한</p>
          <p>{problem?.problemMem}MB</p>
        </div>
        <div className="join bg-rose-200">
          <div className="join-item p-2 border-r-2">
            <p>제출자</p>
            <p>{problem?.submitCount}</p>
          </div>
          <div className="join-item p-2 border-r-2">
            <p>정답자</p>
            <p>{problem?.acceptCount}</p>
          </div>
          <div className="join-item p-2">
            <p>정답률</p>
            <p>{problem?.percentage}</p>
          </div>
        </div>
      </div>
      <p className=" font-bold mb-2 text-xl">내용</p>
      <p style={{'white-space': 'pre-wrap'}}>{problem?.problemContent}</p>
      <hr className="my-2" />
      <p className="font-bold mb-2 text-xl">입력</p>
      <p>{problem?.problemInputDesc}</p>
      <hr className="my-2"  />
      <p className="font-bold mb-2 text-xl">출력</p>
      <p>{problem?.problemOutputDesc}</p>
      <hr className="my-2"  />
      <div className="grid grid-cols-2 w-full gap-4">
        <div>
          <div className="flex">
            <p className="font-bold mb-2 text-xl">입력예제 </p>
            <button className="btn btn-xs bg-rose-200 ms-2" onClick={inpustClipboard}>복사</button>
          </div>
          <Editor 
          height={`${problem?.problemExInput?.split('\n').length * 19}px`} 
          value={problem?.problemExInput} 
          options={{'scrollBeyondLastLine':false, 'readOnly': true, 'minimap':{enabled:false},}}/>
        </div>
        <div>
          <div className="flex">
            <p className="font-bold mb-2 text-xl">출력예제</p>
            <button className="btn btn-xs bg-rose-200 ms-2" onClick={outpustClipboard}>복사</button>
          </div>
          <Editor 
          height={`${problem?.problemExOutput?.split('\n').length * 19}px`} 
          value={problem?.problemExOutput}  
          options={{'scrollBeyondLastLine':false, 'readOnly': true, 'minimap':{enabled:false},}}/>
        </div>
      </div>
    </div>
  )
}