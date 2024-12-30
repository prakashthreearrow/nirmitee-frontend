import {
    EDIT_PROFILE,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from "../../actions/types";

const INIT_STATE = {
    loading: false
};

const editProfileReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return { ...state, loading: true };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case EDIT_PROFILE_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default editProfileReducer;
