import {
    GET_CONTEST, GET_CONTEST_DETAIL, GET_PROBLEM,
    LOADING_DETAIL,
    LOADING_PROBLEM,
    GET_SUBMISSION,
    LOADING,
    GET_RANKLIST,
    SET_CODESTATUS
} from '../types'
export default (state, action) => {
    switch (action.type) {
        case GET_CONTEST:
            return {
                ...state,
                contestList: action.payload,
                loading: false
            }
        case GET_CONTEST_DETAIL:
            return {
                ...state,
                loadingDetail: false,
                contestDetail: action.payload
            }
        case GET_PROBLEM:
            return {
                ...state,
                problem: action.payload,
                loadingProblem: false,
            }
        case LOADING_DETAIL:
            return {
                ...state,
                loadingDetail: true
            }
        case GET_SUBMISSION:
            return {
                ...state,
                submissionList: action.payload,
                loadingDetail: false
            }
        case SET_CODESTATUS: {
            return {
                ...state,
                codeStatus: action.payload
            }
        }
        case LOADING_PROBLEM:
            return {
                ...state,
                loadingProblem: true
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_RANKLIST: {
            return {
                ...state,
                rankList: action.payload,
                loading: false
            }
        }

        default:
            return state;
    }
}