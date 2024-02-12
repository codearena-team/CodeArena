import Editor from '@monaco-editor/react';

export default function Testcase (probs) {
  return(
    <div className='grid grid-cols-2 gap-4 mb-5'>
      <div>
        <p className='mb-2'>input{probs.index+1}
        </p>
        <Editor value={probs.tc.input} 
        options={{'scrollBeyondLastLine':false, 'readOnly': true,'minimap':{enabled:false},}}
        height={`${probs.tc.input?.split('\n').length * 19}px`} />
        </div>
      <div>
        <p className='mb-2'>output{probs.index+1}</p>
        <Editor value={probs.tc.output} 
        options={{'scrollBeyondLastLine':false, 'readOnly': true,'minimap':{enabled:false},}}
        height={`${probs.tc.output?.split('\n').length * 19}px`} />
        </div>
    </div>
  )
} 