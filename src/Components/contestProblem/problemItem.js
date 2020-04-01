import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const ProblemItem=(props)=>{
 return(
    <Fragment>
        <tr >
            <td><u>
                <Link to={`/problem/${props.problem.contestCode}/${props.problem.problemCode}`}>{props.problem.problemCode}</Link>
                </u></td>
            <td>{props.problem.successfulSubmissions}</td>
            <td>{props.problem.accuracy.toFixed(2)}</td>
        </tr>
    </Fragment> 
 )
}
export default ProblemItem;