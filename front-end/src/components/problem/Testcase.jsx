import CodeMirror from '@uiw/react-codemirror';

export default function Testcase (probs) {
  return(
    <div className='grid grid-cols-2 gap-4 mb-5'>
      <div>
        <p className='mb-2'>input{probs.index+1}
        </p>
        <CodeMirror value={probs.tc.input} />
        </div>
      <div><p className='mb-2'>output{probs.index+1}</p><CodeMirror value={probs.tc.output} /></div>
    </div>
  )
} 