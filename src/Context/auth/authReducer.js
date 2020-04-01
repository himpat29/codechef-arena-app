import {
    GET_ACCESS_TOKEN,
    GET_REFRESH_TOKEN,
    LOGOUT,
    SET_REQUEST_LOGIN
} from '../types';
export default (state, action) => {
    switch (action.type) {
        case SET_REQUEST_LOGIN:
            localStorage.setItem('requestLogin', true)
            return {
                ...state
            }

        case GET_ACCESS_TOKEN:
            localStorage.setItem('accessToken', action.payload.access_token)
            localStorage.setItem('refreshToken', action.payload.refresh_token)
            return {
                ...state,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token
            }
        case GET_REFRESH_TOKEN:
            localStorage.setItem('accessToken', action.payload.access_token)
            localStorage.setItem('refreshToken', action.payload.refresh_token)
            return {
                ...state,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token
            }
        case LOGOUT:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('requestLogin');
            return {
                ...state,
                access_token: '',
                refreshToken: ''
            }
        default:
            return state;

    }
}