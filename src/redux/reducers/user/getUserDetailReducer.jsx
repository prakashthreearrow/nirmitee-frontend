import {
    GET_USER_DETAIL,
    RESET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAILURE
} from "../../actions/types";

const INIT_STATE = {
    loading: false,
    userDetail: null
};

const getUserDetailReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER_DETAIL:
            return { ...state, loading: true };
        case RESET_USER_DETAIL:
            return INIT_STATE; // Reset state to initial
        case GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetail: action.payload,
            };
        case GET_USER_DETAIL_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default getUserDetailReducer;
