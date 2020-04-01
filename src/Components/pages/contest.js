import React, { useContext, useState, useEffect, Fragment } from 'react';
import CodechefContext from '../../Context/codechef/codechefContext';
import Spinner from '../layout/spinner.js';
import banner from './banner.jpg';
import { Link } from 'react-router-dom';

const Contest = (props) => {
    
    const [loaded,setLoaded]=useState(false)
    const [error,setError]=useState(false);
    const [display,setDisplay]=useState(null);
    const codechefContext = useContext(CodechefContext);
    

    const onLoad=()=>{
        setLoaded(true);
    }
    const onError=(e)=>{
        setLoaded(true);
        setError(true);
    }
    const calcContestTime=()=>{
        if(!codechefContext.loadingDetail){
        var startDate = codechefContext.contestDetail.startDate;
        var resStart = new Date(startDate.replace("-", "/"));    
        var today = new Date();
        if(resStart>today){
        setDisplay(false);
        }else{
            setDisplay(true);
        }
    }
    }
    useEffect(()=>{
        setLoaded(false);
        setError(false);
        calcContestTime();
        //eslint-disable-next-line
       },[codechefContext.loadingDetail])

    if (codechefContext.loadingDetail) {
        return (<div></div>)
    }
    const detail = codechefContext.contestDetail;
    
    if (!codechefContext.loadingDetail)
    var content=(<div >
        <img alt='banner' src={detail.bannerFile} onLoad={onLoad} onError={onError} style={{margin:"4% auto"}}/>
        {!loaded &&<Spinner/>}
        </div>)
    return (
        <div className='card' style={{ backgroundColor: 'orange' }}>
            <h1>{detail.name}</h1>
            <hr></hr>
            <div>
              {!error?content:(<img alt='banner' onLoad={onLoad} src={banner} style={{margin:"7% auto"}}/>)} 
             </div>
            {detail.children.length===2 &&display ?( 
            <div className='grid-2'>
                <Link to={`/problem/${detail.children[0]}`}>
                <div className='card'>
                    <p style={{fontSize:"20px"}}>
                    
                    If your rating is>=1800,
                    you can only participate in Division 1. Please head over here</p>
              </div>
              </Link>
              <Link to={`/problem/${detail.children[1]}`}>
                <div className='card'>
                    <p style={{fontSize:"20px"}}>
                    If your rating is less than 1800 you can only participate in Division 2. Please head over here
                    </p>
              </div>
              </Link>
            </div>
            ): display ?
            (<div><Link to={`/problem/${detail.code}`}>
            <button className="btn btn-dark btn-block">Go To Contest Problems</button></Link></div>)
            :(<Fragment></Fragment>)
        }
        </div>
    )
}
export default Contest;