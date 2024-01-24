import {useState} from "react";
import axios from 'axios';

export default function CreateTest() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inputDiscription, setInputDiscription] = useState("");
  const [outputDiscription, setOutputDiscription] = useState("");
  const [outputExam, setOutputExam] = useState("");
  const [inputExam, setInputExam] = useState("");
  const [inputFileData, setInputFileData] = useState("");
  const [outputFileData, setOutputFileData] = useState("");

  
  const onChangeInputFile = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
    console.log(event);
    let text = event.target.result;
    text = text.replaceAll("\r", "");
    let data = text.split("\n\n");
    setInputFileData(data);
    };
    reader.readAsText(file);
  };
  const onChangeOutputFile = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
    console.log(event);
    let text = event.target.result;
    text = text.replaceAll("\r", "");
    let data = text.split("\n\n");
    setOutputFileData(data);
    };
    reader.readAsText(file);
  };
  
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }
  const onChangeInputDiscription = (e) => {
    setInputDiscription(e.target.value)
  }
  const onChangeOutputDiscription = (e) => {
    setOutputDiscription(e.target.value)
  }
  const onChangeInputExam = (e) => {
    setInputExam(e.target.value)
  }
  const onChangeOutputExam = (e) => {
    setOutputExam(e.target.value)
  }
  // const onChangeInputFile = (e) => {
  //   if (e.target.files[0].type === "text/plain") {
  //     console.log(e.target.files[0]);
  //     setInputFile(e.target.files[0])
  //   } else {
  //     alert(".txt 파일만 업로드 가능합니다.")
  //     e.target.value = null;
  //   }
  // }
  // const onChangeOutputFile = (e) => {
  //   if (e.target.files[0].type === "text/plain") {
  //     console.log(e.target.files[0]);
  //     setOutputFile(e.target.files[0])
  //   } else {
  //     alert(".txt 파일만 업로드 가능합니다.")
  //     e.target.value = null;
  //   }
  // }
  const onClick = () => {
    const testCase = inputFileData.map((input,index) => {
      return {
        input : inputFileData[index],
        output : outputFileData[index]
      }
    })
    // const data = {
    //   title:title,
    //   content:content,
    //   inputDiscription:inputDiscription,
    //   outputDiscription:outputDiscription,
    //   inputExam:inputExam,
    //   outputExam:outputExam,
    //   testCase:testCase,
    // }
    // console.log(data);
    axios({
      url : "https://jsonplaceholder.typicode.com/todos/1",
      method : "post",
      data : {
        title:title,
        content:content,
        inputDiscription:inputDiscription,
        outputDiscription:outputDiscription,
        inputExam:inputExam,
        outputExam:outputExam,
        testCase:testCase,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <div>
      <h1>Submit Test</h1>
      <label htmlFor="title">제목</label><br />
      <input onChange={onChangeTitle} type="text" id="title"/><br />
      <label htmlFor="content">내용</label> <br />
      <textarea style={{resize: "none"}} onChange={onChangeContent} name="content" id="content" cols="75" rows="15"></textarea><br />
      <label htmlFor="input">input 설명</label> <br />
      <textarea style={{resize: "none"}} onChange={onChangeInputDiscription} name="input" id="input" cols="75" rows="10"></textarea><br />
      <label htmlFor="output">output 설명</label> <br />
      <textarea style={{resize: "none"}} onChange={onChangeOutputDiscription} name="output" id="output" cols="75" rows="10"></textarea><br />
      <div>
        <div style={{display: 'inline-block'}}>
          <label htmlFor="content">input 예제</label><br />
          <textarea style={{resize: "none"}} onChange={onChangeInputExam} name="content" id="content" cols="35" rows="10"></textarea>
        </div>
        <div style={{display: 'inline-block', marginLeft: '20px'}}>
          <label htmlFor="content">output 예제</label><br />
          <textarea style={{resize: "none"}} onChange={onChangeOutputExam} name="content" id="content" cols="35" rows="10"></textarea><br />
        </div>
      </div>
      <label htmlFor="inputFile">input 파일 : </label>
      <input onChange={onChangeInputFile} type="file" id="inputFile" />
      <label htmlFor="title">output 파일 : </label>
      <input onChange={onChangeOutputFile} type="file" id="outputFile" /><br />
      <input onClick={onClick} type="submit" value="제출" />
    </div>
  );
}