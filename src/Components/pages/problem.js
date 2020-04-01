import React, { useContext, useEffect, useState } from 'react';
import CodechefContext from '../../Context/codechef/codechefContext';
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/auth/authContext';
import Spinner from '../layout/spinner.js';
import ProblemList from '../contestProblem/problemList';
import banner from './banner.jpg';
import Timer from '../contestProblem/timer'
const Problem = (props) => {
  const codechefContext = useContext(CodechefContext);
  const authContext = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  }
  const onError = (e) => {
    setLoaded(true);
    setError(true);
  }

  useEffect(() => {
    authContext.loadPage();
    setLoaded(false);
    setError(false);
    codechefContext.getContestDetail(props.match.params.contestcode);
    //eslint-disable-next-line
  }, [])
  if (codechefContext.loadingDetail) {
    return (
      <div>
        <div className='contestHeading'>
          <h1>{props.match.params.contestcode}</h1>
          </div>
          <hr></hr>
          <Spinner />
        
      </div>
    )
  }
  const detail = codechefContext.contestDetail;
  var content = (
    <div className="contest">
      <div className="timermobile">
        <Timer />
        <Link to={'/rankings/' + props.match.params.contestcode}><button style={{ padding: "1rem"}} className=" btn btn-dark">
          Go To Contest Ranks</button></Link>
      </div>
      <div className="card">
        <img alt='banner' src={detail.bannerFile} onLoad={onLoad} onError={onError} style={{ margin: "2% auto" }} />
        {!loaded && <Spinner />}
      </div>
        <div className="timer">
          <Timer />    
        <Link to={'/rankings/' + props.match.params.contestcode}><button style={{ padding: "1rem"}} className=" btn btn-dark">
          Go To Contest Ranks</button></Link>
          </div>
    </div>)
  return (

    <div>
      <div className='contestHeading'>
        <h1>
          {props.match.params.contestcode}
        </h1>
      </div>
      <hr></hr>
      {!error ? content : (<div className="contest">
        <div className="timermobile">
        <Timer />
        <Link to={'/rankings/' + props.match.params.contestcode}><button style={{ padding: "1rem"}} className=" btn btn-dark">
          Go To Contest Ranks</button></Link>
        </div>
        <div className="card">
          <img alt='banner' onLoad={onLoad} src={banner} style={{ margin: "2% auto" }} />
          {!loaded && <Spinner />}
        </div>
        <div className="timer">
        <Link to={'/rankings/' + props.match.params.contestcode}><button style={{ padding: "1rem"}} className=" btn btn-dark">
          Go To Contest Ranks</button></Link>
          <Timer />
          </div>
      </div>)}
      <div>
        <ProblemList />
      </div>
    </div>

  )
}
export default Problem;