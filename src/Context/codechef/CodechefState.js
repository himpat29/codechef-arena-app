import React, { useReducer } from 'react';
import CodechefContext from './codechefContext';
import CodechefReducer from './codechefReducer.js';
import axios from 'axios';
import {
    GET_CONTEST,
    GET_CONTEST_DETAIL,
    LOADING_DETAIL,
    LOADING_PROBLEM,
    GET_PROBLEM,
    GET_SUBMISSION,
    LOADING,
    GET_RANKLIST,
    SET_CODESTATUS
} from '../types';
const CodechefState = (props) => {
    const initialState = {
        contestList: [],
        loading: true,
        loadingDetail: true,
        contestDetail: null,
        loadingProblem:true,
        submissionList:[],
        rankList:[],
        problem:null,
        codeStatus:null,
        error: null
    };
    const [state, dispatch] = useReducer(CodechefReducer, initialState);

    const getContestList = async () => {
        try {
            const Contestdata = await axios.get('https://api.codechef.com/contests/');
            const contest = Contestdata.data.result.data.content.contestList;
            dispatch({ type: GET_CONTEST, payload: contest });
        } catch (err) {
            console.log(err);
        }
    }
    const getContestDetail = async (code) => {
        setLoadingDetail();
        try {
            const response = await axios.get('https://api.codechef.com/contests/' + code);
            const detail = response.data.result.data.content;
            dispatch({ type: GET_CONTEST_DETAIL, payload: detail })
        } catch (err) {
            console.log(err);
        }
    }
    const getProblem = async (contestCode, problemCode) => {
        setLoadingProblem();
        try {
            const response = await axios.get('https://api.codechef.com/contests/' + contestCode +'/problems/'+problemCode);
            const detail = response.data.result.data.content;
            dispatch({ type: GET_PROBLEM, payload: detail })
        } catch (err) {
            console.log(err);
        }
    }
    const getSubmission=async(contestCode,problemCode,username='',language='')=>{
        setLoadingDetail();
        try{
         const response = await axios.get('https://api.codechef.com/submissions/?problemCode='+problemCode+'&contestCode='+contestCode+
         '&fields=date,username,problemCode,language,result,score,time,memory&username='+username+'&language='+language);
         const detail = response.data.result.data.content;
         dispatch({ type: GET_SUBMISSION, payload: detail })
        }catch(err){
            dispatch({type:GET_SUBMISSION,payload:[]})
            console.log(err);
        }
    }
    const getRankList=async(contestCode,country='',institution='')=>{
        setLoading();
        try {
            const response = await axios.get('https://api.codechef.com/rankings/'+contestCode+
            '/?fields=rank,username,totalTime,penalty,country,institution,totalScore&institution='+institution+'&country='+country);
            let detail=[];
            if(response.data.result!==undefined){
                detail=response.data.result.data.content;
            }
            dispatch({ type: GET_RANKLIST, payload: detail })
        } catch (err) {
            console.log(err);
        }
    }
    
    const runCode=async(lang,code,input)=>{
        const config={
            headers:{
              'Content-Type':'application/json'
            }
          }
        const body={
            "sourceCode":code,
            "language":lang,
            "input":input
        }
        try{
            const response=await axios.post('https://api.codechef.com/ide/run',body,config);
            const index=response.data.indexOf('}d');
            const data=response.data.substring(0,index+1);
            const parsedData=JSON.parse(data);
            const link=parsedData.result.data.link;
            
            let payload=null;
            const getOutput=()=>{setTimeout(async()=>{
              const status=await axios.get('https://api.codechef.com/ide/status?link='+link);

              const d1=status?status.data:''
              const result =d1?d1.result:''
              const d2 = result?result.data:''
              const output=d2?d2.output:''
              const cmpInfo=d2?d2.cmpinfo:''
              if(output||cmpInfo){
                if(cmpInfo===''){
                  payload=output
              }else{
                  payload=cmpInfo
              }
               dispatch({type:SET_CODESTATUS,payload:payload});
              }else{
                getOutput();
              }
            },10000)}
            getOutput();
           
           

        }catch(err){
            console.log(err);
        }

    }
    const setLoadingDetail = () => {
        dispatch({ type: LOADING_DETAIL })
    }
    const setLoading = () => {
        dispatch({ type: LOADING })
    }
    const setLoadingProblem = () => {
        dispatch({ type: LOADING_PROBLEM })
    }
    return (
        <CodechefContext.Provider
            value={{
                contestList: state.contestList,
                loading: state.loading,
                error: state.error,
                contestDetail: state.contestDetail,
                loadingDetail: state.loadingDetail,
                problem:state.problem,
                loadingProblem:state.loadingProblem,
                submissionList:state.submissionList,
                rankList:state.rankList,
                codeStatus:state.codeStatus,
                getContestList,
                getContestDetail,
                getSubmission,
                getProblem,
                getRankList,
                runCode,
            }}
        >
            {props.children}
        </CodechefContext.Provider>
    );
}
export default CodechefState;

