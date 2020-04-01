import React, { useEffect, useContext, useState, Fragment } from 'react';
import CodechefContext from '../../Context/codechef/codechefContext';
import AuthContext from '../../Context/auth/authContext';
import Spinner from '../layout/spinner.js';
import SubmissionTable from '../contestProblem/SubmissionTable'
import Ide from '../contestProblem/ide.js'
import ProblemStatement from '../contestProblem/ProblemStatement';

const ProblemPage = (props) => {
    const codechefContext = useContext(CodechefContext);
    const authContext = useContext(AuthContext);
    const [displayProblem, setDisplayProblem] = useState(true);
    const [displaySubmissions, setDisplaySubmission] = useState(false);
    const [displaySubmit, setSubmit] = useState(false);
    const onProblemClick = () => {
        setDisplayProblem(true);
        setDisplaySubmission(false);
        setSubmit(false);
    }

    const onSubmissionClick = () => {
        setDisplayProblem(false);
        setDisplaySubmission(true);
        setSubmit(false);
    }

    const onSubmitClick = () => {
        setDisplayProblem(false);
        setDisplaySubmission(false);
        setSubmit(true);
    }

    useEffect(() => {
        authContext.loadPage();
        codechefContext.getProblem(props.match.params.contestcode, props.match.params.problemcode);
        //eslint-disable-next-line
    }, [])
    if (codechefContext.loadingProblem) {
        return (
            <div>
                <div className="contestHeading">
                    <h1>
                        {props.match.params.contestcode}
                    </h1>
                </div>
                <hr></hr>
                <div className="myCard">
                        <Spinner />
                </div>
            </div>
        )
    }
    
    else {
        const problem=codechefContext.problem.body;
        const rawStatement=String.raw `${problem}`
        return (
            <div>
                <div className="contestHeading">
                    <h1>
                        {props.match.params.contestcode}
                    </h1>
                </div>
                <hr></hr>
                <div className="myCard">
                    <div className='item'>
                        <span onClick={onProblemClick} className={displayProblem ? `select element` : `element`}>Problem</span>
                        <span onClick={onSubmissionClick} className={displaySubmissions ? `select element` : `element`}>Submissions</span>
                        <span onClick={onSubmitClick} className={displaySubmit ? `select element` : `element`}>Submit</span>
                    </div>
                    <div className="content">
                        <div className="heading">
                            <h2>{codechefContext.problem.problemName}</h2>
                        </div>
                        
                        {displayProblem ?<div class="note">statement={rawStatement}</div> : (<Fragment></Fragment>)}
                        {displaySubmissions ? <SubmissionTable contestcode={props.match.params.contestcode} problemcode={props.match.params.problemcode}
                        language={codechefContext.problem.languagesSupported}/>: (<Fragment></Fragment>)}
                        {displaySubmit ? (<Ide language={codechefContext.problem.languagesSupported}/>) : (<Fragment></Fragment>)}
                    </div>

                </div>
            </div>
        )
    }

}
export default ProblemPage;