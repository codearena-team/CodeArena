import { java } from "@codemirror/lang-java";
import {useState, useCallback} from "react";
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';



export default function SubmitTest() {
  const [code, setCode] = useState("import java.util.*;\nimport java.io.*;\n\npublic class solution{\n  static StringTokenizer stk;\n  public static void main(String [] args) throws Exception{\n    BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));\n    stk = new StringTokenizer(bf.readLine());\n    int a = Integer.parseInt(stk.nextToken());\n    int b = Integer.parseInt(stk.nextToken());\n    Thread.sleep(6000);\nSystem.out.println(a+b);\n  }\n}");
  const [userId, setUserId] = useState("ssafy");
  const [problemId, setproblemId] = useState(5);
  const onChangeCode = useCallback((code, viewUpdate) => {
    console.log('code:', code);
    setCode(code);
  }, []);
  const onChangeUserId = (e) => {
    setUserId(e.target.value)
  }
  const onChangeproblemId = (e) => {
    setproblemId(e.target.value)
  }

  const onClick = () => {
    // formData.append('code',code)
    axios({
      url : `http://192.168.100.208/api/solve/${userId}/${problemId}`,
      method : "post",
      data : {
        code:code
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    // fetch('http://192.168.100.208/api/solve/ssafy/5', {
    // method : 'post',
    // headers : { 'Content-type' : 'application/json'},
    // body : JSON.stringify({code : "import java.util.*;\nimport java.io.*;\n\npublic class solution{\n  static StringTokenizer stk;\n  public static void main(String [] args) throws Exception{\n    BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));\n    stk = new StringTokenizer(bf.readLine());\n    int a = Integer.parseInt(stk.nextToken());\n    int b = Integer.parseInt(stk.nextToken());\n    System.out.println(a+b);\n  }\n}"})
    // })
  }
  return (
    <div>
      <h1>Submit Test</h1>
      <label htmlFor="userId">유저 ID</label>
      <input onChange={onChangeUserId} type="text" value={userId} id="userId" />
      <label htmlFor="problemId">문제 번호</label>
      <input onChange={onChangeproblemId} type="number" value={problemId} id="problemId" />
      <CodeMirror value={code} height="400px" extensions={[java()]} onChange={onChangeCode} />
      <input onClick={onClick} type="submit" value="제출" />
    </div>
  );
}