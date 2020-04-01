import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Context/auth/authContext';
import codechefIcon from './codecheficon2.png';
const Login = (props) => {
    const authContext = useContext(AuthContext)
    useEffect(() => {
        if (localStorage.accessToken) {
            props.history.push('/');
        }
    }, [props.history])
    const onClick = () => {
        window.location.href = 'https://api.codechef.com/oauth/authorize?response_type=code&client_id=8f850f3b818dfed8fb4630d045205544&state=xyz&redirect_uri=https://codechef-arena-app-i8vq1kj1d.now.sh/';
        authContext.setRequestLogin();
    }
    return (
        <div className="myContainer" style={{ backgroundColor: 'orange' }} width = "100px" height ="100px"> 
            {/* <img style={{width:"200px",height:"200px"}} src={codecheficon2.png} alt="CodechefIcon"/> */}
            <h1>Login</h1>
            <button className='btn btn-block' onClick={onClick}><b>Login</b></button>
        </div>
    )
}
export default Login;
