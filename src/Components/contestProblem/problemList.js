import React, { useContext } from 'react';
import ProblemItem from './problemItem';
import CodechefContext from '../../Context/codechef/codechefContext';
const ProblemList=()=>{
    const codechefContext=useContext(CodechefContext);
    const problemsList=codechefContext.contestDetail.problemsList;
    problemsList.sort((a,b)=>{
         const submissionA=a.successfulSubmissions;
         const submissionB=b.successfulSubmissions;
         if(submissionB>submissionA){
             return 1;
         }else if(submissionB<submissionA){
             return -1;
         }
         else{
             return 0;
         }
    })
 return (
    <table className='table' style={{width:"80%"}}>
        <thead>
        <tr>
            <th>Code</th>
            <th>Successful Submission</th>
            <th>Accuracy</th>
        </tr>
        </thead>
        <tbody>
    {problemsList.map(problem=>(<ProblemItem problem={problem} key={problem.problemCode}/>))}
    </tbody>
    </table>
 )
}
export default ProblemList;