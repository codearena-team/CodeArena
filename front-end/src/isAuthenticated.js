import axios from "axios";
import { useSelector } from "react-redux";
import accessSlice from "./features/login/accessSlice";
import { setAccessToken } from "./features/login/accessSlice";


export default function IsAuthenticated(url) {
  const accessToken = useSelector(store => store.access.accessToken)
  const refreshToken = useSelector(store => store.auth.refreshToken)


  axios({
    url : 'http://i10d211.p.ssafy.io:8081/api/auth',  // access 토큰검사axios
    method : 'get',
    headers : {
      Authorization : accessToken
    }
  })
  .then((res)=>{
    console.log(res)
    if (res.data.status == '302'){
      axios({
        url : 'http://i10d211.p.ssafy.io:8081/api/auth/renew', // refresh로 재발급받는 axios
        method : 'post',
        data : {
          refreshToken : refreshToken
        }
      })
      .then((res)=>{
        console.log(res)
        dispatch(setAccessToken(res.headers.authorization))
        axios({
          url : 'http://i10d211.p.ssafy.io:8081/api/auth',
          method : 'get',
          headers : {
            Authorization : res.headers.authorization
          }
        })
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      return true, "access"
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}