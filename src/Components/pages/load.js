import React, { useEffect, useContext } from 'react';
import AuthContext from '../../Context/auth/authContext';
import Spinner from '../layout/spinner.js';
const Load = (props) => {
    const authContext = useContext(AuthContext);
    useEffect(() => {

        const getToken = async () => {
            if (!localStorage.requestLogin) {
                props.history.push('/login');
            }
            else if (!localStorage.accessToken && localStorage.requestLogin) {
                await authContext.getAccessToken();
            } else {
                props.history.push('/home');
            }
        }
        getToken();
        //eslint-disable-next-line
    }, [authContext.accessToken])
    return (
        <div className="Search">
            <Spinner />
        </div>
    )

}
export default Load;