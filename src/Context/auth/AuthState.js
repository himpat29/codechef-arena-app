import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
    GET_ACCESS_TOKEN,
    GET_REFRESH_TOKEN,
    LOGOUT,
    SET_REQUEST_LOGIN
} from '../types';
let CodechefClientId='8f850f3b818dfed8fb4630d045205544';
let CodechefClientSecret='1509df6e5801ef7bce12a66e071b1340';
let redirect_uri='https://codechef-arena-app-i8vq1kj1d.now.sh/';        // set redirect url important

const AuthState = (props) => {
    const initialState = {
        accessToken:localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        error: null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    
    const getAccessToken=async()=>{
        const config={
            headers:{
              'Content-Type':'application/json'
            }
          }
          const queryString=window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const code=urlParams.get('code');
          const data={
            grant_type: "authorization_code",
            code: `${code}`,
            client_id: `${CodechefClientId}`,
            client_secret: `${CodechefClientSecret}`,
            redirect_uri: `${redirect_uri}`
          }
        
          try{
          const res= await axios.post('https://api.codechef.com/oauth/token',data);
          setInterval(()=>{
           getRefreshToken();
          },3600*1000-5)
          dispatch({type:GET_ACCESS_TOKEN,payload:res.data.result.data});
          }catch(err){
            console.log(err)
          }
          
    }
    const getRefreshToken=async()=>{
        const config={
            headers:{
              'Content-Type':'application/json'
            }
          }
        const data={
            "grant_type": "refresh_token",
            "refresh_token":localStorage.getItem('refreshToken'),
            "client_id":`${CodechefClientId}`,
            "client_secret":`${CodechefClientSecret}`
          } 
          console.log(data);
          try{
            const res= await axios.post('https://api.codechef.com/oauth/token',data);
            dispatch({type:GET_REFRESH_TOKEN,payload:res.data.result.data});
            }catch(err){
              console.log(err)
            }    
    }
    const logout=()=>{
        dispatch({type:LOGOUT});
    }
    const loadPage=()=>{
        setAuthToken(localStorage.getItem('accessToken'));
    }
    const setRequestLogin=()=>{
        dispatch({type:SET_REQUEST_LOGIN})
    }
    return (
        <AuthContext.Provider
            value={{
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                error: state.error,
                getAccessToken,
                loadPage,
                logout,
                setRequestLogin
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthState;
