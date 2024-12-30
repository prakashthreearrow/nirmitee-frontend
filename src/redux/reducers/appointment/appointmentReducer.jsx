import {
    APPOINTMENT,
    APPOINTMENT_SUCCESS,
    APPOINTMENT_FAILURE
} from "../../actions/types";

const INIT_STATE = {
    loading: false
};

const appointmentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case APPOINTMENT:
            return { ...state, loading: true };
        case APPOINTMENT_SUCCESS:
            return {
                ...state,
                login: action.payload,
                loading: false,
            };
        case APPOINTMENT_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default appointmentReducer;
