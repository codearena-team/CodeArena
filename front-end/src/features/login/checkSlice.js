import { createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { setRefreshToken } from './authSlice'
import { setAccessToken } from './accessSlice'
import axios from 'axios';
import { useDispatch,useSelector} from 'react-redux';




// export const checkToken = createAsyncThunk(


//   async(_,{ dispatch,getState } ) =>{
//     const { auth}
//   }
// )