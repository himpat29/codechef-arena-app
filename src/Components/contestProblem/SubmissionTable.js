import React,{useState, useEffect,useContext} from 'react';
import CodechefContext from '../../Context/codechef/codechefContext';
import Spinner from '../layout/spinner.js';

const SubmissionTable=(props)=>{
    const [Search,setSearch]=useState({
        username:'',
        language:''
    })
    const onChange=(e)=>{
        setSearch({
            ...Search,[e.target.name]:e.target.value
        })
    }
    const onSubmit=(e)=>{
     e.preventDefault();
     codechefContext.getSubmission(props.contestcode,props.problemcode,Search.username,Search.language)
    }
    const codechefContext = useContext(CodechefContext);
     useEffect(()=>{
      codechefContext.getSubmission(props.contestcode,props.problemcode);
        //eslint-disable-next-line
     },[])
    if(codechefContext.loadingDetail){
       return(
           <div>
               <Spinner/>
           </div>
       )
    }
    return(
        <div>
            <div>
        <form onSubmit={onSubmit} className="form">
            <input id="username" type="text" placeholder="Username" name="username" value={Search.username} onChange={onChange}/>
            <select id="language" name ="language" onChange={onChange} value={Search.language}>
                <option>Select any language</option>
                {
                  props.language.map(lang=><option key={lang} value={lang}>{lang}</option>)
                }
            </select>
            <button className="btn btn-dark btn-sm"type="submit">Submit</button>
        </form>
        </div>
        <div style={{overflowX:"auto"}}>
            {codechefContext.submissionList.length!==0?(<table align="center" style={{width:"80%"}}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Language</th>
                        <th>Result</th>
                        <th>Score</th>
                        <th>Time</th>
                        <th>Memory</th>
                    </tr>
                </thead>
                <tbody>
                    {codechefContext.submissionList.map((submission,index)=>(
                    <tr key={index}>
                        <td>{submission.date}</td>
                        <td>{submission.username}</td>
                        <td>{submission.language}</td>
                        <td>{submission.result}</td>
                        <td>{submission.score}</td>
                        <td>{submission.time}</td>
                        <td>{submission.memory}</td>
                    </tr>    
                    ))}
                </tbody>
            </table>):<h2>No Submissions Found</h2>}
            
        </div>
        </div>
    )

}
export default SubmissionTable;