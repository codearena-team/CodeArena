// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import accessSlice from "./features/login/accessSlice";
// import { setAccessToken } from "./features/login/accessSlice";

// export default async function useTest () {
//   const accessToken = useSelector(store => store.access.accessToken)
//   const refreshToken = useSelector(store => store.auth.refreshToken)
//   const dispatch = useDispatch()

//   const checkAccess = async function () {
//     const headers = {Authorization : accessToken}
//     return (
//       axios.get('http://i10d211.p.ssafy.io:8081/api/auth', {headers})
//     )
//   }

//   const useRefresh = async function () {
//     const data = {refreshToken : refreshToken}
//     return axios.post('http://i10d211.p.ssafy.io:8081/api/auth/renew',data)
//   }

//   try{
//     let value = await checkAccess()
//     console.log(value);
//     if (value.data.status == '302') {
//       let value2 = await useRefresh()
//       console.log(value2);
//       dispatch(setAccessToken(value2.headers.authorization))
//       await checkAccess()
//     }
    
//   } catch (err){
//     console.log(err);
//   }
// }