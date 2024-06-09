import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "./login/accessSlice";
import { logout } from "./login/authSlice";
import { useNavigate } from "react-router-dom";

export function useAuthCheck() {
  const accessToken = useSelector(store => store.access.accessToken)
  const refreshToken = useSelector(store => store.auth.refreshToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkAccess = async function (accessToken) {
    const headers = {Authorization : accessToken}
    return (axios.get('https://codearena.shop/api/auth', {headers}))
  }

  const auseRefresh = async function () {
    const data = {refreshToken : refreshToken}
    return axios.post('https://codearena.shop/api/auth/renew',data)
  }

  const authCheck = async () => {
    try{
      let value = await checkAccess(accessToken)
      // console.log(value);
      if (value.data.status === '302') {
        let value2 = await auseRefresh()
        // console.log(value2);
        if (value2.data.status === '200') {
          dispatch(setAccessToken(value2.headers.authorization))
          await checkAccess(value2.headers.authorization)
          return true
        }
        return false
      }
      return true
    } catch (err){
      console.log(err);
      return false
    }
  }

  //   axios({
  //     url : 'http://codearena.shop:8081/api/auth',  // access 토큰검사axios
  //     method : 'get',
  //     headers : {
  //       Authorization : accessToken
  //     }
  //   })
  //   .then((res)=>{
  //     console.log(1, res)
  //     if (res.data.status === '302'){
  //       axios({
  //         url : 'http://codearena.shop:8081/api/auth/renew', // refresh로 재발급받는 axios
  //         method : 'post',
  //         data : {
  //           refreshToken : refreshToken
  //         }
  //       })
  //       .then((res)=>{
  //         if (res.data.status === '302') {
  //           return false
  //         } else {
  //         console.log(2, res)
  //         dispatch(setAccessToken(res.headers.authorization))
  //         axios({
  //           url : 'http://codearena.shop:8081/api/auth',
  //           method : 'get',
  //           headers : {
  //             Authorization : res.headers.authorization
  //           }
  //           })
  //           .then((res)=>{
  //             console.log(3,res)
  //             return true
  //           })
  //           .catch((err)=>{
  //             console.log(3, err)
  //             return false
  //           }
  //         )
  //         }
  //       })
  //       .catch((err)=>{
  //         console.log(2,err)
  //         return false
  //       })
  //     } else {
  //     return false
  //     }
  //   })
  //   .catch((err)=>{
  //     console.log(1,err)
  //     return false
  //   })
  // }

  
  
  // try{
  //   let value = await checkAccess()
  //   console.log(value);
  //   if (value.data.status == '302') {
  //     let value2 = await useRefresh()
  //     console.log(value2);
  //     dispatch(setAccessToken(value2.headers.authorization))
  //     await checkAccess()
  //   }
    
  // } catch (err){
  //   console.log(err);
  // }


  return [authCheck]
}