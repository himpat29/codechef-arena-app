import React, { Fragment, useContext, useEffect, useState } from 'react'
import CodechefContext from '../../Context/codechef/codechefContext';
import MyTimer from 'react-compound-timer';

const Timer = () => {
    const [initialTime, setInitialTime] = useState(null);
    const calculateTime = () => {
        if (!codechefContext.loadingDetail) {
            var startDate = codechefContext.contestDetail.startDate;
            var endDate = codechefContext.contestDetail.endDate;
            var resStart = new Date(startDate.replace("-", "/"));
            var resEnd = new Date(endDate.replace("-", "/"));
            var today = new Date();
            if (resStart > today) {
                setTimerState('Contest Starts In');
                const time=resStart.getTime()-today.getTime();
                setInitialTime(time);
                setTimeout(()=>{
                    setTimerState('Contest Ends In');
                    const contestTime=resEnd.getTime()-resStart.getTime()
                    setInitialTime(contestTime);
                    setInterval(() => {
                        setInterval(() => {
                            setTimerState('Contest Ended');
                            setInitialTime(null);
                        }, resEnd.getTime()-resEnd.getTime());
                    }, time/2);
                },time/2);
            }
            else if(resEnd<today) {
                setTimerState('Contest ended')
            }else{
                    setTimerState('Contest Ends In');
                    const time=resEnd.getTime()-today.getTime();
                    setInitialTime(time);
                    setTimeout(()=>{
                      setTimerState('Contest Ended');
                      setInitialTime(null);
                    },time)
                
            }
      }
        else{
            setInitialTime(null);
        }
    }
    const codechefContext = useContext(CodechefContext);
    const [timerState, setTimerState] = useState('');
    useEffect(() => {
        calculateTime();
    //eslint-disable-next-line
    }, [codechefContext.loadingDetail])
    if (codechefContext.loadingDetail) {
        return (<div></div>)
    }
    return (
        <Fragment>
            <h2>{timerState}</h2>
            {initialTime&&(<MyTimer initialTime={initialTime}
    direction="backward">
    {() => (
        <Fragment>
            <h3>
            <MyTimer.Days /> days{'\n'}
            <MyTimer.Hours /> hours{'\n'}
            <MyTimer.Minutes /> minutes {'\n'}
            <MyTimer.Seconds /> seconds  {'\n'}
            </h3>
        </Fragment>
    )}
     </MyTimer>)}
            
        </Fragment>
                )
                }
export default Timer;